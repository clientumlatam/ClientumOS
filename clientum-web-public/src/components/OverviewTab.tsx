import React, { useState, useEffect } from 'react';
import {
  TrendingUp, Users, DollarSign, Target, ArrowUpRight, BarChart3, Globe, Zap,
  Activity, ShieldCheck, RefreshCw, CheckCircle2, Server, Cpu, Sparkles,
  Database, Search, Bot, Clock, Wifi, AlertTriangle, FileDown, Loader2,
  Briefcase, Megaphone, Wrench, ChevronRight, ExternalLink, HelpCircle, BookOpen,
  GraduationCap, Mail, Radio, Compass, Kanban, Receipt, FileText, Send, MapPin,
  Layers, Key, Calendar, Award, CheckSquare, Layers3, Play, Download
} from 'lucide-react';
import { generateClientPdfReport } from '../utils/generatePdfReport';
import { PdfExportButton } from './common/PdfExportButton';
import { PrintReportButton } from './PrintReportButton';
import { ClientumSuiteHub } from './ClientumSuiteHub';
import { DASHBOARD_CATEGORIES } from './navigationData';
import { PublicFeatureModal } from './PublicFeatureModal';
import { ActiveTab } from '../types';

interface ServiceStatusItem {
  id: string;
  name: string;
  category: string;
  status: 'operational' | 'degraded' | 'down';
  latencyMs: number;
  keySource: string;
  detail: string;
}

interface ServicesStatusData {
  timestamp: string;
  overallStatus: string;
  avgLatencyMs: number;
  totalCheckTimeMs: number;
  services: ServiceStatusItem[];
}

interface OverviewTabProps {
  currency: string;
  region: string;
  onNavigate?: (tab: any) => void;
}

