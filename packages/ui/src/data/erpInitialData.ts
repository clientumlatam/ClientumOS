import { Invoice, InventoryItem, ExpenseItem } from '../types';

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2026-001',
    opportunityId: 'opp-1',
    clientName: 'ABEPOL S.R.L.',
    clientEmail: 'compras@abepol.com.ar',
    clientAddress: 'Av. Industrial 4500, San Martín, Buenos Aires',
    issueDate: '2026-08-10',
    dueDate: '2026-08-25',
    status: 'Paid',
    items: [
      { id: 'item-1', description: 'Licencia ClientumCRM Enterprise Anual', quantity: 10, unitPrice: 1198.35, total: 11983.47 },
      { id: 'item-2', description: 'Soporte SLA 24/7 Dedicado', quantity: 1, unitPrice: 2516.53, total: 2516.53 }
    ],
    subtotal: 11983.47,
    taxRate: 21,
    taxAmount: 2516.53,
    totalAmount: 14500.00,
    notes: 'Pago recibido vía Transferencia Bancaria Directa AFIP A.',
    createdAt: '2026-08-10T10:00:00.000Z'
  },
  {
    id: 'INV-2026-002',
    opportunityId: 'opp-2',
    clientName: 'ACHA PLAST S.A.',
    clientEmail: 'administracion@achaplast.com',
    clientAddress: 'Ruta 8 Km 54, Pilar, Buenos Aires',
    issueDate: '2026-08-18',
    dueDate: '2026-09-02',
    status: 'Sent',
    items: [
      { id: 'item-1', description: 'Servicio Onboarding & API Integration Suite', quantity: 1, unitPrice: 27586.21, total: 27586.21 }
    ],
    subtotal: 27586.21,
    taxRate: 16,
    taxAmount: 4413.79,
    totalAmount: 32000.00,
    notes: 'Factura emitida electrónica. Pendiente de recepción de pago.',
    createdAt: '2026-08-18T14:30:00.000Z'
  },
  {
    id: 'INV-2026-003',
    opportunityId: 'opp-3',
    clientName: 'Verion ICSA',
    clientEmail: 'facturacion@verion.com.ar',
    clientAddress: 'Av. del Libertador 1200, Vicente López',
    issueDate: '2026-08-22',
    dueDate: '2026-09-05',
    status: 'Draft',
    items: [
      { id: 'item-1', description: 'Pack 50,000 Mensajes WhatsApp API', quantity: 5, unitPrice: 1534.48, total: 7672.41 }
    ],
    subtotal: 7672.41,
    taxRate: 16,
    taxAmount: 1227.59,
    totalAmount: 8900.00,
    notes: 'Borrador de comprobante previo a revisión con Finanzas.',
    createdAt: '2026-08-22T09:15:00.000Z'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    sku: 'SKU-CLIENTUM-ENT',
    name: 'Licencia ClientumCRM Enterprise (Anual)',
    category: 'Software',
    stockQuantity: 25,
    reorderLevel: 10,
    unitPrice: 1200.00,
    description: 'Suscripción anual para despliegues empresariales con soporte.',
    linkedDealsCount: 12,
    lastRestocked: '2026-08-01'
  },
  {
    id: 'inv-2',
    sku: 'SKU-WAPP-5K',
    name: 'Pack 5,000 Mensajes WhatsApp API',
    category: 'API Credits',
    stockQuantity: 4, // Low stock alert!
    reorderLevel: 10,
    unitPrice: 150.00,
    description: 'Paquete de créditos de mensajería para WhatsApp Business Cloud.',
    linkedDealsCount: 28,
    lastRestocked: '2026-07-20'
  },
  {
    id: 'inv-3',
    sku: 'SKU-ONB-DED',
    name: 'Implementación Onboarding Dedicado',
    category: 'Services',
    stockQuantity: 8,
    reorderLevel: 5,
    unitPrice: 850.00,
    description: 'Cupos mensuales de horas de ingeniería para onboarding de clientes.',
    linkedDealsCount: 6,
    lastRestocked: '2026-08-10'
  },
  {
    id: 'inv-4',
    sku: 'SKU-HW-RDR',
    name: 'Lector de Código de Barras Industrial',
    category: 'Hardware',
    stockQuantity: 2, // Low stock alert!
    reorderLevel: 5,
    unitPrice: 340.00,
    description: 'Escáner rugerizado IP67 para control de inventario en planta.',
    linkedDealsCount: 3,
    lastRestocked: '2026-06-15'
  },
  {
    id: 'inv-5',
    sku: 'SKU-SRV-MNT',
    name: 'Mantenimiento Servidores Cloud SLA 99.9%',
    category: 'Infrastructure',
    stockQuantity: 15,
    reorderLevel: 5,
    unitPrice: 450.00,
    description: 'Monitoreo preventivo y respaldos automatizados en Cloud Run / Cloud SQL.',
    linkedDealsCount: 18,
    lastRestocked: '2026-08-05'
  }
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-1',
    description: 'Suscripción AWS Cloud Infraestructura',
    amount: 1250.00,
    category: 'Software',
    date: '2026-08-01',
    vendor: 'Amazon Web Services',
    assignedTo: 'DevOps Team',
    notes: 'Servidores de producción y bases de datos RDS'
  },
  {
    id: 'exp-2',
    description: 'Campaña Google Ads B2B Argentina',
    amount: 2400.00,
    category: 'Marketing',
    date: '2026-08-05',
    vendor: 'Google LLC',
    assignedTo: 'Growth Team',
    notes: 'Inbound leads adquisición sector industrial'
  },
  {
    id: 'exp-3',
    description: 'Vuelos & Hotel Conferencia Tech Buenos Aires',
    amount: 880.00,
    category: 'Travel',
    date: '2026-08-12',
    vendor: 'Aerolíneas Argentinas',
    assignedTo: 'Gonzalo Pozzo',
    notes: 'Representación institucional y reuniones con clientes VIP'
  },
  {
    id: 'exp-4',
    description: 'Nómina Desarrolladores & Soporte Técnico',
    amount: 12500.00,
    category: 'Salaries',
    date: '2026-08-15',
    vendor: 'Internal Payroll',
    assignedTo: 'HR Department',
    notes: 'Pago mensual de honorarios y sueldos'
  },
  {
    id: 'exp-5',
    description: 'Alquiler Oficina & Servicios Oficinas Centrales',
    amount: 1800.00,
    category: 'Office',
    date: '2026-08-18',
    vendor: 'WeWork',
    assignedTo: 'Operations',
    notes: 'Espacio de trabajo y servicios conexos'
  }
];
