const fs = require('fs');
let code = fs.readFileSync('apps/landing/src/components/PublicWebsite.tsx', 'utf-8');

const startIndex = code.indexOf('{activeTab === "inicio" && (');
if (startIndex === -1) throw new Error("Could not find start");
const endInicioTab = code.indexOf('{/* SERVICIOS Y CONSULTORIA TAB */}');
if (endInicioTab === -1) throw new Error("Could not find end");

let beforeInicio = code.substring(0, startIndex);
let inicioTab = code.substring(startIndex, endInicioTab);
let afterInicio = code.substring(endInicioTab);

// We need to split inicioTab into sections.
// Section 1: Hero (starts near the top of inicioTab, goes until <SocialProofBar />)
const socialProofIndex = inicioTab.indexOf('{/* ═══ LIVE SOCIAL PROOF & KEY PERFORMANCE METRICS ═══ */}');
let heroSection = inicioTab.substring(0, socialProofIndex);

// Let's fix the broken comment in heroSection
heroSection = heroSection.replace(/\{\/\* ════[^\n]*\n/, '{/* ═══ HERO ═══ */}\n<section className="relative bg-slate-950 overflow-hidden pt-32 pb-20 px-6">\n');
// But wait, there might not be a missing <section> if it was just a broken comment. Wait, we'll just replace the comment.

// The rest of the sections start with {/* 
let rest = inicioTab.substring(socialProofIndex);

// We can split the rest by `{/* ` (but need to be careful not to split inside sections).
// The main sections in `rest` are:
// 2. Social proof
// 3. Paneles destacados (legado viaweb)
// 4. Por que clientum
// 5. Social proof strip
// 6. Primary pillars
// 7. Pymes argentinas
// 8. Info blocks
// 9. Big list section
// 10. Servicios hub
// 11. Ecosistema hub
// 12. CTA final

const secNames = [
  "Social proof",
  "PANELES DESTACADOS",
  "POR QUÉ CLIENTUM",
  "SOCIAL PROOF STRIP",
  "PRIMARY PILLARS",
  "PYMES ARGENTINAS EN ACCIÓN",
  "Info blocks Section",
  "Big List section",
  "SERVICIOS HUB",
  "ECOSISTEMA HUB",
  "CTA FINAL",
  "End of Tab"
];

let indices = [];
secNames.forEach(name => {
  let idx = -1;
  if (name === "End of Tab") {
    idx = rest.lastIndexOf('</div>\n            )}');
    if (idx === -1) idx = rest.length - 20; // fallback
  } else if (name === "Social proof") {
    idx = 0; // already starts at social proof
  } else {
    idx = rest.indexOf('{/* ' + (name.includes('PANELES') ? '═══ PANELES' : name.includes('POR QUÉ') ? '═══ POR QUÉ' : name.includes('SOCIAL PROOF STRIP') ? '═══ SOCIAL PROOF STRIP' : name.includes('PRIMARY') ? '═══ PRIMARY' : name.includes('PYMES') ? '═══ PYMES' : name.includes('Info blocks') ? 'Info blocks' : name.includes('Big List') ? 'Big List' : name.includes('SERVICIOS HUB') ? '───────── SERVICIOS HUB' : name.includes('ECOSISTEMA HUB') ? '───────── ECOSISTEMA HUB' : name.includes('CTA FINAL') ? '───────── CTA FINAL' : name));
  }
  if (idx !== -1) indices.push({name, idx});
  else console.log("Could not find", name);
});

indices.sort((a, b) => a.idx - b.idx);

let sections = [];
for (let i = 0; i < indices.length - 1; i++) {
  sections.push({
    name: indices[i].name,
    content: rest.substring(indices[i].idx, indices[i+1].idx)
  });
}
const endContent = rest.substring(indices[indices.length - 1].idx); // "End of Tab" content

// Current order:
// 1. Hero
// 2. Social proof (metrics)
// 3. Paneles destacados (Nube viaweb)
// 4. Por que clientum (Pierde ventas)
// 5. Social proof strip (Integrations)
// 6. Primary pillars (Nuestros servicios mas contratados)
// 7. Pymes argentinas (Diagnostico rapido)
// 8. Info blocks (Enfocate)
// 9. Big list section (Cultura)
// 10. Servicios hub
// 11. Ecosistema hub
// 12. CTA final

// Desired order for a better flow:
// 1. Hero (heroSection)
// 2. Social proof (metrics) -> sections[0]
// 3. Por que clientum (The Problem) -> sections[2]
// 4. Ecosistema hub (The Solution ecosystem) -> sections[9]
// 5. Social proof strip (Logos/Integrations) -> sections[3]
// 6. Pymes argentinas (Diagnostico / ROI) -> sections[5]
// 7. Info blocks (Enfocate) -> sections[6]
// 8. Primary pillars (Top Services) -> sections[4]
// 9. Servicios hub (All Services) -> sections[8]
// 10. Paneles destacados (Webinars/Events) -> sections[1]
// 11. Big list section (Culture) -> sections[7]
// 12. CTA final -> sections[10]

let newRest = 
  sections[0].content + // Social proof metrics
  sections[2].content + // Por que clientum (Problem)
  sections[9].content + // Ecosistema hub
  sections[3].content + // Social proof strip (Integrations)
  sections[5].content + // Pymes argentinas (ROI / Diagnostico)
  sections[6].content + // Info blocks
  sections[4].content + // Primary pillars (Top Services)
  sections[8].content + // Servicios hub (All Services)
  sections[1].content + // Paneles destacados
  sections[7].content + // Cultura
  sections[10].content + // CTA Final
  endContent;

fs.writeFileSync('apps/landing/src/components/PublicWebsite.tsx', beforeInicio + heroSection + newRest + afterInicio);
console.log("File reordered.");
