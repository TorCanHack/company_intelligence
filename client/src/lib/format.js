export const formatUsd = (amount) => {
  if (amount === null || amount === undefined) return '—';

  const value = Number(amount);
  const abs = Math.abs(value);

  if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (abs >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

export const formatDate = (dateStr, { month = 'short', year = 'numeric' } = {}) => {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('en-US', { month, year }).format(new Date(dateStr));
};

export const formatPercent = (value) => {
  if (value === null || value === undefined) return '—';
  return `${Number(value).toFixed(1).replace(/\.0$/, '')}%`;
};
