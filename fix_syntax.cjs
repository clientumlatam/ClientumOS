const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/    \/\/ 2\. Fallback: Gemini Search Grounding\s*if \(results\.length === 0\) \{\s*\(Google Search\)\s*if \(results\.length === 0\) \{/g, 
`    // 2. Fallback: Gemini Search Grounding
    if (results.length === 0) {`);

fs.writeFileSync('server.ts', code, 'utf8');
console.log("Syntax fixed");
