import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import DashboardShell from '../components/layout/DashboardShell';
import { Stat } from '../components/company/Primitives';
import { getCompanies, getSectors } from '../lib/api';
import { formatUsd, formatDate } from '../lib/format';

function WatchlistTopbar({ searchInput, onSearchChange }) {
  return (
    <div className="flex items-center gap-4 border-b border-dashed border-sketch-divider px-5.5 py-3.5">
      <div className="flex flex-1 items-center gap-2.5 rounded-xl border-[1.5px] border-sketch-border px-4 py-2.5">
        <Search className="size-4 flex-none text-sketch-label" />
        <input
          type="text"
          value={searchInput}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search companies to add to your watchlist…"
          className="w-full bg-transparent text-sm text-sketch-text placeholder:text-sketch-label focus:outline-none"
        />
      </div>
    </div>
  );
}

export default function Watchlist() {
  const [sectors, setSectors] = useState([]);
  const [sector, setSector] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSectors()
      .then((data) => setSectors(data.sectors))
      .catch(() => setSectors([]));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCompanies({ search, sector, pageSize: 12 });
        if (active) setCompanies(data.companies);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [search, sector]);

  return (
    <DashboardShell
      current="watch"
      topbar={<WatchlistTopbar searchInput={searchInput} onSearchChange={setSearchInput} />}
    >
      <div className="mb-4">
        <h1 className="font-handwritten text-3xl text-sketch-heading">Your watchlist</h1>
        <p className="mt-1.5 text-sm text-sketch-muted">
          You're not tracking any companies yet — browse the directory below and add one.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => setSector('')}
          className={`rounded-full px-4 py-2 text-sm ${
            sector === '' ? 'bg-sketch-accent text-white' : 'border border-dashed border-sketch-divider text-sketch-muted'
          }`}
        >
          All sectors
        </button>
        {sectors.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => setSector(s.slug)}
            className={`rounded-full px-4 py-2 text-sm ${
              sector === s.slug ? 'bg-sketch-accent text-white' : 'border border-dashed border-sketch-divider text-sketch-muted'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : loading ? (
        <p className="text-sm text-sketch-muted">Loading companies…</p>
      ) : companies.length === 0 ? (
        <p className="rounded-[10px] border border-dashed border-sketch-divider py-10 text-center text-sm text-sketch-muted">
          No companies match your search.
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {companies.map((company) => (
            <div key={company.id} className="rounded-[10px] border-[1.5px] border-sketch-border">
              <Link to={`/companies/${company.slug}`} className="flex items-center gap-3.5 p-4.5">
                <span className="size-13 flex-none rounded-xl bg-sketch-chip" />
                <div className="min-w-0 flex-1">
                  <span className="font-handwritten block truncate text-xl text-sketch-heading">
                    {company.name}
                  </span>
                  <span className="block truncate text-[13px] text-sketch-muted">
                    {company.city ? `${company.city} · ` : ''}{company.sector ?? 'Uncategorized'}
                  </span>
                </div>
                {company.last_round && (
                  <span className="flex-none rounded-full border border-sketch-accent px-3 py-1 text-[11px] text-sketch-accent">
                    {company.last_round.round_type}
                  </span>
                )}
              </Link>

              <div className="grid grid-cols-3 gap-3.5 px-4.5 pb-4.5">
                <Stat label="Last round" value={company.last_round ? formatUsd(company.last_round.amount_usd) : '—'} />
                <Stat label="Founded" value={company.founded_year ?? '—'} />
                <Stat label="Sector" value={company.sector ?? '—'} />
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-dashed border-sketch-divider px-4.5 py-3.5">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="size-2 flex-none rounded-full bg-sketch-border" />
                  <span className="truncate text-[13px] text-sketch-text">
                    {company.last_round
                      ? `${company.last_round.round_type} · ${formatDate(company.last_round.announced_date)}`
                      : 'No funding on record'}
                  </span>
                </div>
                <button type="button" className="flex-none text-[13px] text-sketch-accent">
                  + Watch
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
