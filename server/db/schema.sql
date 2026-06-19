-- Company Intelligence schema. Safe to re-run: drops and recreates domain tables.
drop table if exists sources cascade;
drop table if exists valuation_signals cascade;
drop table if exists cap_table_entries cascade;
drop table if exists deal_investors cascade;
drop table if exists funding_rounds cascade;
drop table if exists investors cascade;
drop table if exists founders cascade;
drop table if exists companies cascade;
drop table if exists sectors cascade;

create table sectors (
  id serial primary key,
  name text not null,
  slug text not null unique
);

create table companies (
  id serial primary key,
  name text not null,
  slug text not null unique,
  sector_id int references sectors(id) on delete set null,
  country text not null default 'Nigeria',
  city text,
  founded_year smallint,
  description text,
  website text,
  logo_url text,
  employee_range text,
  status text not null default 'active' check (status in ('active', 'acquired', 'shut_down', 'unknown')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_verified_at timestamptz
);

create table founders (
  id serial primary key,
  company_id int not null references companies(id) on delete cascade,
  name text not null,
  role text,
  bio text,
  linkedin_url text,
  is_current boolean not null default true,
  display_order smallint not null default 0
);
create index idx_founders_company on founders (company_id, display_order);

create table investors (
  id serial primary key,
  name text not null,
  type text not null check (type in ('VC', 'PE', 'Angel', 'DFI', 'CVC')),
  country text
);

create table funding_rounds (
  id serial primary key,
  company_id int not null references companies(id) on delete cascade,
  round_type text not null,
  amount numeric,
  currency text not null default 'USD',
  amount_usd numeric,
  fx_rate_to_usd numeric not null default 1,
  valuation_pre_money numeric,
  valuation_post_money numeric,
  valuation_currency text default 'USD',
  announced_date date not null,
  confidence text not null default 'reported' check (confidence in ('verified', 'reported', 'estimated', 'modeled')),
  source_url text,
  notes text
);
create index idx_funding_rounds_company on funding_rounds (company_id, announced_date desc);

create table deal_investors (
  funding_round_id int not null references funding_rounds(id) on delete cascade,
  investor_id int not null references investors(id) on delete restrict,
  is_lead boolean not null default false,
  primary key (funding_round_id, investor_id)
);

create table cap_table_entries (
  id serial primary key,
  company_id int not null references companies(id) on delete cascade,
  holder_name text not null,
  holder_type text not null check (holder_type in ('founder', 'employee_pool', 'investor', 'esop')),
  stake_pct numeric check (stake_pct >= 0 and stake_pct <= 100),
  share_class text,
  as_of_date date not null,
  recorded_at timestamptz not null default now(),
  confidence text not null default 'estimated' check (confidence in ('verified', 'reported', 'estimated', 'modeled')),
  source_url text
);
create index idx_cap_table_company on cap_table_entries (company_id, as_of_date desc);

create table valuation_signals (
  id serial primary key,
  company_id int not null references companies(id) on delete cascade,
  metric_type text not null check (metric_type in ('implied_valuation', 'revenue_multiple', 'last_round_valuation', 'secondary_transaction')),
  value numeric not null,
  unit text not null,
  currency text,
  as_of_date date not null,
  recorded_at timestamptz not null default now(),
  confidence text not null default 'estimated' check (confidence in ('verified', 'reported', 'estimated', 'modeled')),
  source_url text
);
create index idx_valuation_signals_company on valuation_signals (company_id, metric_type, as_of_date desc);

create table sources (
  id serial primary key,
  company_id int not null references companies(id) on delete cascade,
  url text not null,
  publisher text,
  published_at date,
  note text
);
create index idx_sources_company on sources (company_id);
