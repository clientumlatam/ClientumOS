import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Settings,
  Play,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Edit3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Package,
  ShoppingCart,
  Truck,
  Settings2,
  Activity,
  FileSpreadsheet,
  Users,
  Briefcase,
  Clock,
  UserCheck,
  Shield,
  Zap,
  Volume2,
  Sparkles,
  PlusCircle,
  Calendar,
  ArrowRight,
  Kanban,
  LayoutList,
  Tags,
  Building2,
  Phone,
  Mail,
  User,
  Info
} from 'lucide-react';

interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  options?: string[];
}

interface ErpContact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  stage: 'lead' | 'contacted' | 'proposal' | 'won' | 'lost';
  owner: string;
  customFields: Record<string, string>;
  createdDate: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'revenue' | 'expense';
  category: string;
  amount: number;
}

interface StockItem {
  id: string;
  name: string;
  quantity: number;
  cost: number;
  price: number;
  minLevel: number;
}

interface SalesOrder {
  id: string;
  date: string;
  customerName: string;
  itemId: string;
  itemName: string;
  quantity: number;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

interface Supplier {
  id: string;
  name: string;
  itemSupplied: string;
  cost: number;
  leadTime: string;
}

interface Shipment {
  id: string;
  orderId: string;
  carrier: string;
  trackingNumber: string;
  status: 'Processing' | 'In Transit' | 'Out for Delivery' | 'Delivered';
}

interface ProductionCycle {
  id: string;
  productName: string;
  targetQuantity: number;
  status: 'Scheduled' | 'Assembling' | 'Quality Check' | 'Finished';
  materialsConsumed: { itemId: string; name: string; quantity: number }[];
  startDate: string;
}

interface ProjectTask {
  id: string;
  projectName: string;
  title: string;
  assignedTo: string;
  hoursSpent: number;
  status: 'To Do' | 'In Progress' | 'Completed';
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: 'on_contact_created' | 'on_stock_low' | 'on_order_completed';
  action: 'assign_owner' | 'log_alert' | 'play_alert_sound';
  actionValue: string;
  active: boolean;
}

interface AutomationLog {
  id: string;
  timestamp: string;
  ruleName: string;
  message: string;
}

const DEFAULT_CUSTOM_FIELDS: CustomField[] = [
  { id: 'cf_1', name: 'Sales Tier', type: 'select', options: ['Enterprise', 'Mid-Market', 'Startup'] },
  { id: 'cf_2', name: 'Contract Start', type: 'date' },
  { id: 'cf_3', name: 'Priority Level', type: 'select', options: ['High', 'Medium', 'Low'] }
];

const DEFAULT_CONTACTS: ErpContact[] = [
  { id: 'cnt_1', name: 'John Doe', company: 'Acme Corp', email: 'john@acme.com', phone: '+1 555-0192', stage: 'won', owner: 'Alice Smith', customFields: { cf_1: 'Enterprise', cf_3: 'High' }, createdDate: '2026-08-01' },
  { id: 'cnt_2', name: 'Jane Miller', company: 'Global Tech', email: 'jane@globaltech.io', phone: '+1 555-0143', stage: 'proposal', owner: 'Bob Johnson', customFields: { cf_1: 'Mid-Market', cf_3: 'Medium' }, createdDate: '2026-08-10' },
  { id: 'cnt_3', name: 'Aris Thorne', company: 'Nova Labs', email: 'aris@novalabs.net', phone: '+1 555-0177', stage: 'lead', owner: 'Alice Smith', customFields: { cf_1: 'Startup', cf_3: 'Low' }, createdDate: '2026-08-18' }
];

const DEFAULT_TRANSACTIONS: Transaction[] = [
  { id: 'tx_1', date: '2026-08-01', description: 'Enterprise Software Subscription Acme', type: 'revenue', category: 'Software Sales', amount: 4800 },
  { id: 'tx_2', date: '2026-08-02', description: 'Supplier Payment Raw Aluminum', type: 'expense', category: 'Material Cost', amount: 1500 },
  { id: 'tx_3', date: '2026-08-05', description: 'Server Hosting & CDN Providers', type: 'expense', category: 'Infrastructure', amount: 450 },
  { id: 'tx_4', date: '2026-08-12', description: 'Sales Order SO-101 Payment received', type: 'revenue', category: 'Product Sales', amount: 1200 }
];

const DEFAULT_STOCK_ITEMS: StockItem[] = [
  { id: 'stk_1', name: 'Raw Aluminum Sheets', quantity: 150, cost: 10, price: 25, minLevel: 40 },
  { id: 'stk_2', name: 'Copper Wiring Coil', quantity: 250, cost: 4, price: 12, minLevel: 60 },
  { id: 'stk_3', name: 'Microprocessor Chips v2', quantity: 12, cost: 45, price: 110, minLevel: 20 },
  { id: 'stk_4', name: 'Completed Hardware Kit', quantity: 45, cost: 35, price: 95, minLevel: 10 }
];

const DEFAULT_SALES_ORDERS: SalesOrder[] = [
  { id: 'so_1', date: '2026-08-12', customerName: 'Acme Corp', itemId: 'stk_4', itemName: 'Completed Hardware Kit', quantity: 10, total: 950, status: 'Delivered' },
  { id: 'so_2', date: '2026-08-19', customerName: 'Global Tech', itemId: 'stk_3', itemName: 'Microprocessor Chips v2', quantity: 5, total: 550, status: 'Pending' }
];

const DEFAULT_SUPPLIERS: Supplier[] = [
  { id: 'spl_1', name: 'AluCorp Metallurgical', itemSupplied: 'Raw Aluminum Sheets', cost: 10, leadTime: '5 Days' },
  { id: 'spl_2', name: 'Global Wire Distributors', itemSupplied: 'Copper Wiring Coil', cost: 4, leadTime: '3 Days' },
  { id: 'spl_3', name: 'Intellect Microchip', itemSupplied: 'Microprocessor Chips v2', cost: 45, leadTime: '12 Days' }
];

const DEFAULT_SHIPMENTS: Shipment[] = [
  { id: 'shp_1', orderId: 'so_1', carrier: 'FedEx Express', trackingNumber: 'FX-88920188', status: 'Delivered' },
  { id: 'shp_2', orderId: 'so_2', carrier: 'DHL Global', trackingNumber: 'DH-33049182', status: 'Processing' }
];

const DEFAULT_PRODUCTION_CYCLES: ProductionCycle[] = [
  { id: 'pc_1', productName: 'Completed Hardware Kit', targetQuantity: 20, status: 'Finished', startDate: '2026-08-05', materialsConsumed: [{ itemId: 'stk_1', name: 'Raw Aluminum Sheets', quantity: 20 }, { itemId: 'stk_2', name: 'Copper Wiring Coil', quantity: 40 }] },
  { id: 'pc_2', productName: 'Completed Hardware Kit', targetQuantity: 15, status: 'Assembling', startDate: '2026-08-18', materialsConsumed: [{ itemId: 'stk_1', name: 'Raw Aluminum Sheets', quantity: 15 }, { itemId: 'stk_2', name: 'Copper Wiring Coil', quantity: 30 }] }
];

const DEFAULT_PROJECT_TASKS: ProjectTask[] = [
  { id: 'tsk_1', projectName: 'Implementation Phase A', title: 'Circuit Assembly Verification', assignedTo: 'Alice Smith', hoursSpent: 12, status: 'Completed' },
  { id: 'tsk_2', projectName: 'Acme Deployment', title: 'Onsite Server Setup', assignedTo: 'Bob Johnson', hoursSpent: 8, status: 'In Progress' }
];

const DEFAULT_AUTOMATIONS: AutomationRule[] = [
  { id: 'aut_1', name: 'Auto Assign Alice', trigger: 'on_contact_created', action: 'assign_owner', actionValue: 'Alice Smith', active: true },
  { id: 'aut_2', name: 'Deduct and Sound', trigger: 'on_order_completed', action: 'play_alert_sound', actionValue: 'Ding', active: true },
  { id: 'aut_3', name: 'Critical Stock Sound', trigger: 'on_stock_low', action: 'log_alert', actionValue: 'Replenish Inventory Instantly!', active: true }
];

const DEFAULT_ROLES = {
  administrator: { name: 'Administrator', canManageCRM: true, canManageAccounting: true, canManageInventory: true, canManageManufacturing: true, canManageAutomations: true },
  sales_rep: { name: 'Sales Representative', canManageCRM: true, canManageAccounting: false, canManageInventory: true, canManageManufacturing: false, canManageAutomations: false },
  inventory_mgr: { name: 'Inventory Manager', canManageCRM: false, canManageAccounting: false, canManageInventory: true, canManageManufacturing: true, canManageAutomations: false },
  accountant: { name: 'Accountant', canManageCRM: false, canManageAccounting: true, canManageInventory: true, canManageManufacturing: false, canManageAutomations: false }
};

export default function ModernErpCrmSuite() {
  const [currentModule, setCurrentModule] = useState<'crm' | 'accounting' | 'inventory' | 'manufacturing' | 'automations' | 'roles'>('crm');
  const [currentUserRole, setCurrentUserRole] = useState<'administrator' | 'sales_rep' | 'inventory_mgr' | 'accountant'>('administrator');

  const [contacts, setContacts] = useState<ErpContact[]>(() => {
    const saved = localStorage.getItem('erp_contacts');
    return saved ? JSON.parse(saved) : DEFAULT_CONTACTS;
  });

  const [customFields, setCustomFields] = useState<CustomField[]>(() => {
    const saved = localStorage.getItem('erp_custom_fields');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOM_FIELDS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('erp_transactions');
    return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
  });

  const [stockItems, setStockItems] = useState<StockItem[]>(() => {
    const saved = localStorage.getItem('erp_stock_items');
    return saved ? JSON.parse(saved) : DEFAULT_STOCK_ITEMS;
  });

  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>(() => {
    const saved = localStorage.getItem('erp_sales_orders');
    return saved ? JSON.parse(saved) : DEFAULT_SALES_ORDERS;
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem('erp_suppliers');
    return saved ? JSON.parse(saved) : DEFAULT_SUPPLIERS;
  });

  const [shipments, setShipments] = useState<Shipment[]>(() => {
    const saved = localStorage.getItem('erp_shipments');
    return saved ? JSON.parse(saved) : DEFAULT_SHIPMENTS;
  });

  const [productionCycles, setProductionCycles] = useState<ProductionCycle[]>(() => {
    const saved = localStorage.getItem('erp_production_cycles');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTION_CYCLES;
  });

  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>(() => {
    const saved = localStorage.getItem('erp_project_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECT_TASKS;
  });

  const [automations, setAutomations] = useState<AutomationRule[]>(() => {
    const saved = localStorage.getItem('erp_automations');
    return saved ? JSON.parse(saved) : DEFAULT_AUTOMATIONS;
  });

  const [automationLogs, setAutomationLogs] = useState<AutomationLog[]>([]);

  const [roles, setRoles] = useState(DEFAULT_ROLES);

  const [crmView, setCrmView] = useState<'table' | 'kanban'>('kanban');
  const [crmSearch, setCrmSearch] = useState('');
  const [crmStageFilter, setCrmStageFilter] = useState<string>('all');
  const [crmSortField, setCrmSortField] = useState<'name' | 'company' | 'createdDate'>('name');
  const [crmSortOrder, setCrmSortOrder] = useState<'asc' | 'desc'>('asc');

  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showAddTxModal, setShowAddTxModal] = useState(false);
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [showAddCycleModal, setShowAddCycleModal] = useState(false);
  const [showAddCustomFieldModal, setShowAddCustomFieldModal] = useState(false);

  const [newContact, setNewContact] = useState({ name: '', company: '', email: '', phone: '', stage: 'lead' as any, owner: 'Alice Smith', customFields: {} as Record<string, string> });
  const [newTx, setNewTx] = useState({ description: '', type: 'revenue' as any, category: 'Product Sales', amount: '' });
  const [newStock, setNewStock] = useState({ name: '', quantity: '', cost: '', price: '', minLevel: '' });
  const [newOrder, setNewOrder] = useState({ customerName: '', itemId: '', quantity: '' });
  const [newCycle, setNewCycle] = useState({ productName: '', targetQuantity: '', metalQty: '', wireQty: '' });
  const [newField, setNewField] = useState({ name: '', type: 'text' as any, optionsCsv: '' });

  const [accountingReportTab, setAccountingReportTab] = useState<'statement' | 'balance' | 'cash'>('statement');

  useEffect(() => {
    localStorage.setItem('erp_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('erp_custom_fields', JSON.stringify(customFields));
  }, [customFields]);

  useEffect(() => {
    localStorage.setItem('erp_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('erp_stock_items', JSON.stringify(stockItems));
  }, [stockItems]);

  useEffect(() => {
    localStorage.setItem('erp_sales_orders', JSON.stringify(salesOrders));
  }, [salesOrders]);

  useEffect(() => {
    localStorage.setItem('erp_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('erp_shipments', JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem('erp_production_cycles', JSON.stringify(productionCycles));
  }, [productionCycles]);

  useEffect(() => {
    localStorage.setItem('erp_project_tasks', JSON.stringify(projectTasks));
  }, [projectTasks]);

  useEffect(() => {
    localStorage.setItem('erp_automations', JSON.stringify(automations));
  }, [automations]);

  const executeAutomationTriggers = (triggerType: 'on_contact_created' | 'on_stock_low' | 'on_order_completed', payload: any) => {
    const matchedRules = automations.filter(rule => rule.active && rule.trigger === triggerType);
    matchedRules.forEach(rule => {
      let logMsg = '';
      if (rule.action === 'assign_owner') {
        logMsg = `Assigned owner ${rule.actionValue} based on contact event.`;
      } else if (rule.action === 'log_alert') {
        logMsg = `Triggered log alert: ${rule.actionValue}`;
      } else if (rule.action === 'play_alert_sound') {
        logMsg = `Dispatched audit audio alert signal: ${rule.actionValue}`;
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sine';
          osc.frequency.value = 600;
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.15);
        } catch (e) {
          console.warn('Audio feedback failed to load or run.', e);
        }
      }

      setAutomationLogs(prev => [
        {
          id: 'log_' + Date.now() + Math.random().toString(36).substr(2, 5),
          timestamp: new Date().toLocaleTimeString(),
          ruleName: rule.name,
          message: `${logMsg} (${JSON.stringify(payload)})`
        },
        ...prev
      ]);
    });
  };

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.company) return;

    const created: ErpContact = {
      id: 'cnt_' + Date.now(),
      name: newContact.name,
      company: newContact.company,
      email: newContact.email || `${newContact.name.toLowerCase().replace(' ', '')}@${newContact.company.toLowerCase().replace(' ', '')}.com`,
      phone: newContact.phone || '+1 555-0100',
      stage: newContact.stage,
      owner: newContact.owner,
      customFields: newContact.customFields,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setContacts(prev => [created, ...prev]);
    setShowAddContactModal(false);
    setNewContact({ name: '', company: '', email: '', phone: '', stage: 'lead', owner: 'Alice Smith', customFields: {} });

    executeAutomationTriggers('on_contact_created', { name: created.name, company: created.company });
  };

  const handleCreateCustomField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newField.name) return;

