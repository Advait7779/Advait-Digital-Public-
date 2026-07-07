import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Dynamically construct database connection URL to map Coolify host configurations
const datasourceUrl = `postgresql://${DB_USER || 'postgres'}:${DB_PASSWORD || 'postgres'}@${DB_HOST || 'localhost'}:${DB_PORT || '5432'}/${DB_NAME || 'postgres'}?schema=public`;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: datasourceUrl,
    },
  },
});

/**
 * Execute a raw parameterized query (backwards compatibility helper)
 * @param {string} text - SQL query
 * @param {Array}  params - query parameters
 */
export async function query(text, params = []) {
  try {
    if (params && params.length > 0) {
      const rows = await prisma.$queryRawUnsafe(text, ...params);
      return { rows };
    } else {
      const rows = await prisma.$queryRawUnsafe(text);
      return { rows };
    }
  } catch (err) {
    console.error('❌ [DB] Raw query error:', err.message);
    throw err;
  }
}

export default prisma;
