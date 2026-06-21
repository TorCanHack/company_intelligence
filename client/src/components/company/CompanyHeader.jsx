import { Stat } from './Primitives';
import { formatUsd } from '../../lib/format';
import { useWatchlist } from '../../lib/useWatchlist';

export default function CompanyHeader({ company, lastRound, totalRaisedUsd, valuationUsd }) {
  const { isTracked, toggle } = useWatchlist();
  const watching = isTracked(company.id);

  const metaLine = [
    company.website?.replace(/^https?:\/\//, ''),
    company.city ? `${company.city}, Nigeria` : null,
    company.sector,
    company.founded_year ? `Founded ${company.founded_year}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="border-b border-dashed border-sketch-divider p-3.5 sm:p-5.5">
      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="size-13 flex-none rounded-xl bg-sketch-chip" />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <span className="font-handwritten truncate text-2xl text-sketch-heading">{company.name}</span>
              {lastRound && (
                <span className="flex-none rounded-full border border-sketch-accent px-2.5 py-0.5 text-[10px] text-sketch-accent">
                  {lastRound.round_type}
                </span>
              )}
            </div>
            <div className="mt-0.5 truncate text-[13px] text-sketch-muted">{metaLine}</div>
          </div>
        </div>

        <div className="flex flex-none gap-2.5 sm:ml-auto">
          <button
            type="button"
            className="flex-none rounded-md border-[1.5px] border-sketch-border px-4 py-2 text-[13px] text-sketch-text"
          >
            Export
          </button>
          <button
            type="button"
            onClick={() => toggle(company)}
            className={`flex-none rounded-md px-4.5 py-2 text-[13px] ${
              watching ? 'bg-sketch-accent text-white' : 'border-[1.5px] border-sketch-border text-sketch-text'
            }`}
          >
            {watching ? 'Watching ✓' : 'Watch'}
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3.5 lg:grid-cols-6">
        <Stat label="Employees" value={company.employee_range || '—'} />
        <Stat label="Total raised" value={formatUsd(totalRaisedUsd)} />
        <Stat label="Last round" value={lastRound?.round_type || '—'} />
        <Stat label="Valuation" value={formatUsd(valuationUsd)} accent />
        <Stat label="Founded" value={company.founded_year || '—'} />
        <Stat label="Status" value={company.status.replace('_', ' ')} accent />
      </div>
    </div>
  );
}
