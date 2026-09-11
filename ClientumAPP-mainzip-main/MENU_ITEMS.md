# Ítems de menú — Clientum CRM

Documento de referencia de los menús visibles del **Dashboard privado** y del
**Sitio Público** de Clientum CRM.

> Última revisión: 2026-09-09  
> Fuentes principales: `src/components/layout/Sidebar.tsx`,
> `src/components/layout/Navbar.tsx`, `src/components/public/PublicNavbar.tsx`,
> `src/components/public/PublicMobileMenu.tsx` y `src/components/public/PublicFooter.tsx`.

---

## 1. Dashboard privado

El dashboard se encuentra disponible para usuarios autenticados en `/app`.
También existen aliases compatibles en `/dashboard`, `/crm` y `/erp`.

### 1.1 Panel de control & análisis

| Ítem | Identificador | Función |
| --- | --- | --- |
| Resumen Ejecutivo | `dashboard` | Pipeline comercial, KPIs clave y visión general |
| Reportes & BI | `analytics` | Métricas de conversión, forecasting y analítica avanzada |
| Centro de Funciones | `featureHub` | Explorar, activar y gestionar módulos del workspace |

### 1.2 Ventas & Clientes

| Ítem agrupado | Ítem principal | Subítems | Función |
| --- | --- | --- | --- |
| Contactos & Empresas | `people` | `companies` — Empresas | Directorio unificado de personas, leads y cuentas |
| Pipeline de Negocios | `opportunities` | `meddic` — Lead Scoring MEDDIC | Oportunidades en Kanban/Tabla con calificación integrada |
| Actividades & Agenda | `tasks` | `calendar` — Calendario; `activityInbox` — Notas y llamadas | Tareas, seguimientos, notas y llamadas |
| Propuestas & Presupuestos | `propuestas` | — | Generación de propuestas PDF |
| Prospección Mapa B2B | `googleMaps` | — | Búsqueda geolocalizada de prospectos |

### 1.3 Centro de Comunicación

| Ítem agrupado | Ítem principal | Subítems | Función |
| --- | --- | --- | --- |
| Bandeja Omnicanal | `whatsapp` | `messages` — Mensajes; `webmail` — Webmail Cloudflare | WhatsApp, correo corporativo y mensajes en un mismo centro |
| Bots & Atención Automática | `chatbot` | — | Configuración y supervisión del chatbot de WhatsApp |
| Campañas Masivas | `campaigns` | — | Creación, envío y métricas de campañas |

### 1.4 IA & Automatización

| Ítem agrupado | Ítem principal | Subítems | Función |
| --- | --- | --- | --- |
| Agentes & Copilot | `agenteOS` | `aiAssistant` — Asistente Gemini; `sdrOutreach` — Agente SDR | IA generativa, agentes autónomos y prospección |
| Automatizaciones & Flujos | `workflows` | — | Triggers, condiciones y acciones automáticas |
| Estrategias GTM | `gtmStrategy` | — | Planificación asistida go-to-market |

### 1.5 Operaciones & Finanzas

| Ítem agrupado | Ítem principal | Subítems | Función |
| --- | --- | --- | --- |
| Facturación AFIP & ERP | `erp` | `operations` — Operaciones internas | Comprobantes fiscales A, B y C con CAE y gestión operativa |
| Cobros & Pagos | `payments` | — | Checkouts y estado de pagos |
| Tienda Digital WhatsApp | `tiendaDigital` | — | Catálogo y pedidos digitales |
| Campus Academia LMS | `campusLMS` | — | Cursos y capacitación comercial |

### 1.6 Sistema & Configuración

| Ítem agrupado | Ítem principal | Subítems | Función |
| --- | --- | --- | --- |
| Estructura de Datos | `customObjects` | `csvStudio` — Importar / Exportar CSV | Objetos personalizados y operaciones masivas de datos |
| Gestor de Dominios | `domainManager` | — | Dominios, DNS y Cloudflare |
| Ajustes Generales | `settings` | — | Permisos, integraciones, auditoría y preferencias |

### 1.7 Acciones globales

| Acción | Ubicación |
| --- | --- |
| Buscar en todo el CRM | Buscador universal del sidebar / paleta `⌘K` |
| Nuevo Registro | Botón `+` del encabezado lateral |
| Notificaciones | Botón de campana del topbar; abre Actividades & Agenda |
| Clientum Copilot | Tarjeta lateral y botón superior |
| Ver Portal Público | Acceso lateral y menú “Más” |
| Cuentas Clave | Acceso contextual a las primeras oportunidades |
| Configuración de API | Botón contextual del topbar o de cada módulo |
| Cambiar idioma | Menú “Más”: ES, EN y PT |
| Restablecer demo | Menú “Más” |
| Alternar Kanban / Tabla | Selector disponible en Pipeline de Negocios |
| Exportar CSV | Acción disponible en Pipeline de Negocios |
| Ver perfil | Pie del sidebar |
| Cerrar sesión | Pie del sidebar |

---

## 2. Sitio público

El sitio público se encuentra en `/`. Sus páginas internas se navegan mediante
hash, por ejemplo `/#/producto` o `/#/industrias/agro`.

### 2.1 Menú principal de escritorio

