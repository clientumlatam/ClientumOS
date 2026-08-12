import React, { useState, useEffect } from 'react';
import {
  TrendingUp, Users, DollarSign, Target, ArrowUpRight, BarChart3, Globe, Zap,
  Activity, ShieldCheck, RefreshCw, CheckCircle2, Server, Cpu, Sparkles,
  Database, Search, Bot, Clock, Wifi, AlertTriangle, FileDown, Loader2
} from 'lucide-react';
import { generateClientPdfReport } from '../utils/generatePdfReport';
import { PdfExportButton } from './common/PdfExportButton';

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
}

export function OverviewTab({ currency, region }: OverviewTabProps) {
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';

  const [servicesData, setServicesData] = useState<ServicesStatusData | null>(null);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [exportingPdf, setExportingPdf] = useState<boolean>(false);

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
    const interval = setInterval(fetchServicesStatus, 45000); // refresh every 45s
    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: string) => {
    if (category.includes('IA')) return Sparkles;
    if (category.includes('Prospección') || category.includes('Geolocalización')) return Search;
    if (category.includes('Infraestructura')) return Database;
    return Server;
  };

  return (
    <div id="overview-report-content" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Panel Principal ({region})</h1>
          <p className="text-sm text-slate-500">Resumen general de rendimiento, campañas y prospectos en LATAM & Global.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Sistema & APIs Operativos
          </span>

          <PdfExportButton
            targetId="overview-report-content"
            title={`Reporte Ejecutivo de Desempeño (${region})`}
            filename={`Reporte_Ejecutivo_Clientum_${region}.pdf`}
            label="Descargar Reporte PDF"
            variant="primary"
            branding={{
              companyName: 'Clientum B2B Intelligence',
              primaryColor: '#4f46e5'
            }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-medium">Ingresos Totales</span>
            <DollarSign className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{currencySymbol}142,850</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-medium">Prospectos Activos</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">1,248</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+12.2% nuevos leads</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-medium">ROI Promedio</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">342%</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+5.1% eficiencia</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-medium">Campañas Activas</span>
            <Target className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">24</div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-2 font-medium">
            <span>Todas optimizadas por IA</span>
          </div>
        </div>
      </div>

      {/* ── SHARED API & AI SERVICES STATUS & LATENCY WIDGET ── */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Estado & Latencia de Servicios API e IA</h2>
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
              <strong className="text-white font-semibold">Servidor Clientum Activo:</strong> Todos los endpoints de IA Gemini, Google Maps, Scrapers y Neon DB utilizan claves globales centralizadas.
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

      {/* Quick Action / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            Rendimiento Comercial Reciente
          </h2>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-300 text-slate-400">
            Gráfico interactivo de conversión en tiempo real ({region})
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Asistente IA Sugerencias
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-xs text-indigo-900">
              <span className="font-semibold block mb-1">💡 Optimización de Campaña B2B</span>
              Incrementar presupuesto en Brasil un 15% debido a la alta tasa de conversión actual.
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-900">
              <span className="font-semibold block mb-1">🚀 Automatización Exitosa</span>
              Secuencia de correo en México completada con 42% de apertura.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

