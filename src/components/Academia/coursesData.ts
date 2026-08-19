import {
  TrendingUp,
  Mail,
  MapPin,
  FileText,
  MessageSquare,
  Sparkles,
  CreditCard,
  BarChart2
} from "lucide-react";

export interface CourseSlide {
  title: string;
  concept: string;
  bullets: string[];
}

export interface CourseQuizItem {
  q: string;
  options: string[];
  correct: number;
}

export interface CourseWeek {
  week: number;
  title: string;
  lessons: string[];
}

export interface CourseItem {
  slug: string;
  sku?: string;
  name: string;
  category: "crm" | "marketing" | "bots" | "finanzas";
  tagline: string;
  desc: string;
  duration: string;
  hours: string;
  students: string;
  level: string;
  badge: string;
  color: string;
  icon: any;
  img: string;
  price?: string;
  modality?: string;
  location?: string;
  cohortStartDate?: string;
  salesChannels?: { channel: string; price: string }[];
  audience?: string[];
  learningObjectives?: string[];
  modulesTable?: { module: number; topic: string; duration: string }[];
  enrollmentInfo?: { method: string; deposit: string; deadline: string; minStudents: number; totalCapacity?: number };
  salesCopies?: { channel: string; copy: string }[];
  topics: string[];
  weeks: CourseWeek[];
  slides: CourseSlide[];
  quiz: CourseQuizItem[];
}

