export type ActiveTab = 
  | 'overview' 
  | 'strategy' 
  | 'copywriter' 
  | 'seo' 
  | 'clients' 
  | 'chat'
  | 'contacts'
  | 'lists'
  | 'email_campaigns'
  | 'templates'
  | 'automations'
  | 'import_export'
  | 'smtp'
  | 'settings'
  | 'keyword_research'
  | 'keyword_vault'
  | 'topic_map'
  | 'on_page_audit'
  | 'content_calendar'
  | 'link_building'
  | 'rank_tracker'
  | 'seo_automation'
  | 'ai_hub'
  | 'meddic'
  | 'icp_builder'
  | 'crm_kanban'
  | 'email_template_builder'
  | 'geolocated_prospecting'
  | 'analytics_dashboard'
  | 'brochure_generator'
  | 'outreach_agent'
  | 'public_website'
  | 'workflow'
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
  | 'admin_console';

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


export interface CRMDeal { address?: string; meddicMetrics?: number;
  id: string;
  company: string;
  contactName?: string;
  contact?: string;
  contactTitle?: string;
  city?: string;
  source?: string;
  email?: string;
  phone?: string;
  amount: number;
  stage: 'leads' | 'contacted' | 'meeting' | 'proposal' | 'closed';
  industry: string;
  painPoint?: string;
  notes?: string;
  meddic?: {
    metrics?: string;
    economicBuyer?: string;
    decisionCriteria?: string;
    decisionProcess?: string;
    identifyPain?: string;
    champion?: string;
  };
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
