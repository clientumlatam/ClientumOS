# 🚢 Guía de Despliegue en Producción (Clientum Latam Suite)

Esta guía explica cómo desplegar la plataforma **Clientum Latam** en entornos de producción modernos como Google Cloud Run, contenedores Docker, Render o servidores VPS con Nginx y SSL.

---

## 1. ☁️ Despliegue en Google Cloud Run

Google Cloud Run es la plataforma recomendada por su capacidad de escalar a cero y compatibilidad nativa con contenedores.

### Pasos:
1. Asegurar que el puerto de escucha sea el `3000` (puerto estándar de la plataforma).
2. Construir la imagen del contenedor:
   ```bash
   gcloud builds submit --tag gcr.io/tu-proyecto/clientum-suite
   ```
3. Desplegar el servicio:
   ```bash
   gcloud run deploy clientum-suite \
     --image gcr.io/tu-proyecto/clientum-suite \
     --platform managed \
     --region us-east1 \
     --allow-unauthenticated \
     --set-env-vars APP_URL=https://tu-dominio.com,NODE_ENV=production
   ```

---

## 2. 🐳 Despliegue con Docker

### Ejemplo de `Dockerfile` Multi-Stage:
```dockerfile
# Etapa 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json turbo.json ./
COPY apps/ ./apps/
COPY packages/ ./packages/
RUN npm ci
RUN npm run build

# Etapa 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install express pg dotenv bcryptjs cors express-session connect-pg-simple nodemailer web-push @google/genai
EXPOSE 3000
CMD [\"node\", \"dist/server.cjs\"]
```

---

## 3. 🌐 Configuración de Nginx & Proxy Inverso

Para servidores VPS (Ubuntu / Debian) con Nginx y certificado SSL de Let's Encrypt:

```nginx
server {
    listen 80;
    server_name crm.tuempresa.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name crm.tuempresa.com;

    ssl_certificate /etc/letsencrypt/live/crm.tuempresa.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/crm.tuempresa.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000; # Apunta al servidor Express (server.cjs)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 4. 🛡️ Checklist Previo al Lanzamiento

- [ ] Todas las variables de entorno en producción están cargadas sin exponer contraseñas en el repositorio.
- [ ] La base de datos en Neon / Supabase tiene activado `sslmode=require`.
- [ ] El dominio corporativo tiene registros SPF y DKIM configurados para evitar que los correos transaccionales caigan en spam.
- [ ] Las URLs de retorno de OAuth en Google Cloud Console coinciden con el dominio final en producción.
- [ ] El Webhook de WhatsApp de Meta tiene configurada la URL HTTPS pública y el token de verificación.

---

&copy; 2026 Clientum Latam. Todos los derechos reservados.
