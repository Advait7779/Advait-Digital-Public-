const PRODUCTION_API_BASE = 'https://publicapi.advaitdigital.co.in';
const PRODUCTION_HOSTS = new Set([
  'advaitdigital.co.in',
  'www.advaitdigital.co.in',
]);
const LOCAL_DEV_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
]);

export function getApiBaseUrl() {
  const envApiUrl = import.meta.env.VITE_API_URL?.trim() || import.meta.env.VITE_API_BASE?.trim();
  if (envApiUrl) {
    return envApiUrl.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined') {
    if (LOCAL_DEV_HOSTS.has(window.location.hostname)) {
      return 'http://localhost:5000';
    }
    if (PRODUCTION_HOSTS.has(window.location.hostname)) {
      return PRODUCTION_API_BASE;
    }
  }

  return '';
}

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

export async function submitLead(payload) {
  const response = await fetch(buildApiUrl('/api/submit-lead'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // A non-JSON response still counts as an API failure below.
  }

  if (!response.ok || data?.success === false) {
    throw new Error(data?.error || 'Unable to submit your request right now. Please try again.');
  }

  return data;
}
