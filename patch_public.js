const fs = require('fs');
let file = fs.readFileSync('src/components/PublicWebsite.tsx', 'utf8');
file = file.replace(
  'name: "Sede — General Roca, Patagonia",\n      address: contact.address,\n      phone: contact.phone,',
  'name: "Sede — Arraial do Cabo, Brasil",\n      address: "Matias Andres Rotili Poinsof\\nArraial do Cabo, RJ",\n      phone: "+54 9 291 440-9805",'
);
fs.writeFileSync('src/components/PublicWebsite.tsx', file);
console.log("Patched");
