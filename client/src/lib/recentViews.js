const STORAGE_KEY = 'ci_recent_views';
const MAX_ENTRIES = 5;

export const getRecentViews = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addRecentView = (entry) => {
  try {
    const withoutDuplicate = getRecentViews().filter((item) => item.slug !== entry.slug);
    const updated = [{ ...entry, viewedAt: new Date().toISOString() }, ...withoutDuplicate].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable — skip tracking
  }
};
