const fs = require('fs');

const code = fs.readFileSync('server.ts', 'utf8');

const replacement = `const gem = await fetchGeminiPlacesSearch(city, industry);
        if (gem.length > 0) {
          rawResults = gem;
          usedSource = "gemini_free";
        } else {
          const osm = await fetchOpenStreetMapPlaces(city, industry);
          rawResults = osm;
          usedSource = "openstreetmap_free";
        }`;

// Replace the block from 5891 to 5899
const updated = code.replace(
/const osm = await fetchOpenStreetMapPlaces\(city, industry\);\s*if \(osm\.length > 0\) \{\s*rawResults = osm;\s*usedSource = "openstreetmap_free";\s*\} else \{\s*const gem = await fetchGeminiPlacesSearch\(city, industry\);\s*rawResults = gem;\s*usedSource = "gemini_free";\s*\}/, replacement
);

if (code !== updated) {
  fs.writeFileSync('server.ts', updated, 'utf8');
  console.log("Successfully swapped runner sources");
} else {
  console.log("Could not find the block");
}
