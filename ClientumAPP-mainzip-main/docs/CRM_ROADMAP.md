# ClientumCRM — Roadmap funcional

Roadmap para evolucionar ClientumCRM desde una suite con muchos módulos hacia un
CRM profesional, confiable y orientado a resultados comerciales.

> **Principio rector:** primero completar flujos de punta a punta; después sumar
> más módulos. Una funcionalidad conectada, medible y confiable vale más que
> varias pantallas aisladas.

---

## Auditoría técnica del estado

**Fecha:** 2026-09-08
**Alcance:** código fuente, rutas del servidor, repositorio PostgreSQL,
componentes CRM, smoke tests de credenciales y navegación, `npm run lint` y
`npm run build`. No se consideraron verificadas las integraciones externas,
la disponibilidad de proveedores ni datos de producción.

### Hallazgos principales

- El núcleo CRM tiene persistencia real para oportunidades, empresas, personas,
  tareas y actividades mediante PostgreSQL, con `tenant_id` derivado de la
  identidad autenticada. Las credenciales de workspace se guardan separadas y
  el smoke test de aislamiento de credenciales pasa.
- La calidad de datos ya tiene UI y endpoints para detectar y resolver
  duplicados, registrar batches de importación y deshacer una importación. La
  validación de CSV existe, pero el flujo completo aún mezcla estado local con
  persistencia remota y no cubre archivado ni un historial completo por registro.
- El pipeline Kanban, la tabla, empresas, contactos, tareas, actividades,
  dashboard, roles y constructor visual están implementados. El calendario y
  varios módulos de operaciones funcionan principalmente como estado de la
  aplicación o `localStorage`, por lo que no deben contarse como flujos
  persistentes completos.
- Hay auditoría server-side, evidencia y auditoría de cambios de IA,
  endpoints protegidos para email, pagos, IA y tareas de agentes, y verificación
  de firma/token para el webhook de WhatsApp. Eso no demuestra sincronización,
  envío, cobro, ejecución de workflow ni emisión productiva de un proveedor.
- El editor de workflows ejecuta una simulación secuencial en el navegador. La
  cola durable de tareas de Agent OS existe, pero no está conectada a un motor
  que ejecute los nodos del editor con reintentos e idempotencia.
- `npm run lint` y `npm run build` pasan. El smoke test de navegación valida
  autenticación y redirecciones, pero falla al buscar el botón interno
  `Calendario`, cuya etiqueta actual es `Calendario comercial`; el smoke test
  de aislamiento de credenciales pasa.

Los estados de este documento se actualizaron con esa evidencia. `[x]` significa
presencia verificable y suficientemente consolidada en el código; `[-]` significa
implementación parcial o local; `[!]` significa que hace falta una decisión o
validación externa; `[ ]` significa que no se encontró el flujo requerido.

---

## Cómo usar este roadmap

### Estados

- `[ ]` Pendiente
- `[-]` En progreso o parcialmente disponible
- `[x]` Consolidado
- `[!]` Requiere decisión, proveedor o definición de negocio

### Prioridades

- **P0 — Crítico:** necesario para que el CRM sea confiable y operable.
- **P1 — Alto:** mejora directamente ventas, productividad o retención.
- **P2 — Medio:** diferencia el producto y amplía casos de uso.
- **P3 — Futuro:** expansión después de estabilizar el núcleo.

### Definition of Done general

Una funcionalidad se considera terminada cuando:

- [ ] Tiene UI usable en desktop y móvil.
- [ ] Tiene persistencia real y aislamiento por workspace.
- [ ] Tiene estados de carga, vacío, error y éxito.
- [ ] Tiene permisos definidos.
- [ ] Tiene validaciones de entrada y feedback al usuario.
- [ ] Tiene logs o trazabilidad cuando modifica datos o llama servicios externos.
- [ ] Tiene manejo de reintentos y errores si depende de una integración.
- [ ] Tiene una verificación manual o automatizada del flujo principal.
- [ ] Está documentada como conectada, parcial o catalogada.

---

## Estado actual resumido

### Base disponible

