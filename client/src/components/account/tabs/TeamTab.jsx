import { Card } from '../../company/Primitives';
import { getFirstName } from '../../../lib/greeting';

export default function TeamTab({ user }) {
  const name = getFirstName(user) ?? 'You';

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <div className="font-handwritten text-2xl text-sketch-heading">Team</div>
        <button type="button" className="rounded-md bg-sketch-accent px-4.5 py-2.5 text-sm font-medium text-white">
          + Invite teammate
        </button>
      </div>

      <Card>
        <div className="flex items-center gap-3">
          <span className="size-9 flex-none rounded-full bg-sketch-accent/25" />
          <div className="min-w-0 flex-1">
            <div className="text-sm text-sketch-text">{name}</div>
            <div className="text-[13px] text-sketch-muted">{user?.email}</div>
          </div>
          <span className="flex-none rounded-full border border-sketch-accent px-2.5 py-0.5 text-[10px] text-sketch-accent">
            You
          </span>
        </div>
      </Card>

      <p className="text-sm text-sketch-muted">You're the only member on this plan.</p>
    </div>
  );
}
