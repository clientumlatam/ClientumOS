# Plan Consolidado del Proyecto Clientum

> Hoja de ruta integral para CRM, captación web, integraciones, comercio
> electrónico, ERP y portal de clientes.

## 1. Resumen ejecutivo

El proyecto evolucionará Clientum hacia una plataforma comercial completa,
conectando tres superficies principales:

1. **Núcleo comercial y gestión de clientes (CRM):** datos de contactos,
   empresas, oportunidades, actividades, pipeline y métricas.
2. **Infraestructura de integraciones y conectividad:** WhatsApp, correo,
   webhooks, automatizaciones, ERP y e-commerce.
3. **Plataforma web pública y experiencia de usuario:** captación de leads,
   catálogo, SEO, contenido, autoservicio y portal privado.

La estrategia prioriza primero los flujos de punta a punta: un lead debe poder
ingresar, quedar registrado, ser gestionado por el equipo comercial, avanzar por
el pipeline y generar métricas. Después se incorporan los canales externos y,
por último, la sincronización operativa con ERP/e-commerce y el autoservicio.

## 2. Hoja de ruta consolidada

| Prioridad | Módulo / eje | Acciones clave | Entregables principales |
| --- | --- | --- | --- |
| **Alta — Fase I** | **CRM Fundamentos & Captación Web** | Base de datos de clientes, etapas de venta, roles, pipeline y formularios públicos conectados al CRM. | CRM operativo y recepción automatizada de leads. |
| **Media — Fase II** | **Integraciones & Canales** | Conexión de WhatsApp, correo electrónico, webhooks y registro centralizado de interacciones. | Comunicación unificada y trazabilidad de conversaciones. |
| **Estratégica — Fase III** | **Sincronización ERP/E-commerce & Portal de Clientes** | Inventario, catálogo, pedidos, pagos, facturación, área privada y SEO avanzado. | Plataforma web completa con autoservicio y métricas comerciales. |

## 3. Fase I — CRM, fundamentos y captación web

**Prioridad:** Alta  
**Objetivo:** crear un flujo comercial operativo desde la captación del lead
hasta el cierre y el seguimiento.

### 3.1 Base de datos comercial

- Estructurar entidades para:
  - Contactos y personas.
  - Empresas y organizaciones.
  - Oportunidades y tratos.
  - Productos, servicios y líneas de negocio.
  - Tareas y actividades.
- Mantener aislamiento de datos por workspace o tenant.
- Definir propietarios, equipos, roles y permisos.
- Incorporar validaciones y campos obligatorios configurables.
- Detectar posibles duplicados por email, teléfono, dominio y nombre.
- Permitir revisar, fusionar y revertir importaciones sin perder trazabilidad.
- Incorporar archivado lógico e historial de cambios.

### 3.2 Pipeline de ventas

- Definir las etapas iniciales:
  1. Contacto inicial.
  2. Propuesta presentada.
  3. Negociación.
  4. Cerrado / ganado.
  5. Cerrado / perdido.
- Permitir múltiples pipelines por producto, equipo o unidad de negocio.
- Configurar colores y probabilidades por etapa.
- Registrar motivo de pérdida, pausa o descalificación.
- Asociar varios contactos, empresas y productos a una oportunidad.
- Registrar historial de etapas, usuario, fecha y duración.
- Ofrecer vistas Kanban y tabla.
- Incorporar edición masiva con permisos y confirmaciones.

### 3.3 Actividades y seguimiento

- Unificar tareas, llamadas, reuniones, notas y seguimientos.
- Vincular cada actividad con empresa, contacto y oportunidad.
- Detectar tareas vencidas.
- Crear tareas recurrentes y recordatorios.
- Generar alertas por inactividad de leads.
- Incorporar plantillas de seguimiento.
- Ofrecer agenda diaria, semanal y mensual.
- Registrar la próxima mejor acción por oportunidad.
- Preparar sincronización con calendarios externos.

### 3.4 Captación desde la web pública

- Conectar los formularios públicos con el backend.
- Crear automáticamente un lead en el CRM.
- Guardar:
  - Nombre.
  - Empresa.
  - Email.
  - Teléfono.
  - Industria.
  - Tamaño de empresa.
  - Necesidad principal.
  - Página de origen.
  - Fuente, medio, campaña y parámetros UTM.
- Evitar leads duplicados por email o teléfono.
- Diferenciar la intención de cada formulario:
  - Solicitud de demo.
  - Solicitud de cotización.
  - Auditoría.
  - Contacto con ventas.
  - Soporte.
  - Descarga de recursos.
- Incorporar validación server-side y protección anti-spam.
- Mostrar estados de carga, éxito, error y reintento.
- Enviar confirmación al visitante.
- Notificar al equipo comercial.
- Crear una página de agradecimiento con siguiente paso claro.

### 3.5 Criterio de salida de la Fase I

