const fs = require('fs');
let code = fs.readFileSync('src/components/GeolocatedProspectingTab.tsx', 'utf8');
code = code.replace(/alert\("No se obtuvieron resultados de Google Maps.*?"\);/, 'alert("No se obtuvieron resultados en esa zona (ni en Google Maps ni en OpenStreetMap). Intenta con una zona más grande o verifica que tu API Key de Google Maps (GOOGLE_MAPS_API_KEY) esté configurada para resultados más precisos.");');
fs.writeFileSync('src/components/GeolocatedProspectingTab.tsx', code, 'utf8');
