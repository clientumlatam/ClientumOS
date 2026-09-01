import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

function normalizeDatabaseUrl(url?: string): string {
  if (!url) return "";
  return url.trim().replace(/sslmode=(require|prefer|verify-ca)/gi, "sslmode=verify-full");
}

const databaseUrl = normalizeDatabaseUrl(process.env.DATABASE_URL || process.env.NEON_DATABASE_URL);

let pgPool: any;
try {
  if (!databaseUrl) throw new Error("No DB URL");
  pgPool = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 5000,
  });
  pgPool.on('error', (err: any) => {
    console.error('Unexpected error on idle client', err);
  });
} catch {
  console.warn('[AI Studio] PostgreSQL not connected in db.ts — using mock pool');
  pgPool = {
    query: async () => ({ rows: [], rowCount: 0 }),
    connect: async () => ({ query: async () => ({ rows: [], rowCount: 0 }), release: () => {} }),
    on: () => {}
  };
}

export { pgPool };

/**
 * Ejecuta una consulta SQL en la base de datos Neon / PostgreSQL.
 */
export const query = async (text: string, params?: any[]) => {
  return await pgPool.query(text, params);
};

/**
 * Verifica la salud de la conexión a la base de datos.
 */
export const checkDbConnection = async (): Promise<boolean> => {
  try {
    const res = await pgPool.query("SELECT NOW()");
    return res && res.rows && res.rows.length > 0;
  } catch (error) {
    console.warn("[Database] Comprobacion de salud fallida:", error);
    return false;
  }
};