- [x] Pipeline visual de oportunidades.
- [x] Vista de oportunidades en tabla.
- [x] Empresas y contactos.
- [x] Tareas y actividades.
- [x] Dashboard ejecutivo con KPIs, gráficos y pipeline.
- [x] Objetos personalizados.
- [x] Importación y exportación CSV.
- [x] Constructor visual de workflows.
- [x] Centro de funciones con catálogo de módulos.
- [x] Configuración separada entre credenciales de workspace y secretos de plataforma.
- [x] Autenticación y configuración de usuarios.
- [x] Persistencia PostgreSQL del núcleo CRM con aislamiento por tenant.
- [x] Revisión de duplicados e importaciones reversibles.
- [x] Auditoría server-side, evidencia de registros y auditoría de cambios de IA.

### Parcial o pendiente de consolidación

- [-] WhatsApp: interfaz disponible; validar conexión productiva, webhooks,
  plantillas, entrega, persistencia de conversaciones y trazabilidad.
- [-] Gmail/email: interfaz y servicios disponibles; completar sincronización,
  historial por contacto y estados de entrega.
- [-] IA: copilot y módulos generativos disponibles; agregar grounding,
  permisos, aprobación humana y métricas de utilidad.
- [-] Workflows: editor visual disponible; completar ejecución backend,
  conexión con la cola durable, reintentos, logs y acciones reales.
- [-] Mercado Pago: checkout y estados disponibles; completar configuración
  por workspace, webhooks y conciliación.
- [-] AFIP/ERP: módulos disponibles; separar claramente homologación,
  producción, emisión real y auditoría fiscal.
- [-] Operaciones/portal del cliente: UI disponible en estado local; completar
  autenticación externa, permisos y persistencia de tickets/documentos.
- [-] Reportes: dashboard disponible; ampliar filtros, forecast, atribución y
  exportaciones.

### Regla de producto

- [ ] No presentar como “integrado” un proveedor que solo aparece en el
  catálogo o tiene una pantalla de configuración.
- [ ] No considerar una simulación como envío, cobro, sincronización o emisión
  real.
- [ ] Mostrar siempre el estado de conexión, último sync, último error y acción
  de reparación.

---

# Fase 0 — Fundaciones y calidad de datos

**Prioridad:** P0  
**Objetivo:** hacer que todo lo que se construya después sea seguro, medible y
persistente.

## 0.1 Modelo multi-workspace

- [-] Confirmar aislamiento de oportunidades, empresas, contactos, tareas y
  actividades por workspace; archivos todavía no forman parte del repositorio
  CRM persistente.
- [-] Definir owner y miembros mediante membresías y usuarios; equipos y reglas
  de pertenencia por registro todavía no están consolidados.
- [x] Evitar que una API key o credencial de un workspace pueda utilizarse en
  otro mediante almacenamiento y lectura tenant-scoped.
- [x] Resolver el workspace server-side desde la identidad autenticada, sin
  aceptar un `tenantId` arbitrario del cliente.
- [ ] Crear datos de prueba automatizados para dos workspaces independientes.

## 0.2 Calidad y gobierno de datos

- [x] Detección de contactos duplicados por email y teléfono, y de empresas por
  dominio y nombre.
- [-] Flujo para fusionar registros; existe resolución tenant-scoped, pero la
  conservación completa del historial relacionado todavía no está verificada.
- [-] Validación de email y teléfono en CSV; faltan reglas uniformes para todos
  los formularios y valores por defecto seguros durante la importación.
- [ ] Campos obligatorios configurables por pipeline y etapa.
- [ ] Archivado de registros sin eliminarlos físicamente.
- [-] Historial de cambios: hay auditoría server-side y logs de UI, pero no una
  vista completa de historial por registro.
- [x] Deshacer una importación reciente mediante batch reversible y endpoint
  tenant-scoped.

## 0.3 Búsqueda y rendimiento

- [ ] Búsqueda global de empresas, personas, negocios, tareas y actividades.
- [-] Filtros persistentes por usuario mediante vistas guardadas en
  `localStorage`; todavía no son persistencia por workspace.
- [ ] Paginación o carga incremental para listas grandes.
- [-] Estados de carga, vacío y error: existen en varias vistas, pero no hay
  cobertura uniforme.
