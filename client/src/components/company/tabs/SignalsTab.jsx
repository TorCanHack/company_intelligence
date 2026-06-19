import { useState } from 'react';

const FILTERS = ['All', 'Funding'];

export default function SignalsTab({ signals }) {
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? signals : signals.filter((signal) => signal.tag === filter);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((label) => {
          const active = filter === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setFilter(label)}
              className={`rounded-full px-3.5 py-1.5 text-xs ${
                active ? 'bg-sketch-accent text-white' : 'border-[1.5px] border-sketch-border text-sketch-text'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2.5">
        {visible.length === 0 ? (
          <p className="text-sm text-sketch-muted">No signals on record.</p>
        ) : (
          visible.map((signal) => (
            <div
              key={signal.id}
              className="flex items-center gap-3.5 rounded-[10px] border-[1.5px] border-sketch-border px-4 py-3.5"
            >
              <span className="size-2.5 flex-none rounded-full bg-sketch-accent" />
              <div className="min-w-0 flex-1">
                <div className="text-[14px] text-sketch-text">{signal.text}</div>
                <div className="mt-0.5 text-[11px] text-sketch-label">{signal.time}</div>
              </div>
              <span className="flex-none rounded-full border border-sketch-accent px-2.5 py-0.5 text-[10px] text-sketch-accent">
                {signal.tag}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
