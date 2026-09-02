export type ActiveTab = 
  | 'overview' 
  | 'webmail'
  | 'opportunities'
  | 'companies'
  | 'people'
  | 'tasks'
  | 'analytics'
  | 'mapsProspecting'
  | 'geolocated_prospecting'
  | 'meddic'
  | 'icp_builder'
  | 'crm_kanban'
  | 'customObjects'
  | 'workflows'
  | 'workflow'
  | 'csvStudio'
  | 'import_export'
  | 'whatsapp'
  | 'crm_whatsapp'
  | 'chatbot'
  | 'campaigns'
  | 'aiAssistant'
  | 'gtmStrategy'
  | 'sdrOutreach'
  | 'adCopy'
  | 'strategy' 
  | 'copywriter' 
  | 'outreach_agent'
  | 'erp'
  | 'payments'
  | 'clientPortal'
  | 'restaurant'
  | 'ecommerce'
  | 'seoSuite'
  | 'seo'
  | 'webDev'
  | 'powerSuite'
  | 'settings'
  | 'unified_crm'
  | 'modern_erp_crm'
  | 'clients' 
  | 'chat'
  | 'contacts'
  | 'lists'
  | 'email_campaigns'
  | 'templates'
  | 'automations'
  | 'smtp'
  | 'keyword_research'
  | 'keyword_vault'
  | 'topic_map'
  | 'on_page_audit'
  | 'content_calendar'
  | 'link_building'
  | 'rank_tracker'
  | 'seo_automation'
  | 'ai_hub'
  | 'email_template_builder'
  | 'analytics_dashboard'
  | 'brochure_generator'
  | 'public_website'
  | 'google_drive'
  | 'agent_os'
  | 'crm_agents'
  | 'cmdb'
  | 'crm_config'
  | 'account'
  | 'vscrm_dashboard'
  | 'vscrm_clients'
  | 'vscrm_projects'
  | 'vscrm_time'
  | 'vscrm_invoices'
  | 'vscrm_expenses'
  | 'vscrm_afip'
  | 'ai_marketing_expert'
  | 'admin_console'
  | 'academy'
  | 'subscriptions'
  | 'segments'
  | 'knowledge'
  | 'sites'
  | 'saasCluster'
  | 'saasTheme';

export type Language = 'en' | 'es' | 'pt';
export type ThemeMode = 'dark' | 'light';
export type OpportunityViewMode = 'board' | 'table' | 'kanban';

export type StageId = 'lead' | 'discovery' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost' | string;

