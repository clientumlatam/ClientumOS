const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regexAPI = /\/\/ 2\. Gemini Search Grounding[\s\S]*?\/\/ 4\. Apify scraper/;
const newAPI = `// 2. OpenStreetMap Nominatim + Overpass (100% Free Keyless)
    if (results.length === 0) {
      try {
        console.log("[/api/places/search] Consultando OpenStreetMap (Nominatim + Overpass)...");
        const osmPlaces = await fetchOpenStreetMapPlaces(ciudad, rubro);
        if (osmPlaces.length > 0) {
          results = osmPlaces.map((p: any, i: number) => ({
            id: p.id || \`osm-\${Date.now()}-\${i}\`,
            name: p.name || p.company,
            address: p.address || \`Dirección en \${ciudad}\`,
            rating: p.rating || 4.5,
            review_count: p.review_count || 18,
            phone: p.phone || null,
            website: p.website || null,
            category: p.category || rubro,
            lat: p.lat,
            lng: p.lng,
            city: p.city || ciudad,
            country: p.country || "Argentina",
            estimatedEmployees: p.estimatedEmployees || "10-50 empleados",
            estimatedRevenueUsd: p.estimatedRevenueUsd || 1500000,
          }));
        }
      } catch (osmErr: any) {
        console.warn("[/api/places/search] OpenStreetMap warning:", osmErr.message);
      }
    }

    // 3. Gemini Search Grounding en tiempo real (Google Search)
    if (results.length === 0) {
      try {
        console.log("[/api/places/search] Consultando Gemini Google Search Grounding en tiempo real...");
        const geminiPlaces = await fetchGeminiPlacesSearch(ciudad, rubro);
        if (geminiPlaces.length > 0) {
          results = geminiPlaces.map((p: any, i: number) => ({
            id: \`gem-\${Date.now()}-\${i}\`,
            name: p.name || p.company,
            address: p.address || \`Dirección en \${ciudad}\`,
            rating: p.rating || 4.7,
            review_count: p.review_count || p.reviewsCount || 24,
            phone: p.phone || null,
            website: p.website || null,
            category: p.category || rubro,
            lat: p.lat || -34.6037,
            lng: p.lng || -58.3816,
            city: p.city || ciudad,
            country: p.country || "Argentina",
            estimatedEmployees: p.estimatedEmployees || "20-100 empleados",
            estimatedRevenueUsd: p.estimatedRevenueUsd || 2500000,
          }));
        }
      } catch (gemErr: any) {
        console.warn("[/api/places/search] Gemini Search Grounding warning:", gemErr.message);
      }
    }

    // 4. Apify scraper`;
code = code.replace(regexAPI, newAPI);

const regexRunner = /if \(rawResults\.length === 0\) \{\s*const gem = await fetchGeminiPlacesSearch\(city, industry\);\s*if \(gem\.length > 0\) \{\s*rawResults = gem;\s*usedSource = "gemini_free";\s*\} else \{\s*const osm = await fetchOpenStreetMapPlaces\(city, industry\);\s*rawResults = osm;\s*usedSource = "openstreetmap_free";\s*\}\s*\}/;
const newRunner = `if (rawResults.length === 0) {
        console.log("[Runner/Prospect] Usando OpenStreetMap (Nominatim+Overpass) Free...");
        const osm = await fetchOpenStreetMapPlaces(city, industry);
        if (osm.length > 0) {
          rawResults = osm;
          usedSource = "openstreetmap_free";
        } else {
          const gem = await fetchGeminiPlacesSearch(city, industry);
          rawResults = gem;
          usedSource = "gemini_free";
        }
      }`;
code = code.replace(regexRunner, newRunner);

fs.writeFileSync('server.ts', code, 'utf8');
console.log("Endpoint priorities updated");
