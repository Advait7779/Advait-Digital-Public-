import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Dynamically construct database connection URL to map Coolify host configurations
const datasourceUrl =
  process.env.DATABASE_URL ||
  `postgresql://${DB_USER || 'postgres'}:${DB_PASSWORD || 'postgres'}@${DB_HOST || 'localhost'}:${DB_PORT || '5432'}/${DB_NAME || 'postgres'}?schema=public`;

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
  void text;
  void params;
  throw new Error('Raw SQL helper is disabled in production. Use Prisma typed queries instead.');
}


export default prisma;