export function OverviewTab({ currency, region, onNavigate }: OverviewTabProps) {
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';

  const [servicesData, setServicesData] = useState<ServicesStatusData | null>(null);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [exportingPdf, setExportingPdf] = useState<boolean>(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'crm' | 'marketing' | 'seo' | 'tools'>('all');
  const [isPublicModalOpen, setIsPublicModalOpen] = useState<boolean>(false);
  const [publicModalSection, setPublicModalSection] = useState<string>('soluciones');

  const handleDownloadPdf = async () => {
    setExportingPdf(true);
    try {
      await generateClientPdfReport({
        title: `Reporte Ejecutivo de Desempeño (${region})`,
        clientName: 'Cliente Corporativo Clientum',
        region,
        currencySymbol,
        metrics: [
          { label: 'Ingresos Totales', value: `${currencySymbol}142,850 USD`, change: '+18.4% vs mes anterior' },
          { label: 'Prospectos Activos', value: '1,248', change: '+12.2% nuevos leads' },
          { label: 'ROI Promedio', value: '342%', change: '+5.1% eficiencia' },
          { label: 'Campañas Activas', value: '24', change: 'Optimizadas con IA' },
          { label: 'Ingresos Atribuibles', value: `${currencySymbol}438,000 USD`, change: '+34.2% cierres' },
          { label: 'Costo por Lead', value: `${currencySymbol}14.50 USD`, change: '-14% reducción' }
        ],
        services: servicesData?.services.map(s => ({
          name: s.name,
          category: s.category,
          status: s.status === 'operational' ? 'Operativo' : s.status,
          latencyMs: s.latencyMs
        }))
      });
    } catch (err) {
      console.error('Error al generar PDF:', err);
    } finally {
      setExportingPdf(false);
    }
  };

  const fetchServicesStatus = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/services/status');
      if (res.ok) {
        const data = await res.json();
        setServicesData(data);
      }
    } catch (err) {
      console.error("Error al obtener estado de servicios API:", err);
    } finally {
      setLoadingServices(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchServicesStatus();
    const interval = setInterval(fetchServicesStatus, 45000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: string) => {
    if (category.includes('IA')) return Sparkles;
    if (category.includes('Prospección') || category.includes('Geolocalización')) return Search;
    if (category.includes('Infraestructura')) return Database;
    return Server;
  };

  const filteredCategories = activeCategoryTab === 'all'
    ? DASHBOARD_CATEGORIES
    : DASHBOARD_CATEGORIES.filter((c) => c.key === activeCategoryTab);

  const handleNavigate = (tab: ActiveTab) => {
    if (onNavigate) {
      onNavigate(tab);
    } else {
      window.dispatchEvent(new CustomEvent('navigate-tab', { detail: { tab } }));
    }
  };

  const handleOpenPublicSection = (section: string) => {
    setPublicModalSection(section);
    setIsPublicModalOpen(true);
  };

  return (
    <div id="overview-report-content" className="space-y-6">
      {/* Overview Top Bar Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Panel Ejecutivo Unificado ({region})</h1>
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-600" /> Suite B2B 2026
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full flex items-center gap-1">
              <Receipt className="w-3 h-3 text-emerald-600" /> AFIP Ready
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Centro de comando consolidado: CRM, Prospección Maps IA, Embudos MEDDIC, Facturación AFIP, Agentes WhatsApp y SEO.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => handleNavigate('geolocated_prospecting')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Radar Maps IA</span>
          </button>

          <button
            onClick={() => handleOpenPublicSection('soluciones')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Ver Catálogo</span>
          </button>

          <PdfExportButton
            targetId="overview-report-content"
            title={`Reporte Ejecutivo de Desempeño (${region})`}
            filename={`Reporte_Ejecutivo_Clientum_${region}.pdf`}
            label="Descargar PDF"
            variant="primary"
            branding={{
              companyName: 'Clientum B2B Intelligence',
              primaryColor: '#1A3461'
            }}
          />

          <PrintReportButton label="Imprimir" />
        </div>
      </div>

      {/* ── 8 KEY PERFORMANCE METRICS GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Ingresos Totales</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{currencySymbol}142,850 USD</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Prospectos Activos</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">1,248 Leads</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+12.2% nuevos leads</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">MEDDIC Qualified</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">84.5% Score</div>
          <div className="flex items-center gap-1 text-xs text-purple-600 mt-2 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Alta intención de compra</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Facturación AFIP (ARS)</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">$12,450,000</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>18 Comprobantes CAE</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Agentes IA Activos</span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <Bot className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">4 Agentes Live</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>98.4% tasa de respuesta</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Rankings SEO Top 10</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">142 Keywords</div>
          <div className="flex items-center gap-1 text-xs text-amber-600 mt-2 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+28 pos. este mes</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-sky-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Email Outreach</span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">24 Campañas</div>
          <div className="flex items-center gap-1 text-xs text-sky-600 mt-2 font-bold">
            <span>38.4% Tasa de Apertura</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-rose-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">ROI Marketing Global</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">342% ROI</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+5.1% eficiencia</span>
          </div>
        </div>
      </div>

      {/* ── LIVE INTERACTIVE SUB-WIDGETS PANELS ("TODO EN UN SOLO DASHBOARD") ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* WIDGET 1: RADAR MAPS & PROSPECCIÓN GEOLOCALIZADA */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Prospección Maps & Inteligencia B2B IA</h3>
                  <p className="text-xs text-slate-500">Radar territorial activo en Buenos Aires, Bogotá, México DF, Santiago</p>
                </div>
              </div>
              <button
                onClick={() => handleNavigate('geolocated_prospecting')}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Abrir Mapa Completo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mini Map Preview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {[
                { name: 'TechCorp LATAM', zone: 'Palermo, CABA', rating: '4.9 ★', fit: '95% Fit', status: 'Verificado Google' },
                { name: 'Logística Express S.A.', zone: 'Zona Norte, B.A.', rating: '4.8 ★', fit: '88% Fit', status: 'FODA Generado' },
                { name: 'Distribuidora Andina', zone: 'Santiago Centro', rating: '4.7 ★', fit: '92% Fit', status: 'Enviado a CRM' },
              ].map((lead, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 hover:border-indigo-300 transition-all">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-900 truncate">{lead.name}</span>
                    <span className="text-amber-600 font-bold">{lead.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-2">
                    <MapPin className="w-3 h-3 text-indigo-500 shrink-0" />
                    <span>{lead.zone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded">
                      {lead.fit}
                    </span>
                    <span className="text-[10px] text-indigo-600 font-medium">{lead.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-indigo-950 text-indigo-100 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 animate-pulse" />
                <span>Diagnosticador Gemini IA listo: Extrae ejecutivos, WhatsApp directo y FODA institucional.</span>
              </div>
              <button
                onClick={() => handleNavigate('geolocated_prospecting')}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded text-[11px] whitespace-nowrap cursor-pointer"
              >
                Prospectar Ahora
              </button>
            </div>
          </div>
        </div>

        {/* WIDGET 2: PIPELINE CRM & SCORING MEDDIC */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Kanban className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Pipeline & MEDDIC</h3>
                  <p className="text-xs text-slate-500">Estado de oportunidades activas</p>
                </div>
              </div>
              <button
                onClick={() => handleNavigate('crm_kanban')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
              >
                <span>Kanban</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              {[
                { stage: 'Prospectos Calificados', count: 42, amount: '$58,000 USD', pct: 85, color: 'bg-blue-500' },
                { stage: 'Evaluación MEDDIC', count: 18, amount: '$34,500 USD', pct: 60, color: 'bg-purple-500' },
                { stage: 'Propuestas Presentadas', count: 12, amount: '$29,000 USD', pct: 40, color: 'bg-amber-500' },
                { stage: 'Cierres Ganados', count: 8, amount: '$21,350 USD', pct: 25, color: 'bg-emerald-500' },
              ].map((stg, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-800">
                    <span>{stg.stage} ({stg.count})</span>
                    <span className="text-slate-600">{stg.amount}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${stg.color} rounded-full`} style={{ width: `${stg.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => handleNavigate('meddic')}
              className="text-purple-600 font-bold hover:text-purple-800 flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ver Criterios MEDDIC</span>
            </button>
            <span className="text-slate-400 font-mono text-[11px]">Win-Rate: 34.2%</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* WIDGET 3: FACTURACIÓN AFIP & GESTIÓN VSRM */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Facturación AFIP & VSCrm</h3>
                  <p className="text-xs text-slate-500">Gestión contable e impuestos ARS</p>
                </div>
              </div>
              <button
                onClick={() => handleNavigate('vscrm_afip')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-0.5 cursor-pointer"
              >
                <span>AFIP Portal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5 mb-4">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                <div>
                  <span className="block font-bold text-slate-800">Facturas Emitidas (Mes)</span>
                  <span className="text-[10px] text-slate-500">Comprobantes A/B con CAE</span>
                </div>
                <span className="text-sm font-black text-emerald-600">$12.45M ARS</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                <div>
                  <span className="block font-bold text-slate-800">Proyectos Activos</span>
                  <span className="text-[10px] text-slate-500">Seguimiento de entregables</span>
                </div>
                <span className="text-sm font-black text-indigo-600">14 Proyectos</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                <div>
                  <span className="block font-bold text-slate-800">Horas Registradas</span>
                  <span className="text-[10px] text-slate-500">Time tracking de equipo</span>
                </div>
                <span className="text-sm font-black text-slate-900">324.5 hs</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => handleNavigate('vscrm_invoices')}
              className="text-slate-600 font-bold hover:text-slate-900 cursor-pointer"
            >
              Facturas
            </button>
            <button
              onClick={() => handleNavigate('vscrm_expenses')}
              className="text-slate-600 font-bold hover:text-slate-900 cursor-pointer"
            >
              Gastos
            </button>
            <button
              onClick={() => handleNavigate('vscrm_projects')}
              className="text-emerald-600 font-bold hover:text-emerald-800 cursor-pointer"
            >
              Proyectos
            </button>
          </div>
        </div>

        {/* WIDGET 4: AGENTES IA & WHATSAPP OUTBOUND 24/7 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Agentes IA & WhatsApp</h3>
                  <p className="text-xs text-slate-500">Atención 24/7 y secuencias SDR</p>
                </div>
              </div>
              <button
                onClick={() => handleNavigate('outreach_agent')}
                className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-0.5 cursor-pointer"
              >
                <span>SDR Agent</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {[
                { name: 'SDR Outbound IA', status: 'En vivo', detail: '34 prospectos contactados hoy', icon: Send, color: 'text-emerald-500' },
                { name: 'Bot WhatsApp Ventas', status: 'En vivo', detail: '18 conversaciones activas', icon: Bot, color: 'text-teal-500' },
                { name: 'Copywriter Gemini 2.5', status: 'Listo', detail: 'Generación de propuestas', icon: Sparkles, color: 'text-purple-500' },
              ].map((agent, i) => {
                const AgentIcon = agent.icon;
                return (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                      <AgentIcon className={`w-4 h-4 ${agent.color}`} />
                      <div>
                        <span className="font-bold text-slate-800 block">{agent.name}</span>
                        <span className="text-[10px] text-slate-500">{agent.detail}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                      {agent.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => handleNavigate('ai_hub')}
              className="text-teal-600 font-bold hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Configurar Chatbot</span>
            </button>
            <button
              onClick={() => handleNavigate('chat')}
              className="text-purple-600 font-bold hover:text-purple-800 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini Chat</span>
            </button>
          </div>
        </div>

        {/* WIDGET 5: SUITE SEO, KEYWORDS & RANK TRACKER */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">SEO & Posicionamiento</h3>
                  <p className="text-xs text-slate-500">Rankings y auditoría On-Page</p>
                </div>
              </div>
              <button
                onClick={() => handleNavigate('rank_tracker')}
                className="text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-0.5 cursor-pointer"
              >
                <span>Tracker</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between p-2 bg-amber-50/60 rounded-xl text-xs border border-amber-200/60">
                <span className="font-bold text-amber-900">Score Auditoría On-Page</span>
                <span className="text-sm font-black text-amber-700">92 / 100</span>
              </div>

              {[
                { kw: 'software crm latam', pos: '#2', change: '+1' },
                { kw: 'prospeccion b2b argentina', pos: '#1', change: '+3' },
                { kw: 'facturacion afip api', pos: '#4', change: '+2' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-xl text-xs">
                  <span className="font-medium text-slate-800 truncate">{item.kw}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{item.pos}</span>
                    <span className="text-[10px] text-emerald-600 font-bold">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => handleNavigate('keyword_research')}
              className="text-slate-600 font-bold hover:text-slate-900 cursor-pointer"
            >
              Keywords
            </button>
            <button
              onClick={() => handleNavigate('on_page_audit')}
              className="text-slate-600 font-bold hover:text-slate-900 cursor-pointer"
            >
              On-Page
            </button>
            <button
              onClick={() => handleNavigate('content_calendar')}
              className="text-amber-600 font-bold hover:text-amber-800 cursor-pointer"
            >
              Calendario
            </button>
          </div>
        </div>

      </div>

      {/* ── INTERACTIVE DYNAMIC HUB: ALL 24 TOOLS & MODULES ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
              <h2 className="text-lg font-bold text-slate-900">Catálogo Completo de Módulos (24)</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Acceso directo e interactivo a todas las herramientas integradas en la plataforma Clientum.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto max-w-full">
            {[
              { key: 'all', label: 'Todos (24)' },
              { key: 'crm', label: 'CRM & Ventas (6)' },
              { key: 'marketing', label: 'Marketing (6)' },
              { key: 'seo', label: 'SEO (6)' },
              { key: 'tools', label: 'Herramientas (6)' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategoryTab(tab.key as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategoryTab === tab.key
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-5">
          {filteredCategories.map((category) => (
            <div
              key={category.key}
              className="flex flex-col justify-between bg-slate-50/70 rounded-xl p-4 border border-slate-200/80 hover:border-indigo-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${category.dotColor}`} />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                      {category.title}
                    </h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${category.badgeColor}`}>
                    {category.badge.split('&')[0]}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-3 leading-snug">{category.description}</p>

                <div className="space-y-1.5">
                  {category.items.slice(0, 6).map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => item.tab && handleNavigate(item.tab)}
                        className="w-full text-left p-2 rounded-lg bg-white hover:bg-indigo-50/70 border border-slate-100 hover:border-indigo-200 transition-all flex items-center gap-2.5 cursor-pointer shadow-2xs group/item"
                      >
                        <div className={`p-1.5 rounded-md shrink-0 ${item.color}`}>
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-semibold text-slate-800 group-hover/item:text-indigo-600 truncate block">
                            {item.title}
                          </span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover/item:text-indigo-600 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <button
                  onClick={() => handleOpenPublicSection(category.key === 'crm' ? 'soluciones' : category.key === 'marketing' ? 'recursos' : 'precios')}
                  className="text-slate-500 hover:text-indigo-600 font-medium cursor-pointer"
                >
                  Info Pública
                </button>
                <button
                  onClick={() => {
                    if (category.items[0]?.tab) handleNavigate(category.items[0].tab);
                  }}
                  className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Abrir Módulo</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plataforma Clientum CRM Suite Hub Full */}
      <ClientumSuiteHub onNavigate={handleNavigate} />

      {/* ── SHARED API & AI SERVICES STATUS & LATENCY WIDGET ── */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Estado & Latencia de Servicios API, IA e Infraestructura</h2>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[11px] font-semibold">
                Sin API Key requerida
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Monitoreo en tiempo real de los servicios compartidos precargados en el servidor Clientum.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="text-right hidden sm:block">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-medium">Latencia Promedio</span>
              <span className="text-sm font-bold text-emerald-400">
                {servicesData ? `${servicesData.avgLatencyMs} ms` : 'calculando...'}
              </span>
            </div>
            <button
              onClick={fetchServicesStatus}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/80 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-all border border-slate-600/80 cursor-pointer disabled:opacity-50"
              title="Probar latencia en vivo"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Verificando...' : 'Probar Latencia'}</span>
            </button>
          </div>
        </div>

        {/* Global Banner Notice */}
        <div className="mb-5 p-3.5 bg-emerald-950/40 border border-emerald-800/50 rounded-xl flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-emerald-200">
              <strong className="text-white font-semibold">Servidor Clientum Activo:</strong> Todos los endpoints de IA Gemini, Google Maps, Scrapers, AFIP y Neon DB utilizan claves globales centralizadas.
            </span>
          </div>
          <span className="hidden lg:inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <Wifi className="w-3 h-3 text-emerald-400" /> 100% Conectado
          </span>
        </div>

        {/* Services Status Cards */}
        {loadingServices ? (
          <div className="py-8 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
            <span>Probando latencia y estado de los servicios en el servidor...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {servicesData?.services.map((srv) => {
              const IconComponent = getCategoryIcon(srv.category);
              return (
                <div
                  key={srv.id}
                  className="bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 rounded-xl p-4 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-white">{srv.name}</h3>
                          <span className="text-[10px] text-slate-400">{srv.category}</span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-semibold shrink-0">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Operativo
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {srv.detail}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-700/50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1 font-mono text-[10px]">
                      <ShieldCheck className="w-3 h-3 text-indigo-400" /> {srv.keySource}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900/80 rounded font-mono font-semibold text-emerald-400 text-[10px]">
                      <Clock className="w-2.5 h-2.5 text-slate-400" /> {srv.latencyMs} ms
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Public Feature Modal Linkage */}
      <PublicFeatureModal
        isOpen={isPublicModalOpen}
        onClose={() => setIsPublicModalOpen(false)}
        initialTab={publicModalSection}
        onNavigateTab={handleNavigate}
      />
    </div>
  );
}

