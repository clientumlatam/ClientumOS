const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const replacement = `      const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY;
      if (googleMapsKey) {
        try {
          const url = "https://places.googleapis.com/v1/places:searchText";
          const body = {
            textQuery: \`\${industry} en \${city}\`,
            maxResultCount: limit || 15,
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
              rawResults = data.places.map((p, i) => ({
                company: p.displayName?.text || "Empresa",
                address: p.formattedAddress || city,
                rating: p.rating || null,
                review_count: p.userRatingCount || 0,
                phone: p.nationalPhoneNumber || null,
                website: p.websiteUri || null,
                category: p.primaryTypeDisplayName?.text || industry,
                lat: p.location?.latitude || null,
                lng: p.location?.longitude || null
              }));
              usedSource = "google_places_api";
            }
          }
        } catch(e) {}
      }

      if (rawResults.length === 0) {
        const gem = await fetchGeminiPlacesSearch(city, industry);
        if (gem.length > 0) {
          rawResults = gem;
          usedSource = "gemini_free";
        } else {
          const osm = await fetchOpenStreetMapPlaces(city, industry);
          rawResults = osm;
          usedSource = "openstreetmap_free";
        }
      }`;

code = code.replace(
/const gem = await fetchGeminiPlacesSearch\(city, industry\);\s*if \(gem\.length > 0\) \{\s*rawResults = gem;\s*usedSource = "gemini_free";\s*\} else \{\s*const osm = await fetchOpenStreetMapPlaces\(city, industry\);\s*rawResults = osm;\s*usedSource = "openstreetmap_free";\s*\}/, replacement
);

fs.writeFileSync('server.ts', code, 'utf8');
console.log("Runner updated");
