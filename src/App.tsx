import React, { useState, useEffect } from 'react';
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
import { CommandPalette } from './components/CommandPalette';
import { Breadcrumbs } from './components/Breadcrumbs';
import PublicWebsite from './components/PublicWebsite';
import { AuthButton } from './components/AuthButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ResetPasswordModal } from './components/ResetPasswordModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('public_website');
  const [currency, setCurrency] = useState('USD');
  const [region, setRegion] = useState('LATAM (All)');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);

  // Check for password reset token in URL params on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('reset_token') || params.get('token');
    if (token) {
      console.log('[Auth] Token de restablecimiento detectado en la URL.');
      setResetToken(token);
    }
  }, []);

  // Diagnostic logs & global error capture setup
  useEffect(() => {
    console.log('[Diagnostic Log] Auth diagnostic handler initialized.');

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('[Diagnostic Trace] Unhandled Promise Rejection caught:', event.reason);
    };

    const handleGlobalError = (event: ErrorEvent) => {
      console.error('[Diagnostic Trace] Global uncaught runtime error:', event.error || event.message);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleGlobalError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  const fetchSession = async (autoRedirect = false) => {
    const endpoint = '/api/auth/me';
    const reqHeaders = { 'Cache-Control': 'no-cache', 'Accept': 'application/json' };
    
    try {
      console.log(`[Diagnostic Trace] Fetching session from ${endpoint}`, {
        url: endpoint,
        headers: reqHeaders,
        autoRedirect,
        timestamp: new Date().toISOString()
      });

      const res = await fetch(endpoint, {
        headers: reqHeaders,
        credentials: 'same-origin'
      });

      console.log(`[Diagnostic Trace] Session response received:`, {
        status: res.status,
        statusText: res.statusText,
        ok: res.ok,
        contentType: res.headers.get('content-type')
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.user) {
          console.log(`[Diagnostic Trace] Active authenticated session found for user:`, data.user);
          setCurrentUser(data.user.username);
          if (autoRedirect || window.location.search.includes('login=success')) {
            console.log(`[Diagnostic Trace] Redirecting active tab from '${activeTab}' to 'overview'`);
            setActiveTab('overview');
            if (window.location.search.includes('login=success')) {
              window.history.replaceState({}, '', '/');
            }
          }
          return;
        }
      }

      // Differentiate between 401 (cleanly unauthenticated) and unexpected status codes
      if (res.status === 401) {
        console.log(`[Diagnostic Trace] Session status 401: Cleanly unauthenticated user state.`);
      } else {
        console.warn(`[Diagnostic Trace] Session check returned non-200/non-401 status: ${res.status}`);
      }
      setCurrentUser(null);
    } catch (err: any) {
      console.error('[Diagnostic Trace] Network or execution exception during fetchSession:', {
        message: err?.message || err,
        stack: err?.stack
      });
      // Network errors do not alter existing session state to prevent disruptive UI flips
      setCurrentUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setCurrentUser(null);
      window.dispatchEvent(new Event('auth-changed'));
      setActiveTab('public_website');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSession(window.location.search.includes('login=success')).catch(err => {
      console.warn('[Diagnostic Trace] fetchSession promise rejected in useEffect:', err);
    });
    const handleAuthChange = () => {
      fetchSession(true).catch(err => {
        console.warn('[Diagnostic Trace] fetchSession promise rejected in handleAuthChange:', err);
      });
    };
    window.addEventListener('auth-changed', handleAuthChange);
    return () => {
      window.removeEventListener('auth-changed', handleAuthChange);
    };
  }, []);

  if (activeTab === 'public_website') {
    return (
      <ErrorBoundary fallbackTitle="Error al cargar el portal de inicio">
        <div className="w-screen min-h-screen bg-slate-900 overflow-y-auto">
          <PublicWebsite 
            onBackToEditor={() => setActiveTab('overview')}
            authUser={currentUser}
            onOpenLogin={() => {
              window.dispatchEvent(new CustomEvent('open-login-modal'));
            }}
            onLogout={handleLogout}
          />
          {/* Helper AuthButton wrapper so its event listener handles open-login-modal triggers */}
          <div className="hidden">
            <AuthButton />
          </div>
          <ResetPasswordModal
            isOpen={!!resetToken}
            token={resetToken || ''}
            onClose={() => {
              setResetToken(null);
              if (window.location.search.includes('reset_token') || window.location.search.includes('token')) {
                window.history.replaceState({}, '', '/');
              }
            }}
            onSuccess={() => {
              setResetToken(null);
              if (window.location.search.includes('reset_token') || window.location.search.includes('token')) {
                window.history.replaceState({}, '', '/');
              }
              window.dispatchEvent(new CustomEvent('open-login-modal'));
            }}
          />
        </div>
      </ErrorBoundary>
    );
  }

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

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            />
            <ErrorBoundary resetKey={activeTab}>
              {activeTab === 'overview' && <OverviewTab currency={currency} region={region} />}
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
              {activeTab === 'clients' && <ClientsTab />}
              {activeTab === 'chat' && <ChatTab />}
              {activeTab === 'contacts' && <ContactsTab />}
              {activeTab === 'lists' && <ListsTab />}
              {activeTab === 'email_campaigns' && <EmailCampaignsTab />}
              {activeTab === 'templates' && <TemplatesTab />}
              {activeTab === 'automations' && <AutomationsTab />}
              {activeTab === 'import_export' && <ImportExportTab />}
              {activeTab === 'smtp' && <SmtpTab />}
              {activeTab === 'settings' && <SettingsTab />}
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
              {activeTab === 'account' && (
                <AccountView
                  username={currentUser || 'admin'}
                  role="admin"
                  onLogout={async () => {
                    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
                    window.dispatchEvent(new Event('auth-changed'));
                    setActiveTab('overview');
                  }}
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

      <ResetPasswordModal
        isOpen={!!resetToken}
        token={resetToken || ''}
        onClose={() => {
          setResetToken(null);
          if (window.location.search.includes('reset_token') || window.location.search.includes('token')) {
            window.history.replaceState({}, '', '/');
          }
        }}
        onSuccess={() => {
          setResetToken(null);
          if (window.location.search.includes('reset_token') || window.location.search.includes('token')) {
            window.history.replaceState({}, '', '/');
          }
          window.dispatchEvent(new CustomEvent('open-login-modal'));
        }}
      />
    </div>
  );
}

