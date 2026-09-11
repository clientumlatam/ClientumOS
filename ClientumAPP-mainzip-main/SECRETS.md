# Inventario de secretos y configuraciones por módulo

> Documento de referencia para configurar ClientumCRM de forma segura.
>
> **Importante:** este archivo contiene nombres de variables y ejemplos de
> formato, nunca valores reales. Los secretos deben guardarse en **Replit
> Secrets** o en una integración OAuth/API administrada; no deben escribirse
> en el código, en `localStorage`, en commits ni en este documento.

## Estado actual del proyecto

> **Auditoría actualizada el 2026-09-08:** se contrastaron los nombres y usos
> con `server.ts`, `src/data/moduleCredentials.ts`, `vite.config.ts`, la
> migración y los scripts. No se inspeccionaron ni imprimieron valores reales.
> Consulta `docs/secrets-audit.md` para la matriz compacta de runtime.

La regla importante es distinguir entre:

- **Activa:** el runtime actual lee la variable y tiene una ruta que la usa.
- **Tenant-scoped:** se introduce desde el módulo y se cifra por workspace.
- **Planificada:** aparece en el inventario, pero todavía no hay cliente o
  endpoint proveedor activo.

### Regla de separación

- **Secretos de la plataforma:** viven en Replit Secrets o en variables de
  entorno del backend. Son compartidos por la aplicación completa y nunca se
  cargan en el tab de API Keys de un usuario.
- **API Keys de usuario:** se crean y revocan desde
  `Configuración → Integraciones & API Hub → API Keys por usuario`. Pertenecen
  a un `user_id`, tienen scopes de módulos y no son variables de entorno.
- **Token de API:** el valor completo se muestra una sola vez al generarlo.
  La interfaz no lo persiste en `localStorage`; en producción debe guardarse
  únicamente su hash en el backend.

