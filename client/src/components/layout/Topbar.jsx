import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';

export default function Topbar() {
  return (
    <div className="flex items-center gap-4 border-b border-dashed border-sketch-divider px-3.5 py-3.5 sm:px-5.5">
      <div className="flex flex-1 items-center gap-2.5 rounded-xl border-[1.5px] border-sketch-border px-4 py-2.5">
        <Search className="size-4 flex-none text-sketch-label" />
        <input
          type="text"
          placeholder="Search 40M+ companies…"
          className="w-full bg-transparent text-sm text-sketch-text placeholder:text-sketch-label focus:outline-none"
        />
      </div>
      <Link to="/account?tab=billing" className="flex-none text-[13px] text-sketch-muted hover:text-sketch-text">
        Upgrade
      </Link>
      <Link
        to="/account"
        className="flex size-9 flex-none items-center justify-center rounded-full bg-sketch-accent/25 text-sketch-accent hover:bg-sketch-accent/35"
        aria-label="Account"
      >
        <User className="size-4.5" />
      </Link>
    </div>
  );
}
