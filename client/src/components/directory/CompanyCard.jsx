import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import { formatDate, formatUsd } from '../../lib/format';

const initials = (name) =>
  name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function CompanyCard({ company }) {
  return (
    <Link
      to={`/companies/${company.slug}`}
      className="flex flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-accent-500/40 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-sm font-semibold text-white">
          {initials(company.name)}
        </span>
        <div>
          <p className="font-semibold text-ink-950">{company.name}</p>
          <p className="text-sm text-ink-500">{company.city}, Nigeria</p>
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-ink-700">{company.description}</p>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        {company.sector && <Badge>{company.sector}</Badge>}
        {company.last_round && (
          <Badge className="font-financial">
            {company.last_round.round_type} · {formatUsd(company.last_round.amount_usd)} ·{' '}
            {formatDate(company.last_round.announced_date)}
          </Badge>
        )}
      </div>
    </Link>
  );
}
