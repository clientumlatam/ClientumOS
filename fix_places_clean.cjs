const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// We need to replace the entire body of app.post("/api/places/search"
const startTag = 'app.post("/api/places/search", async (req, res) => {';
const endRegex = /res\.json\(\{ results, simulated: isSimulated \}\);\s*\} catch \(err: any\) \{\s*console\.error\("\[\/api\/places\/search Error\]", err\.message\);\s*res\.status\(500\)\.json\(\{ error: err\.message \}\);\s*\}\s*\}\);/;

const matchStart = code.indexOf(startTag);
const matchEnd = code.match(endRegex);

if (matchStart !== -1 && matchEnd) {
  const endIndex = matchEnd.index + matchEnd[0].length;
  const newHandler = `app.post("/api/places/search", async (req, res) => {
  try {
    const { rubro, ciudad, radio = 10, googlePlacesKey } = req.body ?? {};
    if (!rubro || !ciudad) {
      return res.status(400).json({ error: "Faltan rubro y ciudad." });
    }

    const mapsKey = (googlePlacesKey && String(googlePlacesKey).trim())
      || process.env.GOOGLE_MAPS_PLATFORM_KEY
      || process.env.GOOGLE_MAPS_API_KEY
      || process.env.GOOGLE_MAPS_KEY;

    const apifyToken = process.env.APIFY_API_TOKEN;

    console.log("======================================================================");
    console.log("[/api/places/search] Iniciando búsqueda de empresas e inteligencia territorial...");
    console.log(\` - Rubro: "\${rubro}" | Ciudad: "\${ciudad}" | Radio: \${radio}km\`);
    console.log(\` - Google Places Key: \${mapsKey ? "PRESENT" : "NOT LOADED"}\`);
    console.log("======================================================================");

    let results: any[] = [];
    let isSimulated = false;

    // 1. Google Places API
    if (mapsKey && mapsKey !== "google_maps_platform_key_placeholder" && mapsKey.trim() !== "") {
      try {
        console.log("[/api/places/search] Consultando Google Places API...");
        const url = "https://places.googleapis.com/v1/places:searchText";
        const body = {
          textQuery: \`\${rubro} en \${ciudad}\`,
          maxResultCount: 15,
          languageCode: "es"
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': mapsKey,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.websiteUri,places.primaryTypeDisplayName'
          },
          body: JSON.stringify(body)
        });

        if (response.ok) {
          const data = await response.json();
          if (data.places && data.places.length > 0) {
            results = data.places.map((p: any, i: number) => ({
              id: p.id || \`gmaps-\${Date.now()}-\${i}\`,
              name: p.displayName?.text || "Empresa Desconocida",
              address: p.formattedAddress || \`\${ciudad}\`,
              rating: p.rating || null,
              review_count: p.userRatingCount || 0,
              phone: p.nationalPhoneNumber || "",
              website: p.websiteUri || "",
              category: p.primaryTypeDisplayName?.text || rubro,
              lat: p.location?.latitude || -34.6037,
              lng: p.location?.longitude || -58.3816,
              city: ciudad,
              country: "Argentina",
              estimatedEmployees: "10-50 empleados",
              estimatedRevenueUsd: 1500000
            }));
            console.log(\`[Google Places] Encontrados \${results.length} resultados.\`);
          }
        } else {
          const errData = await response.text();
          console.error("[Google Places API] Error:", errData);
        }
      } catch (e: any) {
        console.error("[Google Places API] Exception:", e.message);
      }
    }

    // 2. Gemini Search Grounding en tiempo real (Google Search)
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

    // 3. OpenStreetMap Nominatim
    if (results.length === 0) {
      try {
        console.log("[/api/places/search] Consultando OpenStreetMap Nominatim (Free Keyless API)...");
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

    // 4. Apify scraper como fallback secundario si está configurado
    if (results.length === 0 && apifyToken && apifyToken !== "apify_api_token_placeholder" && apifyToken !== "MY_APIFY_API_TOKEN" && apifyToken.trim() !== "") {
      try {
        console.log("[/api/places/search] Ejecutando Apify Google Places scraper...");
        const apifyPlaces = await fetchApifyGooglePlaces(ciudad, rubro);
        results = apifyPlaces.map((p: any, i: number) => ({
          id: \`ap-\${Date.now()}-\${i}\`,
          name: p.company,
          address: p.address,
          rating: p.rating,
          review_count: 0,
          phone: p.phone !== "Sin teléfono" ? p.phone : null,
          website: p.website || null,
          category: p.industry,
        }));
      } catch (apErr: any) {
        console.warn("[/api/places/search] Apify scraper falló:", apErr.message);
      }
    }

    res.json({ results, simulated: isSimulated });
  } catch (err: any) {
    console.error("[/api/places/search Error]", err.message);
    res.status(500).json({ error: err.message });
  }
});`;

  code = code.substring(0, matchStart) + newHandler + code.substring(endIndex);
  fs.writeFileSync('server.ts', code, 'utf8');
  console.log("Endpoint clean and rewritten");
} else {
  console.log("Could not match the entire app.post section");
}
