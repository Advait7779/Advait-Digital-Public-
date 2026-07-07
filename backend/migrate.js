import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME     || 'Advait_digital_CMS',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || '',
  connectionTimeoutMillis: 5000,
});

const sql = readFileSync(path.join(__dirname, 'migrations', '001_create_leads.sql'), 'utf8');

try {
  console.log('🔄 Running migration against', process.env.DB_NAME || 'Advait_digital_CMS', '...');
  await pool.query(sql);
  console.log('✅ Migration completed successfully!');
  console.log('   Tables created: leads, email_templates');
  console.log('   Default Thank You email template seeded.');
} catch (err) {
  console.error('❌ Migration failed:', err.message);
  console.error('   Make sure DB_USER and DB_PASSWORD are correct in backend/.env');
} finally {
  await pool.end();
}
