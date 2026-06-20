export const getGreeting = (date = new Date()) => {
  const hours = date.getHours();

  if (hours < 12) return 'Good morning';
  if (hours < 17) return 'Good afternoon';
  return 'Good evening';
};

// Mirrors the hour buckets in getGreeting so the icon never contradicts the text.
export const isDaytime = (date = new Date()) => date.getHours() < 17;

export const getFirstName = (user) => {
  const fullName = user?.user_metadata?.full_name;
  if (fullName) return fullName.trim().split(' ')[0];

  const email = user?.email;
  if (email) return email.split('@')[0];

  return null;
};
