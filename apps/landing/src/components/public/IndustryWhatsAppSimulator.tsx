import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Bot,
  Send,
  Sparkles,
  Stethoscope,
  Home,
  Coffee,
  Scale,
  ShoppingCart,
  Briefcase,
  CheckCheck,
  PhoneCall,
  Loader2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Truck,
  Package
} from 'lucide-react';
import { useLanguage } from '@clientum/ui';
import heroBannerImg from '../../assets/images/hero_ai_banner_1787699276417.jpg';

interface IndustryScenario {
  id: string;
  name: string;
  namePt: string;
  icon: any;
  botName: string;
  avatarBg: string;
  initialMessage: string;
  initialMessagePt: string;
  quickReplies: Array<{ label: string; labelPt: string; prompt: string }>;
  aiContext: (userText: string) => string;
}

const INDUSTRIES: IndustryScenario[] = [
  {
    id: 'distribuidoras',
    name: 'Distribuidoras & Mayoristas',
    namePt: 'Distribuidoras & Atacado',
    icon: Truck,
    botName: 'Distribuidora Central IA',
    avatarBg: 'bg-blue-600',
    initialMessage: '📦 ¡Hola! Soy el asistente comercial de Distribuidora Central. ¿Deseas consultar lista de precios mayorista, estado de despacho de tu pedido o solicitar catálogo con descuentos por bulto cerrado?',
    initialMessagePt: '📦 Olá! Sou o assistente comercial da Distribuidora Central. Deseja consultar tabela de preços no atacado, status de entrega ou catálogo com descontos por volume?',
    quickReplies: [
      { label: '📋 Lista Precios Mayorista', labelPt: '📋 Tabela de Preços Atacado', prompt: 'Quiero descargar la lista de precios actualizada en PDF y condiciones de cuenta corriente.' },
      { label: '🚚 Estado de Entrega', labelPt: '🚚 Rastrear Entrega', prompt: 'Quiero consultar el estado de mi remito de entrega para la zona norte.' },
      { label: '🧾 Facturación AFIP', labelPt: '🧾 Faturamento Fiscal', prompt: 'Necesito factura A con CUIT y comprobante con CAE para mi pedido de ayer.' }
    ],
    aiContext: (text) => {
      const low = text.toLowerCase();
      if (low.includes('lista') || low.includes('precio') || low.includes('descuento') || low.includes('mayorista') || low.includes('tabela')) {
        return '¡Te adjunto las condiciones mayoristas! 📋\n\n• Descuento del 18% en compras superiores a 5 bultos cerrados.\n• Plazo de pago: 15 y 30 días con cuenta corriente aprobada.\n• Despacho sin cargo en compras > $250.000 ARS.\n\n¿Deseas que un asesor te active la cuenta mayorista hoy mismo?';
      }
      if (low.includes('entrega') || low.includes('remito') || low.includes('despacho') || low.includes('camion') || low.includes('rastrear')) {
        return '🚚 Tu pedido #DS-9120 está en ruta con nuestro camión de reparto. Tiempo estimado de arribo a tu depósito: hoy entre las 14:00 y 16:30 hs. ¿Necesitas avisar alguna instrucción de descarga?';
      }
      if (low.includes('factura') || low.includes('afip') || low.includes('cuit') || low.includes('cae')) {
        return '🧾 La Factura Electrónica A con CAE fue emitida automáticamente y enviada a tu correo registrado. También puedes descargarla desde nuestro portal de clientes.';
      }
      return 'Consulta registrada en el sistema de distribución. Un asesor comercial te responderá en menos de 2 minutos.';
    }
  },
  {
    id: 'agro',
    name: 'Agro & Insumos',
    namePt: 'Agronegócio & Insumos',
    icon: Package,
    botName: 'AgroSoluciones IA',
    avatarBg: 'bg-lime-700',
    initialMessage: '🌾 ¡Hola! Asistente técnico de AgroSoluciones. ¿Deseas cotizar insumos para campaña (fertilizantes, semillas, agroquímicos), consultar disponibilidad por lote o coordinar entrega en campo?',
    initialMessagePt: '🌾 Olá! Assistente técnico da AgroSoluções. Deseja cotar insumos para safra (fertilizantes, sementes, defensivos) ou entrega na fazenda?',
    quickReplies: [
      { label: '🌱 Cotizar Semillas & Fértil', labelPt: '🌱 Cotar Sementes & Adubo', prompt: 'Quiero cotización por hectárea de fertilizantes y semillas de maíz/soja con flete a campo.' },
      { label: '💵 Financiamiento Campaña', labelPt: '💵 Financiamento Safra', prompt: '¿Qué opciones de canje cereal o pago a cosecha tienen vigentes?' },
      { label: '🚜 Trazabilidad de Lote', labelPt: '🚜 Rastreabilidade de Lote', prompt: 'Necesito certificados de origen y lote de los fitosanitarios entregados.' }
    ],
    aiContext: (text) => {
      const low = text.toLowerCase();
      if (low.includes('cotizar') || low.includes('semilla') || low.includes('fertilizante') || low.includes('hectarea') || low.includes('adubo')) {
        return '🌱 Cotización orientativa de campaña:\n\n• Pack Maíz Alto Rendimiento: USD $145/ha (incluye cura-semilla)\n• Fertilizante Fosfatado / UREA: Consultar precio pizarra Rosario con entrega a granel.\n\n¿Para cuántas hectáreas planeas sembrar en tu establecimiento?';
      }
      if (low.includes('canje') || low.includes('pago') || low.includes('cosecha') || low.includes('cereal') || low.includes('financiacion')) {
        return 'Contamos con modalidades flexibles:\n\n✔️ Canje disponible disponible con entrega de cereal a fijar\n✔️ Tarjetas agropecuarias (Galicia Rural, AgroNación, Santander Agro) con tasa preferencial\n✔️ Crédito directo a cosecha Mayo 2026.';
      }
      return 'Requerimiento técnico registrado. El ingeniero agrónomo de tu zona te contactará en 15 minutos con la receta técnica.';
    }
  },
  {
    id: 'salud',
    name: 'Salud & Clínicas',
    namePt: 'Saúde & Clínicas',
    icon: Stethoscope,
    botName: 'Clínica Sanitas IA',
    avatarBg: 'bg-teal-600',
    initialMessage: '👋 ¡Hola! Bienvenido al servicio de atención 24/7 de Clínica Sanitas. ¿Deseas solicitar un turno médico, consultar coberturas o pedir un estudio?',
    initialMessagePt: '👋 Olá! Bem-vindo ao atendimento 24/7 da Clínica Sanitas. Deseja agendar uma consulta, verificar convênios ou solicitar exames?',
    quickReplies: [
      { label: '📅 Agendar Turno', labelPt: '📅 Agendar Consulta', prompt: 'Quiero agendar un turno con Cardiología o Dermatología para la próxima semana.' },
      { label: '🏥 Obras Sociales', labelPt: '🏥 Convênios', prompt: '¿Qué obras sociales y prepagas atienden?' },
      { label: '🧪 Preparación Estudios', labelPt: '🧪 Preparo Exames', prompt: '¿Qué preparación necesito para un análisis de sangre y ecografía?' }
    ],
    aiContext: (text) => {
      const low = text.toLowerCase();
      if (low.includes('turno') || low.includes('agendar') || low.includes('consulta') || low.includes('horario')) {
        return '¡Perfecto! Tenemos turnos disponibles para esta semana:\n\n• Miércoles 10:30 hs - Dr. Morales (Cardiología)\n• Jueves 16:00 hs - Dra. Benítez (Dermatología)\n\n¿Cuál de estos horarios te queda más cómodo para confirmar tus datos?';
      }
      if (low.includes('obra social') || low.includes('prepaga') || low.includes('cobertura') || low.includes('convenio')) {
        return 'Trabajamos con las principales coberturas:\n\n✔️ OSDE (todos los planes)\n✔️ Swiss Medical\n✔️ Galeno\n✔️ Medifé y Particulares con reintegro.\n\n¿Posees alguna de estas coberturas para verificar tu copago?';
      }
      return 'Entendido. Tu consulta fue registrada en nuestro sistema de triaje médico. Un especialista puede coordinar los detalles en línea ahora mismo.';
    }
  },
  {
    id: 'inmobiliaria',
    name: 'Inmobiliarias & Real Estate',
    namePt: 'Imobiliárias & Real Estate',
    icon: Home,
    botName: 'Patagonia Propiedades IA',
    avatarBg: 'bg-blue-600',
    initialMessage: '🏠 ¡Hola! Soy el asistente virtual de Patagonia Propiedades. ¿Buscas comprar, alquilar o tasar un inmueble?',
    initialMessagePt: '🏠 Olá! Sou o assistente virtual da Patagônia Imóveis. Procura comprar, alugar ou avaliar um imóvel?',
    quickReplies: [
      { label: '🔑 Alquiler 2 Ambientes', labelPt: '🔑 Aluguel 2 Quartos', prompt: 'Busco departamento de 2 ambientes en alquiler con cochera.' },
      { label: '💰 Tasación de Propiedad', labelPt: '💰 Avaliação de Imóvel', prompt: 'Quiero saber cómo coordinar una tasación de mi casa.' },
      { label: '📑 Requisitos de Alquiler', labelPt: '📑 Requisitos de Aluguel', prompt: '¿Cuáles son los requisitos y garantías para alquilar?' }
    ],
    aiContext: (text) => {
      const low = text.toLowerCase();
      if (low.includes('alquiler') || low.includes('departamento') || low.includes('2 ambientes') || low.includes('aluguel')) {
        return '¡Excelente! Tenemos 2 opciones destacadas que coinciden con tu búsqueda:\n\n📍 Depto 2 Ambientes en Centro con balcón y cochera: $380.000 ARS/mes\n📍 Depto Moderno en Barrio Residencial con amenities: $420.000 ARS/mes\n\n¿Te gustaría recibir las fichas con fotos en tu WhatsApp?';
      }
      if (low.includes('tasar') || low.includes('tasacion') || low.includes('evaluar') || low.includes('vender')) {
        return 'Realizamos tasaciones profesionales en 24 horas hábiles. Por favor indícanos:\n\n1. Dirección o zona aproximada\n2. Tipo de inmueble (Casa, Depto, Lote)\n3. Metros cuadrados estimados';
      }
      return 'Tomamos nota de tu requerimiento inmobiliario. Nuestro asesor de la zona te enviará opciones exclusivas recién ingresadas.';
    }
  },
  {
    id: 'gastronomia',
    name: 'Gastronomía & Bares',
    namePt: 'Gastronomia & Restaurantes',
    icon: Coffee,
    botName: 'Bistró Gourmet Bot',
    avatarBg: 'bg-amber-600',
    initialMessage: '🍷 ¡Hola! Gracias por comunicarte con Bistró Gourmet. ¿Deseas reservar una mesa, ver nuestro menú digital o pedir para llevar?',
    initialMessagePt: '🍷 Olá! Obrigado por falar com Bistrô Gourmet. Deseja reservar uma mesa, ver nosso cardápio digital ou pedir delivery?',
    quickReplies: [
      { label: '🍽️ Reservar Mesa para 4', labelPt: '🍽️ Reservar Mesa para 4', prompt: 'Quiero reservar una mesa para 4 personas este viernes a las 21:30 hs.' },
      { label: '📖 Ver Menú & Precios', labelPt: '📖 Ver Cardápio & Preços', prompt: '¿Pueden enviarme el menú de platos y carta de vinos?' },
      { label: '🛵 Pedir Delivery', labelPt: '🛵 Pedir Delivery', prompt: '¿Tienen delivery para la zona céntrica hoy?' }
    ],
    aiContext: (text) => {
      const low = text.toLowerCase();
      if (low.includes('reserva') || low.includes('mesa') || low.includes('viernes') || low.includes('personas')) {
        return '¡Mesa pre-bloqueada! 🎉\n\n📅 Fecha: Este viernes\n⏰ Hora: 21:30 hs\n👥 Comensales: 4 personas\n\n¿Prefieres mesa en el salón principal climatizado o en la terraza al aire libre?';
      }
      if (low.includes('menu') || low.includes('carta') || low.includes('precio') || low.includes('platos')) {
        return 'Aquí tienes nuestras especialidades destacadas:\n\n🥩 Ojo de Bife Madurado con papas rústicas ($14.500)\n🍝 Raviolones de Salmón con salsa de puerros ($12.800)\n🍷 Carta de Vinos de autor y coctelería clásica\n\n¿Deseas que te reservemos mesa para probarlos?';
      }
      return '¡Perfecto! Hemos registrado tu pedido en nuestra comanda digital. El tiempo estimado de despacho es de 30 a 40 minutos.';
    }
  },
  {
    id: 'contable',
    name: 'Estudio Contable / Legal',
    namePt: 'Escritório Contábil / Jurídico',
    icon: Scale,
    botName: 'Asesor Contable AFIP IA',
    avatarBg: 'bg-indigo-600',
    initialMessage: '⚖️ ¡Hola! Soy el asistente virtual del Estudio Contable. ¿En qué trámite impositivo, laboral o societario podemos asesorarte?',
    initialMessagePt: '⚖️ Olá! Sou o assistente virtual da Assessoria Contábil. Em qual trâmite fiscal ou tributário podemos ajudar?',
    quickReplies: [
      { label: '🧾 Recategorización Monotributo', labelPt: '🧾 Enquadramento Fiscal', prompt: 'Necesito ayuda con la recategorización de Monotributo y facturación electrónica.' },
      { label: '🏢 Constitución de SAS / SRL', labelPt: '🏢 Abertura de Empresa', prompt: '¿Cuánto demora y qué costo tiene constituir una sociedad comercial?' },
      { label: '💼 Asesoramiento Impositivo PyME', labelPt: '💼 Consultoria Tributária', prompt: 'Quiero un diagnóstico impositivo para optimizar los impuestos de mi PyME.' }
    ],
    aiContext: (text) => {
      const low = text.toLowerCase();
      if (low.includes('monotributo') || low.includes('recategorizacion') || low.includes('factura') || low.includes('afip')) {
        return 'Con gusto te asesoramos con Monotributo y AFIP:\n\n✔️ Análisis de topes de facturación y gastos anuales\n✔️ Configuración de punto de venta digital y CAE\n✔️ Liquidación de Ingresos Brutos (Convenio Multilateral / Local)\n\n¿Deseas coordinar una sesión de diagnóstico de 20 min con un contador?';
      }
      if (low.includes('sociedad') || low.includes('srl') || low.includes('sas') || low.includes('constituir')) {
        return 'Constituimos Sociedades Comerciales (SAS / SRL) en un plazo promedio de 10 a 15 días hábiles, incluyendo CUIT, estatuto inscripto y apertura de cuenta bancaria. ¿Para cuántos socios está proyectada?';
      }
      return 'Tu requerimiento impositivo fue derivado a nuestro equipo tributario. Te enviaremos el presupuesto de honorarios detallado.';
    }
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Tiendas',
    namePt: 'E-commerce & Varejo',
    icon: ShoppingCart,
    botName: 'Moda Express Bot',
    avatarBg: 'bg-pink-600',
    initialMessage: '🛍️ ¡Hola! Bienvenido a Moda Express. ¿Deseas consultar el estado de tu pedido, conocer promociones o buscar un producto?',
    initialMessagePt: '🛍️ Olá! Bem-vindo à Moda Express. Deseja rastrear seu pedido, ver promoções ou consultar produtos?',
    quickReplies: [
      { label: '📦 Rastrear Mi Envío', labelPt: '📦 Rastrear Meu Pedido', prompt: 'Quiero saber el estado de mi envío con el número de orden #48291.' },
      { label: '💳 Medios de Pago & Cuotas', labelPt: '💳 Pagamento & Parcelamento', prompt: '¿Tienen cuotas sin interés y envíos gratis?' },
      { label: '👗 Tabla de Talles y Cambios', labelPt: '👗 Tabela de Medidas', prompt: '¿Cómo funciona la política de cambios si no me queda el talle?' }
    ],
    aiContext: (text) => {
      const low = text.toLowerCase();
      if (low.includes('rastrear') || low.includes('envio') || low.includes('orden') || low.includes('pedido')) {
        return '📦 Estado de Orden #48291:\n\n🚚 Estado: En camino con Andreani / Correo\n📍 Ubicación: En centro de distribución local\n⏱️ Entrega estimada: Mañana antes de las 18:00 hs\n\n¿Deseas recibir un aviso automático apenas salga a reparto?';
      }
      if (low.includes('pago') || low.includes('cuotas') || low.includes('tarjeta') || low.includes('interes')) {
        return '¡Sí! Contamos con:\n\n💳 3 y 6 Cuotas Sin Interés con todas las tarjetas\n💵 15% de descuento adicional abonando por Transferencia Bancaria\n📦 Envío Gratis a todo el país en compras superiores a $45.000 ARS';
      }
      return 'Para gestionar cambios dispones de 30 días con retiro a domicilio bonificado. ¿Quieres que generemos la etiqueta de cambio?';
    }
  },
  {
    id: 'b2b',
    name: 'Servicios B2B & Software',
    namePt: 'Serviços B2B & SaaS',
    icon: Briefcase,
    botName: 'Clientum Growth AI',
    avatarBg: 'bg-emerald-600',
    initialMessage: '⚡ ¡Hola! Soy el agente B2B de Clientum. Ayudamos a PyMEs a multiplicar sus ventas con Chatbots IA y CRM. ¿En qué proyecto estás trabajando?',
    initialMessagePt: '⚡ Olá! Sou o agente B2B da Clientum. Ajudamos PMEs a multiplicar vendas com Chatbots IA e CRM. Em qual projeto você está trabalhando?',
    quickReplies: [
      { label: '🚀 Demo de Chatbot WhatsApp', labelPt: '🚀 Demo de Chatbot WhatsApp', prompt: 'Quiero ver una demostración de cómo el chatbot califica leads y agenda reuniones.' },
      { label: '📊 Precios de CRM + AFIP', labelPt: '📊 Preços de CRM + AFIP', prompt: '¿Cuáles son los planes de CRM con facturación electrónica y cuántos usuarios incluye?' },
      { label: '🤝 Agendar Kickoff Técnico', labelPt: '🤝 Agendar Kickoff Técnico', prompt: 'Quiero coordinar una reunión de 20 minutos para analizar mi empresa.' }
    ],
    aiContext: (text) => {
      const low = text.toLowerCase();
      if (low.includes('demo') || low.includes('chatbot') || low.includes('whatsapp') || low.includes('agendar')) {
        return '¡Excelente! Los chatbots de Clientum responden en < 2 segundos, atienden 24/7 y se sincronizan directo con tu CRM y Google Calendar.\n\n¿Cuántas consultas diarias recibe actualmente tu negocio en WhatsApp?';
      }
      if (low.includes('precio') || low.includes('crm') || low.includes('afip') || low.includes('costo')) {
        return 'Nuestros planes comienzan en $20 USD/mes para herramientas iniciales y $80 USD/mes para la suite comercial con WhatsApp IA y facturación AFIP.\n\n¿Te gustaría que te preparemos una propuesta personalizada con el cotizador?';
      }
      return '¡Perfecto! Te invitamos a coordinar una llamada de diagnóstico gratuita de 20 minutos con nuestro equipo de ingeniería.';
    }
  }
];

