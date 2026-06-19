import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Landmark, Newspaper, Search, Users } from 'lucide-react';

const STATS = [
  { value: '40M+', label: 'companies' },
  { value: '200+', label: 'data sources' },
  { value: '<2s', label: 'lookups' },
  { value: 'Daily', label: 'refresh' },
];

const FEATURES = [
  {
    icon: Building2,
    title: 'Firmographics',
    description: 'Industry, size, location, and structure for every entity in our index.',
  },
  {
    icon: Landmark,
    title: 'Funding & cap table',
    description: 'Round history, investors, valuation signals, and ownership structure.',
  },
  {
    icon: Newspaper,
    title: 'News & signals',
    description: 'Hiring shifts, leadership changes, and press mentions as they happen.',
  },
  {
    icon: Users,
    title: 'People & org chart',
    description: 'Founders, executives, and reporting lines mapped from public records.',
  },
];

const STEPS = [
  { step: '1', title: 'Search', description: 'Look up any company by name or domain.' },
  { step: '2', title: 'Enrich', description: 'We merge 200+ sources into one profile.' },
  { step: '3', title: 'Monitor', description: 'Get notified the moment something changes.' },
];

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/directory?search=${encodeURIComponent(trimmed)}` : '/directory');
  };

  return (
    <div className="font-script bg-white text-sketch-text">
      <header className="border-b border-dashed border-sketch-divider">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="size-3.5 rounded-full bg-sketch-accent" />
            <span className="font-handwritten text-sm text-sketch-heading">Company Intelligence</span>
          </Link>

          <nav className="flex items-center gap-5">
            <a href="#features" className="hidden text-xs text-sketch-muted hover:text-sketch-text sm:inline">
              Features
            </a>
            <a
              href="#how-it-works"
              className="hidden text-xs text-sketch-muted hover:text-sketch-text sm:inline"
            >
              How it works
            </a>
            <Link to="/sign-in" className="text-xs text-sketch-muted hover:text-sketch-text">
              Sign in
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-sketch-accent px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <section className="px-6 py-16 text-center sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-sketch-accent">
            Real-time company intelligence
          </p>
          <h1 className="font-handwritten text-4xl leading-tight text-sketch-heading sm:text-5xl">
            Know any company
            <br />
            before the meeting
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base text-sketch-muted">
            Search 40M+ companies and get firmographics, funding, news, and people, all in one
            profile.
          </p>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-xl border-2 border-sketch-border bg-white p-1.5 pl-4 shadow-sm"
          >
            <Search className="size-4 flex-none text-sketch-label" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search 40M+ companies…"
              className="w-full bg-transparent text-sm text-sketch-text placeholder:text-sketch-label focus:outline-none"
            />
            <button
              type="submit"
              className="flex-none rounded-lg bg-sketch-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Search
            </button>
          </form>
          <p className="mt-3 text-xs text-sketch-label">No credit card · cancel anytime</p>
        </div>
      </section>

      <section className="flex border-y border-dashed border-sketch-divider">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex-1 px-3 py-5 text-center ${
              index < STATS.length - 1 ? 'border-r border-dashed border-sketch-divider' : ''
            }`}
          >
            <div className="font-handwritten text-2xl text-sketch-heading">{stat.value}</div>
            <div className="text-xs text-sketch-muted">{stat.label}</div>
          </div>
        ))}
      </section>

      <section id="features" className="px-6 py-16">
        <h2 className="text-center font-handwritten text-2xl text-sketch-heading">
          Everything in one profile
        </h2>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-lg border-2 border-sketch-border p-5">
              <span className="mb-3 flex size-9 items-center justify-center rounded-md bg-sketch-chip">
                <Icon className="size-5 text-sketch-text" />
              </span>
              <div className="text-sm font-medium text-sketch-text">{title}</div>
              <p className="mt-1.5 text-sm text-sketch-muted">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="px-6 pb-16">
        <h2 className="text-center font-handwritten text-2xl text-sketch-heading">How it works</h2>
        <div className="mx-auto mt-8 flex max-w-2xl items-start justify-between gap-1">
          {STEPS.map((item, index) => (
            <Fragment key={item.step}>
              <div className="flex-1 text-center">
                <div className="mx-auto flex size-9 items-center justify-center rounded-full border-2 border-sketch-accent font-handwritten text-sketch-accent">
                  {item.step}
                </div>
                <div className="mt-2 text-sm text-sketch-text">{item.title}</div>
                <p className="mt-1 text-xs text-sketch-muted">{item.description}</p>
              </div>
              {index < STEPS.length - 1 && (
                <ArrowRight className="mt-2.5 size-4 flex-none text-sketch-divider" />
              )}
            </Fragment>
          ))}
        </div>
      </section>

      <section className="bg-sketch-heading px-6 py-14 text-center">
        <h2 className="font-handwritten text-2xl text-white">Get started in minutes</h2>
        <Link
          to="/signup"
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-sketch-accent px-6 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          Get started
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}
