const fs = require('fs');
let code = fs.readFileSync('apps/landing/src/components/PublicWebsite.tsx', 'utf-8');

// I need to look at lines 1815-1825
const lines = code.split('\n');
console.log(lines.slice(1810, 1825).join('\n'));
