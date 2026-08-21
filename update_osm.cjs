const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// 1. Rewrite fetchOpenStreetMapPlaces
const osmFunctionRegex = /async function fetchOpenStreetMapPlaces\([\s\S]*?^\}/m;
const newOsmFunction = `async function fetchOpenStreetMapPlaces(city: string, industry: string): Promise<any[]> {
  try {
    let results: any[] = [];
    
    // 1. Nominatim (Búsqueda gratuita)
    console.log(\`[OpenStreetMap Nominatim] Buscando "\${industry}" en "\${city}"...\`);
    const query = \`\${industry} \${city}\`;
    const url = \`https://nominatim.openstreetmap.org/search?q=\${encodeURIComponent(query)}&format=json&addressdetails=1&extratags=1&limit=15\`;
    const res = await apiFetch(url, {
      headers: { "User-Agent": "ClientumOS-B2BProspector/1.0 (clientumlatam@gmail.com)" },
      signal: AbortSignal.timeout(6000)
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        results = data.map((item: any, i: number) => {
          const name = item.name || item.display_name.split(",")[0] || \`\${industry} \${city} \${i + 1}\`;
          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lon);
          const road = item.address?.road || item.address?.suburb || "";
          const houseNumber = item.address?.house_number || "";
          const fullAddress = [road, houseNumber, city].filter(Boolean).join(" ") || item.display_name;
          const phone = item.extratags?.phone || item.extratags?.contact_phone || "";
          const website = item.extratags?.website || item.extratags?.contact_website || "";

          return {
            id: \`osm-nom-\${item.osm_id || Date.now()}-\${i}\`,
            company: name,
            name: name,
            industry: industry,
            category: industry,
            address: fullAddress,
            city: city,
            country: item.address?.country || "Argentina",
            lat: lat,
            lng: lng,
            rating: null,
            review_count: 0,
            phone: phone,
            website: website,
            source: "openstreetmap_nominatim"
          };
        });
      }
    }

    // 2. Overpass API (Enriquecimiento)
    if (results.length < 15) {
      console.log(\`[OpenStreetMap Overpass] Buscando POIs mediante etiquetas para "\${industry}" en "\${city}"...\`);
      const overpassQuery = \`[out:json][timeout:10];
area["name"~"\${city}",i]->.searchArea;
(
  nwr["name"~"\${industry}",i](area.searchArea);
  nwr["shop"~"\${industry}",i](area.searchArea);
  nwr["amenity"~"\${industry}",i](area.searchArea);
);
out center 15;\`;
      const overpassUrl = \`https://overpass-api.de/api/interpreter\`;
      const overpassRes = await apiFetch(overpassUrl, {
        method: "POST",
        body: overpassQuery,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: AbortSignal.timeout(10000)
      });
      
      if (overpassRes.ok) {
        const overpassData = await overpassRes.json();
        if (overpassData && overpassData.elements) {
          overpassData.elements.forEach((el: any, i: number) => {
            const name = el.tags?.name;
            if (!name) return;
            
            const exists = results.some(r => r.name === name || r.company === name);
            if (!exists) {
              results.push({
                id: \`osm-ovp-\${el.id}-\${i}\`,
                company: name,
                name: name,
                industry: industry,
                category: industry,
                address: \`\${el.tags?.['addr:street'] || ''} \${el.tags?.['addr:housenumber'] || ''}, \${city}\`.trim().replace(/^,/, ''),
                city: city,
                country: "Argentina",
                lat: el.lat || el.center?.lat || 0,
                lng: el.lon || el.center?.lon || 0,
                rating: null,
                review_count: 0,
                phone: el.tags?.phone || el.tags?.['contact:phone'] || "",
                website: el.tags?.website || el.tags?.['contact:website'] || "",
                source: "openstreetmap_overpass"
              });
            }
          });
        }
      }
    }

    return results;
  } catch (err: any) {
    console.warn("[OpenStreetMap Warning]:", err.message);
    return [];
  }
}`;

const matchStart = code.indexOf('async function fetchOpenStreetMapPlaces');
if (matchStart !== -1) {
    const endMatch = code.substring(matchStart).indexOf('\n}\n');
    if(endMatch !== -1) {
       code = code.substring(0, matchStart) + newOsmFunction + code.substring(matchStart + endMatch + 2);
    }
}
fs.writeFileSync('server.ts', code, 'utf8');
console.log("Updated OSM fetcher");