| Variable | Estado | Uso actual |
| --- | --- | --- |
| `GEMINI_API_KEY` | **Activa y opcional** | El backend la consume en `/api/ai/*` y gastos. Los placeholders se consideran no configurados y activan el fallback explícito. |
| `WORKFLOW_ENCRYPTION_KEY`, `API_KEY_PEPPER`, `SESSION_SECRET` | **Activas para cifrado** | Se usa la primera clave real disponible para el vault; `SESSION_SECRET` no implementa sesiones Express. |
| `CLIENTUM_API_KEY_ADMIN_IDS` | **Activa** | IDs Firebase separados por coma con permiso para administrar API Keys de otros usuarios. |
| `VITE_FIREBASE_*` | **Activas como configuración pública** | Se inyectan en el bundle cliente y también se usan para verificar ID tokens. Firebase no se inicializa con valores vacíos. |
| `DATABASE_URL` / `PG*` | **Administradas por Replit** | El servidor usa PostgreSQL para credenciales y API Keys internas. No deben solicitarse ni configurarse manualmente. |
| `SMTP_*`, `MAIL_FROM_*` | **Activas si están completas** | `/api/email/status` y `/api/email/send` validan placeholders y requieren identidad Firebase en producción. |
| `WHATSAPP_APP_SECRET`, `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | **Activas para webhook** | Validan firma y challenge de Meta. El envío saliente todavía no está implementado. |

## Reglas de seguridad

1. Nunca pegues una API key, token, contraseña, certificado o clave privada
   en el chat o en un archivo `.md`.
2. Las variables `VITE_*` llegan al navegador. Solo deben contener
   configuración pública o claves restringidas por dominio; nunca tokens
   privados, secretos de webhook o claves de administración.
3. Todo token de servidor debe leerse desde `process.env` y usarse únicamente
   en endpoints backend.
4. Los webhooks deben validar firma y timestamp antes de procesar eventos.
5. Las credenciales de terceros deben preferirse mediante una integración
   OAuth/API administrada cuando esté disponible.
6. Para producción conviene usar valores separados de desarrollo y producción.
7. Si un proveedor permite permisos por alcance, crear una credencial con el
   mínimo alcance necesario.

---

## 1. Gestión comercial

### Resumen Ejecutivo

**No requiere secretos adicionales.** Actualmente utiliza datos locales del
workspace y métricas calculadas en el cliente.

Si en el futuro se conecta analítica externa:

- `GA_MEASUREMENT_ID` — configuración pública, no es un secreto.
- `POSTHOG_PUBLIC_KEY` — clave pública restringida por dominio, no reemplaza
  una clave privada de servidor.
- `POSTHOG_API_KEY` — solo si se envían eventos desde el backend.

### Centro de funciones

Este menú no necesita credenciales propias. Reutiliza las de los módulos que
abre:

- Diagnóstico: sin secreto adicional.
- IA: `GEMINI_API_KEY`.
- Pagos: variables de Mercado Pago.
- SMS: variables del proveedor SMS elegido.
- Datos: credenciales del almacenamiento persistente que se conecte.
- Acceso: configuración pública de Firebase y, si se agregan sesiones
  server-side, `SESSION_SECRET`.

### Pipeline Negocios, Empresas, Contactos y Tareas & Actividades

**No requieren secretos adicionales en la versión actual.** Los datos se
mantienen en el estado del CRM y en el almacenamiento local del navegador.

Para una persistencia server-side futura:

- `DATABASE_URL` — administrada automáticamente por Replit; no configurarla
  manualmente.
- `DB_ENCRYPTION_KEY` — secreto recomendado si se cifran campos sensibles
  antes de almacenarlos.

### Reportes & BI

**No requiere secretos adicionales actualmente.** Recharts y los datos del CRM
se ejecutan localmente.

Para una futura fuente de datos externa, guardar el token de esa fuente solo en
backend; no exponerlo con `VITE_`.

### Webmail Cloudflare (D1)

El inbox actual usa datos de demostración y no consume Cloudflare en runtime.
Para conectar el Worker y D1 en producción, usar:

| Variable | Tipo | Propósito |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | Secreto | Token con permisos mínimos para el Worker/D1 necesarios. |
| `CLOUDFLARE_ACCOUNT_ID` | Configuración | Identificador de cuenta de Cloudflare. |
| `CLOUDFLARE_D1_DATABASE_ID` | Configuración | Identificador de la base D1. |
| `CLOUDFLARE_EMAIL_WORKER_URL` | Configuración | URL del Worker que expone el correo. |
| `CLOUDFLARE_EMAIL_WORKER_SECRET` | Secreto | Firma compartida entre ClientumCRM y el Worker. |
| `WEBMAIL_ENCRYPTION_KEY` | Secreto | Cifrado de contenido o credenciales si el Worker lo requiere. |

No enviar `CLOUDFLARE_API_TOKEN` al navegador.

### WhatsApp CRM

El módulo actual tiene vista CRM y un webhook Meta con verificación real. El
runtime consume únicamente estas variables de plataforma:

| Variable | Tipo | Propósito |
| --- | --- | --- |
| `WHATSAPP_ACCESS_TOKEN` | Secreto | Token de acceso de Meta. |
| `WHATSAPP_APP_SECRET` | Secreto | Validación de firmas de Meta. |
| `WHATSAPP_PHONE_NUMBER_ID` | Configuración | Número emisor de WhatsApp Business. |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | Configuración | Cuenta de WhatsApp Business. |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | Secreto | Token usado durante la verificación del webhook. |
| `WHATSAPP_WEBHOOK_URL` | Configuración | URL pública registrada en Meta. |

`WHATSAPP_APP_SECRET` y `WHATSAPP_WEBHOOK_VERIFY_TOKEN` del webhook deben vivir
en las variables de plataforma. Los campos con esos mismos nombres que ofrece
el modal son tenant-scoped y están reservados para outbound; el webhook actual
no los consulta. `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` y
`WHATSAPP_BUSINESS_ACCOUNT_ID` se guardan por workspace, pero todavía no
habilitan envío Cloud API.

### Facturación AFIP (CAE)

La pantalla actual simula la emisión de comprobantes. Para producción,
solicitar el certificado y la clave privada por el mecanismo seguro de
secretos, nunca por chat:

| Variable | Tipo | Propósito |
| --- | --- | --- |
| `AFIP_CUIT` | Configuración sensible | CUIT emisor. |
| `AFIP_ENVIRONMENT` | Configuración | `homologacion` o `produccion`; no debe depender de un valor implícito. |
| `AFIP_CERTIFICATE_P12_BASE64` | Secreto | Certificado digital codificado para el backend. |
| `AFIP_PRIVATE_KEY` | Secreto | Clave privada del certificado, si el proveedor la entrega separada. |
| `AFIP_PRIVATE_KEY_PASSWORD` | Secreto | Contraseña del certificado. |
| `AFIP_WSAA_URL` | Configuración | Endpoint de autenticación WSAA. |
| `AFIP_WSFEX_URL` | Configuración | Endpoint del web service de facturación utilizado. |
| `AFIP_TOKEN_CACHE_KEY` | Secreto | Solo si se cachea el token de autorización cifrado. |

La generación del CAE debe estar protegida por permisos, idempotencia,
auditoría y separación estricta entre homologación y producción.

---

## 2. Ventas y cierre

### Propuestas & Presupuestos

**No requiere secretos en la versión actual.**

Si se habilita envío real de propuestas por correo:

- `RESEND_API_KEY` **o** `SENDGRID_API_KEY` — elegir un solo proveedor.
- `MAIL_FROM_ADDRESS` — configuración pública del remitente.
- `MAIL_FROM_NAME` — configuración pública del nombre remitente.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` — alternativa SMTP;
  `SMTP_PASSWORD` es secreto.

