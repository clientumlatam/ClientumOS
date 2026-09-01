# 🏛️ Arquitectura del Sistema (Clientum Latam Monorepo)

Este documento describe en detalle la arquitectura de software, la topología de paquetes, los patrones de diseño y el flujo de datos del ecosistema **Clientum Latam**.

---

## 1. 📦 Estructura del Monorepo (Turborepo + NPM Workspaces)

El repositorio está organizado como un monorepo modular gestionado por Turborepo:

```
clientum-os/
├── apps/
│   ├── landing/          # Aplicación principal frontend (Portal Web + CRM Full + Rutas de Industria)
│   │   ├── src/
│   │   │   ├── components/crm-full/     # Módulos CRM, WhatsApp, MEDDIC, Propuestas, Mapas
│   │   │   ├── components/public/       # Componentes del portal público y landings
│   │   │   └── platform/                # Vistas avanzadas de Agent OS y Suites
│   │   └── vite.config.ts
│   │
│   ├── dashboard/        # Dashboard complementario para tenants B2B
│   │   ├── src/
│   │   │   └── components/              # Vistas de Analíticas, ERP, Inventario, Tareas
│   │   └── vite.config.ts
│   │
│   └── api/              # Servicio backend REST y middlewares
│       ├── src/
│       │   ├── db.ts                    # Conexión a PostgreSQL (Neon Pool)
│       │   ├── mailer.ts                # Transporte SMTP de correos transaccionales
│       │   ├── smtp.ts                  # Carga de credenciales y fallbacks
│       │   └── index.ts                 # Enrutamiento de endpoints Express
│       └── tsconfig.json
│
├── packages/
│   ├── ui/               # Biblioteca de componentes UI compartidos (Tailwind + React)
│   │   ├── src/auth/                    # Modales y pantallas de autenticación y perfiles
│   │   ├── src/common/                  # CommandPalette, Logo, Toasts, Drawers
│   │   └── src/context/                 # Contextos globales (CRMContext)
│   │
│   ├── types/            # Definiciones de tipos TypeScript compartidas
│   │   └── src/                         # Modelos de datos para CRM, ERP, Auth y Platform
│   │
│   └── agents/           # Motor y lógica de los agentes de IA
│       └── src/                         # Orquestadores, enriquecedores y prospectores
│
├── .env.example          # Plantilla de variables de entorno y Free Tier
└── turbo.json            # Pipeline de orquestación de builds y scripts
```

---

## 2. 🔄 Flujo de Datos y Comunicación

```
  ┌─────────────────────────────────────────────────────────────┐
  │                   CLIENTE / NAVEGADOR                       │
  │  • React 18 + React Router DOM                              │
  │  • Tailwind CSS v4 (Claro / Oscuro)                         │
  │  • CRMContext (Estado en Memoria + LocalStorage Sync)       │
  └───────────────┬─────────────────────────────┬───────────────┘
                  │                             │
    [Peticiones Locales / REST]     [Integraciones Directas / SDKs]
                  │                             │
                  ▼                             ▼
  ┌──────────────────────────────┐ ┌──────────────────────────────┐
  │      EXPRESS BACKEND         │ │     SERVICIOS EXTERNOS       │
  │ • Proxy de APIs              │ │ • Google Gemini (@google/genai)
  │ • Nodemailer (SMTP)          │ │ • Google Maps Platform API   │
  │ • Autenticación de Sesiones  │ │ • Meta Cloud WhatsApp API    │
  │ • Pool PostgreSQL (Neon)     │ │ • Web Push / Service Worker  │
  └───────────────┬──────────────┘ └──────────────────────────────┘
                  │
                  ▼
  ┌──────────────────────────────┐
  │     PERSISTENCIA DE DATOS    │
  │ • PostgreSQL Serverless      │
  │ • Firebase Auth & Firestore  │
  └──────────────────────────────┘
```

---

## 3. 🎨 Sistema de Temas y Diseño (Clientum Theme Engine)

La aplicación implementa un motor de diseño con soporte para **Modo Oscuro Obsidian** (`#081730`) y **Modo Claro Clarity** (`#f0f4f8` / `#ffffff`) cumpliendo los estándares de accesibilidad WCAG AA:

- **Contraste Dinámico**: Las superficies y textos se adaptan mediante variables CSS en `:root` y `[data-theme="light"]`.
- **Tipografía**: Jerarquía visual basada en *Plus Jakarta Sans* y familias sans-serif de alta legibilidad en pantallas de alta densidad.
- **Microinteracciones**: Transiciones fluidas con Framer Motion en modales, drawers y alertas toast.

---

## 4. 🔒 Seguridad y Manejo de Secretos

1. **Aislamiento de Claves de API**: Todas las claves privadas (Gemini API Key, SMTP Passwords, tokens de Meta y PostgreSQL) se mantienen en el entorno del servidor y nunca se exponen al cliente.
2. **Tokens de Sesión**: Generación de identificadores de sesión criptográficos con `openssl rand -hex 32` (`BETTER_AUTH_SEC`, `SESSION_SECRET`).
3. **CORS & Dominios Autorizados**: Middleware de validación contra listas blancas configuradas en `ALLOWED_DOMAINS` y `ALLOWED_EMAIL_DOMAINS`.
4. **Resiliencia de Conexión a Base de Datos**: El pool de PostgreSQL cuenta con reconexión automática y manejo de errores en clientes inactivos.

---

## 5. ⚡ Estrategia de Build y Ejecución

- **Turborepo**: Paraleliza la compilación de TypeScript (`tsc`) y el empaquetado de assets con Vite en todos los workspaces.
- **Orquestación con ESBuild (`build.mjs`)**: El script en la raíz unifica la compilación:
  1. Ejecuta Turborepo para construir los empaquetados del cliente en `apps/landing/dist` (incluye las rutas del CRM de `apps/dashboard`).
  2. Copia este bundle unificado de Vite a la carpeta `/dist` de la raíz.
  3. Ejecuta **ESBuild** para empaquetar todo el servidor backend Express (`apps/api/src/index.ts`) hacia `dist/server.cjs`, marcando como externos paquetes nativos (`express`, `pg`, etc.).
- **Rollup Manual Chunks**: En `apps/landing/vite.config.ts`, las dependencias pesadas (`vendor-react`, `vendor-maps`, `vendor-charts`, `vendor-pdf`, `vendor-ai`) se dividen en fragmentos optimizados para reducir el tiempo de carga inicial.
- **Service Worker (`public/sw.js`)**: Gestiona la recepción de notificaciones Web Push incluso cuando la pestaña del navegador está en segundo plano.

---
