import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { prismaEnv } from './scripts/prisma-env.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('[RUN] [Bootstrap] Running Prisma generate and migration deploy...');

try {
  const env = prismaEnv();
  execSync('npx prisma generate', { cwd: __dirname, stdio: 'inherit', env });
  execSync('npx prisma migrate deploy', { cwd: __dirname, stdio: 'inherit', env });
  console.log('[OK] [Bootstrap] Prisma migrations completed successfully.');
} catch (error) {
  console.error('[ERROR] [Bootstrap] Prisma migration failed:', error.message);
}
