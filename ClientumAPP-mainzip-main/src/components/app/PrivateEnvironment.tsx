import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { Sidebar } from '../layout/Sidebar';
import { Navbar } from '../layout/Navbar';
import { KanbanView } from '../opportunities/KanbanView';
import { TableView } from '../opportunities/TableView';
import { ExecutiveDashboardView } from '../dashboard/ExecutiveDashboardView';
import { CompaniesView } from '../companies/CompaniesView';
import { PeopleView } from '../people/PeopleView';
import { TasksView } from '../tasks/TasksView';
import { ActivityInboxView } from '../activities/ActivityInboxView';
import { OperationsView } from '../operations/OperationsView';
import { CalendarView } from '../calendar/CalendarView';
import { AnalyticsView } from '../analytics/AnalyticsView';
import { SettingsView } from '../settings/SettingsView';
import { PowerSuiteView } from '../power/PowerSuiteView';
import { ErpView } from '../power/ErpView';
import { RestaurantView } from '../power/RestaurantView';
import { EcommerceView } from '../power/EcommerceView';
import { SaaSClusterView } from '../power/SaaSClusterView';
import { SitesView } from '../power/SitesView';
import { SaaSThemeView } from '../power/SaaSThemeView';
import { SubscriptionsView } from '../power/SubscriptionsView';
import { ContactsView } from '../power/ContactsView';
import { CustomerSegmentsView } from '../power/CustomerSegmentsView';
import { ChatbotView } from '../power/ChatbotView';
import { AutomationView } from '../power/AutomationView';
import { KnowledgeBaseView } from '../power/KnowledgeBaseView';
import { WhatsAppView } from '../whatsapp/WhatsAppView';
import { CustomObjectsView } from '../custom/CustomObjectsView';
import { WorkflowsView } from '../workflows/WorkflowsView';
import { CSVStudioView } from '../csv/CSVStudioView';
import { AgenteOSView } from '../ai/AgenteOSView';
import { Propuestas } from '../commercial/Propuestas';
import { CrmFullGoogleMaps } from '../commercial/CrmFullGoogleMaps';
import { PublicDomainManagerPage } from '../power/PublicDomainManagerPage';
import { CampusLMSView } from '../power/CampusLMSView';
import { TiendaDigitalView } from '../public/TiendaDigitalView';
import { IndustryLandingPage } from '../public/IndustryLandingPage';
import { QuoteWizardModal } from '../public/QuoteWizardModal';
import { WhatsAppSimulatorModal } from '../public/WhatsAppSimulatorModal';
import { ExpressAuditModal } from '../public/ExpressAuditModal';
import { RecordDrawer } from '../common/RecordDrawer';
import { CommandPalette } from '../common/CommandPalette';
import { NewRecordModal } from '../common/NewRecordModal';
import { AICopilotModal } from '../ai/AICopilotModal';
import { AuthModal } from '../auth/AuthModal';
import { UserProfileModal } from '../auth/UserProfileModal';
import { WebmailInboxView } from '../webmail/WebmailInboxView';
import { PlatformBillingView } from '../billing/PlatformBillingView';
import { MessagesView } from '../messages/MessagesView';
import { ComposeEmailModal } from '../webmail/ComposeEmailModal';
import { FeatureHubView } from '../features/FeatureHubView';
import { ToastContainer } from '../common/ToastContainer';

const MainContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    viewMode,
    isProfileModalOpen,
    setIsProfileModalOpen,
    isComposeEmailModalOpen,
    closeComposeEmailModal,
    composeEmailDefaults,
  } = useCRM();
  const [isWizardOpen, setIsWizardOpen] = React.useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = React.useState(false);
  const [isAuditOpen, setIsAuditOpen] = React.useState(false);

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
      <Navbar />

      <main className="crm-main-content flex-1 flex flex-col min-h-0 overflow-hidden relative">
        {activeTab === 'dashboard' && <ExecutiveDashboardView />}
        {activeTab === 'featureHub' && <FeatureHubView />}
        {activeTab === 'opportunities' && (viewMode === 'kanban' ? <KanbanView /> : <TableView />)}
        {activeTab === 'companies' && <CompaniesView />}
        {activeTab === 'people' && <PeopleView />}
        {activeTab === 'tasks' && <TasksView />}
        {activeTab === 'activityInbox' && <ActivityInboxView />}
        {activeTab === 'operations' && <OperationsView />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'powerSuite' && <PowerSuiteView />}
        {activeTab === 'whatsapp' && <WhatsAppView />}
        {activeTab === 'messages' && <MessagesView />}
        {activeTab === 'erp' && <ErpView />}
        {activeTab === 'restaurant' && <RestaurantView />}
        {activeTab === 'ecommerce' && <EcommerceView />}
        {activeTab === 'saasCluster' && <SaaSClusterView />}
        {activeTab === 'sites' && <SitesView />}
        {activeTab === 'saasTheme' && <SaaSThemeView />}
        {activeTab === 'subscriptions' && <SubscriptionsView />}
        {activeTab === 'segments' && <CustomerSegmentsView />}
        {activeTab === 'chatbot' && <ChatbotView />}
        {activeTab === 'automation' && <AutomationView />}
        {activeTab === 'knowledge' && <KnowledgeBaseView />}
        {activeTab === 'mapsProspecting' && <PowerSuiteView defaultModule="maps" />}
        {activeTab === 'meddic' && <PowerSuiteView defaultModule="meddic" />}
        {activeTab === 'campaigns' && <PowerSuiteView defaultModule="campaigns" />}
        {activeTab === 'aiAssistant' && <PowerSuiteView defaultModule="gemini" />}
        {activeTab === 'gtmStrategy' && <PowerSuiteView defaultModule="gtm" />}
        {activeTab === 'sdrOutreach' && <PowerSuiteView defaultModule="sdr" />}
        {activeTab === 'adCopy' && <PowerSuiteView defaultModule="adcopy" />}
        {activeTab === 'payments' && <PlatformBillingView />}
        {activeTab === 'clientPortal' && <PowerSuiteView defaultModule="portal" />}
        {activeTab === 'seoSuite' && <PowerSuiteView defaultModule="seo" />}
        {activeTab === 'webDev' && <PowerSuiteView defaultModule="webdev" />}
        {activeTab === 'customObjects' && <CustomObjectsView />}
        {activeTab === 'workflows' && <WorkflowsView />}
        {activeTab === 'csvStudio' && <CSVStudioView />}
        {activeTab === 'agenteOS' && <AgenteOSView />}
        {activeTab === 'propuestas' && <Propuestas />}
        {activeTab === 'googleMaps' && <CrmFullGoogleMaps />}
        {activeTab === 'domainManager' && <PublicDomainManagerPage />}
        {activeTab === 'campusLMS' && <CampusLMSView />}
        {activeTab === 'tiendaDigital' && <TiendaDigitalView />}
        {activeTab === 'industryLanding' && (
          <IndustryLandingPage
            onOpenWizard={() => setIsWizardOpen(true)}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
            onBackToHome={() => setActiveTab('dashboard')}
          />
        )}
        {activeTab === 'settings' && <SettingsView />}
        {activeTab === 'webmail' && <WebmailInboxView />}
      </main>

      <RecordDrawer />
      <CommandPalette />
      <NewRecordModal />
      <AICopilotModal />
      <AuthModal />
      <ComposeEmailModal
        isOpen={isComposeEmailModalOpen}
        onClose={closeComposeEmailModal}
        initialDefaults={composeEmailDefaults}
      />
      <UserProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <QuoteWizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
      <WhatsAppSimulatorModal isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} />
      <ExpressAuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
      <ToastContainer />
    </div>
  );
};

export const PrivateEnvironment: React.FC = () => (
  <div className="clientum-light-dashboard flex h-[100dvh] min-h-screen w-screen overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)] font-['Plus_Jakarta_Sans',sans-serif]">
    <Sidebar />
    <MainContent />
  </div>
);