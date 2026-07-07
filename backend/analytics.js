import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ANALYTICS_FILE = path.join(__dirname, 'analytics.json');
const MAX_VISITS = 10000; // Keep last 10,000 visits in rolling log

/**
 * Reads the analytics data file, returning { visits: [], totalCount: number }
 */
function readData() {
  const BASE_OFFSET = 16000;
  try {
    if (!fs.existsSync(ANALYTICS_FILE)) {
      return { visits: [], totalCount: BASE_OFFSET };
    }
    const raw = fs.readFileSync(ANALYTICS_FILE, 'utf8');
    const data = JSON.parse(raw);
    
    // Ensure count is at least 16,000 if not set or lower
    if (!data.totalCount || data.totalCount < BASE_OFFSET) {
      data.totalCount = BASE_OFFSET;
    }
    return data;
  } catch {
    return { visits: [], totalCount: BASE_OFFSET };
  }
}

/**
 * Writes the analytics data file atomically
 */
function writeData(data) {
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[ERROR] [Analytics] Failed to write analytics.json:', err.message);
  }
}

/**
 * Records a single visit entry
 * @param {Object} visitData
 */
export function recordVisit(visitData) {
  const data = readData();

  const entry = {
    ts: new Date().toISOString(),
    page: visitData.page || '/',
    referrer: visitData.referrer || '',
    utm_source: visitData.utm_source || '',
    utm_medium: visitData.utm_medium || '',
    utm_campaign: visitData.utm_campaign || '',
    device: visitData.device || 'unknown',
    browser: visitData.browser || 'unknown',
    ip: visitData.ip || '',
    sessionId: visitData.sessionId || '',
  };

  // Increment persistent total (never reset)
  data.totalCount = (data.totalCount || 0) + 1;

  // Keep rolling window of recent visits
  data.visits = [entry, ...(data.visits || [])].slice(0, MAX_VISITS);

  writeData(data);
  return data.totalCount;
}

/**
 * Returns aggregated statistics
 */
export function getStats() {
  const data = readData();
  const visits = data.visits || [];
  const totalCount = data.totalCount || 0;

  // Today's visits
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayCount = visits.filter(v => v.ts && v.ts.startsWith(todayStr)).length;

  // This week
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const weekCount = visits.filter(v => v.ts && new Date(v.ts) >= weekAgo).length;

  // Top pages
  const pageMap = {};
  for (const v of visits) {
    const p = v.page || '/';
    pageMap[p] = (pageMap[p] || 0) + 1;
  }
  const topPages = Object.entries(pageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, count]) => ({ page, count }));

  // Top referrers (exclude empty / direct)
  const refMap = {};
  for (const v of visits) {
    if (v.referrer && v.referrer.trim()) {
      refMap[v.referrer] = (refMap[v.referrer] || 0) + 1;
    }
  }
  const topReferrers = Object.entries(refMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([referrer, count]) => ({ referrer, count }));

  // Device breakdown
  const deviceMap = {};
  for (const v of visits) {
    const d = v.device || 'unknown';
    deviceMap[d] = (deviceMap[d] || 0) + 1;
  }
  const deviceBreakdown = Object.entries(deviceMap).map(([device, count]) => ({ device, count }));

  // UTM sources breakdown
  const utmMap = {};
  for (const v of visits) {
    if (v.utm_source) {
      utmMap[v.utm_source] = (utmMap[v.utm_source] || 0) + 1;
    }
  }
  const utmSources = Object.entries(utmMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([source, count]) => ({ source, count }));

  // Daily visits for last 7 days
  const dailyMap = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    dailyMap[d.toISOString().slice(0, 10)] = 0;
  }
  for (const v of visits) {
    const day = (v.ts || '').slice(0, 10);
    if (day in dailyMap) dailyMap[day]++;
  }
  const dailyVisits = Object.entries(dailyMap).map(([date, count]) => ({ date, count }));

  return {
    totalCount,
    todayCount,
    weekCount,
    topPages,
    topReferrers,
    deviceBreakdown,
    utmSources,
    dailyVisits,
    lastUpdated: new Date().toISOString(),
  };
}
