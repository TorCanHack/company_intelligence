import { createContext } from 'react';

export const WatchlistContext = createContext({
  companies: [],
  loading: true,
  isTracked: () => false,
  toggle: async () => {},
});
