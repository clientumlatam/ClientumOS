# 🔌 Guía de Integraciones con APIs de Terceros & Capas Gratuitas (Free Tier)

Este documento detalla el funcionamiento técnico, flujos de autenticación, endpoints y estrategias para operar todas las APIs de terceros de **Clientum Latam** utilizando sus **planes y capas gratuitas permanentes (*Free Tier*)** sin costos ocultos.

---

## 1. 🤖 Google Gemini AI (`@google/genai`)

### Funcionamiento Técnico
El backend y frontend de Clientum utilizan el SDK oficial `@google/genai` para interactuar con los modelos **Gemini 2.0 Flash** y **Gemini 2.0 Pro**. La IA asiste en:
- Calificación y scoring de oportunidades bajo la metodología **MEDDIC**.
- Generación de mensajes persuasivos y secuencias de prospección para WhatsApp y correo.
- Sugerencias automáticas de respuestas en la bandeja de entrada unificada.
- Extracción de entidades y resumen de conversaciones.

### Guía de Uso del Plan Gratuito (Google AI Studio)
1. Ingresar a [Google AI Studio](https://aistudio.google.com).
2. Crear un proyecto o iniciar sesión con una cuenta de Google.
3. Hacer clic en **"Get API Key"** y generar una clave de API.
4. **Límites Gratuitos**:
   - `gemini-2.0-flash`: Hasta **15 solicitudes por minuto (RPM)** y **1 millón de tokens por minuto (TPM)** sin costo en desarrollo.
   - `gemini-2.0-pro`: Hasta **2 RPM** en el nivel gratuito.
5. **Configuración en `.env`**:
   ```env
   GEMINI_API_KEY=AIzaSy...
   ```
6. **Fallback Gratuito (Groq Cloud)**:
   Si se requiere alta concurrencia sin costo, se puede utilizar Groq Cloud (`https://console.groq.com`) que otorga **hasta 14,400 solicitudes diarias gratuitas** en modelos Llama 3.3.

---

## 2. 💬 Meta WhatsApp Cloud API & Gateway Baileys

### Funcionamiento Técnico
Clientum implementa una arquitectura híbrida de mensajería:
- **Modo Sandbox / Meta Cloud API**: Se conecta directamente a la API oficial de Meta Graph API (`v18.0+`) mediante webhooks seguros para recibir y enviar mensajes con plantillas preaprobadas.
- **Modo Gateway Baileys (Conexión QR)**: Permite vincular números de WhatsApp estándar o WhatsApp Business existentes mediante un escaneo de código QR en pantalla.

### Guía de Uso del Plan Gratuito (Meta for Developers)
1. Registrarse en [Meta for Developers](https://developers.facebook.com) con una cuenta de Facebook.
2. Crear una aplicación empresarial (*Type: Business*) y añadir el producto **WhatsApp**.
3. En la sección *API Setup*, Meta otorga:
   - Un **número de prueba Sandbox** gratuito.
   - Un **Token de acceso de prueba** (válido por 24h, o generable como System User Token permanente).
   - **1,000 conversaciones de servicio gratuitas cada mes** por cuenta de WhatsApp Business.
4. Configurar el Webhook en Meta apuntando a la URL pública del backend:
   - **URL de callback**: `https://tu-dominio.com/api/whatsapp/webhook`
   - **Token de verificación**: El valor configurado en `META_WA_VERIFY_TOKEN`.
5. **Configuración en `.env`**:
   ```env
   META_WA_ACCESS_TOKEN=EAAG...
   META_WA_APP_SECRET=tu_app_secret
   META_WA_BUSINESS_ACCOUNT_ID=100012345678901
   META_WA_PHONE_NUMBER_ID=100098765432109
   META_WA_VERIFY_TOKEN=mi_token_de_verificacion_webhook_custom
   ```

---

## 3. 🔥 Firebase Authentication & Firestore (Google Cloud)

### Funcionamiento Técnico
Firebase se utiliza en la capa del cliente para:
- Inicio de sesión con un clic mediante Google OAuth SSO (`signInWithPopup`).
- Registro tradicional por correo y contraseña con verificación por email.
- Flujo de recuperación de contraseñas seguras (`sendPasswordResetEmail`).
- Almacenamiento seguro de metadatos de usuario y sincronización de estado.

### Guía de Uso del Plan Gratuito (Firebase Spark Plan)
1. Crear un proyecto en la [Consola de Firebase](https://console.firebase.google.com).
2. Habilitar **Authentication** y activar los proveedores **Email/Password** y **Google**.
3. Registrar una aplicación Web para obtener las credenciales públicas del SDK.
4. **Límites Gratuitos (Plan Spark 100% Free)**:
   - Autenticación ilimitada para usuarios por Email/Contraseña y proveedores OAuth (Google).
   - Hasta 50,000 lecturas y 20,000 escrituras diarias en Firestore.
5. **Configuración en `.env`**:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=tu-app.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tu-app
   VITE_FIREBASE_STORAGE_BUCKET=tu-app.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:a1b2c3d4e5f6g7h8
   ```

---

## 4. 🕷️ Apify (Scraping y Enriquecimiento de Prospectos)

### Funcionamiento Técnico
El módulo de prospección comercial (`apps/api` y `packages/agents`) utiliza Apify para extraer datos públicos de empresas, comercios y decisores:
- Búsqueda masiva en Google Maps por palabra clave y región geográfica.
- Extracción de números de teléfono, correos de contacto, URLs de sitios web y reseñas.
- Normalización automática e importación a la base de contactos de Clientum.

### Guía de Uso del Plan Gratuito
1. Crear una cuenta en [Apify.com](https://apify.com).
2. Obtener el token personal de API en `Settings > Integrations > API Token`.
3. **Límites Gratuitos**:
   - **$5 USD mensuales en créditos de cómputo gratuitos recurrentes**.
   - Permite extraer miles de registros de Google Maps por mes sin costo adicional.
4. **Configuración en `.env`**:
   ```env
   APIFY_API_TOKEN=apify_api_1234567890abcdef
   ```

---

## 5. 🎯 Hunter.io (Búsqueda y Verificación de Emails B2B)

### Funcionamiento Técnico
Hunter.io se utiliza en el pipeline de ventas para:
- Búsqueda de correos electrónicos a partir del dominio corporativo de una empresa (`Domain Search`).
- Verificación del estado de entrega de un correo (`Email Verifier`) para reducir la tasa de rebote (*bounce rate*).
- Detección de patrones de email (ej: `{first}.{last}@empresa.com`).

### Guía de Uso del Plan Gratuito
1. Registrarse en [Hunter.io](https://hunter.io).
2. Ir a `API > API Keys` y copiar la clave generada.
3. **Límites Gratuitos**:
   - **25 búsquedas y 50 verificaciones de correo gratuitas cada mes**.
4. **Configuración en `.env`**:
   ```env
   HUNTER_API_KEY=hunter_key_1234567890abcdef
   ```

---

## 6. 📧 Servicios de Email Transaccional (SMTP)

| Proveedor | Cuota Gratuita Permanente | Configuración de Servidor |
| :--- | :--- | :--- |
| **Brevo (Recomendado)** | **300 emails/día** (9,000/mes) | Host: `smtp-relay.brevo.com` \| Puerto: `587` \| SSL: `false` |
| **Resend** | **3,000 emails/mes** (100/día) | Host: `smtp.resend.com` \| Puerto: `465` \| SSL: `true` |
| **Gmail SMTP** | **500 emails/día** (con App Passwords) | Host: `smtp.gmail.com` \| Puerto: `465` \| SSL: `true` |

---

## 7. 🗄️ Base de Datos Serverless (Neon PostgreSQL)

### Funcionamiento Técnico
Neon provee la base de datos relacional PostgreSQL con soporte para conexiones seguras (`sslmode=require`) y pooling de alto rendimiento (`pgPool`).

### Guía de Uso del Plan Gratuito
1. Crear una cuenta en [Neon.tech](https://neon.tech).
2. Crear un nuevo proyecto PostgreSQL.
3. Copiar la cadena de conexión con SSL activado.
4. **Límites Gratuitos**:
   - **0.5 GB de almacenamiento SSD permanente**.
   - Cómputo serverless con escala automática a cero cuando está inactivo.
5. **Configuración en `.env`**:
   ```env
   DATABASE_URL=postgresql://neondb_owner:password@ep-ejemplo.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

---

&copy; 2026 Clientum Latam. Todos los derechos reservados.
