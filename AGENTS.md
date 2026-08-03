# AGENTS.md — Clientum CRM

> AI agent routing guide. Use this file to identify the correct owner module, context boundaries, and risk areas before making changes.

## Architecture Overview

Clientum CRM is a full-stack marketing and sales platform for LATAM businesses. It uses:

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4 + Vite 6
- **Backend**: Express 4 (server.ts) + PostgreSQL (pg)
- **AI**: Google Gemini (`@google/genai`) + MR Multi-Model Router (`src/lib/ai-router.ts`)
- **Auth**: Express-session + bcrypt + optional Supabase Auth
- **Database**: PostgreSQL via `pg` Pool (or mock when `DATABASE_URL` is unset)
- **Deployment**: Vercel serverless (`index.ts` entry) or standalone Node (`server.ts`)

## Module Map

### Core (high risk — changes affect many features)

| Module | Responsibility | Lines |
|---|---|---|
| `server.ts` | Express server, all API routes, auth, DB pool, session, AI proxy, email | ~5200 |
| `index.ts` | Vercel serverless entry — imports `app` from server.ts, runs DB init | 20 |
| `src/lib/AuthContext.tsx` | Shared React auth state (`AuthProvider`, `useAuth` hook) | 77 |
| `src/lib/ai-router.ts` | Multi-provider AI router (Gemini / MR Router / auto-fallback) | 190 |
| `src/App.tsx` | Main app shell, tab routing, layout | ~145 |

### Frontend Components

| Directory | Responsibility |
|---|---|
| `src/components/` | 46 tab components (17 implemented, 29 stubs) |
| `src/components/crm-full/` | Full CRM module (AgentOS, CMDB, Config) |
| `src/components/ia/` | AI-specific UI components |
| `src/components/ui/` | Shared UI primitives (Button, Card, etc.) |
| `src/components/shared/` | Cross-feature shared components |

### AI Agents

| Module | Responsibility |
|---|---|
| `src/agents/base.ts` | BaseAgent abstract class with LLM integration |
| `src/agents/orchestrator.ts` | OrchestratorAgent — plans and delegates tasks |
| `src/agents/prospector.ts` | ProspectorAgent — finds business leads |
| `src/agents/enricher.ts` | EnricherAgent — enriches lead data |
| `src/agents/types.ts` | Shared agent type definitions |

### Infrastructure

| Module | Responsibility |
|---|---|
| `src/lib/supabase.ts` | Supabase client (null if env vars not set) |
| `src/lib/googleAuth.ts` | Google OAuth helpers |
| `scripts/doctor.mjs` | Health check — verifies service connectivity |
| `scripts/setup-env.js` | Environment setup (pre-dev hook) |
| `scripts/setup-check.mjs` | Pre-flight configuration checker |

## Owner Routes (where to go for common tasks)

| Task | Owner Module |
|---|---|
| Add/change an API endpoint | `server.ts` — search for `app.post`/`app.get` |
| Change authentication logic | `server.ts` (routes `/api/auth/*`) + `src/lib/AuthContext.tsx` |
| Modify AI/Gemini integration | `server.ts` (search `getAI`, `generateContent`) or `src/lib/ai-router.ts` |
| Add a new tab/page | `src/App.tsx` (add to `ActiveTab` union in `src/types.ts`) + create component in `src/components/` |
| Change database queries | `server.ts` (search `pgPool.query`) |
| Modify CRM data models | `src/types.ts` (interfaces) + `src/components/crm-full/` |
| Change agent orchestration | `src/agents/orchestrator.ts` |
| Update deployment config | `index.ts` (Vercel) + `vite.config.ts` (build) |

## Context Boundaries & Risks

### High-risk areas
- **`server.ts`** is a monolith (~5200 lines). Changes in one section can affect unrelated features. Always search for related route handlers before editing.
- **Database queries** use raw SQL strings in `pgPool.query()` calls. Schema changes require updating all affected queries.
- **AI API keys** are sensitive — never commit `.env` values. Use `.env.example` as template.

### Auth boundary
- Auth state flows through `AuthProvider` (in `main.tsx`) → `useAuth()` hook.
- Server-side auth uses `express-session` with PostgreSQL store (or MemoryStore fallback).
- The `auth-changed` window event synchronizes auth state across components.

### AI provider boundary
- Default provider: Google Gemini via `GEMINI_API_KEY`.
- Multi-provider router: `src/lib/ai-router.ts` — controlled by `AI_PROVIDER` env var.
- AI proxy endpoints: `POST /api/agent/ai/gemini` (direct) and `POST /api/agent/ai/multi` (router).

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server (Express + Vite HMR) |
| `npm run build` | Production build (Vite frontend + esbuild server) |
| `npm start` | Run production server |
| `npm run lint` | TypeScript type-check (`tsc --noEmit`) |
| `npm run setup:env` | Generate `.env` from secrets |
| `node scripts/doctor.mjs` | Health check — verify DB, SMTP, API keys |
| `node scripts/setup-check.mjs` | Pre-flight configuration checker |

## Key Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Yes (mock fallback if absent) |
| `GEMINI_API_KEY` | Google Gemini AI access | For AI features |
| `SESSION_SECRET` | Express session encryption | Yes |
| `AI_PROVIDER` | AI router mode: `gemini` / `mr-router` / `auto` | No (default: gemini) |
| `MR_ROUTER_ENDPOINT` | MR Multi-Model Router API URL | For MR Router |
| `MR_ROUTER_API_KEY` | MR Router auth token | For MR Router |
| `SMTP_USER` / `SMTP_PASS` | Email sending credentials | For email features |
| `APIFY_API_TOKEN` | Apify web scraping | For prospecting |

## Skills Configured

| Skill | Path | Trigger |
|---|---|---|
| neon-vercel-deploy | `.qoder/skills/neon-vercel-deploy/SKILL.md` | Deploy to Vercel with Neon DB |
| supabase | `.agents/skills/supabase/SKILL.md` | Supabase operations |
| supabase-postgres-best-practices | `.agents/skills/supabase-postgres-best-practices/SKILL.md` | Postgres schema/query work |
