import useParallax from '../../hooks/useParallax';
import SearchBar from './SearchBar';
import SectorFilter from './SectorFilter';
import heroIllustration from '../../assets/hero.png';

export default function Hero({ sectors, searchInput, onSearchChange, sector, onSectorSelect }) {
  const { ref, offset } = useParallax(0.2);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 sm:px-10 sm:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <div className="animate-drift absolute -left-16 -top-20 size-72 rounded-full bg-accent-500/30 blur-3xl" />
        <div className="animate-drift absolute -right-12 top-4 size-80 rounded-full bg-violet-500/25 blur-3xl [animation-delay:3s]" />

        <svg
          className="absolute inset-x-0 bottom-0 h-32 w-full text-accent-500/40"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <polyline
            points="0,80 40,70 80,75 120,55 160,60 200,35 240,42 280,20 320,28 360,10 400,18"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="relative flex flex-col gap-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Data on companies that don&apos;t file publicly.
            </h1>
            <p className="mt-3 text-ink-100/80">
              Valuation signals, cap table structure, deal history, and founder intelligence for
              Nigeria&apos;s private markets.
            </p>
          </div>
          <img
            src={heroIllustration}
            alt=""
            className="hidden h-32 w-auto drop-shadow-[0_8px_30px_rgba(124,58,237,0.45)] sm:block"
          />
        </div>

        <div className="flex flex-col gap-4">
          <SearchBar value={searchInput} onChange={onSearchChange} />
          <SectorFilter sectors={sectors} activeSlug={sector} onSelect={onSectorSelect} />
        </div>
      </div>
    </section>
  );
}
