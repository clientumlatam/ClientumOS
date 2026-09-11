# ClientumCRM

## Run

- Development: `npm run dev`
- Production build: `npm run build`
- Production server: `npm start`

The Express server hosts the Vite React app and listens on `PORT` (default `5000`), which is compatible with Replit Preview.

## Optional external services

- Firebase configuration is already included by the imported project for authentication.
- Add `GEMINI_API_KEY` as a Replit Secret to enable AI copilot endpoints. The rest of the CRM can start without it; AI requests return an explicit configuration error until it is added.