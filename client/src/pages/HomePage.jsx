import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Radar, Sun } from 'lucide-react';
import DashboardShell from '../components/layout/DashboardShell';
import CompanyLogo from '../components/company/CompanyLogo';
import { useAuth } from '../lib/useAuth';
import { useWatchlist } from '../lib/useWatchlist';
import { getSignals } from '../lib/api';
import { getGreeting, getFirstName, isDaytime } from '../lib/greeting';
import { getRecentViews } from '../lib/recentViews';
import { formatUsd, formatDate } from '../lib/format';

export default function HomePage() {
  const { user } = useAuth();
  const { companies: trackedCompanies } = useWatchlist();
  const [recentViews] = useState(() => getRecentViews());
  const [signals, setSignals] = useState([]);
  const [signalsLoading, setSignalsLoading] = useState(true);

  const stats = [
    { label: 'Tracked', value: String(trackedCompanies.length) },
    { label: 'New signals', value: '0', accent: true },
    { label: 'Lookups left', value: '0' },
    { label: 'Exports', value: '0' },
  ];

  useEffect(() => {
    let active = true;

    getSignals({ limit: 5 })
      .then((data) => {
        if (active) setSignals(data.signals);
      })
      .catch(() => {
        if (active) setSignals([]);
      })
      .finally(() => {
        if (active) setSignalsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const firstName = getFirstName(user);
  const GreetingIcon = isDaytime() ? Sun : Moon;

  return (
    <DashboardShell current="home">
      <div className="mb-5">
        <h1 className="flex items-center gap-2.5 font-handwritten text-3xl text-sketch-heading">
          <GreetingIcon className="size-7 flex-none text-sketch-accent" />
          {getGreeting()}{firstName ? `, ${firstName}` : ''}
        </h1>
        <p className="mt-1.5 text-sm text-sketch-muted">
          {trackedCompanies.length === 0
            ? "You don't have any companies on your watchlist yet."
            : `${trackedCompanies.length} ${trackedCompanies.length === 1 ? 'company' : 'companies'} on your watchlist.`}
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {stats.map((stat) => (
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
        {trackedCompanies.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-[10px] border border-dashed border-sketch-divider p-9 text-center">
            <div className="relative flex size-16 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-dashed border-sketch-divider" />
              <span className="absolute inset-2 rounded-full border border-dashed border-sketch-divider" />
              <Radar className="size-6 text-sketch-accent" />
            </div>
            <div className="font-handwritten text-lg text-sketch-heading">Track your first company</div>
            <p className="max-w-70 text-[13px] text-sketch-muted">
              Add a company to your watchlist to see its funding, headcount, and signals right here.
            </p>
            <Link
              to="/directory"
              className="mt-1 rounded-md bg-sketch-accent px-4.5 py-2 text-[13px] text-white"
            >
              Browse companies
            </Link>
          </div>
        ) : (
          <div className="rounded-[10px] border-[1.5px] border-sketch-border p-4.5">
            <div className="mb-3.5 flex items-center justify-between">
              <span className="font-handwritten text-base text-sketch-heading">Your watchlist</span>
              <Link to="/watchlist" className="text-[13px] text-sketch-accent">
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-3.5">
              {trackedCompanies.slice(0, 4).map((company) => (
                <Link key={company.id} to={`/companies/${company.slug}`} className="flex items-center gap-2.5">
                  <CompanyLogo name={company.name} logoUrl={company.logo_url} className="size-9 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] text-sketch-text">{company.name}</div>
                    <div className="truncate text-[11px] text-sketch-label">{company.sector ?? 'Uncategorized'}</div>
                  </div>
                  {company.last_round && (
                    <span className="flex-none rounded-full border border-sketch-accent px-2.5 py-0.5 text-[10px] text-sketch-accent">
                      {company.last_round.round_type}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-[10px] border-[1.5px] border-sketch-border p-4.5">
          <div className="mb-3.5 flex items-center justify-between">
            <span className="font-handwritten text-base text-sketch-heading">Latest signals</span>
            <Link to="/signals" className="text-[13px] text-sketch-accent">
              View all
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {signalsLoading ? (
              <p className="text-sm text-sketch-muted">Loading…</p>
            ) : signals.length === 0 ? (
              <p className="text-sm text-sketch-muted">No signals yet.</p>
            ) : (
              signals.map((signal, index) => (
                <div key={signal.id} className="flex gap-2.5">
                  <span
                    className={`mt-1.5 size-2 flex-none rounded-full ${
                      index === 0 ? 'bg-sketch-accent' : 'bg-sketch-border'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] text-sketch-text">
                      {signal.company_name} raised {formatUsd(signal.amount_usd)} in its {signal.round_type} round
                    </div>
                    <div className="mt-1.5 text-[11px] text-sketch-label">{formatDate(signal.announced_date)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[10px] border-[1.5px] border-sketch-border p-4.5">
        <div className="mb-1 flex items-center justify-between">
          <span className="font-handwritten text-base text-sketch-heading">Recently viewed</span>
          {recentViews.length > 0 && (
            <button type="button" className="text-[13px] text-sketch-accent">
              Export CSV
            </button>
          )}
        </div>
        {recentViews.length === 0 ? (
          <p className="py-6 text-center text-sm text-sketch-muted">
            No recent views yet — search for a company to see it here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-130 border-collapse">
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
                {recentViews.map((row, index) => (
                  <tr
                    key={row.slug}
                    className={index < recentViews.length - 1 ? 'border-b border-dashed border-sketch-divider' : ''}
                  >
                    <td className="py-3 text-[13px] text-sketch-text">
                      <Link to={`/companies/${row.slug}`} className="flex items-center gap-2.5">
                        <CompanyLogo name={row.name} logoUrl={row.logoUrl} className="size-6 rounded" />
                        {row.name}
                      </Link>
                    </td>
                    <td className="text-[13px] text-sketch-muted">{row.sector ?? '—'}</td>
                    <td className="text-[13px] text-sketch-muted">{row.employeeRange ?? '—'}</td>
                    <td className="text-[13px] text-sketch-muted">{row.stage ?? '—'}</td>
                    <td className="text-right text-[13px]">
                      <Link to={`/companies/${row.slug}`} className="text-sketch-accent">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