### Prospección Maps B2B

La búsqueda usa `GOOGLE_MAPS_SERVER_API_KEY` del workspace para llamar a
Google Places. Si no está configurada, devuelve el resultado demo/fallback.
`VITE_GOOGLE_MAPS_API_KEY` figura como opción futura para un mapa del navegador,
pero no es consumida por el runtime actual. No utilizar una clave irrestricta
en el frontend.

### Lead Scoring MEDDIC

**No requiere secretos adicionales.** Si el scoring pasa a usar IA, reutiliza
`GEMINI_API_KEY`; no crear una clave separada por vista.

### Chatbot WhatsApp 24/7

Reutiliza:

- `GEMINI_API_KEY` — respuestas generativas, si se habilitan.
- `WHATSAPP_ACCESS_TOKEN`.
- `WHATSAPP_APP_SECRET`.
- `WHATSAPP_PHONE_NUMBER_ID`.
- `WHATSAPP_WEBHOOK_VERIFY_TOKEN`.

Ver la sección **WhatsApp CRM** para la descripción de cada variable.

### Campañas Masivas

Para WhatsApp, reutiliza las variables de Meta. Para email, elegir un solo
proveedor:

- `RESEND_API_KEY` — recomendado para una API de envío simple.
- `SENDGRID_API_KEY` — alternativa.
- `EMAIL_WEBHOOK_SIGNING_SECRET` — firma de eventos de entrega.
- `UNSUBSCRIBE_SIGNING_SECRET` — firma de enlaces de baja.

Los tokens de campaña deben tener límites de velocidad, consentimiento y
auditoría; no guardarlos en el navegador.

---

## 3. Inteligencia artificial

### Agent OS, Asistente Gemini, Estrategias GTM y Agente SDR Outreach

Todos estos módulos reutilizan una sola variable:

| Variable | Estado | Uso |
| --- | --- | --- |
| `GEMINI_API_KEY` | Requerida para IA real | Se consume en `server.ts` mediante los endpoints `/api/ai/*`. |

La aplicación tiene respuestas de fallback cuando la clave no está presente,
pero eso no equivale a una conexión real con Gemini. No exponer esta variable
con `VITE_GEMINI_API_KEY`.

---

## 4. Operaciones y sistema

### Cobros Mercado Pago

La UI actual genera links simulados y el vault puede guardar credenciales del
workspace. Todavía no existe un cliente backend de Mercado Pago. Para una
implementación futura:

| Variable | Tipo | Propósito |
| --- | --- | --- |
| `MERCADOPAGO_ACCESS_TOKEN` | Secreto | Crear preferencias, consultar pagos y emitir reembolsos autorizados. |
| `MERCADOPAGO_WEBHOOK_SECRET` | Secreto | Validar notificaciones de Mercado Pago. |
| `VITE_MERCADOPAGO_PUBLIC_KEY` | Pública restringida | Componentes de checkout del navegador, si se usan. |
| `MERCADOPAGO_ENVIRONMENT` | Configuración | `sandbox` o `production`. |
| `MERCADOPAGO_SELLER_ID` | Configuración sensible | Identificador de la cuenta receptora, si el flujo lo requiere. |

`MERCADOPAGO_ACCESS_TOKEN` y `MERCADOPAGO_WEBHOOK_SECRET` deben permanecer
cifrados en backend. No se consideran conectados hasta implementar
preferencias, pagos, webhooks con firma e idempotencia.

### Tienda Digital WhatsApp

Reutiliza las credenciales de WhatsApp y Mercado Pago. Si se conecta Shopify,
agregar solo mediante una integración administrada o backend:

- `SHOPIFY_SHOP_DOMAIN` — configuración.
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — token de Storefront con alcance mínimo.
- `SHOPIFY_ADMIN_ACCESS_TOKEN` — secreto de administración; nunca frontend.
- `SHOPIFY_WEBHOOK_SECRET` — secreto para validar eventos.