    const created: CustomField = {
      id: 'cf_' + Date.now(),
      name: newField.name,
      type: newField.type,
      options: newField.optionsCsv ? newField.optionsCsv.split(',').map(o => o.trim()) : undefined
    };

    setCustomFields(prev => [...prev, created]);
    setShowAddCustomFieldModal(false);
    setNewField({ name: '', type: 'text', optionsCsv: '' });
  };

  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const handleUpdateContactStage = (contactId: string, newStage: any) => {
    setContacts(prev => prev.map(c => c.id === contactId ? { ...c, stage: newStage } : c));
  };

  const handleUpdateCustomFieldValue = (contactId: string, fieldId: string, value: string) => {
    setContacts(prev => prev.map(c => {
      if (c.id === contactId) {
        return {
          ...c,
          customFields: { ...c.customFields, [fieldId]: value }
        };
      }
      return c;
    }));
  };

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(newTx.amount);
    if (!newTx.description || isNaN(amt)) return;

    const created: Transaction = {
      id: 'tx_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      description: newTx.description,
      type: newTx.type,
      category: newTx.category,
      amount: amt
    };

    setTransactions(prev => [created, ...prev]);
    setShowAddTxModal(false);
    setNewTx({ description: '', type: 'revenue', category: 'Product Sales', amount: '' });
  };

  const handleCreateStock = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(newStock.quantity);
    const cst = parseFloat(newStock.cost);
    const prc = parseFloat(newStock.price);
    const minL = parseInt(newStock.minLevel);

    if (!newStock.name || isNaN(qty) || isNaN(cst) || isNaN(prc)) return;

    const created: StockItem = {
      id: 'stk_' + Date.now(),
      name: newStock.name,
      quantity: qty,
      cost: cst,
      price: prc,
      minLevel: isNaN(minL) ? 5 : minL
    };

    setStockItems(prev => [...prev, created]);
    setShowAddStockModal(false);
    setNewStock({ name: '', quantity: '', cost: '', price: '', minLevel: '' });
  };

  const handleCreateSalesOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(newOrder.quantity);
    if (!newOrder.customerName || !newOrder.itemId || isNaN(qty) || qty <= 0) return;

    const item = stockItems.find(s => s.id === newOrder.itemId);
    if (!item) return;

    if (item.quantity < qty) {
      alert(`Insufficient inventory. Available: ${item.quantity}`);
      return;
    }

    const orderTotal = item.price * qty;

    const created: SalesOrder = {
      id: 'so_' + (salesOrders.length + 101),
      date: new Date().toISOString().split('T')[0],
      customerName: newOrder.customerName,
      itemId: item.id,
      itemName: item.name,
      quantity: qty,
      total: orderTotal,
      status: 'Pending'
    };

    setStockItems(prev => prev.map(s => {
      if (s.id === item.id) {
        const remaining = s.quantity - qty;
        if (remaining <= s.minLevel) {
          setTimeout(() => executeAutomationTriggers('on_stock_low', { item: s.name, quantity: remaining }), 50);
        }
        return { ...s, quantity: remaining };
      }
      return s;
    }));

    setSalesOrders(prev => [created, ...prev]);

    const createdTx: Transaction = {
      id: 'tx_auto_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      description: `Sales Order ${created.id} - ${created.customerName}`,
      type: 'revenue',
      category: 'Product Sales',
      amount: orderTotal
    };
    setTransactions(prev => [createdTx, ...prev]);

    setShowAddOrderModal(false);
    setNewOrder({ customerName: '', itemId: '', quantity: '' });

    executeAutomationTriggers('on_order_completed', { orderId: created.id, total: orderTotal });
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: 'Pending' | 'Shipped' | 'Delivered') => {
    setSalesOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));

    setShipments(prev => {
      const match = prev.find(s => s.orderId === orderId);
      if (match) {
        return prev.map(s => s.orderId === orderId ? { ...s, status: nextStatus === 'Pending' ? 'Processing' : nextStatus === 'Shipped' ? 'In Transit' : 'Delivered' } : s);
      } else {
        const createdShp: Shipment = {
          id: 'shp_' + Date.now(),
          orderId: orderId,
          carrier: 'FedEx Express',
          trackingNumber: 'TRK-' + Math.floor(10000000 + Math.random() * 90000000),
          status: nextStatus === 'Pending' ? 'Processing' : nextStatus === 'Shipped' ? 'In Transit' : 'Delivered'
        };
        return [createdShp, ...prev];
      }
    });
  };

  const handleCreateProductionCycle = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(newCycle.targetQuantity);
    const metQty = parseInt(newCycle.metalQty) || 0;
    const wrQty = parseInt(newCycle.wireQty) || 0;

    if (!newCycle.productName || isNaN(qty) || qty <= 0) return;

    const itemMetal = stockItems.find(s => s.id === 'stk_1');
    const itemWire = stockItems.find(s => s.id === 'stk_2');

    if (itemMetal && itemMetal.quantity < metQty) {
      alert(`Insufficient Aluminum. Available: ${itemMetal.quantity}`);
      return;
    }
    if (itemWire && itemWire.quantity < wrQty) {
      alert(`Insufficient Copper Wiring. Available: ${itemWire.quantity}`);
      return;
    }

    setStockItems(prev => prev.map(s => {
      if (s.id === 'stk_1' && metQty > 0) {
        return { ...s, quantity: s.quantity - metQty };
      }
      if (s.id === 'stk_2' && wrQty > 0) {
        return { ...s, quantity: s.quantity - wrQty };
      }
      return s;
    }));

    const materials = [];
    if (metQty > 0) materials.push({ itemId: 'stk_1', name: 'Raw Aluminum Sheets', quantity: metQty });
    if (wrQty > 0) materials.push({ itemId: 'stk_2', name: 'Copper Wiring Coil', quantity: wrQty });

    const created: ProductionCycle = {
      id: 'pc_' + (productionCycles.length + 101),
      productName: newCycle.productName,
      targetQuantity: qty,
      status: 'Scheduled',
      startDate: new Date().toISOString().split('T')[0],
      materialsConsumed: materials
    };

    setProductionCycles(prev => [created, ...prev]);
    setShowAddCycleModal(false);
    setNewCycle({ productName: '', targetQuantity: '', metalQty: '', wireQty: '' });
  };

  const handleUpdateProductionStatus = (cycleId: string, nextStatus: 'Scheduled' | 'Assembling' | 'Quality Check' | 'Finished') => {
    setProductionCycles(prev => prev.map(c => {
      if (c.id === cycleId) {
        if (nextStatus === 'Finished') {
          setStockItems(stk => {
            const match = stk.find(s => s.name === c.productName);
            if (match) {
              return stk.map(s => s.id === match.id ? { ...s, quantity: s.quantity + c.targetQuantity } : s);
            } else {
              const newKit: StockItem = {
                id: 'stk_' + Date.now(),
                name: c.productName,
                quantity: c.targetQuantity,
                cost: 25,
                price: 65,
                minLevel: 5
              };
              return [...stk, newKit];
            }
          });
        }
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handleLogProjectHours = (taskId: string, extraHours: number) => {
    setProjectTasks(prev => prev.map(t => t.id === taskId ? { ...t, hoursSpent: t.hoursSpent + extraHours } : t));
  };

  const handleToggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const userPerms = roles[currentUserRole];

  const filteredContacts = contacts
    .filter(c => {
      const matchSearch = c.name.toLowerCase().includes(crmSearch.toLowerCase()) ||
        c.company.toLowerCase().includes(crmSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(crmSearch.toLowerCase());
      const matchStage = crmStageFilter === 'all' || c.stage === crmStageFilter;
      return matchSearch && matchStage;
    })
    .sort((a, b) => {
      let fA = a[crmSortField] || '';
      let fB = b[crmSortField] || '';
      if (crmSortOrder === 'asc') {
        return fA.toString().localeCompare(fB.toString());
      } else {
        return fB.toString().localeCompare(fA.toString());
      }
    });

  const revSum = transactions.filter(t => t.type === 'revenue').reduce((s, t) => s + t.amount, 0);
  const expSum = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const netEarnings = revSum - expSum;

  const totalStockValue = stockItems.reduce((s, i) => s + (i.quantity * i.cost), 0);
  const totalReceivables = salesOrders.filter(o => o.status !== 'Delivered').reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md font-mono">
                Open-Source ERPNext & CRM Core
              </span>
              <span className="text-slate-400 text-xs font-mono">· Unified Enterprise System</span>
              <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Linear & Notion Theme
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <Layers className="w-7 h-7 text-indigo-400" />
              All-in-One ERP & CRM Suite
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Consolidate bookkeeping, stock management, light manufacturing pipelines, supplier logistics, and customer communications in a single high-performance interface.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Active System Role</div>
                <select
                  value={currentUserRole}
                  onChange={(e) => setCurrentUserRole(e.target.value as any)}
                  className="bg-transparent text-xs font-bold text-white focus:outline-hidden cursor-pointer"
                >
                  <option value="administrator" className="bg-slate-900">Administrator (All Permissions)</option>
                  <option value="sales_rep" className="bg-slate-900">Sales Representative</option>
                  <option value="inventory_mgr" className="bg-slate-900">Inventory Manager</option>
                  <option value="accountant" className="bg-slate-900">Accountant</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setCurrentModule('crm')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                currentModule === 'crm'
                  ? 'bg-white text-slate-900 border-white shadow-md'
                  : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Users className={`w-3.5 h-3.5 ${currentModule === 'crm' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>Modern CRM Suite</span>
              <span className="text-[9px] font-mono font-bold bg-indigo-500/10 text-indigo-300 px-1.5 py-0.2 rounded-md">Notion</span>
            </button>

            <button
              onClick={() => setCurrentModule('accounting')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                currentModule === 'accounting'
                  ? 'bg-white text-slate-900 border-white shadow-md'
                  : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <DollarSign className={`w-3.5 h-3.5 ${currentModule === 'accounting' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>Accounting Ledger & Reports</span>
              <span className="text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-300 px-1.5 py-0.2 rounded-md">ERP</span>
            </button>

            <button
              onClick={() => setCurrentModule('inventory')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                currentModule === 'inventory'
                  ? 'bg-white text-slate-900 border-white shadow-md'
                  : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Package className={`w-3.5 h-3.5 ${currentModule === 'inventory' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>Inventory & Orders</span>
              <span className="text-[9px] font-mono font-bold bg-blue-500/10 text-blue-300 px-1.5 py-0.2 rounded-md">Stock</span>
            </button>

            <button
              onClick={() => setCurrentModule('manufacturing')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                currentModule === 'manufacturing'
                  ? 'bg-white text-slate-900 border-white shadow-md'
                  : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Activity className={`w-3.5 h-3.5 ${currentModule === 'manufacturing' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>Manufacturing & Projects</span>
              <span className="text-[9px] font-mono font-bold bg-amber-500/10 text-amber-300 px-1.5 py-0.2 rounded-md">Shop</span>
            </button>

            <button
              onClick={() => setCurrentModule('automations')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                currentModule === 'automations'
                  ? 'bg-white text-slate-900 border-white shadow-md'
                  : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${currentModule === 'automations' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>Workflow Automations</span>
              <span className="text-[9px] font-mono font-bold bg-purple-500/10 text-purple-300 px-1.5 py-0.2 rounded-md">Engine</span>
            </button>

            <button
              onClick={() => setCurrentModule('roles')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                currentModule === 'roles'
                  ? 'bg-white text-slate-900 border-white shadow-md'
                  : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Shield className={`w-3.5 h-3.5 ${currentModule === 'roles' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>RBAC Roles & Perms</span>
              <span className="text-[9px] font-mono font-bold bg-slate-500/10 text-slate-300 px-1.5 py-0.2 rounded-md">Roles</span>
            </button>
          </div>
        </div>
      </div>

      {!userPerms[`canManage${currentModule === 'roles' ? 'Automations' : currentModule.charAt(0).toUpperCase() + currentModule.slice(1)}`] && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-800">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <h2 className="text-lg font-bold">Access Denied</h2>
          <p className="text-sm mt-1">Your active profile ({roles[currentUserRole].name}) does not have permission to view or manage the {currentModule.toUpperCase()} module.</p>
          <button
            onClick={() => setCurrentUserRole('administrator')}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-0"
          >
            Switch to Administrator Profile
          </button>
        </div>
      )}

      {userPerms[`canManage${currentModule === 'roles' ? 'Automations' : currentModule.charAt(0).toUpperCase() + currentModule.slice(1)}`] && (
        <div className="transition-all">
          {currentModule === 'crm' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      value={crmSearch}
                      onChange={(e) => setCrmSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all w-48 sm:w-60"
                    />
                  </div>

                  <select
                    value={crmStageFilter}
                    onChange={(e) => setCrmStageFilter(e.target.value)}
                    className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden cursor-pointer"
                  >
                    <option value="all">All Stages</option>
                    <option value="lead">Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="proposal">Proposal</option>
                    <option value="won">Won (Closed)</option>
                    <option value="lost">Lost</option>
                  </select>

                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setCrmView('kanban')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border-0 ${
                        crmView === 'kanban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Kanban className="w-3.5 h-3.5" />
                      <span>Kanban Board</span>
                    </button>
                    <button
                      onClick={() => setCrmView('table')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border-0 ${
                        crmView === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <LayoutList className="w-3.5 h-3.5" />
                      <span>Table View</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddCustomFieldModal(true)}
                    className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Define Custom Fields</span>
                  </button>

                  <button
                    onClick={() => setShowAddContactModal(true)}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border-0 shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Lead</span>
                  </button>
                </div>
              </div>

              {crmView === 'kanban' ? (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {(['lead', 'contacted', 'proposal', 'won', 'lost'] as const).map(stage => {
                    const stageContacts = filteredContacts.filter(c => c.stage === stage);
                    return (
                      <div key={stage} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/50 flex flex-col min-h-[450px]">
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200/80">
                          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${
                              stage === 'lead' ? 'bg-blue-400' :
                              stage === 'contacted' ? 'bg-purple-400' :
                              stage === 'proposal' ? 'bg-amber-400' :
                              stage === 'won' ? 'bg-emerald-400' : 'bg-rose-400'
                            }`} />
                            {stage === 'lead' ? 'Leads' : stage === 'contacted' ? 'Contacted' : stage === 'proposal' ? 'Proposal' : stage === 'won' ? 'Won' : 'Lost'}
                          </h3>
                          <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{stageContacts.length}</span>
                        </div>

                        <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                          {stageContacts.map(c => (
                            <div key={c.id} className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs hover:border-indigo-400 transition-all space-y-2.5 relative group">
                              <button
                                onClick={() => handleDeleteContact(c.id)}
                                className="absolute top-2.5 right-2.5 p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer border-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>

                              <div>
                                <h4 className="font-bold text-slate-950 text-sm">{c.name}</h4>
                                <p className="text-[11px] text-slate-500 font-medium">{c.company}</p>
                              </div>

                              <div className="space-y-1">
                                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-slate-400" />
                                  <span className="truncate">{c.email}</span>
                                </p>
                                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  <span>{c.phone}</span>
                                </p>
                              </div>

                              {customFields.length > 0 && (
                                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                                  {customFields.map(cf => (
                                    <div key={cf.id} className="flex items-center justify-between text-[10px]">
                                      <span className="text-slate-400 font-medium">{cf.name}:</span>
                                      <select
                                        value={c.customFields[cf.id] || ''}
                                        onChange={(e) => handleUpdateCustomFieldValue(c.id, cf.id, e.target.value)}
                                        className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-[9px] font-semibold focus:outline-hidden"
                                      >
                                        <option value="">None</option>
                                        {cf.type === 'select' && cf.options?.map(opt => (
                                          <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                        {cf.type !== 'select' && (
                                          <option value={c.customFields[cf.id] || 'Defined'}>{c.customFields[cf.id] || 'Set Value'}</option>
                                        )}
                                      </select>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                <span className="text-[9px] text-slate-400 font-medium">Rep: {c.owner}</span>
                                <div className="flex gap-1">
                                  {stage !== 'lead' && (
                                    <button
                                      onClick={() => handleUpdateContactStage(c.id, stage === 'contacted' ? 'lead' : stage === 'proposal' ? 'contacted' : stage === 'won' ? 'proposal' : 'won')}
                                      className="p-1 bg-slate-50 hover:bg-slate-100 rounded text-slate-600 cursor-pointer border-0 text-[10px] font-black"
                                    >
                                      ←
                                    </button>
                                  )}
                                  {stage !== 'lost' && stage !== 'won' && (
                                    <button
                                      onClick={() => handleUpdateContactStage(c.id, stage === 'lead' ? 'contacted' : stage === 'contacted' ? 'proposal' : 'won')}
                                      className="p-1 bg-slate-50 hover:bg-slate-100 rounded text-slate-600 cursor-pointer border-0 text-[10px] font-black"
                                    >
                                      →
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}

                          {stageContacts.length === 0 && (
                            <div className="text-center py-8 text-[11px] text-slate-400 font-medium">
                              No deals in stage
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Details</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Active Stage</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Sales Owner</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Added Date</th>
                          {customFields.map(cf => (
                            <th key={cf.id} className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{cf.name}</th>
                          ))}
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredContacts.map(c => (
                          <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                              <div className="text-xs text-slate-500">{c.email}</div>
                            </td>
                            <td className="p-4 text-sm font-semibold text-slate-700">{c.company}</td>
                            <td className="p-4">
                              <select
                                value={c.stage}
                                onChange={(e) => handleUpdateContactStage(c.id, e.target.value as any)}
                                className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-hidden cursor-pointer"
                              >
                                <option value="lead">Lead</option>
                                <option value="contacted">Contacted</option>
                                <option value="proposal">Proposal</option>
                                <option value="won">Won</option>
                                <option value="lost">Lost</option>
                              </select>
                            </td>
                            <td className="p-4 text-xs font-medium text-slate-600">{c.owner}</td>
                            <td className="p-4 text-xs text-slate-500 font-mono">{c.createdDate}</td>
                            {customFields.map(cf => (
                              <td key={cf.id} className="p-4">
                                <input
                                  type={cf.type === 'number' ? 'number' : 'text'}
                                  value={c.customFields[cf.id] || ''}
                                  onChange={(e) => handleUpdateCustomFieldValue(c.id, cf.id, e.target.value)}
                                  placeholder="Double-click to set"
                                  className="bg-transparent border-0 hover:bg-slate-100 focus:bg-white focus:ring-1 focus:ring-indigo-500 rounded px-2 py-1 text-xs font-medium text-slate-700 w-28 transition-all"
                                />
                              </td>
                            ))}
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDeleteContact(c.id)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer border-0 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}

                        {filteredContacts.length === 0 && (
                          <tr>
                            <td colSpan={6 + customFields.length} className="p-8 text-center text-slate-400 font-medium">
                              No matching contacts found in base directory
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentModule === 'accounting' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-6 lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Revenue</p>
                      <h3 className="text-xl font-extrabold text-emerald-600 mt-1">${revSum.toLocaleString()}</h3>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">Cash Inflow</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Operating Expenses</p>
                      <h3 className="text-xl font-extrabold text-rose-600 mt-1">${expSum.toLocaleString()}</h3>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">Cash Outflow</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <TrendingDown className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Income</p>
                      <h3 className={`text-xl font-extrabold mt-1 ${netEarnings >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>
                        ${netEarnings.toLocaleString()}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">Operating Profit</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                        General Ledger Accounts
                      </h3>
                      <p className="text-slate-500 text-xs mt-0.5">Dual entry ledger transactions</p>
                    </div>
                    <button
                      onClick={() => setShowAddTxModal(true)}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Log Transaction</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase">
                          <th className="p-4">Date</th>
                          <th className="p-4">Description</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Type</th>
                          <th className="p-4 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {transactions.map(t => (
                          <tr key={t.id} className="hover:bg-slate-50/30 text-xs">
                            <td className="p-4 text-slate-500 font-mono">{t.date}</td>
                            <td className="p-4 font-semibold text-slate-900">{t.description}</td>
                            <td className="p-4 text-slate-600 font-medium">{t.category}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                t.type === 'revenue' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}>
                                {t.type.toUpperCase()}
                              </span>
                            </td>
                            <td className={`p-4 text-right font-bold text-sm ${t.type === 'revenue' ? 'text-emerald-600' : 'text-slate-800'}`}>
                              {t.type === 'revenue' ? '+' : '-'}${t.amount.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-400" /> Financial Statements Generator
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">Real-time financial summaries updated on transaction changes</p>
                  </div>

                  <div className="flex bg-slate-800 p-1 rounded-xl">
                    <button
                      onClick={() => setAccountingReportTab('statement')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border-0 cursor-pointer ${
                        accountingReportTab === 'statement' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      P&L
                    </button>
                    <button
                      onClick={() => setAccountingReportTab('balance')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border-0 cursor-pointer ${
                        accountingReportTab === 'balance' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Balance
                    </button>
                    <button
                      onClick={() => setAccountingReportTab('cash')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border-0 cursor-pointer ${
                        accountingReportTab === 'cash' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Cash Flow
                    </button>
                  </div>

                  {accountingReportTab === 'statement' && (
                    <div className="space-y-4">
                      <div className="border-b border-slate-800 pb-2">
                        <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Income Statement (Profit & Loss)</h4>
                        <p className="text-[10px] text-slate-500">For the period ending August 2026</p>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300 font-medium">Product Sales Revenue:</span>
                          <span className="font-mono text-white">${transactions.filter(t => t.type === 'revenue' && t.category === 'Product Sales').reduce((s, t) => s + t.amount, 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300 font-medium">Service & Software Sales:</span>
                          <span className="font-mono text-white">${transactions.filter(t => t.type === 'revenue' && t.category !== 'Product Sales').reduce((s, t) => s + t.amount, 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-indigo-300">
                          <span>Total Revenues:</span>
                          <span className="font-mono">${revSum.toLocaleString()}</span>
                        </div>

                        <div className="pt-2">
                          <div className="flex justify-between">
                            <span className="text-slate-300 font-medium">Cost of Goods Sold (COGS):</span>
                            <span className="font-mono text-slate-300">${transactions.filter(t => t.type === 'expense' && t.category === 'Material Cost').reduce((s, t) => s + t.amount, 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300 font-medium">Operational & Infrastructure:</span>
                            <span className="font-mono text-slate-300">${transactions.filter(t => t.type === 'expense' && t.category !== 'Material Cost').reduce((s, t) => s + t.amount, 0).toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-rose-400">
                          <span>Total Expenses:</span>
                          <span className="font-mono">${expSum.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between border-t border-slate-700 pt-3 font-black text-sm text-emerald-400 bg-slate-950 p-2 rounded-xl">
                          <span>Net Earnings:</span>
                          <span className="font-mono">${netEarnings.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {accountingReportTab === 'balance' && (
                    <div className="space-y-4">
                      <div className="border-b border-slate-800 pb-2">
                        <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Balance Sheet Statement</h4>
                        <p className="text-[10px] text-slate-500">As of August 19, 2026</p>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <h5 className="text-[10px] font-black uppercase text-slate-400">Assets</h5>
                        <div className="flex justify-between pl-2">
                          <span className="text-slate-300">Cash and Cash Equivalents:</span>
                          <span className="font-mono text-white">${(15000 + netEarnings).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pl-2">
                          <span className="text-slate-300">Inventory Asset Valuation:</span>
                          <span className="font-mono text-white">${totalStockValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pl-2">
                          <span className="text-slate-300">Accounts Receivable:</span>
                          <span className="font-mono text-white">${totalReceivables.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-800 pt-1.5 font-bold text-emerald-400">
                          <span>Total Assets:</span>
                          <span className="font-mono">${(15000 + netEarnings + totalStockValue + totalReceivables).toLocaleString()}</span>
                        </div>

                        <h5 className="text-[10px] font-black uppercase text-slate-400 pt-2">Liabilities & Equity</h5>
                        <div className="flex justify-between pl-2">
                          <span className="text-slate-300">Accounts Payable (Suppliers):</span>
                          <span className="font-mono text-white">$2,100</span>
                        </div>
                        <div className="flex justify-between pl-2">
                          <span className="text-slate-300">Retained Earnings / Equity:</span>
                          <span className="font-mono text-white">${(15000 + netEarnings + totalStockValue + totalReceivables - 2100).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-800 pt-1.5 font-bold text-indigo-300">
                          <span>Total Liabilities & Equity:</span>
                          <span className="font-mono">${(15000 + netEarnings + totalStockValue + totalReceivables).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {accountingReportTab === 'cash' && (
                    <div className="space-y-4">
                      <div className="border-b border-slate-800 pb-2">
                        <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Statement of Cash Flows</h4>
                        <p className="text-[10px] text-slate-500">Indirect method cash adjustments</p>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300 font-bold">Net Cash from Operating Activities:</span>
                          <span className="font-mono text-emerald-400">+${revSum.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pl-2">
                          <span className="text-slate-400">Cash received from Customers:</span>
                          <span className="font-mono text-slate-300">${revSum.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pl-2">
                          <span className="text-slate-400">Cash paid to Suppliers/OpEx:</span>
                          <span className="font-mono text-rose-400">-${expSum.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-white">
                          <span>Net Cash Increase:</span>
                          <span className="font-mono text-emerald-400">+${netEarnings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pl-2">
                          <span className="text-slate-400">Cash at beginning of period:</span>
                          <span className="font-mono text-slate-300">$15,000</span>
                        </div>
                        <div className="flex justify-between pl-2 font-bold text-indigo-300">
                          <span>Cash at end of period:</span>
                          <span className="font-mono">${(15000 + netEarnings).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentModule === 'inventory' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Warehoused SKU Value</p>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">${totalStockValue.toLocaleString()}</h3>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">Cost basis inventory valuation</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Active Orders</p>
                    <h3 className="text-xl font-extrabold text-indigo-600 mt-1">{salesOrders.length}</h3>
                    <p className="text-[10px] text-emerald-500 font-medium mt-1">Pending delivery: {salesOrders.filter(o => o.status !== 'Delivered').length}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dispatched Shipments</p>
                    <h3 className="text-xl font-extrabold text-amber-600 mt-1">{shipments.length}</h3>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">Tracked carriers via API</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden lg:col-span-2">
                  <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Inventory Levels</h3>
                      <p className="text-slate-500 text-xs mt-0.5">Raw materials & finished SKUs</p>
                    </div>
                    <button
                      onClick={() => setShowAddStockModal(true)}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add SKU</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase">
                          <th className="p-4">SKU Name</th>
                          <th className="p-4 text-center">Qty Available</th>
                          <th className="p-4 text-right">Cost Price</th>
                          <th className="p-4 text-right">Sales Price</th>
                          <th className="p-4">Threshold status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {stockItems.map(s => (
                          <tr key={s.id} className="hover:bg-slate-50/30 text-xs">
                            <td className="p-4 font-bold text-slate-900">{s.name}</td>
                            <td className="p-4 text-center font-mono font-bold">{s.quantity} units</td>
                            <td className="p-4 text-right text-slate-600 font-mono">${s.cost}</td>
                            <td className="p-4 text-right text-slate-900 font-mono font-bold">${s.price}</td>
                            <td className="p-4">
                              {s.quantity <= s.minLevel ? (
                                <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  <AlertTriangle className="w-3 h-3" />
                                  Critical Level ({s.minLevel})
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Stock Safe
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                      <h4 className="font-bold text-slate-900 text-xs">Suppliers Directory</h4>
                    </div>
                    <div className="p-4 space-y-3">
                      {suppliers.map(sup => (
                        <div key={sup.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>{sup.name}</span>
                            <span className="text-indigo-600 font-mono">${sup.cost} unit</span>
                          </div>
                          <div className="text-slate-500 mt-1 flex justify-between text-[11px]">
                            <span>Material: {sup.itemSupplied}</span>
                            <span>ETA: {sup.leadTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Customer Sales Orders</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Automated order fulfillment and tracking</p>
                  </div>
                  <button
                    onClick={() => setShowAddOrderModal(true)}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Sales Order</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase">
                        <th className="p-4">SO ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Product Purchased</th>
                        <th className="p-4 text-center">Quantity</th>
                        <th className="p-4 text-right">Grand Total</th>
                        <th className="p-4">Fulfillment Status</th>
                        <th className="p-4 text-right">Dispatched Shipment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {salesOrders.map(o => {
                        const shp = shipments.find(s => s.orderId === o.id);
                        return (
                          <tr key={o.id} className="hover:bg-slate-50/30 text-xs">
                            <td className="p-4 font-bold text-indigo-600 font-mono">SO-{o.id}</td>
                            <td className="p-4 font-semibold text-slate-900">{o.customerName}</td>
                            <td className="p-4 text-slate-700">{o.itemName}</td>
                            <td className="p-4 text-center font-mono">{o.quantity} units</td>
                            <td className="p-4 text-right font-bold text-slate-900 font-mono">${o.total.toLocaleString()}</td>
                            <td className="p-4">
                              <select
                                value={o.status}
                                onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                                className={`border rounded-lg px-2.5 py-1 text-[10px] font-bold focus:outline-hidden cursor-pointer ${
                                  o.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                  o.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                              {shp ? (
                                <div className="text-[11px] font-semibold text-slate-700">
                                  <div className="font-mono text-[10px] text-slate-500">{shp.carrier}</div>
                                  <div>{shp.trackingNumber} ({shp.status})</div>
                                </div>
                              ) : (
                                <span className="text-slate-400 font-medium">Pending Shipping</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {currentModule === 'manufacturing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden lg:col-span-2">
                  <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Light Production Lines</h3>
                      <p className="text-slate-500 text-xs mt-0.5">Manufacturing cycles & BOM material consumption</p>
                    </div>
                    <button
                      onClick={() => setShowAddCycleModal(true)}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Start Production</span>
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    {productionCycles.map(pc => (
                      <div key={pc.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/30 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-slate-950 text-sm">{pc.productName}</h4>
                            <p className="text-slate-500 text-[10px] font-mono">Cycle ID: {pc.id} · Scheduled Qty: {pc.targetQuantity}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-[10px] font-medium font-mono">Status:</span>
                            <select
                              value={pc.status}
                              onChange={(e) => handleUpdateProductionStatus(pc.id, e.target.value as any)}
                              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-hidden"
                            >
                              <option value="Scheduled">Scheduled</option>
                              <option value="Assembling">Assembling</option>
                              <option value="Quality Check">Quality Check</option>
                              <option value="Finished">Finished</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-200/80">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bill of Materials (BOM) Consumption:</p>
                          <div className="grid grid-cols-2 gap-4 pt-1">
                            {pc.materialsConsumed.map(mat => (
                              <div key={mat.itemId} className="text-xs text-slate-700 flex justify-between font-medium">
                                <span>{mat.name}:</span>
                                <span className="font-bold text-rose-600">-{mat.quantity} units</span>
                              </div>
                            ))}
                            {pc.materialsConsumed.length === 0 && (
                              <span className="text-[11px] text-slate-400 font-medium">No raw components logged for this cycle.</span>
                            )}
                          </div>
                        </div>

                        {pc.status === 'Finished' && (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Production completed. {pc.targetQuantity} units of {pc.productName} added to stock.
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="p-5 border-b border-slate-200 bg-slate-50/50">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-indigo-600" /> Project Timesheets
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">Developer and manufacturing hour logging</p>
                  </div>

                  <div className="p-4 space-y-4">
                    {projectTasks.map(tsk => (
                      <div key={tsk.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-900 text-xs">{tsk.title}</h4>
                            <p className="text-[10px] text-slate-500">{tsk.projectName} · {tsk.assignedTo}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            tsk.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {tsk.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200/80">
                          <div className="text-xs">
                            <span className="text-slate-400">Total Hours:</span> <span className="font-bold text-slate-900 font-mono">{tsk.hoursSpent} hrs</span>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleLogProjectHours(tsk.id, 1)}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-700 cursor-pointer border-0"
                            >
                              +1 hr
                            </button>
                            <button
                              onClick={() => handleLogProjectHours(tsk.id, 4)}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-700 cursor-pointer border-0"
                            >
                              +4 hrs
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentModule === 'automations' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden lg:col-span-2">
                <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Active Automations</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Triggers and actions orchestrator</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {automations.map(rule => (
                    <div key={rule.id} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-950 text-sm">{rule.name}</h4>
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            rule.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {rule.active ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                          <span className="text-indigo-600 font-bold">WHEN:</span> {rule.trigger.replace('on_', '').replace('_', ' ')}{' '}
                          <span className="text-purple-600 font-bold">→ DO:</span> {rule.action.replace('_', ' ')} ({rule.actionValue})
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleAutomation(rule.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-0 ${
                            rule.active ? 'bg-rose-50 text-rose-700 hover:bg-rose-100' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                          }`}
                        >
                          {rule.active ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col max-h-[500px]">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                  <h4 className="font-bold text-slate-950 text-xs flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    Live Trigger logs
                  </h4>
                  <button
                    onClick={() => setAutomationLogs([])}
                    className="text-[10px] font-bold text-slate-500 hover:text-slate-900 border-0 bg-transparent cursor-pointer"
                  >
                    Clear Logs
                  </button>
                </div>

                <div className="p-4 space-y-2 overflow-y-auto flex-1 custom-scrollbar">
                  {automationLogs.map(log => (
                    <div key={log.id} className="p-3 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>{log.ruleName}</span>
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="text-emerald-400">{log.message}</div>
                    </div>
                  ))}

                  {automationLogs.length === 0 && (
                    <div className="text-center py-12 text-xs text-slate-400">
                      No events triggered in this sandbox session. Add a lead or complete an order to watch live executions.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentModule === 'roles' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm">Role-Based Access Control (RBAC) Matrix</h3>
                <p className="text-slate-500 text-xs mt-0.5">Toggle active permissions of company profiles</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase">
                      <th className="p-4">Enterprise Profile</th>
                      <th className="p-4 text-center">Manage CRM</th>
                      <th className="p-4 text-center">Accounting & Statements</th>
                      <th className="p-4 text-center">Inventory & Stock</th>
                      <th className="p-4 text-center">Manufacturing Lines</th>
                      <th className="p-4 text-center">Workflow & Automation Settings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Object.entries(roles).map(([key, value]) => (
                      <tr key={key} className="hover:bg-slate-50/30 text-xs">
                        <td className="p-4 font-bold text-slate-900">{value.name}</td>
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={value.canManageCRM}
                            disabled={key === 'administrator'}
                            onChange={(e) => setRoles(prev => ({
                              ...prev,
                              [key]: { ...prev[key as keyof typeof roles], canManageCRM: e.target.checked }
                            }))}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={value.canManageAccounting}
                            disabled={key === 'administrator'}
                            onChange={(e) => setRoles(prev => ({
                              ...prev,
                              [key]: { ...prev[key as keyof typeof roles], canManageAccounting: e.target.checked }
                            }))}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={value.canManageInventory}
                            disabled={key === 'administrator'}
                            onChange={(e) => setRoles(prev => ({
                              ...prev,
                              [key]: { ...prev[key as keyof typeof roles], canManageInventory: e.target.checked }
                            }))}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={value.canManageManufacturing}
                            disabled={key === 'administrator'}
                            onChange={(e) => setRoles(prev => ({
                              ...prev,
                              [key]: { ...prev[key as keyof typeof roles], canManageManufacturing: e.target.checked }
                            }))}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={value.canManageAutomations}
                            disabled={key === 'administrator'}
                            onChange={(e) => setRoles(prev => ({
                              ...prev,
                              [key]: { ...prev[key as keyof typeof roles], canManageAutomations: e.target.checked }
                            }))}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {showAddContactModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-950 text-base">Create New B2B Lead</h3>

            <form onSubmit={handleCreateContact} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Lead Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp"
                  value={newContact.company}
                  onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Email address</label>
                  <input
                    type="email"
                    placeholder="john@acme.com"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Phone number</label>
                  <input
                    type="text"
                    placeholder="+1 555-0192"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pipeline Stage</label>
                  <select
                    value={newContact.stage}
                    onChange={(e) => setNewContact({ ...newContact, stage: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  >
                    <option value="lead">Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="proposal">Proposal</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sales Owner</label>
                  <select
                    value={newContact.owner}
                    onChange={(e) => setNewContact({ ...newContact, owner: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  >
                    <option value="Alice Smith">Alice Smith</option>
                    <option value="Bob Johnson">Bob Johnson</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddContactModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-0"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddCustomFieldModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-950 text-base">Define Custom Field</h3>

            <form onSubmit={handleCreateCustomField} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Field Display Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Score, LTV Limit"
                  value={newField.name}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Value Input Type</label>
                <select
                  value={newField.type}
                  onChange={(e) => setNewField({ ...newField, type: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                >
                  <option value="text">Text value</option>
                  <option value="number">Numeric value</option>
                  <option value="date">Date value</option>
                  <option value="select">Dropdown Selector</option>
                </select>
              </div>

              {newField.type === 'select' && (
                <div className="space-y-1 animate-in fade-in slide-in-from-top-1 duration-100">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Selector Options (comma separated)</label>
                  <input
                    type="text"
                    required
                    placeholder="High, Medium, Low"
                    value={newField.optionsCsv}
                    onChange={(e) => setNewField({ ...newField, optionsCsv: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  />
                </div>
              )}

              <div className="flex gap-2 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCustomFieldModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-0"
                >
                  Create Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddTxModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-950 text-base">Log Accounting Entry</h3>

            <form onSubmit={handleCreateTransaction} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Production Cloud Bill"
                  value={newTx.description}
                  onChange={(e) => setNewTx({ ...newTx, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Entry Type</label>
                  <select
                    value={newTx.type}
                    onChange={(e) => setNewTx({ ...newTx, type: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  >
                    <option value="revenue">Revenue (Inflow)</option>
                    <option value="expense">Expense (Outflow)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Account Category</label>
                  <select
                    value={newTx.category}
                    onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  >
                    <option value="Product Sales">Product Sales</option>
                    <option value="Software Sales">Software Sales</option>
                    <option value="Material Cost">Material Cost</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Marketing">Marketing Expenses</option>
                    <option value="Payroll">Staff Payroll</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Amount ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 1250.00"
                  value={newTx.amount}
                  onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddTxModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-0"
                >
                  Submit Journal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddStockModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-950 text-base">Add Inventory SKU</h3>

            <form onSubmit={handleCreateStock} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">SKU Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Microchip Assembly v3"
                  value={newStock.name}
                  onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Quantity in Stock</label>
                  <input
                    type="number"
                    required
                    placeholder="100"
                    value={newStock.quantity}
                    onChange={(e) => setNewStock({ ...newStock, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Min Warning Threshold</label>
                  <input
                    type="number"
                    required
                    placeholder="20"
                    value={newStock.minLevel}
                    onChange={(e) => setNewStock({ ...newStock, minLevel: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Purchase Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="15.00"
                    value={newStock.cost}
                    onChange={(e) => setNewStock({ ...newStock, cost: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sales Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="45.00"
                    value={newStock.price}
                    onChange={(e) => setNewStock({ ...newStock, price: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddStockModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-0"
                >
                  Create SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddOrderModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-950 text-base">Assemble Sales Order</h3>

            <form onSubmit={handleCreateSalesOrder} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp"
                  value={newOrder.customerName}
                  onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Select Stock SKU</label>
                  <select
                    value={newOrder.itemId}
                    required
                    onChange={(e) => setNewOrder({ ...newOrder, itemId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  >
                    <option value="">Choose item...</option>
                    {stockItems.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} (${s.price} | Qty: {s.quantity})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Quantity Ordered</label>
                  <input
                    type="number"
                    required
                    placeholder="5"
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddOrderModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-0"
                >
                  Disburse Order & Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddCycleModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-950 text-base">Start Shop Production Cycle</h3>

            <form onSubmit={handleCreateProductionCycle} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Target Completed SKU</label>
                <input
                  type="text"
                  required
                  placeholder="Completed Hardware Kit"
                  value={newCycle.productName}
                  onChange={(e) => setNewCycle({ ...newCycle, productName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Quantity to Manufacture</label>
                <input
                  type="number"
                  required
                  placeholder="15"
                  value={newCycle.targetQuantity}
                  onChange={(e) => setNewCycle({ ...newCycle, targetQuantity: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required Material Draw (BOM):</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-semibold">Aluminum Sheets (Units)</label>
                    <input
                      type="number"
                      placeholder="15"
                      value={newCycle.metalQty}
                      onChange={(e) => setNewCycle({ ...newCycle, metalQty: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-semibold">Copper Wire Coil (Units)</label>
                    <input
                      type="number"
                      placeholder="30"
                      value={newCycle.wireQty}
                      onChange={(e) => setNewCycle({ ...newCycle, wireQty: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCycleModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-0"
                >
                  Release Materials & Start
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