- [-] Índices y medición para búsquedas y filtros frecuentes; la base existe,
  pero no hay verificación de rendimiento ni cobertura completa.
- [ ] Medición de tiempos de carga del dashboard.

### Criterio de salida de la Fase 0

- [ ] Dos workspaces pueden operar simultáneamente sin cruzar datos.
- [ ] Una importación con duplicados puede ser revisada, corregida y revertida.
- [ ] La búsqueda global responde de forma consistente con datos reales.

---

# Fase 1 — Núcleo comercial profesional

**Prioridad:** P0/P1  
**Objetivo:** cubrir el flujo completo desde lead hasta cierre y renovación.

## 1.1 Pipeline y oportunidades

- [ ] Crear múltiples pipelines por producto, equipo o unidad de negocio.
- [ ] Personalizar etapas, colores y probabilidades.
- [ ] Configurar reglas obligatorias por etapa.
- [ ] Registrar motivo de pérdida.
- [ ] Registrar motivo de pausa o descalificación.
- [ ] Soportar negocios de renovación y expansión.
- [ ] Asociar varios contactos a un negocio.
- [ ] Asociar productos, servicios y líneas de negocio.
- [ ] Agregar historial de etapas con fecha, usuario y duración.
- [ ] Mostrar tiempo promedio por etapa.
- [-] Agregar vista Kanban, tabla, calendario y forecast: Kanban, tabla y
  forecast ponderado existen; calendario todavía es una vista separada y no
  hay forecast configurable.
- [-] Permitir edición masiva segura: la tabla tiene acciones masivas, pero
  faltan permisos y confirmaciones verificadas para cada operación.

## 1.2 Actividades y agenda

- [ ] Tareas recurrentes.
- [ ] Recordatorios por email, WhatsApp o notificación interna.
- [-] Agenda diaria, semanal y mensual: existe calendario comercial, pero su
  integración y navegación no están cubiertas por el smoke test.
- [x] Actividades vinculadas a empresa, persona y oportunidad.
- [x] Registro de llamadas y reuniones como actividades del CRM.
- [ ] Plantillas de seguimiento.
- [x] Detección de tareas vencidas.
- [ ] Próxima mejor acción por oportunidad.
- [-] Sincronización bidireccional con Google Calendar: hay configuración y
  acción de sincronización en la UI, pero no se verificó una conexión externa.
- [ ] Soporte para Microsoft Calendar como alternativa.

## 1.3 Ficha 360° de empresa y contacto

- [-] Timeline de actividades, llamadas, reuniones y tareas; email y WhatsApp
  todavía no quedan unificados de forma productiva.
- [ ] Jerarquías de empresa, sucursales y unidades.
- [ ] Roles de contacto dentro de la decisión de compra.
- [ ] Campos personalizados por tipo de registro.
- [ ] Segmentos dinámicos.
- [-] Notas internas vinculadas al registro; faltan menciones y permisos
  específicos.
- [ ] Archivos y documentos asociados.
- [-] Vista de salud comercial y última interacción: hay datos de salud y
  actividad en módulos separados, sin ficha 360 consolidada.

### Criterio de salida de la Fase 1

- [ ] Un vendedor puede crear un lead, convertirlo en oportunidad, avanzar
  etapas, programar seguimiento, cerrar el negocio y consultar todo el
  historial desde una sola ficha.
- [ ] Un manager puede revisar forecast, negocios estancados y actividad del
  equipo sin usar hojas externas.

---

# Fase 2 — Comunicación omnicanal

**Prioridad:** P0/P1  
**Objetivo:** centralizar las conversaciones y evitar que la información quede
fuera del CRM.

## 2.1 Bandeja unificada

- [-] Unificar WhatsApp, email, llamadas y notas internas en módulos separados;
  SMS y una bandeja omnicanal única todavía no existen.
- [ ] Asignar conversaciones a usuarios o equipos.
- [ ] Estados: abierta, pendiente, resuelta y archivada.
- [ ] Etiquetas y filtros por prioridad.
- [-] Respuestas guardadas: hay plantillas de email y WhatsApp, pero no una
  bandeja compartida con respuestas y asignación.
- [ ] Menciones internas.
- [-] Historial parcial por contacto mediante actividades; falta sincronizar
  conversaciones externas.
