import React, { useState, useEffect, useMemo } from 'react';
import { ActiveTab } from '../types';
import {
  Users,
  Compass,
  Kanban,
  Target,
  ShieldCheck,
  Zap,
  Send,
  Layout,
  FileSpreadsheet,
  Sparkles,
  Search,
  ListOrdered,
  Share2,
  LayoutDashboard,
  MessageSquareCode,
  Cpu,
  Database,
  Globe2,
  Settings,
  User,
  Shield,
  Briefcase,
  Layers,
  Workflow
} from 'lucide-react';

export interface NavigationRailItem {
  id: ActiveTab;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  group: 'CRM' | 'Marketing' | 'SEO' | 'Tools';
  badge?: string;
  rolesAllowed?: ('admin' | 'demo' | 'user')[];
  description?: string;
}

export interface NavigationRailProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userRole?: string;
  activeModuleContext?: 'CRM' | 'Marketing' | 'SEO' | 'Tools' | 'all';
  compact?: boolean;
  className?: string;
  onTabSelect?: (tab: ActiveTab) => void;
}

export const NAVIGATION_RAIL_ITEMS: NavigationRailItem[] = [
  {
    id: 'contacts',
    label: 'Base de Leads & Contactos',
    shortLabel: 'Leads',
    icon: Users,
    group: 'CRM',
    badge: 'CRM',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Gestión unificada de prospectos y clientes'
  },
  {
    id: 'geolocated_prospecting',
    label: 'Prospección Maps IA',
    shortLabel: 'Maps IA',
    icon: Compass,
    group: 'CRM',
    badge: 'IA',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Búsqueda de comercios y PyMEs en Google Maps'
  },
  {
    id: 'crm_kanban',
    label: 'Pipeline CRM & MEDDIC',
    shortLabel: 'Pipeline',
    icon: Kanban,
    group: 'CRM',
    badge: 'Deals',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Embudo de ventas interactivo por etapas'
  },
  {
    id: 'icp_builder',
    label: 'ICP & Buyer Personas',
    shortLabel: 'ICP',
    icon: Target,
    group: 'CRM',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Definición de cliente ideal y arquetipos'
  },
  {
    id: 'meddic',
    label: 'Lead Scoring MEDDIC',
    shortLabel: 'MEDDIC',
    icon: ShieldCheck,
    group: 'CRM',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Calificación metodológica B2B'
  },
  {
    id: 'crm_agents',
    label: 'Agentes Comerciales IA',
    shortLabel: 'Agentes',
    icon: Cpu,
    group: 'CRM',
    badge: 'Auto',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Fuerza de ventas automatizada'
  },
  {
    id: 'vscrm_dashboard',
    label: 'VS-CRM Enterprise',
    shortLabel: 'VS-CRM',
    icon: Briefcase,
    group: 'CRM',
    badge: 'VS',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Gestión integral de proyectos y facturación'
  },

  {
    id: 'strategy',
    label: 'Estrategia & Copywriter',
    shortLabel: 'Estrategia',
    icon: Zap,
    group: 'Marketing',
    badge: 'Gemini',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Generación de copys y planes omnicanal'
  },
  {
    id: 'email_campaigns',
    label: 'Campañas & Outreach IA',
    shortLabel: 'Campañas',
    icon: Send,
    group: 'Marketing',
    badge: 'Auto',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Automatización de secuencias de email y WhatsApp'
  },
  {
    id: 'email_template_builder',
    label: 'Diseñador de Plantillas',
    shortLabel: 'Plantillas',
    icon: Layout,
    group: 'Marketing',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Editor visual de newsletters y plantillas'
  },
  {
    id: 'brochure_generator',
    label: 'Brochure & PDF Studio',
    shortLabel: 'Brochure',
    icon: FileSpreadsheet,
    group: 'Marketing',
    badge: 'PDF',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Catálogos comerciales de alta resolución'
  },
  {
    id: 'ai_hub',
    label: 'Gemini AI & Voice Hub',
    shortLabel: 'AI Hub',
    icon: Sparkles,
    group: 'Marketing',
    badge: 'Voice',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Llamadas en tiempo real y multimodalidad'
  },

  {
    id: 'keyword_research',
    label: 'Keywords & Mapa Tópico',
    shortLabel: 'Keywords',
    icon: Search,
    group: 'SEO',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Investigación semántica y volumen de búsqueda'
  },
  {
    id: 'on_page_audit',
    label: 'Auditoría & Rank Tracker',
    shortLabel: 'Auditoría',
    icon: ShieldCheck,
    group: 'SEO',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Salud técnica y monitoreo de posiciones'
  },
  {
    id: 'content_calendar',
    label: 'Calendario & SEO Auto',
    shortLabel: 'Calendario',
    icon: ListOrdered,
    group: 'SEO',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Cronograma de publicaciones optimizadas'
  },
  {
    id: 'link_building',
    label: 'Link Building & Backlinks',
    shortLabel: 'Backlinks',
    icon: Share2,
    group: 'SEO',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Estrategia de autoridad de dominio'
  },

  {
    id: 'overview',
    label: 'Métricas & ROI General',
    shortLabel: 'Métricas',
    icon: LayoutDashboard,
    group: 'Tools',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Panel de control con KPIs consolidados'
  },
  {
    id: 'chat',
    label: 'Asistente CMO IA',
    shortLabel: 'Chat IA',
    icon: MessageSquareCode,
    group: 'Tools',
    badge: 'IA',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Consultoría estratégica en lenguaje natural'
  },
  {
    id: 'workflow',
    label: 'Workflow Inicio a Fin',
    shortLabel: 'Workflow',
    icon: Workflow,
    group: 'Tools',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Ruta secuencial paso a paso'
  },
  {
    id: 'agent_os',
    label: 'Agent OS & Microservicios',
    shortLabel: 'Agent OS',
    icon: Cpu,
    group: 'Tools',
    badge: 'Admin',
    rolesAllowed: ['admin'],
    description: 'Orquestación de microservicios e IA backend'
  },
  {
    id: 'cmdb',
    label: 'CMDB & Salud de Infraestructura',
    shortLabel: 'CMDB',
    icon: Database,
    group: 'Tools',
    badge: 'Admin',
    rolesAllowed: ['admin'],
    description: 'Base de datos de configuración y métricas de red'
  },
  {
    id: 'google_drive',
    label: 'Google Drive Workspace',
    shortLabel: 'Drive',
    icon: Globe2,
    group: 'Tools',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Sincronización de activos en la nube'
  },
  {
    id: 'settings',
    label: 'Configuración & APIs',
    shortLabel: 'Ajustes',
    icon: Settings,
    group: 'Tools',
    badge: 'Admin',
    rolesAllowed: ['admin'],
    description: 'Gestión de claves de API y credenciales'
  },
  {
    id: 'account',
    label: 'Mi Cuenta & Seguridad',
    shortLabel: 'Cuenta',
    icon: User,
    group: 'Tools',
    rolesAllowed: ['admin', 'demo', 'user'],
    description: 'Perfil de usuario y autenticación'
  },
  {
    id: 'admin_console',
    label: 'Consola de Administración',
    shortLabel: 'Consola',
    icon: Shield,
    group: 'Tools',
    badge: 'Admin',
    rolesAllowed: ['admin'],
    description: 'Auditoría de usuarios y permisos del sistema'
  },
];

