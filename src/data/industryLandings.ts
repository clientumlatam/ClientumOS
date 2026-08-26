import {
  Package,
  Scale,
  Truck,
  Stethoscope,
  Home,
  Coffee,
  ShoppingCart,
  Briefcase,
  Building,
  Car,
  Bot,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  Users,
  Database,
  BarChart3,
  LucideIcon
} from 'lucide-react';

export interface IndustryMetric {
  value: string;
  label: string;
  labelPt: string;
  detail: string;
  detailPt: string;
}

export interface PainPointComparison {
  problem: string;
  problemPt: string;
  solution: string;
  solutionPt: string;
}

export interface IndustryFeature {
  title: string;
  titlePt: string;
  description: string;
  descriptionPt: string;
  tag: string;
  tagPt: string;
  iconName: string;
}

export interface IndustryCaseStudy {
  company: string;
  location: string;
  logoText: string;
  challenge: string;
  challengePt: string;
  result: string;
  resultPt: string;
  quote: string;
  quotePt: string;
  author: string;
  role: string;
}

export interface IndustryFaqItem {
  question: string;
  questionPt: string;
  answer: string;
  answerPt: string;
}

export interface IndustryLandingData {
  slug: string;
  aliases: string[];
  name: string;
  namePt: string;
  tagline: string;
  taglinePt: string;
  badge: string;
  badgePt: string;
  icon: LucideIcon;
  simulatorId: string;
  
  // SEO Metadata
  seo: {
    title: string;
    titlePt: string;
    description: string;
    descriptionPt: string;
    keywords: string[];
    canonical: string;
    ogImage?: string;
  };

  // Hero Section
  hero: {
    headline: string;
    headlinePt: string;
    highlight: string;
    highlightPt: string;
    subheadline: string;
    subheadlinePt: string;
    badgePill: string;
    badgePillPt: string;
    bullets: Array<{ text: string; textPt: string }>;
  };

  // Quantitative Stats
  metrics: IndustryMetric[];

  // Pain Points Comparison (Before vs. With Clientum)
  painPoints: PainPointComparison[];

  // Core Vertical Capabilities
  features: IndustryFeature[];

  // Real Customer Case Study
  caseStudy: IndustryCaseStudy;

  // Sector Specific FAQs
  faq: IndustryFaqItem[];

  // WhatsApp CTA customized message
  whatsappPrompt: string;
  whatsappPromptPt: string;

  // Cross-industry link suggestions
  relatedSlugs: string[];
}

