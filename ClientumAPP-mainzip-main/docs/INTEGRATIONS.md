# Integraciones y configuración del runtime

Este documento describe únicamente integraciones que el código consume o que
están explícitamente preparadas para conectarse. No es un catálogo de
proveedores ni una promesa de cuotas, precios o planes gratuitos.

## Estado actual

| Integración | Estado | Configuración |
| :--- | :--- | :--- |
| Clerk | Autenticación principal de usuarios | `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY`, `VITE_CLERK_PUBLISHABLE_KEY` |
| Neon PostgreSQL | Persistencia multi-tenant | `NEON_DATABASE_URL` |
| Mercado Pago | Facturación de suscripciones de usuarios de Clientum | `PLATFORM_MERCADOPAGO_ACCESS_TOKEN`, `PLATFORM_MERCADOPAGO_WEBHOOK_SECRET`, `APP_URL` |
| Google Gemini | Capacidad de IA de plataforma | `GEMINI_API_KEY` |
| SMTP/Nodemailer | Activa cuando el SMTP está configurado | `SMTP_*`, `MAIL_FROM_*` |
| Google Places | Prospección B2B server-side | Credencial del workspace `GOOGLE_MAPS_SERVER_API_KEY` |
| Meta WhatsApp Webhook | Parcial: challenge y firma entrante | `WHATSAPP_APP_SECRET`, `WHATSAPP_WEBHOOK_VERIFY_TOKEN` |
| Firebase | Legacy, en proceso de retiro | `VITE_FIREBASE_*` |

La aplicación no usa Firebase Firestore como base de datos del CRM. Las
referencias a Apify, Hunter.io, Resend, SendGrid, Cloudflare API/D1/R2, Slack,
Google Calendar, AFIP, Shopify, n8n, Make, Zapier y PostHog son catálogo o
roadmap; agregar una variable no conecta esos servicios.

## 1. Clerk: autenticación de usuarios

Clerk es la identidad única de la plataforma. El backend valida la sesión con
`@clerk/express` y usa el `userId` de Clerk como propietario de la cuenta y de
los registros de facturación. El frontend debe usar el estado de sesión de
Clerk; no se deben crear sesiones paralelas con Firebase, localStorage o
contraseñas propias.

En producción se monta el proxy de Clerk en:

```text
/api/__clerk
```

El proxy solo se activa en producción. En desarrollo Clerk utiliza su Frontend
API de desarrollo directamente.

### Configuración

Las claves de Clerk administrado por Replit se provisionan desde la
configuración de autenticación del workspace. No se deben copiar al
repositorio, pedir por chat ni exponer en una variable `VITE_*` salvo la clave
pública que el SDK necesita:

```env
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
VITE_CLERK_PUBLISHABLE_KEY=
```

La clave secreta solo se consume en el backend. Las rutas protegidas rechazan
peticiones sin una sesión Clerk válida en producción.

