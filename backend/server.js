import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { recordVisit, getStats } from './analytics.js';
import { prisma } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

function parseTrustProxy(value = '1') {
  if (value === 'true') return true;
  if (value === 'false') return false;
  const numeric = Number.parseInt(value, 10);
  return Number.isFinite(numeric) ? numeric : 1;
}

app.set('trust proxy', parseTrustProxy(process.env.TRUST_PROXY));

const DEFAULT_ALLOWED_ORIGINS = [
  'https://advaitdigital.co.in',
  'https://www.advaitdigital.co.in',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
];
const allowedOrigins = (process.env.CORS_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(','))
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.disable('x-powered-by');
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
}));
app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: true, limit: '32kb' }));

function numberEnv(name, fallback) {
  const value = Number.parseInt(process.env[name] || '', 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: numberEnv('API_RATE_LIMIT_PER_15_MIN', 3000),
  standardHeaders: true,
  legacyHeaders: false,
});
const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: numberEnv('LEAD_RATE_LIMIT_PER_15_MIN', 20),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many enquiry attempts. Please try again later.' },
});
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' },
});
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: numberEnv('ADMIN_RATE_LIMIT_PER_15_MIN', 300),
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeText(value = '', maxLength = 1000) {
  return String(value)
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function csvCell(value = '') {
  const raw = String(value ?? '');
  const safe = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${safe.replace(/"/g, '""')}"`;
}

function safeEqual(a = '', b = '') {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function verifyAdminPassword(password) {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || '';
  const legacySecret = process.env.ADMIN_SECRET || '';

  if (passwordHash) {
    const [algorithm, version, n, r, p, salt, expectedHash] = passwordHash.split(':');
    if (algorithm !== 'scrypt' || version !== 'v1' || !salt || !expectedHash) {
      console.error('[Admin] Invalid ADMIN_PASSWORD_HASH format.');
      return false;
    }

    try {
      const key = crypto.scryptSync(String(password), salt, 64, {
        N: Number(n),
        r: Number(r),
        p: Number(p),
      });
      return safeEqual(key.toString('base64url'), expectedHash);
    } catch (err) {
      console.error('[Admin] Password hash verification failed:', err.message);
      return false;
    }
  }

  return !!legacySecret && safeEqual(password, legacySecret);
}

function base64Url(input) {
  return Buffer.from(input).toString('base64url');
}

function signAdminPayload(payload) {
  const signingSecret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET || '';
  return crypto
    .createHmac('sha256', signingSecret)
    .update(payload)
    .digest('base64url');
}

function createAdminToken(email) {
  const payload = JSON.stringify({
    sub: email,
    exp: Date.now() + 8 * 60 * 60 * 1000,
  });
  const encodedPayload = base64Url(payload);
  return `${encodedPayload}.${signAdminPayload(encodedPayload)}`;
}

function verifyAdminToken(token) {
  const signingSecret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET || '';
  if (!signingSecret || !token || !token.includes('.')) return false;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature || !safeEqual(signature, signAdminPayload(encodedPayload))) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    return Number(payload.exp) > Date.now();
  } catch {
    return false;
  }
}

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Helper to build SMTP Transporter
 */
let smtpTransporter = null;

function createSmtpTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (smtpTransporter) return smtpTransporter;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('[WARN] [Backend SMTP] Missing SMTP credentials in env:', {
      hasHost: !!SMTP_HOST,
      hasUser: !!SMTP_USER,
      hasPass: !!SMTP_PASS
    });
    return null;
  }

  // Remove any spaces from Google App Password
  const cleanPass = SMTP_PASS.replace(/\s+/g, '');

  smtpTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587', 10),
    secure: SMTP_SECURE === 'true',
    pool: true,
    maxConnections: numberEnv('SMTP_MAX_CONNECTIONS', 3),
    maxMessages: numberEnv('SMTP_MAX_MESSAGES_PER_CONNECTION', 100),
    auth: {
      user: SMTP_USER,
      pass: cleanPass,
    },
  });

  return smtpTransporter;
}

const BACKGROUND_JOB_CONCURRENCY = numberEnv('BACKGROUND_JOB_CONCURRENCY', 5);
const BACKGROUND_JOB_MAX_QUEUE = numberEnv('BACKGROUND_JOB_MAX_QUEUE', 5000);
const backgroundJobs = [];
let activeBackgroundJobs = 0;

function runBackgroundJobs() {
  while (activeBackgroundJobs < BACKGROUND_JOB_CONCURRENCY && backgroundJobs.length > 0) {
    const job = backgroundJobs.shift();
    activeBackgroundJobs += 1;

    Promise.resolve()
      .then(job)
      .catch(err => {
        console.error('[ERROR] [Background] Job failed:', err.message);
      })
      .finally(() => {
        activeBackgroundJobs -= 1;
        runBackgroundJobs();
      });
  }
}

function enqueueBackgroundJob(job) {
  if (backgroundJobs.length >= BACKGROUND_JOB_MAX_QUEUE) {
    console.error('[ERROR] [Background] Queue is full. Skipping non-critical notification job.');
    return false;
  }

  backgroundJobs.push(job);
  setImmediate(runBackgroundJobs);
  return true;
}

/**
 * Helper to send automated WhatsApp alert via WABA API (non-blocking)
 */
async function sendWabaAlert({ name, phone, email, service, sourceForm }) {
  const apiKey = process.env.WABA_API_KEY || '';
  const targetNumber = process.env.WABA_TARGET_NUMBER || '919921968968';

  const messageText = 
    `NEW LEAD - ADVAIT DIGITAL\n` +
    `Name: ${name}\n` +
    `Mobile: ${phone}\n` +
    `Email: ${email || 'Not provided'}\n` +
    `Service: ${service}`;

  const payloadText = {
    to: targetNumber,
    recipient_type: 'individual',
    type: 'text',
    text: { body: messageText }
  };

  const payloadVendor = {
    number: targetNumber,
    message: messageText
  };

  const endpoints = [
    { url: 'https://waba.advaitdigital.co.in/api/v1/messages', headers: { 'Authorization': `Bearer ${apiKey}`, 'x-api-key': apiKey }, body: payloadText },
    { url: 'https://waba.advaitdigital.co.in/api/v1/send', headers: { 'Authorization': `Bearer ${apiKey}`, 'x-api-key': apiKey }, body: payloadVendor },
    { url: 'https://waba.advaitdigital.co.in/api/messages', headers: { 'Authorization': `Bearer ${apiKey}`, 'x-api-key': apiKey }, body: payloadText },
    { url: 'https://waba.360dialog.io/v1/messages', headers: { 'D360-API-KEY': apiKey }, body: payloadText }
  ];

  for (const ep of endpoints) {
    try {
      const resp = await fetch(ep.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...ep.headers },
        body: JSON.stringify(ep.body),
        signal: AbortSignal.timeout(3000)
      });

      if (resp.ok) {
        console.log(`[OK] [Backend WABA] Alert sent successfully via ${ep.url}`);
        return true;
      }
    } catch {
      // Ignore network errors in background
    }
  }

  return false;
}

/**
 * Compile JSON email configuration to standard responsive HTML
 */
function generateHtmlFromConfig(config) {
  const c = {
    headerTitle: config.headerTitle || "Advait Digital",
    headerSubtitle: config.headerSubtitle || "Digital Services",
    greeting: config.greeting || "Thank You, {{name}}! ",
    mainText: config.mainText || "We've received your enquiry for {{service}}. Our expert team is already reviewing your request and will reach out to you on {{phone}} within 24 hours.",
    step1: config.step1 || "Our team reviews your requirements",
    step2: config.step2 || "A dedicated expert calls you for a free consultation",
    step3: config.step3 || "We set up a live demo tailored to your business",
    buttonText: config.buttonText || "Visit Our Website",
    buttonUrl: config.buttonUrl || "https://advaitdigital.co.in",
    footerLine1: config.footerLine1 || "Advait Digital",
    footerLine2: config.footerLine2 || "Office No. 522, 5th Floor, Amanora Chambers, Amanora Town Centre, Pune - 411028",
    footerPhone: config.footerPhone || "+91 82829 82829",
    footerEmail: config.footerEmail || "sales@advaitteleservices.com",
    logoBase64: config.logoBase64 || "https://advaitdigital.co.in/favicon.png"
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <title>Thank You</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f1e5;font-family:'Inter',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f1e5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#2c2927;padding:32px 40px;text-align:center;border-bottom:4px solid #f36308;">
              <img src="${c.logoBase64}" alt="Advait Digital" width="64" height="64" style="border-radius:14px;margin-bottom:16px;display:block;margin-left:auto;margin-right:auto;" />
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:0.3px;">${c.headerTitle}</h1>
              <p style="margin:6px 0 0;font-size:12px;color:#f36308;font-weight:600;text-transform:uppercase;letter-spacing:2px;">${c.headerSubtitle}</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#2c2927;">${c.greeting}</h2>
              <p style="margin:0 0 24px;font-size:15px;color:#3d3936;line-height:1.7;">${c.mainText}</p>
              <hr style="border:none;border-top:1px solid #f2f1e5;margin:0 0 24px;" />
              <h3 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#2c2927;">What Happens Next?</h3>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:10px 0;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;vertical-align:top;">
                          <div style="width:28px;height:28px;border-radius:50%;background:#f36308;color:#fff;text-align:center;line-height:28px;font-size:13px;font-weight:700;">1</div>
                        </td>
                        <td style="padding-left:12px;vertical-align:middle;">
                          <p style="margin:0;font-size:14px;color:#3d3936;font-weight:600;">${c.step1}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;vertical-align:top;">
                          <div style="width:28px;height:28px;border-radius:50%;background:#f36308;color:#fff;text-align:center;line-height:28px;font-size:13px;font-weight:700;">2</div>
                        </td>
                        <td style="padding-left:12px;vertical-align:middle;">
                          <p style="margin:0;font-size:14px;color:#3d3936;font-weight:600;">${c.step2}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;vertical-align:top;">
                          <div style="width:28px;height:28px;border-radius:50%;background:#f36308;color:#fff;text-align:center;line-height:28px;font-size:13px;font-weight:700;">3</div>
                        </td>
                        <td style="padding-left:12px;vertical-align:middle;">
                          <p style="margin:0;font-size:14px;color:#3d3936;font-weight:600;">${c.step3}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <div style="margin:32px 0 0;text-align:center;">
                <a href="${c.buttonUrl}" style="display:inline-block;background:#f36308;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:50px;letter-spacing:0.3px;">${c.buttonText}</a>
              </div>
            </td>
          </tr>
          <!-- Contact Strip -->
          <tr>
            <td style="background:#fbfbf7;padding:24px 40px;border-top:1px solid #f2f1e5;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#3d3936;line-height:1.8;">
                    <strong style="color:#2c2927;">${c.footerLine1}</strong><br />
                    ${c.footerLine2}<br />
                    Phone: <a href="tel:${c.footerPhone.replace(/\s+/g, '')}" style="color:#f36308;text-decoration:none;">${c.footerPhone}</a> &nbsp;|&nbsp;
                    Email: <a href="mailto:${c.footerEmail}" style="color:#f36308;text-decoration:none;">${c.footerEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#2c2927;padding:16px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                (c) 2025 ${c.headerTitle}. All rights reserved.<br />
                You are receiving this email because you submitted an enquiry on our website.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Fetch the Thank You email template from DB and replace placeholders
 */
async function buildThankYouEmail({ name, phone, service }) {
  try {
    const template = await prisma.emailTemplate.findUnique({
      where: { key: 'customer_thankyou' }
    });
    if (!template) return null;

    let rawBody = template.bodyHtml;
    let attachments = [];

    if (rawBody.trim().startsWith('{')) {
      try {
        const config = JSON.parse(rawBody);

        // Keep logo inline in HTML body instead of attaching it via CID attachments
        if (!config.logoBase64) {
          config.logoBase64 = 'https://advaitdigital.co.in/favicon.png';
        }

        rawBody = generateHtmlFromConfig(config);
      } catch (e) {
        console.error('[ERROR] Failed parsing email config JSON, falling back to raw body:', e.message);
      }
    }

    const replace = (str) =>
      str
        .replace(/\{\{name\}\}/g, escapeHtml(name))
        .replace(/\{\{phone\}\}/g, escapeHtml(phone))
        .replace(/\{\{service\}\}/g, escapeHtml(service));

    return {
      subject: replace(template.subject),
      html: replace(rawBody),
      attachments
    };
  } catch (err) {
    console.error('[ERROR] [Backend] Could not fetch email template:', err.message);
    return null;
  }
}

/**
 * Admin auth middleware - validates Bearer token from ADMIN_SECRET env
 */
function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';

  if (!verifyAdminToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ============================================================
// MAIN API: Submit Lead
// ============================================================
app.post('/api/submit-lead', leadLimiter, async (req, res) => {
  const name = normalizeText(req.body.name, 120);
  const phone = normalizeText(req.body.phone, 30);
  const email = normalizeText(req.body.email, 180);
  const service = normalizeText(req.body.service, 180);
  const message = normalizeText(req.body.message, 2000);
  const sourceForm = normalizeText(req.body.sourceForm || 'Website Form', 150);

  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Name, phone, and service are required fields.' });
  }

  if (email && email !== 'Not provided' && !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const visitorIp =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress || '';

  console.log(`[Lead] Instant lead received from ${name} (${phone}) - Service: ${service}`);

  // Save the lead before returning success so CMS tracking stays reliable.
  try {
    await prisma.lead.create({
      data: {
        name,
        phone,
        email: email && email !== 'Not provided' ? email : null,
        service,
        message: message || null,
        sourceForm,
        ipAddress: visitorIp || null,
      }
    });
    console.log(`[DB] Lead saved for ${name} (${phone})`);
  } catch (dbErr) {
    console.error('[ERROR] [DB] Failed to save lead:', dbErr.message);
    return res.status(500).json({ error: 'Could not save your enquiry right now. Please try again.' });
  }

  res.json({
    success: true,
    message: 'Enquiry submitted successfully!'
  });

  // Background processing: emails + WABA. The queue prevents spikes from
  // creating unlimited SMTP/WABA work while keeping the form response fast.
  enqueueBackgroundJob(async () => {

    // Legacy duplicate-save block removed from runtime.
    /*
    try {
      await Promise.resolve({
        data: {
          name,
          phone,
          email: email || null,
          service,
          message: message || null,
          sourceForm,
          ipAddress: visitorIp || null,
        }
      });
      console.log(`[OK] [DB] Lead saved for ${name} (${phone})`);
    } catch (dbErr) {
      console.error('[ERROR] [DB] Failed to save lead:', dbErr.message);
    }

    */

    const transporter = createSmtpTransporter();

    // 2. Send admin notification email (existing behaviour)
    if (transporter) {
      try {
        const userEmail = process.env.SMTP_USER || 'support@advaitteleservices.com';
        const rawFrom = (process.env.SMTP_FROM || '').trim();
        let smtpFrom = `"Advait Digital Website" <${userEmail}>`;

        if (rawFrom.includes('<') && rawFrom.includes('>')) {
          smtpFrom = rawFrom;
        } else if (rawFrom.includes('@')) {
          smtpFrom = `"Advait Digital Website" <${rawFrom}>`;
        }

        const safeLead = {
          name: escapeHtml(name),
          phone: escapeHtml(phone),
          email: escapeHtml(email || 'Not provided'),
          service: escapeHtml(service),
          sourceForm: escapeHtml(sourceForm),
          message: escapeHtml(message),
        };

        const adminMailOptions = {
          from: smtpFrom,
          to: process.env.NOTIFY_EMAIL || 'sales@advaitteleservices.com',
          subject: `New Lead: ${name} (${service})`,
          html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <!-- Header with hosted brand logo -->
              <div style="background: #0f172a; padding: 28px 24px; text-align: center; border-bottom: 4px solid #ff6b00;">
                <img src="https://advaitdigital.co.in/favicon.png" alt="Advait Digital Logo" style="width: 72px; height: 72px; border-radius: 16px; margin-bottom: 12px; display: inline-block; box-shadow: 0 4px 10px rgba(0,0,0,0.3);" />
                <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">NEW LEAD RECEIVED</h2>
                <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8; font-weight: 500;">Advait Digital Website Lead Alert</p>
              </div>

              <!-- Lead Details Table -->
              <div style="padding: 28px 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; width: 130px;">Full Name</td>
                    <td style="padding: 12px 0; font-size: 15px; font-weight: 700; color: #0f172a;">${safeLead.name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase;">Mobile No</td>
                    <td style="padding: 12px 0; font-size: 16px; font-weight: 800; color: #ff6b00;">${safeLead.phone}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase;">Email Address</td>
                    <td style="padding: 12px 0; font-size: 14px; font-weight: 600; color: #2563eb;">${safeLead.email}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase;">Service</td>
                    <td style="padding: 12px 0; font-size: 15px; font-weight: 700; color: #0f172a;">${safeLead.service}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase;">Form Source</td>
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 600; color: #475569;">${safeLead.sourceForm}</td>
                  </tr>
                  ${message ? `
                  <tr>
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase;">Message</td>
                    <td style="padding: 12px 0; font-size: 14px; color: #334155; line-height: 1.5;">${safeLead.message}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- Footer -->
              <div style="background: #f8fafc; padding: 18px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; font-weight: 500;">
                Advait Digital Automated Lead Notification System
              </div>
            </div>
          `
        };

        await transporter.sendMail(adminMailOptions);
        console.log(`[OK] [Backend SMTP] Admin notification email sent`);
      } catch (mailErr) {
        console.error('[ERROR] [Backend SMTP] Admin email error:', mailErr.message);
      }

      // 3. Send Thank You email to customer (only if they provided an email)
      const customerEmail = (email || '').trim();
      if (customerEmail && /\S+@\S+\.\S+/.test(customerEmail)) {
        try {
          const tmpl = await buildThankYouEmail({ name, phone, service });
          if (tmpl) {
            const userEmail = process.env.SMTP_USER || 'sales@advaitteleservices.com';
            const rawFrom = (process.env.SMTP_FROM || '').trim();
            let smtpFrom = `"Advait Digital" <${userEmail}>`;
            if (rawFrom.includes('<') && rawFrom.includes('>')) smtpFrom = rawFrom;
            else if (rawFrom.includes('@')) smtpFrom = `"Advait Digital" <${rawFrom}>`;

            await transporter.sendMail({
              from: smtpFrom,
              to: customerEmail,
              subject: tmpl.subject,
              html: tmpl.html,
              attachments: tmpl.attachments
            });
            console.log(`[OK] [Backend SMTP] Thank You email sent to ${customerEmail}`);
          }
        } catch (tyErr) {
          console.error('[ERROR] [Backend SMTP] Thank You email error:', tyErr.message);
        }
      }
    }

    // 4. Dispatch WABA Alert
    await sendWabaAlert({ name, phone, email, service, sourceForm });
  });
});

// ============================================================
// ANALYTICS
// ============================================================
app.post('/api/analytics/visit', async (req, res) => {
  try {
    if (String(req.body.page || '').startsWith('/admin')) {
      return res.json({ success: true, skipped: true });
    }

    const visitorIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress || '';

    const count = await recordVisit({ ...req.body, ip: visitorIp });
    res.json({ success: true, totalCount: count });
  } catch (err) {
    console.error('[ERROR] [Analytics] visit record error:', err.message);
    res.json({ success: false });
  }
});

app.get('/api/analytics/public-stats', async (req, res) => {
  try {
    const stats = await getStats();
    res.json({
      totalCount: stats.totalCount,
      todayCount: stats.todayCount,
      weekCount: stats.weekCount,
      dailyVisits: stats.dailyVisits,
      topPages: stats.topPages,
      deviceBreakdown: stats.deviceBreakdown,
      lastUpdated: stats.lastUpdated,
    });
  } catch (err) {
    console.error('[ERROR] [Analytics] stats error:', err.message);
    res.status(500).json({ error: 'Stats unavailable' });
  }
});

// ============================================================
// ADMIN API - all routes protected by ADMIN_SECRET Bearer token
// ============================================================

app.use('/api/admin', adminLimiter);

/**
 * POST /api/admin/login
 * Returns success if the password matches ADMIN_SECRET
 */
app.post('/api/admin/login', adminLoginLimiter, (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@advaitdigital.co.in';

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (
    email.toLowerCase().trim() !== adminEmail.toLowerCase().trim() ||
    !verifyAdminPassword(password)
  ) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json({ success: true, token: createAdminToken(adminEmail) });
});

/**
 * GET /api/admin/stats
 * Dashboard stat counts by status
 */
app.get('/api/admin/stats', requireAdmin, async (req, res) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT
        COUNT(*)::int                                     AS total,
        COUNT(*) FILTER (WHERE status = 'New')::int       AS new_leads,
        COUNT(*) FILTER (WHERE status = 'Contacted')::int AS contacted,
        COUNT(*) FILTER (WHERE status = 'Converted')::int AS converted,
        COUNT(*) FILTER (WHERE status = 'Closed')::int    AS closed,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::int AS this_week,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '1 day')::int  AS today
      FROM leads
    `;
    res.json(result[0] || {
      total: 0,
      new_leads: 0,
      contacted: 0,
      converted: 0,
      closed: 0,
      this_week: 0,
      today: 0
    });
  } catch (err) {
    console.error('[ERROR] [Admin] stats error:', err.message);
    res.status(500).json({ error: 'Could not fetch stats' });
  }
});

/**
 * GET /api/admin/leads?page=1&limit=20&status=&search=
 * Paginated leads list
 */
app.get('/api/admin/leads', requireAdmin, async (req, res) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page  || '1', 10));
    const limit  = Math.min(100, parseInt(req.query.limit || '20', 10));
    const status = req.query.status || '';
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    const where = {};
    if (status) {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const total = await prisma.lead.count({ where });

    const leads = await prisma.lead.findMany({
      where,
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        service: true,
        sourceForm: true,
        status: true,
        message: true,
        createdAt: true,
      },
      orderBy: { id: 'desc' },
      take: limit,
      skip: offset,
    });

    const mappedLeads = leads.map(l => ({
      ...l,
      source_form: l.sourceForm,
      created_at: l.createdAt
    }));

    res.json({
      leads: mappedLeads,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('[ERROR] [Admin] fetch leads error:', err.message);
    res.status(500).json({ error: 'Could not fetch leads' });
  }
});