export const INDUSTRY_LANDINGS: Record<string, IndustryLandingData> = {
  'agro': {
    slug: 'agro',
    aliases: ['agronegocio', 'campo', 'insumos-agricolas', 'agronomia', 'agropecuario'],
    name: 'Agro, Insumos & Acopios',
    namePt: 'Agronegócio, Insumos & Cooperativas',
    tagline: 'Software de Gestión Comercial, Chatbot WhatsApp de Insumos & Facturación SiGranos / AFIP',
    taglinePt: 'Software Comercial, Chatbot WhatsApp de Insumos e Faturamento Rural',
    badge: 'Solución Especializada Agro 2026',
    badgePt: 'Solução Especializada Agro 2026',
    icon: Package,
    simulatorId: 'agro',
    seo: {
      title: 'CRM & Chatbot WhatsApp para el Agro e Insumos Agrícolas | Clientum',
      titlePt: 'CRM e Chatbot WhatsApp para o Agronegócio | Clientum',
      description: 'Automatiza cotizaciones de fertilizantes, semillas y agroquímicos por hectárea. Conecta tu WhatsApp comercial con trazabilidad de lotes, canje cereal y AFIP.',
      descriptionPt: 'Automatize cotações de fertilizantes, defensivos e insumos por hectare. Conecte seu WhatsApp comercial com rastreabilidade de lotes e crédito safra.',
      keywords: [
        'crm agro argentina',
        'chatbot whatsapp insumos agricolas',
        'software para agronomias',
        'facturacion granos afip',
        'cotizador semillas y fertilizantes',
        'trazabilidad fitosanitarios whatsapp',
        'canje cereal crm'
      ],
      canonical: '/agro'
    },
    hero: {
      headline: 'Multiplica las ventas de tu Agronomía o Acopio con',
      headlinePt: 'Multiplique as vendas da sua Revenda Agrícola com',
      highlight: 'IA en WhatsApp y CRM para el Campo',
      highlightPt: 'IA no WhatsApp e CRM para o Agro',
      subheadline: 'Brinda respuestas técnicas en menos de 2 segundos a productores, cotiza insumos por hectárea automáticamente y sincroniza cada pedido con tu equipo comercial y facturación AFIP.',
      subheadlinePt: 'Dê respostas técnicas em menos de 2 segundos aos produtores rurais, cote insumos por hectare automaticamente e sincronize cada pedido com sua equipe comercial.',
      badgePill: '🚜 Ecosistema Digital para Productores y Distribuidores de Insumos',
      badgePillPt: '🚜 Ecossistema Digital para Produtores e Distribuidores de Insumos',
      bullets: [
        { text: 'Cotizaciones instantáneas con flete a campo y canje cereal', textPt: 'Cotações instantâneas com frete e barter agrícola' },
        { text: 'Atención 24/7 en plena época de siembra y cosecha', textPt: 'Atendimento 24/7 em época de plantio e colheita' },
        { text: 'Trazabilidad de recetas agronómicas y remitos digitales', textPt: 'Rastreabilidade de receituários agronômicos e romaneios' }
      ]
    },
    metrics: [
      {
        value: '< 3 seg',
        label: 'Tiempo de respuesta a consultas de campo',
        labelPt: 'Tempo de resposta para consultas rurais',
        detail: 'Cotizaciones de semillas y fertilizantes enviadas al instante por WhatsApp',
        detailPt: 'Cotações de sementes e adubos enviadas na hora pelo WhatsApp'
      },
      {
        value: '+340%',
        label: 'Consultas convertidas en visitas agronómicas',
        labelPt: 'Leads convertidos em visitas técnicas',
        detail: 'Calificación automática de hectáreas y tipo de cultivo antes de derivar al asesor',
        detailPt: 'Qualificação automática de hectares e tipo de cultura antes de transferir'
      },
      {
        value: '18 hs/sem',
        label: 'Ahorro administrativo por sucursal',
        labelPt: 'Economia semanal por filial',
        detail: 'Menos carga manual de remitos, listas de precios y consulta de stock en depósitos',
        detailPt: 'Menos digitação manual de pedidos, tabelas de preços e estoque em silos'
      }
    ],
    painPoints: [
      {
        problem: 'Productores esperando horas la cotización de insumos mientras evalúan a la competencia.',
        problemPt: 'Produtores aguardando horas por cotações de insumos enquanto pesquisam concorrentes.',
        solution: 'Chatbot IA que calcula cotización por hectárea y volumen al instante con lista de precios oficial.',
        solutionPt: 'Chatbot IA que calcula cotação por hectare e volume na hora com tabela de preços oficial.'
      },
      {
        problem: 'Pérdida de pedidos en época de cosecha por saturación del WhatsApp de los ingenieros agrónomos.',
        problemPt: 'Perda de pedidos na safra pela sobrecarga do WhatsApp dos agrônomos.',
        solution: 'Bandeja unificada multi-agente donde la IA filtra, atiende y agenda pedidos con aviso directo al depósito.',
        solutionPt: 'Caixa de entrada multiagente onde a IA atende e agenda entregas com alerta ao estoque.'
      },
      {
        problem: 'Falta de registro de qué productor sembró qué cultivo y cuándo necesita la próxima aplicación.',
        problemPt: 'Falta de histórico de qual produtor plantou qual cultura e quando precisará da próxima aplicação.',
        solution: 'CRM Agro con historial por establecimiento, alertas de re-compra y seguimiento de campaña.',
        solutionPt: 'CRM Agro com histórico por fazenda, alertas de recompra e acompanhamento de safra.'
      }
    ],
    features: [
      {
        title: 'Cotizador de Insumos por Hectárea',
        titlePt: 'Cotador de Insumos por Hectare',
        description: 'Permite al productor ingresar cantidad de hectáreas y tipo de suelo para recibir una recomendación de fertilizantes y semillas con precios en USD/ARS.',
        descriptionPt: 'Permite ao produtor informar hectares e cultura para receber recomendação de fertilizantes e sementes com valores atualizados.',
        tag: 'Ventas Rápidas',
        tagPt: 'Vendas Rápidas',
        iconName: 'Zap'
      },
      {
        title: 'Condiciones de Canje & Pago a Cosecha',
        titlePt: 'Condições de Barter e Financiamento',
        description: 'Informa automáticamente el valor de pizarra Rosario/Dólar divisa y las opciones de canje disponible con cereal a fijar.',
        descriptionPt: 'Informa cotações de mercado e opções de pagamento na colheita com condições flexíveis.',
        tag: 'Finanzas Agro',
        tagPt: 'Finanças Agro',
        iconName: 'BarChart3'
      },
      {
        title: 'Trazabilidad y Fichas Fitosanitarias',
        titlePt: 'Rastreabilidade e Fichas Técnicas',
        description: 'Envía PDFs de fichas técnicas de fitosanitarios, marbetes y certificados de lote aprobados por SENASA directo al WhatsApp del productor.',
        descriptionPt: 'Envia fichas técnicas, bulas e laudos de lote aprovados direto no WhatsApp do produtor rural.',
        tag: 'Normativa',
        tagPt: 'Regulatório',
        iconName: 'FileText'
      },
      {
        title: 'Ruteo de Envíos a Campo con Remito',
        titlePt: 'Logística de Entregas na Fazenda',
        description: 'Avisa automáticamente al encargado de campo el horario estimado de llegada del camión y adjunta el remito electrónico.',
        descriptionPt: 'Avisa o gerente da fazenda sobre o horário previsto do caminhão e anexa o comprovante de entrega.',
        tag: 'Logística',
        tagPt: 'Logística',
        iconName: 'Truck'
      }
    ],
    caseStudy: {
      company: 'AgroInsumos Valle Fértil',
      location: 'Río Negro & La Pampa',
      logoText: 'AGRO VALLE',
      challenge: 'Recibían más de 450 mensajes diarios durante la campaña de fertilización y el equipo de 3 agrónomos no daba abasto.',
      challengePt: 'Recebiam mais de 450 mensagens diárias durante a safra e a equipe técnica não conseguia atender a tempo.',
      result: 'Atención 100% inmediata, aumento del 28% en ventas de semillas certificadas y cero pedidos perdidos por demora.',
      resultPt: 'Atendimento 100% imediato, aumento de 28% nas vendas de sementes e zero pedidos perdidos por demora.',
      quote: 'Clientum transformó nuestro WhatsApp: los productores cotizan a cualquier hora, incluso un domingo de lluvia, y el lunes ya tenemos los camiones programados.',
      quotePt: 'A Clientum transformou nosso atendimento: produtores cotam a qualquer hora e nossa logística funciona sem gargalos.',
      author: 'Ing. Agr. Esteban Menéndez',
      role: 'Gerente Comercial'
    },
    faq: [
      {
        question: '¿El chatbot puede calcular precios según la cotización del dólar agro / pizarra del día?',
        questionPt: 'O chatbot calcula valores com base na cotação diária da moeda e commodities?',
        answer: 'Sí. El motor de Clientum puede conectarse a listas de precios dolarizadas y aplicar el tipo de cambio oficial o pizarra del día de forma automática.',
        answerPt: 'Sim. A plataforma pode atualizar tabelas em dólar e aplicar a cotação do dia de forma totalmente automática.'
      },
      {
        question: '¿Los productores necesitan instalar alguna aplicación para consultar?',
        questionPt: 'Os produtores rurais precisam baixar algum aplicativo?',
        answer: 'No. Toda la interacción ocurre dentro del WhatsApp habitual del productor, sin descargas ni registros complicados.',
        answerPt: 'Não. Toda a conversa acontece direto no WhatsApp que o produtor já utiliza diariamente.'
      },
      {
        question: '¿Se integra con nuestro sistema de gestión ERP y facturación de granos?',
        questionPt: 'Integra com nosso sistema ERP e faturamento agrícola?',
        answer: 'Sí, disponemos de Webhooks y APIs REST para sincronizar clientes, pedidos, listas de precios y comprobantes con tu software administrativo.',
        answerPt: 'Sim, dispomos de Webhooks e APIs para sincronizar clientes, pedidos e estoques com seu ERP atual.'
      }
    ],
    whatsappPrompt: 'Hola Clientum! Vi la solución especializada para Agro & Insumos. Quiero consultar para automatizar las cotizaciones y WhatsApp de mi agronomía.',
    whatsappPromptPt: 'Olá Clientum! Vi a solução especializada para o Agro. Gostaria de cotar para automatizar o WhatsApp da minha revenda agrícola.',
    relatedSlugs: ['distribuidoras', 'b2b', 'logistica', 'estudios-contables']
  },

  'estudios-contables': {
    slug: 'estudios-contables',
    aliases: ['estudio-contable', 'contable', 'contadores', 'contador', 'estudios-juridicos', 'afip'],
    name: 'Estudios Contables, Impositivos & Legales',
    namePt: 'Escritórios Contábeis & Jurídicos',
    tagline: 'Automatización de Recategorización AFIP, Liquidación Impositiva, Vencimientos y Atención a Clientes',
    taglinePt: 'Automação de Rotinas Fiscais, Guias de Impostos, Prazos e Atendimento',
    badge: 'Solución Contable & AFIP 2026',
    badgePt: 'Solução Contábil & Fiscal 2026',
    icon: Scale,
    simulatorId: 'contable',
    seo: {
      title: 'Software & Chatbot WhatsApp para Estudios Contables y AFIP | Clientum',
      titlePt: 'Software e Chatbot WhatsApp para Escritórios de Contabilidade | Clientum',
      description: 'Automatiza recordatorios de vencimiento de AFIP e Ingresos Brutos, recopilación de comprobantes y consultas de monotributo por WhatsApp con CRM para contadores.',
      descriptionPt: 'Automatize lembretes de impostos, guias fiscais e solicitações de documentos com WhatsApp Inteligente e CRM para contadores.',
      keywords: [
        'chatbot whatsapp estudio contable',
        'crm para contadores argentina',
        'automatizacion afip monotributo',
        'recordatorio vencimientos impositivos whatsapp',
        'sistema atencion clientes contables',
        'facturacion electronica para estudios'
      ],
      canonical: '/estudios-contables'
    },
    hero: {
      headline: 'Termina con el caos de consultas impositivas en tu',
      headlinePt: 'Elimine o estresse das rotinas fiscais no seu',
      highlight: 'Estudio Contable con WhatsApp IA y CRM',
      highlightPt: 'Escritório Contábil com IA e CRM',
      subheadline: 'Envía avisos de vencimientos AFIP masivos y personalizados, recibe comprobantes automáticamente y responde preguntas frecuentes sobre monotributo y liquidaciones sin saturar a tus contadores.',
      subheadlinePt: 'Envie lembretes de guias fiscais, receba documentos digitalizados e responda dúvidas recorrentes de clientes 24/7 sem sobrecarregar sua equipe.',
      badgePill: '⚖️ Especial para Contadores Públicos, Asesores Tributarios y SAS/SRL',
      badgePillPt: '⚖️ Especial para Contadores, Assessores Fiscais e Tributaristas',
      bullets: [
        { text: 'Recordatorios automáticos de vencimientos AFIP, IVA e IIBB', textPt: 'Lembretes automáticos de guias, DAS, DARF e obrigações' },
        { text: 'Recepción y ordenamiento de comprobantes de compras y ventas', textPt: 'Recepção e organização de notas fiscais e comprovantes' },
        { text: 'Diagnóstico express para captar nuevas empresas y monotributistas', textPt: 'Diagnóstico express para atrair novas empresas e clientes' }
      ]
    },
    metrics: [
      {
        value: '72%',
        label: 'Menos consultas repetitivas de clientes',
        labelPt: 'Menos dúvidas repetitivas de clientes',
        detail: 'El bot responde estados de cuenta, constancias de CUIT y fechas de vencimiento',
        detailPt: 'O bot envia guias, certidões e esclarece datas de vencimento na hora'
      },
      {
        value: '99.4%',
        label: 'Tasa de lectura en recordatorios de pago',
        labelPt: 'Taxa de abertura em lembretes fiscais',
        detail: 'Frente al 18% del correo tradicional que suele ir a spam',
        detailPt: 'Contra apenas 15% do e-mail tradicional que cai na caixa de spam'
      },
      {
        value: '12 hs/sem',
        label: 'Ahorro por profesional contable',
        labelPt: 'Economia semanal por contador',
        detail: 'Más tiempo dedicado a consultoría estratégica de alto valor para clientes',
        detailPt: 'Mais tempo para consultoria tributária de alto valor aos clientes'
      }
    ],
    painPoints: [
      {
        problem: 'Clientes pidiendo su VEP o volante de pago el mismo día del vencimiento a las 20:00 hs.',
        problemPt: 'Clientes pedindo a guia de imposto no dia do vencimento às 20h.',
        solution: 'Envío automático programado por WhatsApp con el PDF del VEP y botón de pago 5 días antes.',
        solutionPt: 'Envio automático programado com PDF da guia e código de barras 5 dias antes.'
      },
      {
        problem: 'Comprobantes enviados desordenados en fotos borrosas por WhatsApp sin identificación.',
        problemPt: 'Comprovantes enviados fora de prazo em fotos ilegíveis sem identificação.',
        solution: 'Canal guiado por IA que solicita CUIT, período y tipo de comprobante antes de guardarlo en el CRM.',
        solutionPt: 'Fluxo guiado por IA que solicita CNPJ, competência e tipo de documento organizadamente.'
      },
      {
        problem: 'Horas respondiendo preguntas básicas sobre topes de monotributo, facturación o certificados.',
        problemPt: 'Horas respondendo perguntas simples sobre enquadramento fiscal e certidões.',
        solution: 'Base de conocimiento entrenada con normativa vigente que asesora al cliente al instante.',
        solutionPt: 'Base de conhecimento treinada com a legislação que orienta o cliente imediatamente.'
      }
    ],
    features: [
      {
        title: 'Avisos de Vencimiento Automatizados',
        titlePt: 'Avisos de Vencimento Automatizados',
        description: 'Programa envíos segmentados por terminación de CUIT para IVA, Ganancias, Ingresos Brutos, Autónomos y Monotributo.',
        descriptionPt: 'Programe disparos segmentados por final de CNPJ para impostos municipais, estaduais e federais.',
        tag: 'Sin Mora',
        tagPt: 'Sem Multas',
        iconName: 'Clock'
      },
      {
        title: 'Buzón de Comprobantes & CAE',
        titlePt: 'Coleta de Documentos Fiscais',
        description: 'Tus clientes envían sus facturas de compras por WhatsApp y el sistema las categoriza por carpeta de cliente.',
        descriptionPt: 'Seus clientes enviam notas fiscais pelo WhatsApp e a plataforma organiza por pasta de cliente.',
        tag: 'Orden Total',
        tagPt: 'Organização',
        iconName: 'Database'
      },
      {
        title: 'Simulador de Constitución SAS / SRL',
        titlePt: 'Simulador de Abertura de Empresa',
        description: 'Permite a emprendedores calcular costos de honorarios, requisitos y tiempos de inscripción en Personas Jurídicas/AFIP.',
        descriptionPt: 'Permite aos empresários calcular custos, taxas e prazos de abertura de sociedade comercial.',
        tag: 'Captación',
        tagPt: 'Novos Clientes',
        iconName: 'TrendingUp'
      },
      {
        title: 'Portal de Clientes & Descargas',
        titlePt: 'Portal do Cliente & Certidões',
        description: 'Acceso seguro para que las empresas descarguen sus balances, declaraciones juradas y constancias cuando las necesiten.',
        descriptionPt: 'Acesso seguro para que as empresas baixem balanços, folhas e certidões a qualquer momento.',
        tag: 'Autogestión',
        tagPt: 'Autosserviço',
        iconName: 'Users'
      }
    ],
    caseStudy: {
      company: 'Estudio Contable & Asociados Sur',
      location: 'Neuquén & Bahía Blanca',
      logoText: 'SUR CONTABLE',
      challenge: 'Gestionaban más de 180 PyMEs y dedicaban los primeros 10 días del mes exclusivamente a responder WhatsApps de comprobantes.',
      challengePt: 'Gerenciavam 180 PMEs e passavam os primeiros 10 dias do mês respondendo WhatsApps de guias.',
      result: 'Reducción del 80% en mensajes de urgencia por vencimientos y captación de 24 nuevas cuentas comerciales en 3 meses.',
      resultPt: 'Redução de 80% nas mensagens de urgência e captação de 24 novas contas em 3 meses.',
      quote: 'Clientum nos permitió escalar de 180 a 300 clientes sin tener que duplicar el personal administrativo. La tranquilidad con los vencimientos no tiene precio.',
      quotePt: 'A Clientum nos permitiu escalar nossa carteira de clientes sem sobrecarregar a equipe. O controle de prazos é impecável.',
      author: 'Cra. Valeria Benítez',
      role: 'Socia Directora'
    },
    faq: [
      {
        question: '¿Se pueden enviar VEPs y liquidaciones en formato PDF automáticamente?',
        questionPt: 'É possível enviar guias de pagamento e relatórios em PDF automaticamente?',
        answer: 'Sí. Puedes cargar los comprobantes por cliente y programar el envío con el mensaje personalizado y botón de confirmación de recepción.',
        answerPt: 'Sim. Você pode anexar as guias e agendar o disparo com mensagem personalizada e confirmação de leitura.'
      },
      {
        question: '¿Qué seguridad tienen los datos fiscales de nuestros clientes?',
        questionPt: 'Qual a segurança dos dados fiscais dos nossos clientes?',
        answer: 'Cumplimos con estrictos protocolos de encriptación TLS 1.3 y aislamiento por cuenta para resguardar información confidencial y societaria.',
        answerPt: 'Adotamos criptografia de ponta a ponta e rígidos padrões de segurança e privacidade de dados.'
      },
      {
        question: '¿Podemos tener números de WhatsApp independientes por cada área del estudio?',
        questionPt: 'Podemos ter linhas de WhatsApp separadas por setor do escritório?',
        answer: 'Sí. Clientum soporta múltiples números o una única línea central con derivación automática a: Impuestos, Sueldos, Societario o Administración.',
        answerPt: 'Sim. A plataforma suporta múltiplos números ou um canal central com menu inteligente para: Fiscal, Departamento Pessoal, Contábil e Financeiro.'
      }
    ],
    whatsappPrompt: 'Hola Clientum! Vi la solución para Estudios Contables. Quiero conocer cómo automatizar los avisos de vencimiento AFIP y atención de clientes.',
    whatsappPromptPt: 'Olá Clientum! Vi a solução para Escritórios de Contabilidade. Gostaria de saber como automatizar avisos fiscais e atendimento.',
    relatedSlugs: ['b2b', 'agro', 'distribuidoras', 'inmobiliaria']
  },

  'distribuidoras': {
    slug: 'distribuidoras',
    aliases: ['mayoristas', 'distribucion', 'distribuidora', 'deposito-mayorista', 'logistica'],
    name: 'Distribuidoras & Mayoristas',
    namePt: 'Distribuidoras & Atacado',
    tagline: 'Toma de Pedidos por WhatsApp, Listas de Precios por Categoría y Rastreo de Despachos',
    taglinePt: 'Pedidos no WhatsApp, Tabelas de Preços por Categoria e Rastreio de Entregas',
    badge: 'Solución Mayorista B2B 2026',
    badgePt: 'Solução Atacadista B2B 2026',
    icon: Truck,
    simulatorId: 'distribuidoras',
    seo: {
      title: 'Chatbot WhatsApp & CRM para Distribuidoras Mayoristas | Clientum',
      titlePt: 'Chatbot WhatsApp e CRM para Distribuidoras e Atacado | Clientum',
      description: 'Automatiza la toma de pedidos de tus clientes comerciantes por WhatsApp. Envía listas de precios por bulto cerrado y rastreo de camiones en tiempo real.',
      descriptionPt: 'Automatize pedidos no atacado via WhatsApp. Envie tabelas de preços por volume, consulte estoque e informe rastreamento de entregas.',
      keywords: [
        'chatbot whatsapp distribuidoras mayoristas',
        'toma de pedidos por whatsapp b2b',
        'sistema crm para distribuidoras argentina',
        'lista de precios pdf whatsapp mayorista',
        'rastreo de pedidos repartos distribucion'
      ],
      canonical: '/distribuidoras'
    },
    hero: {
      headline: 'Acelera la toma de pedidos y cobranzas de tu',
      headlinePt: 'Acelere pedidos e cobranças da sua',
      highlight: 'Distribuidora Mayorista con WhatsApp IA',
      highlightPt: 'Distribuidora Atacadista com WhatsApp IA',
      subheadline: 'Permite que comercios, kioscos, supermercados y clientes B2B consulten stock, descarguen tu lista de precios mayorista y pasen su pedido en segundos las 24 horas del día.',
      subheadlinePt: 'Permita que lojistas e revendedores consultem estoque, baixem tabelas de preços e façam pedidos em segundos a qualquer hora do dia.',
      badgePill: '📦 Para Mayoristas de Alimentos, Bebidas, Limpieza, Ferretería y Repuestos',
      badgePillPt: '📦 Para Atacadistas de Alimentos, Bebidas, Limpeza, Ferragens e Peças',
      bullets: [
        { text: 'Descarga automática de lista de precios según condición comercial', textPt: 'Envio automático de tabela conforme perfil comercial' },
        { text: 'Cierre de pedidos fuera del horario de oficina directo a depósito', textPt: 'Recepção de pedidos 24/7 direto para separação no depósito' },
        { text: 'Aviso de estado de remito y camión de reparto al comercio', textPt: 'Rastreamento de entrega e horário estimado ao lojista' }
      ]
    },
    metrics: [
      {
        value: '+42%',
        label: 'Incremento en pedidos fuera de horario',
        labelPt: 'Aumento em pedidos fora do expediente',
        detail: 'Comerciantes que pasan sus faltantes de noche al cerrar su local',
        detailPt: 'Comerciantes que repõem estoque à noite ao fechar a loja'
      },
      {
        value: '< 4 min',
        label: 'Tiempo de confirmación de pedido',
        labelPt: 'Tempo para confirmação do pedido',
        detail: 'Validación de CUIT, bultos mínimos y condición de pago automática',
        detailPt: 'Validação de CNPJ, pedido mínimo e condições de pagamento'
      },
      {
        value: '85%',
        label: 'Menos llamadas de "¿Por dónde viene mi pedido?"',
        labelPt: 'Menos chamadas de "Onde está minha entrega?"',
        detail: 'El bot responde el estado del remito y camión al instante',
        detailPt: 'O assistente informa o status do caminhão e previsão de chegada'
      }
    ],
    painPoints: [
      {
        problem: 'Vendedores y preventistas pasando horas transcribiendo audios de WhatsApp a mano.',
        problemPt: 'Vendedores perdendo horas transcrevendo áudios de pedidos manualmente.',
        solution: 'IA que procesa audios y listas escritas, genera el pedido estructurado y lo valida con stock.',
        solutionPt: 'IA que processa áudios e textos, monta o pedido estruturado e confere estoque.'
      },
      {
        problem: 'Comerciantes pidiendo listas de precios actualizadas y vendedores enviando versiones viejas.',
        problemPt: 'Clientes pedindo tabelas e vendedores enviando PDFs com preços desatualizados.',
        solution: 'Envío instantáneo de la lista vigente generada en PDF según categoría de cliente.',
        solutionPt: 'Envio instantâneo do catálogo atualizado conforme o perfil do comprador.'
      },
      {
        problem: 'Teléfonos colapsados los días de entrega con reclamos sobre horario de llegada.',
        problemPt: 'Linhas telefônicas congestionadas com clientes querendo saber o horário do caminhão.',
        solution: 'Mensajes automáticos con geolocalización y rango horario estimado de descarga.',
        solutionPt: 'Mensagens automáticas com previsão estimada de chegada da transportadora.'
      }
    ],
    features: [
      {
        title: 'Toma de Pedidos Inteligente (Voz y Texto)',
        titlePt: 'Recepção de Pedidos por Voz e Texto',
        description: 'El comerciante puede enviar un audio diciendo "Mandame 10 cajas de aceite y 5 de harina" y la IA arma el remito borrador con códigos de producto.',
        descriptionPt: 'O cliente pode enviar um áudio com o pedido e a IA converte em lista com códigos de itens para conferência.',
        tag: 'Agilidad',
        tagPt: 'Agilidade',
        iconName: 'Zap'
      },
      {
        title: 'Listas de Precios Segmentadas',
        titlePt: 'Tabelas de Preços por Segmento',
        description: 'Entrega listas con descuentos por volumen, bulto cerrado o cliente especial según el CUIT registrado.',
        descriptionPt: 'Disponibiliza descontos escalonados por volume e condições personalizadas por cliente.',
        tag: 'Margen Seguro',
        tagPt: 'Margem Segura',
        iconName: 'BarChart3'
      },
      {
        title: 'Rastreo de Despacho & Remito Digital',
        titlePt: 'Rastreamento de Despacho e Carga',
        description: 'Consulta de estado de ruta en tiempo real para que los clientes sepan cuándo llega el camión sin llamar a administración.',
        descriptionPt: 'Consulta de status de entrega para que o cliente acompanhe sem ligar para a central.',
        tag: 'Logística',
        tagPt: 'Logística',
        iconName: 'Truck'
      },
      {
        title: 'Gestión de Cuentas Corrientes y Saldos',
        titlePt: 'Gestão de Limite e Contas a Receber',
        description: 'Informa saldo deudor, facturas pendientes y datos bancarios para transferencia con conciliación ágil.',
        descriptionPt: 'Informa extrato financeiro, faturas em aberto e dados bancários para quitação rápida.',
        tag: 'Cobranzas',
        tagPt: 'Financeiro',
        iconName: 'FileText'
      }
    ],
    caseStudy: {
      company: 'Distribuidora Mayorista Patagonia',
      location: 'General Roca & Alto Valle',
      logoText: 'MAYORISTA SUR',
      challenge: 'Atendían a más de 600 comercios en 14 ciudades y el 40% de los pedidos llegaba con errores por audios mal anotados.',
      challengePt: 'Atendiam 600 lojistas e 40% dos pedidos chegavam com divergências de produtos e preços.',
      result: 'Eliminaron los errores de carga en un 95% y aumentaron un 35% las ventas nocturnas automatizadas.',
      resultPt: 'Reduziram os erros em 95% e aumentaram em 35% os pedidos noturnos automatizados.',
      quote: 'Los almaceneros nos hacen el pedido a las 23:00 hs cuando cierran. Para cuando llegamos al depósito a las 7:00 am, ya están los remitos armados listos para cargar los camiones.',
      quotePt: 'Os clientes passam o pedido de madrugada e quando a equipe chega ao depósito, tudo já está pronto para expedição.',
      author: 'Marcos Calvo',
      role: 'Director de Operaciones'
    },
    faq: [
      {
        question: '¿Cómo reconoce la IA los nombres de nuestros productos y marcas?',
        questionPt: 'Como a IA reconhece os nomes e códigos dos nossos produtos?',
        answer: 'Entrenamos al modelo con tu catálogo oficial, sinónimos populares, marcas y unidades de empaque (bulto, pack, pallet, kg).',
        answerPt: 'Treinamos o assistente com seu catálogo, variações de nomes, marcas e unidades de medida (caixa, fardo, pallet).'
      },
      {
        question: '¿Se puede configurar un monto mínimo para confirmar un pedido mayorista?',
        questionPt: 'É possível definir valor mínimo para validar o pedido?',
        answer: 'Sí. El bot valida que el pedido cumpla con los bultos o importe mínimo antes de enviarlo al sistema de preparación.',
        answerPt: 'Sim. O sistema verifica regras de pedido mínimo antes de repassar à equipe de expedição.'
      },
      {
        question: '¿Qué pasa si un producto pedido no tiene stock?',
        questionPt: 'O que acontece se um produto solicitado estiver em falta?',
        answer: 'La IA informa la falta de stock al instante y sugiere productos alternativos con precio equivalente para no perder la venta.',
        answerPt: 'A IA avisa imediatamente e sugere itens substitutos similares para garantir a venda.'
      }
    ],
    whatsappPrompt: 'Hola Clientum! Vi la solución para Distribuidoras Mayoristas. Quiero cotizar el sistema de toma de pedidos por WhatsApp y CRM.',
    whatsappPromptPt: 'Olá Clientum! Vi a solução para Distribuidoras. Gostaria de cotar o sistema de pedidos no WhatsApp e CRM.',
    relatedSlugs: ['agro', 'ecommerce', 'b2b', 'logistica']
  },

  'salud': {
    slug: 'salud',
    aliases: ['clinicas', 'medicos', 'consultorios-medicos', 'odontologia', 'centros-medicos', 'sanatorios'],
    name: 'Salud, Clínicas & Centros Médicos',
    namePt: 'Saúde, Clínicas & Consultórios',
    tagline: 'Agendamiento Inteligente de Turnos, Confirmación de Asistencia y Verificación de Obras Sociales',
    taglinePt: 'Agendamento de Consultas, Confirmação de Presença e Convênios',
    badge: 'Solución Salud & Clínicas 2026',
    badgePt: 'Solução Saúde & Clínicas 2026',
    icon: Stethoscope,
    simulatorId: 'salud',
    seo: {
      title: 'Chatbot WhatsApp para Clínicas Médicas y Turnos | Clientum',
      titlePt: 'Chatbot WhatsApp para Clínicas Médicas e Agendamento | Clientum',
      description: 'Reduce el ausentismo de pacientes y satura tu agenda médica. Agendamiento de turnos 24/7 por WhatsApp, verificación de prepagas e indicaciones pre-quirúrgicas.',
      descriptionPt: 'Reduza o absenteísmo de pacientes. Agendamento de consultas 24/7 no WhatsApp, confirmação automática e orientações de preparo de exames.',
      keywords: [
        'chatbot turnos medicos whatsapp',
        'sistema de turnos para clinicas argentina',
        'reducir ausentismo pacientes whatsapp',
        'confirmacion turnos automatica clinica',
        'software gestion consultorios medicos'
      ],
      canonical: '/salud'
    },
    hero: {
      headline: 'Llena la agenda de tus profesionales y reduce ausencias en tu',
      headlinePt: 'Lote a agenda dos seus especialistas e reduza faltas na sua',
      highlight: 'Clínica o Centro Médico con IA en WhatsApp',
      highlightPt: 'Clínica ou Consultório com IA no WhatsApp',
      subheadline: 'Permite a tus pacientes agendar consultas por especialidad las 24 hs, recibir recordatorios con confirmación y obtener indicaciones para análisis clínicos o estudios sin llamar por teléfono.',
      subheadlinePt: 'Permita que seus pacientes agendem consultas 24h, recebam lembretes automáticos com confirmação e tenham instruções de preparo de exames na hora.',
      badgePill: '🏥 Especial para Sanatorios, Clínicas Odontológicas, Diagnóstico por Imágenes y Consultorios',
      badgePillPt: '🏥 Para Clínicas Médicas, Odontológicas, Centros de Diagnóstico e Consultórios',
      bullets: [
        { text: 'Agendamiento automático sincronizado con la agenda de los médicos', textPt: 'Agendamento sincronizado com a agenda dos médicos' },
        { text: 'Recordatorios con botón "Confirmar" o "Reprogramar" 24 hs antes', textPt: 'Lembretes com botão de confirmação ou reagendamento' },
        { text: 'Información de coberturas, obras sociales y prepagas atendidas', textPt: 'Informações sobre convênios, coberturas e coparticipações' }
      ]
    },
    metrics: [
      {
        value: '-65%',
        label: 'Reducción en ausentismo a turnos',
        labelPt: 'Redução de faltas em consultas',
        detail: 'Gracias a recordatorios inteligentes y reprogramación fácil en un click',
        detailPt: 'Graças a lembretes automáticos e reagendamento fácil em um clique'
      },
      {
        value: '24/7',
        label: 'Disponibilidad para solicitar turnos',
        labelPt: 'Disponibilidade para agendamento',
        detail: 'El 48% de los turnos se solicitan fuera del horario de secretaría',
        detailPt: 'Quase metade dos agendamentos ocorrem fora do horário comercial'
      },
      {
        value: '80%',
        label: 'Menos llamadas telefónicas en recepción',
        labelPt: 'Menos chamadas na recepção',
        detail: 'Secretarias libres para atender a los pacientes presenciales con calidez',
        detailPt: 'Equipe da recepção livre para acolher os pacientes com atenção'
      }
    ],
    painPoints: [
      {
        problem: 'Líneas de la clínica saturadas por la mañana y pacientes frustrados que se van a otro centro.',
        problemPt: 'Telefones da clínica ocupados e pacientes frustrados indo para a concorrência.',
        solution: 'Bot de WhatsApp capaz de atender a 500 pacientes simultáneos sin espera.',
        solutionPt: 'Assistente no WhatsApp capaz de atender centenas de pacientes ao mesmo tempo.'
      },
      {
        problem: 'Pacientes que faltan sin avisar dejando huecos improductivos en la agenda de los especialistas.',
        problemPt: 'Pacientes que faltam sem avisar gerando horários ociosos para os médicos.',
        solution: 'Confirmaciones automáticas 24hs antes con reasignación inmediata del turno liberado.',
        solutionPt: 'Confirmação automática de presença com liberação rápida do horário para encaixes.'
      },
      {
        problem: 'Pacientes que llegan a ecografías o análisis sin la preparación necesaria perdiendo el turno.',
        problemPt: 'Pacientes que chegam a exames sem o preparo adequado e perdem o horário.',
        solution: 'Envío automático de instrucciones de ayuno o preparación previa por WhatsApp al agendar.',
        solutionPt: 'Envio das instruções de preparo e jejum direto no WhatsApp ao confirmar o exame.'
      }
    ],
    features: [
      {
        title: 'Agendador de Turnos por Especialidad',
        titlePt: 'Agendamento por Especialidade',
        description: 'Muestra los días y horarios libres de cada médico y confirma la cita en el calendario automáticamente.',
        descriptionPt: 'Exibe horários livres de cada especialista e confirma a consulta na agenda integrada.',
        tag: 'Sin Espera',
        tagPt: 'Sem Espera',
        iconName: 'Clock'
      },
      {
        title: 'Verificador de Obras Sociales & Reintegros',
        titlePt: 'Consulta de Convênios & Coparticipação',
        description: 'Informa qué planes de OSDE, Swiss Medical, Galeno o prepagas aplican y los requisitos de orden médica.',
        descriptionPt: 'Informa convênios atendidos, regras de guia médica e valores de consultas particulares.',
        tag: 'Claridad',
        tagPt: 'Transparência',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Guías de Preparación para Estudios',
        titlePt: 'Instruções de Preparo de Exames',
        description: 'Envía las indicaciones exactas de ayuno, líquidos o medicación para resonancias, ecografías y análisis clínicos.',
        descriptionPt: 'Envia instruções detalhadas de jejum e preparo para ultrassom, exames de sangue e imagens.',
        tag: 'Calidad Médica',
        tagPt: 'Qualidade',
        iconName: 'FileText'
      },
      {
        title: 'Recordatorio y Reprogramación en 1 Click',
        titlePt: 'Confirmação e Reagendamento Fácil',
        description: 'Permite al paciente confirmar o cancelar con un botón, reubicando el espacio libre de inmediato.',
        descriptionPt: 'Permite ao paciente confirmar ou cancelar com um toque, abrindo a vaga para outros.',
        tag: 'Agenda Llena',
        tagPt: 'Agenda Cheia',
        iconName: 'CheckCircle2'
      }
    ],
    caseStudy: {
      company: 'Centro Médico & Diagnóstico Sanitas',
      location: 'Neuquén Capital',
      logoText: 'SANITAS',
      challenge: 'Tenían un 28% de ausentismo en turnos de especialistas y 4 recepcionistas atendiendo llamadas continuas.',
      challengePt: 'Tinham 28% de faltas em consultas com especialistas e recepção sobrecarregada.',
      result: 'El ausentismo cayó al 7.5% y el 64% de los turnos hoy se gestionan 100% por WhatsApp sin intervención humana.',
      resultPt: 'O absenteísmo caiu para 7.5% e 64% dos agendamentos ocorrem automaticamente pelo WhatsApp.',
      quote: 'Los médicos están felices porque no tienen huecos en sus consultorios y los pacientes valoran poder sacar turno a las diez de la noche desde su casa.',
      quotePt: 'Nossos médicos trabalham com a agenda completa e os pacientes elogiam a praticidade de marcar consulta a qualquer hora.',
      author: 'Dra. Silvina Morales',
      role: 'Directora Médica'
    },
    faq: [
      {
        question: '¿El sistema se puede conectar con nuestro software médico existente?',
        questionPt: 'O sistema se integra ao nosso prontuário e software de agendamento?',
        answer: 'Sí. Disponemos de conectores y APIs para sincronizar con sistemas de historia clínica y agendas médicas habituales.',
        answerPt: 'Sim. Dispomos de integrações para sincronizar com os principais softwares de gestão clínica.'
      },
      {
        question: '¿Cumple con las normas de confidencialidad de datos de salud?',
        questionPt: 'Atende às normas de privacidade e sigilo médico?',
        answer: 'Absolutamente. Todas las conversaciones están cifradas y no almacenamos diagnósticos sensibles en servidores públicos.',
        answerPt: 'Sim. Todos os dados são protegidos por criptografia e seguimos padrões rigorosos de privacidade médica.'
      },
      {
        question: '¿Qué pasa si un paciente consulta por una urgencia o emergencia médica?',
        questionPt: 'E se o paciente relatar uma emergência médica no chat?',
        answer: 'La IA está programada para detectar palabras clave de riesgo y emitir de inmediato los teléfonos de emergencias médicas / guardia con derivación prioritaria.',
        answerPt: 'O assistente detecta palavras de risco e orienta imediatamente o contato com o pronto-socorro mais próximo.'
      }
    ],
    whatsappPrompt: 'Hola Clientum! Vi la solución para Clínicas y Centros Médicos. Quiero solicitar una demo del agendador de turnos por WhatsApp.',
    whatsappPromptPt: 'Olá Clientum! Vi a solução para Clínicas Médicas. Gostaria de ver uma demonstração do agendador no WhatsApp.',
    relatedSlugs: ['estudios-contables', 'b2b', 'inmobiliaria', 'gastronomia']
  },

  'inmobiliaria': {
    slug: 'inmobiliaria',
    aliases: ['inmobiliarias', 'real-estate', 'propiedades', 'bienes-raices', 'desarrollos-inmobiliarios'],
    name: 'Inmobiliarias & Real Estate',
    namePt: 'Imobiliárias & Construção',
    tagline: 'Fichas de Propiedades por WhatsApp, Calificación de Inversores y Coordinación de Visitas',
    taglinePt: 'Catálogo de Imóveis no WhatsApp, Qualificação de Leads e Visitas',
    badge: 'Solución Real Estate 2026',
    badgePt: 'Solução Imobiliária 2026',
    icon: Home,
    simulatorId: 'inmobiliaria',
    seo: {
      title: 'CRM & Chatbot WhatsApp para Inmobiliarias y Propiedades | Clientum',
      titlePt: 'CRM e Chatbot WhatsApp para Imobiliárias e Corretores | Clientum',
      description: 'Envía fichas con fotos, precios y ubicación de departamentos y casas por WhatsApp. Califica presupuesto de compradores y agenda visitas automáticamente.',
      descriptionPt: 'Envie fichas de imóveis com fotos, valores e localização no WhatsApp. Qualifique o perfil dos compradores e agende visitas com corretores.',
      keywords: [
        'crm inmobiliario whatsapp argentina',
        'chatbot para inmobiliarias',
        'calificacion leads real estate whatsapp',
        'fichas de propiedades por whatsapp bot',
        'software atencion clientes inmobiliaria'
      ],
      canonical: '/inmobiliaria'
    },
    hero: {
      headline: 'Vende y alquila más propiedades sin perder leads en tu',
      headlinePt: 'Venda e alugue mais imóveis sem perder clientes na sua',
      highlight: 'Inmobiliaria con WhatsApp IA y CRM',
      highlightPt: 'Imobiliária com WhatsApp IA e CRM',
      subheadline: 'Responde consultas de portales (Zonaprop, Argenprop, MercadoLibre) en menos de 10 segundos, envía fichas con fotos por WhatsApp y califica el presupuesto antes de pasar el contacto al martillero.',
      subheadlinePt: 'Responda interessados de portais em segundos, envie fotos e características pelo WhatsApp e qualifique o potencial de compra antes da visita com o corretor.',
      badgePill: '🏢 Para Inmobiliarias, Desarrolladoras, Loteos y Administraciones de Alquileres',
      badgePillPt: '🏢 Para Imobiliárias, Construtoras, Loteamentos e Gestoras de Locação',
      bullets: [
        { text: 'Envío de fotos, planos, expensas y ubicación por WhatsApp', textPt: 'Envio de fotos, plantas, condomínio e localização no WhatsApp' },
        { text: 'Calificación automática de presupuesto, zona y forma de pago', textPt: 'Qualificação de orçamento, bairro de interesse e condições' },
        { text: 'Agendamiento de visitas presenciales coordinadas con el asesor', textPt: 'Agendamento de visitas presenciais integrado à agenda' }
      ]
    },
    metrics: [
      {
        value: '< 5 seg',
        label: 'Respuesta inmediata a interesados',
        labelPt: 'Resposta imediata aos interessados',
        detail: 'Captura al comprador mientras está mirando la propiedad en su teléfono',
        detailPt: 'Conquista o comprador no exato momento da busca'
      },
      {
        value: '+380%',
        label: 'Visitas presenciales calificadas',
        labelPt: 'Visitas presenciais qualificadas',
        detail: 'Los asesores solo visitan a clientes con presupuesto y garantía validada',
        detailPt: 'Corretores atendem apenas clientes com perfil compatível'
      },
      {
        value: '3x',
        label: 'Captación de propiedades para tasar',
        labelPt: 'Captação de imóveis para avaliação',
        detail: 'Formulario de tasación express por WhatsApp para propietarios',
        detailPt: 'Formulário de pré-avaliação no WhatsApp para proprietários'
      }
    ],
    painPoints: [
      {
        problem: 'Leads de portales inmobiliarios que tardan 2 días en recibir respuesta y ya alquilaron otro lugar.',
        problemPt: 'Leads de portais que esperam 2 dias por contato e já fecharam com outra imobiliária.',
        solution: 'Contacto automático instantáneo por WhatsApp con el link de la propiedad consultada.',
        solutionPt: 'Contato imediato no WhatsApp com a ficha completa do imóvel solicitado.'
      },
      {
        problem: 'Martilleros perdiendo tardes enteras en visitas con personas que no cumplen con los requisitos.',
        problemPt: 'Corretores perdendo tempo em visitas com clientes sem renda ou garantia comprovada.',
        solution: 'Filtro previo donde la IA valida presupuesto, tipo de garantía y fecha estimada de mudanza.',
        solutionPt: 'Filtro onde a IA confere faixa de preço, garantias aceitas e prazo de mudança.'
      },
      {
        problem: 'Inquilinos y propietarios llamando para consultar fechas de pago y liquidación de expensas.',
        problemPt: 'Inquilinos e proprietários ligando para saber status de aluguéis e boletos.',
        solution: 'Canal de autogestión de alquileres que entrega recibos y estados de cuenta en un toque.',
        solutionPt: 'Canal de autosserviço que fornece boletos e extratos de repasse em um toque.'
      }
    ],
    features: [
      {
        title: 'Buscador de Propiedades Interactivo',
        titlePt: 'Buscador de Imóveis no WhatsApp',
        description: 'El usuario escribe "Busco 2 ambientes en alquiler con cochera en el centro" y recibe las 3 mejores opciones con fotos y precios.',
        descriptionPt: 'O cliente digita seu interesse e recebe as melhores opções com fotos, fotos e valores.',
        tag: 'Conversión',
        tagPt: 'Conversão',
        iconName: 'Home'
      },
      {
        title: 'Filtro y Calificación de Garantías',
        titlePt: 'Validação de Perfil e Garantias',
        description: 'Verifica si el interesado dispone de recibos de sueldo, seguro de caución o garantía propietaria antes de agendar.',
        descriptionPt: 'Verifica garantias aceitas (fiador, seguro fiança ou caução) antes de agendar a visita.',
        tag: 'Filtro Seguro',
        tagPt: 'Filtro Seguro',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Captación y Tasaciones en Línea',
        titlePt: 'Captação de Imóveis e Pré-Avaliação',
        description: 'Atrae a propietarios que desean vender o alquilar solicitando metros cuadrados, fotos y ubicación para una tasación en 24 hs.',
        descriptionPt: 'Atrai proprietários solicitando dados do imóvel para uma avaliação ágil da equipe.',
        tag: 'Crecimiento',
        tagPt: 'Captação',
        iconName: 'TrendingUp'
      },
      {
        title: 'Sincronización con CRM Inmobiliario',
        titlePt: 'Integração com CRM Imobiliário',
        description: 'Registra cada consulta con origen del portal, historial de propiedades vistas y notas del asesor comercial.',
        descriptionPt: 'Registra histórico de imóveis consultados, origem do lead e observações do corretor.',
        tag: 'Control Total',
        tagPt: 'Gestão',
        iconName: 'Database'
      }
    ],
    caseStudy: {
      company: 'Patagonia Propiedades & Desarrollos',
      location: 'Río Negro & Neuquén',
      logoText: 'PATAGONIA REALTY',
      challenge: 'Perdían más del 50% de los contactos que entraban por Zonaprop durante el fin de semana sin ser atendidos.',
      challengePt: 'Perdiam mais de 50% dos leads de portais recebidos nos finais de semana.',
      result: 'Atención 24/7 inmediata, 45 visitas agendadas por semana en piloto automático y aumento del 32% en cierres.',
      resultPt: 'Atendimento 24/7, 45 visitas agendadas por semana e 32% de aumento em fechamentos.',
      quote: 'Ahora un interesado consulta a las 23:00 hs por un departamento y en 2 minutos ya vio las fotos, el plano y tiene agendada la visita con nuestro martillero para el martes a las 11:00.',
      quotePt: 'O cliente pesquisa à noite e em minutos já recebe fotos, valores e agenda a visita com nosso corretor.',
      author: 'Martillero Rodrigo Varela',
      role: 'Socio Fundador'
    },
    faq: [
      {
        question: '¿Se puede conectar con portales como Zonaprop, Argenprop o MercadoLibre Inmuebles?',
        questionPt: 'É possível integrar com portais imobiliários como Zap, VivaReal e OLX?',
        answer: 'Sí. Sincronizamos las consultas entrantes por email/webhook de los portales para iniciar la conversación por WhatsApp al instante.',
        answerPt: 'Sim. Conectamos os alertas de leads dos portais para iniciar o atendimento no WhatsApp imediatamente.'
      },
      {
        question: '¿Envía archivos PDF y videos de los departamentos?',
        questionPt: 'O bot envia arquivos em PDF, vídeos e localização do imóvel?',
        answer: 'Sí. El bot puede compartir galerías de fotos, tours virtuales 360, fichas técnicas en PDF y ubicación exacta en Google Maps.',
        answerPt: 'Sim. O assistente envia fotos, vídeos, plantas e localização no mapa para o comprador.'
      },
      {
        question: '¿Cómo se organizan los asesores de la inmobiliaria para no superponerse?',
        questionPt: 'Como os corretores da imobiliária distribuem os atendimentos?',
        answer: 'Utilizamos reglas de distribución por zona geográfica, tipo de propiedad (alquiler/venta) o asignación rotativa justa (round-robin).',
        answerPt: 'Configuramos regras de distribuição por bairro, tipo de imóvel (locação/venda) ou rodízio de corretores.'
      }
    ],
    whatsappPrompt: 'Hola Clientum! Vi la solución para Inmobiliarias y Real Estate. Quiero ver cómo funciona el envío de fichas y agendamiento por WhatsApp.',
    whatsappPromptPt: 'Olá Clientum! Vi a solução para Imobiliárias. Gostaria de ver o envio de fichas e agendamento de visitas no WhatsApp.',
    relatedSlugs: ['construccion', 'b2b', 'estudios-contables', 'gastronomia']
  },

  'gastronomia': {
    slug: 'gastronomia',
    aliases: ['restaurantes', 'bares', 'food-service', 'gastronomicos', 'cafeterias', 'pizzerias'],
    name: 'Gastronomía, Bares & Restaurantes',
    namePt: 'Gastronomia, Bares & Restaurantes',
    tagline: 'Reservas de Mesas Automatizadas, Menú Digital Interactivo y Toma de Pedidos Delivery',
    taglinePt: 'Reservas de Mesas no WhatsApp, Cardápio Digital e Pedidos de Delivery',
    badge: 'Solución Gastronómica 2026',
    badgePt: 'Solução Gastronômica 2026',
    icon: Coffee,
    simulatorId: 'gastronomia',
    seo: {
      title: 'Chatbot WhatsApp para Restaurantes y Reservas | Clientum',
      titlePt: 'Chatbot WhatsApp para Restaurantes e Reservas de Mesas | Clientum',
      description: 'Automatiza reservas de mesas, envía tu menú digital con fotos y precios, y gestiona pedidos delivery por WhatsApp sin pagar comisiones de apps.',
      descriptionPt: 'Automatize reservas de mesas, envie cardápio digital atualizado e gerencie pedidos de delivery pelo WhatsApp sem comissões abusivas.',
      keywords: [
        'chatbot reservas restaurantes whatsapp',
        'sistema reservas mesas automatico',
        'menu digital whatsapp argentina',
        'delivery por whatsapp sin comision',
        'software para bares y gastronomia'
      ],
      canonical: '/gastronomia'
    },
    hero: {
      headline: 'Llena tu salón y multiplica tus pedidos delivery en tu',
      headlinePt: 'Lote seu salão e aumente pedidos de delivery no seu',
      highlight: 'Restaurante con WhatsApp IA y Menú Digital',
      highlightPt: 'Restaurante com WhatsApp IA e Cardápio',
      subheadline: 'Gestiona reservas de mesas los fines de semana, responde preguntas sobre platos para celíacos o vegetarianos y recibe comandas de delivery directo en tu cocina sin pagar 35% de comisión.',
      subheadlinePt: 'Gerencie reservas para o final de semana, informe cardápio com fotos e receba pedidos de delivery direto na cozinha sem pagar altas taxas de aplicativos.',
      badgePill: '🍷 Para Restaurantes, Bares, Cervecerías, Pizzerías y Franquicias Gastronómicas',
      badgePillPt: '🍷 Para Restaurantes, Bares, Hamburguerias, Pizzarias e Cafés',
      bullets: [
        { text: 'Reservas automáticas con confirmación de comensales y salón/terraza', textPt: 'Reservas automáticas com escolha de mesa e horário' },
        { text: 'Carta de platos y vinos interactiva con fotos y precios al día', textPt: 'Cardápio interativo com fotos, preços e opções do dia' },
        { text: 'Pedidos de delivery con cálculo de envío y medios de pago', textPt: 'Pedidos de delivery com taxa de entrega e pagamento ágil' }
      ]
    },
    metrics: [
      {
        value: '+220%',
        label: 'Reservas completadas sin llamar al local',
        labelPt: 'Reservas feitas sem ligar para o salão',
        detail: 'Clientes que reservan mesa a cualquier hora sin interrumpir el servicio',
        detailPt: 'Clientes que reservam mesa a qualquer hora com rapidez'
      },
      {
        value: '0%',
        label: 'Comisiones de apps en delivery propio',
        labelPt: 'Comissões em pedidos no canal próprio',
        detail: 'Venta directa por WhatsApp reteniendo el 100% de tu margen de ganancia',
        detailPt: 'Venda direta pelo WhatsApp mantendo 100% da margem'
      },
      {
        value: '95%',
        label: 'Mesas ocupadas en turnos de viernes y sábado',
        labelPt: 'Ocupação garantida nos finais de semana',
        detail: 'Recordatorios con confirmación 2 horas antes para evitar no-shows',
        detailPt: 'Lembretes automáticos para evitar mesas vazias'
      }
    ],
    painPoints: [
      {
        problem: 'Teléfono sonando sin parar en pleno horario de despacho de comida.',
        problemPt: 'Telefone tocando sem parar no meio do horário de pico do salão.',
        solution: 'Bot de WhatsApp que toma reservas y pedidos en piloto automático.',
        solutionPt: 'Assistente no WhatsApp que registra reservas e pedidos no piloto automático.'
      },
      {
        problem: 'Mesas reservadas que quedan vacías porque la gente no avisa que no va a asistir.',
        problemPt: 'Mesas reservadas que ficam vazias porque clientes não avisam o cancelamento.',
        solution: 'Aviso de confirmación 2 horas antes con liberación automática si cancelan.',
        solutionPt: 'Confirmação automática antes do horário liberando a mesa para outros.'
      },
      {
        problem: 'Pagar 30% a 35% de comisión en plataformas de delivery perdiendo toda la rentabilidad.',
        problemPt: 'Pagar taxas abusivas em marketplaces de delivery reduzindo o lucro.',
        solution: 'Canal de delivery propio por WhatsApp con fidelización y promociones directas.',
        solutionPt: 'Canal de delivery direto no WhatsApp com programa de fidelidade e promoções.'
      }
    ],
    features: [
      {
        title: 'Gestor de Reservas de Mesas Inteligente',
        titlePt: 'Gestor de Reservas de Mesas',
        description: 'Pregunta cantidad de comensales, fecha, hora y preferencia (interior climatizado o terraza) confirmando en la planilla del salón.',
        descriptionPt: 'Solicita número de pessoas, data, horário e ambiente, confirmando na agenda do salão.',
        tag: 'Salón Lleno',
        tagPt: 'Salão Cheio',
        iconName: 'Clock'
      },
      {
        title: 'Menú Digital Interactivo con Precios',
        titlePt: 'Cardápio Digital com Fotos e Preços',
        description: 'Envía las especialidades de la cocina, sugerencias del chef, carta de vinos y opciones sin TACC en formato visual.',
        descriptionPt: 'Apresenta pratos especiais, carta de vinhos, opções vegetarianas e sem glúten.',
        tag: 'Antojo',
        tagPt: 'Visual',
        iconName: 'Coffee'
      },
      {
        title: 'Toma de Comandas de Delivery & Takeaway',
        titlePt: 'Comandas de Delivery e Retirada',
        description: 'Calcula el total, solicita dirección de entrega, suma costo de cadete y ofrece alias de transferencia o link de pago.',
        descriptionPt: 'Calcula o valor total, solicita endereço, calcula taxa de entrega e envia chave Pix/cartão.',
        tag: 'Más Ventas',
        tagPt: 'Mais Vendas',
        iconName: 'ShoppingCart'
      },
      {
        title: 'Campañas de Cumpleaños y Promociones',
        titlePt: 'Promoções e Aniversários',
        description: 'Fideliza a clientes enviando un brindis o postre de regalo en la semana de su cumpleaños para que reserven su festejo.',
        descriptionPt: 'Fideliza clientes enviando cortesias no mês de aniversário para incentivar comemorações.',
        tag: 'Fidelización',
        tagPt: 'Fidelização',
        iconName: 'Zap'
      }
    ],
    caseStudy: {
      company: 'Bistró & Cervecería La Estación',
      location: 'Bariloche & San Martín de los Andes',
      logoText: 'LA ESTACION',
      challenge: 'Tenían hasta 40 reservas no-show por fin de semana y perdían ventas por no contestar mensajes a tiempo.',
      challengePt: 'Tinham dezenas de reservas canceladas sem aviso e perdiam clientes na demora do WhatsApp.',
      result: 'Ocupación del 98% en fines de semana y más de 350 pedidos de delivery mensuales por canal propio.',
      resultPt: 'Ocupação de 98% aos finais de semana e mais de 350 pedidos mensais de delivery próprio.',
      quote: 'El bot nos salvó el servicio. Los mozos están atendiendo a las personas en el salón y las reservas de la noche siguiente se confirman solas en WhatsApp.',
      quotePt: 'A equipe foca no atendimento presencial enquanto as reservas e pedidos acontecem perfeitamente no WhatsApp.',
      author: 'Gonzalo Ferrari',
      role: 'Chef Propietario'
    },
    faq: [
      {
        question: '¿Se pueden limitar los turnos y cantidad máxima de personas por reserva?',
        questionPt: 'É possível limitar os horários e quantidade máxima de pessoas por reserva?',
        answer: 'Sí. Configuras la capacidad de tu local, horarios habilitados y turnos (ej. 20:30 hs y 22:30 hs) para no sobrepasar el aforo.',
        answerPt: 'Sim. Você define a capacidade do restaurante, horários de turnos e limite de pessoas por mesa.'
      },
      {
        question: '¿Cómo recibe la cocina los pedidos de delivery generados en WhatsApp?',
        questionPt: 'Como a cozinha recebe os pedidos gerados pelo WhatsApp?',
        answer: 'Se imprimen automáticamente en comandera térmica o se visualizan en una pantalla de despacho en tiempo real.',
        answerPt: 'Os pedidos podem ser impressos em impressora térmica na cozinha ou exibidos em tela de despacho.'
      },
      {
        question: '¿El menú digital se actualiza fácilmente cuando cambiamos precios o platos?',
        questionPt: 'O cardápio digital é fácil de atualizar quando mudamos preços ou pratos?',
        answer: 'Totalmente. Cambias el precio o plato en el panel de control y el bot actualiza las respuestas de inmediato.',
        answerPt: 'Sim. Basta alterar no painel e o assistente já responde com os valores e pratos atualizados.'
      }
    ],
    whatsappPrompt: 'Hola Clientum! Vi la solución para Gastronomía y Restaurantes. Quiero probar cómo funciona el sistema de reservas y delivery por WhatsApp.',
    whatsappPromptPt: 'Olá Clientum! Vi a solução para Restaurantes. Gostaria de testar o sistema de reservas e pedidos no WhatsApp.',
    relatedSlugs: ['ecommerce', 'salud', 'distribuidoras', 'b2b']
  },

  'ecommerce': {
    slug: 'ecommerce',
    aliases: ['tiendas-online', 'comercio-electronico', 'retail', 'tienda-online', 'tiendanube', 'vtex', 'shopify'],
    name: 'E-commerce & Tiendas Online',
    namePt: 'E-commerce & Lojas Virtuais',
    tagline: 'Recuperación de Carritos Abandonados por WhatsApp, Rastreos de Envío y Soporte de Ventas 24/7',
    taglinePt: 'Recuperação de Carrinhos no WhatsApp, Rastreio de Envios e Vendas 24/7',
    badge: 'Solución E-Commerce 2026',
    badgePt: 'Solução E-Commerce 2026',
    icon: ShoppingCart,
    simulatorId: 'ecommerce',
    seo: {
      title: 'WhatsApp Marketing & Recuperador de Carritos para E-Commerce | Clientum',
      titlePt: 'WhatsApp Marketing e Recuperação de Carrinhos para E-Commerce | Clientum',
      description: 'Recupera hasta el 35% de carritos abandonados por WhatsApp. Envía estados de envío con Andreani/Correo y responde consultas de talles, medios de pago y stock.',
      descriptionPt: 'Recupere até 35% dos carrinhos abandonados no WhatsApp. Envie código de rastreamento e tire dúvidas sobre produtos, tamanhos e frete.',
      keywords: [
        'recuperar carritos abandonados whatsapp argentina',
        'chatbot whatsapp para tiendanube shopify',
        'rastreo de envios por whatsapp e-commerce',
        'aumentar conversion tienda online whatsapp',
        'marketing whatsapp automatizado retail'
      ],
      canonical: '/ecommerce'
    },
    hero: {
      headline: 'Multiplica la facturación y recupera carritos en tu',
      headlinePt: 'Aumente o faturamento e recupere vendas na sua',
      highlight: 'Tienda Online con WhatsApp IA y CRM',
      highlightPt: 'Loja Virtual com WhatsApp IA e CRM',
      subheadline: 'Envía un mensaje personalizado al comprador que dejó su carrito en tu tienda, responde dudas de talles y cuotas en segundos y envía el código de seguimiento de Correo/Andreani automáticamente.',
      subheadlinePt: 'Envie mensagens personalizadas para quem abandonou o carrinho, tire dúvidas sobre tamanhos e parcelamento e envie o código de rastreio dos Correios automaticamente.',
      badgePill: '🛍️ Integrado con Tiendanube, Shopify, WooCommerce, MercadoLibre y Vtex',
      badgePillPt: '🛍️ Integrado com Shopify, Nuvemshop, WooCommerce, Mercado Livre e Vtex',
      bullets: [
        { text: 'Recuperación de carritos abandonados con cupón dinámico por WhatsApp', textPt: 'Recuperação de carrinhos com cupom exclusivo no WhatsApp' },
        { text: 'Avisos automáticos de "Pedido Despachado" y "En Camino"', textPt: 'Notificações de "Pedido Despachado" e rastreamento' },
        { text: 'Atención a dudas de compra las 24 hs que aumentan la conversión', textPt: 'Atendimento 24h para tirar dúvidas e fechar a compra' }
      ]
    },
    metrics: [
      {
        value: '+31%',
        label: 'Tasa de carritos recuperados',
        labelPt: 'Taxa de carrinhos recuperados',
        detail: 'Frente al 8% promedio de los correos electrónicos tradicionales',
        detailPt: 'Muito superior à taxa média de e-mails tradicionais'
      },
      {
        value: '98%',
        label: 'Tasa de apertura de mensajes de envío',
        labelPt: 'Taxa de abertura de mensagens de envio',
        detail: 'Clientes informados que no reclaman a soporte "¿Dónde está mi paquete?"',
        detailPt: 'Clientes informados que reduzem chamados de suporte pós-venda'
      },
      {
        value: '4.8x',
        label: 'Retorno de inversión en campañas',
        labelPt: 'Retorno sobre investimento em campanhas',
        detail: 'Re-compra automática a clientes que compraron hace 30 o 60 días',
        detailPt: 'Recompra incentivada para clientes que já conhecem a loja'
      }
    ],
    painPoints: [
      {
        problem: 'El 70% de los visitantes agrega productos al carrito pero se va sin pagar por dudas con el envío.',
        problemPt: 'A maioria dos visitantes adiciona itens ao carrinho mas desiste por dúvidas no frete.',
        solution: 'Mensaje de WhatsApp a los 15 minutos ofreciendo resolver dudas o un descuento especial.',
        solutionPt: 'Mensagem no WhatsApp minutos depois oferecendo auxílio ou frete promocional.'
      },
      {
        problem: 'Soporte colapsado de mensajes pidiendo el link de rastreo o preguntando cuándo llega el pedido.',
        problemPt: 'Suporte sobrecarregado com pedidos de código de rastreamento e prazos.',
        solution: 'Envío automático del link de rastreo apenas la logística procesa el paquete.',
        solutionPt: 'Envio automático do link de rastreio assim que o pacote é postado.'
      },
      {
        problem: 'Gasto altísimo en publicidad paga sin lograr que los clientes actuales vuelvan a comprar.',
        problemPt: 'Alto custo de aquisição em anúncios sem recompras dos clientes da base.',
        solution: 'Automatizaciones de recompra y lanzamientos segmentados directo a su WhatsApp.',
        solutionPt: 'Automações de recompra e lançamentos direto no WhatsApp dos clientes.'
      }
    ],
    features: [
      {
        title: 'Recuperador de Carritos con Cupón Inteligente',
        titlePt: 'Recuperador de Carrinhos Inteligente',
        description: 'Detecta cuando un usuario no finaliza el checkout y le envía la foto del producto con un botón directo para terminar la compra.',
        descriptionPt: 'Detecta o abandono de checkout e envia foto dos itens com link direto para finalizar.',
        tag: 'Más Facturación',
        tagPt: 'Mais Faturamento',
        iconName: 'ShoppingCart'
      },
      {
        title: 'Notificaciones de Envío y Guía de Despacho',
        titlePt: 'Rastreamento Automatizado de Pedidos',
        description: 'Informa al comprador cada cambio de estado (Pago confirmado, Empaquetado, En camino, Entregado).',
        descriptionPt: 'Notifica o cliente sobre cada etapa (Pagamento aprovado, Separado, Em trânsito, Entregue).',
        tag: 'Tranquilidad',
        tagPt: 'Pós-Venda',
        iconName: 'Truck'
      },
      {
        title: 'Asistente de Talles, Stock y Compatibilidad',
        titlePt: 'Guia de Tamanhos e Compatibilidade',
        description: 'La IA aconseja sobre equivalencia de medidas, colores disponibles y políticas de cambio en 30 segundos.',
        descriptionPt: 'O assistente tira dúvidas sobre tabela de medidas, tecidos e regras de troca.',
        tag: 'Cierre Rápido',
        tagPt: 'Conversão',
        iconName: 'Zap'
      },
      {
        title: 'Campañas de Re-Compra y Cross-Selling',
        titlePt: 'Campanhas de Recompra e Cross-Selling',
        description: 'Envía ofertas de productos complementarios a clientes que compraron hace 30 días para maximizar el valor de vida (LTV).',
        descriptionPt: 'Oferece itens complementares para clientes recentes aumentando o valor vitalício (LTV).',
        tag: 'Fidelización',
        tagPt: 'Recompra',
        iconName: 'TrendingUp'
      }
    ],
    caseStudy: {
      company: 'Calzados & Indumentaria Urbana',
      location: 'Buenos Aires & Córdoba',
      logoText: 'URBANA STORE',
      challenge: 'Perdían más de $4.500.000 ARS mensuales en carritos abandonados en su Tiendanube y el email tradicional no convertía.',
      challengePt: 'Perdiam milhares de reais em carrinhos abandonados e os e-mails tradicionais não funcionavam.',
      result: 'Recuperaron 185 carritos en el primer mes y aumentaron un 24% la tasa de recompra con avisos por WhatsApp.',
      resultPt: 'Recuperaram 185 carrinhos no primeiro mês e elevaram em 24% as vendas recorrentes.',
      quote: 'El recuperador de carritos de Clientum se pagó solo en las primeras 48 horas. El cliente recibe el mensaje con la foto de las zapatillas que estaba mirando y compra al instante.',
      quotePt: 'A recuperação de carrinhos se pagou nas primeiras 48 horas. O cliente recebe o lembrete e finaliza a compra na hora.',
      author: 'Matías Pellegrini',
      role: 'Head of E-Commerce'
    },
    faq: [
      {
        question: '¿Con qué plataformas de E-commerce es compatible?',
        questionPt: 'Com quais plataformas de e-commerce é compatível?',
        answer: 'Se integra con Tiendanube, Shopify, WooCommerce, Vtex, MercadoLibre y plataformas personalizadas a través de Webhooks.',
        answerPt: 'Integra com Nuvemshop, Shopify, WooCommerce, Vtex, Mercado Livre e plataformas customizadas via API.'
      },
      {
        question: '¿Los mensajes de carritos abandonados pueden considerarse spam?',
        questionPt: 'As mensagens de carrinho podem ser consideradas spam?',
        answer: 'No. Utilizamos la API Oficial de WhatsApp de Meta y respetamos las políticas de opt-in y consentimiento del usuario.',
        answerPt: 'Não. Utilizamos a API Oficial da Meta no WhatsApp respeitando todas as políticas de privacidade e consentimento.'
      },
      {
        question: '¿Podemos ofrecer descuentos exclusivos solo para compras recuperadas?',
        questionPt: 'Podemos oferecer cupons exclusivos para vendas recuperadas?',
        answer: 'Sí. Puedes configurar cupones dinámicos de descuento (ej. 10% OFF o Envío Gratis) que solo se activan en la recuperación.',
        answerPt: 'Sim. Você pode gerar cupons dinâmicos de desconto ou frete grátis exclusivos para o WhatsApp.'
      }
    ],
    whatsappPrompt: 'Hola Clientum! Vi la solución para E-Commerce y Tiendas Online. Quiero cotizar la recuperación de carritos y WhatsApp Marketing.',
    whatsappPromptPt: 'Olá Clientum! Vi a solução para E-Commerce. Gostaria de cotar a recuperação de carrinhos e marketing no WhatsApp.',
    relatedSlugs: ['distribuidoras', 'gastronomia', 'b2b', 'salud']
  },

  'b2b': {
    slug: 'b2b',
    aliases: ['servicios-b2b', 'software', 'saas', 'consultoras', 'empresas', 'agencias', 'tecnologia'],
    name: 'Servicios B2B, Consultoría & Software',
    namePt: 'Serviços B2B, Consultoria & Tecnologia',
    tagline: 'Calificación de Prospectos Comerciales, Agendamiento de Reuniones y Pipeline CRM B2B',
    taglinePt: 'Qualificação de Leads B2B, Agendamento de Demonstrações e Pipeline CRM',
    badge: 'Solución B2B Enterprise 2026',
    badgePt: 'Solução B2B Enterprise 2026',
    icon: Briefcase,
    simulatorId: 'b2b',
    seo: {
      title: 'CRM & Automatización de Ventas B2B | Clientum',
      titlePt: 'CRM e Automação de Vendas B2B | Clientum',
      description: 'Acelera el ciclo de ventas de tu empresa de servicios o consultora. Califica decisores (B2B), agenda reuniones con ejecutivos en Google Meet y genera propuestas PDF automáticas.',
      descriptionPt: 'Acelere o ciclo de vendas B2B da sua empresa de serviços. Qualifique decisores, agende demonstrações no Google Meet e gere propostas comerciais em PDF.',
      keywords: [
        'crm ventas b2b argentina',
        'automatizacion prospeccion b2b whatsapp',
        'calificacion leads empresariales',
        'generador propuestas comerciales pdf',
        'software pipeline comercial consultoras'
      ],
      canonical: '/b2b'
    },
    hero: {
      headline: 'Acelera el ciclo comercial y cierra contratos más grandes en tu',
      headlinePt: 'Acelere seu ciclo de vendas e feche contratos maiores na sua',
      highlight: 'Empresa B2B con CRM & Agentes IA',
      highlightPt: 'Empresa B2B com CRM & Agentes IA',
      subheadline: 'Califica el presupuesto, tamaño de empresa y urgencia de cada prospecto que llega a tu web o LinkedIn, agenda videollamadas con tus ejecutivos y genera propuestas comerciales profesionales en 2 minutos.',
      subheadlinePt: 'Qualifique o porte da empresa, orçamento e urgência de cada lead, agende reuniões no Google Meet com seus consultores e gere propostas comerciais em PDF na hora.',
      badgePill: '⚡ Para Empresas de Servicios, Software Factories, Consultoras, Agencias y Logística B2B',
      badgePillPt: '⚡ Para Empresas de Serviços, Consultorias, Software Houses e Agências',
      bullets: [
        { text: 'Calificación de decisores comerciales (CEO, Gerentes, Directores)', textPt: 'Qualificação de tomadores de decisão (Diretores, Gerentes)' },
        { text: 'Agendamiento directo en Google Calendar con link de Meet', textPt: 'Agendamento direto no Google Agenda com link de reunião' },
        { text: 'Generador de propuestas comerciales en PDF con validez formal', textPt: 'Gerador de propostas comerciais em PDF com assinatura' }
      ]
    },
    metrics: [
      {
        value: '3.4x',
        label: 'Más reuniones de ventas calificadas',
        labelPt: 'Mais reuniões comerciais qualificadas',
        detail: 'Leads que llegan a la videollamada sabiendo qué problema resuelves y tu rango de precios',
        detailPt: 'Leads que chegam à demonstração conhecendo seu diferencial e faixa de preço'
      },
      {
        value: '-45%',
        label: 'Reducción en la duración del ciclo de venta',
        labelPt: 'Redução no tempo do ciclo de vendas',
        detail: 'De semanas de ida y vuelta a días con seguimiento automatizado y cotizador express',
        detailPt: 'De semanas de negociação para dias com propostas rápidas e acompanhamento'
      },
      {
        value: '92%',
        label: 'Asistencia efectiva a reuniones comerciales',
        labelPt: 'Presença em reuniões agendadas',
        detail: 'Recordatorios por WhatsApp con link directo 1 hora antes de la llamada',
        detailPt: 'Lembretes no WhatsApp com link da videochamada antes da reunião'
      }
    ],
    painPoints: [
      {
        problem: 'Consultores perdiendo 45 minutos en llamadas con prospectos que no tienen presupuesto para contratar.',
        problemPt: 'Consultores perdendo tempo em reuniões com leads sem orçamento compatível.',
        solution: 'Filtro de IA que identifica cantidad de empleados, facturación y necesidad antes de agendar.',
        solutionPt: 'Filtro de IA que identifica tamanho da empresa e maturidade antes de agendar.',
        },
      {
        problem: 'Tardar 3 a 5 días hábiles en redactar una propuesta comercial perdiendo el impulso del cliente.',
        problemPt: 'Demorar dias para enviar a proposta comercial esfriando o interesse do cliente.',
        solution: 'Generador instantáneo de propuestas PDF con módulos cotizados y términos legales en 2 minutos.',
        solutionPt: 'Gerador instantâneo de propostas em PDF com escopo detalhado e valores.',
      },
      {
        problem: 'Leads que se enfrían porque los ejecutivos no hacen seguimiento a tiempo de las propuestas enviadas.',
        problemPt: 'Negociações que esfriam pela falta de acompanhamento no momento certo.',
        solution: 'Flujo de seguimiento por WhatsApp y CRM que alerta cuando el cliente abre la cotización.',
        solutionPt: 'Fluxo automatizado de follow-up que avisa quando o cliente visualiza a proposta.',
      }
    ],
    features: [
      {
        title: 'Calificador de Decisores B2B',
        titlePt: 'Qualificador de Leads B2B',
        description: 'Pregunta rol en la empresa, volumen de operaciones y objetivos clave derivando solo los leads listos para comprar.',
        descriptionPt: 'Identifica cargo, volume de operações e metas da empresa para direcionar os melhores leads.',
        tag: 'Eficiencia',
        tagPt: 'Eficiência',
        iconName: 'Briefcase'
      },
      {
        title: 'Agendamiento Integrado con Google Calendar',
        titlePt: 'Agendamento no Google Agenda / Meet',
        description: 'Envía los horarios libres de tu equipo y crea la reunión virtual con enlace de Meet/Zoom sin cruce de horarios.',
        descriptionPt: 'Disponibiliza horários livres e gera link de reunião automaticamente no calendário.',
        tag: 'Cero Fricción',
        tagPt: 'Sem Fricção',
        iconName: 'Clock'
      },
      {
        title: 'Cotizador y Generador de Propuestas PDF',
        titlePt: 'Gerador de Propostas Comerciais em PDF',
        description: 'Selecciona los módulos contratados y genera un documento formal con logotipo, desglose de inversión y términos en un click.',
        descriptionPt: 'Monta o escopo contratado e gera um documento formal com sua marca e valores em minutos.',
        tag: 'Cierre Rápido',
        tagPt: 'Fechamento',
        iconName: 'FileText'
      },
      {
        title: 'Pipeline Visual Kanban y Registro de Interacciones',
        titlePt: 'Funil Kanban e Histórico Comercial',
        description: 'Tablero comercial para seguir cada negocio desde el primer contacto hasta la firma de contrato con alertas de inactividad.',
        descriptionPt: 'Painel visual para acompanhar cada oportunidade do primeiro contato até o fechamento.',
        tag: 'Control Comercial',
        tagPt: 'Gestão B2B',
        iconName: 'BarChart3'
      }
    ],
    caseStudy: {
      company: 'Innovatech Soluciones Corporativas',
      location: 'Córdoba & Buenos Aires',
      logoText: 'INNOVATECH',
      challenge: 'Sus 5 ejecutivos dedicaban el 60% de su semana a calificar leads no aptos y confeccionar presupuestos a mano.',
      challengePt: 'A equipe comercial gastava horas qualificando leads frios e montando propostas manuais.',
      result: 'Triplicaron las reuniones con directores de compras y redujeron el tiempo de envío de propuestas de 4 días a 10 minutos.',
      resultPt: 'Triplicaram reuniões com decisores e reduziram o envio de propostas para 10 minutos.',
      quote: 'Clientum profesionalizó todo nuestro proceso comercial B2B. Llegamos a la reunión con el cliente sabiendo exactamente qué necesita y con la propuesta casi lista.',
      quotePt: 'A Clientum profissionalizou nosso processo comercial B2B. Nossas reuniões agora são muito mais produtivas.',
      author: 'Lic. Ignacio Rossi',
      role: 'VP de Ventas'
    },
    faq: [
      {
        question: '¿Se puede sincronizar con nuestro correo de Google Workspace / Gmail y CRM actual?',
        questionPt: 'É possível sincronizar com o Gmail / Google Workspace e CRM atual?',
        answer: 'Sí. Clientum cuenta con módulo nativo para sincronizar correos corporativos de Gmail, plantillas inteligentes y calendarios.',
        answerPt: 'Sim. Possuímos integração nativa com Gmail, modelos inteligentes de e-mail e Google Agenda.'
      },
      {
        question: '¿Podemos personalizar las preguntas de calificación según nuestros servicios?',
        questionPt: 'Podemos personalizar as perguntas de qualificação?',
        answer: 'Totalmente. Puedes definir qué campos son obligatorios (ej. Presupuesto anual, software actual, urgencia de inicio).',
        answerPt: 'Sim. Você define as perguntas indispensáveis para classificar a oportunidade antes do agendamento.'
      },
      {
        question: '¿El generador de PDF permite colocar nuestro logo, términos y datos de facturación?',
        questionPt: 'O gerador de PDF permite incluir nosso logotipo e termos contratuais?',
        answer: 'Sí. Las propuestas se generan con tu identidad de marca, moneda seleccionada (USD / ARS / BRL) y cláusulas personalizadas.',
        answerPt: 'Sim. O documento sai com sua identidade visual, moeda de preferência e termos comerciais específicos.'
      }
    ],
    whatsappPrompt: 'Hola Clientum! Vi la solución para Empresas B2B y Consultoras. Quiero coordinar una demo del CRM y cotizador de propuestas.',
    whatsappPromptPt: 'Olá Clientum! Vi a solução para Empresas B2B. Gostaria de agendar uma demonstração do CRM e gerador de propostas.',
    relatedSlugs: ['estudios-contables', 'agro', 'distribuidoras', 'ecommerce']
  },

  'construccion': {
    slug: 'construccion',
    aliases: ['corralones', 'arquitectura', 'obras', 'constructora', 'materiales-construccion'],
    name: 'Construcción, Corralones & Arquitectura',
    namePt: 'Construção Civil & Materiais',
    tagline: 'Cómputo de Materiales, Cotización por Obra y Despacho a Emplazamiento',
    taglinePt: 'Orçamentos de Obras, Venda de Materiais e Logística',
    badge: 'Solución Construcción 2026',
    badgePt: 'Solução Construção 2026',
    icon: Building,
    simulatorId: 'distribuidoras',
    seo: {
      title: 'Chatbot WhatsApp & CRM para Corralones y Construcción | Clientum',
      titlePt: 'Chatbot WhatsApp e CRM para Construção e Materiais | Clientum',
      description: 'Automatiza cotizaciones de materiales de construcción (cemento, hierro, arena, ladrillos) por WhatsApp. Envío de cómputos de obra y coordinación de fletes.',
      descriptionPt: 'Automatize orçamentos de materiais de construção (cimento, aço, areia, tijolos) pelo WhatsApp. Envio de listas e frete para obras.',
      keywords: [
        'crm para corralones de materiales argentina',
        'chatbot cotizaciones construccion whatsapp',
        'computo de materiales por whatsapp',
        'software venta materiales de construccion'
      ],
      canonical: '/construccion'
    },
    hero: {
      headline: 'Cotiza materiales de obra en segundos y acelera las ventas en tu',
      headlinePt: 'Faça orçamentos de materiais em segundos no seu',
      highlight: 'Corralón o Empresa Constructora',
      highlightPt: 'Depósito de Materiais ou Construtora',
      subheadline: 'Permite que arquitectos, constructores y particulares coticen bolsas de cemento, barras de hierro y áridos por WhatsApp con cálculo de flete a obra instantáneo.',
      subheadlinePt: 'Permita que construtores, arquitetos e clientes finais façam cotações de materiais com cálculo de entrega na obra direto pelo WhatsApp.',
      badgePill: '🏗️ Para Corralones, Venta de Aberturas, Hormigoneras y Desarrollos de Obras',
      badgePillPt: '🏗️ Para Lojas de Materiais, Esquadrias, Concretagem e Empreiteiras',
      bullets: [
        { text: 'Cotización por combo de obra (hierro, cemento, ladrillo, pegamento)', textPt: 'Orçamento rápido de listas de materiais para a obra' },
        { text: 'Cálculo de flete y descarga según zona geográfica del proyecto', textPt: 'Cálculo de taxa de frete e descarga conforme a região' },
        { text: 'Seguimiento de cuentas corrientes de constructores y contratistas', textPt: 'Controle de limite e crédito para empreiteiros e parceiros' }
      ]
    },
    metrics: [
      {
        value: '< 2 min',
        label: 'Para entregar una cotización completa de obra',
        labelPt: 'Para enviar orçamento completo de materiais',
        detail: 'Frente a las 4 horas promedio de cálculo manual en mostrador',
        detailPt: 'Contra horas de conferência manual no balcão'
      },
      {
        value: '+45%',
        label: 'Cierre de presupuestos a constructores',
        labelPt: 'Fechamento de propostas com construtores',
        detail: 'Respuesta inmediata antes de que el cliente consulte a otro corralón',
        detailPt: 'Resposta imediata antes da consulta aos concorrentes'
      },
      {
        value: '100%',
        label: 'Trazabilidad de remitos entregados en obra',
        labelPt: 'Rastreabilidade de entregas nas obras',
        detail: 'Aviso con foto del comprobante firmado al WhatsApp del comprador',
        detailPt: 'Confirmação com foto do comprovante assinado'
      }
    ],
    painPoints: [
      {
        problem: 'Constructores en obra esperando horas que el corralón les pase precio de una lista de materiales.',
        problemPt: 'Mestres de obras aguardando horas por cotações de reposição rápida.',
        solution: 'IA que lee listas de materiales en texto o foto y cotiza con stock disponible al instante.',
        solutionPt: 'IA que interpreta listas de materiais e calcula o valor com estoque disponível.'
      },
      {
        problem: 'Choferes llegando a la obra y nadie presente para recibir o pagar el saldo del flete.',
        problemPt: 'Caminhões chegando à obra sem ninguém para conferir e descarregar.',
        solution: 'Aviso automático al encargado de obra 45 minutos antes de la llegada del camión.',
        solutionPt: 'Aviso automático ao responsável pela obra antes da chegada da entrega.'
      },
      {
        problem: 'Cuentas corrientes desactualizadas con retrasos en cobro a contratistas.',
        problemPt: 'Contas a receber desatualizadas gerando atrasos em pagamentos.',
        solution: 'Resumen de saldo y estado de cuenta enviado automáticamente por WhatsApp.',
        solutionPt: 'Extrato financeiro e lembretes de vencimento enviados no WhatsApp.'
      }
    ],
    features: [
      {
        title: 'Cotizador Rápido de Materiales',
        titlePt: 'Cotador Rápido de Materiais',
        description: 'Calcula precios por unidad, pallet o camión completo con actualización de listas según variaciones de costos.',
        descriptionPt: 'Calcula valores por unidade, palete ou carga fechada com tabelas atualizadas.',
        tag: 'Ventas Rápidas',
        tagPt: 'Agilidade',
        iconName: 'Zap'
      },
      {
        title: 'Coordinación de Logística y Fletes',
        titlePt: 'Gestão de Frotas e Entregas',
        description: 'Informa fechas de entrega según disponibilidad de camiones pluma o volcadores.',
        descriptionPt: 'Organiza datas de entrega conforme disponibilidade de caminhões e rotas.',
        tag: 'Despacho',
        tagPt: 'Logística',
        iconName: 'Truck'
      },
      {
        title: 'Portal para Arquitectos y Constructores',
        titlePt: 'Portal de Construtores e Arquitetos',
        description: 'Permite a los profesionales asociados cargar los cómputos de sus obras y seguir entregas parciales.',
        descriptionPt: 'Permite aos parceiros cadastrar projetos e acompanhar entregas fracionadas.',
        tag: 'Alianzas B2B',
        tagPt: 'Parcerias',
        iconName: 'Building'
      },
      {
        title: 'Cobranza de Saldos y Facturación AFIP',
        titlePt: 'Faturamento e Gestão Financeira',
        description: 'Envío de facturas A/B con CAE y links de pago para acopio de materiales previo al aumento.',
        descriptionPt: 'Envio de notas fiscais e opções de pagamento para garantia de preços.',
        tag: 'Finanzas',
        tagPt: 'Financeiro',
        iconName: 'FileText'
      }
    ],
    caseStudy: {
      company: 'Corralón Central de la Patagonia',
      location: 'Neuquén & Cipolletti',
      logoText: 'CORRALON CENTRAL',
      challenge: 'El mostrador colapsaba todas las mañanas con pedidos urgentes de obras y demoraban hasta mediodía en cotizar.',
      challengePt: 'O balcão ficava lotado pela manhã com pedidos urgentes de construtores.',
      result: 'El 70% de las cotizaciones ahora se entregan en menos de 3 minutos por WhatsApp y aumentaron un 40% las ventas de hierro y cemento.',
      resultPt: '70% dos orçamentos agora são entregues em minutos e as vendas de cimento e aço cresceram 40%.',
      quote: 'Los constructores nos dicen que nos eligen porque en 2 minutos ya tienen el precio y la hora exacta en que llega el camión a la obra.',
      quotePt: 'Nossos parceiros elogiam a rapidez: em minutos eles sabem o preço e o horário em que o caminhão descarrega na obra.',
      author: 'Eduardo Morales',
      role: 'Gerente General'
    },
    faq: [
      {
        question: '¿La IA puede calcular cotizaciones de materiales a partir de una foto manuscrita?',
        questionPt: 'A IA reconhece listas de materiais escritas à mão em fotos?',
        answer: 'Sí. El motor de visión e IA interpreta listas escritas en papel de obra y extrae los productos y cantidades para cotizar.',
        answerPt: 'Sim. A tecnologia de visão computacional identifica produtos e quantidades escritas em listas de obra.'
      },
      {
        question: '¿Permite gestionar el sistema de "Acopio de Materiales"?',
        questionPt: 'Possui controle de compra antecipada (estoque reservado)?',
        answer: 'Sí. Registra los materiales abonados por el cliente a precio congelado y descuenta el stock a medida que pide las entregas a la obra.',
        answerPt: 'Sim. Controla materiais pagos com preço travado e desconta conforme as entregas parciais são solicitadas.'
      },
      {
        question: '¿Se conecta con balanzas y sistemas de pesaje?',
        questionPt: 'Integra com sistemas de pesagem e ERP de materiais?',
        answer: 'Sí, a través de nuestras integraciones API y base de datos con tu software administrativo.',
        answerPt: 'Sim, através de APIs integradas com seu sistema de gestão.'
      }
    ],
    whatsappPrompt: 'Hola Clientum! Vi la solución para Corralones y Empresas de Construcción. Quiero cotizar el sistema de presupuestos por WhatsApp.',
    whatsappPromptPt: 'Olá Clientum! Vi a solução para Lojas de Materiais de Construção. Gostaria de cotar o sistema de orçamentos no WhatsApp.',
    relatedSlugs: ['distribuidoras', 'inmobiliaria', 'b2b', 'agro']
  },

  'automotor': {
    slug: 'automotor',
    aliases: ['concesionarias', 'talleres', 'autopartes', 'concesionaria', 'taller-mecanico', 'repuestos'],
    name: 'Automotor, Concesionarias & Talleres',
    namePt: 'Automotivo, Concessionárias & Oficinas',
    tagline: 'Test Drives, Cotización de Repuestos, Turnos de Service y Planes de Ahorro',
    taglinePt: 'Test Drives, Cotação de Peças, Agendamento de Serviços e Financiamento',
    badge: 'Solución Automotriz 2026',
    badgePt: 'Solução Automotiva 2026',
    icon: Car,
    simulatorId: 'distribuidoras',
    seo: {
      title: 'CRM & Chatbot WhatsApp para Concesionarias y Talleres Mecánicos | Clientum',
      titlePt: 'CRM e Chatbot WhatsApp para Concessionárias e Oficinas | Clientum',
      description: 'Automatiza consultas de autos usados y 0km por WhatsApp. Agendamiento de turnos de taller mecánico, cotización de repuestos por número de chasis y planes de ahorro.',
      descriptionPt: 'Automatize atendimento de veículos novos e seminovos no WhatsApp. Agende serviços mecânicos e faça cotações de peças.',
      keywords: [
        'crm concesionarias autos argentina',
        'chatbot whatsapp venta de autos',
        'agendamiento turnos taller mecanico whatsapp',
        'cotizador repuestos y autopartes bot',
        'sistema planes de ahorro automotor'
      ],
      canonical: '/automotor'
    },
    hero: {
      headline: 'Acelera la venta de vehículos y turnos de taller en tu',
      headlinePt: 'Aumente a venda de veículos e agendamento de serviços na sua',
      highlight: 'Concesionaria o Taller Automotor',
      highlightPt: 'Concessionária ou Oficina Mecânica',
      subheadline: 'Envía fichas de vehículos 0km y usados con fotos, financiamiento y cuotas por WhatsApp, agenda turnos de service oficial y responde consultas de repuestos al instante.',
      subheadlinePt: 'Envie fotos e opções de financiamento de veículos no WhatsApp, agende revisões periódicas e responda cotações de peças com rapidez.',
      badgePill: '🚗 Para Concesionarias Oficiales y Multimarca, Venta de Repuestos y Talleres Mecánicos',
      badgePillPt: '🚗 Para Concessionárias, Lojas de Autopeças e Centros Automotivos',
      bullets: [
        { text: 'Envío de fichas técnicas, fotos y opciones de entrega de usados', textPt: 'Envio de catálogo de seminovos, fotos e simulação de parcelas' },
        { text: 'Agendamiento de turnos de service y mantenimiento preventivo', textPt: 'Agendamento de revisão periódica e manutenções' },
        { text: 'Cotización de repuestos por código de pieza o modelo de auto', textPt: 'Cotação de peças e acessórios pelo modelo do veículo' }
      ]
    },
    metrics: [
      {
        value: '< 4 seg',
        label: 'Respuesta a interesados en compra de vehículos',
        labelPt: 'Tempo de resposta a interessados em veículos',
        detail: 'Envío de fotos y ficha técnica al instante mientras mira la publicación',
        detailPt: 'Envio imediato de fotos e ficha técnica'
      },
      {
        value: '+310%',
        label: 'Turnos de service oficial agendados',
        labelPt: 'Agendamentos de revisão oficial',
        detail: 'Recordatorios de service de 10.000 km y cambio de aceite por WhatsApp',
        detailPt: 'Lembretes de revisão preventiva aos clientes'
      },
      {
        value: '35%',
        label: 'Más operaciones con toma de usados',
        labelPt: 'Mais negociações com veículo na troca',
        detail: 'Formulario express donde el cliente envía fotos de su usado para cotizar',
        detailPt: 'Formulário onde o cliente envia dados e fotos do usado'
      }
    ],
    painPoints: [
      {
        problem: 'Leads de MercadoLibre Autos y redes sociales que se enfrían por tardar horas en contestar.',
        problemPt: 'Leads de portais e anúncios que esfriam pela demora no primeiro contato.',
        solution: 'Respuesta inmediata por WhatsApp con fotos, precio de lista y simulación de anticipo.',
        solutionPt: 'Resposta automática no WhatsApp com fotos, valor e simulação de entrada.'
      },
      {
        problem: 'Líneas telefónicas de repuestos colapsadas con clientes pidiendo precios de piezas.',
        problemPt: 'Atendentes de peças sobrecarregados com cotações repetitivas.',
        solution: 'Bot que solicita modelo y año, consulta disponibilidad en sistema y envía precio.',
        solutionPt: 'Assistente que confere modelo, ano e disponibilidade da peça na hora.'
      },
      {
        problem: 'Clientes que se olvidan de hacer el service de mantenimiento en el taller oficial.',
        problemPt: 'Clientes que esquecem de realizar a revisão preventiva na concessionária.',
        solution: 'Mensajes programados a los 6 meses o 10.000 km invitando a agendar su turno con descuento.',
        solutionPt: 'Disparos automáticos por quilometragem e tempo para agendar a revisão.'
      }
    ],
    features: [
      {
        title: 'Catálogo de Vehículos 0km y Usados',
        titlePt: 'Catálogo de Veículos no WhatsApp',
        description: 'Muestra stock disponible, fotos exteriores e interiores, kilometraje y opciones de crédito prendario.',
        descriptionPt: 'Apresenta estoque disponível, fotos detalhadas, quilometragem e opções de financiamento.',
        tag: 'Venta Ágil',
        tagPt: 'Vendas',
        iconName: 'Car'
      },
      {
        title: 'Cotizador de Usados en Parte de Pago',
        titlePt: 'Avaliação de Usado na Troca',
        description: 'El comprador indica marca, modelo, año y kilometraje de su auto actual para recibir una tasación preliminar.',
        descriptionPt: 'O cliente informa dados do seu veículo atual para uma estimativa rápida de troca.',
        tag: 'Trade-In',
        tagPt: 'Troca',
        iconName: 'TrendingUp'
      },
      {
        title: 'Agendador de Turnos de Taller y Service',
        titlePt: 'Agendamento de Revisão e Oficina',
        description: 'Coordena fecha y hora para cambio de aceite, frenos o service oficial de garantía con confirmación por WhatsApp.',
        descriptionPt: 'Agenda revisões, alinhamento ou manutenções com lembretes automáticos.',
        tag: 'Posventa',
        tagPt: 'Pós-Venda',
        iconName: 'Clock'
      },
      {
        title: 'Asistente de Planes de Ahorro y Financiación',
        titlePt: 'Simulador de Financiamento e Consórcio',
        description: 'Explica montos de cuota pura, licitaciones y adjudicaciones pactadas con comparador transparente.',
        descriptionPt: 'Calcula parcelas, prazos e opções de consórcio ou crédito automotivo.',
        tag: 'Finanzas',
        tagPt: 'Financiamento',
        iconName: 'BarChart3'
      }
    ],
    caseStudy: {
      company: 'Concesionaria Multimarca del Valle',
      location: 'Neuquén & General Roca',
      logoText: 'VALLE MOTORS',
      challenge: 'Recibían más de 800 consultas mensuales de redes y portales y los vendedores no lograban hacer el seguimiento a tiempo.',
      challengePt: 'Recebiam centenas de leads de anúncios e a equipe comercial demorava para responder.',
      result: 'Contactación inmediata al 100% de los interesados, aumento del 45% en test drives coordinados y récord de ventas de usados.',
      resultPt: 'Contato imediato com 100% dos leads, 45% mais test drives realizados e aumento expressivo em vendas.',
      quote: 'El comprador de autos es muy ansioso. Si le mandas las fotos y la cuota en 30 segundos mientras está mirando el auto, tienes el 80% de la venta encaminada.',
      quotePt: 'O comprador de veículos quer resposta rápida. Ao enviar fotos e simulação em segundos, o interesse se converte em visita.',
      author: 'Gustavo Paolini',
      role: 'Director Comercial'
    },
    faq: [
      {
        question: '¿Se puede conectar con MercadoLibre Autos y Facebook / Instagram Ads?',
        questionPt: 'Integra com Mercado Livre Veículos e anúncios do Facebook / Instagram?',
        answer: 'Sí. Cada lead que completa un formulario de anuncio o consulta en portales se ingresa de inmediato a WhatsApp para iniciar la conversación.',
        answerPt: 'Sim. Leads de anúncios e portais são direcionados imediatamente ao WhatsApp para atendimento ágil.'
      },
      {
        question: '¿Cómo se actualiza el stock de autos usados cuando se vende una unidad?',
        questionPt: 'Como o estoque de seminovos é atualizado quando um veículo é vendido?',
        answer: 'Se sincroniza en tiempo real con el inventario del CRM. Al marcar la unidad como vendida, el bot deja de ofrecerla automáticamente.',
        answerPt: 'A sincronização ocorre em tempo real com o CRM, removendo o veículo do catálogo assim que vendido.'
      },
      {
        question: '¿Permite enviar videos de los autos a los interesados?',
        questionPt: 'O bot consegue enviar vídeos dos veículos aos clientes?',
        answer: 'Sí. El bot puede compartir videos en alta calidad del motor, interior y andar del vehículo para generar confianza antes de la visita.',
        answerPt: 'Sim. O assistente pode enviar vídeos do veículo para aumentar a confiança do comprador.'
      }
    ],
    whatsappPrompt: 'Hola Clientum! Vi la solución para Concesionarias y Talleres Automotores. Quiero solicitar una demo del sistema para venta de autos y turnos.',
    whatsappPromptPt: 'Olá Clientum! Vi a solução para Concessionárias e Oficinas. Gostaria de agendar uma demonstração do sistema.',
    relatedSlugs: ['distribuidoras', 'b2b', 'inmobiliaria', 'ecommerce']
  }
};