- [ ] SLA de primera respuesta y resolución.
- [ ] Notificaciones configurables.

## 2.2 WhatsApp productivo

- [ ] Conectar WhatsApp Cloud API por workspace.
- [x] Validar webhook de entrada con verify token y firma HMAC de Meta.
- [ ] Registrar estado enviado, entregado, leído y fallido.
- [-] Soportar plantillas aprobadas: existe UI de plantillas, pero no está
  conectada a la API de envío ni a una aprobación del proveedor.
- [ ] Controlar ventanas de 24 horas.
- [ ] Gestionar archivos, imágenes, audio y documentos.
- [-] Registrar errores del proveedor: el webhook rechaza firmas/payloads
  inválidos, pero no existe trazabilidad completa de entrega.
- [ ] Permitir reconexión y rotación segura de credenciales.
- [-] Separar claramente simulador, sandbox y producción: el simulador público
  está separado, pero faltan estados de conexión y entorno por workspace.

## 2.3 Email productivo

- [-] SMTP está protegido por backend y tiene endpoint de envío; OAuth,
  configuración por workspace y estados operativos todavía no están completos.
- [ ] Sincronización de conversaciones.
- [-] Registro automático en la ficha del contacto: el envío vinculado crea una
  actividad local, pero no hay sincronización de conversaciones.
- [-] Plantillas con variables: hay plantillas de composición, sin sistema
  completo de variables y versionado.
- [ ] Seguimiento de entrega, rebote y respuesta.
- [ ] Control de bajas y consentimiento.
- [ ] Bandeja compartida por equipo.
- [-] Adjuntos y límites documentados: el envío explícitamente rechaza adjuntos
  reales hasta conectar almacenamiento.

## 2.4 SMS y llamadas

- [!] Elegir proveedor soportado.
- [ ] Guardar credenciales por workspace sin exponerlas.
- [ ] Envío real con estado de entrega.
- [ ] Plantillas y límites.
- [-] Registro de llamada, duración y resultado como actividad manual; grabación
  y proveedor de telefonía todavía no están conectados.

### Criterio de salida de la Fase 2

- [ ] Un usuario puede responder a un contacto desde el CRM y ver el resultado
  del envío.
- [ ] Cada conversación queda vinculada automáticamente al contacto y empresa
  correctos.
- [ ] Los errores de proveedor son visibles y reparables.

---

# Fase 3 — Automatización y workflows

**Prioridad:** P0/P1  
**Objetivo:** automatizar tareas repetitivas sin perder control ni trazabilidad.

## 3.1 Motor de ejecución

- [-] Ejecutar workflows desde backend: existe una cola durable de tareas de
  Agent OS, pero el editor visual todavía no la dispara ni ejecuta sus nodos.
- [ ] Triggers por creación, actualización y cambio de etapa.
- [ ] Triggers por fecha, tarea vencida, formulario y webhook.
- [-] Condiciones `if/else`: disponibles en la definición visual, no en un
  motor productivo.
- [-] Delays y ventanas horarias: simulables en la UI, no ejecutados por
  backend.
- [ ] Acciones de crear, editar, asignar y notificar.
- [ ] Acciones de email, WhatsApp y webhook.
- [-] Reintentos con backoff: la cola durable tiene intentos máximos, pero no
  constituye todavía ejecución de workflows.
- [ ] Idempotencia para evitar acciones duplicadas.
- [ ] Cancelación de una ejecución.

## 3.2 Observabilidad

- [-] Historial de ejecuciones y logs por nodo: la simulación muestra logs
  locales, sin historial persistente de ejecuciones reales.
- [-] Estado: pendiente, ejecutando, completado, fallido y cancelado en la cola
  de tareas, no todavía en el editor de workflows.
- [ ] Mensaje de error accionable.
- [ ] Botón para reintentar una ejecución fallida.
- [ ] Métricas de workflows activos y fallidos.
- [ ] Alertas ante fallos repetidos.

## 3.3 Secuencias comerciales

- [ ] Cadencias de seguimiento.
- [ ] Pausar si el contacto responde.
- [ ] Pausar si el negocio cambia de etapa.
- [ ] Variables dinámicas.
- [ ] Límites diarios de envío.
- [ ] Horarios comerciales.
- [ ] Control de consentimiento y bajas.

