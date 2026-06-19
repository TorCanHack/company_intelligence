const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const request = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`);
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message || 'Request failed.');
  }

  return body;
};

export const getSectors = () => request('/api/sectors');

export const getCompanies = ({ search = '', sector = '', page = 1, pageSize = 20 } = {}) => {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (sector) params.set('sector', sector);
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));

  return request(`/api/companies?${params.toString()}`);
};

export const getCompanyBySlug = (slug) => request(`/api/companies/${encodeURIComponent(slug)}`);
