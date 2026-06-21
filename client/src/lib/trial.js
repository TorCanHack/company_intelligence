const TRIAL_LENGTH_DAYS = 14;

export const getTrialDaysLeft = (user) => {
  if (!user?.created_at) return null;

  const createdAt = new Date(user.created_at);
  const daysSinceSignup = Math.floor((Date.now() - createdAt.getTime()) / 86_400_000);

  return Math.max(0, TRIAL_LENGTH_DAYS - daysSinceSignup);
};
