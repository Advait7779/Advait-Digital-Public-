import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { recordVisit, getStats } from './analytics.js';
import { query } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Helper to build SMTP Transporter
 */
function createSmtpTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('⚠️ [Backend SMTP] Missing SMTP credentials in env:', {
      hasHost: !!SMTP_HOST,
      hasUser: !!SMTP_USER,
      hasPass: !!SMTP_PASS
    });
    return null;
  }

  // Remove any spaces from Google App Password
  const cleanPass = SMTP_PASS.replace(/\s+/g, '');

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587', 10),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: cleanPass,
    },
  });
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
        console.log(`✅ [Backend WABA] Alert sent successfully via ${ep.url}`);
        return true;
      }
    } catch {
      // Ignore network errors in background
    }
  }

  return false;
}

/**
 * Fetch the Thank You email template from DB and replace placeholders
 */
async function buildThankYouEmail({ name, phone, service }) {
  try {
    const result = await query(
      `SELECT subject, body_html FROM email_templates WHERE key = $1`,
      ['customer_thankyou']
    );
    if (!result.rows.length) return null;

    const replace = (str) =>
      str
        .replace(/\{\{name\}\}/g, name)
        .replace(/\{\{phone\}\}/g, phone)
        .replace(/\{\{service\}\}/g, service);

    return {
      subject: replace(result.rows[0].subject),
      html: replace(result.rows[0].body_html),
    };
  } catch (err) {
    console.error('❌ [Backend] Could not fetch email template:', err.message);
    return null;
  }
}

/**
 * Admin auth middleware — validates Bearer token from ADMIN_SECRET env
 */
function requireAdmin(req, res, next) {
  const secret = process.env.ADMIN_SECRET || '';
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';

  if (!secret || token !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ============================================================
// MAIN API: Submit Lead
// ============================================================
app.post('/api/submit-lead', (req, res) => {
  const { name, phone, email, service, message, sourceForm = 'Website Form' } = req.body;

  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Name, phone, and service are required fields.' });
  }

  const visitorIp =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress || '';

  console.log(`⚡ [Backend] Instant lead received from ${name} (${phone}) - Service: ${service}`);

  // Instant HTTP Success Response (Zero Delay)
  res.json({
    success: true,
    message: 'Enquiry submitted successfully!'
  });

  // Background processing: DB save + emails + WABA
  setImmediate(async () => {

    // 1. Save lead to PostgreSQL
    try {
      await query(
        `INSERT INTO leads (name, phone, email, service, message, source_form, ip_address)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [name, phone, email || null, service, message || null, sourceForm, visitorIp || null]
      );
      console.log(`✅ [DB] Lead saved for ${name} (${phone})`);
    } catch (dbErr) {
      console.error('❌ [DB] Failed to save lead:', dbErr.message);
    }

    const transporter = createSmtpTransporter();

    // 2. Send admin notification email (existing behaviour)
    if (transporter) {
      try {
        const logoPath = fs.existsSync(path.join(__dirname, '../frontend/public/favicon.png'))
          ? path.join(__dirname, '../frontend/public/favicon.png')
          : path.join(__dirname, 'favicon.png');

        const userEmail = process.env.SMTP_USER || 'support@advaitteleservices.com';
        const rawFrom = (process.env.SMTP_FROM || '').trim();
        let smtpFrom = `"Advait Digital Website" <${userEmail}>`;

        if (rawFrom.includes('<') && rawFrom.includes('>')) {
          smtpFrom = rawFrom;
        } else if (rawFrom.includes('@')) {
          smtpFrom = `"Advait Digital Website" <${rawFrom}>`;
        }

        const adminMailOptions = {
          from: smtpFrom,
          to: process.env.NOTIFY_EMAIL || 'sales@advaitteleservices.com',
          subject: `🚨 New Lead: ${name} (${service})`,
          attachments: [
            {
              filename: 'logo.png',
              path: logoPath,
              cid: 'advaitlogo'
            }
          ],
          html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <!-- Header with Embedded Brand Logo -->
              <div style="background: #0f172a; padding: 28px 24px; text-align: center; border-bottom: 4px solid #ff6b00;">
                <img src="cid:advaitlogo" alt="Advait Digital Logo" style="width: 72px; height: 72px; border-radius: 16px; margin-bottom: 12px; display: inline-block; box-shadow: 0 4px 10px rgba(0,0,0,0.3);" />
                <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">NEW LEAD RECEIVED</h2>
                <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8; font-weight: 500;">Advait Digital Website Lead Alert</p>
              </div>

              <!-- Lead Details Table -->
              <div style="padding: 28px 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; width: 130px;">Full Name</td>
                    <td style="padding: 12px 0; font-size: 15px; font-weight: 700; color: #0f172a;">${name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase;">Mobile No</td>
                    <td style="padding: 12px 0; font-size: 16px; font-weight: 800; color: #ff6b00;">${phone}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase;">Email Address</td>
                    <td style="padding: 12px 0; font-size: 14px; font-weight: 600; color: #2563eb;">${email || 'Not provided'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase;">Service</td>
                    <td style="padding: 12px 0; font-size: 15px; font-weight: 700; color: #0f172a;">${service}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase;">Form Source</td>
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 600; color: #475569;">${sourceForm}</td>
                  </tr>
                  ${message ? `
                  <tr>
                    <td style="padding: 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase;">Message</td>
                    <td style="padding: 12px 0; font-size: 14px; color: #334155; line-height: 1.5;">${message}</td>
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
        console.log(`✅ [Backend SMTP] Admin notification email sent`);
      } catch (mailErr) {
        console.error('❌ [Backend SMTP] Admin email error:', mailErr.message);
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
            });
            console.log(`✅ [Backend SMTP] Thank You email sent to ${customerEmail}`);
          }
        } catch (tyErr) {
          console.error('❌ [Backend SMTP] Thank You email error:', tyErr.message);
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
app.post('/api/analytics/visit', (req, res) => {
  try {
    const visitorIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress || '';

    const count = recordVisit({ ...req.body, ip: visitorIp });
    res.json({ success: true, totalCount: count });
  } catch (err) {
    console.error('❌ [Analytics] visit record error:', err.message);
    res.json({ success: false });
  }
});

app.get('/api/analytics/public-stats', (req, res) => {
  try {
    const stats = getStats();
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
    console.error('❌ [Analytics] stats error:', err.message);
    res.status(500).json({ error: 'Stats unavailable' });
  }
});

// ============================================================
// ADMIN API — all routes protected by ADMIN_SECRET Bearer token
// ============================================================

/**
 * POST /api/admin/login
 * Returns success if the password matches ADMIN_SECRET
 */
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const secret = process.env.ADMIN_SECRET || '';
  if (!secret || password !== secret) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ success: true, token: secret });
});