export function NavigationRail({
  activeTab,
  setActiveTab,
  userRole = 'demo',
  activeModuleContext = 'all',
  compact = false,
  className = '',
  onTabSelect,
}: NavigationRailProps) {
  const [currentRole, setCurrentRole] = useState<string>(userRole);
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'CRM' | 'Marketing' | 'SEO' | 'Tools'>(activeModuleContext);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data?.user?.role) {
            setCurrentRole(data.user.role);
          }
        }
      } catch {
        if (!userRole) setCurrentRole('demo');
      }
    };
    checkRole();
    const handleAuth = () => checkRole();
    window.addEventListener('auth-changed', handleAuth);
    return () => window.removeEventListener('auth-changed', handleAuth);
  }, [userRole]);

  useEffect(() => {
    setSelectedGroup(activeModuleContext);
  }, [activeModuleContext]);

  const effectiveRole = (currentRole?.toLowerCase() === 'admin') ? 'admin' : (currentRole?.toLowerCase() === 'user' ? 'user' : 'demo');

  const visibleItems = useMemo(() => {
    return NAVIGATION_RAIL_ITEMS.filter((item) => {
      const allowed = !item.rolesAllowed || item.rolesAllowed.includes(effectiveRole as any) || effectiveRole === 'admin';
      if (!allowed) return false;
      if (selectedGroup === 'all') return true;
      return item.group === selectedGroup;
    });
  }, [effectiveRole, selectedGroup]);

  const handleSelect = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    if (onTabSelect) onTabSelect(tabId);
  };

  const groupColors: Record<string, { bg: string; text: string; activeBg: string }> = {
    CRM: { bg: 'hover:bg-indigo-950/60', text: 'text-indigo-400', activeBg: 'bg-indigo-600' },
    Marketing: { bg: 'hover:bg-purple-950/60', text: 'text-purple-400', activeBg: 'bg-purple-600' },
    SEO: { bg: 'hover:bg-cyan-950/60', text: 'text-cyan-400', activeBg: 'bg-cyan-600' },
    Tools: { bg: 'hover:bg-slate-800', text: 'text-slate-300', activeBg: 'bg-slate-700' },
  };

  if (compact) {
    return (
      <div className={`flex flex-col gap-1.5 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800/80 backdrop-blur-md ${className}`}>
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={`${item.label} (${item.group})`}
              aria-label={item.label}
            >
              <Icon className="w-4 h-4" />
              {isActive && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex flex-col bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-xl ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Navegación {selectedGroup !== 'all' ? selectedGroup : 'Global'}
          </span>
        </div>
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
          effectiveRole === 'admin'
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
        }`}>
          {effectiveRole.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-1 py-2 border-b border-slate-800/60 overflow-x-auto custom-scrollbar">
        {(['all', 'CRM', 'Marketing', 'SEO', 'Tools'] as const).map((grp) => (
          <button
            key={grp}
            onClick={() => setSelectedGroup(grp)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedGroup === grp
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {grp === 'all' ? 'Todos' : grp}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const styling = groupColors[item.group] || groupColors.Tools;

          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-950/70 border-indigo-500/50 shadow-md shadow-indigo-950/40 text-white'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.description}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default NavigationRail;
