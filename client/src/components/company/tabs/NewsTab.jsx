import { formatDate } from '../../../lib/format';

export default function NewsTab({ sources }) {
  if (sources.length === 0) {
    return <p className="text-sm text-sketch-muted">No news or sources on record.</p>;
  }

  return (
    <div className="flex flex-col gap-3.5">
      {sources.map((source) => (
        <a
          key={source.id}
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="flex gap-3.5 rounded-[10px] border-[1.5px] border-sketch-border p-4 hover:border-sketch-accent/40"
        >
          <span className="size-14 flex-none rounded-lg bg-[repeating-linear-gradient(135deg,#f1efe9_0_7px,#f7f6f1_7px_14px)]" />
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 text-sm text-sketch-text">{source.note || source.publisher}</div>
            <div className="text-[11px] text-sketch-label">
              {source.publisher} · {formatDate(source.published_at)}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
