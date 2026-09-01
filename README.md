# 🚀 Remix ClientumOS · Business Operating System & Dual CRM Suite

**Remix ClientumOS** es una plataforma integral de gestión empresarial, prospección comercial, marketing automatizado y orquestación de inteligencia artificial diseñada para PyMEs y empresas en Latinoamérica. Está construida sobre una arquitectura monorepo desacoplada y de alto rendimiento utilizando **Turborepo**, **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Express.js** y **Google Gemini AI**.

---

## 🏛️ Arquitectura del Ecosistema

El proyecto utiliza una arquitectura monorepo modular estructurada en aplicaciones independientes y paquetes compartidos:

```
                                  ┌─────────────────────────────────────────────────────────────┐
                                  │                  REMIX CLIENTUMOS MONOREPO                  │
                                  └──────────────────────────────┬──────────────────────────────┘
                                                                 │
                 ┌───────────────────────────────────────────────┼───────────────────────────────────────────────┐
                 ▼                                               ▼                                               ▼
┌───────────────────────────────────────────────┐ ┌───────────────────────────────────────────────┐ ┌───────────────────────────────────────────────┐
│              🌐 APPS / LANDING                │ │              ⚡ APPS / DASHBOARD              │ │                🔌 APPS / API                │
│ • Portal Corporativo & Cotizador              │ │ • CRM Pipeline Kanban & Hojas de Cálculo      │ │ • Servidor REST Express & Middlewares       │
│ • 10 Landings de Industria (SEO)              │ │ • ERP (Facturación AFIP, Stock, Gastos)       │ │ • Proxy Seguro de Gemini y Scraping         │
│ • Suite WhatsApp Multi-Línea & QR             │ │ • Control de Tareas, Proyectos y Horas        │ │ • Transporte Nodemailer SMTP                │
│ • Agente OS (Roster de 14 Agentes IA)         │ │ • Integración de Vistas y Reportes B2B        │ │ • Pool de Conexiones PostgreSQL (Neon)      │
└───────────────────────┬───────────────────────┘ └───────────────────────┬───────────────────────┘ └───────────────────────┬───────────────────────┘
                        │                                                 │                                                 │
                        └───────────────────────────────────────────┬─────┴─────────────────────────────────────────────────┘
                                                                    │
                                            ┌───────────────────────▼───────────────────────┐
                                            │             PACKAGES COMPARTIDOS              │
                                            │ • @clientum/ui: Componentes y Contexto CRM    │
                                            │ • @clientum/types: Interfaces y Modelos TS    │
                                            │ • @clientum/agents: Orquestadores y Lógica IA │
                                            └───────────────────────────────────────────────┘
```

### Aplicaciones y Paquetes

1. **`apps/landing`** (Puerto `3000`): Aplicación frontend principal que hospeda la landing institucional, el directorio de industrias (`/industrias`, `/agro`, `/salud`, etc.), el catálogo público (`/tienda/:slug`), la suite de prospección con mapas y el CRM full operativo con Agente OS.
2. **`apps/dashboard`**: Interfaz de gestión administrativa para analíticas avanzadas, control de inventario, conciliación de gastos y facturación.
3. **`apps/api`**: Servicio backend en Express.js para procesamiento server-side de IA, webhooks de WhatsApp, envío de correos transaccionales y persistencia PostgreSQL.
4. **`packages/ui`**: Sistema de diseño unificado, componentes accesibles, modales de autenticación, drawer de detalles y el proveedor `CRMContext`.
5. **`packages/types`**: Tipos TypeScript comunes para contratos de API, oportunidades, contactos, modelos de agentes y configuración del sistema.
6. **`packages/agents`**: Subsistema de agentes inteligentes y algoritmos de prospección y enriquecimiento de datos.

---

## ⚙️ Requisitos e Instalación

### Prerrequisitos
- **Node.js**: Versión `20.x` o superior.
- **NPM**: Versión `10.x` o superior (compatible con workspaces).

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/tu-organizacion/remix-clientumos.git
cd remix-clientumos
npm install
```

### 2. Configurar variables de entorno desde `.env.example`
Copia la plantilla predefinida que documenta todas las variables y alternativas Free Tier:
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de desarrollo. Revisa la sección siguiente y el archivo `ENV_GUIDE.md` para las opciones gratuitas recomendadas.

### 3. Iniciar el entorno de desarrollo
```bash
# Inicia la aplicación en http://localhost:3000
npm run dev
```

### 4. Scripts principales disponibles en el Monorepo
| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo principal en `http://localhost:3000`. |
| `npm run build` | Compila todos los paquetes y aplicaciones mediante Turborepo. |
| `npm run dev:landing` | Ejecuta exclusivamente la aplicación frontend `landing`. |
| `npm run dev:dashboard`| Ejecuta exclusivamente la aplicación `dashboard`. |
| `npm run dev:api` | Inicia la API backend en TypeScript. |

---

## 🔒 Configuración de Variables de Entorno (Referencia `.env.example`)

Todas las variables requeridas por el ecosistema se encuentran catalogadas en [`.env.example`](./.env.example). A continuación se describe la función de cada bloque:

### 1. Núcleo de la Aplicación (Core)
- `APP_URL`: URL base del entorno (ej: `http://localhost:3000`).
- `ALLOWED_DOMAINS`: Lista de dominios permitidos para CORS y redirecciones seguras (`localhost,127.0.0.1,clientum.app`).
- `ALLOWED_EMAIL_DOMAINS`: Dominios de correo corporativo autorizados para auto-registro.

