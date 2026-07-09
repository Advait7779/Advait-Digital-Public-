import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { prisma } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ANALYTICS_FILE = path.join(__dirname, 'analytics.json');
const BASE_OFFSET = Number.parseInt(process.env.ANALYTICS_BASE_OFFSET || '16000', 10);
const MAX_RECENT_VISITS = Number.parseInt(process.env.ANALYTICS_RECENT_LIMIT || '10000', 10);
const TOTAL_COUNTER_KEY = 'total_visits';
const IST_OFFSET_MS = 330 * 60 * 1000;
let cachedCounterBaseline = null;

function readFileData() {
  try {
    if (!fs.existsSync(ANALYTICS_FILE)) {
      return { visits: [], totalCount: BASE_OFFSET };
    }
    const raw = fs.readFileSync(ANALYTICS_FILE, 'utf8');
    const data = JSON.parse(raw);
    if (!data.totalCount || data.totalCount < BASE_OFFSET) {
      data.totalCount = BASE_OFFSET;
    }
    return data;
  } catch {
    return { visits: [], totalCount: BASE_OFFSET };
  }
}

function writeFileData(data) {
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[ERROR] [Analytics] Failed to write analytics.json:', err.message);
  }
}

function recordVisitToFile(visitData) {
  const data = readFileData();
  const entry = buildVisitEntry(visitData);

  data.totalCount = Math.max(data.totalCount || 0, BASE_OFFSET) + 1;
  data.visits = [entry, ...(data.visits || [])].slice(0, MAX_RECENT_VISITS);

  writeFileData(data);
  return data.totalCount;
}

function buildVisitEntry(visitData) {
  return {
    ts: new Date().toISOString(),
    page: String(visitData.page || '/').slice(0, 300),
    referrer: String(visitData.referrer || '').slice(0, 1000),
    utm_source: String(visitData.utm_source || '').slice(0, 200),
    utm_medium: String(visitData.utm_medium || '').slice(0, 200),
    utm_campaign: String(visitData.utm_campaign || '').slice(0, 300),
    device: String(visitData.device || 'unknown').slice(0, 50),
    browser: String(visitData.browser || 'unknown').slice(0, 80),
    ip: String(visitData.ip || '').slice(0, 80),
    sessionId: String(visitData.sessionId || '').slice(0, 120),
  };
}

async function getCounterBaseline() {
  if (cachedCounterBaseline !== null) return cachedCounterBaseline;
  const fileData = readFileData();
  cachedCounterBaseline = Math.max(BASE_OFFSET, Number(fileData.totalCount || 0));
  return cachedCounterBaseline;
}

function getIstDayStartUtc(now = new Date()) {
  const istNow = new Date(now.getTime() + IST_OFFSET_MS);
  return new Date(Date.UTC(
    istNow.getUTCFullYear(),
    istNow.getUTCMonth(),
    istNow.getUTCDate()
  ) - IST_OFFSET_MS);
}

function aggregateRecentVisits(visits) {
  const pageMap = {};
  const refMap = {};
  const deviceMap = {};
  const utmMap = {};
  const dailyMap = {};

  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(Date.now() + IST_OFFSET_MS - i * 24 * 60 * 60 * 1000);
    dailyMap[d.toISOString().slice(0, 10)] = 0;
  }

  for (const v of visits) {
    const page = v.page || '/';
    const referrer = v.referrer || '';
    const device = v.device || 'unknown';
    const source = v.utmSource || v.utm_source || '';
    const day = new Date(new Date(v.ts).getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);

    pageMap[page] = (pageMap[page] || 0) + 1;
    deviceMap[device] = (deviceMap[device] || 0) + 1;
    if (referrer.trim()) refMap[referrer] = (refMap[referrer] || 0) + 1;
    if (source) utmMap[source] = (utmMap[source] || 0) + 1;
    if (day in dailyMap) dailyMap[day] += 1;
  }

  const topPages = Object.entries(pageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, count]) => ({ page, count }));

  const topReferrers = Object.entries(refMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([referrer, count]) => ({ referrer, count }));

  const deviceBreakdown = Object.entries(deviceMap)
    .map(([device, count]) => ({ device, count }));

  const utmSources = Object.entries(utmMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([source, count]) => ({ source, count }));

  const dailyVisits = Object.entries(dailyMap)
    .map(([date, count]) => ({ date, count }));

  return { topPages, topReferrers, deviceBreakdown, utmSources, dailyVisits };
}

export async function recordVisit(visitData) {
  const entry = buildVisitEntry(visitData);
  const baseline = await getCounterBaseline();

  try {
    const [, counter] = await prisma.$transaction([
      prisma.analyticsVisit.create({
        data: {
          ts: new Date(entry.ts),
          page: entry.page,
          referrer: entry.referrer || null,
          utmSource: entry.utm_source || null,
          utmMedium: entry.utm_medium || null,
          utmCampaign: entry.utm_campaign || null,
          device: entry.device,
          browser: entry.browser,
          ipAddress: entry.ip || null,
          sessionId: entry.sessionId || null,
        },
      }),
      prisma.analyticsCounter.upsert({
        where: { key: TOTAL_COUNTER_KEY },
        create: { key: TOTAL_COUNTER_KEY, value: baseline + 1 },
        update: { value: { increment: 1 } },
      }),
    ]);

    return counter.value;
  } catch (err) {
    console.error('[ERROR] [Analytics] DB visit record failed, using file fallback:', err.message);
    return recordVisitToFile(visitData);
  }
}

export async function getStats() {
  try {
    const todayStart = getIstDayStartUtc();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [counter, todayCount, weekCount, recentVisits] = await Promise.all([
      prisma.analyticsCounter.findUnique({ where: { key: TOTAL_COUNTER_KEY } }),
      prisma.analyticsVisit.count({ where: { ts: { gte: todayStart } } }),
      prisma.analyticsVisit.count({ where: { ts: { gte: weekAgo } } }),
      prisma.analyticsVisit.findMany({
        orderBy: { ts: 'desc' },
        take: MAX_RECENT_VISITS,
        select: {
          ts: true,
          page: true,
          referrer: true,
          utmSource: true,
          device: true,
        },
      }),
    ]);

    return {
      totalCount: Math.max(counter?.value || 0, await getCounterBaseline()),
      todayCount,
      weekCount,
      ...aggregateRecentVisits(recentVisits),
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[ERROR] [Analytics] DB stats failed, using file fallback:', err.message);
    const data = readFileData();
    const visits = data.visits || [];
    const todayStart = getIstDayStartUtc();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recent = visits.map(v => ({ ...v, ts: v.ts ? new Date(v.ts) : new Date(0) }));

    return {
      totalCount: Math.max(data.totalCount || 0, BASE_OFFSET),
      todayCount: recent.filter(v => v.ts >= todayStart).length,
      weekCount: recent.filter(v => v.ts >= weekAgo).length,
      ...aggregateRecentVisits(recent),
      lastUpdated: new Date().toISOString(),
    };
  }
}
