# Clientum Webmail — Cloudflare Worker Serverless (100% Free)

Servidor de correo webmail serverless para **matias@clientum.com.ar**, impulsado por **Cloudflare Workers**, **Cloudflare D1 (SQLite)**, **Email Routing** y el binding **Send_Email**.

## 🚀 Características
- **Dominio Activo**: `https://webmail.clientum.com.ar`
- **Costo**: $0 / mes (100% Free Legítimo Comercial bajo Cloudflare Workers Free Tier)
- **Persistencia**: Cloudflare D1 SQLite de 5GB de almacenamiento
- **Latencia**: <15ms servido desde el Edge de Cloudflare
- **Seguridad**: Autenticación por Bearer Token (`WEBMAIL_PASSWORD`), renderizado HTML de correos en `iframe` aislado (`sandbox="allow-same-origin"`)
- **Ingesta de Emails**: Automática mediante Cloudflare Email Routing handler (`email()`) con parser nativo `postal-mime`.

---

## 📦 Comandos de Despliegue (5 Pasos Rápidos)

```bash
# 1. Entrar al directorio del webmail e instalar dependencias
cd webmail-clientum
npm install

# 2. Crear la base de datos D1 en Cloudflare
npx wrangler d1 create webmail-db
# -> Copiar el database_id resultante y pegarlo en wrangler.jsonc (reemplazando REPLACE_WITH_YOUR_D1_DATABASE_ID)

# 3. Ejecutar el esquema SQL en la base remota
npx wrangler d1 execute webmail-db --remote --file=schema.sql

# 4. Establecer la contraseña secreta de acceso al Webmail
npx wrangler secret put WEBMAIL_PASSWORD
# -> Ingrese su contraseña segura cuando la terminal lo solicite

# 5. Desplegar el Worker en Cloudflare
npx wrangler deploy
```

---

## 📬 Configuración de Email Routing en Cloudflare Dashboard

1. Vaya a **Email Routing** en el Dashboard de Cloudflare para `clientum.com.ar`.
2. En **Routing Rules**, cree la siguiente regla:
   - **Custom address**: `matias@clientum.com.ar`
   - **Action**: `Send to a Worker`
   - **Worker**: `webmail-clientum`
3. Guarde los cambios. Todos los correos entrantes se parsearán y guardarán automáticamente en su base D1 en tiempo real.

---

## 🛠️ Endpoints API Mapeados

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/` | Aplicación Webmail SPA embebida |
| `POST` | `/api/auth/login` | Login con contraseña (`WEBMAIL_PASSWORD`) |
| `GET` | `/api/stats` | Contador de correos recibidos, no leídos, destacados y enviados |
| `GET` | `/api/emails` | Listar correos con soporte para filtros (`inbox`, `starred`, `unread`, `archived`) y búsqueda `?q=` |
| `GET` | `/api/emails/:id` | Obtener contenido completo y marcar automáticamente como leído |
| `PATCH` | `/api/emails/:id` | Actualizar estado (`is_starred`, `is_read`, `is_archived`) |
| `DELETE` | `/api/emails/:id` | Eliminar correo permanentemente |
| `GET` | `/api/sent` | Listar correos enviados |
| `POST` | `/api/send` | Enviar correo electrónico saliente vía binding `SEND_EMAIL` |