export interface StageConfig {
  id: StageId;
  name: string;
  color: string;
  probability: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface Company {
  id: string;
  userId?: string;
  name: string;
  domain?: string;
  industry?: string;
  employees?: string;
  arr?: number;
  tier?: string;
  healthScore?: number;
  address?: string;
  city?: string;
  country?: string;
  assignedTo?: string;
  createdAt: string;
  description?: string;
  customFields?: Record<string, any>;
  [key: string]: any;
}

export interface Person {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  companyId?: string;
  companyName?: string;
  avatar?: string;
  city?: string;
  country?: string;
  linkedin?: string;
  status?: string;
  assignedTo?: string;
  createdAt: string;
  lastActivityDate?: string;
  notes?: string;
  customFields?: Record<string, any>;
  [key: string]: any;
}

export interface Opportunity {
  id: string;
  userId?: string;
  name: string;
  amount: number;
  currency?: string;
  stage: StageId;
  closeDate?: string;
  probability?: number;
  companyId?: string;
  companyName?: string;
  contactId?: string;
  contactName?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Critical' | string;
  type?: string;
  tags?: string[];
  notes?: string;
  customFields?: Record<string, any>;
  [key: string]: any;
}

export interface Task {
  id: string;
  userId?: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent' | string;
  status?: 'Todo' | 'In Progress' | 'Completed' | string;
  assignedTo?: string;
  targetType?: 'opportunity' | 'company' | 'person' | 'task' | string;
  targetId?: string;
  targetName?: string;
  createdAt: string;
  completedAt?: string;
  [key: string]: any;
}

export interface Activity {
  id: string;
  type: 'meeting' | 'stage_change' | 'email' | 'note' | 'ai_insight' | 'call' | 'task' | string;
  title: string;
  content: string;
  author: string;
  targetType?: string;
  targetId?: string;
  createdAt: string;
  meta?: Record<string, any>;
  [key: string]: any;
}

export interface CustomField {
  id: string;
  name: string;
  label?: string;
  type: 'text' | 'number' | 'date' | 'select' | 'boolean' | 'email' | 'url' | string;
  targetType?: 'company' | 'person' | 'opportunity' | string;
  options?: string[];
  required?: boolean;
}

export interface CustomObjectField {
  id: string;
  name: string;
  label?: string;
  type: 'text' | 'number' | 'date' | 'select' | 'boolean' | 'email' | 'url' | 'json' | 'currency' | string;
  required?: boolean;
  options?: string[];
}

export interface CustomObjectDefinition {
  id: string;
  name?: string;
  singularName?: string;
  pluralName?: string;
  description?: string;
  icon?: string;
  fields?: CustomObjectField[];
  records?: Record<string, any>[];
  [key: string]: any;
}

export interface FilterState {
  search: string;
  stage?: string | string[];
  owner?: string | string[];
  priority?: string | string[];
  tier?: string | string[];
  minAmount?: number | null | '';
  maxAmount?: number | null | '';
  tags?: string[];
  [key: string]: any;
}

export interface SavedView {
  id: string;
  name: string;
  type?: 'opportunity' | 'company' | 'person' | 'task';
  target?: string;
  filters?: FilterState;
  rules?: Array<{ id: string; field: string; operator: string; value: any }>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isDefault?: boolean;
  [key: string]: any;
}

export interface WorkflowRule {
  id: string;
  name?: string;
  trigger?: string;
  conditions?: any[];
  actions?: any[];
  isActive?: boolean;
  triggerCount?: number;
  lastTriggered?: string;
  runCount?: number;
  [key: string]: any;
}

export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type InvoiceLineItem = InvoiceItem;

export interface Invoice {
  id: string;
  opportunityId?: string;
  clientName: string;
  clientEmail: string;
  clientAddress?: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus | string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  notes?: string;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stockQuantity: number;
  reorderLevel: number;
  unitPrice: number;
  description?: string;
  linkedDealsCount?: number;
  lastRestocked?: string;
}

export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  vendor: string;
  assignedTo: string;
  notes?: string;
}

export interface CampaignStrategy {
  executiveSummary: string;
  channels: Array<{
    name: string;
    budgetAllocation: string;
    expectedROI: string;
    tactics: string[];
  }>;
  audiencePersonas: Array<{
    name: string;
    age: string;
    painPoints: string[];
    channels: string[];
  }>;
  campaignTimeline: Array<{
    week: string;
    focus: string;
    actions: string[];
  }>;
  kpis: Array<{
    metric: string;
    target: string;
  }>;
}

export interface AdCopyResult {
  headlines: string[];
  primaryTexts: string[];
  callToAction: string[];
  imagePrompt: string;
}

export interface SeoAuditResult {
  seoScore: number;
  keywordOpportunities: Array<{
    keyword: string;
    searchVolume: string;
    difficulty: string;
    intent: string;
  }>;
  onPageRecommendations: string[];
  contentIdeas: string[];
}