### Criterio de salida de la Fase 3

- [ ] Un workflow puede ejecutarse en producción con logs completos.
- [ ] Una falla no genera duplicados ni queda silenciosa.
- [ ] El usuario puede entender qué ocurrió y corregirlo.

---

# Fase 4 — Analítica, forecast y atribución

**Prioridad:** P1  
**Objetivo:** convertir los datos del CRM en decisiones comerciales.

## 4.1 Reportes comerciales

- [-] Conversión por etapa y vendedor: hay conteos y leaderboard, pero no
  reportes históricos ni filtros configurables.
- [ ] Tiempo por etapa.
- [ ] Velocidad del pipeline.
- [x] Forecast ponderado calculado desde monto y probabilidad.
- [x] Ingresos ganados, perdidos y pendientes en el dashboard.
- [x] Ticket promedio y win rate calculados en Analytics.
- [-] Actividad por usuario: hay actividad y objetivos en widgets, sin reporte
  configurable por período.
- [ ] Negocios estancados.
- [ ] Renovaciones próximas.

## 4.2 Marketing y atribución

- [ ] Fuente original del lead.
- [ ] Primera y última interacción.
- [ ] Campaña y UTM.
- [ ] Formulario de origen.
- [ ] Costo por lead.
- [ ] Costo por oportunidad.
- [ ] Ingreso atribuido.
- [ ] Comparación de canales.

## 4.3 Experiencia de reportes

- [-] Dashboard ejecutivo disponible; todavía no es configurable por usuario.
- [ ] Filtros por fecha, pipeline, equipo, segmento y propietario.
- [-] Guardar vistas en `localStorage`; falta persistencia por workspace.
- [-] Exportar CSV y PDF: hay exportaciones CSV, no exportación PDF.
- [ ] Compartir reportes con permisos.
- [ ] Programar reportes por email.
- [ ] Mostrar fecha de actualización y fuente de datos.

### Criterio de salida de la Fase 4

- [ ] Un manager puede responder cuánto pipeline existe, qué tan probable es
  cerrarlo, qué canal lo generó y qué vendedor necesita ayuda.

---

# Fase 5 — Customer Success y portal del cliente

**Prioridad:** P1/P2  
**Objetivo:** extender el CRM después de la venta y reducir churn.

## 5.1 Customer Success

- [-] Health score visible in company data; no score configurable from a
  persistent customer-success model.
- [ ] Onboarding por etapas.
- [ ] Tareas de implementación.
- [ ] Renovaciones.
- [ ] Expansiones y upsell.
- [ ] Alertas de riesgo.
- [ ] NPS o satisfacción.
- [ ] Historial de soporte.
- [ ] SLA por cliente.

## 5.2 Tickets

- [-] Crear y operar tickets desde una vista de operaciones local; no existe
  todavía un portal externo ni entrada automática por email/WhatsApp.
- [ ] Asignar equipo y responsable.
- [-] Prioridad, categoría y estados en la UI local; faltan SLA persistentes.
- [ ] Comentarios internos y externos.
- [ ] Adjuntos.
- [ ] Historial de cambios.
- [ ] Métricas de resolución.

## 5.3 Portal externo

- [ ] Login independiente para clientes.
- [ ] Permisos por empresa.
- [-] Visualización de tickets: existe una vista interna de operaciones, no un
  portal autenticado para clientes.
- [ ] Propuestas y documentos.
- [ ] Facturas y pagos.
- [ ] Mensajes.
- [ ] Auditoría de accesos.

---

# Fase 6 — Seguridad, permisos e integraciones

**Prioridad:** P0/P1  
**Objetivo:** preparar el producto para equipos y clientes empresariales.

## 6.1 Seguridad

- [-] Roles por módulo y acción: existe una matriz editable en la UI, pero su
  enforcement server-side no está verificado para todos los endpoints.
- [ ] Permisos por equipo, territorio o registro.
- [ ] MFA.
- [ ] SSO.
- [ ] Revocación de sesiones.
- [-] Rotación de credenciales: existe gestión/revocación de API keys, pero no
  rotación general de todos los proveedores.
