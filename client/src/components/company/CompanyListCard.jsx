import { Link } from 'react-router-dom';
import { Stat } from './Primitives';
import CompanyLogo from './CompanyLogo';
import { formatUsd, formatDate } from '../../lib/format';
import { useWatchlist } from '../../lib/useWatchlist';

export default function CompanyListCard({ company }) {
  const { isTracked, toggle } = useWatchlist();
  const tracked = isTracked(company.id);

  return (
    <div className="rounded-[10px] border-[1.5px] border-sketch-border">
      <Link to={`/companies/${company.slug}`} className="flex items-center gap-3.5 p-4.5">
        <CompanyLogo name={company.name} logoUrl={company.logo_url} />
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
        <button
          type="button"
          onClick={() => toggle(company)}
          className={`flex-none text-[13px] ${tracked ? 'text-sketch-muted' : 'text-sketch-accent'}`}
        >
          {tracked ? '✓ Tracked' : '+ Watch'}
        </button>
      </div>
    </div>
  );
}