export const COURSES_DATA: CourseItem[] = [
  {
    slug: "crm-moderno-automatizacion",
    name: "CRM Clientum: Ventas, Kanban y Pipeline Inteligente",
    category: "crm",
    tagline: "4 semanas · Interactivo · Certificado Oficial Clientum + ISSAG",
    desc: "Dominá el ciclo de vida del cliente. Aprendé a configurar tu embudo de ventas Kanban, orquestar contactos con Inteligencia Artificial, y calificar oportunidades automáticamente para multiplicar tus ventas.",
    duration: "4 semanas",
    hours: "12 hs totales",
    students: "Inscripción Libre",
    level: "Básico a Intermedio",
    badge: "Más Popular",
    color: "from-blue-600 to-indigo-700",
    icon: TrendingUp,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    topics: [
      "Configuración y diseño de columnas en el Embudo Kanban comercial",
      "Orquestación inteligente de contactos y lead scoring automático",
      "Automatización de notas, recordatorios y alertas con IA",
      "Mapeo de rentabilidad y lectura de dashboards de conversión"
    ],
    weeks: [
      { week: 1, title: "Fundamentos de Kanban y Embudo Comercial", lessons: ["Arquitectura de etapas comerciales", "Campos personalizados de cliente", "Entregable: Pipeline base configurado"] },
      { week: 2, title: "Calificación y Lead Scoring con IA", lessons: ["Metodología MEDDIC & BANT", "Reglas automáticas de puntuación", "Entregable: Matriz de scoring activa"] },
      { week: 3, title: "Automatizaciones & Seguimientos", lessons: ["Gatillos por inactividad", "Resúmenes de llamadas con IA", "Entregable: Flujo de reenganche"] },
      { week: 4, title: "Cierre, Reportes y Certificación", lessons: ["Métricas de conversión", "Auditoría de embudo", "Entregable: Examen Final y Diploma"] }
    ],
    slides: [
      {
        title: "Estructura del Embudo Kanban",
        concept: "El pilar de un CRM moderno es la visibilidad. Un tablero Kanban mapea el recorrido del cliente desde el primer contacto hasta el cierre. Cada columna representa un hito claro con acciones definidas.",
        bullets: [
          "Mantener las tarjetas actualizadas reduce la fricción del equipo en un 40%.",
          "Mover un lead debe requerir un criterio objetivo de cumplimiento.",
          "Cada tarjeta de cliente centraliza chats, mails, notas y tareas pendientes."
        ]
      },
      {
        title: "Calificación con Inteligencia Artificial",
        concept: "Calificar prospectos te ahorra cientos de horas. Utilizando la metodología MEDDIC o BANT enriquecida con IA, podés identificar inmediatamente cuáles leads tienen presupuesto y urgencia real.",
        bullets: [
          "El Orquestador analiza conversaciones para evaluar la intención de compra.",
          "Un lead bien calificado incrementa la velocidad de cierre de ventas.",
          "Los leads fríos deben nutrirse automáticamente en columnas secundarias."
        ]
      },
      {
        title: "Seguimiento Automático y Notas de Voz",
        concept: "El 80% de las ventas requieren más de 5 seguimientos. Clientum automatiza las alertas internas y genera resúmenes automáticos de cada llamada o nota para que tu equipo se enfoque puramente en cerrar.",
        bullets: [
          "Asignar tareas automáticas al cambiar de columna evita que el lead se enfríe.",
          "La IA transcribe y extrae compromisos clave de las reuniones con clientes.",
          "Acciones automáticas gatillan plantillas optimizadas para acelerar la venta."
        ]
      }
    ],
    quiz: [
      {
        q: "¿Cuál es la principal ventaja de estructurar un CRM con columnas Kanban?",
        options: [
          "Tener un diseño colorido sin funcionalidad real.",
          "Obtener visibilidad completa del recorrido de venta y detectar cuellos de botella instantáneamente.",
          "Reemplazar completamente al equipo de vendedores por robots."
        ],
        correct: 1
      },
      {
        q: "¿Para qué sirve el Scoring de Leads automatizado por IA?",
        options: [
          "Para calificar prospectos según su urgencia, presupuesto e interés real, optimizando el tiempo del equipo comercial.",
          "Para enviar correos masivos de spam a todos los contactos sin distinción.",
          "Para ordenar los clientes alfabéticamente de manera aleatoria."
        ],
        correct: 0
      }
    ]
  },
  {
    slug: "whatsapp-bots-ia",
    name: "WhatsApp Business API & Chatbots con IA",
    category: "bots",
    tagline: "4 semanas · Práctico · Alta Demanda Laboral",
    desc: "Aprendé a implementar bots de WhatsApp conectados con OpenAI/Gemini y n8n. Diseñá flujos de autoatención 24/7, detección automática de intención de compra y derivación a agentes comerciales en tiempo real.",
    duration: "4 semanas",
    hours: "12 hs totales",
    students: "Cupos Abiertos",
    level: "Intermedio",
    badge: "Destacado",
    color: "from-emerald-600 to-teal-700",
    icon: MessageSquare,
    img: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800&q=80",
    topics: [
      "Conexión de instancias WhatsApp Baileys & Cloud API",
      "Diseño de flujos con lenguaje natural y tono rioplatense",
      "Calificación y scoring automático de consultas entrantes",
      "Disparo de webhooks hacia el CRM y sistemas de stock"
    ],
    weeks: [
      { week: 1, title: "Infraestructura WhatsApp & Webhooks", lessons: ["Configuración de números y verificación", "Gestión de sesiones concurrentes", "Entregable: Instancia conectada al CRM"] },
      { week: 2, title: "Ingeniería de Prompts para Ventas", lessons: ["Prompt de atención en dialecto argentino", "Reglas de contención y FAQ", "Entregable: Prompt corporativo testeado"] },
      { week: 3, title: "Automatización con n8n & Node.js", lessons: ["Flujos condicionales sin código", "Consulta de stock y turnos en vivo", "Entregable: Bot con agendamiento activo"] },
      { week: 4, title: "Multi-Agente & Human Handoff", lessons: ["Bandeja unificada para vendedores", "Etiquetado y métricas de tiempo de respuesta", "Entregable: Despliegue en producción"] }
    ],
    slides: [
      {
        title: "Atención Inmediata 24/7",
        concept: "El 70% de los clientes compra al primer proveedor que le contesta. Un bot con IA en WhatsApp elimina los tiempos de espera y atiende a las 2 AM con la misma cordialidad que un asesor senior.",
        bullets: [
          "Respuestas instantáneas en menos de 3 segundos.",
          "Capacidad de consultar disponibilidad y precios en tiempo real.",
          "Derivación limpia a un vendedor humano cuando se detecta intención alta."
        ]
      },
      {
        title: "Personalidad y Tono Auténtico",
        concept: "Un bot acartonado genera rechazo. Configuramos los prompts con modismos locales, empatía y respuestas cortas optimizadas para lectura en teléfonos móviles.",
        bullets: [
          "Respuestas concisas de máximo 2 o 3 párrafos cortos.",
          "Uso inteligente de emojis y llamadas a la acción directas.",
          "Capacidad de entender notas de voz y convertirlas en texto estructurado."
        ]
      },
      {
        title: "Sincronización Total con el CRM",
        concept: "Cada conversación en WhatsApp alimenta automáticamente la ficha del cliente en el CRM, guardando teléfono, nombre, dudas y etapa del trato sin intervención manual.",
        bullets: [
          "Actualización en tiempo real del estado en el tablero Kanban.",
          "Etiquetado automático según interés (ej. 'Producto A', 'Presupuesto Alto').",
          "Historial centralizado accesible por todo el equipo comercial."
        ]
      }
    ],
    quiz: [
      {
        q: "¿Qué sucede cuando un cliente muestra intención de compra urgente en el chat de WhatsApp?",
        options: [
          "El bot bloquea al cliente para evitar saturación.",
          "El bot califica el lead, asigna etiqueta de alta prioridad y notifica al vendedor disponible para tomar el control.",
          "El bot le pide que llame por teléfono fijo al día siguiente."
        ],
        correct: 1
      },
      {
        q: "¿Por qué es clave sincronizar WhatsApp con el CRM?",
        options: [
          "Para que ningún dato quede aislado en el celular personal de un empleado y el historial quede en la empresa.",
          "Para borrar los contactos cada fin de mes.",
          "Solo sirve para cambiarle el color a la interfaz."
        ],
        correct: 0
      }
    ]
  },
  {
    slug: "ai-marketing-copilot",
    name: "Copiloto IA de Marketing: Ads, ICP & Copywriting",
    category: "marketing",
    tagline: "3 semanas · Creativo & Estratégico · Certificado",
    desc: "Multiplicá tu producción publicitaria. Creá perfiles de cliente ideal (ICP), generá anuncios con fórmulas AIDA y PAS, segmentá audiencias predictivas y automatizá el calendario de contenidos.",
    duration: "3 semanas",
    hours: "10 hs totales",
    students: "Inscripción Libre",
    level: "Todos los niveles",
    badge: "Innovación",
    color: "from-fuchsia-600 to-pink-700",
    icon: Sparkles,
    img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
    topics: [
      "Definición automatizada de ICP con análisis de dolor y objeciones",
      "Generación de anuncios para Meta Ads, Google y LinkedIn",
      "Matrices de segmentación predictiva y prevención de churn",
      "Flujos de nutrición de leads multicanal (Email + WhatsApp)"
    ],
    weeks: [
      { week: 1, title: "Perfil de Cliente Ideal (ICP) con IA", lessons: ["Mapeo de dolores y deseos", "Estructuración de matrices de objeciones", "Entregable: Dossier de ICP generado"] },
      { week: 2, title: "Copywriting de Alta Conversión", lessons: ["Fórmulas AIDA, PAS y Storytelling", "Variaciones para pruebas A/B", "Entregable: 10 copys publicitarios"] },
      { week: 3, title: "Campañas Omnicanal & Automatización", lessons: ["Sincronización con audiencias CRM", "Secuencias de retargeting", "Entregable: Campaña integral lista"] }
    ],
    slides: [
      {
        title: "Definición del ICP (Ideal Customer Profile)",
        concept: "Venderle a todos es no venderle a nadie. Con el Copiloto IA de Clientum podés ingresar los datos de tus mejores 10 clientes para que la IA extraiga patrones comunes de dolor, presupuesto y hábitos de compra.",
        bullets: [
          "Identificar dolores profundos que impulsan la decisión de compra.",
          "Conocer las 3 objeciones principales antes de lanzar la campaña.",
          "Adaptar el lenguaje de los anuncios al tono de cada nicho."
        ]
      },
      {
        title: "Fórmulas AIDA y PAS con IA",
        concept: "El copywriting científico funciona. La fórmula AIDA (Atención, Interés, Deseo, Acción) y PAS (Problema, Agitación, Solución) multiplican el CTR de los anuncios en Meta y Google.",
        bullets: [
          "Gancho inicial en los primeros 3 segundos o primeras 2 líneas de texto.",
          "Agitación del dolor sin sonar alarmista, presentando la solución con claridad.",
          "Llamado a la acción inequívoco y de baja fricción."
        ]
      },
      {
        title: "Segmentación Predictiva",
        concept: "No todos los clientes tienen el mismo valor. La IA agrupa tu base de datos en segmentos de alto valor, compradores recurrentes y leads en riesgo de abandono para reactivarlos.",
        bullets: [
          "Campañas de reactivación automáticas para clientes inactivos por 60 días.",
          "Ofertas VIP para el 20% de clientes que generan el 80% de los ingresos.",
          "Mensajes ultra-personalizados por historial de compras."
        ]
      }
    ],
    quiz: [
      {
        q: "¿Cuál es la función principal de la fórmula PAS en la redacción de anuncios?",
        options: [
          "Hacer que el anuncio sea lo más largo posible.",
          "Presentar el Problema real del cliente, Agitar el costo de no resolverlo y ofrecer tu Solución como la opción lógica.",
          "Evitar mencionar el precio de los productos."
        ],
        correct: 1
      },
      {
        q: "¿Qué beneficio aporta el análisis de ICP asistido por IA?",
        options: [
          "Reduce el gasto publicitario al dirigir los mensajes exclusivamente a prospectos con alta afinidad y capacidad de pago.",
          "Publicar anuncios en idiomas que nadie habla.",
          "Reemplazar el producto por otro rubro diferente."
        ],
        correct: 0
      }
    ]
  },
  {
    slug: "ia-outreach-email-marketing",
    name: "Outbound & Email Marketing Automatizado con IA",
    category: "marketing",
    tagline: "3 semanas · Especializado · 100% Práctico",
    desc: "Aprendé a estructurar secuencias de prospección en frío (Outreach) y campañas de email masivas. Diseñá copys persuasivos usando IA e integrá variables dinámicas del CRM para lograr tasas de apertura superiores al 45%.",
    duration: "3 semanas",
    hours: "10 hs totales",
    students: "Cupos Limitados",
    level: "Intermedio",
    badge: "Nuevo",
    color: "from-violet-600 to-fuchsia-700",
    icon: Mail,
    img: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80",
    topics: [
      "Configuración avanzada de SMTP y optimización de entregabilidad",
      "Estructuras persuasivas (AIDA, PAS) de copywriting aplicadas con IA",
      "Campos dinámicos de personalización desde la base de datos",
      "Flujos y secuencias con reglas automáticas según comportamiento"
    ],
    weeks: [
      { week: 1, title: "Entregabilidad y Servidores SMTP", lessons: ["Configuración SPF, DKIM y DMARC", "Calentamiento de buzones de correo", "Entregable: Dominio validado"] },
      { week: 2, title: "Redacción Persuasiva con IA", lessons: ["Asuntos de alta apertura (>45%)", "Variables de fusión dinámicas", "Entregable: Plantilla de prospección"] },
      { week: 3, title: "Secuencias Automatizadas", lessons: ["Gatillos por apertura y clic", "Pausa automática al recibir respuesta", "Entregable: Cadencia Outbound completa"] }
    ],
    slides: [
      {
        title: "Entregabilidad y Servidores SMTP",
        concept: "Si tu correo llega a spam, tu campaña no existe. La entregabilidad depende de una configuración limpia de tu servidor SMTP, firmas SPF/DKIM válidas y de evitar palabras prohibidas por los filtros de spam.",
        bullets: [
          "El calentamiento gradual del buzón asegura una buena reputación de envío.",
          "Utilizar un remitente corporativo real aumenta la tasa de apertura en un 35%.",
          "Evitar usar mayúsculas y signos de exclamación excesivos en el asunto."
        ]
      },
      {
        title: "Persuasión y Fusión de Variables",
        concept: "Nadie responde a un email genérico. Con la IA de Clientum, podés redactar textos utilizando merge-tags del CRM como nombre, industria o desafío para simular un mensaje redactado 1 a 1 de forma manual.",
        bullets: [
          "Un asunto personalizado tiene un 50% más de probabilidad de ser abierto.",
          "La primera línea del email debe aludir a algo específico del destinatario.",
          "Ofrecer siempre valor inmediato (un reporte, un tip, una propuesta clara)."
        ]
      },
      {
        title: "Secuencias Outbound de Seguimiento",
        concept: "La constancia gana. Una secuencia inteligente envía recordatorios automáticos espaciados (día 1, día 4, día 8) y se detiene inmediatamente cuando el prospecto responde, garantizando un trato sumamente profesional.",
        bullets: [
          "Los seguimientos breves tipo 'bache' suelen tener la mayor tasa de respuesta.",
          "Definir llamadas a la acción (CTA) ultra-simples como '¿te queda cómodo un café virtual?'.",
          "Analizar métricas de clics para iterar continuamente la propuesta."
        ]
      }
    ],
    quiz: [
      {
        q: "¿Qué factor determina que tus campañas de email marketing no caigan en la carpeta de Spam?",
        options: [
          "El color de los botones dentro de la plantilla del correo.",
          "La correcta configuración técnica del servidor SMTP y evitar bases de datos compradas o sucias.",
          "Enviar miles de correos simultáneamente desde una cuenta nueva."
        ],
        correct: 1
      },
      {
        q: "¿Cuál es el principal beneficio de pausar automáticamente una secuencia de Outreach?",
        options: [
          "Evita seguir molestando a un cliente que ya contestó, permitiendo que un humano tome el control de la conversación de forma natural.",
          "Ahorrar espacio en el servidor de correos electrónicos.",
          "Hacer que el cliente piense que la empresa se olvidó de él."
        ],
        correct: 0
      }
    ]
  },
  {
    slug: "seo-local-prospeccion-geolocalizada",
    name: "SEO Local & Prospección Inteligente con Mapas",
    category: "marketing",
    tagline: "3 semanas · Estratégico · Automatizado",
    desc: "Descubrí clientes ideales a tu alrededor. Aprendé a extraer prospectos geolocalizados directo de Google Maps, analizar su salud web con un Auditor SEO On-Page automático y armar propuestas comerciales imposibles de rechazar.",
    duration: "3 semanas",
    hours: "8 hs totales",
    students: "Abierto",
    level: "Todos los niveles",
    badge: "Práctico",
    color: "from-emerald-600 to-teal-700",
    icon: MapPin,
    img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
    topics: [
      "Extracción geolocalizada de comercios y pymes locales",
      "Diagnósticos de velocidad, etiquetas y meta description con un click",
      "Uso de mapas interactivos de calor para identificar zonas calientes",
      "Estructuración de ofertas de optimización de perfiles en Google Maps"
    ],
    weeks: [
      { week: 1, title: "Extracción de Datos en Google Maps", lessons: ["Búsqueda por rubro y localidad", "Exportación a CSV enriquecido", "Entregable: Lista de 50 comercios auditables"] },
      { week: 2, title: "Auditoría SEO On-Page y Core Web Vitals", lessons: ["Velocidad de carga móvil", "Etiquetas de encabezado y SSL", "Entregable: Informe de diagnóstico en PDF"] },
      { week: 3, title: "Propuestas de Alto Valor Local", lessons: ["Presentación de antes vs después", "Estructuración de abonos mensuales", "Entregable: Presentación comercial final"] }
    ],
    slides: [
      {
        title: "Extracción Local en Google Maps",
        concept: "Las pymes locales de tu ciudad suelen tener necesidades críticas de marketing. Scrapear Google Maps por rubro (ej. 'Odontólogos en Cipolletti') te da una lista de prospectos con teléfono, dirección y web listos para calificar.",
        bullets: [
          "Filtrar comercios sin sitio web para ofrecerles su primera página.",
          "La cercanía física genera confianza inmediata y facilita reuniones presenciales.",
          "Descubrir negocios sin ficha de Google Business Profile reclamada."
        ]
      },
      {
        title: "Auditoría SEO On-Page en 5 Segundos",
        concept: "Antes de llamar a un prospecto, debés conocer sus fallas. Un análisis automatizado te revela si su web es lenta, si no tiene SSL seguro o si carece de etiquetas meta-título correctas para posicionarse.",
        bullets: [
          "Señalar problemas técnicos reales incrementa la tasa de conversión de la llamada.",
          "El SEO On-Page básico es fácil de solucionar y tiene un gran impacto inmediato.",
          "Traducir términos complejos (ej. 'etiqueta H1') en beneficios de negocio para el cliente."
        ]
      },
      {
        title: "Propuesta de Valor Irresistible",
        concept: "No ofrezcas 'SEO'. Ofrecé 'Más clientes llamando desde el celular'. Al presentar un mapa interactivo con sus competidores posicionados arriba, el prospecto entiende inmediatamente el costo de oportunidad perdido.",
        bullets: [
          "Mostrar imágenes comparativas claras del antes y después.",
          "Ofrecer una auditoría gratuita rápida en el primer contacto.",
          "Estructurar un abono mensual de optimización fácil de presupuestar."
        ]
      }
    ],
    quiz: [
      {
        q: "¿Cuál es la forma más efectiva de captar la atención de un negocio local para venderle servicios de marketing?",
        options: [
          "Llamar y hablar con términos técnicos complejos para sonar inteligente.",
          "Mostrarle un diagnóstico claro con las fallas SEO de su web actual frente a sus competidores locales directos.",
          "Ofrecerle posicionarlo en el puesto número 1 de Google en 24 horas de manera garantizada."
        ],
        correct: 1
      },
      {
        q: "¿Qué indica que un comercio local no ha reclamado su perfil de Google Business Profile?",
        options: [
          "Que Google cerrará su negocio pronto.",
          "Que el perfil aparece en los mapas pero carece de verificación oficial, dejando al negocio vulnerable a cambios no autorizados y con peor visibilidad.",
          "Que el negocio no tiene habilitación municipal."
        ],
        correct: 1
      }
    ]
  },
  {
    slug: "afip-mercadopago-crm",
    name: "Facturación AFIP & Cobros Mercado Pago en el CRM",
    category: "finanzas",
    tagline: "2 semanas · Técnico & Fiscal · Esencial PyME",
    desc: "Eliminá la doble carga administrativa. Aprendé a emitir Facturas Electrónicas A, B y C directo desde los tratos del CRM y a conciliar cobros recurrentes de Mercado Pago automáticamente.",
    duration: "2 semanas",
    hours: "8 hs totales",
    students: "Inscripción Libre",
    level: "Básico a Intermedio",
    badge: "Fintech",
    color: "from-sky-600 to-blue-800",
    icon: CreditCard,
    img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    topics: [
      "Conexión a Web Services de AFIP (WSAA & WSFEv1)",
      "Creación de Links de Pago dinámicos y botones QR de cobro",
      "Webhooks de confirmación y conciliación bancaria en tiempo real",
      "Alertas automáticas de cobro y mora por WhatsApp"
    ],
    weeks: [
      { week: 1, title: "Certificados AFIP y Factura Electrónica", lessons: ["Generación de clave fiscal y certificados", "Puntos de venta web", "Entregable: Facturación de prueba conectada"] },
      { week: 2, title: "Pasarela Mercado Pago & Conciliación", lessons: ["Checkout Pro y suscripciones", "Gatillo automático de factura al cobrar", "Entregable: Flujo de cobro y factura automático"] }
    ],
    slides: [
      {
        title: "Integración Directa con AFIP",
        concept: "Hacer una venta y luego entrar a la página de AFIP a facturar a mano duplica el trabajo y genera errores humanos. Al integrar los Web Services de AFIP en Clientum, la factura se emite con un click desde la ficha del cliente.",
        bullets: [
          "Validación automática de CUIT/CUIL con el padrón fiscal.",
          "Obtención instantánea del CAE y código de barras oficial.",
          "Envío automático del PDF al correo del cliente sin descargas intermedias."
        ]
      },
      {
        title: "Cobros con Mercado Pago Checkout Pro",
        concept: "Cobrar rápido es clave para el flujo de caja. Al crear un presupuesto en el CRM, el sistema genera automáticamente un link de pago o código QR personalizado.",
        bullets: [
          "Soporte para tarjetas de débito, crédito y dinero en cuenta.",
          "Gestión de planes en cuotas con simulación de interés transparente.",
          "Recepción de webhooks instantáneos cuando el pago es aprobado."
        ]
      },
      {
        title: "Conciliación y Actualización de Estados",
        concept: "Cuando el cliente abona, el CRM pasa automáticamente el trato a la columna 'Cobrado / Ganado', emite la factura electrónica de AFIP y envía un mensaje de WhatsApp de confirmación.",
        bullets: [
          "Cero errores de conciliación contable a fin de mes.",
          "Reducción del período medio de cobro (DSO).",
          "Reportes de recaudación exportables en formato Excel para el contador."
        ]
      }
    ],
    quiz: [
      {
        q: "¿Qué beneficio principal ofrece la sincronización de AFIP dentro del CRM?",
        options: [
          "Permite emitir facturas con CAE válido en un solo click desde el trato ganado, ahorrando horas de carga manual.",
          "Exime a la empresa de pagar impuestos.",
          "Cambia el número de CUIT aleatoriamente."
        ],
        correct: 0
      },
      {
        q: "¿Cómo detecta el CRM que un pago de Mercado Pago fue exitoso?",
        options: [
          "El vendedor debe llamar al banco para verificar.",
          "A través de un Webhook instantáneo que notifica al servidor y actualiza la tarjeta a 'Cobrado'.",
          "Esperando 30 días hábiles."
        ],
        correct: 1
      }
    ]
  },
  {
    slug: "analytics-bi-crm",
    name: "Business Intelligence, ROI y Métricas de Conversión",
    category: "crm",
    tagline: "3 semanas · Analítico & Directivo · Toma de Decisiones",
    desc: "Convertí datos en decisiones rentables. Dominá el cálculo de CAC, LTV, velocidad del pipeline y ROI por canal publicitario usando dashboards ejecutivos diseñados para PyMEs.",
    duration: "3 semanas",
    hours: "10 hs totales",
    students: "Abierto",
    level: "Intermedio a Avanzado",
    badge: "Gerencial",
    color: "from-amber-600 to-yellow-700",
    icon: BarChart2,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    topics: [
      "Mapeo de KPIs de ventas (Win Rate, Pipeline Velocity, Churn)",
      "Diseño de dashboards analíticos en tiempo real",
      "Atribución multicanal y cálculo exacto de CAC y LTV",
      "Reportes ejecutivos automáticos para directorios"
    ],
    weeks: [
      { week: 1, title: "Métricas Comerciales Clave (CAC, LTV, ROI)", lessons: ["Cálculo del Costo de Adquisición de Cliente", "Life-Time Value y retención", "Entregable: Calculadora financiera de ventas"] },
      { week: 2, title: "Velocidad de Embudo y Cuellos de Botella", lessons: ["Tiempo promedio por columna", "Tasa de cierre por asesor comercial", "Entregable: Diagnóstico de pérdidas de pipeline"] },
      { week: 3, title: "Dashboards BI Ejecutivos", lessons: ["Construcción de gráficos dinámicos", "Reportes programados para gerencia", "Entregable: Tablero BI en vivo"] }
    ],
    slides: [
      {
        title: "Métricas Fundamentales: CAC vs LTV",
        concept: "El Costo de Adquisición de Cliente (CAC) y el Valor de Vida del Cliente (LTV) son los indicadores supremos de salud financiera. La regla de oro en negocios sostenibles es mantener un ratio LTV:CAC superior a 3:1.",
        bullets: [
          "CAC = (Gasto en Marketing + Costos Comerciales) / Nuevos Clientes.",
          "LTV = Ticket Promedio × Frecuencia de Compra Anual × Años de Retención.",
          "Un ratio menor a 1:1 indica que el negocio pierde dinero por cada cliente nuevo."
        ]
      },
      {
        title: "Velocidad del Pipeline Comercial",
        concept: "La velocidad de ventas mide cuánto dinero fluye por tu embudo en un período determinado. Depende de 4 variables: Oportunidades activas, Ticket promedio, Tasa de conversión y Duración del ciclo.",
        bullets: [
          "Reducir el ciclo de venta de 30 a 15 días duplica la velocidad de ingresos.",
          "Identificar en qué columna se estancan los leads fríos.",
          "Comparar el rendimiento de los vendedores para capacitar a los de menor cierre."
        ]
      },
      {
        title: "Atribución Multicanal",
        concept: "Saber exactamente de qué canal provino la venta (WhatsApp, Google Ads, Recomendaciones o Local SEO) te permite reinvertir el presupuesto publicitario donde el ROI es comprobado.",
        bullets: [
          "Etiquetado de origen (UTM y canal) en cada tarjeta del CRM.",
          "Reportes de conversión por canal para optimizar la inversión publicitaria.",
          "Alertas tempranas de caída de rendimiento por canal."
        ]
      }
    ],
    quiz: [
      {
        q: "¿Qué significa un ratio LTV:CAC de 4:1?",
        options: [
          "Que por cada peso invertido en captar un cliente, la empresa obtiene 4 pesos de margen a lo largo de la relación con el mismo.",
          "Que el negocio está perdiendo el 75% de sus fondos.",
          "Que se deben despedir a 4 vendedores."
        ],
        correct: 0
      },
      {
        q: "¿Cómo se calcula la tasa de conversión (Win Rate) en el CRM?",
        options: [
          "Dividiendo las oportunidades Ganadas sobre el Total de Oportunidades cerradas en el período, expresado en porcentaje.",
          "Sumando los nombres de todos los contactos de la base de datos.",
          "Multiplicando el precio de la suscripción por el número de empleados."
        ],
        correct: 0
      }
    ]
  },
  {
    slug: "diseno-brochures-materiales-ia",
    name: "Creación de Brochures y Material de Ventas con IA",
    category: "marketing",
    tagline: "2 semanas · Express · Gran Salida Laboral",
    desc: "Dejá de enviar presupuestos aburridos en texto plano. Aprendé a generar folletos corporativos, brochures de servicios y propuestas PDF interactivas de alto impacto visual adaptadas a la identidad de tu cliente.",
    duration: "2 semanas",
    hours: "6 hs totales",
    students: "Inscripción Libre",
    level: "Básico",
    badge: "Express",
    color: "from-amber-600 to-orange-700",
    icon: FileText,
    img: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80",
    topics: [
      "Estructura comercial persuasiva de un dossier de servicios",
      "Redacción automática de propuestas a la medida de cada industria",
      "Definición y aplicación ágil de marcas y paletas cromáticas",
      "Exportación limpia a formato PDF profesional desde la nube"
    ],
    weeks: [
      { week: 1, title: "Estructura y Psicología Visual", lessons: ["Anatomía del brochure comercial", "Paletas cromáticas por industria", "Entregable: Borrador de catálogo"] },
      { week: 2, title: "Generación Asistida y Exportación PDF", lessons: ["Adaptación de copys con IA", "Exportación vectorial en alta fidelidad", "Entregable: Dossier completo exportado"] }
    ],
    slides: [
      {
        title: "La Anatomía de un Brochure Ganador",
        concept: "Un buen brochure no habla de lo increíble que es tu empresa; habla de los problemas que le solucionás al cliente. Debe contar con una portada potente, desglose de soluciones, casos de éxito y un llamado a la acción claro.",
        bullets: [
          "La portada debe incluir un título centrado en el beneficio principal del cliente.",
          "Limitar el texto a párrafos cortos de lectura rápida y ágil.",
          "Incluir siempre testimonios o validaciones reales para bajar el riesgo percibido."
        ]
      },
      {
        title: "Armonía Visual y Psicología del Color",
        concept: "El color comunica antes que las palabras. Las marcas de salud usan tonos verdes o celestes para denotar calma; las de tecnología usan azules profundos para confianza; y las de retail usan naranjas o rojos para urgencia.",
        bullets: [
          "Mantener consistencia tipográfica: máximo 2 familias de fuentes.",
          "El espacio en blanco es tan importante como el texto; dale aire al diseño.",
          "Utilizar iconos modernos e imágenes de alta calidad contextualizadas."
        ]
      },
      {
        title: "Exportación Directa y Ventas Rápidas",
        concept: "La agilidad cierra ventas. Crear un catálogo interactivo que se adapte con un solo click a las variables del CRM te permite enviar una propuesta formal personalizada en 2 minutos luego de colgar una llamada.",
        bullets: [
          "Un cliente que recibe una propuesta veloz siente que la empresa es sumamente eficiente.",
          "Ofrecer alternativas de precios (ej. plan básico, recomendado y premium).",
          "Asegurarse de que el archivo PDF esté optimizado para verse perfectamente en celulares."
        ]
      }
    ],
    quiz: [
      {
        q: "¿Cuál debe ser el enfoque principal del texto en un Brochure comercial de servicios?",
        options: [
          "Contar detalladamente la historia de la fundación de la empresa y todos sus hitos internos.",
          "Destacar las soluciones a los dolores específicos del cliente y los beneficios de contratar el servicio.",
          "Escribir textos largos de más de mil palabras en la primera página."
        ],
        correct: 1
      },
      {
        q: "¿Por qué es importante la velocidad en el envío de un brochure adaptado después de una llamada?",
        options: [
          "Para demostrar un nivel de profesionalismo, agilidad y compromiso que te diferencie instantáneamente de la competencia.",
          "Para que el cliente no tenga tiempo de pensar en otras opciones.",
          "Porque el enlace de descarga del PDF expira en pocas horas."
        ],
        correct: 0
      }
    ]
  },
  {
    slug: "marketing-digital-principiantes",
    sku: "CRS-1321",
    name: "Marketing Digital para Principiantes",
    category: "marketing",
    tagline: "Presencial · Sede ISSAG General Roca · 13 hs · Certificado Oficial",
    desc: "Curso introductorio y 100% práctico pensado para dueños de PyME, emprendedores y profesionales del Alto Valle que quieren dar sus primeros pasos en marketing digital sin conocimientos previos. Aprendé a vender por redes sociales, ordenar tu presencia online y captar clientes reales.",
    duration: "6 módulos / 3 semanas",
    hours: "13 hs totales",
    students: "Cohorte Piloto (145 vacantes)",
    level: "Principiante / Sin conocimientos previos",
    badge: "Nueva Cohorte ISSAG",
    color: "from-rose-600 to-indigo-700",
    icon: Sparkles,
    img: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=80",
    price: "USD 15",
    modality: "Presencial (Aula ISSAG)",
    location: "Sede ISSAG General Roca (Cnel. Rodhe 55, General Roca, Río Negro)",
    cohortStartDate: "1 de septiembre de 2026",
    salesChannels: [
      { channel: "ISSAG (Presencial)", price: "USD 15" },
      { channel: "Campus virtual (clientum.com.ar)", price: "USD 15" },
      { channel: "Hotmart", price: "USD 15" }
    ],
    audience: [
      "Dueños y encargados de comercios del Alto Valle que todavía no tienen presencia digital ordenada",
      "Emprendedores que arrancan un negocio y necesitan una base sólida de marketing",
      "Personal administrativo o de ventas que quiere sumar herramientas digitales y comerciales a su rol"
    ],
    learningObjectives: [
      "Comprender los pilares del marketing digital y cómo aplicarlos a una PyME del Alto Valle",
      "Definir un plan de presencia digital básico (Instagram, Facebook, Google My Business y WhatsApp)",
      "Diseñar contenido y comunicación efectiva adaptada al negocio propio",
      "Interpretar métricas simples (alcance, interacciones, mensajes) para medir resultados",
      "Dar los primeros pasos en campañas de publicidad paga (Meta Ads sin complejidades)"
    ],
    modulesTable: [
      { module: 1, topic: "Fundamentos del marketing digital para PyMEs", duration: "2 hs" },
      { module: 2, topic: "Definición de público y propuesta de valor", duration: "2 hs" },
      { module: 3, topic: "Redes sociales: Instagram y Facebook para vender", duration: "3 hs" },
      { module: 4, topic: "Calendario de contenido y buenas prácticas", duration: "2 hs" },
      { module: 5, topic: "Introducción a la publicidad paga (Meta Ads)", duration: "2 hs" },
      { module: 6, topic: "Métricas básicas y cierre con caso práctico", duration: "2 hs" }
    ],
    enrollmentInfo: {
      method: "Formulario web con seña del 30%",
      deposit: "30% de reserva",
      deadline: "3 días antes del inicio",
      minStudents: 10,
      totalCapacity: 145
    },
    salesCopies: [
      {
        channel: "ISSAG (Presencial)",
        copy: "¿Tenés un negocio y no sabés por dónde arrancar en redes o WhatsApp? Este curso te da las herramientas básicas para vender más, sin vueltas técnicas. Empezás en ISSAG General Roca (Cnel. Rodhe 55)."
      },
      {
        channel: "Campus Virtual (clientum.com.ar)",
        copy: "Marketing Digital para Principiantes — el punto de partida ideal para tu PyME. Aprendé a estar donde están tus clientes, con ejercicios sobre tu propio negocio. USD 15."
      },
      {
        channel: "Hotmart",
        copy: "De cero a tu primera campaña digital. Curso práctico para dueños de negocio que quieren vender más usando redes, WhatsApp y publicidad online — sin conocimientos previos."
      }
    ],
    topics: [
      "Fundamentos del marketing digital aplicados a comercios locales del Alto Valle",
      "Público objetivo, propuesta de valor y posicionamiento en Google y redes",
      "Creación de perfiles atractivos en Instagram y WhatsApp Business para vender",
      "Diseño de calendarios de contenido que atraen consultas y cierres"
    ],
    weeks: [
      {
        week: 1,
        title: "Fundamentos y Propuesta de Valor PyME",
        lessons: [
          "Módulo 1: Fundamentos del marketing digital para PyMEs (2 hs)",
          "Módulo 2: Definición de público y propuesta de valor (2 hs)",
          "Entregable: Ficha de cliente ideal y propuesta de valor del negocio"
        ]
      },
      {
        week: 2,
        title: "Redes Sociales y Calendario de Contenido",
        lessons: [
          "Módulo 3: Redes sociales: Instagram y Facebook para vender (3 hs)",
          "Módulo 4: Calendario de contenido y buenas prácticas (2 hs)",
          "Entregable: Perfiles optimizados y calendario mensual de publicaciones"
        ]
      },
      {
        week: 3,
        title: "Publicidad Paga, Métricas y Plan Personal",
        lessons: [
          "Módulo 5: Introducción a la publicidad paga en Meta Ads (2 hs)",
          "Módulo 6: Métricas básicas y cierre con plan de acción propio (2 hs)",
          "Entregable: Plan de marketing digital personalizado y evaluación final"
        ]
      }
    ],
    slides: [
      {
        title: "Presencia Digital y Relevancia Local",
        concept: "Tener un local en General Roca o Cipolletti ya no alcanza si no existís en el celular de tus vecinos. El 85% de las compras comienzan con una búsqueda en Google Maps o una recomendación en Instagram.",
        bullets: [
          "Tener el perfil de Google My Business y WhatsApp Business completo genera confianza inmediata.",
          "La coherencia visual y de datos (teléfono, dirección, horarios) evita perder clientes.",
          "Cada publicación debe tener una intención clara: educar, inspirar o vender."
        ]
      },
      {
        title: "Contenido que Resuelve Problemas",
        concept: "El error común de los comercios es publicar solo fotos de productos con precios. El contenido que mejor funciona es aquel que muestra cómo el producto soluciona un problema real o mejora la vida del cliente.",
        bullets: [
          "Explicar el 'detrás de escena' humaniza tu marca.",
          "Responder a las dudas frecuentes en historias y reels genera cercanía.",
          "Un llamado a la acción simple ('Escribinos al WhatsApp') convierte visitas en consultas."
        ]
      },
      {
        title: "Primeros Pasos en Publicidad y Medición",
        concept: "No necesitás presupuestos gigantescos para hacer publicidad. Con inversiones mínimas bien segmentadas en tu localidad podés llegar a miles de personas que viven a menos de 5 km de tu negocio.",
        bullets: [
          "Segmentar por radio geográfico en el Alto Valle optimiza cada peso invertido.",
          "Medir la cantidad de mensajes recibidos por cada peso gastado para saber el retorno.",
          "Ajustar la comunicación en base a qué publicaciones generaron más consultas reales."
        ]
      }
    ],
    quiz: [
      {
        q: "¿Cuál es el primer paso antes de invertir dinero en anuncios de redes sociales?",
        options: [
          "Gastar todo el presupuesto en un solo día para ver qué pasa.",
          "Tener el perfil optimizado, la propuesta de valor clara y un canal de respuesta rápida como WhatsApp.",
          "Comprar seguidores falsos para aparentar popularidad."
        ],
        correct: 1
      },
      {
        q: "¿Por qué es crucial para una PyME del Alto Valle tener actualizada su ficha de Google My Business?",
        options: [
          "Porque permite a los clientes cercanos encontrar la dirección exacta, horarios y contactar directamente desde el mapa.",
          "Solo sirve si la empresa tiene más de 500 empleados.",
          "No tiene ningún impacto en las ventas locales."
        ],
        correct: 0
      }
    ]
  }
];
