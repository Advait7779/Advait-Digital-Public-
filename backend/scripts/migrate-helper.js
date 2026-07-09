import pkg from 'pg';
import { prismaEnv } from './prisma-env.js';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = prismaEnv();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: env.DATABASE_URL
});

async function run() {
  console.log('[Migrate Helper] Connecting to database to check schema...');
  let client;
  try {
    client = await pool.connect();
  } catch (err) {
    console.error('[Migrate Helper] Failed to connect to database:', err.message);
    process.exit(1);
  }

  try {
    // 1. Get all existing tables
    const tableRes = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
    );
    const tables = tableRes.rows.map(r => r.table_name);
    console.log('[Migrate Helper] Existing tables in database:', tables.join(', ') || '(none)');

    const hasLeads = tables.includes('leads');
    const hasAnalyticsVisits = tables.includes('analytics_visits');
    const hasMigrationsTable = tables.includes('_prisma_migrations');

    // Helper to check if a migration is already in _prisma_migrations
    let appliedMigrations = [];
    if (hasMigrationsTable) {
      const migRes = await client.query("SELECT migration_name FROM _prisma_migrations WHERE finished_at IS NOT NULL");
      appliedMigrations = migRes.rows.map(r => r.migration_name);
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
      const colRes = await client.query(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'reminder_due_at'"
      );
      const hasReminderDueAt = colRes.rows.length > 0;
      if (hasReminderDueAt && !appliedMigrations.includes('20260709100000_lead_reminders')) {
        console.log('[Migrate Helper] Column "reminder_due_at" exists in "leads" but "20260709100000_lead_reminders" is not registered. Baselining...');
        execSync('npx prisma migrate resolve --applied 20260709100000_lead_reminders', { cwd: backendDir, stdio: 'inherit', env });
      }
    }

  } catch (err) {
    console.error('[Migrate Helper] Error during auto-baselining check:', err.message);
  } finally {
    await client.release();
    await pool.end();
  }

  // Finally, run deploy to make sure everything is in sync and any new migrations are applied
  console.log('[Migrate Helper] Running final migrate deploy...');
  execSync('npx prisma migrate deploy', { cwd: path.join(__dirname, '..'), stdio: 'inherit', env });
}

run().catch(err => {
  console.error('[Migrate Helper] Fatal error:', err.message);
  process.exit(1);
});
