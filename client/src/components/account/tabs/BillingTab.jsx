import { Card } from '../../company/Primitives';
import { getTrialDaysLeft } from '../../../lib/trial';

export default function BillingTab({ user }) {
  const daysLeft = getTrialDaysLeft(user);

  return (
    <div className="flex flex-col gap-5">
      <div className="font-handwritten text-2xl text-sketch-heading">Billing</div>

      <Card>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-handwritten text-lg text-sketch-heading">Free trial</div>
            <p className="text-sm text-sketch-muted">
              {daysLeft === null ? 'Trial status unavailable.' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`}
            </p>
          </div>
          <button type="button" className="flex-none rounded-md bg-sketch-accent px-5 py-2.5 text-sm font-medium text-white">
            Upgrade plan
          </button>
        </div>
      </Card>

      <Card title="Payment method">
        <p className="text-sm text-sketch-muted">No payment method on file.</p>
        <button type="button" className="mt-3 text-sm text-sketch-accent">
          + Add payment method
        </button>
      </Card>

      <Card title="Invoices">
        <p className="text-sm text-sketch-muted">No invoices yet.</p>
      </Card>
    </div>
  );
}
