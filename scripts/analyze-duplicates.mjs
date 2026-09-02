import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const outFile = path.join(root, 'analyze-output.txt');

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

out += '=== (2) FILES ===\n';
for (const [basePath, dupPath] of [...dupFiles.entries()].sort()) {
  const baseExists = fs.existsSync(basePath);
  const marker = baseExists ? 'OK (base exists)' : '** BASE MISSING **';
  const baseSize = baseExists ? fs.statSync(basePath).size : 0;
  const dupSize = fs.statSync(dupPath).size;
  const same = baseExists && baseSize === dupSize;
  out += `${same ? 'SAME ' : 'DIFF '}\t${String(baseSize).padStart(8)} vs ${String(dupSize).padStart(8)}\t${marker}\t${path.relative(root, dupPath)}\n`;
}

out += '\n=== (2) FILES IMPORTING OTHER (2) FILES ===\n';
for (const [basePath, dupPath] of dupFiles.entries()) {
  const content = fs.readFileSync(dupPath, 'utf8');
  const imports = content.match(/from\s+['"]([^'"]*\(2\)[^'"]*)['"]/g) || [];
  if (imports.length) {
    out += `\n${path.relative(root, dupPath)}:\n`;
    for (const imp of imports) {
      out += `  ${imp}\n`;
    }
  }
}

out += '\n=== FILES (non-duplicate) IMPORTING (2) FILES ===\n';
for (const f of allFiles) {
  if (f.includes(' (2)')) continue;
  const content = fs.readFileSync(f, 'utf8');
  const imports = content.match(/from\s+['"]([^'"]*)['"]/g) || [];
  const dupImports = imports.filter(i => i.includes('(2)'));
  if (dupImports.length) {
    out += `\n${path.relative(root, f)}:\n`;
    for (const imp of dupImports) {
      out += `  ${imp}\n`;
    }
  }
}

out += '\n=== @/ alias imports in (2) files (truncated) ===\n';
let count = 0;
for (const [basePath, dupPath] of dupFiles.entries()) {
  const content = fs.readFileSync(dupPath, 'utf8');
  const imports = content.match(/from\s+['"]@\/[^'"]*['"]/g) || [];
  if (imports.length) {
    out += `\n${path.relative(root, dupPath)}:\n`;
    for (const imp of imports.slice(0, 8)) {
      out += `  ${imp}\n`;
    }
    count++;
    if (count > 12) { out += '... (truncated)\n'; break; }
  }
}

fs.writeFileSync(outFile, out, 'utf8');
console.log('Done. Wrote to ' + outFile);
