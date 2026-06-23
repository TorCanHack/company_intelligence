import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPerson } from '../lib/api';
import DashboardShell from '../components/layout/DashboardShell';
import { Card } from '../components/company/Primitives';
import CompanyLogo from '../components/company/CompanyLogo';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';

export default function FounderProfilePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getPerson(id);
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
  }, [id]);

  if (loading) {
    return (
      <DashboardShell current={null}>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-64" />
        </div>
      </DashboardShell>
    );
  }

  if (error || !data) {
    return (
      <DashboardShell current={null}>
        <div className="flex flex-col gap-4">
          <EmptyState title="Founder not found" description={error || 'This founder does not exist.'} />
          <Link to="/directory" className="text-sm font-medium text-sketch-accent hover:underline">
            Back to directory
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const { person, companies } = data;

  return (
    <DashboardShell
      current={null}
      topbar={
        <div className="border-b border-dashed border-sketch-divider px-3.5 py-2 text-sm text-sketch-muted sm:px-5.5">
          <Link to="/directory" className="text-sketch-muted hover:text-sketch-text">
            ← Directory
          </Link>{' '}
          · Founder profile
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3.5">
          <span className="size-13 flex-none rounded-full bg-sketch-accent/20" />
          <div className="min-w-0 flex-1">
            <div className="font-handwritten truncate text-2xl text-sketch-heading">{person.full_name}</div>
            <div className="mt-0.5 text-[13px] text-sketch-muted">
              Linked to {companies.length} {companies.length === 1 ? 'company' : 'companies'} in our index
            </div>
          </div>
          {person.linkedin_url && (
            <a
              href={person.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="flex-none text-[13px] text-sketch-accent hover:underline"
            >
              LinkedIn
            </a>
          )}
        </div>

        {person.bio && <p className="text-sm leading-6 text-sketch-text">{person.bio}</p>}

        <Card title="Portfolio map">
          {companies.length === 0 ? (
            <p className="text-sm text-sketch-muted">No linked companies on record.</p>
          ) : (
            <div className="flex flex-col gap-3.5">
              {companies.map((company) => (
                <div
                  key={company.company_id}
                  className="flex items-center gap-3 border-b border-dashed border-sketch-divider pb-3.5 last:border-0 last:pb-0"
                >
                  <CompanyLogo name={company.company_name} logoUrl={company.company_logo_url} className="size-9 rounded-md" />
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/companies/${company.company_slug}`}
                      className="text-[13px] font-medium text-sketch-text hover:text-sketch-accent"
                    >
                      {company.company_name}
                    </Link>
                    <div className="mt-0.5 text-[11px] text-sketch-label">
                      {[company.role, company.sector, company.founded_year ? `Founded ${company.founded_year}` : null]
                        .filter(Boolean)
                        .join(' · ')}
                    </div>
                  </div>
                  <span className="flex-none rounded-full border border-sketch-accent px-2.5 py-0.5 text-[10px] capitalize text-sketch-accent">
                    {company.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardShell>
  );
}