### 2. Base de Datos & Persistencia (PostgreSQL / Neon)
- `DATABASE_URL` / `NEON_DATABASE_URL`: Cadena de conexión a PostgreSQL con `sslmode=require`. Compatible con el plan gratuito perpetuo de [Neon.tech](https://neon.tech) (0.5 GB) o Supabase.
- `NEON_AUTH_BASE_URL` / `VITE_NEON_AUTH_URL`: Endpoint de autenticación OAuth de Neon.

### 3. Autenticación & Usuarios (Firebase Spark Plan)
- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`: Credenciales públicas del cliente Firebase para Social Login (Google SSO) y restablecimiento de contraseña sin costo de servidor.

### 4. Inteligencia Artificial & Modelos LLM (Google AI Studio)
- `GEMINI_API_KEY`, `GEMINI_API_KEY_V2`: Clave de API de [Google AI Studio](https://aistudio.google.com) para los modelos `gemini-2.0-flash` y `gemini-2.0-pro` (con límites de desarrollo gratuitos).

### 5. Seguridad & Sesiones
- `BETTER_AUTH_SEC`, `SESSION_SECRET`: Secretos criptográficos de 32 bytes generables localmente con `openssl rand -hex 32`.
- `ALLOWED_SIGN_IN`: Métodos de autenticación habilitados (`google,email`).

### 6. Correo Transaccional (SMTP)
- `SMTP_USER`, `SMTP_PASS`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`: Configuración de transporte SMTP con soporte para Gmail SMTP (App Passwords) o Brevo (300 mails/día gratis en `smtp-relay.brevo.com:587`).

### 7. Prospección, Mapas & WhatsApp
- `GOOGLE_MAPS_API_KEY`: Clave de Google Maps Platform (con $200 USD de crédito mensual) o Mapbox/Leaflet.
- `APIFY_API_TOKEN` & `HUNTER_API_KEY`: Claves para scraping de Google Maps y búsqueda de emails de decisores.
- `META_WA_ACCESS_TOKEN`, `META_WA_APP_SECRET`, `META_WA_PHONE_NUMBER_ID`: Conexión con Meta Cloud API para WhatsApp Business (con 1,000 conversaciones gratis al mes).
- `VAPID_PUBLIC_KEY` & `VAPID_PRIVATE_KEY`: Claves VAPID para notificaciones Web Push de escritorio generadas con `npx web-push generate-vapid-keys`.

---

## 🔄 Flujo de Desarrollo del Ecosistema Multiplataforma

El flujo de trabajo entre aplicaciones y paquetes opera bajo los siguientes principios:

1. **Estado Centralizado & React Context**: Las vistas del CRM (`apps/landing/src/components/crm-full`) consumen el proveedor global `CRMProvider` de `@clientum/ui`. Los cambios en el pipeline, notas de tratos o mensajes de WhatsApp se actualizan reactivamente en memoria y se sincronizan con `localStorage` y la base de datos PostgreSQL.
2. **Motor de Temas Dual (Clientum Theme Engine)**: Soporte completo para modo oscuro (*Obsidian Blue* `#081730`) y modo claro (*Clarity High Contrast* `#FFFFFF` y `#F0F4F8`), garantizando legibilidad y accesibilidad (WCAG AA).
3. **División de Paquetes en Vite (Rollup Chunks)**: La configuración en `vite.config.ts` utiliza `manualChunks` para separar librerías pesadas (`vendor-react`, `vendor-maps`, `vendor-charts`, `vendor-pdf`, `vendor-ai`), garantizando tiempos de respuesta ultrarrápidos.
4. **Service Worker en Segundo Plano**: `public/sw.js` gestiona notificaciones Web Push nativas para alertar al equipo comercial de mensajes entrantes de WhatsApp y nuevas oportunidades.

---

## 📚 Documentación Técnica Detallada

- [🔌 INTEGRATIONS.md](./docs/INTEGRATIONS.md): Guía de APIs de terceros (Gemini, WhatsApp, Firebase, Apify, Hunter) y planes gratuitos.
- [🎯 MARKETING_SUITE.md](./docs/MARKETING_SUITE.md): Prompts de Gemini preconfigurados, lógica del Agente OS y generador de copys/SEO.
- [💻 DEVELOPMENT.md](./docs/DEVELOPMENT.md): Convenciones de código, arquitectura de carpetas, scripts de utilidades y depuración.
- [📋 FEATURES.md](./docs/FEATURES.md): Inventario completo de funcionalidades y módulos.
- [🏛️ ARCHITECTURE.md](./docs/ARCHITECTURE.md): Arquitectura detallada del monorepo y flujo de datos.
- [🔌 API.md](./docs/API.md): Referencia técnica de endpoints de la API REST.
- [🔑 ENV_GUIDE.md](./docs/ENV_GUIDE.md): Guía detallada de variables de entorno paso a paso.
- [🤖 AGENTS.md](./docs/AGENTS.md): Roster y organigrama de los 14 agentes de IA especializados.
- [🚢 DEPLOYMENT.md](./docs/DEPLOYMENT.md): Guía de despliegue en Google Cloud Run, Docker y servidores VPS con Nginx.

---

&copy; 2026 Clientum Latam. Todos los derechos reservados.
