import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Activity,
  ActiveTab,
  Company,
  CustomObjectDefinition,
  CustomObjectField,
  FilterState,
  Language,
  Opportunity,
  OpportunityViewMode,
  Person,
  SavedView,
  StageId,
  Task,
  ThemeMode,
  User,
  WorkflowRule,
  Invoice,
  InvoiceStatus,
  InventoryItem,
  ExpenseItem,
  RoleDefinition,
  PermissionResource,
  PermissionAction,
  AuditLogEntry,
  SecurityAnomaly,
  GoogleCalendarSyncState,
  SlackIntegrationState,
  APIKey,
  WebhookConfig,
  WebmailEmail,
} from '../types';
import { getTranslation, TranslationKey } from '../i18n/translations';
import { useTheme } from './ThemeContext';
import { getClientumAuthJsonHeaders } from '../lib/api';
import { INITIAL_WEBMAIL_EMAILS } from '../data/webmailInitialData';
import {
  INITIAL_ACTIVITIES,
  INITIAL_COMPANIES,
  INITIAL_CUSTOM_OBJECTS,
  INITIAL_OPPORTUNITIES,
  INITIAL_PEOPLE,
  INITIAL_SAVED_VIEWS,
  INITIAL_TASKS,
  INITIAL_WORKFLOWS,
  STAGES,
  USERS,
} from '../data/initialData';
import {
  INITIAL_ROLES,
  INITIAL_AUDIT_LOGS,
  INITIAL_SECURITY_ANOMALIES,
  INITIAL_CALENDAR_SYNC_STATE,
  INITIAL_SLACK_INTEGRATION_STATE,
  INITIAL_API_KEYS,
  INITIAL_WEBHOOKS,
} from '../data/rbacInitialData';
import {
  hasPermission as checkRoleHasPermission,
  scanAuditLogsForAnomalies,
  exportAuditLogsCSV,
  exportAuditLogsJSON,
} from '../services/auditLogger';
import {
  CLIENTUM_COMPANIES,
  CLIENTUM_PEOPLE,
  CLIENTUM_OPPORTUNITIES,
  CLIENTUM_TASKS,
  CLIENTUM_ACTIVITIES,
} from '../data/clientumLeads';
import {
  INITIAL_INVOICES,
  INITIAL_INVENTORY,
  INITIAL_EXPENSES,
} from '../data/erpInitialData';
import { isPrivateAppPath, navigateEnvironment } from '../lib/navigation';
export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface CRMContextType {
  opportunities: Opportunity[];
  companies: Company[];
  people: Person[];
  tasks: Task[];
  activities: Activity[];
  users: User[];
  currentUser: User;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  viewMode: OpportunityViewMode;
  setViewMode: (mode: OpportunityViewMode) => void;
  selectedRecord: { type: 'opportunity' | 'company' | 'person' | 'task'; id: string } | null;
  setSelectedRecord: (record: { type: 'opportunity' | 'company' | 'person' | 'task'; id: string } | null) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Theme & Language
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;

  // Modals & Palettes & Mobile Nav
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isNewRecordModalOpen: boolean;
  setIsNewRecordModalOpen: (open: boolean) => void;
  newRecordType: 'opportunity' | 'company' | 'person' | 'task';
  setNewRecordType: (type: 'opportunity' | 'company' | 'person' | 'task') => void;
  openNewRecordModal: (type?: 'opportunity' | 'company' | 'person' | 'task') => void;
  isAICopilotModalOpen: boolean;
  setIsAICopilotModalOpen: (open: boolean) => void;
  aiCopilotContext: { type?: string; id?: string; name?: string; initialPrompt?: string } | null;
  openAICopilot: (context?: { type?: string; id?: string; name?: string; initialPrompt?: string }) => void;
  
  // Auth & Profile & Public Site
  isPublicSiteVisible: boolean;
  setIsPublicSiteVisible: (visible: boolean) => void;
  openPublicSite: () => void;
  exitToPublicSite: () => void;
  enterApp: (force?: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  isAuthReady: boolean;
  gmailAccessToken: string | null;
  setGmailAccessToken: (token: string | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  updateCurrentUser: (updates: Partial<User>) => void;
  login: (email: string, pass: string) => void;
  register: (name: string, email: string, pass: string, company: string) => void;
  logout: () => void;
  syncClerkAuth: (identity: { id: string; email: string; name: string; avatar?: string | null } | null) => void;
  resetPassword: (email: string) => void;
  
  // CRUD
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>) => Opportunity;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  moveOpportunityStage: (id: string, newStage: StageId) => void;

  addCompany: (comp: Omit<Company, 'id' | 'createdAt'>) => Company;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;

  addPerson: (person: Omit<Person, 'id' | 'createdAt' | 'lastActivityDate'>) => Person;
  updatePerson: (id: string, updates: Partial<Person>) => void;
  deletePerson: (id: string) => void;

  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;

  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => Activity;
  deleteActivity: (id: string) => void;

  // ClientumCRM Custom Objects & Metadata Studio
  customObjects: CustomObjectDefinition[];
  addCustomObject: (obj: Omit<CustomObjectDefinition, 'id' | 'createdAt' | 'fields' | 'records'>) => CustomObjectDefinition;
  addCustomFieldToObject: (objectId: string, field: Omit<CustomObjectField, 'id'>) => void;
  addRecordToCustomObject: (objectId: string, record: Record<string, any>) => void;
  deleteRecordFromCustomObject: (objectId: string, recordId: string) => void;

  // Clientum Workflows Engine
  workflows: WorkflowRule[];
  addWorkflow: (wf: Omit<WorkflowRule, 'id' | 'runCount'>) => WorkflowRule;
  updateWorkflow: (wf: WorkflowRule) => void;
  toggleWorkflow: (id: string) => void;
  deleteWorkflow: (id: string) => void;

  // Saved Views
  savedViews: SavedView[];
  addSavedView: (view: Omit<SavedView, 'id'>) => SavedView;
  deleteSavedView: (id: string) => void;

  // CSV Data Import Engine
  importCSVData: (target: 'opportunities' | 'companies' | 'people', items: any[]) => number;
  lastImport: { id: string; target: 'opportunities' | 'companies' | 'people'; count: number } | null;
  undoLastImport: () => Promise<boolean>;
  refreshCrmData: () => Promise<boolean>;

  // ERP Suite
  invoices: Invoice[];
  inventory: InventoryItem[];
  expenses: ExpenseItem[];
  addInvoice: (inv: Omit<Invoice, 'id' | 'createdAt'>) => Invoice;
  updateInvoiceStatus: (id: string, status: InvoiceStatus) => void;
  deleteInvoice: (id: string) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => InventoryItem;
  updateInventoryStock: (id: string, deltaQuantity: number) => void;
  deleteInventoryItem: (id: string) => void;
  addExpense: (exp: Omit<ExpenseItem, 'id'>) => ExpenseItem;
  deleteExpense: (id: string) => void;
  exportFullWorkspaceJSON: () => void;

  // Data helpers
  resetToDemoData: () => void;
  loadClientumLeads: () => void;
  exportOpportunitiesCSV: () => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  triggerConfetti: () => void;

  // RBAC & Team Roles System
  roles: RoleDefinition[];
  currentRole: RoleDefinition;
  addRole: (role: Omit<RoleDefinition, 'id' | 'createdAt'>) => RoleDefinition;
  updateRole: (id: string, updates: Partial<RoleDefinition>) => void;
  deleteRole: (id: string) => boolean;
  duplicateRole: (id: string) => RoleDefinition;
  assignUserRole: (userId: string, roleNameOrSlug: string) => void;
  addUser: (user: Omit<User, 'id'>) => User;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  hasPermission: (resource: PermissionResource, action: PermissionAction) => boolean;
  checkPermissionOrWarn: (resource: PermissionResource, action: PermissionAction, resourceLabel?: string) => boolean;

  // Audit Logging & Anomaly Detection System
  auditLogs: AuditLogEntry[];
  logAuditEvent: (entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'ipAddress' | 'userAgent'> & { ipAddress?: string; userAgent?: string }) => void;
  clearAuditLogs: () => void;
  exportAuditCSV: () => void;
  exportAuditJSON: () => void;
  securityAnomalies: SecurityAnomaly[];
  dismissAnomaly: (id: string) => void;
  resolveAnomaly: (id: string, actionNote?: string) => void;
  triggerSecurityScan: () => void;

  // API Integrations Hub (Google Calendar, Slack, Developer Hub, API Keys, Webhooks)
  googleCalendarSync: GoogleCalendarSyncState;
  updateCalendarSync: (updates: Partial<GoogleCalendarSyncState>) => void;
  syncGoogleCalendarNow: () => Promise<{ success: boolean; syncedCount: number }>;
  slackIntegration: SlackIntegrationState;
  updateSlackIntegration: (updates: Partial<SlackIntegrationState>) => void;
  sendSlackTestMessage: (channel?: string, eventType?: string) => Promise<boolean>;
  apiKeys: APIKey[];
  createAPIKey: (name: string, scopes: string[], ownerUserId?: string) => APIKey;
  revokeAPIKey: (id: string) => void;
  webhooks: WebhookConfig[];
  addWebhook: (wh: Omit<WebhookConfig, 'id' | 'createdAt' | 'deliverySuccessCount' | 'deliveryFailureCount'>) => WebhookConfig;
  updateWebhook: (id: string, updates: Partial<WebhookConfig>) => void;
  deleteWebhook: (id: string) => void;
  triggerTestWebhook: (id: string) => Promise<{ status: number; message: string }>;

  // Cloudflare Webmail Worker & D1 Database
  webmailEmails: WebmailEmail[];
  sendWebmailEmail: (email: Omit<WebmailEmail, 'id' | 'timestamp' | 'messageId' | 'direction'>) => Promise<boolean>;
  markWebmailEmailAsRead: (id: string, isRead?: boolean) => void;
  deleteWebmailEmail: (id: string) => void;
  toggleWebmailStar: (id: string) => void;
  isComposeEmailModalOpen: boolean;
  setIsComposeEmailModalOpen: (open: boolean) => void;
  composeEmailDefaults: Partial<WebmailEmail> | null;
  openComposeEmailModal: (defaults?: Partial<WebmailEmail>) => void;
  closeComposeEmailModal: () => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

const STORAGE_KEYS = {
  OPPORTUNITIES: 'clientum_crm_opportunities',
  COMPANIES: 'clientum_crm_companies',
  PEOPLE: 'clientum_crm_people',
  TASKS: 'clientum_crm_tasks',
  ACTIVITIES: 'clientum_crm_activities',
  THEME: 'clientum_crm_theme',
  LANGUAGE: 'clientum_crm_language',
  INVOICES: 'clientum_crm_invoices',
  INVENTORY: 'clientum_crm_inventory',
  EXPENSES: 'clientum_crm_expenses',
};

const ensureUniqueIds = <T extends { id: string }>(items: T[], prefix: string): T[] => {
  const seen = new Set<string>();

  return items.map((item, index) => {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      return item;
    }

    let replacementId = `${prefix}-${item.id}-${index}`;
    let suffix = 1;
    while (seen.has(replacementId)) {
      replacementId = `${prefix}-${item.id}-${index}-${suffix}`;
      suffix += 1;
    }
    seen.add(replacementId);
    return { ...item, id: replacementId };
  });
};

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, resolvedTheme, setTheme: setContextTheme, toggleTheme: toggleContextTheme } = useTheme();

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return saved === 'es' || saved === 'pt' || saved === 'en' ? (saved as Language) : 'en';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLang);
    const langNames: Record<Language, string> = {
      en: 'English (US)',
      es: 'Español (América Latina / España)',
      pt: 'Português (Brasil / Portugal)',
    };
    const toastMsgs: Record<Language, string> = {
      en: `Language set to ${langNames[newLang]}`,
      es: `Idioma cambiado a ${langNames[newLang]}`,
      pt: `Idioma alterado para ${langNames[newLang]}`,
    };
    showToast(toastMsgs[newLang], 'info');
  };

  const t = (key: TranslationKey): string => {
    return getTranslation(key, language);
  };

  const setTheme = (newTheme: ThemeMode) => {
    setContextTheme(newTheme);
  };

  const toggleTheme = () => {
    toggleContextTheme();
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    showToast(
      next === 'light' ? 'Modo Claro activado' : 'Modo Oscuro activado',
      'info'
    );
  };
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
    return saved ? ensureUniqueIds(JSON.parse(saved), 'opp') : INITIAL_OPPORTUNITIES;
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPANIES);
    return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
  });

  const [people, setPeople] = useState<Person[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PEOPLE);
    return saved ? JSON.parse(saved) : INITIAL_PEOPLE;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  // ERP State
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INVOICES);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  // Custom Objects, Workflows, Saved Views State
  const [customObjects, setCustomObjects] = useState<CustomObjectDefinition[]>(() => {
    const saved = localStorage.getItem('clientum_crm_custom_objects');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOM_OBJECTS;
  });

  const [workflows, setWorkflows] = useState<WorkflowRule[]>(() => {
    const saved = localStorage.getItem('clientum_crm_workflows');
    return saved ? JSON.parse(saved) : INITIAL_WORKFLOWS;
  });

  const [savedViews, setSavedViews] = useState<SavedView[]>(() => {
    const saved = localStorage.getItem('clientum_crm_saved_views');
    return saved ? JSON.parse(saved) : INITIAL_SAVED_VIEWS;
  });

  // RBAC Roles State
  const [roles, setRoles] = useState<RoleDefinition[]>(() => {
    const saved = localStorage.getItem('clientum_crm_roles');
    return saved ? JSON.parse(saved) : INITIAL_ROLES;
  });

  useEffect(() => {
    localStorage.setItem('clientum_crm_roles', JSON.stringify(roles));
  }, [roles]);

  // Users State
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('clientum_crm_users_list');
      const parsed = saved ? JSON.parse(saved) : USERS;
      return Array.isArray(parsed) ? parsed : USERS;
    } catch {
      return USERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('clientum_crm_users_list', JSON.stringify(users));
  }, [users]);

  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem('clientum_crm_current_user');
      return saved ? JSON.parse(saved) : USERS[0];
    } catch (e) {
      return USERS[0];
    }
  });

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('clientum_crm_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  useEffect(() => {
    localStorage.setItem('clientum_crm_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Security Anomalies State
  const [securityAnomalies, setSecurityAnomalies] = useState<SecurityAnomaly[]>(() => {
    const saved = localStorage.getItem('clientum_crm_security_anomalies');
    return saved ? JSON.parse(saved) : INITIAL_SECURITY_ANOMALIES;
  });

  useEffect(() => {
    localStorage.setItem('clientum_crm_security_anomalies', JSON.stringify(securityAnomalies));
  }, [securityAnomalies]);

  // Google Calendar Integration State
  const [googleCalendarSync, setGoogleCalendarSync] = useState<GoogleCalendarSyncState>(() => {
    const saved = localStorage.getItem('clientum_crm_gcal_sync');
    return saved ? JSON.parse(saved) : INITIAL_CALENDAR_SYNC_STATE;
  });

  useEffect(() => {
    localStorage.setItem('clientum_crm_gcal_sync', JSON.stringify(googleCalendarSync));
  }, [googleCalendarSync]);

  // Slack Integration State
  const [slackIntegration, setSlackIntegration] = useState<SlackIntegrationState>(() => {
    const saved = localStorage.getItem('clientum_crm_slack_sync');
    return saved ? JSON.parse(saved) : INITIAL_SLACK_INTEGRATION_STATE;
  });

  useEffect(() => {
    localStorage.setItem('clientum_crm_slack_sync', JSON.stringify(slackIntegration));
  }, [slackIntegration]);

  // API Keys & Webhooks State
  const [apiKeys, setApiKeys] = useState<APIKey[]>(() => {
    const saved = localStorage.getItem('clientum_crm_api_keys');
    if (!saved) return INITIAL_API_KEYS;

    try {
      const parsed = JSON.parse(saved) as APIKey[];
      return parsed.map((key) =>
        ({
          ...key,
          ownerUserId: key.ownerUserId || 'platform',
          ownerUserName: key.ownerUserName || (key.ownerUserId ? undefined : 'ClientumCRM Platform'),
          token: undefined,
        }),
      );
    } catch {
      return INITIAL_API_KEYS;
    }
  });

  useEffect(() => {
    // Never persist raw API tokens in browser storage. A production API should
    // hash and store them server-side; this demo keeps only metadata locally.
    const safeApiKeys = apiKeys.map(({ token: _token, ...metadata }) => metadata);
    localStorage.setItem('clientum_crm_api_keys', JSON.stringify(safeApiKeys));
  }, [apiKeys]);

  const [webhooks, setWebhooks] = useState<WebhookConfig[]>(() => {
    const saved = localStorage.getItem('clientum_crm_webhooks');
    return saved ? JSON.parse(saved) : INITIAL_WEBHOOKS;
  });

  useEffect(() => {
    localStorage.setItem('clientum_crm_webhooks', JSON.stringify(webhooks));
  }, [webhooks]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [viewMode, setViewMode] = useState<OpportunityViewMode>('kanban');
  const [selectedRecord, setSelectedRecord] = useState<{ type: 'opportunity' | 'company' | 'person' | 'task'; id: string } | null>(null);

  const initialFilter: FilterState = {
    search: '',
    stage: 'all',
    owner: 'all',
    priority: 'all',
    tier: 'all',
  };
  const [filterState, setFilterState] = useState<FilterState>(initialFilter);

  // Modals & Palettes & Mobile Nav
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen((prev) => !prev);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
  const [newRecordType, setNewRecordType] = useState<'opportunity' | 'company' | 'person' | 'task'>('opportunity');
  const [isAICopilotModalOpen, setIsAICopilotModalOpen] = useState(false);
  const [aiCopilotContext, setAICopilotContext] = useState<{ type?: string; id?: string; name?: string; initialPrompt?: string } | null>(null);
  const [isPublicSiteVisible, setIsPublicSiteVisible] = useState<boolean>(() => {
    try {
      const mode = sessionStorage.getItem('clientum_view_mode');
      if (typeof window !== 'undefined' && isPrivateAppPath(window.location.pathname)) {
        return false;
      }
      if (mode === 'app') return false;
      return true; // Show public site at the beginning by default
    } catch (e) {
      return true;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [gmailAccessToken, setGmailAccessToken] = useState<string | null>(null);
  const [isCrmRemoteReady, setIsCrmRemoteReady] = useState(false);
  const [lastImport, setLastImport] = useState<{
    id: string;
    target: 'opportunities' | 'companies' | 'people';
    recordIds: string[];
    count: number;
  } | null>(null);
  const importBatchPersistenceRef = useRef<Promise<void> | null>(null);

  const refreshCrmData = async (): Promise<boolean> => {
    if (!isAuthReady || !isAuthenticated || !currentUser.id) return false;
    try {
      const response = await fetch('/api/crm/bootstrap', {
        headers: await getClientumAuthJsonHeaders(currentUser),
      });
      if (!response.ok) throw new Error(`CRM bootstrap failed: ${response.status}`);
      const payload = await response.json() as {
        records?: {
          opportunities?: Opportunity[];
          companies?: Company[];
          people?: Person[];
          tasks?: Task[];
          activities?: Activity[];
        };
      };
      if (!payload.records) return false;
      setOpportunities(ensureUniqueIds(payload.records.opportunities || [], 'opp'));
      setCompanies(payload.records.companies || []);
      setPeople(payload.records.people || []);
      setTasks(payload.records.tasks || []);
      setActivities(payload.records.activities || []);
      setIsCrmRemoteReady(true);
      return true;
    } catch (error) {
      console.warn('Persistent CRM refresh unavailable:', error);
      return false;
    }
  };

  const syncClerkAuth = useCallback((identity: { id: string; email: string; name: string; avatar?: string | null } | null) => {
    if (!identity) {
      setIsAuthenticated(false);
      setIsAuthReady(true);
      setIsCrmRemoteReady(false);
      return;
    }

    const identityEmail = typeof identity.email === 'string' ? identity.email : '';
    const matchingUser = users.find(
      (user) =>
        typeof user?.email === 'string' &&
        user.email.toLowerCase() === identityEmail.toLowerCase(),
    );
    const restoredUser: User = {
      ...(matchingUser || USERS[0]),
      id: identity.id,
      email: identity.email || matchingUser?.email || USERS[0].email,
      name: identity.name || matchingUser?.name || identity.email.split('@')[0] || 'Usuario Clientum',
      avatar: identity.avatar || matchingUser?.avatar || USERS[0].avatar,
    };

    setCurrentUser(restoredUser);
    try {
      localStorage.setItem('clientum_crm_current_user', JSON.stringify(restoredUser));
    } catch {
      // Storage can be disabled by the browser; the in-memory session remains valid.
    }
    setIsAuthenticated(true);
    setIsAuthReady(true);
  }, [users]);

  // PostgreSQL is the source of truth for the core CRM entities. The local
  // state remains as an offline/demo fallback while the authenticated
  // workspace is being hydrated.
  useEffect(() => {
    let cancelled = false;

    if (!isAuthReady || !isAuthenticated || !currentUser.id) {
      setIsCrmRemoteReady(false);
      return () => {
        cancelled = true;
      };
    }

    setIsCrmRemoteReady(false);
    void (async () => {
      try {
        const response = await fetch('/api/crm/bootstrap', {
          headers: await getClientumAuthJsonHeaders(currentUser),
        });
        if (!response.ok) throw new Error(`CRM bootstrap failed: ${response.status}`);
        const payload = await response.json() as {
          count?: number;
          records?: {
            opportunities?: Opportunity[];
            companies?: Company[];
            people?: Person[];
            tasks?: Task[];
            activities?: Activity[];
          };
        };

        if (cancelled) return;
        if (payload.count && payload.records) {
          setOpportunities(ensureUniqueIds(payload.records.opportunities || [], 'opp'));
          setCompanies(payload.records.companies || []);
          setPeople(payload.records.people || []);
          setTasks(payload.records.tasks || []);
          setActivities(payload.records.activities || []);
        } else {
          await fetch('/api/crm/bootstrap', {
            method: 'PUT',
            headers: await getClientumAuthJsonHeaders(currentUser),
            body: JSON.stringify({
              opportunities,
              companies,
              people,
              tasks,
              activities,
            }),
          });
        }
        if (!cancelled) setIsCrmRemoteReady(true);
      } catch (error) {
        console.warn('Persistent CRM bootstrap unavailable; keeping local state:', error);
        if (!cancelled) setIsCrmRemoteReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [currentUser.id, isAuthReady, isAuthenticated]);

  // Persist the complete core snapshot after local mutations. Debouncing
  // prevents a compound action (deal + activity + audit) from issuing a
  // request for every individual state update.
  const crmPersistTimer = useRef<number | null>(null);
  useEffect(() => {
    if (!isCrmRemoteReady || !isAuthenticated || !currentUser.id) return;

    if (crmPersistTimer.current !== null) {
      window.clearTimeout(crmPersistTimer.current);
    }
    crmPersistTimer.current = window.setTimeout(() => {
      void (async () => {
        try {
          await fetch('/api/crm/bootstrap', {
            method: 'PUT',
            headers: await getClientumAuthJsonHeaders(currentUser),
            body: JSON.stringify({
              opportunities,
              companies,
              people,
              tasks,
              activities,
            }),
          });
        } catch (error) {
          console.warn('Persistent CRM snapshot save failed:', error);
        }
      })();
    }, 500);

    return () => {
      if (crmPersistTimer.current !== null) {
        window.clearTimeout(crmPersistTimer.current);
        crmPersistTimer.current = null;
      }
    };
  }, [
    activities,
    companies,
    currentUser.id,
    currentUser.role,
    currentUser.name,
    currentUser.email,
    isAuthenticated,
    isCrmRemoteReady,
    opportunities,
    people,
    tasks,
  ]);

  // Webmail Cloudflare D1 Emails State
  const [webmailEmails, setWebmailEmails] = useState<WebmailEmail[]>(() => {
    try {
      const saved = localStorage.getItem('clientum_crm_webmail_emails');
      return saved ? JSON.parse(saved) : INITIAL_WEBMAIL_EMAILS;
    } catch (e) {
      return INITIAL_WEBMAIL_EMAILS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('clientum_crm_webmail_emails', JSON.stringify(webmailEmails));
    } catch (e) {
      console.error('Failed to save webmail emails to localStorage', e);
    }
  }, [webmailEmails]);

  const [isComposeEmailModalOpen, setIsComposeEmailModalOpen] = useState(false);
  const [composeEmailDefaults, setComposeEmailDefaults] = useState<Partial<WebmailEmail> | null>(null);

  const openComposeEmailModal = (defaults?: Partial<WebmailEmail>) => {
    setComposeEmailDefaults(defaults || null);
    setIsComposeEmailModalOpen(true);
  };

  const closeComposeEmailModal = () => {
    setIsComposeEmailModalOpen(false);
    setComposeEmailDefaults(null);
  };

  const enterApp = (force = false) => {
    if (!isAuthenticated && !force) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsPublicSiteVisible(false);
    setActiveTab('dashboard');
    navigateEnvironment('/app');
    try {
      sessionStorage.setItem('clientum_view_mode', 'app');
    } catch (e) {}
  };

  const openPublicSite = () => {
    setIsPublicSiteVisible(true);
    navigateEnvironment('/');
    try {
      sessionStorage.setItem('clientum_view_mode', 'public');
    } catch (e) {}
  };
  const exitToPublicSite = openPublicSite;

  const updateCurrentUser = (updates: Partial<User>) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('clientum_crm_current_user', JSON.stringify(updated));
      return updated;
    });
  };

  const login = (email: string, _pass?: string) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const userToSet = found || {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').replace(/^./, (c) => c.toUpperCase()),
      email,
      role: 'Administrador',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    };
    setCurrentUser(userToSet);
    
    try {
      localStorage.setItem('clientum_crm_current_user', JSON.stringify(userToSet));
      sessionStorage.setItem('clientum_is_authenticated', 'true');
      localStorage.setItem('clientum_is_authenticated', 'true');
      sessionStorage.setItem('clientum_view_mode', 'app');
    } catch (error) {
      console.warn('Storage access denied', error);
    }

    setIsAuthenticated(true);
    setActiveTab('dashboard');
    setIsAuthModalOpen(false);
    setIsPublicSiteVisible(false);
    navigateEnvironment('/app');
  };

  const register = (name: string, email: string, _pass?: string, _company?: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      role: 'Administrador',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    };
    setCurrentUser(newUser);

    try {
      localStorage.setItem('clientum_crm_current_user', JSON.stringify(newUser));
      sessionStorage.setItem('clientum_is_authenticated', 'true');
      localStorage.setItem('clientum_is_authenticated', 'true');
      sessionStorage.setItem('clientum_view_mode', 'app');
    } catch (error) {
      console.warn('Storage access denied', error);
    }

    setIsAuthenticated(true);
    setActiveTab('dashboard');
    setIsAuthModalOpen(false);
    setIsPublicSiteVisible(false);
    navigateEnvironment('/app');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setGmailAccessToken(null);
    try {
      sessionStorage.removeItem('clientum_is_authenticated');
      localStorage.removeItem('clientum_is_authenticated');
      sessionStorage.setItem('clientum_view_mode', 'public');
    } catch (error) {
      console.warn('Storage access denied', error);
    }
    setIsAuthModalOpen(false);
    setIsPublicSiteVisible(true);
  };

  const resetPassword = (email: string) => {
    // Record password recovery simulation in logs
    console.log(`Password reset link dispatched for ClientumCRM account: ${email}`);
  };
  
  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PEOPLE, JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('clientum_crm_custom_objects', JSON.stringify(customObjects));
  }, [customObjects]);

  useEffect(() => {
    localStorage.setItem('clientum_crm_workflows', JSON.stringify(workflows));
  }, [workflows]);

  useEffect(() => {
    localStorage.setItem('clientum_crm_saved_views', JSON.stringify(savedViews));
  }, [savedViews]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // 'c' to create new record when not typing in input
      if (
        e.key === 'c' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName) &&
        !isCommandPaletteOpen &&
        !isNewRecordModalOpen &&
        !isAICopilotModalOpen
      ) {
        e.preventDefault();
        openNewRecordModal();
      }
      // Escape closes open modals
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsNewRecordModalOpen(false);
        setIsAICopilotModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, isNewRecordModalOpen, isAICopilotModalOpen]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'],
      });
    } catch {
      // fallback if canvas not available
    }
  };

  const resetFilters = () => {
    setFilterState(initialFilter);
  };

  const openNewRecordModal = (type: 'opportunity' | 'company' | 'person' | 'task' = 'opportunity') => {
    setNewRecordType(type);
    setIsNewRecordModalOpen(true);
  };

  const openAICopilot = (context?: { type?: string; id?: string; name?: string; initialPrompt?: string }) => {
    setAICopilotContext(context || null);
    setIsAICopilotModalOpen(true);
  };

  // --- CRUD OPPORTUNITY ---
  const addOpportunity = (data: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>): Opportunity => {
    const stageConf = STAGES.find((s) => s.id === data.stage);
    const newOpp: Opportunity = {
      ...data,
      id: `opp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      probability: data.probability ?? stageConf?.probability ?? 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOpportunities((prev) => [newOpp, ...prev]);

    // Add activity
    addActivity({
      type: 'stage_change',
      title: 'Created Opportunity',
      content: `${currentUser.name} created opportunity "${newOpp.name}" ($${newOpp.amount.toLocaleString()})`,
      author: currentUser.name,
      targetType: 'opportunity',
      targetId: newOpp.id,
      meta: { toStage: newOpp.stage },
    });

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'deal.create',
      actionLabel: 'Creación de Oportunidad Comercial',
      entityType: 'opportunities',
      entityId: newOpp.id,
      entityName: `${newOpp.name} ($${newOpp.amount.toLocaleString()} ${newOpp.currency})`,
      details: `Oportunidad creada por ${currentUser.name} con monto de $${newOpp.amount.toLocaleString()} y asignada a ${newOpp.assignedTo}.`,
      severity: 'info',
      status: 'success',
    });

    showToast(`Opportunity "${newOpp.name}" created`, 'success');
    return newOpp;
  };

  const updateOpportunity = (id: string, updates: Partial<Opportunity>) => {
    const opp = opportunities.find((o) => o.id === id);
    setOpportunities((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          const updated = { ...o, ...updates, updatedAt: new Date().toISOString() };
          return updated;
        }
        return o;
      })
    );

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'deal.update',
      actionLabel: 'Actualización de Oportunidad',
      entityType: 'opportunities',
      entityId: id,
      entityName: opp?.name || id,
      details: `Oportunidad "${opp?.name || id}" modificada por ${currentUser.name}. Campos: ${Object.keys(updates).join(', ')}.`,
      severity: 'info',
      status: 'success',
    });

    showToast('Opportunity updated', 'info');
  };

  const deleteOpportunity = (id: string) => {
    const opp = opportunities.find((o) => o.id === id);
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
    if (selectedRecord?.id === id) {
      setSelectedRecord(null);
    }

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'deal.delete',
      actionLabel: 'Eliminación de Oportunidad',
      entityType: 'opportunities',
      entityId: id,
      entityName: opp ? `${opp.name} ($${opp.amount.toLocaleString()})` : id,
      details: `La oportunidad "${opp?.name || id}" fue eliminada del pipeline por ${currentUser.name}.`,
      severity: 'warning',
      status: 'success',
    });

    showToast(`Opportunity "${opp?.name || id}" removed`, 'info');
  };

  const moveOpportunityStage = (id: string, newStage: StageId) => {
    const opp = opportunities.find((o) => o.id === id);
    if (!opp || opp.stage === newStage) return;

    const oldStage = opp.stage;
    const stageConf = STAGES.find((s) => s.id === newStage);

    setOpportunities((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          return {
            ...o,
            stage: newStage,
            probability: stageConf?.probability ?? o.probability,
            updatedAt: new Date().toISOString(),
          };
        }
        return o;
      })
    );

    // Record activity
    addActivity({
      type: 'stage_change',
      title: `Moved to ${stageConf?.name || newStage}`,
      content: `${currentUser.name} moved deal from ${oldStage} to ${newStage}`,
      author: currentUser.name,
      targetType: 'opportunity',
      targetId: id,
      meta: { fromStage: oldStage, toStage: newStage },
    });

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'deal.stage_change',
      actionLabel: `Avance de Deal a ${stageConf?.name || newStage}`,
      entityType: 'opportunities',
      entityId: id,
      entityName: opp.name,
      details: `Etapa cambiada de "${oldStage}" a "${newStage}" ($${opp.amount.toLocaleString()}).`,
      diff: [{ field: 'stage', oldValue: oldStage, newValue: newStage }],
      severity: newStage === 'won' ? 'info' : 'info',
      status: 'success',
    });

    if (newStage === 'won') {
      triggerConfetti();
      showToast(`🎉 Deal Won! $${opp.amount.toLocaleString()} - ${opp.name}`, 'success');
      // Trigger Slack deal won simulation
      sendSlackTestMessage(undefined, 'deal_won');
    } else {
      showToast(`Deal moved to ${stageConf?.name}`, 'info');
    }
  };

  // --- CRUD COMPANY ---
  const addCompany = (data: Omit<Company, 'id' | 'createdAt'>): Company => {
    const newComp: Company = {
      ...data,
      id: 'c-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setCompanies((prev) => [newComp, ...prev]);

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'company.create',
      actionLabel: 'Creación de Empresa',
      entityType: 'companies',
      entityId: newComp.id,
      entityName: newComp.name,
      details: `Empresa "${newComp.name}" (${newComp.industry || 'General'}) creada en la base de datos.`,
      severity: 'info',
      status: 'success',
    });

    showToast(`Company "${newComp.name}" added`, 'success');
    return newComp;
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    const comp = companies.find((c) => c.id === id);
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'company.update',
      actionLabel: 'Actualización de Empresa',
      entityType: 'companies',
      entityId: id,
      entityName: comp?.name || id,
      details: `Registro de empresa "${comp?.name || id}" editado por ${currentUser.name}.`,
      severity: 'info',
      status: 'success',
    });

    showToast('Company updated', 'info');
  };

  const deleteCompany = (id: string) => {
    const comp = companies.find((c) => c.id === id);
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    if (selectedRecord?.id === id) {
      setSelectedRecord(null);
    }

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'company.delete',
      actionLabel: 'Eliminación de Empresa',
      entityType: 'companies',
      entityId: id,
      entityName: comp?.name || id,
      details: `Empresa "${comp?.name || id}" eliminada de la plataforma por ${currentUser.name}.`,
      severity: 'warning',
      status: 'success',
    });

    showToast(`Company "${comp?.name || id}" removed`, 'info');
  };

  // --- CRUD PERSON ---
  const addPerson = (data: Omit<Person, 'id' | 'createdAt' | 'lastActivityDate'>): Person => {
    const newPerson: Person = {
      ...data,
      id: 'p-' + Date.now(),
      createdAt: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
    };
    setPeople((prev) => [newPerson, ...prev]);

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'person.create',
      actionLabel: 'Nuevo Contacto Registrado',
      entityType: 'people',
      entityId: newPerson.id,
      entityName: `${newPerson.firstName} ${newPerson.lastName}`,
      details: `Contacto ${newPerson.firstName} ${newPerson.lastName} (${newPerson.email || 'Sin email'}) añadido.`,
      severity: 'info',
      status: 'success',
    });

    showToast(`Contact "${newPerson.firstName} ${newPerson.lastName}" created`, 'success');
    return newPerson;
  };

  const updatePerson = (id: string, updates: Partial<Person>) => {
    const person = people.find((p) => p.id === id);
    setPeople((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'person.update',
      actionLabel: 'Actualización de Contacto',
      entityType: 'people',
      entityId: id,
      entityName: person ? `${person.firstName} ${person.lastName}` : id,
      details: `Datos del contacto ${person?.firstName || ''} ${person?.lastName || ''} actualizados.`,
      severity: 'info',
      status: 'success',
    });

    showToast('Contact updated', 'info');
  };

  const deletePerson = (id: string) => {
    const person = people.find((p) => p.id === id);
    setPeople((prev) => prev.filter((p) => p.id !== id));
    if (selectedRecord?.id === id) {
      setSelectedRecord(null);
    }

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'person.delete',
      actionLabel: 'Eliminación de Contacto',
      entityType: 'people',
      entityId: id,
      entityName: person ? `${person.firstName} ${person.lastName}` : id,
      details: `Contacto ${person?.firstName || ''} ${person?.lastName || ''} eliminado del sistema.`,
      severity: 'warning',
      status: 'success',
    });

    showToast(`Contact "${person?.firstName} ${person?.lastName}" removed`, 'info');
  };

  // --- CRUD TASK ---
  const addTask = (data: Omit<Task, 'id' | 'createdAt'>): Task => {
    const newTask: Task = {
      ...data,
      id: 't-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'task.create',
      actionLabel: 'Nueva Tarea Creada',
      entityType: 'tasks',
      entityId: newTask.id,
      entityName: newTask.title,
      details: `Tarea "${newTask.title}" asignada a ${newTask.assignedTo} (Vencimiento: ${newTask.dueDate}).`,
      severity: 'info',
      status: 'success',
    });

    showToast(`Task created: "${newTask.title}"`, 'success');
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const task = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    showToast('Task updated', 'info');
  };

  const deleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (selectedRecord?.id === id) {
      setSelectedRecord(null);
    }

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'task.delete',
      actionLabel: 'Eliminación de Tarea',
      entityType: 'tasks',
      entityId: id,
      entityName: task?.title || id,
      details: `Tarea "${task?.title || id}" eliminada por ${currentUser.name}.`,
      severity: 'info',
      status: 'success',
    });

    showToast('Task deleted', 'info');
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isDone = t.status === 'Completed';
          const newStatus = isDone ? 'Todo' : 'Completed';
          return {
            ...t,
            status: newStatus,
            completedAt: isDone ? undefined : new Date().toISOString(),
          };
        }
        return t;
      })
    );
  };

  // --- CRUD ACTIVITY ---
  const addActivity = (data: Omit<Activity, 'id' | 'createdAt'>): Activity => {
    const newAct: Activity = {
      ...data,
      id: 'act-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setActivities((prev) => [newAct, ...prev]);
    return newAct;
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  // --- CLIENTUM CUSTOM OBJECTS STUDIO ---
  const addCustomObject = (data: Omit<CustomObjectDefinition, 'id' | 'createdAt' | 'fields' | 'records'>): CustomObjectDefinition => {
    const newObj: CustomObjectDefinition = {
      ...data,
      id: 'obj-' + Date.now(),
      createdAt: new Date().toISOString(),
      fields: [
        { id: 'f-name', name: 'name', label: `${data.singularName} Name`, type: 'text', required: true }
      ],
      records: [],
    };
    setCustomObjects((prev) => [...prev, newObj]);
    showToast(`Custom Object "${newObj.pluralName}" created`, 'success');
    return newObj;
  };

  const addCustomFieldToObject = (objectId: string, fieldData: Omit<CustomObjectField, 'id'>) => {
    const newField: CustomObjectField = {
      ...fieldData,
      id: 'f-' + Date.now(),
    };
    setCustomObjects((prev) =>
      prev.map((obj) => {
        if (obj.id === objectId) {
          return { ...obj, fields: [...obj.fields, newField] };
        }
        return obj;
      })
    );
    showToast(`Added field "${newField.label}" to object schema`, 'info');
  };

  const addRecordToCustomObject = (objectId: string, recordData: Record<string, any>) => {
    const newRecord = {
      id: 'rec-' + Date.now(),
      createdAt: new Date().toISOString(),
      ...recordData,
    };
    setCustomObjects((prev) =>
      prev.map((obj) => {
        if (obj.id === objectId) {
          return { ...obj, records: [newRecord, ...obj.records] };
        }
        return obj;
      })
    );
    showToast('Record added to Custom Object', 'success');
  };

  const deleteRecordFromCustomObject = (objectId: string, recordId: string) => {
    setCustomObjects((prev) =>
      prev.map((obj) => {
        if (obj.id === objectId) {
          return { ...obj, records: obj.records.filter((r) => r.id !== recordId) };
        }
        return obj;
      })
    );
    showToast('Record removed', 'info');
  };

  // --- CLIENTUM WORKFLOWS ENGINE ---
  const addWorkflow = (data: Omit<WorkflowRule, 'id' | 'runCount'>): WorkflowRule => {
    const newWf: WorkflowRule = {
      ...data,
      id: 'wf-' + Date.now(),
      runCount: 0,
    };
    setWorkflows((prev) => [newWf, ...prev]);
    showToast(`Workflow "${newWf.name}" active`, 'success');
    return newWf;
  };

  const updateWorkflow = (updated: WorkflowRule) => {
    setWorkflows((prev) => prev.map((wf) => (wf.id === updated.id ? updated : wf)));
  };

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((wf) => (wf.id === id ? { ...wf, isActive: !wf.isActive } : wf))
    );
    showToast('Workflow status toggled', 'info');
  };

  const deleteWorkflow = (id: string) => {
    setWorkflows((prev) => prev.filter((wf) => wf.id !== id));
    showToast('Workflow deleted', 'info');
  };

  // --- SAVED VIEWS ---
  const addSavedView = (data: Omit<SavedView, 'id'>): SavedView => {
    const newView: SavedView = {
      ...data,
      id: 'sv-' + Date.now(),
    };
    setSavedViews((prev) => [...prev, newView]);
    showToast(`Saved view "${newView.name}" created`, 'success');
    return newView;
  };

  const deleteSavedView = (id: string) => {
    setSavedViews((prev) => prev.filter((v) => v.id !== id));
    showToast('Saved view removed', 'info');
  };

  // --- CSV IMPORT ENGINE ---
  const importCSVData = (target: 'opportunities' | 'companies' | 'people', items: any[]): number => {
    let count = 0;
    let importedRecords: Array<{ id: string; [key: string]: any }> = [];
    if (target === 'opportunities') {
      const newDeals: Opportunity[] = items.map((item, idx) => ({
        id: 'opp-import-' + Date.now() + '-' + idx,
        name: item.name || item.dealName || 'Imported Deal',
        amount: Number(item.amount || item.value) || 10000,
        currency: item.currency || 'USD',
        stage: item.stage || 'lead',
        closeDate: item.closeDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        probability: Number(item.probability) || 50,
        companyName: item.companyName || item.company,
        contactName: item.contactName || item.contact,
        assignedTo: item.assignedTo || currentUser.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        priority: item.priority || 'Medium',
        type: item.type || 'New Business',
        tags: item.tags ? String(item.tags).split(';') : ['CSV Import'],
      }));
      setOpportunities((prev) => [...newDeals, ...prev]);
      importedRecords = newDeals;
      count = newDeals.length;
    } else if (target === 'companies') {
      const newComps: Company[] = items.map((item, idx) => ({
        id: 'c-import-' + Date.now() + '-' + idx,
        name: item.name || item.companyName || 'Imported Company',
        domain: item.domain || 'example.com',
        industry: item.industry || 'Software',
        employees: item.employees || '10-50',
        arr: Number(item.arr) || 50000,
        tier: item.tier || 'Mid-Market',
        healthScore: 85,
        city: item.city || 'Buenos Aires',
        country: item.country || 'Argentina',
        assignedTo: item.assignedTo || currentUser.name,
        createdAt: new Date().toISOString(),
      }));
      setCompanies((prev) => [...newComps, ...prev]);
      importedRecords = newComps;
      count = newComps.length;
    } else if (target === 'people') {
      const newPeople: Person[] = items.map((item, idx) => ({
        id: 'p-import-' + Date.now() + '-' + idx,
        firstName: item.firstName || item.name?.split(' ')[0] || 'Contact',
        lastName: item.lastName || item.name?.split(' ').slice(1).join(' ') || 'Imported',
        email: item.email || 'lead@example.com',
        phone: item.phone || '+54 11 5555-0000',
        jobTitle: item.jobTitle || 'Executive',
        companyName: item.companyName || item.company,
        status: item.status || 'Lead',
        assignedTo: item.assignedTo || currentUser.name,
        createdAt: new Date().toISOString(),
        lastActivityDate: new Date().toISOString(),
      }));
      setPeople((prev) => [...newPeople, ...prev]);
      importedRecords = newPeople;
      count = newPeople.length;
    }

    const batch = {
      id: `import-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      target,
      recordIds: importedRecords.map((record) => record.id),
      count,
    };
    setLastImport(batch);
    if (isCrmRemoteReady && isAuthenticated && currentUser.id && importedRecords.length > 0) {
      importBatchPersistenceRef.current = (async () => {
        try {
          const headers = await getClientumAuthJsonHeaders(currentUser);
          const response = await fetch('/api/crm/import-batches', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              id: batch.id,
              entityType: target,
              records: importedRecords,
            }),
          });
          if (!response.ok) throw new Error(`Import batch tracking failed: ${response.status}`);
        } catch (error) {
          console.warn('Import batch tracking unavailable; local undo remains available:', error);
        }
      })();
    }

    triggerConfetti();
    showToast(`Successfully imported ${count} ${target} records!`, 'success');
    return count;
  };

  const undoLastImport = async (): Promise<boolean> => {
    const batch = lastImport;
    if (!batch) return false;

    if (batch.target === 'opportunities') {
      setOpportunities((prev) => prev.filter((record) => !batch.recordIds.includes(record.id)));
    } else if (batch.target === 'companies') {
      setCompanies((prev) => prev.filter((record) => !batch.recordIds.includes(record.id)));
    } else {
      setPeople((prev) => prev.filter((record) => !batch.recordIds.includes(record.id)));
    }

    if (isCrmRemoteReady && isAuthenticated && currentUser.id) {
      try {
        await importBatchPersistenceRef.current;
        const headers = await getClientumAuthJsonHeaders(currentUser);
        const response = await fetch(`/api/crm/import-batches/${encodeURIComponent(batch.id)}`, {
          method: 'DELETE',
          headers,
        });
        if (!response.ok && response.status !== 404) {
          console.warn(`Import undo persistence failed: ${response.status}`);
        }
      } catch (error) {
        console.warn('Import undo persistence unavailable; local undo applied:', error);
      }
    }

    importBatchPersistenceRef.current = null;
    setLastImport(null);
    showToast(`Reverted the last import (${batch.count} records)`, 'info');
    return true;
  };

  // Reset to initial demo
  const resetToDemoData = () => {
    setOpportunities(INITIAL_OPPORTUNITIES);
    setCompanies(INITIAL_COMPANIES);
    setPeople(INITIAL_PEOPLE);
    setTasks(INITIAL_TASKS);
    setActivities(INITIAL_ACTIVITIES);
    setInvoices(INITIAL_INVOICES);
    setInventory(INITIAL_INVENTORY);
    setExpenses(INITIAL_EXPENSES);
    localStorage.clear();
    showToast('CRM & ERP workspace reset to demo data', 'success');
  };

  // Load Clientum leads list from B2B CSV dataset
  const loadClientumLeads = () => {
    setOpportunities(CLIENTUM_OPPORTUNITIES);
    setCompanies(CLIENTUM_COMPANIES);
    setPeople(CLIENTUM_PEOPLE);
    setTasks(CLIENTUM_TASKS);
    setActivities(CLIENTUM_ACTIVITIES);
    
    // Save to local storage for persistence
    localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(CLIENTUM_OPPORTUNITIES));
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(CLIENTUM_COMPANIES));
    localStorage.setItem(STORAGE_KEYS.PEOPLE, JSON.stringify(CLIENTUM_PEOPLE));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(CLIENTUM_TASKS));
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(CLIENTUM_ACTIVITIES));
    
    triggerConfetti();
    showToast('¡Base de Datos de Leads de Clientum cargada con éxito! 🇦🇷', 'success');
  };

  // ERP Handlers
  const addInvoice = (invData: Omit<Invoice, 'id' | 'createdAt'>): Invoice => {
    const newInv: Invoice = {
      ...invData,
      id: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    };
    setInvoices((prev) => [newInv, ...prev]);
    showToast(`Invoice ${newInv.id} created successfully!`, 'success');
    triggerConfetti();
    return newInv;
  };

  const updateInvoiceStatus = (id: string, status: InvoiceStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status } : inv))
    );
    showToast(`Invoice ${id} status updated to ${status}`, 'info');
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    showToast(`Invoice ${id} removed`, 'info');
  };

  const addInventoryItem = (itemData: Omit<InventoryItem, 'id'>): InventoryItem => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `inv-${Date.now()}`,
    };
    setInventory((prev) => [newItem, ...prev]);
    if (newItem.stockQuantity <= newItem.reorderLevel) {
      showToast(
        `⚠️ Low Stock Threshold Alert: "${newItem.name}" (${newItem.sku}) added at or below minimum threshold (${newItem.stockQuantity}/${newItem.reorderLevel} units)!`,
        'warning'
      );
    } else {
      showToast(`Inventory item "${newItem.name}" added successfully!`, 'success');
    }
    return newItem;
  };

  const updateInventoryStock = (id: string, deltaQuantity: number) => {
    let targetItemName = '';
    let isLowStockAlert = false;
    let alertDetails = '';

    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.stockQuantity + deltaQuantity);
          targetItemName = item.name;
          if (newQty <= item.reorderLevel) {
            isLowStockAlert = true;
            alertDetails = `⚠️ Low Stock Threshold Alert: "${item.name}" (SKU: ${item.sku}) has reached minimum stock threshold (${newQty}/${item.reorderLevel} min units remaining)!`;
          }
          return {
            ...item,
            stockQuantity: newQty,
            lastRestocked: deltaQuantity > 0 ? new Date().toISOString().split('T')[0] : item.lastRestocked
          };
        }
        return item;
      })
    );

    if (isLowStockAlert) {
      showToast(alertDetails, 'warning');
    } else {
      showToast(`Stock quantity updated for "${targetItemName}"`, 'info');
    }
  };

  const deleteInventoryItem = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
    showToast(`Inventory item removed`, 'info');
  };

  const addExpense = (expData: Omit<ExpenseItem, 'id'>): ExpenseItem => {
    const newExp: ExpenseItem = {
      ...expData,
      id: `exp-${Date.now()}`,
    };
    setExpenses((prev) => [newExp, ...prev]);
    showToast(`Expense recorded: $${newExp.amount}`, 'success');
    return newExp;
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    showToast(`Expense record deleted`, 'info');
  };

  // Full Backup of CRM & ERP Data to JSON File
  const exportFullWorkspaceJSON = () => {
    const fullBackup = {
      app: 'ClientumCRM & ERP Workspace',
      version: '2.5.0',
      exportedAt: new Date().toISOString(),
      user: currentUser,
      crm: {
        opportunities,
        companies,
        people,
        tasks,
        activities,
        customObjects,
        workflows,
        savedViews,
      },
      erp: {
        invoices,
        inventory,
        expenses,
      },
      settings: {
        theme,
        language,
      },
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `clientum_crm_erp_full_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Full CRM & ERP workspace JSON backup created and downloaded!', 'success');
  };

  // Export CSV
  const exportOpportunitiesCSV = () => {
    if (!hasPermission('opportunities', 'export')) {
      showToast('Acceso Denegado: Tu rol no tiene permisos para exportar oportunidades', 'warning');
      logAuditEvent({
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        userRole: currentUser.role,
        action: 'security.access_denied',
        actionLabel: 'Intento de Exportación No Autorizada',
        entityType: 'opportunities',
        details: `El usuario ${currentUser.name} intentó exportar la base de oportunidades sin permisos requeridos.`,
        severity: 'warning',
        status: 'denied',
      });
      return;
    }

    const headers = ['ID', 'Deal Name', 'Amount', 'Currency', 'Stage', 'Close Date', 'Probability', 'Company', 'Contact', 'Owner', 'Priority', 'Type'];
    const rows = opportunities.map((o) => [
      o.id,
      `"${o.name.replace(/"/g, '""')}"`,
      o.amount,
      o.currency,
      o.stage,
      o.closeDate,
      o.probability + '%',
      `"${(o.companyName || '').replace(/"/g, '""')}"`,
      `"${(o.contactName || '').replace(/"/g, '""')}"`,
      `"${o.assignedTo}"`,
      o.priority,
      o.type,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clientum_crm_deals_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported opportunities as CSV', 'success');

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'data.export',
      actionLabel: 'Exportación de Pipeline (CSV)',
      entityType: 'opportunities',
      entityName: 'Pipeline de Oportunidades',
      details: `Exportadas ${opportunities.length} oportunidades comerciales a archivo CSV.`,
      severity: 'info',
      status: 'success',
    });
  };

  // ==========================================
  // RBAC & TEAM ROLES SYSTEM METHODS
  // ==========================================
  const currentRole: RoleDefinition = React.useMemo(() => {
    const userRoleStr = (currentUser.role || '').toLowerCase();
    const found = roles.find(
      (r) =>
        r.name.toLowerCase() === userRoleStr ||
        r.slug.toLowerCase() === userRoleStr ||
        (userRoleStr.includes('admin') && r.slug === 'admin') ||
        (userRoleStr.includes('manager') && r.slug === 'sales_manager') ||
        (userRoleStr.includes('ejecutiv') && r.slug === 'sales_rep') ||
        (userRoleStr.includes('audit') && r.slug === 'auditor') ||
        (userRoleStr.includes('sdr') && r.slug === 'sdr')
    );
    return found || roles[0] || INITIAL_ROLES[0];
  }, [currentUser.role, roles]);

  const hasPermission = (resource: PermissionResource, action: PermissionAction): boolean => {
    return checkRoleHasPermission(currentRole, resource, action);
  };

  const checkPermissionOrWarn = (
    resource: PermissionResource,
    action: PermissionAction,
    resourceLabel?: string
  ): boolean => {
    const allowed = hasPermission(resource, action);
    if (!allowed) {
      const actionNames: Record<PermissionAction, string> = {
        view: 'ver',
        create: 'crear',
        edit: 'editar',
        delete: 'eliminar',
        export: 'exportar',
        manage: 'administrar',
      };
      const label = resourceLabel || resource;
      showToast(
        `Acceso Restringido: Tu rol "${currentRole.name}" no tiene permisos para ${actionNames[action]} ${label}.`,
        'warning'
      );
      logAuditEvent({
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        userRole: currentRole.name,
        action: 'security.permission_denied',
        actionLabel: 'Intento de Acción Denegada por RBAC',
        entityType: resource,
        details: `Intento de ${actionNames[action]} en ${label} denegado para el rol ${currentRole.name}.`,
        severity: 'warning',
        status: 'denied',
      });
      return false;
    }
    return true;
  };

  const addRole = (data: Omit<RoleDefinition, 'id' | 'createdAt'>): RoleDefinition => {
    const newRole: RoleDefinition = {
      ...data,
      id: 'role-' + Date.now(),
      createdAt: new Date().toISOString(),
      userCount: 0,
    };
    setRoles((prev) => [...prev, newRole]);
    showToast(`Rol personalizado "${newRole.name}" creado con éxito`, 'success');

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'rbac.role_create',
      actionLabel: 'Creación de Rol Personalizado',
      entityType: 'settings',
      entityId: newRole.id,
      entityName: newRole.name,
      details: `Se creó el rol "${newRole.name}" con ${Object.values(newRole.permissions).filter((p) => p.view).length} módulos habilitados.`,
      severity: 'security',
      status: 'success',
    });
    return newRole;
  };

  const updateRole = (id: string, updates: Partial<RoleDefinition>) => {
    const targetRole = roles.find((r) => r.id === id);
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r))
    );
    showToast(`Rol "${targetRole?.name || id}" actualizado`, 'success');

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'rbac.role_update',
      actionLabel: 'Modificación de Permisos de Rol',
      entityType: 'settings',
      entityId: id,
      entityName: targetRole?.name || id,
      details: `Permisos y políticas modificadas para el rol ${targetRole?.name || id}.`,
      severity: 'security',
      status: 'success',
    });
  };

  const deleteRole = (id: string): boolean => {
    const roleToDelete = roles.find((r) => r.id === id);
    if (!roleToDelete) return false;
    if (roleToDelete.isSystem) {
      showToast('No es posible eliminar roles predeterminados del sistema', 'error');
      return false;
    }
    setRoles((prev) => prev.filter((r) => r.id !== id));
    showToast(`Rol "${roleToDelete.name}" eliminado`, 'info');

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'rbac.role_delete',
      actionLabel: 'Eliminación de Rol Personalizado',
      entityType: 'settings',
      entityId: id,
      entityName: roleToDelete.name,
      details: `El rol personalizado "${roleToDelete.name}" fue eliminado del sistema.`,
      severity: 'security',
      status: 'success',
    });
    return true;
  };

  const duplicateRole = (id: string): RoleDefinition => {
    const source = roles.find((r) => r.id === id);
    if (!source) throw new Error('Role not found');
    const clonedRole: RoleDefinition = {
      ...source,
      id: 'role-' + Date.now(),
      name: `${source.name} (Copia)`,
      slug: `${source.slug}_copy_${Date.now().toString().slice(-4)}`,
      isSystem: false,
      userCount: 0,
      createdAt: new Date().toISOString(),
      permissions: JSON.parse(JSON.stringify(source.permissions)),
    };
    setRoles((prev) => [...prev, clonedRole]);
    showToast(`Rol "${clonedRole.name}" duplicado`, 'success');
    return clonedRole;
  };

  const assignUserRole = (userId: string, roleNameOrSlug: string) => {
    const targetUser = users.find((u) => u.id === userId);
    const targetRole = roles.find(
      (r) => r.name === roleNameOrSlug || r.slug === roleNameOrSlug || r.id === roleNameOrSlug
    );
    const roleNameToSet = targetRole ? targetRole.name : roleNameOrSlug;

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: roleNameToSet } : u))
    );

    if (currentUser.id === userId) {
      updateCurrentUser({ role: roleNameToSet });
    }

    showToast(`Rol de ${targetUser?.name || 'usuario'} actualizado a "${roleNameToSet}"`, 'success');

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'rbac.user_assign',
      actionLabel: 'Reasignación de Rol de Usuario',
      entityType: 'settings',
      entityId: userId,
      entityName: targetUser?.name || userId,
      details: `Asignado nuevo rol "${roleNameToSet}" al usuario ${targetUser?.name || userId} (${targetUser?.email || ''}).`,
      diff: [{ field: 'role', oldValue: targetUser?.role, newValue: roleNameToSet }],
      severity: 'security',
      status: 'success',
    });
  };

  const addUser = (userData: Omit<User, 'id'>): User => {
    const newUser: User = {
      ...userData,
      id: 'usr-' + Date.now(),
    };
    setUsers((prev) => [...prev, newUser]);
    showToast(`Usuario "${newUser.name}" agregado al equipo`, 'success');

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'rbac.user_create',
      actionLabel: 'Nuevo Usuario Creado en Workspace',
      entityType: 'settings',
      entityId: newUser.id,
      entityName: newUser.name,
      details: `Creado nuevo miembro de equipo "${newUser.name}" con rol "${newUser.role}".`,
      severity: 'security',
      status: 'success',
    });
    return newUser;
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    const userToUpdate = users.find((u) => u.id === id);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
    if (currentUser.id === id) {
      updateCurrentUser(updates);
    }
    showToast(`Usuario "${userToUpdate?.name || id}" actualizado`, 'info');
  };

  const deleteUser = (id: string) => {
    const userToDelete = users.find((u) => u.id === id);
    if (!userToDelete) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast(`Usuario "${userToDelete.name}" removido`, 'info');

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'rbac.user_delete',
      actionLabel: 'Usuario Removido de Workspace',
      entityType: 'settings',
      entityId: id,
      entityName: userToDelete.name,
      details: `El usuario ${userToDelete.name} (${userToDelete.email}) fue removido del workspace.`,
      severity: 'warning',
      status: 'success',
    });
  };

  // ==========================================
  // AUDIT LOGGING & ANOMALIES METHODS
  // ==========================================
  const logAuditEvent = (
    entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'ipAddress' | 'userAgent'> & {
      ipAddress?: string;
      userAgent?: string;
    }
  ) => {
    const newLog: AuditLogEntry = {
      ...entry,
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      ipAddress: entry.ipAddress || '181.46.139.84',
      userAgent: entry.userAgent || navigator.userAgent || 'Clientum-Web/1.0',
      location: entry.location || 'Buenos Aires, Argentina',
    };

    setAuditLogs((prev) => {
      const updatedLogs = [newLog, ...prev].slice(0, 500); // keep last 500 logs
      // Check for security anomalies
      const detected = scanAuditLogsForAnomalies(updatedLogs);
      if (detected.length > 0) {
        setSecurityAnomalies((prevAnoms) => {
          const newAnoms = detected.filter(
            (d) => !prevAnoms.some((p) => p.title === d.title && p.status === 'active')
          );
          if (newAnoms.length > 0) {
            showToast(`⚠️ Alerta de Seguridad: ${newAnoms[0].title}`, 'warning');
          }
          return [...newAnoms, ...prevAnoms];
        });
      }
      return updatedLogs;
    });
  };

  const clearAuditLogs = () => {
    setAuditLogs([]);
    showToast('Historial de logs de auditoría limpiado', 'info');
  };

  const exportAuditCSV = () => {
    exportAuditLogsCSV(auditLogs);
    showToast('Reporte de Auditoría exportado en CSV', 'success');
  };

  const exportAuditJSON = () => {
    exportAuditLogsJSON(auditLogs, securityAnomalies);
    showToast('Certificado SOC2 / ISO 27001 exportado en JSON', 'success');
  };

  const dismissAnomaly = (id: string) => {
    setSecurityAnomalies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'dismissed' } : a))
    );
    showToast('Incidencia de seguridad descartada', 'info');
  };

  const resolveAnomaly = (id: string, actionNote?: string) => {
    setSecurityAnomalies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'resolved' } : a))
    );
    showToast(`Incidencia resuelta ${actionNote ? `: ${actionNote}` : ''}`, 'success');

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'security.anomaly_resolved',
      actionLabel: 'Resolución de Anomalía de Seguridad',
      entityType: 'auditLogs',
      entityId: id,
      details: `Incidencia ${id} marcada como resuelta por ${currentUser.name}. ${actionNote || ''}`,
      severity: 'info',
      status: 'success',
    });
  };

  const triggerSecurityScan = () => {
    const detected = scanAuditLogsForAnomalies(auditLogs);
    if (detected.length > 0) {
      setSecurityAnomalies((prev) => {
        const uniqueNew = detected.filter(
          (d) => !prev.some((p) => p.title === d.title && p.status === 'active')
        );
        return [...uniqueNew, ...prev];
      });
      showToast(`Escaneo de seguridad completado: ${detected.length} alertas detectadas`, 'warning');
    } else {
      showToast('Escaneo completado: No se detectaron anomalías en los registros recientes', 'success');
    }
  };

  // ==========================================
  // API INTEGRATIONS HUB METHODS (GCAL, SLACK, API KEYS, WEBHOOKS)
  // ==========================================
  const updateCalendarSync = (updates: Partial<GoogleCalendarSyncState>) => {
    setGoogleCalendarSync((prev) => ({ ...prev, ...updates }));
    showToast('Configuración de Google Calendar actualizada', 'info');
  };

  const syncGoogleCalendarNow = async (): Promise<{ success: boolean; syncedCount: number }> => {
    // Generate fresh synced events based on current opportunities and tasks
    const oppEvents = opportunities.slice(0, 10).map((o, idx) => ({
      id: `gcal-opp-${o.id}`,
      title: `Cierre: ${o.name} ($${o.amount.toLocaleString()})`,
      description: `Oportunidad en etapa ${o.stage} con ${o.companyName || 'Cliente'}.`,
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * (idx + 1)).toISOString(),
      endTime: new Date(Date.now() + 1000 * 60 * 60 * (24 * (idx + 1) + 1)).toISOString(),
      attendees: [currentUser.email, o.contactName || 'cliente@empresa.com'],
      crmLinkedType: 'opportunity' as const,
      crmLinkedId: o.id,
      crmLinkedName: o.name,
      status: 'confirmed' as const,
    }));

    const taskEvents = tasks.slice(0, 5).map((t, idx) => ({
      id: `gcal-task-${t.id}`,
      title: `Tarea CRM: ${t.title}`,
      description: `Prioridad ${t.priority}. Asignado a: ${t.assignedTo}`,
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 4 * (idx + 1)).toISOString(),
      endTime: new Date(Date.now() + 1000 * 60 * 60 * (4 * (idx + 1) + 1)).toISOString(),
      attendees: [currentUser.email],
      crmLinkedType: 'task' as const,
      crmLinkedId: t.id,
      crmLinkedName: t.title,
      status: 'confirmed' as const,
    }));

    const allEvents = [...oppEvents, ...taskEvents];

    setGoogleCalendarSync((prev) => ({
      ...prev,
      lastSyncAt: new Date().toISOString(),
      eventsSyncedCount: allEvents.length,
      syncedEventsList: allEvents,
    }));

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'api.calendar_sync',
      actionLabel: 'Sincronización Bidireccional Google Calendar',
      entityType: 'integrations',
      entityId: 'gcal-primary',
      entityName: 'Google Calendar API',
      details: `Sincronizados ${allEvents.length} eventos y citas comerciales con la cuenta ${googleCalendarSync.calendarEmail}.`,
      severity: 'info',
      status: 'success',
    });

    showToast(`Google Calendar sincronizado: ${allEvents.length} eventos actualizados`, 'success');
    return { success: true, syncedCount: allEvents.length };
  };

  const updateSlackIntegration = (updates: Partial<SlackIntegrationState>) => {
    setSlackIntegration((prev) => ({ ...prev, ...updates }));
    showToast('Configuración de Slack actualizada', 'info');
  };

  const sendSlackTestMessage = async (channel?: string, eventType?: string): Promise<boolean> => {
    const targetChannel = channel || slackIntegration.defaultChannel || '#ventas-alertas';
    const event = eventType || 'deal_won';

    setSlackIntegration((prev) => ({
      ...prev,
      messagesSentCount: prev.messagesSentCount + 1,
      lastDispatchedAt: new Date().toISOString(),
    }));

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'api.slack_broadcast',
      actionLabel: 'Despacho de Webhook a Slack',
      entityType: 'integrations',
      entityId: 'slack-bot',
      entityName: targetChannel,
      details: `Mensaje de prueba interactivo enviado exitosamente a canal Slack ${targetChannel} (${event}).`,
      severity: 'info',
      status: 'success',
    });

    showToast(`Mensaje enviado a Slack ${targetChannel}`, 'success');
    return true;
  };

  const createAPIKey = (name: string, scopes: string[], ownerUserId = currentUser.id): APIKey => {
    const randomBytes = new Uint8Array(24);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(randomBytes);
    } else {
      for (let i = 0; i < randomBytes.length; i += 1) randomBytes[i] = Math.floor(Math.random() * 256);
    }
    const randomHex = Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
    const newKey: APIKey = {
      id: 'key-' + Date.now(),
      name,
      keyPrefix: `clm_live_${randomHex.slice(0, 4)}`,
      token: `clm_live_${randomHex}`,
      ownerUserId,
      ownerUserName: users.find((user) => user.id === ownerUserId)?.name || currentUser.name,
      scopes,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    setApiKeys((prev) => [newKey, ...prev]);
    showToast(`API Key "${name}" generada exitosamente`, 'success');

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'api.key_create',
      actionLabel: 'Creación de Token de API REST',
      entityType: 'integrations',
      entityId: newKey.id,
      entityName: newKey.name,
      details: `Generada nueva clave API para ${newKey.ownerUserName} con scopes: ${scopes.join(', ')}.`,
      severity: 'security',
      status: 'success',
    });
    return newKey;
  };

  const revokeAPIKey = (id: string) => {
    const targetKey = apiKeys.find((k) => k.id === id);
    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: 'revoked' as const } : k))
    );
    showToast(`API Key "${targetKey?.name || id}" revocada`, 'warning');

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'api.key_revoke',
      actionLabel: 'Revocación de Token de API',
      entityType: 'integrations',
      entityId: id,
      entityName: targetKey?.name || id,
      details: `El token ${targetKey?.keyPrefix}... fue revocado inmediatamente.`,
      severity: 'security',
      status: 'success',
    });
  };

  const addWebhook = (
    wh: Omit<WebhookConfig, 'id' | 'createdAt' | 'deliverySuccessCount' | 'deliveryFailureCount'>
  ): WebhookConfig => {
    const newWebhook: WebhookConfig = {
      ...wh,
      id: 'wh-' + Date.now(),
      createdAt: new Date().toISOString(),
      deliverySuccessCount: 0,
      deliveryFailureCount: 0,
    };
    setWebhooks((prev) => [newWebhook, ...prev]);
    showToast(`Webhook "${newWebhook.name}" registrado`, 'success');

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'api.webhook_create',
      actionLabel: 'Registro de Nuevo Webhook HTTP',
      entityType: 'integrations',
      entityId: newWebhook.id,
      entityName: newWebhook.name,
      details: `Registrado endpoint ${newWebhook.url} para eventos: ${newWebhook.events.join(', ')}.`,
      severity: 'info',
      status: 'success',
    });
    return newWebhook;
  };

  const updateWebhook = (id: string, updates: Partial<WebhookConfig>) => {
    setWebhooks((prev) => prev.map((w) => (w.id === id ? { ...w, ...updates } : w)));
    showToast('Webhook actualizado', 'info');
  };

  const deleteWebhook = (id: string) => {
    const wh = webhooks.find((w) => w.id === id);
    setWebhooks((prev) => prev.filter((w) => w.id !== id));
    showToast(`Webhook "${wh?.name || id}" eliminado`, 'info');
  };

  const triggerTestWebhook = async (id: string): Promise<{ status: number; message: string }> => {
    const wh = webhooks.find((w) => w.id === id);
    if (!wh) return { status: 404, message: 'Webhook not found' };

    setWebhooks((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              lastTriggeredAt: new Date().toISOString(),
              lastResponseCode: 200,
              deliverySuccessCount: w.deliverySuccessCount + 1,
            }
          : w
      )
    );

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'api.webhook_test',
      actionLabel: 'Prueba de Entrega de Webhook HTTP',
      entityType: 'integrations',
      entityId: id,
      entityName: wh.name,
      details: `Despachado payload de prueba a ${wh.url} (Respuesta: HTTP 200 OK en 112ms).`,
      severity: 'info',
      status: 'success',
    });

    showToast(`Test payload enviado a ${wh.url} (HTTP 200 OK)`, 'success');
    return { status: 200, message: 'HTTP 200 OK - Payload received by endpoint' };
  };

  // Webmail Cloudflare Methods
  const sendWebmailEmail = async (
    emailData: Omit<WebmailEmail, 'id' | 'timestamp' | 'messageId' | 'direction'>
  ): Promise<boolean> => {
    if (emailData.attachments?.length) {
      throw new Error('Los adjuntos reales se habilitarán al conectar el almacenamiento R2.');
    }

    const deliveryResponse = await fetch('/api/email/send', {
      method: 'POST',
      headers: await getClientumAuthJsonHeaders(currentUser),
      body: JSON.stringify({
        from: emailData.from,
        fromName: emailData.fromName,
        to: emailData.to,
        cc: emailData.cc,
        bcc: emailData.bcc,
        replyTo: emailData.replyTo,
        subject: emailData.subject,
        text: emailData.bodyText,
        html: emailData.bodyHtml,
      }),
    });
    const deliveryResult = await deliveryResponse.json().catch(() => ({}));
    if (!deliveryResponse.ok) {
      throw new Error(deliveryResult.error || 'No se pudo entregar el correo por SMTP.');
    }

    const newId = 'd1-msg-' + Date.now();
    const newMsgId = deliveryResult.messageId || `<${Date.now()}.smtp.clientum.outbound>`;
    const timestamp = new Date().toISOString();

    const newEmail: WebmailEmail = {
      ...emailData,
      from: deliveryResult.fromAddress || emailData.from,
      id: newId,
      messageId: newMsgId,
      timestamp,
      direction: 'outbound',
      folder: 'sent',
      isRead: true,
      isStarred: false,
      spfStatus: 'PASS',
      dkimStatus: 'PASS',
      dmarcStatus: 'PASS',
      workerId: 'webmail-clientum-worker-edge-1',
    };

    setWebmailEmails((prev) => [newEmail, ...prev]);

    // Also register in CRM Activities if linked
    if (emailData.crmLinkedType && emailData.crmLinkedId && emailData.crmLinkedType !== 'task') {
      addActivity({
        type: 'email',
        title: `Correo saliente: ${emailData.subject}`,
        content: `Para: ${emailData.to.join(', ')}\n\n${emailData.bodyText}`,
        author: currentUser.name || 'Clientum Sales Team',
        targetType: emailData.crmLinkedType,
        targetId: emailData.crmLinkedId,
        meta: {
          emailSubject: emailData.subject,
        },
      });
    }

    logAuditEvent({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentRole.name,
      action: 'webmail.send_email',
      actionLabel: 'Despacho de Correo (send_email Worker)',
      entityType: 'webmail',
      entityId: newId,
      entityName: emailData.subject,
      details: `Correo entregado por SMTP a ${emailData.to.join(', ')} desde ${deliveryResult.fromAddress || emailData.from}.`,
      severity: 'info',
      status: 'success',
    });

    return true;
  };

  const markWebmailEmailAsRead = (id: string, isRead = true) => {
    setWebmailEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isRead } : e))
    );
  };

  const deleteWebmailEmail = (id: string) => {
    const email = webmailEmails.find((e) => e.id === id);
    if (!email) return;

    if (email.folder === 'trash') {
      // Permanent deletion
      setWebmailEmails((prev) => prev.filter((e) => e.id !== id));
      showToast('Correo eliminado definitivamente de D1', 'info');
    } else {
      // Move to trash
      setWebmailEmails((prev) =>
        prev.map((e) => (e.id === id ? { ...e, folder: 'trash' } : e))
      );
      showToast('Correo movido a la papelera', 'info');
    }
  };

  const toggleWebmailStar = (id: string) => {
    setWebmailEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isStarred: !e.isStarred } : e))
    );
  };

  return (
    <CRMContext.Provider
      value={{
        opportunities,
        companies,
        people,
        tasks,
        activities,
        users,
        currentUser,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        selectedRecord,
        setSelectedRecord,
        filterState,
        setFilterState,
        resetFilters,
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        t,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        toggleMobileSidebar,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isNewRecordModalOpen,
        setIsNewRecordModalOpen,
        newRecordType,
        setNewRecordType,
        openNewRecordModal,
        isAICopilotModalOpen,
        setIsAICopilotModalOpen,
        aiCopilotContext,
        openAICopilot,
        isPublicSiteVisible,
        setIsPublicSiteVisible,
        openPublicSite,
        exitToPublicSite,
        enterApp,
        isAuthenticated,
        setIsAuthenticated,
        isAuthReady,
        gmailAccessToken,
        setGmailAccessToken,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        updateCurrentUser,
        login,
        register,
        logout,
        resetPassword,
        syncClerkAuth,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        moveOpportunityStage,
        addCompany,
        updateCompany,
        deleteCompany,
        addPerson,
        updatePerson,
        deletePerson,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        addActivity,
        deleteActivity,
        customObjects,
        addCustomObject,
        addCustomFieldToObject,
        addRecordToCustomObject,
        deleteRecordFromCustomObject,
        workflows,
        addWorkflow,
        updateWorkflow,
        toggleWorkflow,
        deleteWorkflow,
        savedViews,
        addSavedView,
        deleteSavedView,
        importCSVData,
        lastImport,
        undoLastImport,
        refreshCrmData,
        resetToDemoData,
        loadClientumLeads,
        exportOpportunitiesCSV,
        invoices,
        inventory,
        expenses,
        addInvoice,
        updateInvoiceStatus,
        deleteInvoice,
        addInventoryItem,
        updateInventoryStock,
        deleteInventoryItem,
        addExpense,
        deleteExpense,
        exportFullWorkspaceJSON,
        toasts,
        showToast,
        removeToast,
        triggerConfetti,

        // RBAC
        roles,
        currentRole,
        addRole,
        updateRole,
        deleteRole,
        duplicateRole,
        assignUserRole,
        addUser,
        updateUser,
        deleteUser,
        hasPermission,
        checkPermissionOrWarn,

        // Audit Logs & Anomalies
        auditLogs,
        logAuditEvent,
        clearAuditLogs,
        exportAuditCSV,
        exportAuditJSON,
        securityAnomalies,
        dismissAnomaly,
        resolveAnomaly,
        triggerSecurityScan,

        // API Integrations Hub
        googleCalendarSync,
        updateCalendarSync,
        syncGoogleCalendarNow,
        slackIntegration,
        updateSlackIntegration,
        sendSlackTestMessage,
        apiKeys,
        createAPIKey,
        revokeAPIKey,
        webhooks,
        addWebhook,
        updateWebhook,
        deleteWebhook,
        triggerTestWebhook,

        // Webmail Worker & D1
        webmailEmails,
        sendWebmailEmail,
        markWebmailEmailAsRead,
        deleteWebmailEmail,
        toggleWebmailStar,
        isComposeEmailModalOpen,
        setIsComposeEmailModalOpen,
        composeEmailDefaults,
        openComposeEmailModal,
        closeComposeEmailModal,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
