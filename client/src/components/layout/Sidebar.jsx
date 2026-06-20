import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/useAuth';
import { supabase } from '../../lib/supabase';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', to: '/home' },
  { id: 'watch', label: 'Watchlist', to: '/watchlist' },
  { id: 'signals', label: 'Signals', to: '/signals' },
];

// Real watchlist tracking isn't wired up yet — always empty for now.
const WATCHLIST_PREVIEW = [];

export default function Sidebar({ current = 'home' }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/sign-in');
  };

  return (
    <div className="flex h-full w-50 flex-none flex-col overflow-y-auto border-r border-dashed border-sketch-divider p-3.5">
      <div className="mb-6 flex items-center gap-2 px-1.5">
        <span className="size-3.5 flex-none rounded-full bg-sketch-accent" />
        <span className="font-handwritten text-sm text-sketch-heading">Company Intelligence</span>
      </div>

      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const active = current === item.id;
          return (
            <Link
              key={item.id}
              to={item.to}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
                active ? 'bg-sketch-hover text-sketch-heading' : 'text-sketch-muted'
              }`}
            >
              <span className={`size-3.5 flex-none rounded ${active ? 'bg-sketch-accent' : 'bg-sketch-border'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mb-2.5 mt-6 px-1.5 text-[11px] uppercase tracking-wide text-sketch-label">
        Watchlist
      </div>
      {WATCHLIST_PREVIEW.length === 0 ? (
        <Link
          to="/directory"
          className="flex flex-col items-center gap-1 rounded-lg border border-dashed border-sketch-divider px-2.5 py-3 text-center"
        >
          <span className="text-[11px] text-sketch-muted">No companies tracked yet</span>
          <span className="text-[11px] font-medium text-sketch-accent">+ Track a company</span>
        </Link>
      ) : (
        <div className="flex flex-col gap-2.5">
          {WATCHLIST_PREVIEW.map((item) => (
            <Link key={item.name} to={`/companies/${item.slug}`} className="flex items-center gap-2 px-1.5">
              <span className="size-4.5 flex-none rounded bg-sketch-chip" />
              <span className="flex-1 truncate text-xs text-sketch-text">{item.name}</span>
              <span className={`size-1.5 flex-none rounded-full ${item.active ? 'bg-sketch-accent' : 'bg-sketch-border'}`} />
            </Link>
          ))}
        </div>
      )}

      {user ? (
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-auto flex items-center gap-2 border-t border-dashed border-sketch-divider px-1.5 pt-2.5 text-left"
        >
          <span className="size-6.5 flex-none rounded-full bg-sketch-accent/25" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs text-sketch-text">{user.email}</div>
            <div className="text-[10px] text-sketch-label">Sign out</div>
          </div>
          <span className="text-sm text-sketch-label">›</span>
        </button>
      ) : (
        <Link
          to="/sign-in"
          className="mt-auto flex items-center gap-2 border-t border-dashed border-sketch-divider px-1.5 pt-2.5"
        >
          <span className="size-6.5 flex-none rounded-full bg-sketch-accent/25" />
          <div className="min-w-0 flex-1">
            <div className="text-xs text-sketch-text">Sign in</div>
            <div className="text-[10px] text-sketch-label">Free trial · 14 days</div>
          </div>
          <span className="text-sm text-sketch-label">›</span>
        </Link>
      )}
    </div>
  );
}
