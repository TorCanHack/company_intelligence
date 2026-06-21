import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function SecurityTab() {
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus(null);

    const { error } = await supabase.auth.updateUser({ password });

    setSaving(false);
    if (error) {
      setStatus({ type: 'error', message: error.message });
    } else {
      setPassword('');
      setStatus({ type: 'success', message: 'Password updated.' });
    }
  };

  const handleCancel = () => {
    setPassword('');
    setStatus(null);
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-5">
      <div className="font-handwritten text-2xl text-sketch-heading">Password</div>

      <label className="flex max-w-sm flex-col gap-1.5 text-xs text-sketch-label">
        New password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 6 characters"
          minLength={6}
          required
          className="rounded-lg border-[1.5px] border-sketch-border px-3.5 py-2.5 text-sm text-sketch-text placeholder:text-sketch-label/70"
        />
      </label>

      {status && (
        <p className={`text-sm ${status.type === 'error' ? 'text-red-600' : 'text-sketch-accent'}`}>{status.message}</p>
      )}

      <div className="flex gap-2.5">
        <button
          type="submit"
          disabled={saving || !password}
          className="rounded-lg bg-sketch-accent px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Update password'}
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
