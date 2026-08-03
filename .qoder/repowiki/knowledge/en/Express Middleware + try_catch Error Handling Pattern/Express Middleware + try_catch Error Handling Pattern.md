---
kind: error_handling
name: Express Middleware + try/catch Error Handling Pattern
category: error_handling
scope:
    - '**'
source_files:
    - server.ts
    - api/index.ts
    - src/components/AuthGate.tsx
    - src/components/AuthButton.tsx
    - src/App.tsx
---

The Clientum dashboard uses a straightforward, inline error-handling pattern centered around Express middleware and per-route try/catch blocks rather than a centralized error class hierarchy or global error handler.

**Server-side (Express)**
- Authentication and authorization are enforced via three small middleware functions defined in `server.ts`: `requireAuth` (401 when no session), `requireAdmin` (403 when role ≠ admin, re-checks the DB on every request), and `requireApiKey` / `requireCrmToken` for server-to-server auth. Each returns `{ error: "..." }` JSON with an appropriate HTTP status and never calls `next()` on failure.
- Every route handler wraps its body in `try { ... } catch (error) { console.error(...); return res.status(500).json({ error: "..." }) }`. Validation errors return 400/409 responses with Spanish-language messages; unexpected failures log to `console.error` and return 500.
- External calls (PostgreSQL via `pg`, Gmail SMTP via nodemailer, Neon Auth REST API, Google Gemini SDK) are wrapped in try/catch blocks that translate library exceptions into user-facing JSON `{ error }` responses. The Gemini integration includes a retry-and-fallback loop (`generateContentWithFallback`) that handles 429/503 transient errors by trying alternate models before returning a structured local fallback.
- Session creation is abstracted through a `createSession` helper that wraps `req.session.regenerate`/`save` in a Promise with a 5-second timeout guard so the response is always sent even if the session store hangs.
- There is no global Express error-handling middleware (`app.use((err, req, res, next) => ...)`) — errors are handled at the call site of each route.

**Frontend (React)**
- Components use `fetch` with `.catch(err => setError(err.message))` patterns. `src/components/AuthGate.tsx` and `src/components/AuthButton.tsx` both maintain a local `error` state string, display it in a red-bordered div, and set `loading` during requests.
- Network failures are logged with `console.warn`/`console.error` and surfaced as user-friendly messages derived from the server's `{ error }` payload. There is no global React error boundary or centralized error interceptor.
- The root `App.tsx` fetches `/api/auth/me` on mount and silently falls back to `currentUser = null` on failure.

**Conventions observed**
- All API error responses follow the shape `{ error: string }` with HTTP status codes indicating the failure category (400 validation, 401 unauthorized, 403 forbidden, 409 conflict, 500 server error, 503 misconfiguration).
- User-facing messages are written in Spanish; internal logs use English or mixed language.
- No custom error classes, sentinel values, or `throw new AppError(...)` pattern exists — errors are plain `Error` objects or caught network/response statuses.
- Frontend components do not propagate errors upward; each component handles its own errors locally.