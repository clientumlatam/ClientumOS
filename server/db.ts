import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

function normalizeDatabaseUrl(url?: string): string {
  if (!url) return "";
  return url.trim().replace(/sslmode=(require|prefer|verify-ca)/gi, "sslmode=verify-full");
}

const databaseUrl = normalizeDatabaseUrl(process.env.DATABASE_URL || process.env.NEON_DATABASE_URL);

if (!databaseUrl) {
  console.error("FATAL: DATABASE_URL is not configured.");
  process.exit(1);
}

export const pgPool = new Pool({
  connectionString: databaseUrl,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 5000,
});

pgPool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
