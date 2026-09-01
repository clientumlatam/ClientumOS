import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  TrendingUp,
  BarChart2,
  DollarSign,
  Globe,
  Plus,
  Copy,
  Check,
  CheckCircle2,
  Filter,
  ArrowUpDown,
  Download
} from 'lucide-react';

export interface KeywordData {
  id: string;
  keyword: string;
  volume: number;
  difficulty: 'Fácil' | 'Media' | 'Dificil';
  cpcUsd: number;
  intent: 'Comercial' | 'Transaccional' | 'Informativo';
  trend: string;
  isSaved?: boolean;
}

const INITIAL_KEYWORDS: KeywordData[] = [
  { id: 'kw-1', keyword: 'crm para pymes argentina', volume: 2400, difficulty: 'Media', cpcUsd: 1.85, intent: 'Transaccional', trend: '+28%' },
  { id: 'kw-2', keyword: 'chatbot whatsapp inteligencia artificial', volume: 5400, difficulty: 'Media', cpcUsd: 2.40, intent: 'Comercial', trend: '+45%' },
  { id: 'kw-3', keyword: 'facturacion electronica afip crm', volume: 1800, difficulty: 'Fácil', cpcUsd: 1.10, intent: 'Transaccional', trend: '+15%' },
  { id: 'kw-4', keyword: 'software de ventas b2b mexico', volume: 3200, difficulty: 'Dificil', cpcUsd: 3.20, intent: 'Comercial', trend: '+32%' },
  { id: 'kw-5', keyword: 'meddic metodologia ventas', volume: 950, difficulty: 'Fácil', cpcUsd: 0.90, intent: 'Informativo', trend: '+60%' }
];

export function KeywordResearchTab() {
  const [keywords, setKeywords] = useState<KeywordData[]>(INITIAL_KEYWORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState('Argentina');
  const [isSearching, setIsSearching] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  const handleSearchKeywords = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    setIsSearching(true);

    setTimeout(() => {
      const generated: KeywordData[] = [
        { id: `kw-${Date.now()}-1`, keyword: `${searchQuery} precios`, volume: 1200, difficulty: 'Fácil', cpcUsd: 1.40, intent: 'Transaccional', trend: '+20%' },
        { id: `kw-${Date.now()}-2`, keyword: `mejor ${searchQuery} para pymes`, volume: 2800, difficulty: 'Media', cpcUsd: 2.10, intent: 'Comercial', trend: '+35%' },
        { id: `kw-${Date.now()}-3`, keyword: `${searchQuery} opiniones`, volume: 900, difficulty: 'Fácil', cpcUsd: 0.80, intent: 'Informativo', trend: '+12%' }
      ];

      setKeywords([...generated, ...keywords]);
      setIsSearching(false);
    }, 1000);
  };

  const toggleSaveKeyword = (id: string) => {
    setKeywords(keywords.map(k => k.id === id ? { ...k, isSaved: !k.isSaved } : k));
    setSaveMsg('¡Bóveda de Keywords actualizada!');
    setTimeout(() => setSaveMsg(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              SEO & Semrush Data LATAM
            </span>
            <span className="text-slate-400 text-xs">· Módulo 6.1 SEO & Contenidos</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Search className="w-7 h-7 text-emerald-600" /> Research de Palabras Clave B2B
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Analiza intenciones de búsqueda, volúmenes mensuales y CPC estimado en mercados objetivo de Latinoamérica.
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <form onSubmit={handleSearchKeywords} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ingresa un término Semilla (ej: 'CRM ventas', 'Chatbot WhatsApp')..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-hidden"
            />
          </div>

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-hidden"
          >
            <option value="Argentina">🇦🇷 Argentina</option>
            <option value="Chile">🇨🇱 Chile</option>
            <option value="México">🇲🇽 México</option>
            <option value="Colombia">🇨🇴 Colombia</option>
          </select>

          <button
            type="submit"
            disabled={isSearching}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSearching ? 'Analizando...' : 'Buscar Keywords'}</span>
          </button>
        </form>
      </div>

      {saveMsg && (
        <div className="bg-emerald-500 text-white p-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveMsg}</span>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-extrabold text-sm text-slate-900">Resultados de Investigación</h3>
          <span className="text-xs font-semibold text-slate-400">{keywords.length} keywords analizadas</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono text-[10px]">
                <th className="p-3.5 pl-6 font-bold">Palabra Clave</th>
                <th className="p-3.5 font-bold">Volumen Mensual</th>
                <th className="p-3.5 font-bold">Dificultad</th>
                <th className="p-3.5 font-bold">CPC Estimado</th>
                <th className="p-3.5 font-bold">Intención</th>
                <th className="p-3.5 font-bold">Tendencia</th>
                <th className="p-3.5 pr-6 font-bold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {keywords.map((kw) => (
                <tr key={kw.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 pl-6 font-extrabold text-slate-900">{kw.keyword}</td>
                  <td className="p-3.5 font-bold font-mono text-slate-800">{kw.volume.toLocaleString()} /mes</td>
                  <td className="p-3.5">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      kw.difficulty === 'Fácil' ? 'bg-emerald-100 text-emerald-800' :
                      kw.difficulty === 'Media' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {kw.difficulty}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold font-mono text-indigo-600">${kw.cpcUsd.toFixed(2)} USD</td>
                  <td className="p-3.5 text-slate-600 font-semibold">{kw.intent}</td>
                  <td className="p-3.5 font-bold text-emerald-600 font-mono">{kw.trend}</td>
                  <td className="p-3.5 pr-6 text-right">
                    <button
                      onClick={() => toggleSaveKeyword(kw.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        kw.isSaved ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {kw.isSaved ? 'Guardada ✓' : '+ Bóveda'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
