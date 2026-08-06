import { app, initUsersTable, initChatbotLeadsTable, initSantiTables } from '../server.js';

let dbInitialized = false;

export default async function handler(req: any, res: any) {
  if (!dbInitialized) {
    dbInitialized = true;
    try {
      await Promise.allSettled([
        initUsersTable(),
        initChatbotLeadsTable(),
        initSantiTables(),
      ]);
    } catch (e) {
      console.warn('[Vercel Serverless] DB init warning:', e);
    }
  }
  try {
    return await app(req, res);
  } catch (err: any) {
    console.error('[Vercel Serverless Error]:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error', message: err?.message || 'Server error' });
    }
  }
}