- Un visitante puede completar un formulario y crear un lead real.
- El lead queda asociado a su fuente y workspace.
- Un vendedor puede convertirlo en oportunidad.
- La oportunidad puede avanzar por las etapas del pipeline.
- El vendedor puede programar seguimientos y registrar interacciones.
- El manager puede consultar el pipeline y el forecast sin hojas externas.
- Todos los cambios relevantes quedan auditados.

## 4. Fase II — Integraciones y canales

**Prioridad:** Media  
**Objetivo:** centralizar las comunicaciones y registrar automáticamente las
interacciones en el CRM.

### 4.1 WhatsApp Business

- Conectar la API oficial de WhatsApp Business por workspace.
- Mantener el webhook de verificación y validación de firma.
- Recibir y enviar mensajes desde el sistema central.
- Registrar estados:
  - Enviado.
  - Entregado.
  - Leído.
  - Fallido.
- Vincular automáticamente los mensajes con el contacto y la empresa correctos.
- Soportar plantillas aprobadas por Meta.
- Controlar la ventana de atención de 24 horas.
- Gestionar imágenes, audio, documentos y otros archivos.
- Mostrar errores del proveedor y permitir su reparación.
- Permitir reconexión y rotación segura de credenciales.
- Diferenciar claramente demo, sandbox y producción.

### 4.2 Correo electrónico

- Centralizar recepción y envío mediante SMTP/IMAP o una API de correo.
- Registrar emails en la ficha 360° del contacto.
- Implementar bandeja compartida por equipo.
- Incorporar plantillas con variables y versionado.
- Registrar entrega, rebote, respuesta y error.
- Gestionar consentimiento, bajas y preferencias.
- Soportar adjuntos con límites documentados.
- Permitir configuración y credenciales por workspace cuando corresponda.

### 4.3 Webhooks y formularios externos

- Crear endpoints para recibir leads y eventos de plataformas externas.
- Validar firma, token, origen y estructura del payload.
- Normalizar datos antes de crear o actualizar registros.
- Aplicar deduplicación e idempotencia.
- Responder con estados claros y errores accionables.
- Registrar cada recepción en logs de auditoría.
- Permitir reintentos seguros ante errores temporales.

### 4.4 Bandeja unificada

- Unificar WhatsApp, email, llamadas y notas internas.
- Asignar conversaciones a usuarios o equipos.
- Incorporar estados:
  - Abierta.
  - Pendiente.
  - Resuelta.
  - Archivada.
- Agregar etiquetas, prioridades, filtros y menciones internas.
- Medir tiempo de primera respuesta y resolución.
- Configurar notificaciones.
- Mostrar el historial completo en la ficha del cliente.

### 4.5 Automatizaciones y tareas en segundo plano

- Automatizar la asignación de leads.
- Ejecutar tareas de mantenimiento.
- Enviar notificaciones programadas.
- Procesar eventos con reintentos y backoff.
- Evitar acciones duplicadas mediante idempotencia.
- Permitir cancelar o reintentar ejecuciones.
- Guardar logs por ejecución y por nodo.
- Mostrar estados pendiente, ejecutando, completado, fallido y cancelado.
- Alertar ante fallos repetidos.

### 4.6 Criterio de salida de la Fase II

- Un usuario puede responder a un contacto desde el CRM.
- El resultado de cada envío es visible.
- Las conversaciones se vinculan automáticamente al contacto correcto.
- Los errores de proveedor son visibles y reparables.
- Los mensajes y emails aparecen en el historial unificado.
- Los webhooks externos no crean duplicados ante reintentos.

## 5. Fase III — ERP, e-commerce y portal de clientes

**Prioridad:** Estratégica  
**Objetivo:** ampliar Clientum hacia una plataforma completa de operación,
autoservicio y medición comercial.

### 5.1 Sincronización ERP y e-commerce

- Sincronizar bidireccionalmente inventario y catálogo.
- Mantener productos, variantes, precios y disponibilidad.
- Actualizar estados de pedidos en tiempo real.
- Mostrar el estado de cada pedido al cliente.
- Importar comprobantes de pago y facturación.
- Conciliar pagos y pedidos.
- Registrar errores de sincronización.
- Mostrar fecha del último sync, estado y acción de reparación.
- Mantener auditoría de cada cambio proveniente de sistemas externos.

### 5.2 Portal privado de clientes

- Crear un área autenticada para clientes.
- Permitir consultar:
  - Consultas.
  - Presupuestos.
  - Oportunidades compartidas.
  - Pedidos.
  - Pagos.
  - Facturas.
  - Documentos.
  - Guías técnicas.
- Permitir descargar documentación autorizada.
- Incorporar permisos por empresa, usuario y tipo de documento.
- Mantener historial de solicitudes y comunicaciones.
- Agregar canal de atención y preguntas frecuentes.
- Evitar que un cliente pueda acceder a información de otro workspace.

### 5.3 SEO avanzado y experiencia pública

