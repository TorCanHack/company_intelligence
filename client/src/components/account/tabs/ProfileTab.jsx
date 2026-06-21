import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

const TIMEZONE_OPTIONS = Array.from(
  new Set([Intl.DateTimeFormat().resolvedOptions().timeZone, 'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Africa/Lagos'])
);

export default function ProfileTab({ user }) {
  const metadata = user?.user_metadata ?? {};

  const initial = {
    fullName: metadata.full_name ?? '',
    role: metadata.role ?? '',
    firm: metadata.firm ?? '',
    timezone: metadata.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus(null);

    const { error } = await supabase.auth.updateUser({
      data: { full_name: form.fullName, role: form.role, firm: form.firm, timezone: form.timezone },
    });

    setSaving(false);
    if (error) {
      setStatus({ type: 'error', message: error.message });
    } else {
      setStatus({ type: 'success', message: 'Profile updated.' });
    }
  };

  const handleCancel = () => {
    setForm(initial);
    setStatus(null);
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-5">
      <div className="font-handwritten text-2xl text-sketch-heading">Profile</div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs text-sketch-label">
          Full name
          <input
            type="text"
            value={form.fullName}
            onChange={update('fullName')}
            placeholder="Your name"
            className="rounded-lg border-[1.5px] border-sketch-border px-3.5 py-2.5 text-sm text-sketch-text placeholder:text-sketch-label/70"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs text-sketch-label">
          Email
          <input
            type="email"
            value={user?.email ?? ''}
            disabled
            className="rounded-lg border-[1.5px] border-sketch-border bg-sketch-hover px-3.5 py-2.5 text-sm text-sketch-muted"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs text-sketch-label">
          Role
          <input
            type="text"
            value={form.role}
            onChange={update('role')}
            placeholder="e.g. Investor, Analyst"
            className="rounded-lg border-[1.5px] border-sketch-border px-3.5 py-2.5 text-sm text-sketch-text placeholder:text-sketch-label/70"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs text-sketch-label">
          Firm
          <input
            type="text"
            value={form.firm}
            onChange={update('firm')}
            placeholder="Where you work"
            className="rounded-lg border-[1.5px] border-sketch-border px-3.5 py-2.5 text-sm text-sketch-text placeholder:text-sketch-label/70"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs text-sketch-label">
          Timezone
          <select
            value={form.timezone}
            onChange={update('timezone')}
            className="rounded-lg border-[1.5px] border-sketch-border bg-white px-3.5 py-2.5 text-sm text-sketch-text"
          >
            {TIMEZONE_OPTIONS.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </label>
      </div>

      {status && (
        <p className={`text-sm ${status.type === 'error' ? 'text-red-600' : 'text-sketch-accent'}`}>{status.message}</p>
      )}

      <div className="flex gap-2.5">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-sketch-accent px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg border-[1.5px] border-sketch-border px-5 py-2.5 text-sm text-sketch-text"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
