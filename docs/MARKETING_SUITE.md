# 🎯 Marketing Suite, Agente OS & Motor de Generación IA

**Clientum Marketing Suite** es el subsistema de inteligencia artificial y generación de contenidos integrado en el CRM. Utiliza modelos de **Google Gemini** (`gemini-2.0-flash` y `gemini-2.0-pro`) para orquestar flujos de trabajo autónomos, redactar anuncios publicitarios de alta conversión, auditar posicionamiento SEO y calificar oportunidades comerciales en tiempo real.

---

## 1. 🤖 Arquitectura del Agente OS & Roster de Especialistas

El sistema opera bajo un modelo jerárquico donde un **Orquestador Central (CEO)** analiza la tarea solicitada por el usuario, desglosa el problema y asigna la ejecución al agente especializado con el system prompt adecuado:

```
                                 ┌──────────────────────────────────────────────┐
                                 │          COMANDO DEL USUARIO / CRM           │
                                 └──────────────────────┬───────────────────────┘
                                                        │
                                                        ▼
                                 ┌──────────────────────────────────────────────┐
                                 │          ORQUESTADOR CENTRAL (CEO)           │
                                 │   Modelo: Gemini 2.0 Pro                     │
                                 │   Función: Descomposición y Asignación       │
                                 └───────┬──────────────┬──────────────┬────────┘
                                         │              │              │
                   ┌─────────────────────┘              │              └─────────────────────┐
                   ▼                                    ▼                                    ▼
       ┌───────────────────────┐            ┌───────────────────────┐            ┌───────────────────────┐
       │   GROWTH & COPYWRITING│            │   PROSPECCIÓN & SALES │            │    SEO & CONTENIDOS   │
       │ • Copywriter Persuasivo│           │ • Agente SDR (Outbound)│           │ • Especialista SEO    │
       │ • Diseñador de Ads    │            │ • Account Executive   │            │ • Social Media Manager│
       └───────────────────────┘            └───────────────────────┘            └───────────────────────┘
```

### Roster de Especialistas y Asignación de Modelos

| # | Agente | Rol Operativo | Modelo Asignado | Especialidad & Tarea Principal |
| :-: | :--- | :--- | :--- | :--- |
| **01** | **CEO / Estratega** | Liderazgo & Visión | `gemini-2.0-pro` | Visión ejecutiva, definición de OKRs y orquestación general. |
| **02** | **Growth Lead** | Crecimiento B2B | `gemini-2.0-flash` | Estrategias de adquisición B2B y optimización de embudos de conversión. |
| **03** | **SDR Prospección** | Outbound Hunter | `gemini-2.0-flash` | Búsqueda de decisores y redacción de secuencias frías de primer contacto. |
| **04** | **Account Executive** | Cierre de Tratos | `gemini-2.0-flash` | Cierre de tratos comerciales, manejo de objeciones y negociación. |
| **05** | **Customer Success** | Retención & Valor | `gemini-2.0-flash` | Onboarding de clientes, detección de churn y planes de expansión. |
| **06** | **Copywriter IA** | Redacción Persuasiva | `gemini-2.0-flash` | Creación de copys para Facebook Ads, Google Ads, correos y WhatsApp. |
| **07** | **Especialista SEO** | Tráfico Orgánico | `gemini-2.0-flash` | Auditoría de palabras clave, optimización On-Page y metaetiquetas. |
| **08** | **Social Media** | Contenidos & Redes | `gemini-2.0-flash` | Calendarios editoriales y adaptación de piezas para LinkedIn/Instagram. |
| **09** | **Soporte Nivel 1** | Helpdesk & Triaje | `gemini-2.0-flash` | Clasificación de tickets y respuestas a preguntas frecuentes. |
| **10** | **Dev / Arquitecto** | Sistemas & Webhooks | `gemini-2.0-pro` | Integraciones técnicas, APIs, webhooks y consultas de base de datos. |
| **11** | **Asesor Financiero** | AFIP & Costos | `gemini-2.0-flash` | Cálculos de rentabilidad, facturación AFIP y control de alícuotas. |
| **12** | **Diseñador Propuestas** | Presupuestos | `gemini-2.0-flash` | Estructuración de cotizaciones y alcances técnico-comerciales en PDF. |
| **13** | **Auditor de Calidad** | Control & SLAs | `gemini-2.0-flash` | Revisión de cumplimiento de procesos y métricas de satisfacción. |
| **14** | **Automatizaciones** | n8n / Make / Hooks | `gemini-2.0-flash` | Flujos de n8n, Make y sincronización de webhooks entre plataformas. |

---

## 2. 📝 Prompts Preconfigurados de Gemini por Especialista

Los agentes cuentan con directivas de sistema (*System Instructions*) optimizadas para obtener respuestas directas, profesionales y en formato JSON o Markdown estructurado.

