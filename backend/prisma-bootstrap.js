import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const databaseUrl = `postgresql://${DB_USER || 'postgres'}:${DB_PASSWORD || 'postgres'}@${DB_HOST || 'localhost'}:${DB_PORT || '5432'}/${DB_NAME || 'postgres'}?schema=public`;

console.log('🔄 [Bootstrap] Starting Prisma db sync and generation...');

const env = { ...process.env, DATABASE_URL: databaseUrl };

try {
  // Run Prisma generation and schema push programmatically inside the backend folder
  execSync('npx prisma generate', { cwd: __dirname, stdio: 'inherit', env });
  execSync('npx prisma db push --accept-data-loss', { cwd: __dirname, stdio: 'inherit', env });
  execSync('npx prisma db seed', { cwd: __dirname, stdio: 'inherit', env });
  console.log('✅ [Bootstrap] Database schema sync successfully completed!');
} catch (error) {
  console.error('❌ [Bootstrap] Database schema sync failed:', error.message);
}