- [-] Auditoría de accesos y cambios: hay logs server-side tenant-scoped y
  auditoría local exportable, sin cobertura de acceso completa.
- [ ] Políticas de retención.
- [ ] Exportación y eliminación de datos.
- [ ] Consentimiento de comunicaciones.
- [x] Revisión de secretos y variables de entorno: los secretos de plataforma
  permanecen en backend y la configuración pública de Firebase se filtra de
  forma explícita al cliente.

## 6.2 API y webhooks

- [ ] API versionada.
- [-] API keys por usuario y workspace con revocación; faltan scopes y una API
  pública versionada.
- [ ] Scopes mínimos.
- [ ] Rate limiting.
- [ ] Idempotency keys.
- [-] Webhooks salientes y prueba manual disponibles en el hub; faltan delivery
  logs y una política completa de reintentos.
- [x] Firma de webhook entrante validada para WhatsApp.
- [ ] Reintentos y delivery logs.
- [ ] Documentación OpenAPI.

## 6.3 Integraciones prioritarias

- [ ] Google Calendar.
- [-] Gmail/Outlook: SMTP permite envío backend, sin OAuth ni sincronización.
- [-] WhatsApp Cloud API: webhook verificado, sin flujo completo de envío,
  recepción persistida y estados de entrega.
- [-] Mercado Pago: checkout, estado y webhook existen; falta verificación
  productiva y conciliación por workspace.
- [ ] AFIP.
- [-] Google Maps: endpoint de prospecting usa credencial server-side del
  workspace, sin convertirlo en integración CRM completa.
- [ ] Slack o Microsoft Teams.
- [ ] Make/Zapier/n8n mediante conexión segura.
- [ ] Shopify o Tiendanube según el foco comercial.

### Criterio de salida de la Fase 6

- [ ] Un administrador puede controlar quién ve, modifica y exporta cada tipo
  de dato.
- [ ] Las integraciones tienen estado, logs, scopes y recuperación de errores.

---

# Fase 7 — IA comercial confiable

**Prioridad:** P1/P2  
**Objetivo:** usar IA para mejorar decisiones y productividad, con control humano.

## 7.1 Copilot contextual

- [-] Resumir y asistir sobre registros: existe copilot y endpoints generativos,
  pero no hay grounding completo ni fuentes visibles.
- [-] Recomendar próxima acción y detectar negocios estancados mediante módulos
  de IA; falta validación contra datos reales y métricas de utilidad.
- [-] Preparar emails contextualizados.
- [ ] Resumir conversaciones.
- [ ] Consultar métricas con permisos del usuario.
- [ ] Mostrar las fuentes utilizadas.

## 7.2 Scoring e inteligencia

- [ ] Score basado en datos reales del CRM.
- [ ] Explicar por qué subió o bajó un score.
- [ ] Detectar riesgo de churn.
- [ ] Predecir probabilidad de cierre.
- [ ] Detectar intención en conversaciones.
- [ ] Sugerir cuentas similares a clientes exitosos.

## 7.3 Seguridad de IA

- [ ] Aprobación humana antes de enviar mensajes.
- [-] No enviar datos fuera del workspace sin consentimiento: las rutas están
  protegidas, pero no hay control de consentimiento configurable.
- [x] Registrar cambios sensibles de IA con actor, antes/después, motivo y
  evidencia asociada.
- [ ] Ocultar secretos y datos sensibles.
- [ ] Permitir desactivar IA por workspace.
- [-] Mostrar errores de configuración de forma explícita en varias rutas; los
  módulos con fallback todavía pueden ocultar la falta de proveedor.

---

# Backlog futuro

**Prioridad:** P2/P3

- [ ] Aplicación móvil.
- [ ] Modo offline para tareas y contactos.
- [ ] Telefonía integrada.
- [ ] Grabación y transcripción de llamadas.
- [ ] Marketplace de integraciones.
- [ ] Multi-moneda avanzada.
- [ ] Gestión de productos y catálogo.
- [ ] Comisiones de vendedores.
- [ ] CPQ y firma electrónica.
- [ ] Contratos y renovaciones avanzadas.
- [ ] White-label.
- [ ] Multi-región y multi-idioma ampliado.

