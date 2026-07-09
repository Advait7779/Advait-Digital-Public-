import dotenv from 'dotenv';
dotenv.config();

export function buildDatabaseUrl(env = process.env) {
  if (env.DATABASE_URL) return env.DATABASE_URL;

  const host = env.DB_HOST || 'localhost';
  const port = env.DB_PORT || '5432';
  const database = env.DB_NAME || 'postgres';
  const url = new URL(`postgresql://${host}:${port}/${database}`);
  url.username = env.DB_USER || 'postgres';
  url.password = env.DB_PASSWORD || 'postgres';
  url.searchParams.set('schema', 'public');
  return url.toString();
}

export function prismaEnv(env = process.env) {
  return {
    ...env,
    DATABASE_URL: buildDatabaseUrl(env),
  };
}
