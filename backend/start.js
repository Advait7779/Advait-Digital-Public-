import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { prismaEnv } from './scripts/prisma-env.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

console.log('[START] Preparing Prisma client and database migrations...');

try {
  const env = prismaEnv();

  try {
    execSync('npx --no-install prisma generate', { cwd: __dirname, stdio: 'inherit', env });
  } catch (genErr) {
    console.warn('[WARN] Offline prisma generate failed, trying standard generate...', genErr.message);
    try {
      execSync('npx prisma generate', { cwd: __dirname, stdio: 'inherit', env });
    } catch (e) {
      console.warn('[WARN] Prisma generate fallback failed:', e.message);
    }
  }

  let migrated = false;
  const maxAttempts = 5;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`[START] Running database migrations (attempt ${attempt}/${maxAttempts})...`);
      execSync('node scripts/migrate-helper.js', { cwd: __dirname, stdio: 'inherit', env });
      migrated = true;
      process.env.PRISMA_MIGRATIONS_READY = 'true';
      console.log('[START] Prisma migrations and auto-baselining completed successfully.');

      // A fresh database has the email_templates table after migrations, but it
      // does not yet contain the default customer thank-you template. The seed
      // uses an upsert with an empty update, so this creates missing defaults
      // without overwriting templates customized in the CMS.
      try {
        console.log('[START] Ensuring default database records exist...');
        execSync('node prisma/seed.js', { cwd: __dirname, stdio: 'inherit', env });
        console.log('[START] Default database records are ready.');
      } catch (seedErr) {
        console.error('[WARN] Default database seed failed:', seedErr.message);
      }

      break;
    } catch (migErr) {
      console.error(`[WARN] Migration attempt ${attempt} failed:`, migErr.message);
      if (attempt < maxAttempts) {
        console.log('[INFO] Waiting 3 seconds before retrying database migration...');
        await wait(3000);
      }
    }
  }

  if (!migrated) {
    console.error('[ERROR] Database migrations failed after all attempts. Server will start in degraded mode.');
  }
} catch (error) {
  console.error('[ERROR] Unexpected error during Prisma startup preparation:', error.message);
}

// Always boot server.js so container stays running and healthcheck passes
await import('./server.js');
