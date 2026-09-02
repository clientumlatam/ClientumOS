import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  TrendingUp,
  Sliders,
  DollarSign,
  UserCheck,
  Target,
  HelpCircle,
  BarChart3
} from 'lucide-react';

export interface MeddicAssessment {
  metrics: number; // 0 to 100
  economicBuyer: number;
  decisionCriteria: number;
  decisionProcess: number;
  identifiedPain: number;
  champion: number;
}

export function MeddicTab() {
  const [dealName, setDealName] = useState('Servicios Yacimiento Neuquén S.A.');
  const [assessment, setAssessment] = useState<MeddicAssessment>({
    metrics: 85,
    economicBuyer: 70,
    decisionCriteria: 90,
    decisionProcess: 60,
    identifiedPain: 95,
    champion: 80,
  });

  const totalScore = Math.round(
    (assessment.metrics +
      assessment.economicBuyer +
      assessment.decisionCriteria +
      assessment.decisionProcess +
      assessment.identifiedPain +
      assessment.champion) / 6
  );

  const getStatusColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Calificación B2B MEDDIC
            </span>
            <span className="text-slate-400 text-xs">· Módulo 3.3 Prospección & Pipeline</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-indigo-600" /> Metodología & Lead Scoring MEDDIC
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Audita y cualifica ventas complejas B2B de alto valor para predecir probabilidades reales de cierre.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-4 py-2 rounded-2xl border font-black text-sm flex items-center gap-2 ${getStatusColor(totalScore)}`}>
            <Award className="w-5 h-5" />
            <span>Score Total MEDDIC: {totalScore} / 100</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sliders for 6 MEDDIC Factors */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" /> Evaluación de los 6 Pilares MEDDIC
            </h3>
            <span className="text-xs font-semibold text-slate-500">Evaluando: {dealName}</span>
          </div>

          <div className="space-y-5">
            {/* 1. Metrics */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-emerald-600" /> M - Metrics (Métricas ROI)
                </span>
                <span className="font-black text-indigo-600 font-mono">{assessment.metrics} pts</span>
              </div>
              <p className="text-[11px] text-slate-500">¿Se han cuantificado los beneficios económicos y el retorno de inversión para el cliente?</p>
              <input
                type="range"
                min="0"
                max="100"
                value={assessment.metrics}
                onChange={(e) => setAssessment({ ...assessment, metrics: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* 2. Economic Buyer */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600" /> E - Economic Buyer (Comprador Económico)
                </span>
                <span className="font-black text-indigo-600 font-mono">{assessment.economicBuyer} pts</span>
              </div>
              <p className="text-[11px] text-slate-500">¿Tienes acceso directo a la persona que firma el cheque y aprueba el presupuesto?</p>
              <input
                type="range"
                min="0"
                max="100"
                value={assessment.economicBuyer}
                onChange={(e) => setAssessment({ ...assessment, economicBuyer: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* 3. Decision Criteria */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-indigo-600" /> D - Decision Criteria (Criterios de Decisión)
                </span>
                <span className="font-black text-indigo-600 font-mono">{assessment.decisionCriteria} pts</span>
              </div>
              <p className="text-[11px] text-slate-500">¿Conoces exactamente los requerimientos técnicos, legales y financieros exigidos?</p>
              <input
                type="range"
                min="0"
                max="100"
                value={assessment.decisionCriteria}
                onChange={(e) => setAssessment({ ...assessment, decisionCriteria: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* 4. Decision Process */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-600" /> D - Decision Process (Proceso de Decisión)
                </span>
                <span className="font-black text-indigo-600 font-mono">{assessment.decisionProcess} pts</span>
              </div>
              <p className="text-[11px] text-slate-500">¿Está claro el mapa de aprobaciones internas, legales y compras?</p>
              <input
                type="range"
                min="0"
                max="100"
                value={assessment.decisionProcess}
                onChange={(e) => setAssessment({ ...assessment, decisionProcess: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* 5. Identified Pain */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" /> I - Identified Pain (Dolor Identificado)
                </span>
                <span className="font-black text-indigo-600 font-mono">{assessment.identifiedPain} pts</span>
              </div>
              <p className="text-[11px] text-slate-500">¿El problema actual les cuesta dinero real o riesgo operativo inminente?</p>
              <input
                type="range"
                min="0"
                max="100"
                value={assessment.identifiedPain}
                onChange={(e) => setAssessment({ ...assessment, identifiedPain: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* 6. Champion */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-purple-600" /> C - Champion (Aliado Interno)
                </span>
                <span className="font-black text-indigo-600 font-mono">{assessment.champion} pts</span>
              </div>
              <p className="text-[11px] text-slate-500">¿Hay alguien dentro de la empresa empujando activamente tu solución?</p>
              <input
                type="range"
                min="0"
                max="100"
                value={assessment.champion}
                onChange={(e) => setAssessment({ ...assessment, champion: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: AI Recommendations & Gap Analysis */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-black text-sm uppercase tracking-wider">Recomendación Gemini IA</h3>
            </div>

            {assessment.decisionProcess < 70 && (
              <div className="bg-rose-950/60 border border-rose-800/80 p-3.5 rounded-xl text-xs space-y-1">
                <p className="font-bold text-rose-300 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 shrink-0" /> Riesgo de Demora en Cierre
                </p>
                <p className="text-slate-300">
                  El "Proceso de Decisión" ({assessment.decisionProcess} pts) es bajo. Agenda una reunión de alineación con el área jurídica y compras antes de enviar el contrato definitivo.
                </p>
              </div>
            )}

            {assessment.economicBuyer < 80 && (
              <div className="bg-amber-950/60 border border-amber-800/80 p-3.5 rounded-xl text-xs space-y-1">
                <p className="font-bold text-amber-300 flex items-center gap-1">
                  <HelpCircle className="w-4 h-4 shrink-0" /> Falta Acceso al Decision Maker
                </p>
                <p className="text-slate-300">
                  Asegura una llamada de 15 min con el Gerente General para validar el presupuesto asignado.
                </p>
              </div>
            )}

            <div className="bg-slate-800 p-4 rounded-xl space-y-2 text-xs">
              <p className="font-bold text-emerald-400">Puntos Fuertes Detectados:</p>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Dolor de Negocio bien documentado ({assessment.identifiedPain} pts)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Criterios Técnicos validados ({assessment.decisionCriteria} pts)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
