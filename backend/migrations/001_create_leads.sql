-- ============================================================
-- Advait Digital CMS — Database Migration 001
-- Database: Advait_digital_CMS
-- Run: psql -U postgres -d Advait_digital_CMS -f 001_create_leads.sql
-- ============================================================

-- -----------------------------------------------------------
-- Table: leads
-- Stores every enquiry form submission from the website
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(255)  NOT NULL,
  phone        VARCHAR(20)   NOT NULL,
  email        VARCHAR(255),
  service      VARCHAR(255),
  message      TEXT,
  source_form  VARCHAR(150)  DEFAULT 'Website Form',
  status       VARCHAR(50)   DEFAULT 'New',
  ip_address   VARCHAR(45),
  notes        TEXT,
  created_at   TIMESTAMPTZ   DEFAULT NOW(),
  updated_at   TIMESTAMPTZ   DEFAULT NOW()
);

-- Index for fast status filtering and date sorting
CREATE INDEX IF NOT EXISTS idx_leads_status     ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone      ON leads(phone);

-- -----------------------------------------------------------
-- Table: email_templates
-- Stores editable email templates (Thank You email to customer)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS email_templates (
  id         SERIAL PRIMARY KEY,
  key        VARCHAR(100)  UNIQUE NOT NULL,
  subject    TEXT          NOT NULL,
  body_html  TEXT          NOT NULL,
  updated_at TIMESTAMPTZ   DEFAULT NOW()
);

-- -----------------------------------------------------------
-- Seed: Default Thank You email template
-- Placeholders: {{name}}, {{service}}, {{phone}}
-- -----------------------------------------------------------
INSERT INTO email_templates (key, subject, body_html)
VALUES (
  'customer_thankyou',
  'Thank You for Your Interest in {{service}} — Advait Digital',
  '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You — Advait Digital</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f1e5;font-family:''Helvetica Neue'',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f1e5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#2c2927;padding:32px 40px;text-align:center;border-bottom:4px solid #f36308;">
              <img src="https://advaitdigital.co.in/favicon.png" alt="Advait Digital" width="64" height="64" style="border-radius:14px;margin-bottom:16px;display:block;margin-left:auto;margin-right:auto;" />
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:0.3px;">Advait Digital</h1>
              <p style="margin:6px 0 0;font-size:12px;color:#f36308;font-weight:600;text-transform:uppercase;letter-spacing:2px;">Digital Services</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <!-- Greeting -->
              <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#2c2927;">Thank You, {{name}}! 🎉</h2>
              <p style="margin:0 0 24px;font-size:15px;color:#3d3936;line-height:1.7;">
                We''ve received your enquiry for <strong style="color:#f36308;">{{service}}</strong>. Our expert team is already reviewing your request and will reach out to you on <strong>{{phone}}</strong> within <strong>24 hours</strong>.
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #f2f1e5;margin:0 0 24px;" />

              <!-- What Happens Next -->
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
                          <p style="margin:0;font-size:14px;color:#3d3936;font-weight:600;">Our team reviews your requirements</p>
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
                          <p style="margin:0;font-size:14px;color:#3d3936;font-weight:600;">A dedicated expert calls you for a free consultation</p>
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
                          <p style="margin:0;font-size:14px;color:#3d3936;font-weight:600;">We set up a live demo tailored to your business</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="margin:32px 0 0;text-align:center;">
                <a href="https://advaitdigital.co.in" style="display:inline-block;background:#f36308;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:50px;letter-spacing:0.3px;">Visit Our Website</a>
              </div>
            </td>
          </tr>

          <!-- Contact Strip -->
          <tr>
            <td style="background:#fbfbf7;padding:24px 40px;border-top:1px solid #f2f1e5;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#3d3936;line-height:1.8;">
                    <strong style="color:#2c2927;">Advait Digital</strong><br />
                    Office No. 522, 5th Floor, Amanora Chambers,<br />
                    Amanora Town Centre, Pune — 411028<br />
                    📞 <a href="tel:+918282982829" style="color:#f36308;text-decoration:none;">+91 82829 82829</a> &nbsp;|&nbsp;
                    ✉️ <a href="mailto:sales@advaitteleservices.com" style="color:#f36308;text-decoration:none;">sales@advaitteleservices.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#2c2927;padding:16px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                © 2025 Advait Digital. All rights reserved.<br />
                You are receiving this email because you submitted an enquiry on our website.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>'
)
ON CONFLICT (key) DO NOTHING;
