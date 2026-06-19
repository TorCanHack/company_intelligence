import { useEffect, useState } from 'react';
import { getCompanies, getSectors } from '../lib/api';
import Hero from '../components/directory/Hero';
import CompanyGrid from '../components/directory/CompanyGrid';

const PAGE_SIZE = 12;

export default function DirectoryPage() {
  const [sectors, setSectors] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('');
  const [page, setPage] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSectors()
      .then((data) => setSectors(data.sectors))
      .catch(() => setSectors([]));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCompanies({ search, sector, page, pageSize: PAGE_SIZE });
        if (!active) return;
        setCompanies(data.companies);
        setTotal(data.total);
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
  }, [search, sector, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="flex flex-col gap-10">
      <Hero
        sectors={sectors}
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        sector={sector}
        onSectorSelect={(slug) => {
          setSector(slug);
          setPage(1);
        }}
      />

      <section className="flex flex-col gap-4">
        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <CompanyGrid companies={companies} loading={loading} />
        )}

        {!loading && !error && total > PAGE_SIZE && (
          <div className="flex items-center justify-center gap-4 pt-2 text-sm text-ink-700">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-lg border border-ink-100 px-3 py-1.5 disabled:opacity-40"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-lg border border-ink-100 px-3 py-1.5 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
