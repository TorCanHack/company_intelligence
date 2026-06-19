export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-ink-100 bg-ink-50 px-2.5 py-0.5 text-xs font-medium text-ink-700 ${className}`}
    >
      {children}
    </span>
  );
}