- Migrar progresivamente de URLs hash a URLs reales.
- Crear títulos y descripciones únicos por página.
- Configurar canonical, Open Graph y Twitter/X Cards.
- Crear `sitemap.xml` y `robots.txt`.
- Incorporar datos estructurados:
  - `Organization`.
  - `SoftwareApplication`.
  - `Product`.
  - `FAQPage`.
  - `Article`.
- Crear landing pages para campañas.
- Publicar casos de éxito y testimonios verificables.
- Mejorar catálogo con filtros de búsqueda.
- Optimizar rendimiento en dispositivos móviles.
- Medir conversiones, abandonos y fuentes de tráfico.
- Mantener el contenido en español argentino y con claims verificables.

### 5.4 Analítica comercial

- Calcular conversión por etapa, canal y vendedor.
- Calcular tiempo promedio por etapa y velocidad del pipeline.
- Proyectar ingresos mediante forecast ponderado.
- Medir negocios ganados, perdidos, estancados y renovaciones.
- Registrar primera y última interacción.
- Asociar leads con campaña, UTM, formulario y referrer.
- Permitir filtros por fecha, pipeline, equipo, segmento y propietario.
- Exportar reportes.
- Mostrar fecha de actualización y fuente de datos.
- Programar reportes y compartirlos según permisos.

### 5.5 Criterio de salida de la Fase III

- El catálogo e inventario se mantienen sincronizados.
- Los pedidos y pagos tienen estados consistentes.
- El cliente puede consultar su información sin intervención manual.
- Los documentos y facturas se descargan con permisos correctos.
- El negocio puede medir el origen, conversión y valor de sus oportunidades.
- El sitio público es indexable, compartible y medible.

## 6. Reglas transversales de implementación

### 6.1 Seguridad y aislamiento

- Derivar el workspace desde la identidad autenticada en el servidor.
- No aceptar un `tenantId` arbitrario desde el cliente.
- Mantener separadas las credenciales de plataforma y de workspace.
- Nunca exponer secretos en el navegador, `localStorage`, documentación o logs.
- Validar permisos en backend para cada operación sensible.
- Aplicar validación de entrada, límites y protección contra abuso.

### 6.2 Estado real de las integraciones

- No considerar conectado un proveedor solo porque existe en el catálogo o hay
  una variable de entorno configurada.
- Diferenciar siempre:
  - Disponible.
  - En configuración.
  - Demo o simulación.
  - Sandbox.
  - Producción.
  - Error.
- Mostrar estado de conexión, último sync, último error y acción de reparación.
- No presentar simulaciones como envíos, cobros, sincronizaciones o emisiones
  reales.

### 6.3 Persistencia y observabilidad

- Las funciones comerciales deben persistir en PostgreSQL y respetar el tenant.
- Los cambios y llamadas externas deben tener trazabilidad.
- Los procesos asíncronos deben soportar reintentos e idempotencia.
- Los errores deben ser accionables y visibles para el usuario.
- Las importaciones deben poder revisarse y revertirse.

### 6.4 Experiencia y calidad

- Soportar desktop, tablet y móvil.
- Implementar estados de carga, vacío, error y éxito.
- Mantener accesibilidad de teclado y lector de pantalla.
- Validar formularios en cliente y servidor.
- Usar terminología consistente en español argentino.
- Probar el flujo principal de cada módulo antes de marcarlo como consolidado.

## 7. Definition of Done general

Una funcionalidad se considera terminada cuando:

- [ ] Tiene UI usable en desktop y móvil.
- [ ] Tiene persistencia real y aislamiento por workspace.
- [ ] Tiene estados de carga, vacío, error y éxito.
- [ ] Tiene permisos definidos.
- [ ] Tiene validaciones de entrada y feedback claro.
- [ ] Tiene logs o trazabilidad cuando modifica datos o llama servicios externos.
- [ ] Tiene reintentos e idempotencia si depende de una integración.
- [ ] Tiene verificación manual o automatizada del flujo principal.
- [ ] Está documentada como conectada, parcial, catalogada o simulada.

## 8. Orden recomendado de ejecución

1. Validar aislamiento multi-tenant, autenticación, permisos y calidad de datos.
2. Completar la persistencia del CRM y el pipeline de ventas.
3. Conectar los formularios públicos y crear leads reales.
4. Consolidar tareas, actividades, seguimiento y métricas básicas.
5. Implementar WhatsApp, email y webhooks con trazabilidad.
6. Conectar el motor de automatizaciones con ejecución backend durable.
7. Implementar sincronización ERP/e-commerce y conciliación de pagos.
8. Construir el portal privado de clientes.
9. Completar SEO técnico, landing pages y atribución.
10. Ampliar analítica, forecast, reportes y autoservicio.

## 9. Documentos relacionados

- [Roadmap funcional del CRM](docs/CRM_ROADMAP.md)
- [Integraciones y configuración del runtime](docs/INTEGRATIONS.md)
- [Roadmap del sitio público](docs/PUBLIC_SITE_ROADMAP.md)
