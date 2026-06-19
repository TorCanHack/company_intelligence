import { useState } from 'react';
import DashboardShell from '../components/layout/DashboardShell';
import { Stat } from '../components/company/Primitives';

const STATS = [
  { label: 'Tracked', value: '24' },
  { label: 'New signals', value: '8', accent: true },
  { label: 'Lookups left', value: '186' },
  { label: 'Exports', value: '5' },
];

const COMPANY_TABS = ['Overview', 'Funding', 'People', 'Signals'];

const CHART_BARS = [45, 65, 50, 78, 62, 88, 100];

const SIGNALS = [
  { text: 'Acme raised a $40M Series C', time: '2h ago', highlight: true },
  { text: 'Northwind hired a new CRO', time: '5h ago' },
  { text: 'Globex opened a London office', time: '1d ago' },
  { text: 'Initech headcount up 18% QoQ', time: '2d ago' },
  { text: 'Soylent filed a new trademark', time: '3d ago' },
];

const RECENTLY_VIEWED = [
  { name: 'Northwind', industry: 'Logistics', headcount: '540', stage: 'Series B' },
  { name: 'Globex', industry: 'Fintech', headcount: '1,200', stage: 'Series D' },
  { name: 'Initech', industry: 'SaaS', headcount: '88', stage: 'Seed' },
];

export default function HomePage() {
  const [tab, setTab] = useState('Overview');

  return (
    <DashboardShell current="home">
      <div className="mb-5">
        <h1 className="font-handwritten text-3xl text-sketch-heading">Good morning, Jane</h1>
        <p className="mt-1.5 text-sm text-sketch-muted">
          3 companies on your watchlist had updates today.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-[10px] border-[1.5px] border-sketch-border p-4.5">
            <div className="text-[10px] uppercase tracking-wide text-sketch-label">{stat.label}</div>
            <div
              className={`font-handwritten mt-1.5 text-2xl ${
                stat.accent ? 'text-sketch-accent' : 'text-sketch-heading'
              }`}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[10px] border-[1.5px] border-sketch-border">
          <div className="flex items-center gap-3.5 p-4.5">
            <span className="size-13 flex-none rounded-xl bg-sketch-chip" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <span className="font-handwritten truncate text-2xl text-sketch-heading">Acme Corp</span>
                <span className="flex-none rounded-full border border-sketch-accent px-2.5 py-0.5 text-[10px] text-sketch-accent">
                  Series C
                </span>
              </div>
              <div className="mt-0.5 truncate text-[13px] text-sketch-muted">
                acme.com · San Francisco · SaaS
              </div>
            </div>
            <button
              type="button"
              className="flex-none rounded-md bg-sketch-accent px-4.5 py-2 text-[13px] text-white"
            >
              + Watch
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3.5 px-4.5 pb-4.5">
            <Stat label="Revenue" value="$48M" />
            <Stat label="Headcount" value="312" />
            <Stat label="Raised" value="$96M" />
          </div>

          <div className="flex gap-1 border-t border-dashed border-sketch-divider px-4 pt-2.5">
            {COMPANY_TABS.map((label) => {
              const isActive = tab === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setTab(label)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] ${
                    isActive ? 'bg-sketch-hover text-sketch-heading' : 'text-sketch-label'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="p-4.5 pt-3.5">
            {tab === 'Overview' ? (
              <div className="flex h-37 items-end gap-1.5 rounded-lg bg-[repeating-linear-gradient(135deg,#f1efe9_0_8px,#f7f6f1_8px_16px)] p-3">
                {CHART_BARS.map((height, index) => (
                  <span
                    key={index}
                    className="flex-1 rounded-sm bg-sketch-accent"
                    style={{ height: `${height}%`, opacity: 0.35 + (height / 100) * 0.55 }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-sketch-muted">{tab} details coming soon.</p>
            )}
          </div>
        </div>

        <div className="rounded-[10px] border-[1.5px] border-sketch-border p-4.5">
          <div className="mb-3.5 flex items-center justify-between">
            <span className="font-handwritten text-base text-sketch-heading">Latest signals</span>
            <button type="button" className="text-[13px] text-sketch-accent">
              View all
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {SIGNALS.map((signal) => (
              <div key={signal.text} className="flex gap-2.5">
                <span
                  className={`mt-1.5 size-2 flex-none rounded-full ${
                    signal.highlight ? 'bg-sketch-accent' : 'bg-sketch-border'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] text-sketch-text">{signal.text}</div>
                  <span className="mt-1.5 block h-1.5 w-2/5 rounded-full bg-sketch-border/70" />
                  <div className="mt-1.5 text-[11px] text-sketch-label">{signal.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[10px] border-[1.5px] border-sketch-border p-4.5">
        <div className="mb-1 flex items-center justify-between">
          <span className="font-handwritten text-base text-sketch-heading">Recently viewed</span>
          <button type="button" className="text-[13px] text-sketch-accent">
            Export CSV
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-dashed border-sketch-divider text-left text-[11px] uppercase tracking-wide text-sketch-label">
              <th className="py-2.5 font-normal">Company</th>
              <th className="py-2.5 font-normal">Industry</th>
              <th className="py-2.5 font-normal">Headcount</th>
              <th className="py-2.5 font-normal">Stage</th>
              <th className="py-2.5" />
            </tr>
          </thead>
          <tbody>
            {RECENTLY_VIEWED.map((row, index) => (
              <tr
                key={row.name}
                className={index < RECENTLY_VIEWED.length - 1 ? 'border-b border-dashed border-sketch-divider' : ''}
              >
                <td className="py-3 text-[13px] text-sketch-text">
                  <span className="flex items-center gap-2.5">
                    <span className="size-6 flex-none rounded bg-sketch-chip" />
                    {row.name}
                  </span>
                </td>
                <td className="text-[13px] text-sketch-muted">{row.industry}</td>
                <td className="text-[13px] text-sketch-muted">{row.headcount}</td>
                <td className="text-[13px] text-sketch-muted">{row.stage}</td>
                <td className="text-right text-[13px]">
                  <button type="button" className="text-sketch-accent">
                    + Watch
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