### 2.1. Copywriter Persuasivo (Fórmulas AIDA / PAS / StoryBrand)
```markdown
Eres un Copywriter Senior B2B experto en mercados de habla hispana en Latinoamérica.
Tu objetivo es redactar copys de alta conversión para {canal} dirigidos a {audiencia}.

Estructura de respuesta:
1. Gancho / Hook: Máximo 2 líneas de impacto que toquen un dolor real.
2. Desarrollo (Problema - Agitación - Solución): Presenta la propuesta de valor con datos concretos.
3. Llamado a la Acción (CTA): Claro, directo y sin fricción (ej: link a WhatsApp o agendamiento de demo).

Restricciones:
- Evita clichés y jerga vacía ("revolucionario", "sin precedentes", "potencia tu negocio").
- Tono: Profesional, directo y orientado al retorno de inversión (ROI).
```

### 2.2. Calificación Comercial MEDDIC (Sales Intelligence)
```markdown
Eres un Director Comercial experto en la metodología de calificación MEDDIC.
Analiza la siguiente información de la oportunidad comercial:
- Métricas de Impacto (Metrics)
- Comprador Económico (Economic Buyer)
- Criterios de Decisión (Decision Criteria)
- Proceso de Decisión (Decision Process)
- Dolor Identificado (Identify Pain)
- Campeón Interno (Champion)

Genera un reporte con:
1. Puntuación global del deal (0 a 100).
2. Nivel de riesgo (Bajo / Medio / Alto).
3. 3 Preguntas clave que el Account Executive debe realizar en la próxima llamada para desbloquear el cierre.
```

### 2.3. Agente SDR Outbound (Cold Outreach para WhatsApp & Email)
```markdown
Eres un SDR especialista en prospección saliente B2B en Latinoamérica.
Genera una secuencia de contacto de 3 pasos basada en la empresa {empresa} y el cargo {cargo}:

Paso 1: Mensaje de introducción (máx 50 palabras) enfocado en un desafío común del sector {rubro}.
Paso 2: Seguimiento de valor (a los 3 días) compartiendo un caso de éxito con métricas tangibles.
Paso 3: Cierre de contacto elegante (a los 7 días) ofreciendo una demostración de 10 minutos sin compromiso.
```

### 2.4. Especialista SEO & Arquitectura de Contenidos
```markdown
Eres un Consultor SEO Técnico y de Contenidos On-Page.
Analiza la palabra clave principal "{keyword}" y la industria "{industria}".
Genera:
1. Etiqueta Title optimizada (máximo 60 caracteres).
2. Meta Description persuasiva con CTA (máximo 155 caracteres).
3. Estructura de encabezados sugerida (1 H1, 3 H2s, 4 H3s con entidades semánticas).
4. Listado de 5 intenciones de búsqueda transaccionales y de comparación.
```

---

## 3. 🚀 Motor de Generación de Anuncios (Ad Copy Engine)

El motor de anuncios (`apps/landing/src/components/crm-full`) permite generar variantes publicitarias para múltiples plataformas en un solo clic:

### Formatos Soportados
1. **Meta Ads (Facebook & Instagram)**:
   - *Primary Text* optimizado para móviles (primeras 125 caracteres de impacto).
   - *Headlines* con gatillos de urgencia o beneficio económico.
   - *Descripciones* cortas de soporte.
2. **Google Search Ads (RSA)**:
   - Paquete de 15 títulos (máximo 30 caracteres cada uno) y 4 descripciones (máximo 90 caracteres).
3. **LinkedIn Sponsored InMail**:
   - Mensajes personalizados con variables dinámicas (`{{nombre}}`, `{{empresa}}`, `{{cargo}}`).
4. **WhatsApp Sales Sequences**:
   - Secuencias de 3 pasos: Mensaje de apertura -> Mensaje de seguimiento con caso de éxito -> Oferta con fecha límite.

---

## 4. 🔍 Motor de Auditoría y Optimización SEO

El módulo SEO integrado (`PublicDomainManagerPage.tsx` y herramientas de contenido) proporciona:

- **Auditoría On-Page en Tiempo Real**: Análisis de la estructura de encabezados (H1, H2, H3), densidad de palabras clave y atributos `alt` en imágenes.
- **Generador de Metaetiquetas & OpenGraph**: Creación automática de `title` (máx. 60 caracteres), `description` (máx. 155 caracteres) y etiquetas sociales para Twitter Cards y WhatsApp Share.
- **Sitemap Dinámico (`/sitemap.xml`)**: Indexación estructurada de todas las 10 verticales de industria y páginas públicas.

---

## 5. 💡 Integración Contextual en el CRM

Los agentes de IA no están aislados en una pestaña separada, sino integrados en los componentes operativos del CRM:

1. **En el Pipeline Kanban**: El botón de IA en cada tarjeta de trato ejecuta un análisis MEDDIC instantáneo.
2. **En el Drawer de Detalle del Lead**: El botón *"Sugerir Estrategia"* genera los próximos pasos comerciales basados en el historial de notas.
3. **En la Bandeja de WhatsApp (`InboxView.tsx`)**: Los botones de respuesta rápida proponen 3 alternativas de respuesta contextual según el último mensaje recibido del cliente.
4. **En el Generador de Propuestas**: Redacción automática del resumen ejecutivo y términos del servicio adaptados al rubro del cliente.

---

&copy; 2026 Clientum Latam. Todos los derechos reservados.
