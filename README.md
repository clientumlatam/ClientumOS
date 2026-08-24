# 🚀 Clientum · Plataforma Dual: Sitio Web Público & CRM Dashboard

Bienvenido a la suite de **Clientum Latam**, diseñada con una arquitectura desacoplada para ofrecer una experiencia dual integral: un **Sitio Web Público Corporativo** de alta conversión y una **Plataforma Privada CRM & ERP con IA** para la gestión operativa y comercial.

---

## 🧭 Arquitectura Dual de la Aplicación

La aplicación está dividida en dos grandes entornos accesibles de manera transparente y conectados entre sí:

```
                                 ┌──────────────────────────────────────────────┐
                                 │              CLIENTUM LATAM                  │
                                 └──────────────────────┬───────────────────────┘
                                                        │
                         ┌──────────────────────────────┴──────────────────────────────┐
                         ▼                                                             ▼
       ┌───────────────────────────────────┐                         ┌───────────────────────────────────┐
       │   🌐 APP 1: SITIO WEB PÚBLICO     │                         │   ⚡ APP 2: DASHBOARD & CRM SUITE  │
       │   Rutas: /, /sitio, /web, /portal │                         │   Rutas: /app, /dashboard, /crm  │
       └─────────────────┬─────────────────┘                         └─────────────────┬─────────────────┘
                         │                                                             │
                         │── [Login / Registro] ──────────────────────────────────────►│
                          │   https://crm.clientum.com.ar                             │
                         │                                                             │
                         │◄── [Volver al Sitio Web] ───────────────────────────────────│
```

---

## 1. 🌐 App 1: Sitio Web Público Corporativo (`/`, `/sitio`, `/web`, `/portal`)

Sitio web corporativo y comercial enfocado en adquisición de clientes, presentación institucional y educación interactiva.

### 🌟 Módulos y Secciones Principales:
1. **Header Principal**:
   - Selector de Idioma (Español / Português).
   - Menú de navegación navegable por categorías.
   - Botón CTA **Demo** para agendamiento.
    - **Botón "Login / Registro"** con enlace directo a [`https://crm.clientum.com.ar`](https://crm.clientum.com.ar).
2. **Catálogo de Servicios**:
   - 12 servicios estructurados en 4 áreas clave:
     - 🤖 **Chatbots WhatsApp & Agentes IA**
     - 📈 **CRM, ERP & Gestión Comercial**
     - 💻 **Desarrollo Web & Portales Cloud**
     - 🎯 **Growth Marketing & Prospección B2B**
3. **Casos de Éxito & Testimonios**:
   - Métricas reales de impacto de clientes en Latinoamérica.
4. **Calculadora Diagnóstica de ROI**:
   - Simulador interactivo de ahorro y retorno de inversión en automatización de ventas.
5. **Simulador Interactivo de Chatbot WhatsApp**:
   - Pruebas en vivo con agentes conversacionales IA entrenados para atención al cliente.
6. **Campus Academia LMS (`/lms`)**:
   - Catálogo de cursos formativos en ventas, automatización e IA.
7. **Selector Flotante de Entorno**:
   - Barra flotante inferior para alternar rápidamente entre el Sitio Público y el Dashboard.

---

## 2. ⚡ App 2: Dashboard & Portal de Autenticación (`/login`, `/auth`, `/app`, `/dashboard`)

Plataforma privada y segura para la operación comercial, administrativa y técnica de la empresa y sus clientes.

### 🔐 Portal de Login y Registro (`/login`, `/auth`):
- **Acceso Rápido Demo (1 Clic)**:
  - **Administrador Full Suite**: Acceso con rol de administrador a todas las herramientas (CRM, ERP, AFIP, WhatsApp IA, CMDB).
  - **Ejecutivo Comercial**: Acceso con rol operativo enfocado en pipeline comercial y prospección.
- **Autenticación Tradicional**:
  - Inicio de sesión y registro de nuevas cuentas con validación de seguridad.
- **Google Workspace SSO**:
  - Conexión e inicio de sesión seguro con cuentas de Google.
- **Recuperación de Contraseña**:
  - Envío y validación de tokens de restablecimiento de credenciales.
- **Navegación de Retorno**:
  - Enlace permanente para volver al Sitio Web Público.

### 📊 Suite CRM & ERP (`/app`):
1. **Overview & Analytics Dashboard**:
   - KPIs de facturación, tasa de conversión, volumen de leads y rendimiento de agentes.
2. **CRM Kanban & Pipeline**:
   - Tablero interactivo drag & drop con etapas comerciales, seguimiento MEDDIC y cotizaciones.
3. **Módulo ERP & Facturación Electrónica AFIP**:
   - Emisión de facturas tipo A, B y C, CAE, control de gastos, clientes y proyectos con imputación de horas.
4. **Chatbots WhatsApp & Centro de Agentes IA**:
   - Configuración de webhooks, métricas de resolución, respuestas automatizadas y orquestación con IA.
5. **Prospección Geolocalizada con Google Maps**:
   - Búsqueda de negocios locales, enriquecimiento de leads y extracción de datos de contacto.
6. **Gestión de Contenido & SEO**:
   - Calendario editorial, generador de artículos y auditoría On-Page.
7. **Integraciones & CMDB**:
   - Estado de servidores, APIs, SMTP y conectores de bases de datos.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 18+, TypeScript, Vite, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Express.js (Node.js/TypeScript) con middleware de Vite para SSR/SPA híbrido.
- **Base de Datos & Auth**: PostgreSQL / Neon, Firebase Auth / Google SSO, Sesiones seguras Express.
- **Inteligencia Artificial**: Google GenAI SDK (Gemini Flash & Pro).
- **Formatos & Reportes**: Generación de PDF (jsPDF / html2canvas) y exportación a Excel/CSV.

---

## 🚀 Despliegue y Ejecución

### Desarrollo Local:
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en puerto 3000
npm run dev
```

### Compilación para Producción:
```bash
# Compilar cliente Vite y empaquetar servidor CommonJS
npm run build

# Iniciar en producción
npm start
```

---

## 🔗 Enlaces Clave

- **Sitio Público**: [`https://clientumlatam.com`](/) (o `/`)
- **Acceso Directo CRM & Registro**: [`https://crm.clientum.com.ar`](https://crm.clientum.com.ar) (o `/login`)
- **Dashboard Privado**: [`/app`](/app)

---

&copy; 2026 Clientum Latam. Todos los derechos reservados.
