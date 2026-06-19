import CompanyCard from './CompanyCard';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';

export default function CompanyGrid({ companies, loading }) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-40" />
        ))}
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <EmptyState
        title="No companies match your filters"
        description="Try a different search term or sector."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}
