import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, X, CheckCircle2, Rocket, Briefcase, MessageSquare, Bot, Settings } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TourStep {
  title: string;
  description: string;
  icon: React.ElementType;
  targetId?: string;
  category: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: '¡Bienvenido a Clientum CRM & Suite!',
    description: 'Cada cuenta registrada representa tu empresa y espacio de trabajo B2B independiente. Este recorrido guiado te mostrará cómo potenciar tus ventas y automatizar la operación.',
    icon: Rocket,
    category: 'Introducción'
  },
  {
    title: 'Pipeline Comercial & Kanban',
    description: 'Gestiona tus oportunidades en tiempo real con arrastre intuitivo entre etapas (Nuevo Lead, Contactado, Propuesta, Ganado), calificación MEDDIC y cotizaciones automáticas.',
    icon: Briefcase,
    category: 'Ventas'
  },
  {
    title: 'WhatsApp Business & Baileys Gateway',
    description: 'Atiende clientes mediante la integración multi-device Baileys o API oficial de Meta. Filtra por rangos de fecha, exporta a PDF y mantén el auto-scroll inteligente.',
    icon: MessageSquare,
    category: 'Comunicación'
  },
  {
    title: 'Santi IA & Copilot Comercial',
    description: 'Aprovecha la inteligencia de Google Gemini para redactar copys persuasivos, resumir tratos, generar estrategias GTM y responder consultas automáticas 24/7.',
    icon: Bot,
    category: 'Inteligencia Artificial'
  },
  {
    title: 'Configuración & Facturación AFIP',
    description: 'Emite comprobantes electrónicos (A, B, C), configura credenciales SMTP para correos transaccionales automáticos y ajusta tu CMDB y parámetros de empresa.',
    icon: Settings,
    category: 'Operaciones'
  }
];

interface GettingStartedTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const GettingStartedTour: React.FC<GettingStartedTourProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];
  const Icon = step.icon;
  const isLast = currentStep === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (onComplete) onComplete();
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-white p-6 sm:p-8"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              Paso {currentStep + 1} de {TOUR_STEPS.length}
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">
              {step.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Cerrar Tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-600/20 to-emerald-600/20 border border-blue-500/30 text-emerald-400 shrink-0">
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500 bg-slate-800/30'
                : 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Saltar Tour
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/20 transition-all cursor-pointer"
            >
              <span>{isLast ? '¡Comenzar a Usar!' : 'Siguiente'}</span>
              {isLast ? <CheckCircle2 className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
