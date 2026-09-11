import React from 'react';
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Globe,
  MessageSquare,
  Receipt,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface DashboardOperationsStripProps {
  onNavigate: (tab: ActiveTab) => void;
}

const operationalAreas: Array<{
  id: ActiveTab;
  label: string;
  title: string;
  metric: string;
  detail: string;
  status: string;
  statusTone: 'good' | 'info' | 'warning';
  icon: React.ComponentType<{ size?: number; className?: string }>;
}> = [
  {
    id: 'opportunities',
    label: '01 · Comercial',
    title: 'CRM & Pipeline B2B',
    metric: '$ 582.000',
    detail: 'pipeline ponderado · 18 ganados este mes',
    status: '38,5% win rate',
    statusTone: 'good',
    icon: BriefcaseBusiness,
  },
  {
    id: 'whatsapp',
    label: '02 · Conversaciones',
    title: 'WhatsApp & Omnicanal',
    metric: '96%',
    detail: 'lectura promedio en campañas outbound',
    status: '18 chats activos',
    statusTone: 'info',
    icon: MessageSquare,
  },
  {
    id: 'aiAssistant',
    label: '03 · Inteligencia',
    title: 'Copilot & Agent OS',
    metric: '14 agentes',
    detail: 'insights, SDR, GTM y copy disponibles',
    status: '3 insights nuevos',
    statusTone: 'good',
    icon: Sparkles,
  },
  {
    id: 'erp',
    label: '04 · Finanzas',
    title: 'ERP & Facturación',
    metric: '$ 124.800',
    detail: 'cobrado este mes con Mercado Pago',
    status: 'AFIP CAE conectado',
    statusTone: 'good',
    icon: Receipt,
  },
  {
    id: 'workflows',
    label: '05 · Automatización',
    title: 'Engine & Studio',
    metric: '24 activos',
    detail: 'workflows, custom objects y webhooks',
    status: '98,7% ejecuciones OK',
    statusTone: 'good',
    icon: Workflow,
  },
  {
    id: 'seoSuite',
    label: '06 · Marketing',
    title: 'SEO, Web & Widgets',
    metric: '68 keywords',
    detail: 'rank tracking y activos embebibles',
    status: '4 widgets publicados',
    statusTone: 'info',
    icon: Globe,
  },
];

const suiteModules: Array<{ label: string; tab: ActiveTab }> = [
  { label: 'Pipeline Kanban', tab: 'opportunities' },
  { label: 'WhatsApp Multiagente', tab: 'whatsapp' },
  { label: 'Chatbot IA 24/7', tab: 'chatbot' },
  { label: 'ERP & AFIP', tab: 'erp' },
  { label: 'Mercado Pago', tab: 'payments' },
  { label: 'Maps IA', tab: 'mapsProspecting' },
  { label: 'Custom Objects', tab: 'customObjects' },
  { label: 'Workflows', tab: 'workflows' },
  { label: 'SEO & Rank Tracker', tab: 'seoSuite' },
  { label: 'Portal B2B', tab: 'clientPortal' },
  { label: 'KDS Gastronomía', tab: 'restaurant' },
  { label: 'E-commerce Orders', tab: 'ecommerce' },
  { label: 'CSV Studio', tab: 'csvStudio' },
  { label: 'Gemini Copilot', tab: 'aiAssistant' },
  { label: 'Broadcast', tab: 'campaigns' },
  { label: 'Analytics & BI', tab: 'analytics' },
];

export const DashboardOperationsStrip: React.FC<DashboardOperationsStripProps> = ({ onNavigate }) => (
  <section className="crm-operations-shell" aria-labelledby="crm-operations-title">
    <div className="crm-operations-header">
      <div>
        <span className="crm-section-kicker">Control center · 6 áreas conectadas</span>
        <h2 id="crm-operations-title">La operación completa, en una sola vista</h2>
        <p>Priorizá la próxima acción desde el estado comercial, conversacional, financiero y de automatización.</p>
      </div>
      <div className="crm-operations-health">
        <span className="crm-status-dot" />
        <span>Workspace saludable</span>
        <small>Última sincronización hace 2 min</small>
      </div>
    </div>

    <div className="crm-operations-grid">
      {operationalAreas.map((area) => {
        const AreaIcon = area.icon;
        return (
          <button
            key={area.id}
            type="button"
            className="crm-operation-card"
            onClick={() => onNavigate(area.id)}
          >
            <div className="crm-operation-card__top">
              <span className="crm-operation-card__label">{area.label}</span>
              <span className="crm-operation-card__icon"><AreaIcon size={15} /></span>
            </div>
            <strong>{area.title}</strong>
            <span className="crm-operation-card__metric">{area.metric}</span>
            <span className="crm-operation-card__detail">{area.detail}</span>
            <span className={`crm-operation-card__status crm-operation-card__status--${area.statusTone}`}>
              <CheckCircle2 size={11} />
              {area.status}
              <ArrowUpRight className="crm-operation-card__arrow" size={12} />
            </span>
          </button>
        );
      })}
    </div>

    <div className="crm-suite-map">
      <div className="crm-suite-map__header">
        <div className="crm-suite-map__title">
          <Bot size={15} />
          <span>Power Suite</span>
          <b>16 módulos unificados</b>
        </div>
        <span className="crm-suite-map__hint"><Clock3 size={12} /> Acceso rápido por módulo</span>
      </div>
      <div className="crm-suite-map__modules">
        {suiteModules.map((module) => (
          <button key={module.label} type="button" onClick={() => onNavigate(module.tab)}>
            <span className="crm-suite-map__dot" />
            {module.label}
          </button>
        ))}
      </div>
    </div>
  </section>
);