import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
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
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587', 10),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
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
 * Main API Endpoint: /api/submit-lead
 * Instant response (under 50ms) with background email and WABA processing
 */
app.post('/api/submit-lead', (req, res) => {
  const { name, phone, email, service, message, sourceForm = 'Website Form' } = req.body;

  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Name, phone, and service are required fields.' });
  }

  console.log(`⚡ [Backend] Instant lead received from ${name} (${phone}) - Service: ${service}`);

  // 1. Send Instant HTTP Success Response to Website (Zero Delay / Under 50ms)
  res.json({
    success: true,
    message: 'Enquiry submitted successfully!'
  });

  // 2. Perform Email & WhatsApp Dispatch in the Background (Non-blocking)
  setImmediate(async () => {
    // A. Dispatch Email via Custom SMTP with Brand Logo
    const transporter = createSmtpTransporter();
    if (transporter) {
      try {
        const logoPath = fs.existsSync(path.join(__dirname, '../frontend/public/favicon.png'))
          ? path.join(__dirname, '../frontend/public/favicon.png')
          : path.join(__dirname, 'favicon.png');

        const mailOptions = {
          from: process.env.SMTP_FROM || `"Advait Digital Website" <${process.env.SMTP_USER}>`,
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

        await transporter.sendMail(mailOptions);
        console.log(`✅ [Backend SMTP] Background email notification with logo sent to ${mailOptions.to}`);
      } catch (mailErr) {
        console.error('❌ [Backend SMTP] Error sending email:', mailErr.message);
      }
    }

    // B. Dispatch WABA Alert
    await sendWabaAlert({ name, phone, email, service, sourceForm });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Advait Digital Backend API Server running on port ${PORT}`);
});
