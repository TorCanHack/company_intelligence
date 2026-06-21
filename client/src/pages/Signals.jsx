import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DashboardShell from '../components/layout/DashboardShell';
import { getSignals } from '../lib/api';
import { formatUsd, formatDate } from '../lib/format';

function SignalsTopbar() {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-dashed border-sketch-divider px-3.5 py-4 sm:px-5.5">
      <h1 className="font-handwritten text-2xl text-sketch-heading">Signals</h1>
      <span className="text-sm text-sketch-muted">Sort: Newest</span>
    </div>
  );
}

export default function Signals() {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    getSignals({ limit: 50 })
      .then((data) => {
        if (active) setSignals(data.signals);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const groupedByYear = signals.reduce((groups, signal) => {
    const year = new Date(signal.announced_date).getFullYear();
    groups[year] = groups[year] ?? [];
    groups[year].push(signal);
    return groups;
  }, {});

  const years = Object.keys(groupedByYear).sort((a, b) => b - a);

  return (
    <DashboardShell current="signals" topbar={<SignalsTopbar />}>
      {loading ? (
        <p className="text-sm text-sketch-muted">Loading signals…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : signals.length === 0 ? (
        <p className="rounded-[10px] border border-dashed border-sketch-divider py-10 text-center text-sm text-sketch-muted">
          No signals yet.
        </p>
      ) : (
        years.map((year) => (
          <div key={year} className="mb-6">
            <div className="mb-3 text-[11px] uppercase tracking-wide text-sketch-label">{year}</div>
            <div className="flex flex-col gap-3.5">
              {groupedByYear[year].map((signal) => (
                <div
                  key={signal.id}
                  className="flex items-center gap-3.5 rounded-[10px] border-[1.5px] border-sketch-border p-4.5"
                >
                  <span className="size-13 flex-none rounded-xl bg-sketch-chip" />
                  <div className="min-w-0 flex-1">
                    <div className="font-handwritten truncate text-xl text-sketch-heading">
                      {signal.company_name} raised {formatUsd(signal.amount_usd)}
                    </div>
                    <div className="mt-0.5 truncate text-sm text-sketch-muted">
                      {signal.round_type} round · {formatDate(signal.announced_date)}
                    </div>
                  </div>
                  <span className="flex-none rounded-full border border-sketch-accent px-3.5 py-1.5 text-sm text-sketch-accent">
                    Funding
                  </span>
                  <Link
                    to={`/companies/${signal.company_slug}`}
                    className="flex flex-none items-center gap-1 text-sm text-sketch-text"
                  >
                    View
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </DashboardShell>
  );
}
