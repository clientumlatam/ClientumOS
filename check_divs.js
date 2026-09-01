const fs = require('fs');
let code = fs.readFileSync('apps/landing/src/components/PublicWebsite.tsx', 'utf-8');

const startStr = '{/* ═══ HERO ═══ */}';
const endStr = '{/* ═══ LIVE SOCIAL PROOF & KEY PERFORMANCE METRICS ═══ */}';
const startIdx = code.indexOf(startStr);
const endIdx = code.indexOf(endStr);
const hero = code.substring(startIdx, endIdx);

let divCount = 0;
let sectionCount = 0;

for(let i=0; i<hero.length; i++) {
   if (hero.substring(i, i+4) === '<div') divCount++;
   if (hero.substring(i, i+5) === '</div') divCount--;
   if (hero.substring(i, i+8) === '<section') sectionCount++;
   if (hero.substring(i, i+9) === '</section') sectionCount--;
}

console.log("div balance:", divCount);
console.log("section balance:", sectionCount);
