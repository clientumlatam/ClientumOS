import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Globe,
  Sparkles,
  Zap,
  Code,
  Gauge
} from 'lucide-react';

export interface AuditIssue {
  id: string;
  type: 'Critical' | 'Warning' | 'Passed';
  category: 'Meta Tags' | 'Velocidad' | 'Encabezados' | 'Imágenes';
  title: string;
  description: string;
  recommendation: string;
}

const INITIAL_ISSUES: AuditIssue[] = [
  {
    id: 'iss-1',
    type: 'Critical',
    category: 'Meta Tags',
    title: 'Meta Descripción ausente en 3 landing pages',
    description: 'Páginas `/soluciones/afip` y `/precios` no tienen metadescripción optimizada.',
    recommendation: 'Agrega una meta descripción de 150-160 caracteres con llamados a la acción.'
  },
  {
    id: 'iss-2',
    type: 'Warning',
    category: 'Velocidad',
    title: 'Imágenes sin compresión WebP en el hero banner',
    description: 'La imagen `hero_banner.jpg` pesa 2.4 MB reduciendo la velocidad de carga.',
    recommendation: 'Convierte la imagen a formato `.webp` o `.avif` y reduce el peso a menos de 150 KB.'
  },
  {
    id: 'iss-3',
    type: 'Passed',
    category: 'Encabezados',
    title: 'Estructura H1/H2 correctamente jerarquizada',
    description: 'Todas las páginas principales cuentan con exactamente un tag H1 único.',
    recommendation: 'Mantener la estructura jerárquica actual.'
  }
];

export function OnPageAuditTab() {
  const [domainUrl, setDomainUrl] = useState('https://clientum.com.ar');
  const [isAuditing, setIsAuditing] = useState(false);
  const [healthScore, setHealthScore] = useState(88);
  const [issues, setIssues] = useState<AuditIssue[]>(INITIAL_ISSUES);

  const handleRunAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);

    setTimeout(() => {
      setIsAuditing(false);
      setHealthScore(92);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Auditoría Técnica SEO
            </span>
            <span className="text-slate-400 text-xs">· Módulo 6.3 SEO & Contenidos</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-emerald-600" /> Auditoría On-Page & Core Web Vitals
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Escaneo en tiempo real de velocidad, etiquetado HTML, indexabilidad y metadatos del sitio web.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl">
          <Gauge className="w-5 h-5 text-emerald-600" />
          <span className="font-black text-emerald-800 text-sm">Salud SEO: {healthScore} / 100</span>
        </div>
      </div>

      {/* Audit Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <form onSubmit={handleRunAudit} className="flex gap-3">
          <div className="relative flex-1">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={domainUrl}
              onChange={(e) => setDomainUrl(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono font-bold focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            disabled={isAuditing}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Escaneando Sitio...' : 'Ejecutar Auditoría'}</span>
          </button>
        </form>
      </div>

      {/* Issues List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900">Hallazgos y Recomendaciones Técnicas</h3>

        <div className="space-y-3">
          {issues.map((iss) => (
            <div key={iss.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  iss.type === 'Critical' ? 'bg-rose-100 text-rose-800' :
                  iss.type === 'Warning' ? 'bg-amber-100 text-amber-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {iss.type === 'Critical' ? 'Critical Error' : iss.type === 'Warning' ? 'Advertencia' : 'Aprobado'}
                </span>

                <span className="text-[10px] font-mono text-slate-400 font-bold">{iss.category}</span>
              </div>

              <h4 className="font-extrabold text-xs text-slate-900">{iss.title}</h4>
              <p className="text-xs text-slate-600">{iss.description}</p>

              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700 font-medium">
                <strong>Recomendación Gemini:</strong> {iss.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
