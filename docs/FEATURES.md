# 📋 Catálogo Completo de Funcionalidades (Clientum Latam Suite)

Este documento contiene el inventario exhaustivo de módulos, subsistemas y herramientas operativas disponibles en la suite de **Clientum Latam**.

---

## 1. 🌐 Portal Público & Verticales de Industria (`apps/landing`)

### 1.1. Portal Institucional & Conversión
- **Hero Interactivo**: Propuesta de valor dinámica con selector de país/moneda y cotizador express.
- **Cotizador Paso a Paso ("Interactive Quote Wizard")**: Flujo guiado para estimar costos de implementación en 4 pasos con cálculo de ROI en tiempo real.
- **Simulador Interactivo de WhatsApp**: Entorno conversacional para testear bots de ventas y atención al cliente antes de contratar.
- **Galería de Equipos PyME ("PymeTeamsGallery")**: Casos reales y testimonios organizados por verticales comerciales.
- **Auditoría Express Modal ("ExpressAuditModal")**: Formulario de diagnóstico digital rápido con scoring automático.
- **Selector de Idioma & Temas**: Soporte bilingüe (Español / Português) y alternancia fluido Claro/Oscuro con contraste optimizado.

### 1.2. Páginas de Aterrizaje por Industria (SEO Verticals)
Rutas dedicadas con copys, casos de uso y calculadoras específicas:
1. `/agro`: Automatización para acopios, maquinaria agrícola e insumos.
2. `/estudios-contables`: Gestión de cartera de clientes, vencimientos y enlace AFIP.
3. `/distribuidoras`: Catálogo B2B, pedidos mayoristas y seguimiento de rutas.
4. `/salud`: Recordatorios de turnos, seguimiento de pacientes y teleconsultas.
5. `/inmobiliaria`: Portales de propiedades, calificación de inquilinos y contratos.
6. `/gastronomia`: Carta QR, reservas de mesas y pedidos por WhatsApp.
7. `/ecommerce`: Integración con carritos de compra y recuperación de abandonos.
8. `/b2b`: Prospección de decisores corporativos y ciclos largos de venta.
9. `/construccion`: Presupuestos de obra, acopio de materiales y contratistas.
10. `/automotor`: Seguimiento de unidades, test drives y servicios postventa.

### 1.3. Tienda Digital Pública & Catálogo (`/tienda/:slug`)
- Catálogo interactivo de productos y servicios por empresa/sucursal.
- Carrito de compras con checkout directo a WhatsApp con resumen formateado.
- Soporte para variantes de productos, fotos en alta resolución y precios dinámicos.

---

## 2. ⚡ CRM & Operaciones Comerciales (`apps/dashboard` / `apps/landing/crm`)

### 2.1. Pipeline de Ventas & Oportunidades
- **Vista Kanban**: Columnas configurables (Prospecto, Contactado, Propuesta Enviada, Negociación, Ganado, Perdido) con soporte drag & drop.
- **Vista Tabla / Hoja de Cálculo**: Edición rápida inline de montos, probabilidades, fechas de cierre y asignación de ejecutivos.
- **Drawer de Detalle de Registro**: Historial de actividades, notas, adjuntos y línea de tiempo de interacciones.
- **Calificación MEDDIC**: Puntuación automática de deals según 6 factores críticos para predecir cierres.

### 2.2. Contactos & Empresas (CMDB B2B)
- Ficha unificada de personas y organizaciones con campos personalizados.
- Enriquecimiento automático de perfiles empresariales con información pública.
- Detección de duplicados y fusión inteligente de registros.

### 2.3. Cotizador & Generador de Propuestas (`Propuestas.tsx`)
- Plantillas prediseñadas de propuestas técnico-comerciales.
- Desglose de ítems, impuestos, condiciones de pago y cláusulas de confidencialidad.
- Exportación instantánea a PDF con membrete corporativo y botón para enviar por correo o WhatsApp.

### 2.4. Prospección Geolocalizada con Google Maps (`CrmFullGoogleMaps.tsx`)
- Búsqueda masiva de comercios y empresas por palabra clave y ciudad/coordenadas.
- Extracción de teléfonos, correos, sitios web, puntuaciones y direcciones.
- Importación directa a la base de datos de prospectos en un solo clic.

---

## 3. 💬 Suite WhatsApp & Mensajería Multicanal

### 3.1. Conectividad Híbrida (Meta API + Gateway Baileys)
- **Conexión por Código QR**: Vinculación de líneas existentes escaneando el código QR en pantalla.
- **Meta Cloud API Oficial**: Integración con números de teléfono verificados de WhatsApp Business API.
- **Multi-Cuenta**: Soporte para gestionar múltiples números y sucursales desde un único panel.

