---
name: neon-vercel-deploy
description: Deploy a web project to Vercel with Neon serverless Postgres database integration. Provisions or connects a Neon database, configures DATABASE_URL and other environment variables in Vercel, then builds and deploys. Use when the user wants to deploy with Neon, set up serverless Postgres for Vercel, or do a full-stack deployment with a database.
---

# Neon + Vercel Deploy

One-click deployment to Vercel with Neon serverless Postgres integration.

## Prerequisites

- A **Vercel account** (OAuth login will be triggered if not authenticated)
- A **Neon account** (free tier at https://neon.tech)
- **Node.js** installed
- Project must have a valid build configuration

## Workflow

### Step 1: Install Neon CLI

Check if the Neon CLI is available. If not, install it:

```bash
# Check
neon --version

# Install via npm (cross-platform)
npm install -g @neondatabase/cli

# Or via brew on macOS
brew install neonctl
```

### Step 2: Authenticate with Neon

```bash
neon auth
```

This opens a browser for OAuth login. If already authenticated, skip this step.

### Step 3: Create or Select a Neon Project

**New project:**
```bash
neon projects create --name "my-project-db"
```

**List existing projects:**
```bash
neon projects list
```

**Select project:**
```bash
neon set project <project-id>
```

### Step 4: Get the Connection String

```bash
neon connection-string --project-id <project-id> --branch-id main
```

The output is a connection string like:
```
postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
```

Save this value for `DATABASE_URL`.

### Step 5: Install Vercel CLI (if needed)

```bash
npx vercel --version
```

If not installed, use `npx vercel` directly (no global install required).

### Step 6: Deploy to Vercel with Environment Variables

Set environment variables during deployment:

```bash
# Set DATABASE_URL in Vercel
npx vercel env add DATABASE_URL production
# Paste the Neon connection string when prompted

# Deploy with all required env vars
npx vercel --prod
```

**Non-interactive alternative** — create a `.env.production` file or use the Vercel dashboard to set:
- `DATABASE_URL` (from Neon connection string)
- Any other env vars from the project's `.env.example`

### Step 7: Verify Deployment

1. Open the Vercel deployment URL
2. Confirm the app connects to Neon (check database-dependent pages)
3. If errors occur, check Vercel logs: `npx vercel logs <deployment-url>`

## Environment Variable Mapping

This project uses the following env vars (from `.env.example`):

| Variable | Source | Required |
|----------|--------|----------|
| `DATABASE_URL` | Neon connection string | Yes |
| `APP_URL` | Vercel deployment URL | Yes |
| `GEMINI_API_KEY` | Google AI Studio | Yes |
| `SESSION_SECRET` | Generate random string | Yes |
| `CRM_INTERNAL_TOKEN` | User-provided | Optional |
| `SMTP_USER` / `SMTP_PASS` | Email provider | Optional |
| `APIFY_API_TOKEN` | Apify dashboard | Optional |
| `GOOGLE_API_KEY` | Google Cloud Console | Optional |

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Neon auth fails | Run `neon auth --force` to re-authenticate |
| Connection string missing `?sslmode=require` | Append it manually; Neon requires SSL |
| Vercel build fails on `DATABASE_URL` | Ensure the env var is set for both preview and production in Vercel dashboard |
| Cold start timeouts | Neon free tier pauses after inactivity; upgrade or use keep-alive pings |
| Migration needed | Run migrations against Neon: `neon sql --file migrations.sql` or via your ORM |

## Notes

- Neon's serverless driver (`@neondatabase/serverless`) can replace `pg` for edge-compatible queries
- For Vercel Edge Functions, use the Neon serverless HTTP driver instead of raw TCP connections
- The Neon free tier includes 0.5 GiB storage and auto-pause after 5 minutes of inactivity
