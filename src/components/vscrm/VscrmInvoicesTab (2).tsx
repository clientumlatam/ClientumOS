import React, { useState } from 'react';
import { FileText, Plus, Download, Printer, CheckCircle, Clock, Trash2, X } from 'lucide-react';
import { VscrmInvoice, VscrmClient } from '../../types';
import { INITIAL_VS_INVOICES, INITIAL_VS_CLIENTS } from './vscrmData';

export function VscrmInvoicesTab() {
  const [invoices, setInvoices] = useState<VscrmInvoice[]>(() => {
    const saved = localStorage.getItem('vscrm_invoices');
    return saved ? JSON.parse(saved) : INITIAL_VS_INVOICES;
  });

  const clients: VscrmClient[] = (() => {
    const saved = localStorage.getItem('vscrm_clients');
    return saved ? JSON.parse(saved) : INITIAL_VS_CLIENTS;
  })();

  const [selectedInvoice, setSelectedInvoice] = useState<VscrmInvoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-002');
  const [itemDesc, setItemDesc] = useState('Consultoría de desarrollo de software');
  const [itemQty, setItemQty] = useState(10);
  const [itemPrice, setItemPrice] = useState(95);

  const saveInvoices = (updated: VscrmInvoice[]) => {
    setInvoices(updated);
    localStorage.setItem('vscrm_invoices', JSON.stringify(updated));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === clientId);
    const newInv: VscrmInvoice = {
      id: 'inv_' + Date.now(),
      invoiceNumber,
      clientId,
      clientName: client ? client.company : 'Cliente',
      items: [{ description: itemDesc, quantity: Number(itemQty), unitPrice: Number(itemPrice) }],
      taxRate: 19,
      status: 'Sent',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    saveInvoices([newInv, ...invoices]);
    setIsModalOpen(false);
  };

  const handlePrint = (inv: VscrmInvoice) => {
    setSelectedInvoice(inv);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const toggleStatus = (id: string) => {
    const updated = invoices.map(i => {
      if (i.id === id) {
        const next: 'Draft' | 'Sent' | 'Paid' = i.status === 'Sent' ? 'Paid' : i.status === 'Paid' ? 'Draft' : 'Sent';
        return { ...i, status: next };
      }
      return i;
    });
    saveInvoices(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" /> Facturación & Invoices (PDF Export)
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">Emisión de facturas profesionales con cálculo de impuestos y exportación PDF.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-colors cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4" /> Nueva Factura
        </button>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <th className="p-4">Factura #</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Emisión / Vencimiento</th>
                <th className="p-4">Monto Total</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {invoices.map(inv => {
                const subtotal = inv.items.reduce((s, i) => s + (i.quantity * i.unitPrice), 0);
                const total = subtotal * (1 + inv.taxRate / 100);
                return (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-indigo-600">{inv.invoiceNumber}</td>
                    <td className="p-4 font-semibold text-slate-900">{inv.clientName}</td>
                    <td className="p-4 text-slate-500">
                      <div>Emisión: {inv.issueDate}</div>
                      <div>Vence: {inv.dueDate}</div>
                    </td>
                    <td className="p-4 font-bold text-slate-900">${total.toLocaleString()} USD</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(inv.id)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                          inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                          inv.status === 'Sent' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                        }`}
                        title="Click para cambiar estado"
                      >
                        {inv.status}
                      </button>
                    </td>
                    <td className="p-4 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => handlePrint(inv)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
                        title="Generar PDF / Imprimir"
                      >
                        <Printer className="w-3.5 h-3.5" /> PDF
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">Emitir Nueva Factura</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Número de Factura</label>
                  <input
                    type="text"
                    required
                    value={invoiceNumber}
                    onChange={e => setInvoiceNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Cliente</label>
                  <select
                    value={clientId}
                    onChange={e => setClientId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.company}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción del Ítem</label>
                <input
                  type="text"
                  required
                  value={itemDesc}
                  onChange={e => setItemDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Cantidad / Horas</label>
                  <input
                    type="number"
                    value={itemQty}
                    onChange={e => setItemQty(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Precio Unitario ($)</label>
                  <input
                    type="number"
                    value={itemPrice}
                    onChange={e => setItemPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md"
                >
                  Generar Factura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
