import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;
const pool = new Pool({
  host: process.env.DB_HOST, port: +process.env.DB_PORT,
  database: process.env.DB_NAME, user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
const r = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name");
console.log('✅ Tables in Advait_digital_CMS:');
r.rows.forEach(row => console.log('  -', row.table_name));
const tmpl = await pool.query("SELECT key, subject FROM email_templates");
console.log('✅ Email templates seeded:', tmpl.rows.length);
await pool.end();
