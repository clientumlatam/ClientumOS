const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace("  `);\n  `);", "  `);");

fs.writeFileSync('server.ts', code);
console.log('Syntax error fixed.');
