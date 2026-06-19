import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import DashboardShell from '../components/layout/DashboardShell';

const FILTERS = ['All', 'Funding', 'Leadership', 'Hiring', 'M&A', 'Layoffs'];

const GROUPS = ['Today', 'This week'];

const SIGNALS = [
  {
    title: 'Acme raised a $40M Series C',
    company: 'Acme Corp',
    time: '2h ago',
    category: 'Funding',
    group: 'Today',
  },
  {
    title: 'Northwind hired a new CRO',
    company: 'Northwind',
    time: '5h ago',
    category: 'Leadership',
    group: 'Today',
  },
  {
    title: 'Globex posted 12 new sales roles',
    company: 'Globex',
    time: '8h ago',
    category: 'Hiring',
    group: 'Today',
  },
  {
    title: 'Globex opened a London office',
    company: 'Globex',
    time: '1d ago',
    category: 'Expansion',
    group: 'This week',
  },
  {
    title: 'Initech headcount up 18% QoQ',
    company: 'Initech',
    time: '2d ago',
    category: 'Hiring',
    group: 'This week',
  },
  {
    title: 'Soylent filed a new trademark',
    company: 'Soylent',
    time: '3d ago',
    category: 'Legal',
    group: 'This week',
  },
];

function SignalsTopbar() {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-dashed border-sketch-divider px-5.5 py-4">
      <h1 className="font-handwritten text-2xl text-sketch-heading">Signals</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-sketch-muted">Sort: Newest</span>
        <button
          type="button"
          className="rounded-lg bg-sketch-accent px-4.5 py-2.5 text-sm font-medium text-white"
        >
          Alert settings
        </button>
      </div>
    </div>
  );
}

export default function Signals() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = SIGNALS.filter(
    (signal) => activeFilter === 'All' || signal.category === activeFilter,
  );

  return (
    <DashboardShell current="signals" topbar={<SignalsTopbar />}>
      <div className="mb-6 flex flex-wrap gap-2.5">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2.5 text-sm ${
                isActive
                  ? 'bg-sketch-accent text-white'
                  : 'border-[1.5px] border-sketch-border text-sketch-text'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {GROUPS.map((group) => {
        const items = filtered.filter((signal) => signal.group === group);
        if (items.length === 0) return null;

        return (
          <div key={group} className="mb-6">
            <div className="mb-3 text-[11px] uppercase tracking-wide text-sketch-label">{group}</div>
            <div className="flex flex-col gap-3.5">
              {items.map((signal) => (
                <div
                  key={signal.title}
                  className="flex items-center gap-3.5 rounded-[10px] border-[1.5px] border-sketch-border p-4.5"
                >
                  <span className="size-13 flex-none rounded-xl bg-sketch-chip" />
                  <div className="min-w-0 flex-1">
                    <div className="font-handwritten truncate text-xl text-sketch-heading">
                      {signal.title}
                    </div>
                    <div className="mt-0.5 truncate text-sm text-sketch-muted">
                      {signal.company} · {signal.time}
                    </div>
                  </div>
                  <span className="flex-none rounded-full border border-sketch-accent px-3.5 py-1.5 text-sm text-sketch-accent">
                    {signal.category}
                  </span>
                  <button type="button" className="flex flex-none items-center gap-1 text-sm text-sketch-text">
                    View
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </DashboardShell>
  );
}
