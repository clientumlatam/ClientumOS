import { WhatsAppAccount, WhatsAppAgent, WaConversationExtended, WaMessageExtended } from './types';

export const INITIAL_WHATSAPP_ACCOUNTS: WhatsAppAccount[] = [
  {
    id: 'acc-1',
    phoneNumber: '+54 9 298 443-1200',
    label: 'Ventas Patagonia & Agro',
    pushName: 'Clientum Patagonia Bot',
    status: 'CONNECTED',
    batteryLevel: 94,
    charging: true,
    platform: 'Baileys Multi-Device MD v6.8.2',
    latency: '18ms',
    uptime: '12 días, 4 horas',
    isDefault: true,
    lastConnectedAt: new Date(Date.now() - 3600000 * 24 * 12).toISOString()
  },
  {
    id: 'acc-2',
    phoneNumber: '+54 9 11 5522-8800',
    label: 'Atención Comercial Central CABA',
    pushName: 'Clientum SDR Central',
    status: 'CONNECTED',
    batteryLevel: 88,
    charging: false,
    platform: 'Baileys Multi-Device MD v6.8.2',
    latency: '22ms',
    uptime: '8 días, 19 horas',
    isDefault: false,
    lastConnectedAt: new Date(Date.now() - 3600000 * 24 * 8).toISOString()
  },
  {
    id: 'acc-3',
    phoneNumber: '+55 22 99876-5432',
    label: 'Sede Brasil / Arraial do Cabo',
    pushName: 'Clientum Brasil Bot (PIX)',
    status: 'CONNECTED',
    batteryLevel: 99,
    charging: true,
    platform: 'Baileys Multi-Device MD v6.8.2',
    latency: '34ms',
    uptime: '15 días, 2 horas',
    isDefault: false,
    lastConnectedAt: new Date(Date.now() - 3600000 * 24 * 15).toISOString()
  },
  {
    id: 'acc-4',
    phoneNumber: '+54 9 261 488-9900',
    label: 'Soporte Cuyo & Facturación AFIP',
    pushName: 'Clientum Soporte AFIP',
    status: 'DISCONNECTED',
    batteryLevel: 0,
    charging: false,
    platform: 'Baileys Multi-Device MD v6.8.2',
    latency: '--',
    uptime: 'Desconectado',
    isDefault: false
  }
];

export const INITIAL_AGENTS: WhatsAppAgent[] = [
  {
    id: 'agent-matias',
    name: 'Matías Gómez',
    role: 'Asesor Comercial Senior B2B',
    avatarColor: 'bg-emerald-600',
    avatarInitials: 'MG',
    email: 'matias.gomez@clientum.com.ar',
    phone: '+54 9 298 433-2211',
    status: 'online',
    activeConversationsCount: 4
  },
  {
    id: 'agent-laura',
    name: 'Laura Benítez',
    role: 'Especialista en Facturación AFIP & ERP',
    avatarColor: 'bg-indigo-600',
    avatarInitials: 'LB',
    email: 'laura.benitez@clientum.com.ar',
    phone: '+54 9 11 4455-8899',
    status: 'online',
    activeConversationsCount: 3
  },
  {
    id: 'agent-roberto',
    name: 'Roberto Rossi',
    role: 'Ejecutivo de Cuentas Agro & Mayoristas',
    avatarColor: 'bg-amber-600',
    avatarInitials: 'RR',
    email: 'roberto.rossi@clientum.com.ar',
    phone: '+54 9 299 556-7788',
    status: 'busy',
    activeConversationsCount: 2
  },
  {
    id: 'agent-sofia',
    name: 'Sofía Albarracín',
    role: 'Customer Success & Onboarding',
    avatarColor: 'bg-pink-600',
    avatarInitials: 'SA',
    email: 'sofia.albarracin@clientum.com.ar',
    phone: '+54 9 261 778-9900',
    status: 'online',
    activeConversationsCount: 1
  },
  {
    id: 'agent-santi-bot',
    name: 'Santi SDR (Bot Autónomo IA)',
    role: 'Hermes Copilot & Calificador 24/7',
    avatarColor: 'bg-purple-600',
    avatarInitials: 'IA',
    email: 'santi.ia@clientum.com.ar',
    phone: '+54 9 298 443-1200',
    isBot: true,
    status: 'online',
    activeConversationsCount: 8
  }
];

