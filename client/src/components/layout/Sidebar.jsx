import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', to: '/home' },
  { id: 'watch', label: 'Watchlist', to: '/watchlist' },
  { id: 'signals', label: 'Signals', to: '/signals' },
];

const WATCHLIST_PREVIEW = [
  { name: 'Acme Corp', active: true },
  { name: 'Northwind', active: true },
  { name: 'Globex', active: false },
  { name: 'Initech', active: true },
];

export default function Sidebar({ current = 'home' }) {
  return (
    <div className="flex h-full min-h-190 w-50 flex-none flex-col border-r border-dashed border-sketch-divider p-3.5">
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
      <div className="flex flex-col gap-2.5">
        {WATCHLIST_PREVIEW.map((item) => (
          <Link key={item.name} to="/directory" className="flex items-center gap-2 px-1.5">
            <span className="size-4.5 flex-none rounded bg-sketch-chip" />
            <span className="flex-1 truncate text-xs text-sketch-text">{item.name}</span>
            <span className={`size-1.5 flex-none rounded-full ${item.active ? 'bg-sketch-accent' : 'bg-sketch-border'}`} />
          </Link>
        ))}
      </div>

      <Link
        to="/sign-in"
        className="mt-auto flex items-center gap-2 border-t border-dashed border-sketch-divider px-1.5 pt-2.5"
      >
        <span className="size-6.5 flex-none rounded-full bg-sketch-accent/25" />
        <div className="min-w-0 flex-1">
          <div className="text-xs text-sketch-text">Jane Doe</div>
          <div className="text-[10px] text-sketch-label">Free trial · 12 days left</div>
        </div>
        <span className="text-sm text-sketch-label">›</span>
      </Link>
    </div>
  );
}
