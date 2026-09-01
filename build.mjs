import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

console.log('🚀 Starting robust build orchestration...');

try {
  // 1. Clean dist
  if (fs.existsSync(distPath)) {
    console.log('🧹 Cleaning existing dist directory...');
    fs.rmSync(distPath, { recursive: true, force: true });
  }

  // 2. Build via Turbo (builds apps/landing, apps/dashboard, apps/api)
  console.log('📦 Building workspaces with Turbo...');
  execSync('npx turbo build', { stdio: 'inherit', cwd: __dirname });

  // 3. Create dist directory
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

  // 4. Bundle into a single dist output
  console.log('🧩 Merging app outputs into a single dist directory...');
  
  // The 'landing' app actually bundles the 'dashboard' code via aliases 
  // and acts as the unified frontend SPA.
  const landingDist = path.join(__dirname, 'apps/landing/dist');
  if (fs.existsSync(landingDist)) {
    console.log('➡️ Copying unified frontend (Landing + Dashboard) to dist...');
    fs.cpSync(landingDist, distPath, { recursive: true });
  } else {
    throw new Error('Landing build output not found!');
  }

  // 5. Build the API server to server.cjs
  console.log('⚙️ Compiling API Server (server.cjs)...');
  const esbuildCmd = `npx esbuild apps/api/src/index.ts --bundle --platform=node --target=node20 --outfile=dist/server.cjs --external:express --external:pg --external:dotenv --external:bcryptjs --external:cors --external:express-session --external:connect-pg-simple --external:nodemailer --external:web-push --external:@google/genai --external:vite`;
  execSync(esbuildCmd, { stdio: 'inherit', cwd: __dirname });

  console.log('✅ Build orchestration complete!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