export const INITIAL_CONVERSATIONS: WaConversationExtended[] = [
  {
    id: 1,
    phone: '+54 9 298 443-1200',
    contact_name: 'Grupo Agro-Industrial Patagonia S.A.',
    bot_active: true,
    last_message_at: new Date(Date.now() - 600000).toISOString(),
    last_message: 'Hola, queremos integrar la cotización automática...',
    unread: 2,
    assigned_agent_id: 'agent-matias',
    assigned_agent_name: 'Matías Gómez',
    account_id: 'acc-1',
    account_label: 'Ventas Patagonia & Agro',
    tags: ['Agro', 'Presupuesto']
  },
  {
    id: 2,
    phone: '+54 9 299 412-9876',
    contact_name: 'Logística Austral S.R.L.',
    bot_active: true,
    last_message_at: new Date(Date.now() - 3600000).toISOString(),
    last_message: '¿Tienen integración con AFIP y factura electrónica?',
    unread: 1,
    assigned_agent_id: 'agent-laura',
    assigned_agent_name: 'Laura Benítez',
    account_id: 'acc-1',
    account_label: 'Ventas Patagonia & Agro',
    tags: ['AFIP', 'Facturación']
  },
  {
    id: 3,
    phone: '+54 9 261 554-3321',
    contact_name: 'TechSol Cuyo S.A.',
    bot_active: false,
    last_message_at: new Date(Date.now() - 7200000).toISOString(),
    last_message: 'Quedamos en contacto para la demo del jueves',
    unread: 0,
    assigned_agent_id: 'agent-matias',
    assigned_agent_name: 'Matías Gómez',
    account_id: 'acc-2',
    account_label: 'Atención Comercial Central CABA',
    tags: ['Demo', 'Enterprise']
  },
  {
    id: 4,
    phone: '+55 22 99876-5432',
    contact_name: 'Pousada & Resort Praia Grande (Brasil)',
    bot_active: true,
    last_message_at: new Date(Date.now() - 10800000).toISOString(),
    last_message: 'Olá! Queremos automatizar as reservas no WhatsApp',
    unread: 0,
    assigned_agent_id: 'agent-santi-bot',
    assigned_agent_name: 'Santi SDR (Bot Autónomo IA)',
    account_id: 'acc-3',
    account_label: 'Sede Brasil / Arraial do Cabo',
    tags: ['Brasil', 'Hotelería']
  },
  {
    id: 5,
    phone: '+54 9 11 6789-0123',
    contact_name: 'Distribuidora Mayorista del Plata',
    bot_active: true,
    last_message_at: new Date(Date.now() - 14400000).toISOString(),
    last_message: 'Buenas tardes, necesitamos catálogo con precios mayoristas',
    unread: 3,
    assigned_agent_id: undefined, // Unassigned
    assigned_agent_name: undefined,
    account_id: 'acc-2',
    account_label: 'Atención Comercial Central CABA',
    tags: ['Mayorista', 'Nuevo']
  },
  {
    id: 6,
    phone: '+54 9 351 987-6543',
    contact_name: 'Sanatorio & Consultorios Médicos Córdoba',
    bot_active: true,
    last_message_at: new Date(Date.now() - 18000000).toISOString(),
    last_message: '¿El bot puede confirmar turnos médicos de manera automática?',
    unread: 0,
    assigned_agent_id: 'agent-sofia',
    assigned_agent_name: 'Sofía Albarracín',
    account_id: 'acc-2',
    account_label: 'Atención Comercial Central CABA',
    tags: ['Salud', 'Turnos']
  }
];

