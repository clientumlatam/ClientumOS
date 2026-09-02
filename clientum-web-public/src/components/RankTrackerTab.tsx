import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Sparkles,
  BarChart2,
  CheckCircle2
} from 'lucide-react';

export interface RankData {
  id: string;
  keyword: string;
  currentPosition: number;
  previousPosition: number;
  country: 'Argentina' | 'Chile' | 'México' | 'Colombia';
  landingPageUrl: string;
  searchEngine: string;
}

const INITIAL_RANKS: RankData[] = [
  { id: 'rk-1', keyword: 'crm para pymes argentina', currentPosition: 1, previousPosition: 3, country: 'Argentina', landingPageUrl: 'https://clientum.com.ar/crm-pymes', searchEngine: 'Google.com.ar' },
  { id: 'rk-2', keyword: 'chatbot whatsapp inteligencia artificial', currentPosition: 2, previousPosition: 2, country: 'Argentina', landingPageUrl: 'https://clientum.com.ar/chatbot-ia', searchEngine: 'Google.com.ar' },
  { id: 'rk-3', keyword: 'software de ventas b2b chile', currentPosition: 4, previousPosition: 7, country: 'Chile', landingPageUrl: 'https://clientum.com.ar/chile', searchEngine: 'Google.cl' },
  { id: 'rk-4', keyword: 'meddic crm ventas', currentPosition: 1, previousPosition: 1, country: 'México', landingPageUrl: 'https://clientum.com.ar/meddic', searchEngine: 'Google.com.mx' }
];

export function RankTrackerTab() {
  const [ranks, setRanks] = useState<RankData[]>(INITIAL_RANKS);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Monitoreo Posiciones Google
            </span>
            <span className="text-slate-400 text-xs">· Módulo 6.5 SEO & Contenidos</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-emerald-600" /> Rank Tracker LATAM
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Seguimiento de posiciones orgánicas diarias en buscadores de Argentina, Chile, México y Colombia.
          </p>
        </div>
      </div>

      {/* Ranks Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-extrabold text-sm text-slate-900">Keywords Monitoreadas en Tiempo Real</h3>
          <span className="text-xs font-semibold text-slate-400">{ranks.length} keywords rastreadas</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono text-[10px]">
                <th className="p-3.5 pl-6 font-bold">Palabra Clave</th>
                <th className="p-3.5 font-bold">País / Buscador</th>
                <th className="p-3.5 font-bold">Posición Actual</th>
                <th className="p-3.5 font-bold">Variación</th>
                <th className="p-3.5 pr-6 font-bold">URL Posicionada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {ranks.map((rk) => {
                const diff = rk.previousPosition - rk.currentPosition;
                return (
                  <tr key={rk.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-6 font-extrabold text-slate-900">{rk.keyword}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-700 block">{rk.country}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{rk.searchEngine}</span>
                    </td>
                    <td className="p-3.5 font-black text-emerald-600 font-mono text-sm">#{rk.currentPosition}</td>
                    <td className="p-3.5">
                      {diff > 0 ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                          <ArrowUpRight className="w-4 h-4" /> +{diff} pos
                        </span>
                      ) : diff < 0 ? (
                        <span className="text-rose-600 font-bold flex items-center gap-0.5">
                          <ArrowDownRight className="w-4 h-4" /> {diff} pos
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold flex items-center gap-0.5">
                          <Minus className="w-4 h-4" /> Sin cambio
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 pr-6 font-mono text-slate-500 truncate max-w-[200px]">{rk.landingPageUrl}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