Fuente: [Clerk Auth en Replit](https://docs.replit.com/hosting/authentication/clerk-auth).

## 2. Neon PostgreSQL

Neon es la base de datos remota para los tenants, el CRM y la facturación de
la plataforma. La cadena completa se guarda como un Secret de Replit y nunca
se escribe en código, documentación o logs:

```env
NEON_DATABASE_URL=
```

El servidor prioriza `NEON_DATABASE_URL`. `DATABASE_URL` y las variables
`PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD` y `PGDATABASE` quedan como
compatibilidad para entornos administrados por Replit.

Al arrancar, el servidor ejecuta las migraciones SQL versionadas. La
migración de facturación de la plataforma crea:

```text
clientum_platform_billing_checkouts
```

Esa tabla está vinculada al `clerk_user_id`, no a las credenciales de un
workspace. Las consultas deben seguir siendo parametrizadas y cualquier
operación multi-tenant debe derivar el usuario desde Clerk.

## 3. Mercado Pago: solo suscripciones de Clientum

Este flujo cobra a los usuarios de la plataforma por sus planes de Clientum.
No debe reutilizarse para cobrar a los clientes de cada empresa ni aceptar un
Access Token enviado desde el navegador.

### Endpoints

```text
GET  /api/billing/plans
GET  /api/billing/status
POST /api/billing/mercadopago/checkout
POST /api/billing/mercadopago/webhook
```

El cliente envía únicamente el `planId`. El servidor mantiene la lista
permitida de planes y sus importes, crea una suscripción recurrente mediante
`POST /preapproval` y guarda su identificador en Neon. Nunca se acepta un
importe arbitrario proveniente del navegador. El webhook procesa eventos
`subscription_preapproval` y actualiza estados `approved`, `paused`,
`cancelled` o `rejected`.

### Secrets de plataforma

```env
PLATFORM_MERCADOPAGO_ACCESS_TOKEN=
PLATFORM_MERCADOPAGO_WEBHOOK_SECRET=
APP_URL=
PLATFORM_PLAN_STARTER_ARS=14900
PLATFORM_PLAN_GROWTH_ARS=29900
PLATFORM_PLAN_SCALE_ARS=59900
```

`APP_URL` debe ser una URL pública HTTPS para que Mercado Pago pueda volver a
la aplicación y entregar notificaciones. Si se configura
`PLATFORM_MERCADOPAGO_WEBHOOK_SECRET`, el webhook valida la firma HMAC antes de
consultar la suscripción en la API oficial.

Los endpoints antiguos `/api/payments/*` y la credencial
`MERCADOPAGO_ACCESS_TOKEN` pertenecen al módulo legacy de cobros por workspace
y están deshabilitados con `410 Gone`. La interfaz de suscripciones debe usar
únicamente `/api/billing/*`.

Fuente: [Referencia API de Mercado Pago](https://www.mercadopago.com.ar/developers/es/reference) y
[Suscripciones](https://www.mercadopago.com.ar/developers/es/docs/subscriptions/landing).

## 4. Google Gemini

La clave de plataforma se lee únicamente en el servidor mediante
`GEMINI_API_KEY`. No se expone al navegador ni se guarda como credencial de un
workspace.

```env
GEMINI_API_KEY=
```

Si falta, está vacía o es un placeholder, los endpoints de IA deben responder
un estado explícito de configuración en lugar de afirmar que Gemini está
conectado.

Fuente: [Google AI for Developers](https://ai.google.dev/).

## 5. SMTP/Nodemailer

El envío de correo ocurre desde el backend:

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME=ClientumCRM
```

La contraseña SMTP es un Secret. No se debe guardar en el navegador ni en la
configuración de credenciales de un workspace si el correo es una capacidad
compartida de la plataforma.

## 6. Google Places

La prospección usa la API server-side de Google Places. La clave pertenece al
workspace y se cifra antes de persistirse:

```text
GOOGLE_MAPS_SERVER_API_KEY
```

No se debe reutilizar una clave restringida únicamente para navegador en
llamadas server-to-server. Las variables `VITE_GOOGLE_MAPS_*` no habilitan la
API del backend.

Fuente: [Google Places API](https://developers.google.com/maps/documentation/places/web-service).

## 7. Meta WhatsApp Webhook

El runtime actual implementa:

- `GET /api/whatsapp/webhook` para el challenge de Meta.
- `POST /api/whatsapp/webhook` para payloads firmados.

Configuración de plataforma:

```env
WHATSAPP_APP_SECRET=
WHATSAPP_WEBHOOK_VERIFY_TOKEN=
```

Los campos `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` y
`WHATSAPP_BUSINESS_ACCOUNT_ID` del catálogo por workspace no significan que el
envío outbound esté conectado. Esa capacidad requiere un cliente de Meta
implementado y probado.

Fuente: [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/).

## 8. Separación de secretos

1. **Secrets de plataforma:** Clerk, Neon, Mercado Pago de Clientum, Gemini,
   SMTP y webhooks compartidos.
2. **Credenciales de workspace:** proveedores que pertenecen a una empresa
   usuaria; se cifran server-side y se resuelven con el tenant autenticado.
3. **API keys internas:** se almacenan como hashes y el valor completo solo se
   muestra al crearlas.

Reglas obligatorias:

- No incluir valores reales en `.env.example`, documentación, logs o respuestas.
- No guardar tokens de proveedores en `localStorage`.
- No exponer claves server-side mediante `VITE_*`.
- No considerar una integración lista solo porque existe una variable.
- En producción, derivar la identidad exclusivamente de Clerk.
- Mantener separados `PLATFORM_MERCADOPAGO_*` y cualquier credencial de
  Mercado Pago perteneciente a un workspace.

## 9. Qué retirar o dejar para después

Para reducir superficie y mantenimiento, la recomendación es:

- Retirar Firebase Auth cuando se confirme que todos los usuarios ingresan
  correctamente con Clerk.
- Retirar el módulo legacy de cobros por workspace si el producto solo cobrará
  suscripciones de Clientum.
- No activar todavía Cloudflare, Slack, AFIP, Shopify, WhatsApp outbound ni
  proveedores de IA adicionales sin un caso de uso y una ruta funcional.
- Mantener Neon, Clerk, Mercado Pago, Gemini y SMTP como el núcleo inicial.

Antes de publicar cobros:

1. Configura los Secrets de Clerk, Neon y Mercado Pago.
2. Ejecuta la migración SQL en el entorno correspondiente.
3. Configura el webhook de Mercado Pago con la URL pública de producción.
4. Prueba aprobado, pendiente, rechazado y webhook duplicado.
5. Verifica que un usuario nunca pueda leer el checkout de otro usuario.

Este repositorio no fija cuotas gratuitas ni precios permanentes de terceros.
Confirma límites y requisitos directamente con cada proveedor.