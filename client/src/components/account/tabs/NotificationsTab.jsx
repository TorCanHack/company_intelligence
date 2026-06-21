import { useState } from 'react';
import { Card } from '../../company/Primitives';
import { getNotificationSettings, saveNotificationSettings } from '../../../lib/accountSettings';

const TOGGLES = [
  { key: 'fundingRounds', label: 'Funding rounds', description: 'New raises from watched companies' },
  { key: 'leadershipChanges', label: 'Leadership changes', description: 'Exec hires and departures' },
  { key: 'hiringSurges', label: 'Hiring surges', description: 'Notable headcount changes' },
  { key: 'mergersAndAcquisitions', label: 'M&A activity', description: 'Acquisitions and mergers' },
  { key: 'layoffsAndRisk', label: 'Layoffs & risk', description: 'Workforce cuts and red flags' },
  { key: 'dailyEmailDigest', label: 'Daily email digest', description: 'A morning summary of all activity' },
];

export default function NotificationsTab() {
  const [settings, setSettings] = useState(() => getNotificationSettings());

  const toggle = (key) => {
    const next = { ...settings, [key]: !settings[key] };
    setSettings(next);
    saveNotificationSettings(next);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="font-handwritten text-2xl text-sketch-heading">Notifications</div>
        <p className="mt-1 text-sm text-sketch-muted">Choose which signals reach you. Click a switch to toggle.</p>
      </div>

      <Card>
        {TOGGLES.map((item, index) => (
          <div
            key={item.key}
            className={`flex items-center justify-between gap-3 py-3.5 ${
              index < TOGGLES.length - 1 ? 'border-b border-dashed border-sketch-divider' : ''
            }`}
          >
            <div>
              <div className="font-handwritten text-lg text-sketch-heading">{item.label}</div>
              <p className="text-[13px] text-sketch-muted">{item.description}</p>
            </div>
            <button
              type="button"
              onClick={() => toggle(item.key)}
              aria-pressed={settings[item.key]}
              className={`relative h-6 w-11 flex-none rounded-full transition ${
                settings[item.key] ? 'bg-sketch-accent' : 'bg-sketch-border'
              }`}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-white transition ${
                  settings[item.key] ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        ))}
      </Card>
    </div>
  );
}