No agregar credenciales de Shopify si la tienda continúa siendo local/demo.

### Campus Academia LMS

**No requiere secretos adicionales en la implementación actual.**

Si se habilitan videos o almacenamiento privado, usar el proveedor de storage
correspondiente en backend y una clave de firma temporal; no guardar URLs
firmadas permanentes en el código.

### Workflows & Flujos

El constructor actual trabaja con datos locales. Para ejecutar acciones
externas:

- `WEBHOOK_SIGNING_SECRET` — firma de webhooks propios.
- `WORKFLOW_ENCRYPTION_KEY` — cifrado de credenciales almacenadas en flujos.
- `N8N_API_KEY` — solo si se conecta n8n.
- `MAKE_WEBHOOK_SECRET` — solo si se conecta Make.
- `ZAPIER_WEBHOOK_SECRET` — solo si se conecta Zapier.

No se deben guardar tokens de terceros dentro de la configuración serializada
del workflow sin cifrado.

### Custom Objects Studio

**No requiere secretos adicionales.** Actualmente es un estudio local de
objetos, campos y registros.

### CSV Import & Export

**No requiere secretos adicionales.** Los archivos se procesan en el navegador.
Si en el futuro se suben a un bucket, usar URLs firmadas de vida corta y la
credencial únicamente en backend.

### Gestor de Dominios

Para Cloudflare DNS/SSL:

- `CLOUDFLARE_API_TOKEN` — secreto con permisos acotados a la zona.
- `CLOUDFLARE_ACCOUNT_ID` — configuración.
- `CLOUDFLARE_ZONE_ID` — configuración.
- `CLOUDFLARE_ZONE_NAME` — configuración.

No usar un token global de Cloudflare si alcanza un token limitado a una zona.

### Configuración General

#### Acceso autenticado y Firebase

Estas variables se usan para inicializar el SDK cliente de Firebase. No son
secretos de servidor, pero deben estar configuradas por entorno y protegidas
por restricciones de Firebase:

```text
VITE_FIREBASE_API_KEY=<configuración pública restringida>
VITE_FIREBASE_AUTH_DOMAIN=<dominio Firebase>
VITE_FIREBASE_PROJECT_ID=<id del proyecto>
VITE_FIREBASE_STORAGE_BUCKET=<bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<sender id>
VITE_FIREBASE_APP_ID=<app id>
VITE_FIREBASE_MEASUREMENT_ID=<measurement id opcional>
```

Si se agregan operaciones Firebase Admin desde el servidor, usar una
integración o un secreto separado, por ejemplo:

- `FIREBASE_SERVICE_ACCOUNT_JSON` — secreto server-side.
- `FIREBASE_ADMIN_PROJECT_ID` — configuración.

No colocar una cuenta de servicio en `VITE_*`.

#### Sesiones del servidor

- `SESSION_SECRET` — secreto server-side para firmar sesiones, cookies o
  CSRF si se incorpora un middleware de sesiones.

Actualmente ClientumCRM usa Firebase y estado de sesión del cliente; no hay
middleware Express que consuma `SESSION_SECRET` para firmar cookies.

#### Integraciones y API Hub

El panel actual simula/guarda localmente parte de las integraciones. Para
producción:

- `GOOGLE_CLIENT_ID` — configuración OAuth.
- `GOOGLE_CLIENT_SECRET` — secreto OAuth server-side.
- `GOOGLE_OAUTH_REDIRECT_URI` — configuración.
- `SLACK_BOT_TOKEN` — secreto.
- `SLACK_SIGNING_SECRET` — secreto.
- `SLACK_WEBHOOK_URL` — secreto; no exponerlo en la UI.
- `API_KEY_PEPPER` — secreto para hashear claves internas antes de persistirlas.

Cuando exista un conector OAuth de Replit para el proveedor, preferirlo antes
que administrar manualmente `GOOGLE_CLIENT_SECRET` o tokens de refresco.

#### Auditoría y seguridad

**No requiere una credencial externa actualmente.** Para enviar alertas:

- `SECURITY_ALERT_WEBHOOK_SECRET` — firma de notificaciones.
- `SECURITY_ALERT_WEBHOOK_URL` — URL de destino; tratarla como sensible.

---

## 5. Menú lateral y asignación rápida

La siguiente tabla es un inventario funcional. “Tenant” significa que el valor
se introduce desde el módulo y no se configura como Secret de plataforma.
“Planificado” significa que todavía no existe una integración activa.