/**
 * GET /api/admin/stats
 * Dashboard stat counts by status
 */
app.get('/api/admin/stats', requireAdmin, async (req, res) => {
  try {
    const result = await query(`
      SELECT
        COUNT(*)                                          AS total,
        COUNT(*) FILTER (WHERE status = 'New')           AS new_leads,
        COUNT(*) FILTER (WHERE status = 'Contacted')     AS contacted,
        COUNT(*) FILTER (WHERE status = 'Converted')     AS converted,
        COUNT(*) FILTER (WHERE status = 'Closed')        AS closed,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS this_week,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '1 day')  AS today
      FROM leads
    `);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ [Admin] stats error:', err.message);
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

    let conditions = [];
    let params = [];
    let idx = 1;

    if (status) {
      conditions.push(`status = $${idx++}`);
      params.push(status);
    }
    if (search) {
      conditions.push(`(name ILIKE $${idx} OR phone ILIKE $${idx} OR email ILIKE $${idx})`);
      params.push(`%${search}%`);
      idx++;
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const countResult = await query(
      `SELECT COUNT(*) FROM leads ${where}`,
      params
    );
    const total = parseInt(countResult.rows[0].count, 10);

    const dataResult = await query(
      `SELECT id, name, phone, email, service, source_form, status, message, created_at
       FROM leads ${where}
       ORDER BY created_at DESC
       LIMIT $${idx} OFFSET $${idx + 1}`,
      [...params, limit, offset]
    );

    res.json({
      leads: dataResult.rows,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('❌ [Admin] leads list error:', err.message);
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
    await query(
      `UPDATE leads SET status = $1, updated_at = NOW() WHERE id = $2`,
      [status, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('❌ [Admin] status update error:', err.message);
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
    await query(
      `UPDATE leads SET notes = $1, updated_at = NOW() WHERE id = $2`,
      [notes || null, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('❌ [Admin] notes update error:', err.message);
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
    await query(`DELETE FROM leads WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ [Admin] delete error:', err.message);
    res.status(500).json({ error: 'Could not delete lead' });
  }
});

/**
 * GET /api/admin/leads/export
 * CSV export of all leads
 */
app.get('/api/admin/leads/export', requireAdmin, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, name, phone, email, service, source_form, status, message, created_at
       FROM leads ORDER BY created_at DESC`
    );
    const header = 'ID,Name,Phone,Email,Service,Source Form,Status,Message,Date\n';
    const rows = result.rows.map(r =>
      [
        r.id,
        `"${(r.name || '').replace(/"/g, '""')}"`,
        r.phone,
        r.email || '',
        `"${(r.service || '').replace(/"/g, '""')}"`,
        `"${(r.source_form || '').replace(/"/g, '""')}"`,
        r.status,
        `"${(r.message || '').replace(/"/g, '""')}"`,
        new Date(r.created_at).toISOString()
      ].join(',')
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="advait_leads.csv"');
    res.send(header + rows);
  } catch (err) {
    console.error('❌ [Admin] export error:', err.message);
    res.status(500).json({ error: 'Could not export leads' });
  }
});

/**
 * GET /api/admin/template
 * Get the Thank You email template
 */
app.get('/api/admin/template', requireAdmin, async (req, res) => {
  try {
    const result = await query(
      `SELECT key, subject, body_html, updated_at FROM email_templates WHERE key = $1`,
      ['customer_thankyou']
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Template not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ [Admin] template fetch error:', err.message);
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
    await query(
      `UPDATE email_templates SET subject = $1, body_html = $2, updated_at = NOW() WHERE key = $3`,
      [subject, body_html, 'customer_thankyou']
    );
    res.json({ success: true });
  } catch (err) {
    console.error('❌ [Admin] template update error:', err.message);
    res.status(500).json({ error: 'Could not update template' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Advait Digital Backend API Server running on port ${PORT}`);
});
