import { useEffect, useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from './api';
import { WatchlistContext } from './watchlist-context';

export function WatchlistProvider({ children }) {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!user) {
        if (active) {
          setCompanies([]);
          setLoading(false);
        }
        return;
      }

      if (active) setLoading(true);

      try {
        const data = await getWatchlist();
        if (active) setCompanies(data.companies);
      } catch {
        if (active) setCompanies([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [user]);

  const isTracked = useCallback((companyId) => companies.some((company) => company.id === companyId), [companies]);

  const toggle = useCallback(
    async (company) => {
      if (isTracked(company.id)) {
        setCompanies((current) => current.filter((item) => item.id !== company.id));
        await removeFromWatchlist(company.id).catch(() => {
          setCompanies((current) => [...current, company]);
        });
      } else {
        setCompanies((current) => [{ ...company, is_tracked: true }, ...current]);
        await addToWatchlist(company.id).catch(() => {
          setCompanies((current) => current.filter((item) => item.id !== company.id));
        });
      }
    },
    [isTracked]
  );

  return (
    <WatchlistContext.Provider value={{ companies, loading, isTracked, toggle }}>
      {children}
    </WatchlistContext.Provider>
  );
}
