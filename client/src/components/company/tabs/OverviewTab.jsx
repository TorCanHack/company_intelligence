import { Card, TabLink, PersonRow, SignalRow } from '../Primitives';

export default function OverviewTab({ company, founders, signals, fundingRounds, onNavigateTab }) {
  const chronological = [...fundingRounds].reverse();
  const maxAmount = Math.max(1, ...chronological.map((round) => Number(round.amount_usd) || 0));

  return (
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      <div className="flex flex-col gap-5">
        <Card title="About">
          <p className="text-sm leading-6 text-sketch-text">{company.description}</p>
        </Card>

        <Card
          title="Funding by round"
          right={
            chronological.length > 0 && (
              <span className="text-[11px] text-sketch-accent">{fundingRounds[0].round_type}</span>
            )
          }
        >
          {chronological.length === 0 ? (
            <p className="text-sm text-sketch-muted">No funding rounds on record.</p>
          ) : (
            <div className="flex h-30 items-end gap-1.5 rounded-lg bg-[repeating-linear-gradient(135deg,#f1efe9_0_8px,#f7f6f1_8px_16px)] p-3">
              {chronological.map((round) => {
                const ratio = (Number(round.amount_usd) || 0) / maxAmount;
                return (
                  <span
                    key={round.id}
                    title={`${round.round_type}`}
                    className="flex-1 rounded-sm bg-sketch-accent"
                    style={{ height: `${Math.max(12, ratio * 100)}%`, opacity: 0.35 + ratio * 0.55 }}
                  />
                );
              })}
            </div>
          )}
        </Card>
      </div>

      <div className="flex flex-col gap-5">
        <Card title="Key people" right={<TabLink onClick={() => onNavigateTab('people')} />}>
          <div className="flex flex-col gap-3">
            {founders.length === 0 ? (
              <p className="text-sm text-sketch-muted">No founder data yet.</p>
            ) : (
              founders.slice(0, 3).map((person) => <PersonRow key={person.id} person={person} />)
            )}
          </div>
        </Card>

        <Card title="Recent signals" right={<TabLink onClick={() => onNavigateTab('signals')} />}>
          <div className="flex flex-col gap-3">
            {signals.length === 0 ? (
              <p className="text-sm text-sketch-muted">No signals on record.</p>
            ) : (
              signals.slice(0, 3).map((signal) => <SignalRow key={signal.id} signal={signal} />)
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
