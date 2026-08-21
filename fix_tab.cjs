const fs = require('fs');
let code = fs.readFileSync('src/components/GeolocatedProspectingTab.tsx', 'utf8');

const regex = /\} else \{\s*const generated: GeolocatedProspect = \{[\s\S]*?setSelectedProspect\(generated\);\s*\}/;

const replacement = `} else {
        alert("No se obtuvieron resultados de Google Maps. Verifica que tu API Key de Google Maps esté configurada (GOOGLE_MAPS_API_KEY) o intenta con otra búsqueda.");
      }`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/GeolocatedProspectingTab.tsx', code, 'utf8');
console.log("Tab fallback removed");
