const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'funding', label: 'Funding' },
  { id: 'people', label: 'People' },
  { id: 'signals', label: 'Signals' },
  { id: 'news', label: 'News' },
];

export default function CompanyTabs({ active, onChange }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto border-b border-dashed border-sketch-divider px-3.5 pt-3 sm:px-5.5">
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex-none whitespace-nowrap border-b-2 px-3.5 py-2 text-[13px] ${
              isActive ? 'border-sketch-accent text-sketch-heading' : 'border-transparent text-sketch-label'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
