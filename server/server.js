const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const pool = require('./db');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // service role — never expose this to the frontend
);

const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized.' });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ message: 'Invalid or expired session.' });

  req.user = user;
  next();
};

const app = express();
const port = process.env.PORT || 3001;
const host = process.env.HOST || '127.0.0.1';
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: clientUrl }));
app.use(express.json());

const databaseErrorMessage = (error) => {
  if (error.code === 'ENOTFOUND') {
    return 'Supabase database host was not found. Check DATABASE_URL in server/.env.';
  }

  if (error.code === '28P01') {
    return 'Supabase rejected the database login. Check the username and password in DATABASE_URL.';
  }

  if (error.code === '3D000') {
    return 'Database name was not found. Check DATABASE_URL.';
  }

  return 'Could not communicate with Supabase Postgres.';
};

const SLUG_PATTERN = /^[a-z0-9-]+$/;
const MAX_SEARCH_LENGTH = 100;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;

const parseListParams = (query) => {
  const search = typeof query.search === 'string' ? query.search.trim().slice(0, MAX_SEARCH_LENGTH) : '';

  const sector = typeof query.sector === 'string' ? query.sector.trim() : '';
  if (sector && !SLUG_PATTERN.test(sector)) {
    throw Object.assign(new Error('Invalid sector parameter.'), { status: 400 });
  }

  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, Number.parseInt(query.pageSize, 10) || DEFAULT_PAGE_SIZE));

  return { search, sector, page, pageSize };
};

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('select 1');
    res.json({ ok: true, database: 'connected' });
  } catch (error) {
    res.status(500).json({
      ok: false,
      database: 'disconnected',
      message: databaseErrorMessage(error),
    });
  }
});

app.get('/api/sectors', async (_req, res) => {
  try {
    const { rows } = await pool.query('select id, name, slug from sectors order by name');
    res.json({ sectors: rows });
  } catch (error) {
    res.status(500).json({ sectors: [], message: databaseErrorMessage(error) });
  }
});

app.get('/api/companies', async (req, res) => {
  try {
    const { search, sector, page, pageSize } = parseListParams(req.query);
    const offset = (page - 1) * pageSize;

    const { rows } = await pool.query(
      `select
         c.id, c.name, c.slug, c.city, c.founded_year, c.description,
         s.name as sector, s.slug as sector_slug,
         lr.round_type as last_round_type, lr.announced_date as last_round_date, lr.amount_usd as last_round_amount_usd,
         count(*) over () as total_count
       from companies c
       left join sectors s on s.id = c.sector_id
       left join lateral (
         select round_type, announced_date, amount_usd
         from funding_rounds fr
         where fr.company_id = c.id
         order by announced_date desc
         limit 1
       ) lr on true
       where ($1 = '' or c.name ilike '%' || $1 || '%')
         and ($2 = '' or s.slug = $2)
       order by c.name
       limit $3 offset $4`,
      [search, sector, pageSize, offset]
    );

    const companies = rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      city: row.city,
      founded_year: row.founded_year,
      description: row.description,
      sector: row.sector,
      sector_slug: row.sector_slug,
      last_round: row.last_round_type
        ? { round_type: row.last_round_type, announced_date: row.last_round_date, amount_usd: row.last_round_amount_usd }
        : null,
    }));

    res.json({
      companies,
      total: rows[0]?.total_count ? Number(rows[0].total_count) : 0,
      page,
      pageSize,
    });
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ companies: [], total: 0, message: error.message });
    }

    res.status(500).json({ companies: [], total: 0, message: databaseErrorMessage(error) });
  }
});

app.get('/api/companies/:slug', requireAuth, async (req, res) => {
  try {
    const { rows: companyRows } = await pool.query(
      `select c.*, s.name as sector, s.slug as sector_slug
       from companies c
       left join sectors s on s.id = c.sector_id
       where c.slug = $1`,
      [req.params.slug]
    );

    const company = companyRows[0];
    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    const [founders, fundingRounds, capTable, valuationSignals, sources] = await Promise.all([
      pool.query(
        'select * from founders where company_id = $1 order by display_order, id',
        [company.id]
      ),
      pool.query(
        `select fr.*,
           coalesce(
             json_agg(json_build_object('id', i.id, 'name', i.name, 'type', i.type, 'is_lead', di.is_lead))
             filter (where i.id is not null),
             '[]'
           ) as investors
         from funding_rounds fr
         left join deal_investors di on di.funding_round_id = fr.id
         left join investors i on i.id = di.investor_id
         where fr.company_id = $1
         group by fr.id
         order by fr.announced_date desc`,
        [company.id]
      ),
      pool.query(
        `select distinct on (holder_name) *
         from cap_table_entries
         where company_id = $1
         order by holder_name, as_of_date desc`,
        [company.id]
      ),
      pool.query(
        `select distinct on (metric_type) *
         from valuation_signals
         where company_id = $1
         order by metric_type, as_of_date desc`,
        [company.id]
      ),
      pool.query(
        'select * from sources where company_id = $1 order by published_at desc',
        [company.id]
      ),
    ]);

    res.json({
      company,
      founders: founders.rows,
      fundingRounds: fundingRounds.rows,
      capTable: capTable.rows,
      valuationSignals: valuationSignals.rows,
      sources: sources.rows,
    });
  } catch (error) {
    res.status(500).json({ message: databaseErrorMessage(error) });
  }
});

const server = app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
  console.log(`Frontend allowed from ${clientUrl}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the old server or run with another port.`);
    console.error('Example: PORT=3002 npm run dev');
    process.exit(1);
  }

  if (error.code === 'EPERM' || error.code === 'EACCES') {
    console.error(`Permission denied while trying to listen on ${host}:${port}.`);
    console.error('Try a different port, or run the command from your normal terminal.');
    console.error('Example: PORT=3002 npx nodemon');
    process.exit(1);
  }

  throw error;
});
