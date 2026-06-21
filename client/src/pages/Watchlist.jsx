import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import DashboardShell from '../components/layout/DashboardShell';
import CompanyListCard from '../components/company/CompanyListCard';
import { useWatchlist } from '../lib/useWatchlist';

function WatchlistTopbar({ searchInput, onSearchChange }) {
  return (
    <div className="flex items-center gap-4 border-b border-dashed border-sketch-divider px-3.5 py-3.5 sm:px-5.5">
      <div className="flex flex-1 items-center gap-2.5 rounded-xl border-[1.5px] border-sketch-border px-4 py-2.5">
        <Search className="size-4 flex-none text-sketch-label" />
        <input
          type="text"
          value={searchInput}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search your watchlist…"
          className="w-full bg-transparent text-sm text-sketch-text placeholder:text-sketch-label focus:outline-none"
        />
      </div>
    </div>
  );
}

export default function Watchlist() {
  const { companies, loading } = useWatchlist();
  const [sector, setSector] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const sectors = useMemo(() => {
    const seen = new Map();
    companies.forEach((company) => {
      if (company.sector_slug && !seen.has(company.sector_slug)) {
        seen.set(company.sector_slug, company.sector);
      }
    });
    return Array.from(seen, ([slug, name]) => ({ slug, name }));
  }, [companies]);

  const filtered = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchInput.trim().toLowerCase());
    const matchesSector = !sector || company.sector_slug === sector;
    return matchesSearch && matchesSector;
  });

  return (
    <DashboardShell
      current="watch"
      topbar={<WatchlistTopbar searchInput={searchInput} onSearchChange={setSearchInput} />}
    >
      <div className="mb-4">
        <h1 className="font-handwritten text-3xl text-sketch-heading">Your watchlist</h1>
        <p className="mt-1.5 text-sm text-sketch-muted">
          {companies.length === 0
            ? "You're not tracking any companies yet — browse the directory and add one."
            : `Tracking ${companies.length} ${companies.length === 1 ? 'company' : 'companies'}.`}
        </p>
      </div>

      {sectors.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setSector('')}
            className={`rounded-full px-4 py-2 text-sm ${
              sector === '' ? 'bg-sketch-accent text-white' : 'border border-dashed border-sketch-divider text-sketch-muted'
            }`}
          >
            All sectors
          </button>
          {sectors.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setSector(s.slug)}
              className={`rounded-full px-4 py-2 text-sm ${
                sector === s.slug ? 'bg-sketch-accent text-white' : 'border border-dashed border-sketch-divider text-sketch-muted'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-sketch-muted">Loading your watchlist…</p>
      ) : companies.length === 0 ? (
        <Link
          to="/directory"
          className="block rounded-[10px] border border-dashed border-sketch-divider py-10 text-center text-sm text-sketch-accent"
        >
          Browse the directory to start tracking companies →
        </Link>
      ) : filtered.length === 0 ? (
        <p className="rounded-[10px] border border-dashed border-sketch-divider py-10 text-center text-sm text-sketch-muted">
          No tracked companies match your search.
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {filtered.map((company) => (
            <CompanyListCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
