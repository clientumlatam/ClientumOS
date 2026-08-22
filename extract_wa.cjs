const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const startMarker = '// ── Webhooks de WhatsApp';
const endMarker = '// Configure Vite or Static Files';

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const waCode = code.substring(startIndex, endIndex);
    
    // Create whatsapp route file
    const routeContent = `import { Router } from "express";
import { pgPool } from "../db.js";

export const whatsappRouter = Router();

// Fallback in-memory conversations if DB is offline
const memoryWaConversations: any[] = [];
const memoryWaMessages: Record<number, any[]> = {};
let metaWebhookLogs: any[] = [];

` + waCode.replace(/app\./g, 'whatsappRouter.')
      .replace(/const memoryWaConversations[\s\S]*?(?=\/\/ 1\. GET)/, ''); // Remove the old memory block definition if it's there
      
    fs.writeFileSync('server/routes/whatsapp.ts', routeContent);
    
    // Update server.ts
    const newServerCode = code.substring(0, startIndex) + `\nimport { whatsappRouter } from "./server/routes/whatsapp.js";\napp.use("/", whatsappRouter);\n\n` + code.substring(endIndex);
    
    fs.writeFileSync('server.ts', newServerCode);
    console.log('WhatsApp routes extracted successfully.');
} else {
    console.log('Markers not found.');
}
