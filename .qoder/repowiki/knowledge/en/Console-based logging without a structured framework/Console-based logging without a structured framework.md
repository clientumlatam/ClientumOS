---
kind: logging_system
name: Console-based logging without a structured framework
category: logging_system
scope:
    - '**'
source_files:
    - server.ts
    - index.ts
    - package.json
    - scripts/doctor.mjs
    - scripts/pull-secrets.mjs
    - scripts/generate-env.mjs
---

The application does not use a dedicated logging library or framework. All server-side output is produced through Node.js's built-in `console` methods (`console.log`, `console.warn`, `console.error`) scattered directly throughout the Express server code in `server.ts`. There is no centralized logger module, no log-level configuration, no structured JSON log format, and no external sinks (file, syslog, cloud logging). The only logging-related dependency is `dotenv` for environment loading; no packages such as winston, pino, bunyan, morgan, signale, or debug are present in `package.json`.

**Where logging occurs**
- `server.ts`: Every route handler, middleware, and helper uses inline `console.log`/`console.warn`/`console.error` calls. Messages are tagged with bracketed prefixes like `[Database]`, `[Session]`, `[NeonAuth]`, `[Auth]`, `[Gemini Request]`, `[Mock pgPool]`, etc., to distinguish subsystems at a glance.
- Scripts under `scripts/` (`doctor.mjs`, `generate-env.mjs`, `pull-secrets.mjs`, `setup-check.mjs`, `sync-secrets.mjs`) also rely on `console.log` for human-readable CLI output.
- Frontend React components under `src/` do not appear to emit any console output based on the search results.

**Conventions observed**
- Tagged message prefixes: each `console.*` call starts with a bracketed namespace (e.g. `[Session]`, `[NeonAuth]`, `[Auth]`, `[Gemini Fallback]`) so that grep/search can filter by subsystem.
- Error paths consistently use `console.error` and return an HTTP error response; informational/debug traces use `console.log`; configuration warnings use `console.warn`.
- No attempt is made to redact secrets or sensitive data from log output — raw query values, tokens, and body fragments are sometimes logged.

**Constraints and enforcement**
- There is no enforced convention via lint rules, TypeScript configuration, or CI checks; the pattern is purely ad hoc and developer-driven.
- Because there is no logger abstraction, adding structured fields, log levels, or rotating file sinks would require refactoring every call site.
- The Vercel serverless entry point (`index.ts`) simply re-exports the Express app from `server.ts`; it does not configure any transport or log formatter.