export interface ClientItem {
  id: string;
  name: string;
  company: string;
  country: string;
  budget: string;
  status: 'Active' | 'Pending' | 'Paused';
  campaign: string;
  roi: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface EmailContact {
  id: string;
  email: string;
  name: string;
  status: 'Subscribed' | 'Unsubscribed' | 'Bounced';
  list: string;
  tags: string[];
  addedDate: string;
}

export interface EmailCampaignItem {
  id: string;
  title: string;
  subject: string;
  status: 'Sent' | 'Draft' | 'Scheduled';
  recipients: number;
  openRate: string;
  clickRate: string;
  sentDate: string;
}

export interface EmailTemplateItem {
  id: string;
  name: string;
  category: string;
  subject: string;
  previewText: string;
  htmlContent: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  trigger: string;
  status: 'Active' | 'Paused';
  subscribersCount: number;
  conversionRate: string;
}

export interface CRMDeal {
  id: string;
  company: string;
  contactName?: string;
  contact?: string;
  contactTitle?: string;
  city?: string;
  address?: string;
  source?: string;
  email?: string;
  phone?: string;
  amount: number;
  stage: 'leads' | 'contacted' | 'meeting' | 'proposal' | 'closed' | 'negotiation' | 'closed_won' | string;
  industry: string;
  painPoint?: string;
  notes?: string;
  score?: number;
  dealSize?: string;
  fit?: string;
  status?: string;
  owner?: string;
  priority?: string;
  created?: string;
  meddicMetrics?: number;
  meddic?: {
    metrics?: string;
    economicBuyer?: string;
    decisionCriteria?: string;
    decisionProcess?: string;
    identifyPain?: string;
    champion?: string;
  };
  [key: string]: any;
}

export interface BrochureData {
  title?: string;
  [key: string]: any;
}
export interface CustomTemplate {
  id?: string;
  [key: string]: any;
}
export interface AIChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface VscrmClient {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'Active' | 'Lead' | 'Inactive';
  country: string;
  createdAt: string;
}

export interface VscrmProject {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  budget: number;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  deadline: string;
  description: string;
}

export interface VscrmTask {
  id: string;
  projectId: string;
  projectTitle: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

export interface VscrmTimeEntry {
  id: string;
  clientId: string;
  clientName: string;
  projectId: string;
  projectTitle: string;
  description: string;
  hours: number;
  date: string;
  hourlyRate: number;
}

export interface VscrmInvoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  items: Array<{ description: string; quantity: number; unitPrice: number }>;
  taxRate: number;
  status: 'Draft' | 'Sent' | 'Paid';
  issueDate: string;
  dueDate: string;
}

export interface VscrmExpense {
  id: string;
  title: string;
  category: 'Software' | 'Travel' | 'Hardware' | 'Marketing' | 'Other';
  amount: number;
  date: string;
  notes: string;
}

export interface IndustryLandingData {
  slug: string;
  name: string;
  namePt: string;
  badge: string;
  badgePt: string;
  simulatorId: string;
  whatsappPrompt: string;
  whatsappPromptPt: string;
  hero: {
    badgePill: string;
    badgePillPt: string;
    headline: string;
    headlinePt: string;
    highlight: string;
    highlightPt: string;
    subheadline: string;
    subheadlinePt: string;
    bullets: Array<{ text: string; textPt: string }>;
  };
  metrics: Array<{ value: string; label: string; labelPt: string; detail: string; detailPt: string }>;
  painPoints: Array<{ problem: string; problemPt: string; solution: string; solutionPt: string }>;
  features: Array<{ tag: string; tagPt: string; title: string; titlePt: string; description: string; descriptionPt: string }>;
  caseStudy: {
    company: string;
    location: string;
    logoText: string;
    challenge: string;
    challengePt: string;
    result: string;
    resultPt: string;
    quote: string;
    quotePt: string;
    author: string;
    role: string;
  };
  faq: Array<{ question: string; questionPt: string; answer: string; answerPt: string }>;
  seo: {
    title: string;
    titlePt: string;
    description: string;
    descriptionPt: string;
    keywords: string;
    canonical: string;
  };
}

export * from './lib/sitemapGenerator';
export * from './data/industryLandings';
export * from './lib/smtp';
export * from './lib/firebase';

