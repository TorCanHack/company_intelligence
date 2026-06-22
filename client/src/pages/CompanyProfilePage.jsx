import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCompanyBySlug } from '../lib/api';
import { deriveCompanyMetrics, deriveFundingSignals } from '../lib/companyInsights';
import { addRecentView } from '../lib/recentViews';
import DashboardShell from '../components/layout/DashboardShell';
import CompanyHeader from '../components/company/CompanyHeader';
import CompanyTabs from '../components/company/CompanyTabs';
import OverviewTab from '../components/company/tabs/OverviewTab';
import FundingTab from '../components/company/tabs/FundingTab';
import PeopleTab from '../components/company/tabs/PeopleTab';
import SignalsTab from '../components/company/tabs/SignalsTab';
import NewsTab from '../components/company/tabs/NewsTab';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';

export default function CompanyProfilePage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      setStatus(null);
      setTab('overview');

      try {
        const result = await getCompanyBySlug(slug);
        if (active) {
          setData(result);
          addRecentView({
            slug: result.company.slug,
            name: result.company.name,
            sector: result.company.sector,
            employeeRange: result.company.employee_range,
            stage: result.fundingRounds[0]?.round_type ?? null,
          });
        }
      } catch (err) {
        if (active) {
          setError(err.message);
          setStatus(err.status ?? null);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <DashboardShell current={null}>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-40" />
          <Skeleton className="h-64" />
        </div>
      </DashboardShell>
    );
  }

  if (error || !data) {
    if (status === 401) {
      return (
        <DashboardShell current={null}>
          <div className="flex flex-col gap-4">
            <EmptyState title="Sign in to view this company" description="Your session has expired or you're not signed in." />
            <Link to="/sign-in" className="text-sm font-medium text-sketch-accent hover:underline">
              Sign in
            </Link>
          </div>
        </DashboardShell>
      );
    }

    return (
      <DashboardShell current={null}>
        <div className="flex flex-col gap-4">
          <EmptyState title="Company not found" description={error || 'This company does not exist.'} />
          <Link to="/directory" className="text-sm font-medium text-sketch-accent hover:underline">
            Back to directory
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const { company, founders, fundingRounds, sources } = data;
  const { lastRound, totalRaisedUsd, valuationUsd } = deriveCompanyMetrics(data);
  const signals = deriveFundingSignals(fundingRounds);

  return (
    <DashboardShell
      current={null}
      topbar={
        <div>
          <div className="border-b border-dashed border-sketch-divider px-3.5 py-2 text-sm text-sketch-muted sm:px-5.5">
            <Link to="/directory" className="text-sketch-muted hover:text-sketch-text">
              ← Directory
            </Link>{' '}
            · Company profile
          </div>
          <CompanyHeader
            company={company}
            lastRound={lastRound}
            totalRaisedUsd={totalRaisedUsd}
            valuationUsd={valuationUsd}
          />
          <CompanyTabs active={tab} onChange={setTab} />
        </div>
      }
    >
      {tab === 'overview' && (
        <OverviewTab
          company={company}
          founders={founders}
          signals={signals}
          fundingRounds={fundingRounds}
          onNavigateTab={setTab}
        />
      )}
      {tab === 'funding' && (
        <FundingTab fundingRounds={fundingRounds} totalRaisedUsd={totalRaisedUsd} valuationUsd={valuationUsd} />
      )}
      {tab === 'people' && (
        <PeopleTab founders={founders} employeeRange={company.employee_range} companyId={company.id} />
      )}
      {tab === 'signals' && <SignalsTab signals={signals} />}
      {tab === 'news' && <NewsTab sources={sources} />}
    </DashboardShell>
  );
}
