import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ActiveTab } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewTab } from './components/OverviewTab';
import { StrategyTab } from './components/StrategyTab';
import { CopywriterTab } from './components/CopywriterTab';
import { SeoTab } from './components/SeoTab';
import { ClientsTab } from './components/ClientsTab';
import { ChatTab } from './components/ChatTab';
import { ContactsTab } from './components/ContactsTab';
import { ListsTab } from './components/ListsTab';
import { EmailCampaignsTab } from './components/EmailCampaignsTab';
import { TemplatesTab } from './components/TemplatesTab';
import { AutomationsTab } from './components/AutomationsTab';
import { ImportExportTab } from './components/ImportExportTab';
import { SmtpTab } from './components/SmtpTab';
import { SettingsTab } from './components/SettingsTab';
import { KeywordResearchTab } from './components/KeywordResearchTab';
import { KeywordVaultTab } from './components/KeywordVaultTab';
import { TopicMapTab } from './components/TopicMapTab';
import { OnPageAuditTab } from './components/OnPageAuditTab';
import { ContentCalendarTab } from './components/ContentCalendarTab';
import { LinkBuildingTab } from './components/LinkBuildingTab';
import { RankTrackerTab } from './components/RankTrackerTab';
import { SeoAutomationTab } from './components/SeoAutomationTab';
import { AiHubTab } from './components/AiHubTab';
import { MeddicTab } from './components/MeddicTab';
import { IcpBuilderTab } from './components/IcpBuilderTab';
import { CrmKanbanTab } from './components/CrmKanbanTab';
import { EmailTemplateBuilderTab } from './components/EmailTemplateBuilderTab';
import { GeolocatedProspectingTab } from './components/GeolocatedProspectingTab';
import { AnalyticsDashboardTab } from './components/AnalyticsDashboardTab';
import { BrochureGeneratorTab } from './components/BrochureGeneratorTab';
import { OutreachAgentTab } from './components/OutreachAgentTab';
import { WorkflowTab } from './components/WorkflowTab';
import { GoogleDriveTab } from './components/GoogleDriveTab';
import AgentOSDashboard from './components/crm-full/AgentOSDashboard';
import CrmFullAgentes from './components/crm-full/CrmFullAgentes';
import CrmFullCMDB from './components/crm-full/CrmFullCMDB';
import CrmFullConfig from './components/crm-full/CrmFullConfig';
import AccountView from './components/AccountView';
import { VscrmDashboard } from './components/vscrm/VscrmDashboard';
import { VscrmClientsTab } from './components/vscrm/VscrmClientsTab';
import { VscrmProjectsTab } from './components/vscrm/VscrmProjectsTab';
import { VscrmTimeTab } from './components/vscrm/VscrmTimeTab';
import { VscrmInvoicesTab } from './components/vscrm/VscrmInvoicesTab';
import { VscrmExpensesTab } from './components/vscrm/VscrmExpensesTab';
import { VscrmAfipTab } from './components/vscrm/VscrmAfipTab';
import { AdminConsole } from './components/AdminConsole';
import { AiMarketingExpert } from './components/AiMarketingExpert';
import { UnifiedCrmSuite } from './components/UnifiedCrmSuite';
import ModernErpCrmSuite from './components/vscrm/ModernErpCrmSuite';
import CrmFullWhatsApp from './components/crm-full/CrmFullWhatsApp';
import { CommandPalette } from './components/CommandPalette';
import { Breadcrumbs } from './components/Breadcrumbs';
import PublicWebsite from './components/PublicWebsite';
import { AuthButton } from './components/AuthButton';
import { ResetPasswordModal } from './components/ResetPasswordModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoginPage } from './pages/LoginPage';
import { AppSwitcher } from './components/AppSwitcher';

