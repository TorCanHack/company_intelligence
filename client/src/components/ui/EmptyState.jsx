export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink-100 px-6 py-12 text-center">
      <p className="font-semibold text-ink-900">{title}</p>
      {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
    </div>
  );
}
