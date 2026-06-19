export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-ink-100 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}
