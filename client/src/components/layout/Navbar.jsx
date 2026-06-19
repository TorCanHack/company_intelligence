import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="border-b border-ink-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-ink-950">
          <span className="flex size-7 items-center justify-center rounded-lg bg-ink-950 text-sm text-white">
            CI
          </span>
          Company Intelligence
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-700 sm:flex">
          <Link to="/directory" className="hover:text-ink-950">
            Directory
          </Link>
        </nav>

        <Link
          to="/sign-in"
          className="rounded-full border border-ink-100 px-4 py-1.5 text-sm font-medium text-ink-700 hover:border-ink-300 hover:text-ink-950"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}