| Ítem | Ruta / acción |
| --- | --- |
| Inicio | `/#/` |
| Producto | Menú desplegable de productos y módulos |
| Industrias | Menú desplegable de soluciones por sector |
| Precios | `/#/precios` |
| Recursos | Menú desplegable de recursos y empresa |
| Contacto | `/#/contacto` |
| Buscar | Buscador público `⌘K` |
| Pedir Demo | `/#/contacto` |
| Ingresar al CRM / Ir al Dashboard | `/app` |

### 2.2 Menú Producto

| Ítem | Ruta |
| --- | --- |
| CRM 360° Omnicanal | `/#/clientum-crm` |
| WhatsApp Multiagente | `/#/producto/whatsapp-ia` |
| Facturación AFIP CAE | `/#/producto/erp` |
| Agente OS Autónomo | `/#/producto/agentes-ia` |
| Automatizaciones DAG | `/#/producto/automatizaciones` |
| Business Intelligence | `/#/producto/bi` |
| Prospección Maps IA | `/#/producto/integraciones` |
| Portal & Canales Digitales | `/#/producto/integraciones` |
| Ver arquitectura completa | `/#/producto` |
| Abrir Simulador WhatsApp | Abre el simulador interactivo |
| Ver Catálogo en Tienda | `/#/tienda/central` |

### 2.3 Menú Industrias

| Ítem | Ruta |
| --- | --- |
| Ver todas las 10 verticales | `/#/industrias` |
| Agroindustria & Maquinaria | `/#/industrias/agro` |
| Estudios Contables | `/#/industrias/estudios-contables` |
| Distribuidoras Mayoristas | `/#/industrias/distribuidoras` |
| Salud & Clínicas | `/#/industrias/salud` |
| Inmobiliarias & Desarrollos | `/#/industrias/inmobiliaria` |
| Gastronomía & Bares | `/#/industrias/gastronomia` |
| E-Commerce & Retail | `/#/industrias/ecommerce` |
| Servicios B2B & Corporativos | `/#/industrias/b2b` |
| Construcción & Corralones | `/#/industrias/construccion` |
| Automotor & Concesionarias | `/#/industrias/automotor` |
| Consultar con un especialista | `/#/contacto` |

### 2.4 Menú Recursos

| Ítem | Ruta |
| --- | --- |
| Casos de Éxito Reales | `/#/casos` |
| Campus Academia LMS | `/#/academia` |
| Servicios de Migración | `/#/servicios` |
| Gestor de Dominios & DNS | `/#/dominios` |
| Sobre Clientum Latam | `/#/about` |

### 2.5 Menú móvil

El menú móvil agrupa el contenido en tres pestañas:

#### Producto

- CRM 360° Omnicanal
- WhatsApp Multiagente & Baileys
- Facturación AFIP con CAE (WSFE)
- Agente OS Autónomo (Gemini 3.7)
- Automatizaciones & Flujos DAG
- Business Intelligence & Forecast

#### Industrias

- Agroindustria & Maquinaria
- Estudios Contables
- Distribuidoras Mayoristas
- Salud & Clínicas
- Inmobiliarias & Desarrollos
- Gastronomía & Bares
- E-Commerce & Retail
- Servicios B2B & Corporativos
- Construcción & Corralones
- Automotor & Concesionarias

#### Recursos

- Planes & Precios
- Casos de Éxito & Clientes
- Academia LMS Clientum
- Servicios de Implementación
- Tienda Digital Oficial
- Gestor de Dominios & Cloudflare

#### Acciones móviles

- Moneda de visualización: Pesos (ARS) / Dólares (USD)
- Iniciar Sesión
- Ingresar al CRM / Ir al Dashboard
- Cotizador
- Simulador
- Auditoría

### 2.6 Navegación del pie de página

#### Producto

- Overview Suite
- CRM 360°
- WhatsApp & Bots IA
- Automatizaciones DAG
- ERP & AFIP con CAE
- Business Intelligence
- Agent OS (14 Agentes)
- Integraciones

#### Industrias

- Directorio General
- Agroindustria
- Estudios Contables
- Distribuidoras Mayoristas
- Salud & Clínicas
- Inmobiliarias
- Gastronomía
- E-Commerce & Retail

#### Servicios

- Catálogo de Servicios
- Consultoría Comercial
- Integración AFIP & ERP
- Desarrollo Web & Tiendas
- Growth & Outreach B2B
- Gestión DNS & Cloudflare
- Tienda Digital Demo

#### Recursos

- Blog & Guías
- Campus Academia LMS
- Casos de Éxito
- Planes & Precios
- Sobre Clientum
- Contacto & Solicitar Demo
- Términos & Privacidad

#### Enlaces legales inferiores

- Términos — `/#/legal`
- Privacidad — `/#/privacidad`
- SLA 99.9% — `/#/terminos`

---

## 3. Rutas públicas adicionales

Además de los menús principales, el sitio incluye estas rutas públicas:

| Sección | Ruta |
| --- | --- |
| Suite de Producto | `/#/producto` |
| Marketing & Outreach | `/#/producto/marketing` |
| SEO Suite & Keywords | `/#/producto/seo` |
| Casos de éxito alternativo | `/#/casos-de-exito` |
| Recursos alternativo | `/#/recursos` |
| Blog | `/#/blog` |
| Demo | `/#/demo` |
| Tienda Digital | `/#/tienda` |
| Tienda Central | `/#/tienda/central` |
| Legal | `/#/legal` |
| Privacidad | `/#/privacidad` |
| Términos / SLA | `/#/terminos` |