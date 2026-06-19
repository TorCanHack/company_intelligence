import { formatUsd, formatDate } from './format';

export function deriveCompanyMetrics({ fundingRounds, valuationSignals }) {
  const lastRound = fundingRounds[0] || null;

  const totalRaisedUsd =
    fundingRounds.reduce((sum, round) => sum + (Number(round.amount_usd) || 0), 0) || null;

  const valuationSignal =
    valuationSignals.find((signal) => signal.metric_type === 'implied_valuation') ||
    valuationSignals.find((signal) => signal.metric_type === 'last_round_valuation') ||
    null;

  const valuationUsd =
    valuationSignal && valuationSignal.unit === 'USD'
      ? Number(valuationSignal.value)
      : lastRound?.valuation_post_money
        ? Number(lastRound.valuation_post_money)
        : null;

  return { lastRound, totalRaisedUsd, valuationUsd };
}

export function deriveFundingSignals(fundingRounds) {
  return fundingRounds.map((round) => ({
    id: round.id,
    text: `Raised ${formatUsd(round.amount_usd)} in its ${round.round_type} round`,
    time: formatDate(round.announced_date),
    tag: 'Funding',
  }));
}
