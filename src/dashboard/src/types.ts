export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'es' | 'pt';

export type StageId = 'lead' | 'discovery' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';

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
  avatar: string;
  role: string;
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'date';
  options?: string[];
  value?: string | number | boolean;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  companyId?: string;
  companyName?: string;
  avatar?: string;
  city?: string;
  country?: string;
  linkedin?: string;
  status: 'Lead' | 'Contacted' | 'Customer' | 'Churned';
  assignedTo: string;
  createdAt: string;
  lastActivityDate: string;
  notes?: string;
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  industry: string;
  employees: string;
  arr?: number;
  tier: 'Enterprise' | 'Mid-Market' | 'Startup' | 'Scaleup';
  healthScore: number; // 0-100
  address?: string;
  city?: string;
  country?: string;
  assignedTo: string;
  createdAt: string;
  description?: string;
}

export interface Opportunity {
  id: string;
  name: string;
  amount: number;
  currency: string;
  stage: StageId;
  closeDate: string;
  probability: number;
  companyId?: string;
  companyName?: string;
  contactId?: string;
  contactName?: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  type: 'New Business' | 'Expansion' | 'Renewal';
  notes?: string;
  tags: string[];
  lossReason?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Todo' | 'In Progress' | 'Completed';
  assignedTo: string;
  targetType?: 'opportunity' | 'company' | 'person';
  targetId?: string;
  targetName?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Activity {
  id: string;
  type: 'note' | 'call' | 'email' | 'meeting' | 'stage_change' | 'ai_insight';
  title: string;
  content: string;
  author: string;
  targetType: 'opportunity' | 'company' | 'person';
  targetId: string;
  createdAt: string;
  audioUrl?: string;
  meta?: {
    durationMinutes?: number;
    callOutcome?: string;
    fromStage?: StageId;
    toStage?: StageId;
    emailSubject?: string;
  };
}

export type ActiveTab = 
  | 'gettingStarted'
  | 'publicStore'
  | 'opportunities' 
  | 'companies' 
  | 'people' 
  | 'tasks' 
  | 'analytics' 
  | 'settings' 
  | 'powerSuite' 
  | 'whatsapp' 
  | 'erp' 
  | 'restaurant' 
  | 'ecommerce' 
  | 'saasCluster' 
  | 'sites' 
  | 'saasTheme' 
  | 'subscriptions' 
  | 'segments' 
  | 'chatbot' 
  | 'automation' 
  | 'knowledge'
  | 'campaigns'
  | 'aiAssistant'
  | 'mapsProspecting'
  | 'gtmStrategy'
  | 'meddic'
  | 'sdrOutreach'
  | 'adCopy'
  | 'payments'
  | 'clientPortal'
  | 'seoSuite'
  | 'webDev'
  | 'customObjects'
  | 'workflows'
  | 'csvStudio'
  | 'brochure';

export type OpportunityViewMode = 'kanban' | 'table';

export interface FilterRule {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'in' | 'isSet';
  value: string;
}

export interface SavedView {
  id: string;
  name: string;
  target: 'opportunities' | 'companies' | 'people' | 'customObject';
  customObjectId?: string;
  rules: FilterRule[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  columns?: string[];
  isDefault?: boolean;
}

export interface CustomObjectField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'date' | 'currency' | 'rating' | 'relation';
  options?: string[];
  required?: boolean;
  relationTarget?: 'Company' | 'Person' | 'Opportunity';
}

export interface CustomObjectDefinition {
  id: string;
  name: string; // e.g. 'Product', 'Project', 'Ticket'
  singularName: string;
  pluralName: string;
  icon: string;
  description: string;
  fields: CustomObjectField[];
  records: Array<Record<string, any>>;
  createdAt: string;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  title: string;
  description: string;
  config: Record<string, any>;
  icon: string;
}

export interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  triggerType: 'record_created' | 'stage_changed' | 'field_updated' | 'schedule' | 'webhook';
  targetObject: 'opportunity' | 'company' | 'person' | 'task' | 'whatsapp';
  nodes: WorkflowNode[];
  lastRunAt?: string;
  runCount: number;
}

export interface CSVColumnMapping {
  csvHeader: string;
  targetField: string;
  sampleValue: string;
}

export interface FilterState {
  search: string;
  stage?: StageId | 'all';
  owner?: string | 'all';
  priority?: string | 'all';
  tier?: string | 'all';
  minAmount?: number;
  maxAmount?: number;
  customRules?: FilterRule[];
  selectedOwners?: string[];
  selectedPriorities?: ('Low' | 'Medium' | 'High' | 'Critical')[];
}

// ERP & Invoicing Types
export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';

export interface Invoice {
  id: string;
  opportunityId?: string;
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  items: InvoiceLineItem[];
  subtotal: number;
  taxRate: number; // e.g. 16 or 21 percentage
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
  category: 'Software' | 'Marketing' | 'Travel' | 'Salaries' | 'Office' | 'Utilities' | 'Other';
  date: string;
  vendor?: string;
  assignedTo?: string;
  notes?: string;
}

