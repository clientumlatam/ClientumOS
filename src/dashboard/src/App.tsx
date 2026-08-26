import React from 'react';
import { CRMProvider, useCRM } from './context/CRMContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { KanbanView } from './components/opportunities/KanbanView';
import { TableView } from './components/opportunities/TableView';
import { CompaniesView } from './components/companies/CompaniesView';
import { PeopleView } from './components/people/PeopleView';
import { TasksView } from './components/tasks/TasksView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';
import { PowerSuiteView } from './components/power/PowerSuiteView';
import { ErpView } from './components/power/ErpView';
import { RestaurantView } from './components/power/RestaurantView';
import { EcommerceView } from './components/power/EcommerceView';
import { SaaSClusterView } from './components/power/SaaSClusterView';
import { SitesView } from './components/power/SitesView';
import { SaaSThemeView } from './components/power/SaaSThemeView';
import { SubscriptionsView } from './components/power/SubscriptionsView';
import { ContactsView } from './components/power/ContactsView';
import { CustomerSegmentsView } from './components/power/CustomerSegmentsView';
import { ChatbotView } from './components/power/ChatbotView';
import { AutomationView } from './components/power/AutomationView';
import { KnowledgeBaseView } from './components/power/KnowledgeBaseView';
import { WhatsAppView } from './components/whatsapp/WhatsAppView';
import { CustomObjectsView } from './components/custom/CustomObjectsView';
import { WorkflowsView } from './components/workflows/WorkflowsView';
import { CSVStudioView } from './components/csv/CSVStudioView';
import { BrochureView } from './components/power/BrochureView';
import { RecordDrawer } from './components/common/RecordDrawer';
import { CommandPalette } from './components/common/CommandPalette';
import { NewRecordModal } from './components/common/NewRecordModal';
import { AICopilotModal } from './components/ai/AICopilotModal';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';
import { AuthScreen } from './components/auth/AuthScreen';
import { UserProfileModal } from './components/auth/UserProfileModal';

const MainContent: React.FC = () => {
  const { activeTab, viewMode, isProfileModalOpen, setIsProfileModalOpen } = useCRM();

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
      <Navbar />

      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative bg-[#0a0c10]">
        {activeTab === 'opportunities' && (
          viewMode === 'kanban' ? <KanbanView /> : <TableView />
        )}
        {activeTab === 'companies' && <CompaniesView />}
        {activeTab === 'people' && <PeopleView />}
        {activeTab === 'tasks' && <TasksView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'powerSuite' && <PowerSuiteView />}
        {activeTab === 'whatsapp' && <WhatsAppView />}
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
        {activeTab === 'payments' && <PowerSuiteView defaultModule="mercadopago" />}
        {activeTab === 'clientPortal' && <PowerSuiteView defaultModule="portal" />}
        {activeTab === 'seoSuite' && <PowerSuiteView defaultModule="seo" />}
        {activeTab === 'webDev' && <PowerSuiteView defaultModule="webdev" />}
        {activeTab === 'customObjects' && <CustomObjectsView />}
        {activeTab === 'workflows' && <WorkflowsView />}
        {activeTab === 'csvStudio' && <CSVStudioView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Overlays & Modals */}
      <RecordDrawer />
      <CommandPalette />
      <NewRecordModal />
      <AICopilotModal />
      <AuthModal />
      <UserProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <ToastContainer />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { theme, isAuthenticated } = useCRM();

  if (!isAuthenticated) {
    return (
      <div data-theme={theme} className="min-h-screen w-screen overflow-hidden">
        <AuthScreen />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div
      data-theme={theme}
      className={`flex h-screen w-screen overflow-hidden ${
        theme === 'light'
          ? 'bg-[#f8fafc] text-[#0f172a]'
          : 'bg-[#0d0f14] text-[#e1e4ea]'
      } font-['Plus_Jakarta_Sans',sans-serif]`}
    >
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default function App() {
  return (
    <CRMProvider>
      <AppContent />
    </CRMProvider>
  );
}
