export function Card({ title, right, children }) {
  return (
    <div className="rounded-[10px] border-[1.5px] border-sketch-border p-4.5">
      {title && (
        <div className="mb-3.5 flex items-baseline justify-between gap-2">
          <span className="font-handwritten text-base text-sketch-heading">{title}</span>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

export function TabLink({ onClick, children = 'All' }) {
  return (
    <button type="button" onClick={onClick} className="text-[11px] text-sketch-accent">
      {children}
    </button>
  );
}

export function Stat({ label, value, accent }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-sketch-label">{label}</div>
      <div
        className={`font-handwritten mt-1 text-xl capitalize ${accent ? 'text-sketch-accent' : 'text-sketch-heading'}`}
      >
        {value}
      </div>
    </div>
  );
}

export function PersonRow({ person, onView }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="size-7.5 flex-none rounded-full bg-sketch-accent/20" />
      <div className="min-w-0 flex-1">
        <div className="text-[13px] text-sketch-text">{person.name}</div>
        <div className="text-[11px] text-sketch-label">{person.role}</div>
      </div>
      {onView && (
        <button type="button" onClick={onView} className="text-[11px] text-sketch-accent">
          View
        </button>
      )}
    </div>
  );
}

export function SignalRow({ signal }) {
  return (
    <div className="flex flex-1 gap-2.5">
      <span className="mt-1 size-2 flex-none rounded-full bg-sketch-accent" />
      <div className="min-w-0 flex-1">
        <div className="text-[13px] text-sketch-text">{signal.text}</div>
        <div className="mt-0.5 text-[10px] text-sketch-label">{signal.time}</div>
      </div>
    </div>
  );
}
