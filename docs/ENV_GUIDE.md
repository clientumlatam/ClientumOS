# 🔑 Guía Completa de Configuración de Entorno & Free Tiers

Esta guía detalla paso a paso cómo obtener y configurar las variables de entorno para **Clientum Latam**, priorizando opciones con **capas gratuitas perpetuas (*Free Tier*)** sin necesidad obligatoria de tarjeta de crédito.

---

## 1. 🗄️ Base de Datos (PostgreSQL Serverless)

### Opción Recomendada: Neon Database (Gratis)
- **Proveedor**: [Neon.tech](https://neon.tech)
- **Beneficio**: 0.5 GB de almacenamiento SSD, cómputo escalable a cero y branching de base de datos gratuito.
- **Variables**:
  ```env
  DATABASE_URL=postgresql://neondb_owner:tu_password@ep-ejemplo.us-east-1.aws.neon.tech/neondb?sslmode=require
  NEON_DATABASE_URL=postgresql://neondb_owner:tu_password@ep-ejemplo.us-east-1.aws.neon.tech/neondb?sslmode=require
  ```

### Alternativas Gratuitas:
- **Supabase**: 500 MB gratis con soporte PostgreSQL.
- **Render PostgreSQL**: Base de datos gratuita para entornos de prueba.

---

## 2. 🤖 Inteligencia Artificial & Modelos LLM

### Opción 1: Google AI Studio (Gratis)
- **Proveedor**: [Google AI Studio](https://aistudio.google.com)
- **Beneficio**: Acceso a Gemini 2.0 Flash / Pro con límites generosos de solicitudes por minuto en modo desarrollo.
- **Variables**:
  ```env
  GEMINI_API_KEY=AIzaSy...
  GEMINI_API_KEY_V2=AIzaSy...
  ```

### Opción 2: Groq Cloud (Fallback Gratuito)
- **Proveedor**: [Groq Console](https://console.groq.com)
- **Beneficio**: Hasta 14,400 peticiones diarias gratuitas con ultra baja latencia para modelos Llama 3 / Mixtral.

---

## 3. 📧 Correo Transaccional & SMTP (Bienvenidas, Reset de Clave)

### Opción 1: Gmail SMTP con Contraseña de Aplicación (Gratis)
1. Activar la *Verificación en 2 pasos* en tu cuenta de Google.
2. Ir a `Seguridad > Contraseñas de aplicaciones` y generar una nueva contraseña de 16 caracteres.
3. **Variables**:
   ```env
   SMTP_USER=tu-correo@gmail.com
   SMTP_PASS=xxxx-xxxx-xxxx-xxxx
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   ```

### Opción 2: Brevo (Antes Sendinblue) (Gratis)
- **Beneficio**: 300 correos diarios gratis (9,000 al mes) mediante SMTP Relay sin vencimiento.
- **Configuración**:
  ```env
  SMTP_USER=tu_email_de_login_brevo
  SMTP_PASS=tu_clave_smtp_master_brevo
  SMTP_HOST=smtp-relay.brevo.com
  SMTP_PORT=587
  SMTP_SECURE=false
  ```

### Opción 3: Resend (Gratis)
- **Beneficio**: 3,000 correos al mes (100 diarios) con excelente entregabilidad.

---

## 4. 🗺️ Mapas, Prospección & Geocodificación

### Opción 1: Google Maps Platform ($200 USD de Crédito Mensual)
- **Proveedor**: [Google Cloud Console](https://console.cloud.google.com)
- **Beneficio**: Crédito mensual recurrente que cubre miles de búsquedas en Places API y JavaScript Maps.
- **Variables**:
  ```env
  GOOGLE_MAPS_API_KEY=AIzaSy...
  ```

### Opción 2: Leaflet + OpenStreetMap + OpenRouteService (100% Libre y Gratis)
- **Beneficio**: Cero costo, sin claves de API obligatorias para la visualización básica y hasta 8,000 peticiones diarias en OpenRouteService.

### Opción 3: Mapbox (Gratis)
- **Beneficio**: 50,000 cargas de mapa al mes en su plan Starter gratuito.

---

## 5. 💬 WhatsApp Meta Cloud API

### Modo Sandbox para Desarrolladores (Gratis)
1. Registrarse en [Meta for Developers](https://developers.facebook.com).
2. Crear una aplicación de tipo *Business* y agregar el producto **WhatsApp**.
3. Obtener el número de prueba de Sandbox y el token de acceso temporal.
4. **Variables**:
   ```env
   META_WA_ACCESS_TOKEN=EAAG...
   META_WA_APP_SECRET=tu_app_secret
   META_WA_BUSINESS_ACCOUNT_ID=100012345678901
   META_WA_PHONE_NUMBER_ID=100098765432109
   META_WA_VERIFY_TOKEN=tu_token_custom_para_webhook
   ```

---

## 6. 🔔 Notificaciones Push Web (VAPID)

Genera tus claves VAPID directamente en tu terminal sin costo:
```bash
npx web-push generate-vapid-keys
```
Y añade los resultados a tu `.env`:
```env
VAPID_PUBLIC_KEY=BExamplePublicKey...
VAPID_PRIVATE_KEY=ExamplePrivateKey...
```

---

## 7. 🔐 Generación de Secretos Criptográficos

Para `BETTER_AUTH_SEC`, `SESSION_SECRET` y `CRON_SECRET`:
```bash
openssl rand -hex 32
```

---

&copy; 2026 Clientum Latam. Todos los derechos reservados.
