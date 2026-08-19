import React, { useState, useMemo } from 'react';
import {
  X,
  MessageSquare,
  Sparkles,
  Send,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  Search,
  Filter,
  Check,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Copy,
  Zap,
  Building2,
  User,
  Phone,
  RefreshCw,
  Sliders,
  Eye,
  CheckCheck,
  Bot
} from 'lucide-react';

export interface BulkContactItem {
  id: string;
  name: string;
  role?: string;
  company?: string;
  phone: string;
  city?: string;
  country?: string;
  leadScore?: number;
  status?: string;
  personaTag?: string;
  whatsappVerified?: boolean;
}

interface BulkWhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContacts?: BulkContactItem[];
  preselectedIds?: string[];
  onScheduleSuccess?: (campaign: {
    id: string;
    name: string;
    recipientCount: number;
    scheduledFor: string;
    template: string;
  }) => void;
}

const DEFAULT_SAMPLE_CONTACTS: BulkContactItem[] = [
  {
    id: 'cnt-01',
    name: 'Ing. Roberto Albarracín',
    role: 'CEO & Socio Director',
    company: 'Grupo Agro-Industrial Patagonia S.A.',
    phone: '+54 9 298 443-1200',
    city: 'General Roca',
    country: 'Argentina',
    personaTag: 'CEO PyME',
    leadScore: 94,
    status: 'Cliente',
    whatsappVerified: true
  },
  {
    id: 'cnt-02',
    name: 'Lic. Laura Fernández',
    role: 'Directora de Operaciones',
    company: 'Logística Austral S.R.L.',
    phone: '+54 9 299 412-9876',
    city: 'Neuquén',
    country: 'Argentina',
    personaTag: 'CRO / Ventas',
    leadScore: 89,
    status: 'Oportunidad',
    whatsappVerified: true
  },
  {
    id: 'cnt-03',
    name: 'Ing. Esteban Rossi',
    role: 'CTO & Head of IT',
    company: 'TechSol Cuyo S.A.',
    phone: '+54 9 261 554-3321',
    city: 'Mendoza',
    country: 'Argentina',
    personaTag: 'CTO / Sistemas',
    leadScore: 92,
    status: 'Cliente',
    whatsappVerified: true
  },
  {
    id: 'cnt-04',
    name: 'Felipe Undurraga',
    role: 'VP Commercial Sales',
    company: 'FinTech Cordillerana S.A.S.',
    phone: '+56 9 8765 4321',
    city: 'Santiago',
    country: 'Chile',
    personaTag: 'CRO / Ventas',
    leadScore: 78,
    status: 'Lead Calificado',
    whatsappVerified: true
  },
  {
    id: 'cnt-05',
    name: 'Dra. Marcela Godoy',
    role: 'Directora Médica & Socia',
    company: 'Centro Médico & Diagnóstico Roca',
    phone: '+54 9 298 442-9988',
    city: 'General Roca',
    country: 'Argentina',
    personaTag: 'CEO PyME',
    leadScore: 91,
    status: 'Cliente',
    whatsappVerified: true
  },
  {
    id: 'cnt-06',
    name: 'Carlos Benítez',
    role: 'Gerente Comercial',
    company: 'Distribuidora del Valle',
    phone: '+54 9 299 501-2345',
    city: 'Cipolletti',
    country: 'Argentina',
    personaTag: 'CRO / Ventas',
    leadScore: 85,
    status: 'Lead Calificado',
    whatsappVerified: true
  }
];

const AI_PRESETS = [
  {
    id: 'reactivation',
    title: 'Reactivación B2B & Novedades CRM',
    desc: 'Mensaje consultivo para retomar contacto con decisores.',
    tone: 'Profesional & Consultivo',
    prompt: 'Generar un mensaje de reactivación personalizado para un directivo de PyME, mencionando cómo Clientum automatiza el seguimiento comercial y los presupuestos por WhatsApp sin perder leads.'
  },
  {
    id: 'proposal_followup',
    title: 'Seguimiento de Propuesta & Cierre',
    desc: 'Recordatorio cordial para revisar propuesta enviada.',
    tone: 'Directo & Asertivo',
    prompt: 'Generar un seguimiento cordial y profesional de la propuesta comercial enviada, consultando si pudieron revisarla y ofreciendo una llamada breve de 10 min para despejar dudas.'
  },
  {
    id: 'masterclass_invite',
    title: 'Invitación a Masterclass / Demo',
    desc: 'Invitación exclusiva a taller de ventas y marketing digital.',
    tone: 'Cálido & Exclusivo',
    prompt: 'Invitar cordialmente al decisor a la próxima Masterclass de Marketing Digital y Automatización en General Roca / Online, destacando que hay cupo reservado para su empresa.'
  },
  {
    id: 'checkin_satisfaction',
    title: 'Check-in de Servicio & Oportunidad',
    desc: 'Relevamiento de satisfacción para clientes activos.',
    tone: 'Empático & Relacional',
    prompt: 'Saludar al cliente, validar cómo viene funcionando el CRM y consultarle si desean sumar automatizaciones de WhatsApp con IA para su equipo comercial.'
  }
];

