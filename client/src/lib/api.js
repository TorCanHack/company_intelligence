import { supabase } from './supabase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const request = async (path, { method = 'GET' } = {}) => {
  const { data: { session } } = await supabase.auth.getSession();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: session ? { Authorization: `Bearer ${session.access_token}` } : {},
  });
  const body = await response.json();

  if (!response.ok) {
    throw Object.assign(new Error(body.message || 'Request failed.'), { status: response.status });
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

export const getWatchlist = () => request('/api/watchlist');

export const addToWatchlist = (companyId) => request(`/api/watchlist/${companyId}`, { method: 'POST' });

export const removeFromWatchlist = (companyId) => request(`/api/watchlist/${companyId}`, { method: 'DELETE' });

export const getSignals = ({ limit = 20 } = {}) => {
  const params = new URLSearchParams();
  params.set('limit', String(limit));

  return request(`/api/signals?${params.toString()}`);
};