### 3.2. Bandeja de Entrada Inteligente (`InboxView.tsx`)
- Clasificación de chats por estado (Sin Asignar, En Atención, Resuelto, Bot Activo).
- Detección automática de intención del usuario (Precios, Soporte Técnico, Facturación, Demo).
- Respuestas rápidas prediseñadas y sugerencias generadas por IA.
- Filtros por fecha con presets (`Hoy`, `Últimos 7 días`, `Últimos 30 días`, `Personalizado`).

### 3.3. Difusión & Campañas Masivas (`BulkWhatsAppModal.tsx` & `BroadcastsView.tsx`)
- Importación de listas de contactos desde archivos CSV o Excel.
- Envío masivo con intervalos anti-bloqueo y variables dinámicas (`{{nombre}}`, `{{empresa}}`).
- Registro detallado de entrega y tasas de respuesta.

### 3.4. Notificaciones Push de Escritorio (Web Push)
- Servicio en segundo plano con Service Worker para avisar de nuevos mensajes entrantes.
- Notificaciones audibles configurables con opción de silencio.

---

## 4. 🤖 Agente OS & Automatizaciones de Inteligencia Artificial

### 4.1. Orquestador de Agentes con Google Gemini
- **14 Agentes Especializados**:
  1. *CEO / Estratega General*: Alineación de objetivos y prioridades.
  2. *Growth Lead*: Adquisición y experimentación de canales.
  3. *SDR Prospección*: Búsqueda y primer contacto con leads.
  4. *Account Executive*: Cierre de ventas y negociación.
  5. *Customer Success*: Onboarding y retención de clientes.
  6. *Copywriter IA*: Redacción de correos, landing pages y anuncios.
  7. *Especialista SEO*: Investigación de palabras clave y auditorías On-Page.
  8. *Social Media Manager*: Calendario editorial y posteos en redes.
  9. *Agente de Soporte Nivel 1*: Resolución rápida de tickets y dudas frecuentes.
  10. *Especialista Técnico / Dev*: Arquitectura y resolución de incidencias.
  11. *Asesor Financiero / AFIP*: Normativa impositiva y facturación.
  12. *Diseñador de Propuestas*: Estructuración de presupuestos de alto impacto.
  13. *Auditor de Calidad*: Revisión de procesos y métricas de desempeño.
  14. *Especialista en Automatizaciones (n8n/Make)*: Conexión de webhooks y flujos.

### 4.2. Vistas del Organigrama Organizacional
- **Tree View**: Jerarquía tradicional por áreas de reporte.
- **Roster Grid**: Fichas individuales con métricas de costo en tokens y tareas ejecutadas.
- **Swimlanes por Departamento**: Flujo de trabajo dividido por áreas funcionales.
- **Pipeline Flow**: Vista de proceso de punta a punta desde lead hasta entrega.
- **Hub Radial**: Mapa concéntrico centrado en la dirección ejecutiva.

---

## 5. 📦 ERP, Facturación AFIP & Gestión Financiera

### 5.1. Facturación Electrónica AFIP
- Emisión de comprobantes A, B y C con cálculo de alícuotas de IVA (21%, 10.5%, 27%).
- Generación de Código de Autorización Electrónico (CAE) y fechas de vencimiento.
- Historial de comprobantes con opción de descarga de PDF oficial con código QR fiscal.

### 5.2. Control de Gastos & Centros de Costo (`ExpenseTracker.tsx`)
- Registro de egresos categorizados (Marketing, Salarios, Infraestructura, Oficina).
- Asignación de comprobantes y proveedores.

### 5.3. Inventario & Catálogo de Productos (`InventoryDashboard.tsx`)
- Control de existencias con alertas de stock mínimo.
- Valorización de inventario a precio de costo y precio de venta.

---

## 6. 🌐 Dominio, Cloudflare & Auditoría SEO

### 6.1. Gestor de Dominios & DNS (`PublicDomainManagerPage.tsx`)
- Verificación de registros DNS (A, CNAME, TXT, MX) en tiempo real.
- Asistente de configuración para Cloudflare Proxy y certificados SSL automáticos.

### 6.2. Auditoría SEO & Generador de Sitemap
- Diagnóstico On-Page de etiquetas Meta, OpenGraph y encabezados H1-H6.
- Generación y sincronización de `sitemap.xml` dinámico para buscadores.

---

## 7. 🎓 Campus Academia LMS (`/lms`)

- Cursos estructurados por módulos con lecciones en video, texto y sandboxes interactivos.
- Seguimiento de progreso por usuario y emisión de certificados de finalización.

---

&copy; 2026 Clientum Latam. Todos los derechos reservados.
