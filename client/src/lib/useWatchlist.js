import { useContext } from 'react';
import { WatchlistContext } from './watchlist-context';

export const useWatchlist = () => useContext(WatchlistContext);