interface SimulatorProps {
  initialIndustryId?: string;
  onOpenWizard?: () => void;
  onOpenAudit?: () => void;
}

export function IndustryWhatsAppSimulator({ initialIndustryId, onOpenWizard, onOpenAudit }: SimulatorProps) {
  const { isPortuguese } = useLanguage();
  const [selectedIndustry, setSelectedIndustry] = useState<string>(initialIndustryId || 'distribuidoras');
  const [messages, setMessages] = useState<Array<{ id: string; sender: 'bot' | 'user'; text: string; time: string }>>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync if prop changes
  useEffect(() => {
    if (initialIndustryId) {
      setSelectedIndustry(initialIndustryId);
    }
  }, [initialIndustryId]);

  const currentIndustry = INDUSTRIES.find(i => i.id === selectedIndustry) || INDUSTRIES[0];

  // Reset chat when industry changes
  useEffect(() => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: 'msg-init',
        sender: 'bot',
        text: isPortuguese ? currentIndustry.initialMessagePt : currentIndustry.initialMessage,
        time: timeStr
      }
    ]);
  }, [selectedIndustry, isPortuguese]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgId = `user-${Date.now()}`;

    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: query, time: timeStr }]);
    if (!textToSend) setInputVal('');

    setIsTyping(true);

    setTimeout(() => {
      const botReplyText = currentIndustry.aiContext(query);
      const botMsgId = `bot-${Date.now()}`;
      const botTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages(prev => [
        ...prev,
        { id: botMsgId, sender: 'bot', text: botReplyText, time: botTimeStr }
      ]);
      setIsTyping(false);
    }, 1100);
  };

  const handleResetChat = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: 'msg-init-reset',
        sender: 'bot',
        text: isPortuguese ? currentIndustry.initialMessagePt : currentIndustry.initialMessage,
        time: timeStr
      }
    ]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 relative">
      {/* Outer wrapper with integrated Hero Banner */}
      <div className="relative w-full rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl border border-blue-500/20 overflow-hidden bg-slate-950/80">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <img
            src={heroBannerImg}
            alt="Clientum AI Background Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-30 scale-105 filter blur-[1px] transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/90 to-slate-950" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isPortuguese ? 'Simulador Interativo Multi-Indústria' : 'Simulador Interactivo Multi-Rubro'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {isPortuguese
              ? 'Experimente como a IA atende no WhatsApp do seu negócio'
              : 'Experimenta cómo la IA atiende en el WhatsApp de tu negocio'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {isPortuguese
              ? 'Selecione seu segmento abaixo e teste em tempo real respostas automáticas, agendamentos e qualificação comercial.'
              : 'Selecciona tu rubro y prueba en tiempo real cómo nuestros agentes atienden consultas, agendan citas y cierran ventas 24/7.'}
          </p>
        </div>

        {/* Industry Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            const isSelected = selectedIndustry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg ring-1 ring-emerald-400/50 scale-[1.02]'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{isPortuguese ? ind.namePt : ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* WhatsApp Phone Mockup Frame */}
        <div className="max-w-md mx-auto bg-[#111b21] rounded-3xl border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[520px]">
          {/* Top Bar (WhatsApp Header) */}
          <div className="bg-[#202c33] text-white px-4 py-3 flex items-center justify-between border-b border-slate-700/60 shrink-0">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${currentIndustry.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs text-white leading-tight">{currentIndustry.botName}</h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>online · en vivo</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleResetChat}
              title="Reiniciar chat"
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-700/60 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#0b141a] bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-[#005c4b] text-white rounded-tr-none'
                      : 'bg-[#202c33] text-slate-100 rounded-tl-none border border-slate-700/40'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                    <span>{m.time}</span>
                    {m.sender === 'user' && (
                      <CheckCheck className="w-3 h-3 text-emerald-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#202c33] border border-slate-700/40 text-slate-300 rounded-2xl rounded-tl-none px-4 py-2 text-xs flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span className="text-[11px] text-slate-400">{currentIndustry.botName} está escribiendo...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="bg-[#111b21] border-t border-slate-800/80 px-3 py-2 shrink-0">
            <div className="text-[10px] text-slate-400 mb-1.5 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>{isPortuguese ? 'Respostas Rápidas Sugeridas' : 'Preguntas Rápidas de Prueba'}</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {currentIndustry.quickReplies.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.prompt)}
                  disabled={isTyping}
                  className="bg-[#202c33] hover:bg-[#2a3942] text-emerald-300 text-[10px] font-medium px-2.5 py-1.5 rounded-xl border border-emerald-500/20 whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {isPortuguese ? q.labelPt : q.label}
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="bg-[#202c33] px-3 py-2.5 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={isPortuguese ? 'Digite uma mensagem de teste...' : 'Escribe una pregunta para el bot...'}
              disabled={isTyping}
              className="flex-1 bg-[#2a3942] text-white text-xs px-3.5 py-2 rounded-xl outline-none placeholder:text-slate-500 focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center disabled:opacity-40 transition-all cursor-pointer shrink-0 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Action beneath phone */}
        <div className="mt-8 text-center bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-extrabold text-white text-sm sm:text-base">
              {isPortuguese ? '¿Deseja um bot configurado com os dados da sua empresa?' : '¿Quieres implementar este bot con tus productos y precios?'}
            </h4>
            <p className="text-xs text-slate-400">
              {isPortuguese
                ? 'Treinamos o agente em 5 dias e conectamos com seu WhatsApp oficial sem trocar de número.'
                : 'Lo dejamos funcionando en 5 días hábiles con tu número actual y conectado a tu CRM.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {onOpenAudit && (
              <button
                onClick={onOpenAudit}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all border border-slate-700 shadow-md cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isPortuguese ? 'Diagnóstico Gratuito' : 'Diagnóstico Gratuito'}</span>
              </button>
            )}
            <a
              href="https://wa.me/5492984510883?text=Hola%20Clientum!%20Probé%20el%20simulador%20de%20WhatsApp%20y%20quiero%20cotizar%20un%20bot%20para%20mi%20negocio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isPortuguese ? 'Falar no WhatsApp Real' : 'Probar en WhatsApp Real'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
