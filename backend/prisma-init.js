import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { prismaEnv } from './scripts/prisma-env.js';

dotenv.config();

console.log('[RUN] Running Prisma generate and migration deploy...');

try {
  const env = prismaEnv();
  execSync('npx prisma generate', { stdio: 'inherit', env });
  execSync('npx prisma migrate deploy', { stdio: 'inherit', env });
  console.log('[OK] Prisma initialization completed successfully.');
} catch (error) {
  console.error('[ERROR] Prisma initialization failed:', error.message);
  process.exit(1);
}
