import { PrismaClient } from '@prisma/client';
import { prismaEnv } from './prisma-env.js';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = prismaEnv();

// Instantiate PrismaClient with the built DATABASE_URL
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL
    }
  }
});

async function run() {
  console.log('[Migrate Helper] Connecting to database via Prisma to check schema...');
  
  try {
    // 1. Get all existing tables
    const tableRes = await prisma.$queryRawUnsafe(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
    );
    const tables = tableRes.map(r => r.table_name);
    console.log('[Migrate Helper] Existing tables in database:', tables.join(', ') || '(none)');

    const hasLeads = tables.includes('leads');
    const hasAnalyticsVisits = tables.includes('analytics_visits');
    const hasMigrationsTable = tables.includes('_prisma_migrations');

    // Helper to check if a migration is already in _prisma_migrations
    let appliedMigrations = [];
    if (hasMigrationsTable) {
      const migRes = await prisma.$queryRawUnsafe(
        "SELECT migration_name FROM _prisma_migrations WHERE finished_at IS NOT NULL"
      );
      appliedMigrations = migRes.map(r => r.migration_name);
    }
    console.log('[Migrate Helper] Already registered migrations:', appliedMigrations.join(', ') || '(none)');

    const backendDir = path.join(__dirname, '..');

    // Check 20260707120000_init
    if (hasLeads && !appliedMigrations.includes('20260707120000_init')) {
      console.log('[Migrate Helper] Table "leads" exists but "20260707120000_init" is not registered. Baselining...');
      execSync('npx prisma migrate resolve --applied 20260707120000_init', { cwd: backendDir, stdio: 'inherit', env });
    }

    // Check 20260709090000_analytics_visits
    if (hasAnalyticsVisits && !appliedMigrations.includes('20260709090000_analytics_visits')) {
      console.log('[Migrate Helper] Table "analytics_visits" exists but "20260709090000_analytics_visits" is not registered. Baselining...');
      execSync('npx prisma migrate resolve --applied 20260709090000_analytics_visits', { cwd: backendDir, stdio: 'inherit', env });
    }

    // Check 20260709100000_lead_reminders (column check)
    if (hasLeads) {
      const colRes = await prisma.$queryRawUnsafe(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'reminder_due_at'"
      );
      const hasReminderDueAt = colRes.length > 0;
      if (hasReminderDueAt && !appliedMigrations.includes('20260709100000_lead_reminders')) {
        console.log('[Migrate Helper] Column "reminder_due_at" exists in "leads" but "20260709100000_lead_reminders" is not registered. Baselining...');
        execSync('npx prisma migrate resolve --applied 20260709100000_lead_reminders', { cwd: backendDir, stdio: 'inherit', env });
      }
    }

  } catch (err) {
    console.error('[Migrate Helper] Error during auto-baselining check:', err.message);
  } finally {
    await prisma.$disconnect();
  }

  // Finally, run deploy to make sure everything is in sync and any new migrations are applied
  console.log('[Migrate Helper] Running final migrate deploy...');
  execSync('npx prisma migrate deploy', { cwd: path.join(__dirname, '..'), stdio: 'inherit', env });
}

run().catch(err => {
  console.error('[Migrate Helper] Fatal error:', err.message);
  process.exit(1);
});
