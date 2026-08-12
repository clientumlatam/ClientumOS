import { app, initUsersTable, initChatbotLeadsTable, initSantiTables } from '../server';

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
  return app(req, res);
}
