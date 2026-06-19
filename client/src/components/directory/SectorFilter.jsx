export default function SectorFilter({ sectors, activeSlug, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect('')}
        className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
          activeSlug === ''
            ? 'border-ink-950 bg-ink-950 text-white'
            : 'border-ink-100 bg-white text-ink-700 hover:border-ink-300'
        }`}
      >
        All sectors
      </button>

      {sectors.map((sector) => (
        <button
          key={sector.slug}
          type="button"
          onClick={() => onSelect(sector.slug)}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
            activeSlug === sector.slug
              ? 'border-ink-950 bg-ink-950 text-white'
              : 'border-ink-100 bg-white text-ink-700 hover:border-ink-300'
          }`}
        >
          {sector.name}
        </button>
      ))}
    </div>
  );
}