| Ítem del menú | Variables que realmente necesita |
| --- | --- |
| Resumen Ejecutivo | Ninguna |
| Centro de funciones | Reutiliza las del módulo elegido |
| Pipeline Negocios | Ninguna |
| Webmail Cloudflare (D1) | Planificado; configuración de plataforma |
| Empresas | Ninguna |
| Contactos | Ninguna |
| Tareas & Actividades | Ninguna |
| Reportes & BI | Ninguna; analítica futura según proveedor |
| WhatsApp CRM | Webhook activo: `WHATSAPP_APP_SECRET`, `WHATSAPP_WEBHOOK_VERIFY_TOKEN`; outbound planificado; resto tenant |
| Facturación AFIP (CAE) | Tenant; emisión CAE planificada |
| Propuestas & Presupuestos | Ninguna; email futuro: `RESEND_API_KEY` o `SENDGRID_API_KEY` |
| Prospección Maps B2B | Tenant `GOOGLE_MAPS_SERVER_API_KEY`; browser key no conectada |
| Lead Scoring MEDDIC | Ninguna; IA opcional: `GEMINI_API_KEY` |
| Chatbot WhatsApp 24/7 | Variables de WhatsApp + `GEMINI_API_KEY` opcional |
| Campañas Masivas | WhatsApp o `RESEND_API_KEY`/`SENDGRID_API_KEY` |
| Agent OS | `GEMINI_API_KEY` |
| Asistente Gemini | `GEMINI_API_KEY` |
| Estrategias GTM | `GEMINI_API_KEY` |
| Agente SDR Outreach | `GEMINI_API_KEY` + canal de envío elegido |
| Cobros Mercado Pago | Tenant; pagos reales planificados |
| Tienda Digital WhatsApp | WhatsApp + Mercado Pago; Shopify solo si se conecta |
| Campus Academia LMS | Ninguna en la versión actual |
| Workflows & Flujos | `WORKFLOW_ENCRYPTION_KEY` + secretos del proveedor conectado |
| Custom Objects Studio | Ninguna |
| CSV Import & Export | Ninguna |
| Gestor de Dominios | Planificado; configuración de plataforma |
| Configuración General | Firebase `VITE_*`, `SESSION_SECRET` si se agregan sesiones |

---

## 6. SMS: proveedor a elegir

El Centro de funciones ya prepara la configuración y el mensaje SMS, pero no
hay proveedor conectado en el código actual. Elegir **un solo** proveedor:

### Opción recomendada: Twilio

- `TWILIO_ACCOUNT_SID` — configuración sensible.
- `TWILIO_AUTH_TOKEN` — secreto.
- `TWILIO_MESSAGING_SERVICE_SID` — configuración.
- `TWILIO_FROM_NUMBER` — configuración.
- `TWILIO_WEBHOOK_SIGNING_SECRET` — secreto para callbacks.

### Alternativas

- MessageBird: `MESSAGEBIRD_ACCESS_KEY`, `MESSAGEBIRD_ORIGINATOR`,
  `MESSAGEBIRD_WEBHOOK_SECRET`.
- Vonage: `VONAGE_API_KEY`, `VONAGE_API_SECRET`, `VONAGE_BRAND_NAME`,
  `VONAGE_SIGNATURE_SECRET`.

No solicitar ni guardar las variables de las tres opciones a la vez. La
conexión debe gestionarse mediante una integración o Secrets y el envío real
debe vivir en backend.

---

## 7. Checklist antes de producción

- [ ] Validar que `GEMINI_API_KEY` tenga un valor real en Replit Secrets para habilitar IA real.
- [x] Firebase consume `VITE_FIREBASE_*` y no inicializa con valores vacíos.
- [ ] Verificar que las reglas de Firebase Auth/Firestore no permitan acceso
      público accidental.
- [ ] Elegir un proveedor de pagos e implementar sus endpoints con firma e idempotencia.
- [ ] Elegir un único proveedor SMS y configurar sus credenciales en backend.
- [ ] Implementar el envío WhatsApp mediante Meta antes de habilitar envíos.
- [ ] Separar homologación/producción para AFIP.
- [ ] Rotar cualquier token que haya sido expuesto en código o logs.
- [x] No solicitar manualmente `DATABASE_URL` ni otras variables administradas
      por Replit.
- [ ] Revisar permisos por rol antes de habilitar cobros, exportaciones,
      facturación o administración de credenciales.
