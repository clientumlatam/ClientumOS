import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');

const stubPatterns = ['Coming soon', 'Coming Soon', 'placeholder', 'TODO'];

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walk(full));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      results.push(full);
    }
  }
  return results;
}

const files = walk(srcDir);
const stubs = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  // Skip "(2)" duplicates
  if (file.includes(' (2)')) continue;
  if (content.length < 500) {
    stubs.push({ file: path.relative(root, file), size: content.length, reason: 'small file' });
  } else if (stubPatterns.some(p => content.includes(p))) {
    stubs.push({ file: path.relative(root, file), size: content.length, reason: 'stub pattern' });
  }
}

console.log('=== STUB / SMALL FILES ===');
for (const s of stubs) {
  console.log(`${s.size}\t${s.reason}\t${s.file}`);
}
console.log(`\nTotal: ${stubs.length}`);
