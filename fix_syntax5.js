const fs = require('fs');
let code = fs.readFileSync('apps/landing/src/components/PublicWebsite.tsx', 'utf-8');

const heroMarker = '{/* ═══ HERO ═══ */}\n<section className="relative bg-slate-950 overflow-hidden pt-32 pb-20 px-6">\n';
if (code.includes(heroMarker)) {
  const replacement = heroMarker + '                  <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">\n';
  // Check if it already has this div
  const nextLine = code.substring(code.indexOf(heroMarker) + heroMarker.length, code.indexOf(heroMarker) + heroMarker.length + 50);
  if (!nextLine.includes('max-w-6xl')) {
     code = code.replace(heroMarker, replacement);
     fs.writeFileSync('apps/landing/src/components/PublicWebsite.tsx', code);
     console.log("Added missing div back!");
  } else {
     console.log("div already there?");
  }
}
