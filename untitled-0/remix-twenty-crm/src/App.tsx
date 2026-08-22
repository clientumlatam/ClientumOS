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
import { RecordDrawer } from './components/common/RecordDrawer';
import { CommandPalette } from './components/common/CommandPalette';
import { NewRecordModal } from './components/common/NewRecordModal';
import { AICopilotModal } from './components/ai/AICopilotModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainContent: React.FC = () => {
  const { activeTab, viewMode } = useCRM();

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
        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Overlays & Modals */}
      <RecordDrawer />
      <CommandPalette />
      <NewRecordModal />
      <AICopilotModal />
      <ToastContainer />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { theme } = useCRM();

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