export const INITIAL_MESSAGES: Record<number, WaMessageExtended[]> = {
  1: [
    { id: 98, conversation_id: 1, direction: 'inbound', content: 'Buenas tardes, vimos la demo de Clientum en la Expo Agro y nos interesó la trazabilidad.', sent_by: 'human', created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
    { id: 99, conversation_id: 1, direction: 'outbound', content: '¡Hola! Gracias por contactarnos. Nuestro equipo comercial para el Alto Valle está a disposición.', sent_by: 'human', sender_name: 'Matías Gómez', created_at: new Date(Date.now() - 86400000 * 5 + 1800000).toISOString() },
    { id: 100, conversation_id: 1, direction: 'inbound', content: '¿Tienen módulos para empaque de peras y manzanas con facturación electrónica?', sent_by: 'human', created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: 101, conversation_id: 1, direction: 'inbound', content: 'Hola, queremos integrar la cotización automática para frutas y empaque.', sent_by: 'human', created_at: new Date(Date.now() - 600000).toISOString() },
    { id: 102, conversation_id: 1, direction: 'outbound', content: '¡Hola Roberto! Soy Santi del equipo de Clientum. Tenemos el módulo ERP especializado para trazabilidad agropecuaria y cotización multimoneda. ¿Te gustaría ver un brochure en PDF adaptado?', sent_by: 'bot', created_at: new Date(Date.now() - 300000).toISOString() },
    { id: 103, conversation_id: 1, direction: 'inbound', content: 'Excelente, envíamelo por favor. Somos 12 personas en el área comercial.', sent_by: 'human', created_at: new Date(Date.now() - 60000).toISOString() },
  ],
  2: [
    { id: 199, conversation_id: 2, direction: 'inbound', content: 'Hola, consulto si el sistema emite remitos electrónicos con código QR.', sent_by: 'human', created_at: new Date(Date.now() - 86400000 * 4).toISOString() },
    { id: 200, conversation_id: 2, direction: 'outbound', content: 'Buenas tardes. Sí, emitimos remitos y facturas A/B con CAE de AFIP en milisegundos.', sent_by: 'human', sender_name: 'Laura Benítez', created_at: new Date(Date.now() - 86400000 * 4 + 600000).toISOString() },
    { id: 201, conversation_id: 2, direction: 'inbound', content: '¿Tienen integración con AFIP y factura electrónica en el ERP?', sent_by: 'human', created_at: new Date(Date.now() - 300000).toISOString() },
    { id: 202, conversation_id: 2, direction: 'outbound', content: '¡Hola Laura! Sí, Clientum cuenta con conexión nativa por WebServices con AFIP para Facturas A, B, C y remitos electrónicos, además de conciliación bancaria automática. ¿Querés agendar una demo guiada?', sent_by: 'bot', created_at: new Date(Date.now() - 290000).toISOString() },
  ],
  3: [
    { id: 299, conversation_id: 3, direction: 'inbound', content: 'Estimados, necesitamos presupuesto para 25 licencias en Cuyo.', sent_by: 'human', created_at: new Date(Date.now() - 86400000 * 6).toISOString() },
    { id: 301, conversation_id: 3, direction: 'inbound', content: 'Hola, queremos consultar precios para el plan Enterprise.', sent_by: 'human', created_at: new Date(Date.now() - 7200000).toISOString() },
    { id: 302, conversation_id: 3, direction: 'outbound', content: 'Hola Esteban, te atiende Matías de Clientum. Te paso el detalle de la propuesta personalizada para 25 puestos.', sent_by: 'human', created_at: new Date(Date.now() - 4000000).toISOString() },
    { id: 303, conversation_id: 3, direction: 'inbound', content: 'Quedamos en contacto para la demo del jueves', sent_by: 'human', created_at: new Date(Date.now() - 3600000).toISOString() },
  ],
  4: [
    { id: 400, conversation_id: 4, direction: 'inbound', content: 'Boa tarde! Vimos seu sistema no Rio de Janeiro.', sent_by: 'human', created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
    { id: 401, conversation_id: 4, direction: 'inbound', content: 'Olá! Queremos automatizar as reservas e atendimento pelo WhatsApp no Brasil.', sent_by: 'human', created_at: new Date(Date.now() - 7200000).toISOString() },
    { id: 402, conversation_id: 4, direction: 'outbound', content: 'Olá! Que ótimo falar com você. Nossa sede em Arraial do Cabo atende todo o mercado brasileiro com integração direta ao WhatsApp Cloud API e PIX. Posso te enviar nossa apresentação?', sent_by: 'bot', created_at: new Date(Date.now() - 7180000).toISOString() },
  ],
  5: [
    { id: 499, conversation_id: 5, direction: 'inbound', content: 'Hola, ¿tienen lista de precios para distribuidoras de alimentos?', sent_by: 'human', created_at: new Date(Date.now() - 86400000 * 7).toISOString() },
    { id: 501, conversation_id: 5, direction: 'inbound', content: 'Buenas tardes, necesitamos catálogo con precios mayoristas para reposición semanal.', sent_by: 'human', created_at: new Date(Date.now() - 14400000).toISOString() },
    { id: 502, conversation_id: 5, direction: 'outbound', content: '¡Buenas tardes! Bienvenido a Clientum Distribución. El bot está preparando la lista con descuentos por escala.', sent_by: 'bot', created_at: new Date(Date.now() - 14300000).toISOString() }
  ],
  6: [
    { id: 599, conversation_id: 6, direction: 'inbound', content: 'Buenas, consulto si se conecta con sistema de turnos de clínica médica.', sent_by: 'human', created_at: new Date(Date.now() - 86400000 * 4).toISOString() },
    { id: 601, conversation_id: 6, direction: 'inbound', content: '¿El bot puede confirmar turnos médicos de manera automática y enviar recordatorios?', sent_by: 'human', created_at: new Date(Date.now() - 18000000).toISOString() },
    { id: 602, conversation_id: 6, direction: 'outbound', content: '¡Hola Dr. Rossi! Sí, sincroniza con agendas médicas y envía recordatorios automáticos 24hs antes por WhatsApp.', sent_by: 'human', created_at: new Date(Date.now() - 17900000).toISOString() }
  ]
};
