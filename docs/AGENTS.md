# 🤖 Documentación de Agente OS & Roster de Inteligencia Artificial

**Clientum Agente OS** es el subsistema de orquestación autónomo que permite a PyMEs y empresas delegar tareas comerciales, técnicas, financieras y de marketing a un equipo de 14 agentes especializados impulsados por modelos de Google Gemini.

---

## 1. 👥 Roster de los 14 Agentes Especializados

| # | Agente | Rol | Modelo | Función Principal |
| :-: | :--- | :--- | :--- | :--- |
| **01** | **Estratega General (CEO)** | Liderazgo & Visión | Gemini 2.0 Pro | Define prioridades, objetivos trimestrales (OKRs) y asignación de recursos. |
| **02** | **Growth Lead** | Crecimiento B2B | Gemini 2.0 Flash | Diseña experimentos de adquisición, funnels y optimización de CAC/LTV. |
| **03** | **SDR Prospección** | Prospección Saliente | Gemini 2.0 Flash | Detecta decisores en Google Maps/LinkedIn y redacta secuencias frías. |
| **04** | **Account Executive (AE)** | Cierre de Tratos | Gemini 2.0 Flash | Lidera negociaciones, maneja objeciones y define estrategias de cierre. |
| **05** | **Customer Success** | Retención & Onboarding | Gemini 2.0 Flash | Asegura la adopción de la plataforma y detecta oportunidades de upselling. |
| **06** | **Copywriter IA** | Redacción Persuasiva | Gemini 2.0 Flash | Redacta correos, copys de WhatsApp, páginas de aterrizaje y anuncios. |
| **07** | **Especialista SEO** | Posicionamiento Orgánico | Gemini 2.0 Flash | Audita palabras clave, metadatos y arquitectura de contenido On-Page. |
| **08** | **Social Media Manager** | Contenido & Redes | Gemini 2.0 Flash | Programa calendarios de publicaciones y adapta contenidos para cada red. |
| **09** | **Soporte Nivel 1** | Atención al Cliente | Gemini 2.0 Flash | Responde preguntas frecuentes, clasifica tickets y deriva casos complejos. |
| **10** | **Dev & Arquitecto Web** | Ingeniería & Sistemas | Gemini 2.0 Pro | Asiste en integraciones de API, webhooks, base de datos y Cloudflare. |
| **11** | **Asesor AFIP & Finanzas** | Facturación & Impuestos | Gemini 2.0 Flash | Valida normativas fiscales, alícuotas de IVA y cálculos de rentabilidad. |
| **12** | **Diseñador de Propuestas** | Presupuestos & Cotizaciones | Gemini 2.0 Flash | Estructura propuestas comerciales en PDF con alcance y términos claros. |
| **13** | **Auditor de Calidad** | Control & Cumplimiento | Gemini 2.0 Flash | Supervisa la satisfacción del cliente y el cumplimiento de SLAs. |
| **14** | **Especialista Automatizaciones** | Conexiones & Workflows | Gemini 2.0 Flash | Modela flujos en n8n, Make y webhooks para sincronizar sistemas. |

---

## 2. 🏗️ Arquitectura de Orquestación

```
  ┌─────────────────────────────────────────────────────────────┐
  │                   USUARIO / COMANDO CENTRAL                 │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                 ORQUESTADOR PRINCIPAL (IA)                  │
  │ • Interpreta la intención del usuario                      │
  │ • Descompone tareas complejas en subtareas                  │
  │ • Rutea la ejecución al agente más calificado               │
  └───────────────┬─────────────────────────────┬───────────────┘
                  │                             │
         [Tarea Comercial]               [Tarea Técnica]
                  │                             │
                  ▼                             ▼
        ┌───────────────────┐         ┌───────────────────┐
        │  AGENTE SDR / AE  │         │  AGENTE DEV / SEO │
        └─────────┬─────────┘         └─────────┬─────────┘
                  │                             │
                  └───────────────┬─────────────┘
                                  │
                                  ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                      FEED DE RESULTADOS                     │
  │ • Actualización del Pipeline CRM                            │
  │ • Creación de Tareas y Notificaciones In-App                │
  │ • Métricas de Consumo de Tokens en Tiempo Real              │
  └─────────────────────────────────────────────────────────────┘
```

---

## 3. 🎯 Vistas del Organigrama Organizacional

1. **Organigrama Jerárquico (`OrganigramaClientum.tsx`)**: Estructura de árbol tradicional para visualizar líneas de reporte.
2. **Roster Grid (`OrgVariantRoster.tsx`)**: Tarjetas de agentes con indicadores de estado (Activo, En Pausa, Ocupado), tokens consumidos y tareas resueltas.
3. **Swimlanes por Departamento (`OrgVariantLanes.tsx`)**: Columnas operativas divididas por Dirección, Ventas, Marketing, Tecnología y Finanzas.
4. **Pipeline Flow (`OrgVariantPipeline.tsx`)**: Diagrama de valor continuo mostrando la colaboración de agentes en cada etapa del ciclo de vida del cliente.
5. **Hub Radial (`OrgVariantRadial.tsx`)**: Vista concéntrica centrada en la dirección ejecutiva.

---

&copy; 2026 Clientum Latam. Todos los derechos reservados.
