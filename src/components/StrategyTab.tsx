import React from 'react';
import { Target, Sparkles, Plus, ArrowRight } from 'lucide-react';

export function StrategyTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Estrategia de Campañas</h1>
          <p className="text-sm text-slate-500">Planificación táctica y canales de adquisición impulsados por IA.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Nueva Estrategia
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">01</div>
          <h3 className="text-lg font-semibold text-slate-900">Expansión LATAM B2B</h3>
          <p className="text-sm text-slate-500">Campaña dirigida a directores de tecnología en México, Colombia y Chile.</p>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs font-medium text-indigo-600">
            <span>Presupuesto: $25,000</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">02</div>
          <h3 className="text-lg font-semibold text-slate-900">Inbound SEO & Contenido</h3>
          <p className="text-sm text-slate-500">Estrategia de posicionamiento orgánico para keywords transaccionales de alto valor.</p>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs font-medium text-emerald-600">
            <span>Presupuesto: $12,000</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">03</div>
          <h3 className="text-lg font-semibold text-slate-900">Retargeting Omnicanal</h3>
          <p className="text-sm text-slate-500">Campañas personalizadas para carritos abandonados y leads en fase de decisión.</p>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs font-medium text-amber-600">
            <span>Presupuesto: $8,500</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
