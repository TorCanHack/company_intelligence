import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardShell from '../components/layout/DashboardShell';
import { useAuth } from '../lib/useAuth';
import { getFirstName } from '../lib/greeting';
import { getTrialDaysLeft } from '../lib/trial';
import ProfileTab from '../components/account/tabs/ProfileTab';
import SecurityTab from '../components/account/tabs/SecurityTab';
import PreferencesTab from '../components/account/tabs/PreferencesTab';
import NotificationsTab from '../components/account/tabs/NotificationsTab';
import BillingTab from '../components/account/tabs/BillingTab';
import TeamTab from '../components/account/tabs/TeamTab';

const TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'security', label: 'Security' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'billing', label: 'Billing' },
  { id: 'team', label: 'Team' },
];

function AccountTopbar({ user }) {
  const name = getFirstName(user) ?? 'Your account';
  const daysLeft = getTrialDaysLeft(user);

  return (
    <div className="flex flex-wrap items-center gap-3.5 border-b border-dashed border-sketch-divider px-3.5 py-3.5 sm:px-5.5">
      <span className="size-11 flex-none rounded-full bg-sketch-accent/25" />
      <div className="min-w-0 flex-1">
        <div className="font-handwritten truncate text-lg text-sketch-heading">{name}</div>
        <div className="truncate text-[13px] text-sketch-muted">{user?.email}</div>
      </div>
      {daysLeft !== null && (
        <span className="flex-none rounded-full border border-sketch-accent px-3.5 py-1.5 text-[13px] text-sketch-accent">
          Free trial · {daysLeft} day{daysLeft === 1 ? '' : 's'} left
        </span>
      )}
      <button type="button" className="flex-none rounded-md bg-sketch-accent px-4.5 py-2.5 text-[13px] font-medium text-white">
        Upgrade plan
      </button>
    </div>
  );
}

export default function AccountPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const initialTab = TABS.some((t) => t.id === searchParams.get('tab')) ? searchParams.get('tab') : 'profile';
  const [tab, setTab] = useState(initialTab);

  return (
    <DashboardShell current={null} topbar={<AccountTopbar user={user} />}>
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
        <nav className="flex-none overflow-x-auto sm:w-44 sm:overflow-x-visible">
          <div className="flex gap-0.5 sm:flex-col">
            {TABS.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex-none whitespace-nowrap rounded-lg px-3.5 py-2.5 text-left text-sm ${
                    active ? 'bg-sketch-hover font-medium text-sketch-heading' : 'text-sketch-muted'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="min-w-0 flex-1">
          {tab === 'profile' && <ProfileTab user={user} />}
          {tab === 'security' && <SecurityTab />}
          {tab === 'preferences' && <PreferencesTab />}
          {tab === 'notifications' && <NotificationsTab />}
          {tab === 'billing' && <BillingTab user={user} />}
          {tab === 'team' && <TeamTab user={user} />}
        </div>
      </div>
    </DashboardShell>
  );
}
