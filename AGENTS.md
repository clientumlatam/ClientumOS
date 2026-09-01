# Base44 Development Notes

- Run the full-stack development server with `docker compose -f docker-compose.base44.yml up -d`; the Express API embeds Vite middleware and exposes both API and landing UI on port 3000.
- PostgreSQL and third-party credentials are optional for startup. Without `DATABASE_URL`, the API intentionally uses its in-memory mock pool; integrations such as Gemini, SMTP, Maps, Apify, Hunter, Firebase, and WhatsApp remain unconfigured until their credentials are supplied.
- Verify the app with `curl -fsS http://localhost:3000/` and confirm live source serving with `curl -fsS http://localhost:3000/src/main.tsx`.
- The first container start runs `npm ci` into the persistent `node_modules` volume and can take about a minute. Subsequent source edits are picked up by the API/Vite development watchers.