/**
 * PATCH /api/admin/leads/:id/status
 * Update lead status
 */
app.patch('/api/admin/leads/:id/status', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowed = ['New', 'Contacted', 'Converted', 'Closed'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }
  try {
    await prisma.lead.update({
      where: { id: parseInt(id, 10) },
      data: { status }
    });
    res.json({ success: true });
  } catch (err) {
    console.error('[ERROR] [Admin] status update error:', err.message);
    res.status(500).json({ error: 'Could not update status' });
  }
});

/**
 * PATCH /api/admin/leads/:id/notes
 * Update lead notes
 */
app.patch('/api/admin/leads/:id/notes', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;
  try {
    await prisma.lead.update({
      where: { id: parseInt(id, 10) },
      data: { notes: notes || null }
    });
    res.json({ success: true });
  } catch (err) {
    console.error('[ERROR] [Admin] notes update error:', err.message);
    res.status(500).json({ error: 'Could not update notes' });
  }
});

/**
 * DELETE /api/admin/leads/:id
 * Delete a lead
 */
app.delete('/api/admin/leads/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.lead.delete({
      where: { id: parseInt(id, 10) }
    });
    res.json({ success: true });
  } catch (err) {
    console.error('[ERROR] [Admin] delete error:', err.message);
    res.status(500).json({ error: 'Could not delete lead' });
  }
});

