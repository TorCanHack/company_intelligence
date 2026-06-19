import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCompanyBySlug } from '../lib/api';
import { deriveCompanyMetrics, deriveFundingSignals } from '../lib/companyInsights';
import Sidebar from '../components/layout/Sidebar';
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
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      setTab('overview');

      try {
        const result = await getCompanyBySlug(slug);
        if (active) setData(result);
      } catch (err) {
        if (active) setError(err.message);
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
      <div className="flex flex-col gap-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col gap-4">
        <EmptyState title="Company not found" description={error || 'This company does not exist.'} />
        <Link to="/directory" className="text-sm font-medium text-accent-600 hover:underline">
          Back to directory
        </Link>
      </div>
    );
  }

  const { company, founders, fundingRounds, sources } = data;
  const { lastRound, totalRaisedUsd, valuationUsd } = deriveCompanyMetrics(data);
  const signals = deriveFundingSignals(fundingRounds);

  return (
    <div className="font-script -mx-6 -my-10 min-h-[calc(100vh-73px)] bg-sketch-bg px-6 py-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-3 text-sm text-sketch-muted">
          <Link to="/directory" className="text-sketch-muted hover:text-sketch-text">
            ← Directory
          </Link>{' '}
          · Company profile
        </div>

        <div className="flex min-h-190 overflow-hidden rounded-sm border border-sketch-border bg-white shadow-sm">
          <Sidebar current="watch" />

          <div className="flex min-w-0 flex-1 flex-col">
            <CompanyHeader
              company={company}
              lastRound={lastRound}
              totalRaisedUsd={totalRaisedUsd}
              valuationUsd={valuationUsd}
            />
            <CompanyTabs active={tab} onChange={setTab} />

            <div className="p-5.5">
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
              {tab === 'people' && <PeopleTab founders={founders} employeeRange={company.employee_range} />}
              {tab === 'signals' && <SignalsTab signals={signals} />}
              {tab === 'news' && <NewsTab sources={sources} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
