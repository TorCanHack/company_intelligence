import { Search, X } from 'lucide-react';
import DashboardShell from '../components/layout/DashboardShell';
import { Stat } from '../components/company/Primitives';

const FILTERS = ['SaaS', 'Fintech', 'Series B', 'North America'];

const COMPANIES = [
  {
    name: 'Acme Corp',
    meta: 'acme.com · SF · SaaS',
    stage: 'Series C',
    revenue: '$48M',
    staff: '312',
    match: '96%',
    signal: 'Raised a $40M Series C',
    signalTime: '2h ago',
  },
  {
    name: 'Northwind',
    meta: 'northwind.io · NYC · Logistics',
    stage: 'Series B',
    revenue: '$31M',
    staff: '540',
    match: '91%',
    signal: 'Hired a new CRO',
    signalTime: '5h ago',
  },
  {
    name: 'Initech',
    meta: 'initech.com · Austin · SaaS',
    stage: 'Seed',
    revenue: '$4M',
    staff: '88',
    match: '88%',
    signal: 'Headcount up 18% QoQ',
    signalTime: '2d ago',
  },
  {
    name: 'Globex',
    meta: 'globex.co · London · Fintech',
    stage: 'Series D',
    revenue: '$120M',
    staff: '1,200',
    match: '84%',
    signal: 'Opened a London office',
    signalTime: '1d ago',
  },
  {
    name: 'Soylent',
    meta: 'soylent.com · LA · Consumer',
    stage: 'Series A',
    revenue: '$12M',
    staff: '140',
    match: '79%',
    signal: 'Filed a new trademark',
    signalTime: '3d ago',
  },
  {
    name: 'Umbrella Co',
    meta: 'umbrella.co · Boston · Bio',
    stage: 'Growth',
    revenue: '$210M',
    staff: '2,400',
    match: '74%',
    signal: 'Cut 4% of staff',
    signalTime: '4d ago',
  },
];

function WatchlistTopbar() {
  return (
    <div className="flex items-center gap-4 border-b border-dashed border-sketch-divider px-5.5 py-3.5">
      <div className="flex flex-1 items-center gap-2.5 rounded-xl border-[1.5px] border-sketch-border px-4 py-2.5">
        <Search className="size-4 flex-none text-sketch-label" />
        <input
          type="text"
          placeholder="Add a company to your watchlist…"
          className="w-full bg-transparent text-sm text-sketch-text placeholder:text-sketch-label focus:outline-none"
        />
      </div>
      <button
        type="button"
        className="flex-none rounded-lg bg-sketch-accent px-5 py-2.5 text-sm font-medium text-white"
      >
        + New watchlist
      </button>
    </div>
  );
}

export default function Watchlist() {
  return (
    <DashboardShell current="watch" topbar={<WatchlistTopbar />}>
      <div className="mb-4">
        <h1 className="font-handwritten text-3xl text-sketch-heading">Your watchlist</h1>
        <p className="mt-1.5 text-sm text-sketch-muted">
          Curated for <span className="text-sketch-accent">Investor</span> · matching{' '}
          <span className="text-sketch-accent">SaaS, Fintech</span> ·{' '}
          <span className="text-sketch-accent">Series B</span> ·{' '}
          <span className="text-sketch-accent">North America</span>
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2.5">
        {FILTERS.map((filter) => (
          <span
            key={filter}
            className="flex items-center gap-2 rounded-full bg-sketch-accent px-4 py-2 text-sm text-white"
          >
            {filter}
            <X className="size-3.5" />
          </span>
        ))}
        <button
          type="button"
          className="rounded-full border border-dashed border-sketch-divider px-4 py-2 text-sm text-sketch-muted"
        >
          + filter
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {COMPANIES.map((company) => (
          <div key={company.name} className="rounded-[10px] border-[1.5px] border-sketch-border">
            <div className="flex items-center gap-3.5 p-4.5">
              <span className="size-13 flex-none rounded-xl bg-sketch-chip" />
              <div className="min-w-0 flex-1">
                <span className="font-handwritten block truncate text-xl text-sketch-heading">
                  {company.name}
                </span>
                <span className="block truncate text-[13px] text-sketch-muted">{company.meta}</span>
              </div>
              <span className="flex-none rounded-full border border-sketch-accent px-3 py-1 text-[11px] text-sketch-accent">
                {company.stage}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3.5 px-4.5 pb-4.5">
              <Stat label="Revenue" value={company.revenue} />
              <Stat label="Staff" value={company.staff} />
              <Stat label="Match" value={company.match} accent />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-dashed border-sketch-divider px-4.5 py-3.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="size-2 flex-none rounded-full bg-sketch-accent" />
                <span className="truncate text-[13px] text-sketch-text">
                  {company.signal} · {company.signalTime}
                </span>
              </div>
              <span className="flex-none text-[13px] text-sketch-muted">Watching ✓</span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center rounded-[10px] border border-dashed border-sketch-divider py-6 text-sm text-sketch-muted"
      >
        + Add another company or import a list
      </button>
    </DashboardShell>
  );
}
