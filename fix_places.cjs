const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const replacement = `    // 1. INTENTO OFICIAL: Google Places API (Si hay API Key configurada)
    const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY;
    if (googleMapsKey) {
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
            'X-Goog-Api-Key': googleMapsKey,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.websiteUri,places.primaryTypeDisplayName'
          },
          body: JSON.stringify(body)
        });

        if (response.ok) {
          const data = await response.json();
          if (data.places && data.places.length > 0) {
            results = data.places.map((p, i) => ({
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
      } catch (e) {
        console.error("[Google Places API] Exception:", e.message);
      }
    }

    // 2. Fallback: Gemini Search Grounding
    if (results.length === 0) {
`;

// Inject before Gemini block
code = code.replace(/\/\/ 2\. Gemini Search Grounding en tiempo real/, replacement);
fs.writeFileSync('server.ts', code, 'utf8');
console.log("Injected Google Places API");
