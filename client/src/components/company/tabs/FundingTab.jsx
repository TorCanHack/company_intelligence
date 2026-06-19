import { Card, Stat } from '../Primitives';
import { formatUsd, formatDate } from '../../../lib/format';

export default function FundingTab({ fundingRounds, totalRaisedUsd, valuationUsd }) {
  const lastRound = fundingRounds[0] || null;

  const investors = Array.from(
    new Map(fundingRounds.flatMap((round) => round.investors).map((investor) => [investor.id, investor])).values()
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-3.5">
        <Card>
          <Stat label="Total raised" value={formatUsd(totalRaisedUsd)} />
        </Card>
        <Card>
          <Stat label="Last round" value={lastRound ? formatUsd(lastRound.amount_usd) : '—'} />
        </Card>
        <Card>
          <Stat label="Post-money" value={formatUsd(valuationUsd)} accent />
        </Card>
      </div>

      <Card title="Funding history">
        {fundingRounds.length === 0 ? (
          <p className="text-sm text-sketch-muted">No funding rounds on record.</p>
        ) : (
          <div>
            <div className="grid grid-cols-[1fr_1fr_1.4fr_0.8fr] border-b border-dashed border-sketch-divider pb-2.5 text-[10px] uppercase tracking-wide text-sketch-label">
              <span>Round</span>
              <span>Amount</span>
              <span>Lead investor</span>
              <span>Date</span>
            </div>
            {fundingRounds.map((round) => {
              const lead = round.investors.find((investor) => investor.is_lead) || round.investors[0];
              return (
                <div
                  key={round.id}
                  className="grid grid-cols-[1fr_1fr_1.4fr_0.8fr] items-center border-b border-dashed border-sketch-divider py-3 text-[13px] last:border-0"
                >
                  <span className="text-sketch-text">{round.round_type}</span>
                  <span className="font-handwritten text-sketch-heading">{formatUsd(round.amount_usd)}</span>
                  <span className="truncate text-sketch-muted">{lead?.name || '—'}</span>
                  <span className="text-xs text-sketch-label">{formatDate(round.announced_date)}</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card title="Investors">
        {investors.length === 0 ? (
          <p className="text-sm text-sketch-muted">No investors on record.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {investors.map((investor) => (
              <span key={investor.id} className="rounded-full bg-sketch-hover px-3.5 py-1.5 text-xs text-sketch-text">
                {investor.name}
              </span>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
