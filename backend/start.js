import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { prismaEnv } from './scripts/prisma-env.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('[START] Preparing Prisma client and database migrations...');

try {
  const env = prismaEnv();
  execSync('npx prisma generate', { cwd: __dirname, stdio: 'inherit', env });
  execSync('npx prisma migrate deploy', { cwd: __dirname, stdio: 'inherit', env });
  process.env.PRISMA_MIGRATIONS_READY = 'true';
  console.log('[START] Prisma is ready.');
} catch (error) {
  console.error('[ERROR] Prisma startup preparation failed:', error.message);
  process.exit(1);
}

await import('./server.js');
