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

  // Remove /api prefix if necessary depending on how Express routes are set up
  // If Express expects /api/..., we don't need to change req.url.
  // We can just pass the request to Express.
  return app(req, res);
}
