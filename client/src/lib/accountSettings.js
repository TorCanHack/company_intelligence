const PREFERENCES_KEY = 'ci_account_preferences';
const NOTIFICATIONS_KEY = 'ci_account_notifications';

const DEFAULT_PREFERENCES = {
  landingPage: 'home',
  signalDigest: 'daily',
};

const DEFAULT_NOTIFICATIONS = {
  fundingRounds: true,
  leadershipChanges: true,
  hiringSurges: false,
  mergersAndAcquisitions: true,
  layoffsAndRisk: true,
  dailyEmailDigest: true,
};

const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable — skip persisting
  }
};

export const getPreferences = () => readJson(PREFERENCES_KEY, DEFAULT_PREFERENCES);
export const savePreferences = (preferences) => writeJson(PREFERENCES_KEY, preferences);

export const getNotificationSettings = () => readJson(NOTIFICATIONS_KEY, DEFAULT_NOTIFICATIONS);
export const saveNotificationSettings = (settings) => writeJson(NOTIFICATIONS_KEY, settings);
