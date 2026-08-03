---
kind: build_system
name: Vite + esbuild Monorepo Build Pipeline
category: build_system
scope:
    - '**'
source_files:
    - package.json
    - vite.config.ts
    - tsconfig.json
    - server.ts
    - index.ts
    - replit.nix
    - scripts/setup-env.js
---

The project uses a Vite-based build system for the React frontend and esbuild for bundling the Express backend, orchestrated through npm scripts in package.json. There is no Dockerfile, Makefile, or CI pipeline present in this snapshot.

**Build toolchain**
- Frontend: Vite 6 with @vitejs/plugin-react and Tailwind CSS v4 via @tailwindcss/vite. The Vite config (vite.config.ts) sets up React, Tailwind, an `@` path alias resolving to the repo root, and conditional HMR/watch behavior controlled by the `DISABLE_HMR` environment variable.
- Backend: A single-file Express server (`server.ts`) is bundled with esbuild into a CommonJS bundle (`dist/server.cjs`) using `--bundle --platform=node --format=cjs --packages=external --sourcemap`. The dev server runs directly via `tsx server.ts`.
- TypeScript: Compiled in place with `tsc --noEmit` for type-checking only; actual compilation is delegated to Vite (frontend) and esbuild (backend).

**npm scripts and lifecycle**
- `setup:env` runs `scripts/setup-env.js`, which interactively generates a `.env` file from `.env.example`, pulling values from existing `.env`, system environment, or prompting for missing keys.
- `predev` automatically invokes `setup:env` before `dev`, ensuring credentials are present at startup.
- `dev` launches the Express server with tsx for hot-reloading during development.
- `build` runs `vite build` (producing static assets under `dist/`) followed by `esbuild server.ts ... --outfile=dist/server.cjs`.
- `start` executes `node dist/server.cjs`.
- `clean` removes `dist/` and `server.js`.
- `lint` runs `tsc --noEmit`.

**Deployment targets**
- `index.ts` is a Vercel serverless entry point that imports `server.ts`, runs idempotent DB initialization (`initUsersTable`, `initChatbotLeadsTable`, `initSantiTables`), and exports the Express app as the handler.
- `replit.nix` declares system dependencies (`psmisc`, `mysql80`, `unzip`) for the Replit environment.
- No Dockerfile, docker-compose, GitHub Actions, or other CI/CD manifests were found in this repository snapshot.

**Conventions and constraints**
- All configuration is driven by environment variables loaded via `dotenv`; there is no config file format for runtime settings.
- The `@/*` path alias maps to the repository root, used consistently across both frontend and backend imports.
- Development HMR can be disabled via `DISABLE_HMR=true` to reduce CPU usage during AI agent edits.
- Production builds output to `dist/` with source maps enabled for debugging.
- The backend is bundled as a single CJS artifact suitable for Node.js execution or serverless platforms like Vercel.