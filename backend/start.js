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
  
  try {
    const output = execSync('npx prisma migrate deploy', { cwd: __dirname, env });
    console.log(output.toString());
  } catch (deployError) {
    const errorOutput = (deployError.stdout?.toString() || '') + '\n' + (deployError.stderr?.toString() || '');
    if (errorOutput.includes('P3005') || deployError.message.includes('P3005')) {
      console.log('[START] Database schema is not empty (P3005). Attempting to baseline initial migration (20260707120000_init)...');
      try {
        execSync('npx prisma migrate resolve --applied 20260707120000_init', { cwd: __dirname, stdio: 'inherit', env });
        console.log('[START] Initial migration marked as applied. Retrying migrate deploy...');
        execSync('npx prisma migrate deploy', { cwd: __dirname, stdio: 'inherit', env });
      } catch (baselineError) {
        console.error('[ERROR] Baselining or retrying migrate deploy failed:', baselineError.message);
        throw baselineError;
      }
    } else {
      console.error(errorOutput);
      throw deployError;
    }
  }

  process.env.PRISMA_MIGRATIONS_READY = 'true';
  console.log('[START] Prisma is ready.');
} catch (error) {
  console.error('[ERROR] Prisma startup preparation failed:', error.message);
  process.exit(1);
}

await import('./server.js');
