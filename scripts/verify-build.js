import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('🔍 Running post-build verification...');

if (!fs.existsSync(distDir)) {
  console.error('❌ Build failure: dist directory does not exist!');
  process.exit(1);
}

const requiredFiles = [
  path.join(distDir, 'index.html'),
  path.join(distDir, 'server.cjs'),
];

for (const filePath of requiredFiles) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Build failure: Required file missing: ${path.relative(rootDir, filePath)}`);
    process.exit(1);
  }
  const stat = fs.statSync(filePath);
  if (stat.size === 0) {
    console.error(`❌ Build failure: File is empty: ${path.relative(rootDir, filePath)}`);
    process.exit(1);
  }
}

const assetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.error('❌ Build failure: dist/assets directory does not exist!');
  process.exit(1);
}

const assetFiles = fs.readdirSync(assetsDir);
if (assetFiles.length === 0) {
  console.error('❌ Build failure: dist/assets directory is empty!');
  process.exit(1);
}

const jsBundles = assetFiles.filter(f => f.endsWith('.js'));
const cssBundles = assetFiles.filter(f => f.endsWith('.css'));

if (jsBundles.length === 0) {
  console.error('❌ Build failure: No JavaScript bundles found in dist/assets!');
  process.exit(1);
}

console.log(`✅ Build output verified successfully!`);
console.log(`   - dist/index.html (${fs.statSync(path.join(distDir, 'index.html')).size} bytes)`);
console.log(`   - dist/server.cjs (${fs.statSync(path.join(distDir, 'server.cjs')).size} bytes)`);
console.log(`   - Assets: ${assetFiles.length} files (${jsBundles.length} JS bundles, ${cssBundles.length} CSS bundles)`);
process.exit(0);