---

# Orden recomendado de ejecución

## Próximos 30 días

- [-] Completar aislamiento por workspace: el núcleo persistente está aislado,
  pero faltan archivos, equipos y pruebas automatizadas entre tenants.
- [-] Terminar deduplicación y calidad de datos: duplicados e importaciones
  reversibles están disponibles; faltan archivado e historial completo.
- [ ] Consolidar ficha 360° de empresa y contacto.
- [-] Definir permisos mínimos por módulo: la matriz existe, pero falta
  enforcement server-side uniforme.
- [-] Completar estados de error y conexión de integraciones actuales.

## Días 31–60

- [-] Hacer productivo el motor de workflows: el editor y la cola existen,
  pero todavía no están conectados.
- [ ] Terminar bandeja omnicanal.
- [-] Completar WhatsApp y email con trazabilidad.
- [-] Agregar Google Calendar: hay UI y estado local, falta conexión verificada.
- [ ] Implementar secuencias comerciales básicas.

## Días 61–90

- [-] Forecast profesional: existe forecast ponderado básico, no el modelo
  configurable e histórico requerido.
- [ ] Atribución de marketing.
- [-] Reportes configurables y exportables: CSV y dashboard existen, falta PDF,
  filtros y programación.
- [-] Customer Success y tickets: hay UI local, sin persistencia y SLA
  completos.
- [ ] Portal del cliente inicial.

## Después de 90 días

- [ ] SSO y MFA.
- [ ] API pública versionada.
- [ ] Marketplace de integraciones.
- [ ] IA comercial basada en datos reales.
- [ ] Aplicación móvil.

---

# Métricas de éxito del producto

- [ ] Tiempo desde alta de lead hasta primera actividad.
- [ ] Porcentaje de oportunidades con próxima acción.
- [ ] Porcentaje de negocios estancados.
- [ ] Tiempo promedio por etapa.
- [ ] Win rate.
- [ ] Duración del ciclo de venta.
- [ ] Ingreso por vendedor.
- [ ] Tasa de respuesta de secuencias.
- [ ] Tiempo de primera respuesta omnicanal.
- [ ] Tasa de workflows exitosos.
- [ ] Tasa de duplicados detectados y resueltos.
- [ ] Usuarios activos semanalmente.
- [ ] Retención de clientes.
- [ ] Churn mensual.

---

# Checklist de release profesional

## Producto

- [ ] El flujo principal de ventas funciona de punta a punta.
- [ ] No hay botones que aparenten ejecutar acciones reales cuando solo simulan.
- [ ] Cada integración muestra su estado real.
- [ ] Todas las listas tienen búsqueda, filtros y estados vacíos.
- [ ] Las acciones destructivas piden confirmación.

## Datos

- [ ] Persistencia verificada después de cerrar sesión.
- [ ] Aislamiento entre workspaces verificado.
- [ ] Importación y exportación probadas con errores.
- [ ] Duplicados controlados.
- [ ] Historial de cambios disponible.

## Seguridad

- [x] Credenciales nunca aparecen completas después de guardarse.
- [x] Secretos solo se procesan en backend.
- [ ] API keys tienen scopes y revocación.
- [-] Permisos probados con distintos roles: la matriz está disponible, pero no
  hay cobertura de enforcement server-side completa.
- [x] Auditoría registra acciones sensibles en el servidor y en la UI local.

## Integraciones

- [ ] OAuth o credenciales revocadas muestran una reparación clara.
- [x] Webhook de WhatsApp valida firma y token de verificación.
- [ ] Reintentos no duplican operaciones.
- [-] Errores del proveedor quedan registrados: existen respuestas y logs de
  servidor, sin trazabilidad uniforme de todos los proveedores.
- [-] Sandbox y producción están diferenciados en el simulador público, pero no
  en todos los conectores internos.

## Calidad

- [x] `npm run lint` pasa.
- [x] `npm run build` pasa.
- [x] El workflow inicia correctamente.
- [ ] El preview carga sin errores de renderizado.
- [-] El dashboard funciona en desktop y tiene layout responsive en código; falta
  verificación manual completa en tablet y móvil.
- [ ] Se revisaron estados loading, empty, error y success.
