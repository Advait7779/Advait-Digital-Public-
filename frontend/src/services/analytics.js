/**
 * Advait Digital - Self-Hosted Analytics Client
 * Sends visit data to /api/analytics/visit (our own backend)
 * No third-party dependencies. Works with cookie consent.
 */

import { buildApiUrl } from './api';

/** Generate or retrieve a session ID stored in sessionStorage */
function getSessionId() {
  let sid = sessionStorage.getItem('advait_sid');
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem('advait_sid', sid);
  }
  return sid;
}

/** Detect device type from userAgent */
function getDeviceType() {
  const ua = navigator.userAgent || '';
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|windows phone/i.test(ua)) return 'mobile';
  return 'desktop';
}

/** Detect browser name */
function getBrowserName() {
  const ua = navigator.userAgent || '';
  if (ua.includes('Chrome') && !ua.includes('Edg') && !ua.includes('OPR')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera';
  return 'Other';
}

/** Parse UTM params from the current URL */
function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
  };
}

/**
 * Track a page visit — call this on every route change.
 * Fire-and-forget: doesn't block the UI.
 * @param {string} page - the current path (e.g. '/services/sms-marketing')
 */
export function trackVisit(page = window.location.pathname) {
  const utms = getUtmParams();

  const payload = {
    page,
    referrer: document.referrer || '',
    device: getDeviceType(),
    browser: getBrowserName(),
    sessionId: getSessionId(),
    ...utms,
  };

  // Fire and forget — non-blocking
  fetch(buildApiUrl('/api/analytics/visit'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true, // ensures it completes even if page navigates away
  }).catch(() => {});
}

/**
 * Fetch public visitor stats from backend.
 * Returns stats object or null on failure.
 */
export async function fetchVisitorStats() {
  try {
    const res = await fetch(buildApiUrl('/api/analytics/public-stats'));
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
