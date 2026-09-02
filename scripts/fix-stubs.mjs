import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const outFile = path.join(root, 'fix-stubs-output.txt');

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walk(full));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.css')) {
      results.push(full);
    }
  }
  return results;
}

let out = '';

const allFiles = walk(srcDir);
const dupFiles = new Map(); // basePath -> dupPath

for (const f of allFiles) {
  const base = path.basename(f);
  if (base.includes(' (2)')) {
    const cleanName = base.replace(' (2)', '');
    const basePath = path.join(path.dirname(f), cleanName);
    dupFiles.set(basePath, f);
  }
}

// Files to ALWAYS exclude from replacement (keep base version)
const keepBase = new Set([
  // main.tsx: base includes AuthProvider wrapper (correct), (2) does not
  path.join(srcDir, 'main.tsx'),
  // lib/utils.ts: base is the correct cn() helper, (2) is identical anyway
  path.join(srcDir, 'lib', 'utils.ts'),
]);

// Files to FORCE replace even if base is not "small" (known stubs)
const forceReplace = new Set([
    stubBases.set(basePath, dupPath);
  }
}

out += `=== STUB FILES TO REPLACE (${stubBases.size}) ===\n`;
for (const [basePath, dupPath] of stubBases.entries()) {
  out += `${path.relative(root, basePath)}  (${fs.statSync(basePath).size} -> ${fs.statSync(dupPath).size} bytes)\n`;
}

// Also handle main.tsx (base is 320 bytes, dup is 231 - actually dup is smaller)
// main.tsx is an entry that exists separately. Skip it since it's valid.

// Now do the replacement
let replaced = 0;
let skipped = [];
for (const [basePath, dupPath] of stubBases.entries()) {
  try {
    const content = fs.readFileSync(dupPath, 'utf8');
    fs.writeFileSync(basePath, content, 'utf8');
    replaced++;
    out += `\nREPLACED: ${path.relative(root, basePath)}\n`;
  } catch (err) {
    skipped.push({ basePath, err: err.message });
    out += `\nFAILED: ${path.relative(root, basePath)}: ${err.message}\n`;
  }
}

out += `\n=== SUMMARY ===\nReplaced: ${replaced}\nSkipped/Failed: ${skipped.length}\n`;

fs.writeFileSync(outFile, out, 'utf8');
console.log('Fixed. Wrote to ' + outFile);
