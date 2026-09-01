import React, { useState } from 'react';
import { useCRM } from '@clientum/ui';
import { 
  CheckCircle2, 
  Circle, 
  Rocket, 
  MessageSquare, 
  Users, 
  Bot, 
  Store, 
  Briefcase, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  Check,
  Award,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tab: string;
  category: string;
  completed: boolean;
}

export const GettingStartedView: React.FC = () => {
  const { currentUser, setActiveTab, showToast } = useCRM();

  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'profile',
      title: 'Configurar perfil y marca de empresa',
      description: 'Establece el nombre comercial, logo y datos fiscales de tu organización.',
      icon: Briefcase,
      tab: 'settings',
      category: 'Configuración',
      completed: true,
    },
    {
      id: 'whatsapp',
      title: 'Vincular WhatsApp Business API',
      description: 'Conecta tu línea de WhatsApp para automatizar chats y enviar campañas masivas.',
      icon: MessageSquare,
      tab: 'whatsapp',
      category: 'Comunicación',
      completed: false,
    },
    {
      id: 'contacts',
      title: 'Importar base de contactos o leads',
      description: 'Sube un archivo CSV con tus prospectos o clientes actuales mediante nuestro CSV Studio.',
      icon: Users,
      tab: 'csvStudio',
      category: 'Datos',
      completed: false,
    },
    {
      id: 'ai',
      title: 'Configurar Asistente IA 24/7',
      description: 'Activa el bot de IA entrenado para calificar leads y responder consultas automáticamente.',
      icon: Bot,
      tab: 'aiAssistant',
      category: 'Inteligencia Artificial',
      completed: false,
    },
    {
      id: 'store',
      title: 'Generar Tienda Pública & Catálogo',
      description: 'Crea tu link público único para que tus clientes exploren servicios y compren online.',
      icon: Store,
      tab: 'publicStore',
      category: 'E-commerce',
      completed: false,
    },
    {
      id: 'deal',
      title: 'Crear tu primera Oportunidad Comercial',
      description: 'Registra una venta o negocio en el Pipeline Kanban para empezar a trackear ingresos.',
      icon: Rocket,
      tab: 'opportunities',
      category: 'Ventas',
      completed: true,
    },
  ]);

  const toggleStep = (id: string) => {
    setSteps(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s);
      const allDone = updated.every(s => s.completed);
      if (allDone) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        showToast('¡Felicitaciones! Has completado todos los pasos de inicialización.', 'success');
      }
      return updated;
    });
  };

  const completedCount = steps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#0d0f14] text-slate-100 space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/20 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Rocket className="w-3.5 h-3.5" />
            <span>Guía de Inicio Rápido • ClientumCRM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            ¡Hola, {currentUser.name}! 🚀
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Bienvenido a tu centro de comando comercial. Sigue esta checklist interactiva para configurar tu plataforma, conectar tus canales de venta y empezar a cerrar más negocios hoy mismo.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('publicStore')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/25 cursor-pointer"
            >
              <Store className="w-4 h-4" />
              <span>Configurar Tienda Pública</span>
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className="px-4 py-2.5 bg-[#161b26] hover:bg-[#1e2536] text-slate-200 border border-slate-700/80 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Vincular WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121620] border border-[#1e2330] rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Progreso de Onboarding</div>
            <div className="text-3xl font-extrabold text-white mt-2 flex items-baseline gap-2">
              {progressPercent}%
              <span className="text-sm font-medium text-slate-400">({completedCount} de {steps.length} completados)</span>
            </div>
          </div>
          <div className="w-full bg-[#1a2130] h-2.5 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-[#121620] border border-[#1e2330] rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Soporte y Asistencia</div>
            <div className="text-lg font-bold text-white mt-1">¿Necesitas ayuda experta?</div>
            <p className="text-xs text-slate-400 mt-1">Nuestros especialistas en automatización comercial están disponibles 24/7.</p>
          </div>
          <button 
            onClick={() => showToast('Abriendo chat con soporte técnico...', 'info')}
            className="mt-4 px-3 py-2 bg-[#1a2130] hover:bg-[#232d46] text-blue-400 text-xs font-semibold rounded-xl border border-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Contactar Soporte VIP</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-[#121620] border border-[#1e2330] rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Certificación Clientum</div>
            <div className="text-lg font-bold text-white mt-1">Academia CRM & Ventas</div>
            <p className="text-xs text-slate-400 mt-1">Obtén tu certificación oficial como experto en ventas B2B y automatización.</p>
          </div>
          <button 
            onClick={() => showToast('Módulos de academia disponibles próximamente', 'info')}
            className="mt-4 px-3 py-2 bg-[#1a2130] hover:bg-[#232d46] text-purple-400 text-xs font-semibold rounded-xl border border-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Ver Cursos & Tutoriales</span>
            <BookOpen className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Checklist Section */}
      <div className="bg-[#121620] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-400" />
              <span>Pasos Iniciales Recomendados</span>
            </h2>
            <p className="text-xs text-slate-400">Marca los elementos a medida que los completes o haz clic en "Ir al módulo" para realizarlos.</p>
          </div>
          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full text-xs font-semibold self-start sm:self-auto">
            {completedCount} / {steps.length} Listos
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border transition-all ${
                  step.completed 
                    ? 'bg-emerald-950/15 border-emerald-500/30' 
                    : 'bg-[#161b26] border-[#22293a] hover:border-blue-500/40'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                    title={step.completed ? 'Marcar como pendiente' : 'Marcar como completado'}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-500" />
                    )}
                  </button>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className={`font-bold text-sm sm:text-base ${step.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                        {step.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#1e2536] text-slate-400 border border-slate-700 font-medium">
                        {step.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => setActiveTab(step.tab as any)}
                    className="px-3.5 py-2 bg-[#1e2536] hover:bg-blue-600 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Ir al Módulo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
