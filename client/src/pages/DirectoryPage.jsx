import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import DashboardShell from '../components/layout/DashboardShell';
import CompanyListCard from '../components/company/CompanyListCard';
import { getCompanies, getSectors } from '../lib/api';

const PAGE_SIZE = 12;

const FOUNDER_REGIONS = [
  { slug: 'west-africa', label: 'West Africa' },
  { slug: 'east-africa', label: 'East Africa' },
  { slug: 'southern-africa', label: 'Southern Africa' },
  { slug: 'north-africa', label: 'North Africa' },
  { slug: 'central-africa', label: 'Central Africa' },
];

function DirectoryTopbar({ searchInput, onSearchChange }) {
  return (
    <div className="flex items-center gap-4 border-b border-dashed border-sketch-divider px-3.5 py-3.5 sm:px-5.5">
      <div className="flex flex-1 items-center gap-2.5 rounded-xl border-[1.5px] border-sketch-border px-4 py-2.5">
        <Search className="size-4 flex-none text-sketch-label" />
        <input
          type="text"
          value={searchInput}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search companies by name, sector, or location…"
          className="w-full bg-transparent text-sm text-sketch-text placeholder:text-sketch-label focus:outline-none"
        />
      </div>
    </div>
  );
}

export default function DirectoryPage() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') ?? '';

  const [sectors, setSectors] = useState([]);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);
  const [sector, setSector] = useState('');
  const [founderSerial, setFounderSerial] = useState(false);
  const [founderCrossSector, setFounderCrossSector] = useState(false);
  const [founderPriorExit, setFounderPriorExit] = useState(false);
  const [founderRegion, setFounderRegion] = useState('');
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
        const data = await getCompanies({
          search, sector, page, pageSize: PAGE_SIZE,
          founderSerial, founderCrossSector, founderPriorExit, founderRegion,
        });
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
  }, [search, sector, page, founderSerial, founderCrossSector, founderPriorExit, founderRegion]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <DashboardShell
      current={null}
      topbar={<DirectoryTopbar searchInput={searchInput} onSearchChange={setSearchInput} />}
    >
      <div className="mb-4">
        <h1 className="font-handwritten text-3xl text-sketch-heading">Directory</h1>
        <p className="mt-1.5 text-sm text-sketch-muted">
          Browse every company we track and add the ones you want to watch.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => {
            setSector('');
            setPage(1);
          }}
          className={`rounded-full px-4 py-2 text-sm ${
            sector === '' ? 'bg-sketch-accent text-white' : 'border border-dashed border-sketch-divider text-sketch-muted'
          }`}
        >
          All sectors
        </button>
        {sectors.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => {
              setSector(s.slug);
              setPage(1);
            }}
            className={`rounded-full px-4 py-2 text-sm ${
              sector === s.slug ? 'bg-sketch-accent text-white' : 'border border-dashed border-sketch-divider text-sketch-muted'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        {[
          { label: 'Serial founders', active: founderSerial, onToggle: () => setFounderSerial((v) => !v) },
          { label: 'Multi-sector founders', active: founderCrossSector, onToggle: () => setFounderCrossSector((v) => !v) },
          { label: 'Prior exits', active: founderPriorExit, onToggle: () => setFounderPriorExit((v) => !v) },
        ].map(({ label, active, onToggle }) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              onToggle();
              setPage(1);
            }}
            className={`rounded-full px-4 py-2 text-sm ${
              active ? 'bg-sketch-accent text-white' : 'border border-dashed border-sketch-divider text-sketch-muted'
            }`}
          >
            {label}
          </button>
        ))}

        <select
          value={founderRegion}
          onChange={(event) => {
            setFounderRegion(event.target.value);
            setPage(1);
          }}
          className={`rounded-full border border-dashed border-sketch-divider px-4 py-2 text-sm ${
            founderRegion ? 'bg-sketch-accent text-white' : 'text-sketch-muted'
          }`}
        >
          <option value="">Founder region: any</option>
          {FOUNDER_REGIONS.map((region) => (
            <option key={region.slug} value={region.slug}>
              {region.label}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : loading ? (
        <p className="text-sm text-sketch-muted">Loading companies…</p>
      ) : companies.length === 0 ? (
        <p className="rounded-[10px] border border-dashed border-sketch-divider py-10 text-center text-sm text-sketch-muted">
          No companies match your search.
        </p>
      ) : (
        <>
          <div className="grid gap-5 lg:grid-cols-2">
            {companies.map((company) => (
              <CompanyListCard key={company.id} company={company} />
            ))}
          </div>

          {total > PAGE_SIZE && (
            <div className="mt-5 flex items-center justify-center gap-4 text-sm text-sketch-muted">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-full border border-dashed border-sketch-divider px-4 py-2 disabled:opacity-40"
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
                className="rounded-full border border-dashed border-sketch-divider px-4 py-2 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </DashboardShell>
  );
}
