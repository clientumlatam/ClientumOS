const fs = require('fs');

let code = fs.readFileSync('server.ts', 'utf8');

// Find the start of whatsapp routes
const startStr = '// ── Webhooks de WhatsApp ───────────────────────────────────────────────────────';
const startIndex = code.indexOf(startStr);
if (startIndex === -1) {
    console.error("Could not find start of whatsapp routes.");
    process.exit(1);
}

// Find the end. What's after whatsapp routes? Let's check.