/**
 * GET /api/admin/leads/export
 * CSV export of all leads
 */
app.get('/api/admin/leads/export', requireAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    console.log(`[EXPORT] [Backend] Export requested with status filter: "${status || 'All'}"`);
    
    const where = {};
    if (status && status !== 'All') {
      where.status = status;
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { id: 'desc' }
    });

    const header = 'ID,Name,Phone,Email,Service,Source Form,Status,Message,Date\n';
    const rows = leads.map(r =>
      [
        r.id,
        csvCell(r.name),
        csvCell(r.phone),
        csvCell(r.email || ''),
        csvCell(r.service || ''),
        csvCell(r.sourceForm || ''),
        csvCell(r.status),
        csvCell(r.message || ''),
        csvCell(new Date(r.createdAt).toISOString())
      ].join(',')
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="advait_leads.csv"');
    res.send(header + rows);
  } catch (err) {
    console.error('[ERROR] [Admin] export error:', err.message);
    res.status(500).json({ error: 'Could not export leads' });
  }
});

/**
 * GET /api/admin/template
 * Get the Thank You email template
 */
app.get('/api/admin/template', requireAdmin, async (req, res) => {
  try {
    const template = await prisma.emailTemplate.findUnique({
      where: { key: 'customer_thankyou' }
    });
    if (!template) return res.status(404).json({ error: 'Template not found' });
    res.json({
      key: template.key,
      subject: template.subject,
      body_html: template.bodyHtml,
      updated_at: template.updatedAt
    });
  } catch (err) {
    console.error('[ERROR] [Admin] template fetch error:', err.message);
    res.status(500).json({ error: 'Could not fetch template' });
  }
});

/**
 * PUT /api/admin/template
 * Update the Thank You email template
 */
app.put('/api/admin/template', requireAdmin, async (req, res) => {
  const { subject, body_html } = req.body;
  if (!subject || !body_html) {
    return res.status(400).json({ error: 'Subject and body_html are required' });
  }
  try {
    await prisma.emailTemplate.update({
      where: { key: 'customer_thankyou' },
      data: {
        subject,
        bodyHtml: body_html
      }
    });
    res.json({ success: true });
  } catch (err) {
    console.error('[ERROR] [Admin] template update error:', err.message);
    res.status(500).json({ error: 'Could not update template' });
  }
});

app.listen(PORT, () => {
  console.log(`[START] Advait Digital Backend API Server running on port ${PORT}`);
});