function DashboardApp({ currentUser, handleLogout, resetModalElement }: { currentUser: string | null, handleLogout: () => void, resetModalElement: React.ReactNode }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [currency, setCurrency] = useState('USD');
  const [region, setRegion] = useState('LATAM (All)');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleNavigateTab = (e: Event) => {
      const target = (e as CustomEvent)?.detail?.tab;
      if (target === 'public_website') {
        navigate('/');
      } else if (target) {
        setActiveTab(target);
      }
    };
    window.addEventListener('navigate-tab', handleNavigateTab as EventListener);
    return () => {
      window.removeEventListener('navigate-tab', handleNavigateTab as EventListener);
    };
  }, [navigate]);

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          currency={currency}
          setCurrency={setCurrency}
          region={region}
          setRegion={setRegion}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        <main id="main-content-area" className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            />
            <ErrorBoundary resetKey={activeTab}>
              {activeTab === 'overview' && <OverviewTab currency={currency} region={region} onNavigate={setActiveTab} />}
              {activeTab === 'unified_crm' && <UnifiedCrmSuite initialView="kanban" onNavigateTab={setActiveTab} />}
              {activeTab === 'modern_erp_crm' && <ModernErpCrmSuite />}
              {activeTab === 'crm_whatsapp' && <CrmFullWhatsApp />}
              {activeTab === 'ai_hub' && <AiHubTab />}
              {activeTab === 'meddic' && <MeddicTab />}
              {activeTab === 'icp_builder' && <IcpBuilderTab />}
              {activeTab === 'crm_kanban' && <CrmKanbanTab />}
              {activeTab === 'email_template_builder' && <EmailTemplateBuilderTab />}
              {activeTab === 'geolocated_prospecting' && <GeolocatedProspectingTab />}
              {activeTab === 'analytics_dashboard' && <AnalyticsDashboardTab />}
              {activeTab === 'brochure_generator' && <BrochureGeneratorTab />}
              {activeTab === 'outreach_agent' && <OutreachAgentTab />}
              {activeTab === 'strategy' && <StrategyTab />}
              {activeTab === 'copywriter' && <CopywriterTab />}
              {activeTab === 'seo' && <SeoTab />}
              {(activeTab === 'contacts' || activeTab === 'clients' || activeTab === 'lists') && (
                <ContactsTab initialTab={activeTab as any} />
              )}
              {activeTab === 'chat' && <ChatTab />}
              {activeTab === 'email_campaigns' && <EmailCampaignsTab />}
              {activeTab === 'templates' && <TemplatesTab />}
              {activeTab === 'automations' && <AutomationsTab />}
              {(activeTab === 'settings' || activeTab === 'smtp' || activeTab === 'import_export') && (
                <SettingsTab defaultSubTab={activeTab === 'settings' ? 'apikeys' : activeTab as any} />
              )}
              {activeTab === 'keyword_research' && <KeywordResearchTab />}
              {activeTab === 'keyword_vault' && <KeywordVaultTab />}
              {activeTab === 'topic_map' && <TopicMapTab />}
              {activeTab === 'on_page_audit' && <OnPageAuditTab />}
              {activeTab === 'content_calendar' && <ContentCalendarTab />}
              {activeTab === 'link_building' && <LinkBuildingTab />}
              {activeTab === 'rank_tracker' && <RankTrackerTab />}
              {activeTab === 'seo_automation' && <SeoAutomationTab />}
              {activeTab === 'workflow' && <WorkflowTab setActiveTab={setActiveTab} />}
              {activeTab === 'google_drive' && <GoogleDriveTab />}
              {activeTab === 'agent_os' && <AgentOSDashboard />}
              {activeTab === 'crm_agents' && <CrmFullAgentes />}
              {activeTab === 'cmdb' && <CrmFullCMDB />}
              {activeTab === 'crm_config' && <CrmFullConfig />}
              {activeTab === 'admin_console' && <AdminConsole />}
              {activeTab === 'vscrm_dashboard' && <VscrmDashboard />}
              {activeTab === 'vscrm_clients' && <VscrmClientsTab />}
              {activeTab === 'vscrm_projects' && <VscrmProjectsTab />}
              {activeTab === 'vscrm_time' && <VscrmTimeTab />}
              {activeTab === 'vscrm_invoices' && <VscrmInvoicesTab />}
              {activeTab === 'vscrm_expenses' && <VscrmExpensesTab />}
              {activeTab === 'vscrm_afip' && <VscrmAfipTab />}
              {activeTab === 'ai_marketing_expert' && <AiMarketingExpert />}
              {activeTab === 'account' && (
                <AccountView
                  username={currentUser || 'admin'}
                  role="admin"
                  onLogout={handleLogout}
                  onBack={() => setActiveTab('overview')}
                />
              )}
            </ErrorBoundary>
          </div>
        </main>
      </div>

      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        setActiveTab={setActiveTab}
      />
      {resetModalElement}
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('reset_token');
  });
  
  const navigate = useNavigate();

  const fetchSession = async (autoRedirect = false) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.user) {
          setCurrentUser(data.user.username);
          if (autoRedirect || window.location.search.includes('login=success')) {
            navigate('/app');
            if (window.location.search.includes('login=success')) {
              window.history.replaceState({}, '', window.location.pathname);
            }
          }
          return;
        }
      }
      setCurrentUser(null);
    } catch (err) {
      console.warn('[App] Session check failed:', err);
      setCurrentUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setCurrentUser(null);
      window.dispatchEvent(new Event('auth-changed'));
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSession(window.location.search.includes('login=success'));
    const handleAuthChange = (e?: Event) => {
      const customDetail = (e as CustomEvent)?.detail;
      if (customDetail?.user) {
        setCurrentUser(customDetail.user.username);
        navigate('/app');
      } else {
        fetchSession(true);
      }
    };
    window.addEventListener('auth-changed', handleAuthChange as EventListener);
    return () => {
      window.removeEventListener('auth-changed', handleAuthChange as EventListener);
    };
  }, [navigate]);

  const resetModalElement = (
    <ResetPasswordModal
      isOpen={Boolean(resetToken)}
      token={resetToken || ''}
      onClose={() => {
        setResetToken(null);
        const url = new URL(window.location.href);
        url.searchParams.delete('reset_token');
        window.history.replaceState({}, '', url.toString());
      }}
      onSuccess={() => {
        setResetToken(null);
        const url = new URL(window.location.href);
        url.searchParams.delete('reset_token');
        window.history.replaceState({}, '', url.toString());
        window.dispatchEvent(new CustomEvent('open-login-modal'));
      }}
    />
  );

  const publicWebsiteElement = (
    <div className="w-screen min-h-screen bg-slate-900 overflow-y-auto">
      <PublicWebsite 
        onBackToEditor={() => navigate('/app')}
        authUser={currentUser}
        onOpenLogin={() => navigate('/login')}
        onLogout={handleLogout}
        onLoginSuccess={() => navigate('/app')}
      />
      <div className="hidden">
        <AuthButton onLoginSuccess={() => navigate('/app')} />
      </div>
      <AppSwitcher variant="floating" authUser={currentUser} />
      {resetModalElement}
    </div>
  );

  return (
    <Routes>
      {/* ACCESO, LOGIN Y REGISTRO */}
      <Route path="/login" element={
        <LoginPage 
          currentUser={currentUser}
          onLoginSuccess={() => navigate('/app')}
        />
      } />
      <Route path="/auth/*" element={
        <LoginPage 
          currentUser={currentUser}
          onLoginSuccess={() => navigate('/app')}
        />
      } />

      {/* PLATAFORMA DASHBOARD & CRM SUITE */}
      <Route path="/dashboard/*" element={<Navigate to="/app" replace />} />
      <Route path="/crm/*" element={<Navigate to="/app" replace />} />
      <Route path="/erp/*" element={<Navigate to="/app" replace />} />

      <Route path="/app/*" element={
        <DashboardApp 
          currentUser={currentUser} 
          handleLogout={handleLogout} 
          resetModalElement={resetModalElement} 
        />
      } />

      {/* SITIO WEB PÚBLICO (todas las paginas con sus propias rutas) */}
      <Route path="/" element={publicWebsiteElement} />
      <Route path="/servicios" element={publicWebsiteElement} />
      <Route path="/soluciones" element={publicWebsiteElement} />
      <Route path="/soluciones/*" element={publicWebsiteElement} />
      <Route path="/plataforma" element={publicWebsiteElement} />
      <Route path="/precios" element={publicWebsiteElement} />
      <Route path="/planes" element={publicWebsiteElement} />
      <Route path="/nosotros" element={publicWebsiteElement} />
      <Route path="/empresa" element={publicWebsiteElement} />
      <Route path="/contacto" element={publicWebsiteElement} />
      <Route path="/casos" element={publicWebsiteElement} />
      <Route path="/casos-de-exito" element={publicWebsiteElement} />
      <Route path="/industrias" element={publicWebsiteElement} />
      <Route path="/recursos" element={publicWebsiteElement} />
      <Route path="/blog" element={publicWebsiteElement} />
      <Route path="/academia" element={publicWebsiteElement} />
      <Route path="/catalogo" element={publicWebsiteElement} />
      <Route path="/clientes" element={publicWebsiteElement} />
      <Route path="/partners" element={publicWebsiteElement} />
      <Route path="/afiliados" element={publicWebsiteElement} />
      <Route path="/trabaja-con-nosotros" element={publicWebsiteElement} />
      <Route path="/carreras" element={publicWebsiteElement} />
      <Route path="/ayuda" element={publicWebsiteElement} />
      <Route path="/faq" element={publicWebsiteElement} />
      <Route path="/documentacion" element={publicWebsiteElement} />
      <Route path="/docs" element={publicWebsiteElement} />
      <Route path="/privacidad" element={publicWebsiteElement} />
      <Route path="/terminos" element={publicWebsiteElement} />
      <Route path="/chatbot" element={publicWebsiteElement} />
      <Route path="/crm-inteligente" element={publicWebsiteElement} />
      <Route path="/asistente-ia" element={publicWebsiteElement} />
      <Route path="/automatizacion" element={publicWebsiteElement} />
      <Route path="/portal-cliente" element={publicWebsiteElement} />
      <Route path="/desarrollo-web" element={publicWebsiteElement} />
      <Route path="/integraciones" element={publicWebsiteElement} />
      <Route path="/facturacion-afip" element={publicWebsiteElement} />
      <Route path="/afip" element={publicWebsiteElement} />
      <Route path="/mercadopago" element={publicWebsiteElement} />
      <Route path="/generacion-leads" element={publicWebsiteElement} />
      <Route path="/leads" element={publicWebsiteElement} />
      <Route path="/business-intelligence" element={publicWebsiteElement} />
      <Route path="/reportes" element={publicWebsiteElement} />
      <Route path="/ecommerce" element={publicWebsiteElement} />
      <Route path="/consultoria-erp" element={publicWebsiteElement} />
      
      {/* Alias de navegacion anterior */}
      <Route path="/sitio/*" element={publicWebsiteElement} />
      <Route path="/web/*" element={publicWebsiteElement} />
      <Route path="/portal/*" element={publicWebsiteElement} />
      <Route path="/public/*" element={publicWebsiteElement} />
      <Route path="/lms/*" element={publicWebsiteElement} />

      <Route path="*" element={publicWebsiteElement} />
    </Routes>
  );
}
