import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../company/Primitives';
import { getPreferences, savePreferences } from '../../../lib/accountSettings';

const LANDING_PAGE_OPTIONS = [
  { value: 'home', label: 'Home' },
  { value: 'watchlist', label: 'Watchlist' },
  { value: 'signals', label: 'Signals' },
];

const DIGEST_OPTIONS = [
  { value: 'off', label: 'Off' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
];

export default function PreferencesTab() {
  const [preferences, setPreferences] = useState(() => getPreferences());

  const update = (key) => (event) => {
    const next = { ...preferences, [key]: event.target.value };
    setPreferences(next);
    savePreferences(next);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="font-handwritten text-2xl text-sketch-heading">Preferences</div>

      <Card>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-handwritten text-lg text-sketch-heading">Watchlist curation</div>
            <p className="mt-0.5 text-sm text-sketch-muted">Drives which companies & signals we surface</p>
          </div>
          <Link
            to="/watchlist"
            className="flex-none rounded-md border-[1.5px] border-sketch-accent px-3.5 py-2 text-[13px] text-sketch-accent"
          >
            Browse companies
          </Link>
        </div>
        <p className="mt-3.5 text-sm text-sketch-muted">
          No filters set yet — track a company to start tailoring what you see.
        </p>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-3 border-b border-dashed border-sketch-divider pb-4">
          <div>
            <div className="text-sm text-sketch-text">Default landing page</div>
            <p className="text-[13px] text-sketch-muted">Where you start after sign-in</p>
          </div>
          <select
            value={preferences.landingPage}
            onChange={update('landingPage')}
            className="rounded-lg border-[1.5px] border-sketch-border bg-white px-3 py-2 text-sm text-sketch-text"
          >
            {LANDING_PAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4">
          <div>
            <div className="text-sm text-sketch-text">Signal digest</div>
            <p className="text-[13px] text-sketch-muted">How often we summarize activity</p>
          </div>
          <select
            value={preferences.signalDigest}
            onChange={update('signalDigest')}
            className="rounded-lg border-[1.5px] border-sketch-border bg-white px-3 py-2 text-sm text-sketch-text"
          >
            {DIGEST_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </Card>
    </div>
  );
}
