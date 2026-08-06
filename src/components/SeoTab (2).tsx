import React from 'react';
import { Search, Globe, BarChart2 } from 'lucide-react';

export function SeoTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">SEO & Posicionamiento</h1>
        <p className="text-sm text-slate-500">Auditoría, palabras clave y optimización orgánica.</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Puntuación SEO General</h2>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">92 / 100</span>
        </div>
        <p className="text-sm text-slate-600">Tu sitio web está optimizado para los principales motores de búsqueda en LATAM.</p>
      </div>
    </div>
  );
}