/**
 * Normalizes an arbitrary slug or path to an industry landing data object.
 * Handles aliases, URL cleanups, and trailing slashes.
 */
export function getIndustryBySlug(rawSlug?: string | null): IndustryLandingData | null {
  if (!rawSlug) return null;

  // Clean the input: lowercase, remove slashes, leading/trailing whitespace
  const clean = rawSlug.trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/^industria\//, '');
  if (!clean) return null;

  // Direct match
  if (INDUSTRY_LANDINGS[clean]) {
    return INDUSTRY_LANDINGS[clean];
  }

  // Search by alias
  for (const key of Object.keys(INDUSTRY_LANDINGS)) {
    const item = INDUSTRY_LANDINGS[key];
    if (item.slug === clean || item.aliases.includes(clean)) {
      return item;
    }
  }

  return null;
}

/**
 * Returns a list of all canonical industry slugs.
 */
export function getAllIndustrySlugs(): string[] {
  return Object.keys(INDUSTRY_LANDINGS);
}

/**
 * Returns all industry landing summaries for directory listings, menus and SEO sitemaps.
 */
export function getAllIndustrySummaries() {
  return Object.values(INDUSTRY_LANDINGS).map(ind => ({
    slug: ind.slug,
    name: ind.name,
    namePt: ind.namePt,
    tagline: ind.tagline,
    taglinePt: ind.taglinePt,
    badge: ind.badge,
    badgePt: ind.badgePt,
    icon: ind.icon,
    canonical: ind.seo.canonical,
    primaryKeywords: ind.seo.keywords.slice(0, 3)
  }));
}

/**
 * Returns related industries for cross-linking and SEO architecture.
 */
export function getRelatedIndustries(currentSlug: string, count: number = 3): IndustryLandingData[] {
  const current = INDUSTRY_LANDINGS[currentSlug];
  if (!current) return Object.values(INDUSTRY_LANDINGS).slice(0, count);

  const related = current.relatedSlugs
    .map(slug => INDUSTRY_LANDINGS[slug])
    .filter((item): item is IndustryLandingData => !!item);

  if (related.length < count) {
    const others = Object.values(INDUSTRY_LANDINGS).filter(item => item.slug !== currentSlug && !related.includes(item));
    related.push(...others.slice(0, count - related.length));
  }

  return related.slice(0, count);
}
