const fs = require('fs');
let code = fs.readFileSync('apps/landing/src/components/PublicWebsite.tsx', 'utf-8');

// The heroSection was injected with a <section>. Let's find it.
const searchStr = '{/* ═══ LIVE SOCIAL PROOF & KEY PERFORMANCE METRICS ═══ */}';
if (code.includes(searchStr)) {
  // Check if it already has a </section> before it.
  const idx = code.indexOf(searchStr);
  const beforeStr = code.substring(idx - 50, idx);
  console.log("Before string is:", beforeStr);
  
  if (!beforeStr.includes('</section>')) {
     code = code.substring(0, idx) + '                </section>\n' + code.substring(idx);
     fs.writeFileSync('apps/landing/src/components/PublicWebsite.tsx', code);
     console.log("Added missing </section>");
  }
}
