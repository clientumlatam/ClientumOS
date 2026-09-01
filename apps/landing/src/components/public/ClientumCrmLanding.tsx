import React, { useState } from 'react';
import { 
  Users, Briefcase, Zap, CheckCircle2, ArrowRight, Shield, Layers, 
  BarChart2, FileText, Check, Bot, Settings, Sparkles, Globe, 
  ChevronRight, MessageSquare, Database, ArrowUpRight, HelpCircle, Lock,
  Mail, Calendar, HardDrive, FileSpreadsheet, Activity, Building, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClientumCrmLandingProps {
  onNavigateTab?: (tab: string) => void;
  onOpenAuthModal?: () => void;
}

export const ClientumCrmLanding: React.FC<ClientumCrmLandingProps> = ({ 
  onNavigateTab, 
  onOpenAuthModal 
}) => {
  const navigate = useNavigate();
  const [activePipelineStage, setActivePipelineStage] = useState(1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleStartTrial = () => {
    if (onOpenAuthModal) {
      onOpenAuthModal();
    } else {
      navigate('/crm');
    }
  };

  const handleContactSales = () => {
    if (onNavigateTab) {
      onNavigateTab('contacto');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/contacto');
    }
  };

  const pipelineStages = [
    { id: 1, name: 'Nueva Oportunidad', deals: '8 Leads', val: '$1.2M', desc: 'Leads entrantes captados desde WhatsApp y Web' },
    { id: 2, name: 'Contacto & Diagnóstico', deals: '5 Deals', val: '$950K', desc: 'Primer contacto realizado y requerimientos relevados' },
    { id: 3, name: 'Propuesta Presentada', deals: '4 Deals', val: '$2.1M', desc: 'Cotización enviada con propuesta comercial' },
    { id: 4, name: 'Negociación', deals: '3 Deals', val: '$1.8M', desc: 'Ajuste de presupuesto y acuerdos de servicio' },
    { id: 5, name: 'Cierre Ganado', deals: '12 Deals', val: '$4.5M', desc: 'Venta cerrada y bienvenida al cliente en el sistema' },
  ];

  const faqs = [
    {
      q: '¿Qué es Clientum CRM?',
      a: 'Clientum CRM es una plataforma integral diseñada para centralizar clientes, oportunidades de venta, actividades, seguimiento de equipos y automatizaciones comerciales en una única interfaz intuitiva.'
    },
    {
      q: '¿Puedo probar Clientum antes de contratarlo?',
      a: 'Sí, podés comenzar una prueba gratuita de 14 días sin necesidad de ingresar tarjeta de crédito y con acceso completo a las funciones principales.'
    },
    {
      q: '¿Puedo trabajar con varios usuarios?',
      a: 'Por supuesto. Clientum CRM está pensado para el trabajo en equipo, permitiendo invitar vendedores, administradores y colaboradores con diferentes niveles de acceso.'
    },
    {
      q: '¿Puedo configurar roles y permisos?',
      a: 'Sí, la administración granular de usuarios permite definir qué miembros del equipo pueden ver, editar o exportar datos de clientes y reportes financieros.'
    },
    {
      q: '¿Puedo importar mis contactos existentes?',
      a: 'Sí. Podés importar fácilmente tus bases de datos de clientes y leads desde archivos Excel, CSV o conectando tus formularios web actuales.'
    },
    {
      q: '¿Con qué herramientas se integra?',
      a: 'Se conecta de forma nativa con Google Workspace (Gmail, Calendar, Drive, Sheets), WhatsApp Business, comprobantes de facturación AFIP, MercadoPago y Webhooks personalizados.'
    },
    {
      q: '¿Mis datos están protegidos?',
      a: 'Garantizamos máxima seguridad con cifrado SSL/TLS de 256 bits, respaldos diarios automáticos en infraestructura Cloud de alta disponibilidad y cumplimiento estricto de privacidad.'
    },
    {
      q: '¿Cuál es la diferencia entre Clientum CRM y ClientumOS?',
      a: 'Clientum CRM está especializado en la gestión comercial, ventas y clientes. ClientumOS es la plataforma y ecosistema integral sobre el que se conectan módulos de ERP, operaciones, dominios DNS y aplicaciones a medida.'
    }
  ];

  return (
    <div className="bg-[#0B0F19] text-slate-100 min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* 01 — NAVBAR IN-PAGE BADGE BAR */}
      <div className="bg-[#111726] border-b border-slate-800/80 px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white tracking-wider uppercase font-mono text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              CLIENTUM CRM & SUITE
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 font-medium">Ecosistema Empresarial Integrado</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
              ClientumOS · Clientum CRM
            </span>
            <button 
              onClick={handleStartTrial}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Iniciar sesión
            </button>
            <button 
              onClick={handleStartTrial}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer"
            >
              Probar gratis
            </button>
          </div>
        </div>
      </div>

      {/* 02 — HERO SECTION */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        {/* Atmosphere Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gestión comercial, sin complicaciones</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-[1.15]">
            Todo tu negocio.<br />
            <span className="bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
              Un CRM que trabaja con vos.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Centralizá clientes, oportunidades, tareas y equipos en un solo lugar. Automatizá el seguimiento y obtené una visión clara de lo que está pasando en tu negocio.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleStartTrial}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm px-8 py-4 rounded-xl shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Probar Clientum CRM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleContactSales}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-7 py-4 rounded-xl border border-slate-700/80 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Ver cómo funciona</span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs font-mono text-slate-400">
            {['Clientes', 'Ventas', 'Actividades', 'Automatización', 'Equipos', 'Reportes'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {item}
              </span>
            ))}
          </div>

          {/* Large Clean Dashboard Graphic Preview */}
          <div className="pt-8">
            <div className="bg-[#111726] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">Clientum CRM Workspace — Panel Principal</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Sincronizado en Tiempo Real
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                <div className="bg-[#161f33] p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Leads Nuevos</span>
                  <div className="text-2xl font-black text-white mt-1">142</div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">+18% esta semana</span>
                </div>
                <div className="bg-[#161f33] p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Pipeline Activo</span>
                  <div className="text-2xl font-black text-white mt-1">$8.4M</div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">24 oportunidades abiertas</span>
                </div>
                <div className="bg-[#161f33] p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Ventas Cerradas</span>
                  <div className="text-2xl font-black text-white mt-1">$4.2M</div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">12 contratos este mes</span>
                </div>
                <div className="bg-[#161f33] p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Tareas Cumplidas</span>
                  <div className="text-2xl font-black text-white mt-1">98.4%</div>
                  <span className="text-[10px] text-blue-400 font-mono font-bold">Seguimiento a tiempo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — EL PROBLEMA */}
      <section className="py-16 px-6 bg-[#0E1322] border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
              Cuando la información está en todas partes, el negocio también
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              ¿Cuánto tiempo perdés buscando información?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-white">Información Dispersa</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clientes en WhatsApp, datos en planillas sueltas, notas en cuadernos y correos archivados sin historial unificado.
              </p>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-white">Seguimientos Pendientes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tareas que dependen de la memoria personal, llamados no realizados y prospectos tibios que se enfrían por falta de atención.
              </p>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-white">Falta de Visibilidad</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sin métricas claras del estado de cada oportunidad comercial, imposibilitando proyecciones de facturación confiables.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-950/40 via-[#162138] to-blue-950/40 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2">
            <h3 className="text-lg font-bold text-emerald-400">Clientum CRM pone todo en su lugar.</h3>
            <p className="text-xs text-slate-300 max-w-2xl mx-auto">
              Una plataforma para centralizar la información, organizar el trabajo del equipo y mantener cada oportunidad comercial en constante movimiento.
            </p>
          </div>
        </div>
      </section>

      {/* 04 — CLIENTUM EN ACCIÓN */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
              Una visión completa de tu operación comercial
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              Todo lo que necesitás. En una sola vista.
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
              Consultá clientes, oportunidades, actividades y tareas sin saltar entre diferentes herramientas. Sabé qué pasó, qué está pasando y cuál es el próximo paso.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="p-5 bg-[#131a2e] border border-slate-800 rounded-xl space-y-1.5 hover:border-emerald-500/40 transition-all">
                <span className="text-xs font-bold text-emerald-400 font-mono">01. Centralización Total</span>
                <h4 className="text-sm font-bold text-white">Ficha 360° de Clientes y Empresas</h4>
                <p className="text-xs text-slate-400">Toda la historia comercial, presupuestos y mensajes en un solo registro.</p>
              </div>

              <div className="p-5 bg-[#131a2e] border border-slate-800 rounded-xl space-y-1.5 hover:border-emerald-500/40 transition-all">
                <span className="text-xs font-bold text-emerald-400 font-mono">02. Control de Oportunidades</span>
                <h4 className="text-sm font-bold text-white">Pipeline Kanban Dinámico</h4>
                <p className="text-xs text-slate-400">Visualizá el avance de ventas por etapas con montos proyectados en tiempo real.</p>
              </div>

              <div className="p-5 bg-[#131a2e] border border-slate-800 rounded-xl space-y-1.5 hover:border-emerald-500/40 transition-all">
                <span className="text-xs font-bold text-emerald-400 font-mono">03. Gestión de Actividades</span>
                <h4 className="text-sm font-bold text-white">Agenda y Tareas Vinculadas</h4>
                <p className="text-xs text-slate-400">Notificaciones automáticas para recordar llamadas, reuniones y envíos de propuesta.</p>
              </div>

              <button
                onClick={handleStartTrial}
                className="mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explorar el CRM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-white">Cliente: Distribuidora Patagónica S.A.</span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">Cliente Activo</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Último contacto:</span>
                  <span className="text-white font-mono">Hoy, 10:30 hs (WhatsApp)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Responsable:</span>
                  <span className="text-white font-mono">Martín Gómez (Ventas)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Valor en Pipeline:</span>
                  <span className="text-emerald-400 font-mono font-bold">$1.450.000 ARS</span>
                </div>
              </div>

              <div className="bg-[#0B0F19] p-3 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Próxima Acción Programada</span>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Enviar contrato firmado y coordinar reunión de onboarding
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — CONTACTOS */}
      <section className="py-16 px-6 bg-[#0E1322] border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-bold">
              Gestión de Contactos y Fichas 360°
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              Conocé a tus clientes, no solamente sus datos.
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
              Centralizá contactos, empresas, historial y actividades para tener toda la relación comercial disponible cuando la necesitás.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#131a2e] border border-slate-800 p-5 rounded-xl space-y-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Información</h4>
              <p className="text-xs text-slate-400">Datos personales, teléfonos, emails y campos personalizados.</p>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-5 rounded-xl space-y-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <h4 className="text-sm font-bold text-white">Historial</h4>
              <p className="text-xs text-slate-400">Registro cronológico de chats, correos, notas y presupuestos.</p>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-5 rounded-xl space-y-2">
              <Building className="w-5 h-5 text-purple-400" />
              <h4 className="text-sm font-bold text-white">Relaciones</h4>
              <p className="text-xs text-slate-400">Vínculos entre personas, empresas madre y sucursales.</p>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-5 rounded-xl space-y-2">
              <Target className="w-5 h-5 text-amber-400" />
              <h4 className="text-sm font-bold text-white">Seguimiento</h4>
              <p className="text-xs text-slate-400">Próximas acciones agendadas y alertas por falta de interacción.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — PIPELINE */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
              Cada oportunidad tiene un próximo paso
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              Nunca pierdas de vista una venta.
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
              Visualizá tu pipeline comercial y sabé exactamente dónde está cada oportunidad. Mové negocios entre etapas, asigná responsables y detectá rápidamente qué necesita atención.
            </p>
          </div>

          {/* Interactive Pipeline Demo Selector */}
          <div className="bg-[#131a2e] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-wrap justify-between gap-2 border-b border-slate-800 pb-4">
              {pipelineStages.map((stg) => (
                <button
                  key={stg.id}
                  onClick={() => setActivePipelineStage(stg.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activePipelineStage === stg.id
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'bg-[#0B0F19] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{stg.id}. {stg.name}</span>
                </button>
              ))}
            </div>

            {/* Stage Detail Card */}
            {(() => {
              const current = pipelineStages.find(s => s.id === activePipelineStage) || pipelineStages[0];
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Etapa {current.id} de 5</span>
                    <h3 className="text-xl font-black text-white">{current.name}</h3>
                    <p className="text-xs text-slate-400">{current.desc}</p>
                  </div>
                  <div className="bg-[#0B0F19] p-4 rounded-xl border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Oportunidades en Etapa</span>
                    <div className="text-2xl font-black text-white mt-1">{current.deals}</div>
                  </div>
                  <div className="bg-[#0B0F19] p-4 rounded-xl border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Monto Ponderado</span>
                    <div className="text-2xl font-black text-emerald-400 mt-1">{current.val}</div>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="text-center">
            <button
              onClick={handleStartTrial}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-7 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Ver pipeline completo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 07 — ACTIVIDADES */}
      <section className="py-16 px-6 bg-[#0E1322] border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
              El seguimiento deja de depender de la memoria
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              Todo lo que tenés que hacer, organizado.
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
              Tareas, reuniones, llamadas y próximos pasos vinculados directamente con tus clientes y oportunidades. Sabé qué hacer hoy y qué viene después.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400">01. Tareas Diarias</span>
              <h4 className="text-base font-bold text-white">Checklist de Venta</h4>
              <p className="text-xs text-slate-400">Lista priorizada por urgencia para que nada quede sin responder.</p>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400">02. Recordatorios</span>
              <h4 className="text-base font-bold text-white">Alertas Push & Email</h4>
              <p className="text-xs text-slate-400">Notificaciones antes de reuniones pactadas o cierres de contrato.</p>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400">03. Historial de Cierre</span>
              <h4 className="text-base font-bold text-white">Registro de Actividad</h4>
              <p className="text-xs text-slate-400">Auditoría completa de acciones realizadas por cada miembro del equipo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — AUTOMATIZACIONES */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
              Menos trabajo repetitivo
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              Automatizá lo que no necesita hacerse manualmente.
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
              Configurá procesos para que Clientum ejecute determinadas acciones cuando ocurre algo en tu negocio. Vos definís el proceso; Clientum se ocupa de ejecutarlo.
            </p>
          </div>

          {/* Workflow Step Sequence */}
          <div className="bg-[#131a2e] border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider text-center">
              Ejemplo Práctico de Automatización Comercial
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-center">
              <div className="bg-[#0B0F19] p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono">Paso 1</span>
                <div className="text-xs font-bold text-white mt-1">Nuevo lead por Web / Chat</div>
              </div>
              <ChevronRight className="w-5 h-5 text-emerald-400 mx-auto hidden sm:block" />
              <div className="bg-[#0B0F19] p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono">Paso 2</span>
                <div className="text-xs font-bold text-white mt-1">Crear Ficha y Asignar Vendedor</div>
              </div>
              <ChevronRight className="w-5 h-5 text-emerald-400 mx-auto hidden sm:block" />
              <div className="bg-[#0B0F19] p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono">Paso 3</span>
                <div className="text-xs font-bold text-white mt-1">Programar Tarea de Seguimiento</div>
              </div>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-400 font-medium">
                Menos tareas administrativas. Más tiempo para hacer crecer tu negocio.
              </p>
              <button
                onClick={handleStartTrial}
                className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Crear automatización</span>
                <Zap className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — FUNCIONALIDADES CORE (6 Categorías) */}
      <section className="py-16 px-6 bg-[#0E1322] border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-purple-400 font-mono text-xs uppercase tracking-widest font-bold">
              Todo lo necesario para trabajar mejor
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              Un CRM completo, sin la complejidad innecesaria.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-2">
              <Users className="w-6 h-6 text-emerald-400" />
              <h3 className="text-base font-bold text-white">👥 Clientes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Centralizá contactos, empresas, historial y relaciones comerciales.</p>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-2">
              <Briefcase className="w-6 h-6 text-blue-400" />
              <h3 className="text-base font-bold text-white">💼 Oportunidades</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Gestioná tu pipeline y acompañá cada oportunidad hasta el cierre.</p>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-2">
              <CheckCircle2 className="w-6 h-6 text-amber-400" />
              <h3 className="text-base font-bold text-white">✓ Actividades</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Organizá tareas, reuniones, llamadas y próximos pasos claros.</p>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-2">
              <Zap className="w-6 h-6 text-emerald-400" />
              <h3 className="text-base font-bold text-white">⚡ Automatizaciones</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Convertí procesos repetitivos en acciones automáticas al instante.</p>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-2">
              <BarChart2 className="w-6 h-6 text-indigo-400" />
              <h3 className="text-base font-bold text-white">📊 Reportes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Transformá la información de tu negocio en decisiones certeras.</p>
            </div>

            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-2">
              <Shield className="w-6 h-6 text-purple-400" />
              <h3 className="text-base font-bold text-white">👤 Equipos</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Trabajá con usuarios, roles y permisos según la estructura de tu empresa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — REPORTES & 11 — EQUIPOS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reportes */}
          <div className="bg-[#131a2e] border border-slate-800 p-8 rounded-2xl space-y-4">
            <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Información que te ayuda a decidir</span>
            <h3 className="text-2xl font-black text-white">Dejá de trabajar a ciegas.</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Conocé el estado de tu operación comercial y obtené una visión clara del rendimiento de tu equipo.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Oportunidades', 'Ventas', 'Actividades', 'Conversión', 'Rendimiento'].map(item => (
                <span key={item} className="px-3 py-1 bg-[#0B0F19] border border-slate-800 text-slate-300 rounded-lg font-mono text-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Equipos */}
          <div className="bg-[#131a2e] border border-slate-800 p-8 rounded-2xl space-y-4">
            <span className="text-xs font-mono text-blue-400 uppercase font-bold">Una plataforma para trabajar juntos</span>
            <h3 className="text-2xl font-black text-white">Todo el equipo, alineado.</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Asigná responsabilidades, compartí información y mantené el seguimiento de cada oportunidad dentro de una misma plataforma.
            </p>
            <div className="space-y-1.5 text-xs text-slate-300 font-medium pt-2">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Qué tiene que hacer cada persona</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Qué está pasando con cada cliente</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Qué oportunidad necesita atención urgente</div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 — PARA QUIÉN ES */}
      <section className="py-16 px-6 bg-[#0E1322] border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
              Diseñado para diferentes formas de trabajar
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              Clientum se adapta a tu negocio.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-[#131a2e] border border-slate-800 p-5 rounded-xl space-y-1">
              <h4 className="text-sm font-bold text-white">Equipos comerciales</h4>
              <p className="text-xs text-slate-400">Organizá oportunidades, clientes y seguimiento continuo.</p>
            </div>
            <div className="bg-[#131a2e] border border-slate-800 p-5 rounded-xl space-y-1">
              <h4 className="text-sm font-bold text-white">PyMEs</h4>
              <p className="text-xs text-slate-400">Centralizá la gestión comercial sin sumar complejidad técnica.</p>
            </div>
            <div className="bg-[#131a2e] border border-slate-800 p-5 rounded-xl space-y-1">
              <h4 className="text-sm font-bold text-white">Empresas de servicios</h4>
              <p className="text-xs text-slate-400">Mantené toda la relación con tus clientes perfectamente registrada.</p>
            </div>
            <div className="bg-[#131a2e] border border-slate-800 p-5 rounded-xl space-y-1">
              <h4 className="text-sm font-bold text-white">Agencias</h4>
              <p className="text-xs text-slate-400">Gestioná múltiples clientes, oportunidades y actividades a la vez.</p>
            </div>
            <div className="bg-[#131a2e] border border-slate-800 p-5 rounded-xl space-y-1">
              <h4 className="text-sm font-bold text-white">Equipos internos</h4>
              <p className="text-xs text-slate-400">Coordiná personas, tareas y responsabilidades operativas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 13 — INTEGRACIONES */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <div className="space-y-3">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
              Tus herramientas. Conectadas.
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              Clientum trabaja con las herramientas que ya usás.
            </h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center gap-2 px-5 py-3 bg-[#131a2e] border border-slate-800 rounded-xl text-xs font-bold text-white">
              <Mail className="w-4 h-4 text-red-400" /> Gmail
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-[#131a2e] border border-slate-800 rounded-xl text-xs font-bold text-white">
              <Calendar className="w-4 h-4 text-blue-400" /> Google Calendar
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-[#131a2e] border border-slate-800 rounded-xl text-xs font-bold text-white">
              <HardDrive className="w-4 h-4 text-amber-400" /> Google Drive
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-[#131a2e] border border-slate-800 rounded-xl text-xs font-bold text-white">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Google Sheets
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-[#131a2e] border border-slate-800 rounded-xl text-xs font-bold text-white">
              <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Business
            </div>
          </div>

          <p className="text-lg font-bold text-emerald-400 pt-2">
            "No cambies tu forma de trabajar. Conectala."
          </p>
        </div>
      </section>

      {/* 14 — CLIENTUMOS (Ecosistema) */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0E1322] to-[#111726] border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest font-bold">
              Más que un CRM
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              Clientum CRM es parte de un ecosistema más grande.
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
              <strong>ClientumOS</strong> conecta las herramientas, procesos y aplicaciones que tu empresa necesita para trabajar desde una plataforma integrada.
            </p>
          </div>

          {/* Ecosistema Flow Diagram */}
          <div className="bg-[#131a2e] border border-slate-800 p-8 rounded-2xl max-w-3xl mx-auto space-y-6">
            <div className="text-base font-black text-white font-mono uppercase tracking-widest">
              CLIENTUMOS (PLATAFORMA EMPRESARIAL)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-mono font-bold text-slate-300">
              <div className="bg-emerald-500/20 text-emerald-300 p-2.5 rounded-lg border border-emerald-500/30">Clientum CRM</div>
              <div className="bg-[#0B0F19] p-2.5 rounded-lg border border-slate-800">Operaciones</div>
              <div className="bg-[#0B0F19] p-2.5 rounded-lg border border-slate-800">Automatización</div>
              <div className="bg-[#0B0F19] p-2.5 rounded-lg border border-slate-800">Datos & BI</div>
              <div className="bg-[#0B0F19] p-2.5 rounded-lg border border-slate-800">Apps a Medida</div>
            </div>
          </div>

          <div>
            <button
              onClick={handleStartTrial}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-7 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Conocé ClientumOS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 16 — SEGURIDAD & ADMINISTRACIÓN */}
      <section className="py-16 px-6 bg-[#0E1322]">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-purple-400 font-mono text-xs uppercase tracking-widest font-bold">
              Tu información, bajo tu control
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              La información correcta para las personas correctas.
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Administrá usuarios, equipos, roles y permisos desde un mismo lugar.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs font-mono font-bold">
            {['Usuarios', 'Roles', 'Permisos', 'Equipos', 'Accesos', 'Administración'].map(item => (
              <div key={item} className="bg-[#131a2e] border border-slate-800 p-4 rounded-xl text-slate-200">
                <Lock className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
                {item}
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 font-medium">
            Tu empresa crece. Clientum también.
          </p>
        </div>
      </section>

      {/* 17 — PRICING */}
      <section className="py-20 px-6 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
              Empezá de la manera que mejor se adapte a tu equipo
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              Elegí tu plan.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">Starter</span>
                <h3 className="text-2xl font-black text-white">Ideal para Comenzar</h3>
                <p className="text-xs text-slate-400">Para emprendedores y pequeños equipos comerciales.</p>
                <div className="text-3xl font-black text-white">$29 <span className="text-xs text-slate-500 font-normal">USD / mes</span></div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Hasta 3 usuarios</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Fichas 360° de contactos</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Pipeline Kanban ilimitado</li>
                </ul>
              </div>
              <button onClick={handleStartTrial} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer">
                Comenzar Starter
              </button>
            </div>

            {/* Professional */}
            <div className="bg-[#162138] border-2 border-emerald-500 p-6 rounded-2xl space-y-6 flex flex-col justify-between relative shadow-xl shadow-emerald-500/10">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-slate-950 font-mono font-black text-[10px] uppercase px-3 py-1 rounded-full">
                Más Elegido
              </div>
              <div className="space-y-4 pt-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Professional</span>
                <h3 className="text-2xl font-black text-white">Equipos en Crecimiento</h3>
                <p className="text-xs text-slate-300">Para empresas con proceso comercial activo.</p>
                <div className="text-3xl font-black text-white">$79 <span className="text-xs text-slate-400 font-normal">USD / mes</span></div>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Hasta 10 usuarios</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Automatizaciones de venta</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Integración Google Workspace</li>
                </ul>
              </div>
              <button onClick={handleStartTrial} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-3 rounded-xl transition-all cursor-pointer">
                Comenzar Professional
              </button>
            </div>

            {/* Business */}
            <div className="bg-[#131a2e] border border-slate-800 p-6 rounded-2xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">Business</span>
                <h3 className="text-2xl font-black text-white">Organización Completa</h3>
                <p className="text-xs text-slate-400">Para firmas con múltiples áreas y requerimientos avanzados.</p>
                <div className="text-3xl font-black text-white">$149 <span className="text-xs text-slate-500 font-normal">USD / mes</span></div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Usuarios ilimitados</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Permisos granulares</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Soporte prioritario 24/7</li>
                </ul>
              </div>
              <button onClick={handleContactSales} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer">
                Hablar con Ventas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 18 — FAQ */}
      <section className="py-16 px-6 bg-[#0E1322] border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
              Preguntas Frecuentes
            </span>
            <h2 className="text-3xl font-display font-black text-white tracking-tight">
              Resolvemos tus dudas antes de empezar.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#131a2e] border border-slate-800 rounded-xl overflow-hidden transition-all">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-sm text-white flex items-center justify-between cursor-pointer hover:bg-white/5"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-emerald-400 transition-transform ${expandedFaq === idx ? 'rotate-90' : ''}`} />
                </button>
                {expandedFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 19 — CTA FINAL */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0B0F19] via-[#111726] to-[#162138] border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
            Ya tenés suficiente complejidad en tu negocio
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight">
            Tu CRM no debería agregar más.
          </h2>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-mono text-slate-300 font-bold">
            <span>Centralizá clientes.</span>
            <span>Organizá oportunidades.</span>
            <span>Automatizá procesos.</span>
            <span>Trabajá en equipo.</span>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleStartTrial}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm px-8 py-4 rounded-xl shadow-xl shadow-emerald-500/25 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Empezar con Clientum CRM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleContactSales}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-7 py-4 rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              Hablar con ventas
            </button>
          </div>
        </div>
      </section>

      {/* 20 — FOOTER */}
      <footer className="bg-[#080B12] border-t border-slate-800/80 px-6 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-3">
            <div className="font-mono font-black text-white text-base tracking-wider uppercase">CLIENTUM CRM</div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Plataforma integral de gestión comercial, oportunidades y automatización de clientes para PyMEs y empresas en crecimiento.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase text-[10px] tracking-widest font-mono">Productos</h5>
            <ul className="space-y-1">
              <li><button onClick={handleStartTrial} className="hover:text-white transition-colors">Clientum CRM</button></li>
              <li><button onClick={handleStartTrial} className="hover:text-white transition-colors">ClientumOS</button></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase text-[10px] tracking-widest font-mono">Soluciones</h5>
            <ul className="space-y-1">
              <li><button onClick={handleContactSales} className="hover:text-white transition-colors">Ventas & Pipeline</button></li>
              <li><button onClick={handleContactSales} className="hover:text-white transition-colors">Equipos Comerciales</button></li>
              <li><button onClick={handleContactSales} className="hover:text-white transition-colors">PyMEs</button></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase text-[10px] tracking-widest font-mono">Legal</h5>
            <ul className="space-y-1">
              <li><span className="hover:text-white cursor-pointer">Privacidad</span></li>
              <li><span className="hover:text-white cursor-pointer">Términos de Servicio</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
