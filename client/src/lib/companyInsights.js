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

// founder.portfolio is the list of every company linked to the same person
// (including the one currently being viewed), ordered by founded_year.
export function deriveFounderBadges(founder, currentCompanyId) {
  const portfolio = founder.portfolio || [];
  if (portfolio.length === 0) return [];

  const badges = [];

  const companiesCount = new Set(portfolio.map((c) => c.company_id)).size;
  if (companiesCount >= 2) {
    badges.push(`Serial founder · ${companiesCount} companies`);
  }

  const sectors = [...new Set(portfolio.map((c) => c.sector).filter(Boolean))];
  if (sectors.length >= 2) {
    badges.push(`Cross-sector · ${sectors.join(' → ')}`);
  }

  const priorExit = portfolio.find((c) => c.status === 'acquired' && c.company_id !== currentCompanyId);
  if (priorExit) {
    badges.push(`Prior exit · ${priorExit.company_name}`);
  }

  return badges;
}
