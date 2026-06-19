import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-2.5 shadow-sm">
      <Search className="size-4 text-ink-300" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search Nigerian companies by name"
        className="w-full bg-transparent text-sm text-ink-950 placeholder:text-ink-300 focus:outline-none"
      />
    </div>
  );
}
