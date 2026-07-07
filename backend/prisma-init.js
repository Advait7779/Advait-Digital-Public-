import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const databaseUrl = `postgresql://${DB_USER || 'postgres'}:${DB_PASSWORD || 'postgres'}@${DB_HOST || 'localhost'}:${DB_PORT || '5432'}/${DB_NAME || 'postgres'}?schema=public`;

console.log('🔄 Running Prisma schema sync and generation...');

// Set DATABASE_URL env variable dynamically for the child processes
const env = { ...process.env, DATABASE_URL: databaseUrl };

try {
  console.log('➡️ Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit', env });

  console.log('➡️ Pushing database schema...');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit', env });

  console.log('➡️ Seeding database...');
  execSync('npx prisma db seed', { stdio: 'inherit', env });

  console.log('✅ Prisma initialization completed successfully!');
} catch (error) {
  console.error('❌ Prisma initialization failed:', error.message);
  process.exit(1);
}