export const BulkWhatsAppModal: React.FC<BulkWhatsAppModalProps> = ({
  isOpen,
  onClose,
  initialContacts = DEFAULT_SAMPLE_CONTACTS,
  preselectedIds = [],
  onScheduleSuccess
}) => {
  const [contacts] = useState<BulkContactItem[]>(initialContacts.length > 0 ? initialContacts : DEFAULT_SAMPLE_CONTACTS);
  
  // Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (preselectedIds.length > 0) return preselectedIds;
    return (initialContacts.length > 0 ? initialContacts : DEFAULT_SAMPLE_CONTACTS).slice(0, 3).map(c => c.id);
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('todos');
  const [statusFilter, setStatusFilter] = useState('todos');

  // AI & Message Generation State
  const [selectedPreset, setSelectedPreset] = useState<string>('reactivation');
  const [tone, setTone] = useState<'profesional' | 'cálido' | 'directo' | 'ejecutivo'>('profesional');
  const [customGoal, setCustomGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messageTemplate, setMessageTemplate] = useState<string>(
    'Hola {{nombre}}, ¿cómo estás? Te escribo desde Clientum para {{empresa}}. Notamos que en {{ciudad}} varias empresas del sector están optimizando sus ventas y presupuestos automáticos por WhatsApp con nuestro CRM. ¿Te gustaría que coordinemos 10 minutos esta semana para mostrarte cómo aplicarlo en tu equipo?'
  );

  // Scheduling State
  const [scheduleType, setScheduleType] = useState<'immediate' | 'scheduled'>('scheduled');
  const [scheduledDate, setScheduledDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [scheduledTime, setScheduledTime] = useState('09:30');
  const [delaySeconds, setDelaySeconds] = useState(12);
  const [botHandover, setBotHandover] = useState(true);

  // Preview State
  const [previewContactIndex, setPreviewContactIndex] = useState(0);

  // Execution / Progress State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState<any>(null);

  // Filtered contacts list
  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.role && c.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.phone && c.phone.includes(searchQuery));

      const matchRole = roleFilter === 'todos' || c.personaTag === roleFilter;
      const matchStatus = statusFilter === 'todos' || c.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [contacts, searchQuery, roleFilter, statusFilter]);

  const selectedContacts = useMemo(() => {
    return contacts.filter(c => selectedIds.includes(c.id));
  }, [contacts, selectedIds]);

  // Current contact for preview
  const currentPreviewContact = selectedContacts[previewContactIndex] || selectedContacts[0] || contacts[0];

  // Missing variables validation
  const missingVariablesWarnings = useMemo(() => {
    const warnings: string[] = [];
    if (!messageTemplate || selectedContacts.length === 0) return warnings;

    const usesName = /{{nombre}}|{{name}}|{{primer_nombre}}|{{first_name}}/.test(messageTemplate);
    const usesCompany = /{{empresa}}|{{company}}/.test(messageTemplate);
    const usesRole = /{{cargo}}|{{role}}/.test(messageTemplate);
    const usesCity = /{{ciudad}}|{{city}}/.test(messageTemplate);

    let missingCompany = 0;
    let missingRole = 0;
    let missingCity = 0;
    let missingName = 0;

    selectedContacts.forEach(c => {
      if (usesName && !c.name?.trim()) missingName++;
      if (usesCompany && !c.company?.trim()) missingCompany++;
      if (usesRole && !c.role?.trim()) missingRole++;
      if (usesCity && !c.city?.trim()) missingCity++;
    });

    if (missingName > 0) warnings.push(`Falta el nombre en ${missingName} contacto(s). Se usará el valor por defecto.`);
    if (missingCompany > 0) warnings.push(`Falta la empresa en ${missingCompany} contacto(s). Se usará 'su empresa'.`);
    if (missingRole > 0) warnings.push(`Falta el cargo en ${missingRole} contacto(s). Se usará 'Directivo'.`);
    if (missingCity > 0) warnings.push(`Falta la ciudad en ${missingCity} contacto(s). Se usará 'la región'.`);

    return warnings;
  }, [messageTemplate, selectedContacts]);

  // Helper to replace template tags
  const renderMessageForContact = (template: string, contact: BulkContactItem | undefined) => {
    if (!contact) return template;
    const firstName = contact.name.split(' ')[0] || contact.name;
    return template
      .replace(/{{nombre}}/g, contact.name)
      .replace(/{{name}}/g, contact.name)
      .replace(/{{primer_nombre}}/g, firstName)
      .replace(/{{first_name}}/g, firstName)
      .replace(/{{empresa}}/g, contact.company || 'su empresa')
      .replace(/{{company}}/g, contact.company || 'su empresa')
      .replace(/{{cargo}}/g, contact.role || 'Directivo')
      .replace(/{{role}}/g, contact.role || 'Directivo')
      .replace(/{{ciudad}}/g, contact.city || 'la región')
      .replace(/{{city}}/g, contact.city || 'la región')
      .replace(/{{scoring}}/g, String(contact.leadScore || 85));
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredContacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContacts.map(c => c.id));
    }
  };

  const handleToggleContact = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // AI Generator Function
  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let generated = '';
      if (selectedPreset === 'reactivation') {
        if (tone === 'profesional') {
          generated = 'Estimado/a {{nombre}}, un gusto saludarlo. Desde Clientum estuvimos analizando los procesos comerciales en {{empresa}} y creemos que implementar nuestro orquestador de WhatsApp y CRM B2B les permitiría captar y calificar leads en {{ciudad}} sin fricción. ¿Le resultaría de interés conversar 15 minutos este jueves?';
        } else if (tone === 'cálido') {
          generated = '¡Hola {{primer_nombre}}! ¿Cómo andan las cosas por {{empresa}}? Te escribo porque lanzamos el nuevo módulo de seguimiento automático de WhatsApp para el CRM y pensé directo en tu equipo. ¿Cuándo tendrías un ratito para mostrártelo sin compromiso?';
        } else {
          generated = 'Hola {{nombre}}, te contacto para presentarte cómo las PyMEs de {{ciudad}} están automatizando presupuestos y cobranzas por WhatsApp con Clientum CRM. ¿Te paso un breve video resumen o coordinamos una llamada?';
        }
      } else if (selectedPreset === 'proposal_followup') {
        generated = 'Hola {{nombre}}, espero que estés teniendo una excelente semana. Te escribo para consultar si pudieron revisar la propuesta que enviamos para {{empresa}}. Quedo a total disposición para ajustar cualquier punto o coordinar una llamada breve.';
      } else if (selectedPreset === 'masterclass_invite') {
        generated = '¡Hola {{nombre}}! Te invitamos formalmente a la Masterclass exclusiva de Clientum Academia sobre Marketing Digital y Ventas B2B para {{empresa}}. Tenemos un cupo bonificado reservado para directivos de {{ciudad}}. ¿Te gustaría que te reserve el acceso?';
      } else {
        generated = 'Hola {{nombre}}, desde el equipo de Clientum nos gustaría saber cómo viene funcionando la gestión comercial en {{empresa}}. Incorporamos agentes inteligentes de WhatsApp que responden 24/7 y sincronizan con tu pipeline. ¿Te gustaría probarlo?';
      }

      if (customGoal.trim()) {
        generated += `\n\nPD: ${customGoal.trim()}`;
      }

      setMessageTemplate(generated);
      setIsGenerating(false);
    }, 600);
  };

  // Insert Variable Token
  const handleInsertVariable = (variable: string) => {
    setMessageTemplate(prev => prev + ` {{${variable}}}`);
  };

  // Dispatch / Schedule Handler
  const handleScheduleSubmit = () => {
    if (selectedIds.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const scheduledDateTime = scheduleType === 'immediate'
        ? new Date().toISOString()
        : `${scheduledDate}T${scheduledTime}:00`;

      const campaign = {
        id: `camp-${Date.now()}`,
        name: `Campaña WA ${selectedPreset.toUpperCase()} (${selectedContacts.length} contactos)`,
        recipientCount: selectedContacts.length,
        scheduledFor: scheduledDateTime,
        template: messageTemplate
      };

      setCampaignDetails(campaign);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      if (onScheduleSuccess) {
        onScheduleSuccess(campaign);
      }
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-center justify-between border-b border-emerald-800/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2 py-0.5 rounded-md font-mono">
                  WhatsApp Broadcast & AI Agent
                </span>
                <span className="text-emerald-200/60 text-xs font-mono">CRM Engine</span>
              </div>
              <h2 className="text-lg font-black tracking-tight text-white mt-0.5 flex items-center gap-2">
                Envío Masivo Personalizado con IA
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border-0 cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {submitSuccess ? (
          <div className="p-8 sm:p-12 text-center space-y-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCheck className="w-8 h-8" />
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                ¡Campaña Programada Exitosamente!
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Se programó el envío para <strong className="text-slate-800">{campaignDetails?.recipientCount} destinatarios</strong> con cadencia inteligente anti-bloqueo ({delaySeconds}s por mensaje).
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full max-w-lg text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-400 font-mono">Fecha de Inicio:</span>
                <span className="font-bold text-slate-800">
                  {scheduleType === 'immediate' ? 'Inmediato (En cola)' : `${scheduledDate} a las ${scheduledTime} hs`}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-400 font-mono">Canal de Envío:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> WhatsApp Business Cloud API
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-mono">Atención Post-Respuesta:</span>
                <span className="font-bold text-slate-800">
                  {botHandover ? 'Agente IA Santi (Activo 24/7)' : 'Solo Vendedores Humanos'}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer border-0"
              >
                Cerrar y Volver al CRM
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 overflow-y-auto flex-1">
            
            {/* Columna Izquierda: Selección de Contactos (5 cols) */}
            <div className="lg:col-span-5 p-5 space-y-4 bg-slate-50/50 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-700" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">
                      1. Seleccionar Contactos
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {selectedIds.length} seleccionados
                  </span>
                </div>

                {/* Filtros rápidos */}
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Buscar por nombre, empresa o teléfono..."
                      className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-hidden focus:border-emerald-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <select
                      value={roleFilter}
                      onChange={e => setRoleFilter(e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium"
                    >
                      <option value="todos">Todos los Roles</option>
                      <option value="CEO PyME">CEO PyME</option>
                      <option value="CRO / Ventas">CRO / Ventas</option>
                      <option value="CTO / Sistemas">CTO / Sistemas</option>
                    </select>

                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium"
                    >
                      <option value="todos">Todos los Estados</option>
                      <option value="Cliente">Clientes</option>
                      <option value="Oportunidad">Oportunidades</option>
                      <option value="Lead Calificado">Leads Calificados</option>
                    </select>
                  </div>
                </div>

                {/* Header de Selección rápida */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <button
                    onClick={handleToggleSelectAll}
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3 h-3" />
                    {selectedIds.length === filteredContacts.length ? 'Deseleccionar Todos' : 'Seleccionar Todos los Filtrados'}
                  </button>
                  <span>{filteredContacts.length} contactos</span>
                </div>

                {/* Lista Scrolleable de Contactos */}
                <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                  {filteredContacts.map(contact => {
                    const isSelected = selectedIds.includes(contact.id);
                    return (
                      <div
                        key={contact.id}
                        onClick={() => handleToggleContact(contact.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-emerald-50/80 border-emerald-300 shadow-2xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                                {contact.name}
                              </p>
                              {contact.whatsappVerified && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="WhatsApp Verificado" />
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 truncate leading-none mt-0.5">
                              {contact.company} · {contact.city}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {contact.personaTag || contact.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tips anti-spam */}
              <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-start gap-2 text-[11px] text-emerald-900 mt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Envío Seguro:</strong> Se distribuyen intervalos aleatorios de {delaySeconds}s para respetar políticas de Meta y garantizar tasa de apertura superior al 90%.
                </p>
              </div>
            </div>

            {/* Columna Derecha: Generador IA, Template & Programación (7 cols) */}
            <div className="lg:col-span-7 p-5 space-y-5 bg-white flex flex-col justify-between">
              <div className="space-y-4">
                
                {/* Selector de Presets IA */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>2. Objetivo & Plantilla con IA</span>
                    </label>
                    
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-slate-400 font-mono">Tono:</span>
                      <select
                        value={tone}
                        onChange={e => setTone(e.target.value as any)}
                        className="text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg px-2 py-0.5"
                      >
                        <option value="profesional">Profesional</option>
                        <option value="cálido">Cercano / Cálido</option>
                        <option value="directo">Directo Comercial</option>
                        <option value="ejecutivo">Ejecutivo C-Level</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {AI_PRESETS.map(preset => {
                      const isSelected = selectedPreset === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setSelectedPreset(preset.id);
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-400/50'
                              : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <p className={`text-xs font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                            {preset.title}
                          </p>
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                            {preset.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Botón de Generación IA */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/10 cursor-pointer border-0"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>{isGenerating ? 'Redactando con Inteligencia Artificial...' : 'Generar / Optimizar Mensaje con IA'}</span>
                  </button>
                </div>

                {/* Editor de Mensaje y Variables */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-700">
                      Cuerpo del Mensaje (Soporta variables dinámicas):
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {messageTemplate.length} caracteres
                    </span>
                  </div>

                  <textarea
                    rows={4}
                    value={messageTemplate}
                    onChange={e => setMessageTemplate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 font-sans leading-relaxed"
                    placeholder="Escribe el mensaje o usa las variables de personalización..."
                  />

                  {/* Variables dinámicas badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="text-[10px] text-slate-400 font-mono">Insertar:</span>
                    {['nombre', 'name', 'primer_nombre', 'empresa', 'company', 'cargo', 'ciudad', 'scoring'].map(v => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => handleInsertVariable(v)}
                        className="text-[10px] font-mono bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                      >
                        +{`{{${v}}}`}
                      </button>
                    ))}
                  </div>

                  {/* Advertencia de variables faltantes */}
                  {missingVariablesWarnings.length > 0 && (
                    <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 items-start">
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-700 space-y-1">
                        <p className="font-bold">Advertencia: Faltan datos en algunos contactos</p>
                        <ul className="list-disc pl-4 space-y-0.5">
                          {missingVariablesWarnings.map((warn, i) => (
                            <li key={i}>{warn}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Vista Previa de WhatsApp en Vivo */}
                <div className="bg-slate-900 rounded-2xl p-3.5 space-y-2 border border-slate-800 text-white">
                  <div className="flex items-center justify-between text-[11px] border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Vista Previa del Mensaje Real</span>
                    </div>

                    {selectedContacts.length > 1 && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <span>Ver para:</span>
                        <select
                          value={previewContactIndex}
                          onChange={e => setPreviewContactIndex(Number(e.target.value))}
                          className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-1.5 py-0.5 font-sans"
                        >
                          {selectedContacts.map((c, idx) => (
                            <option key={c.id} value={idx}>
                              {c.name} ({c.company})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Burbuja WhatsApp */}
                  <div className="bg-[#0b141a] p-3 rounded-xl border border-slate-800 flex justify-end">
                    <div className="bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tr-xs p-3 max-w-[90%] text-xs shadow-md space-y-1">
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {renderMessageForContact(messageTemplate, currentPreviewContact)}
                      </p>
                      <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200/60 font-mono">
                        <span>10:42 AM</span>
                        <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Programación & Opciones de Envío */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-800 font-mono flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>3. Momento de Envío & Automatización</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      scheduleType === 'immediate'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}>
                      <input
                        type="radio"
                        name="scheduleType"
                        checked={scheduleType === 'immediate'}
                        onChange={() => setScheduleType('immediate')}
                        className="text-emerald-600"
                      />
                      <span>Enviar Ahora (Inmediato)</span>
                    </label>

                    <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      scheduleType === 'scheduled'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}>
                      <input
                        type="radio"
                        name="scheduleType"
                        checked={scheduleType === 'scheduled'}
                        onChange={() => setScheduleType('scheduled')}
                        className="text-emerald-600"
                      />
                      <span>Programar Fecha & Hora</span>
                    </label>
                  </div>

                  {scheduleType === 'scheduled' && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 block mb-1">Fecha de Despacho:</label>
                        <input
                          type="date"
                          value={scheduledDate}
                          onChange={e => setScheduledDate(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 block mb-1">Hora de Despacho:</label>
                        <input
                          type="time"
                          value={scheduledTime}
                          onChange={e => setScheduledTime(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {/* Configuración de Bot Handover */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-700 font-medium">Activar Agente IA para responder respuestas entrantes</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={botHandover}
                      onChange={e => setBotHandover(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

              </div>

              {/* Botón Final de Acción */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  <span className="font-bold text-slate-800">{selectedIds.length}</span> destinatarios seleccionados
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer border-0"
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    onClick={handleScheduleSubmit}
                    disabled={selectedIds.length === 0 || isSubmitting}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer border-0"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isSubmitting
                        ? 'Programando Campaña...'
                        : scheduleType === 'immediate'
                        ? `Enviar WhatsApp Ahora (${selectedIds.length})`
                        : `Programar Envío (${selectedIds.length})`}
                    </span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default BulkWhatsAppModal;
