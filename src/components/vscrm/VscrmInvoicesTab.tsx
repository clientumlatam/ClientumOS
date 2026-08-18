import React, { useState } from 'react';
import { FileText, Plus, Download, Printer, CheckCircle, Clock, Trash2, X } from 'lucide-react';
import { jsPDF } from 'jspdf';
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

  const handleDownloadPdf = (inv: VscrmInvoice) => {
    const doc = new jsPDF();
    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('ClientumOS', 15, 25);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Sales & CRM Operating System', 15, 31);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('FACTURA', 195, 25, { align: 'right' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nº: ${inv.invoiceNumber}`, 195, 31, { align: 'right' });
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('DETALLES DE FACTURACIÓN', 15, 55);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Fecha de Emisión: ${inv.issueDate}`, 15, 63);
    doc.text(`Fecha de Vencimiento: ${inv.dueDate}`, 15, 69);
    doc.text(`Estado: ${inv.status}`, 15, 75);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('CLIENTE', 120, 55);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Nombre/Empresa: ${inv.clientName}`, 120, 63);
    const clientDetails = clients.find(c => c.id === inv.clientId);
    if (clientDetails) {
      doc.text(`Email: ${clientDetails.email}`, 120, 69);
      doc.text(`Teléfono: ${clientDetails.phone}`, 120, 75);
      doc.text(`País: ${clientDetails.country}`, 120, 81);
    }
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(15, 90, 195, 90);
    doc.setFillColor(248, 250, 252);
    doc.rect(15, 95, 180, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text('Descripción del Concepto / Servicio', 18, 100);
    doc.text('Cant.', 125, 100, { align: 'right' });
    doc.text('Precio Unit.', 155, 100, { align: 'right' });
    doc.text('Total', 192, 100, { align: 'right' });
    let currentY = 110;
    let subtotal = 0;
    inv.items.forEach((item) => {
      const itemTotal = item.quantity * item.unitPrice;
      subtotal += itemTotal;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      const splitDesc = doc.splitTextToSize(item.description, 100);
      doc.text(splitDesc, 18, currentY);
      doc.text(item.quantity.toString(), 125, currentY, { align: 'right' });
      doc.text(`$${item.unitPrice.toFixed(2)}`, 155, currentY, { align: 'right' });
      doc.text(`$${itemTotal.toFixed(2)}`, 192, currentY, { align: 'right' });
      currentY += (splitDesc.length * 5) + 5;
    });
    doc.setDrawColor(241, 245, 249);
    doc.line(15, currentY, 195, currentY);
    currentY += 10;
    const taxAmount = subtotal * (inv.taxRate / 100);
    const total = subtotal + taxAmount;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text('Subtotal:', 140, currentY, { align: 'right' });
    doc.setTextColor(15, 23, 42);
    doc.text(`$${subtotal.toFixed(2)} USD`, 192, currentY, { align: 'right' });
    currentY += 7;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`IVA / Impuestos (${inv.taxRate}%):`, 140, currentY, { align: 'right' });
    doc.setTextColor(15, 23, 42);
    doc.text(`$${taxAmount.toFixed(2)} USD`, 192, currentY, { align: 'right' });
    currentY += 7;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(79, 70, 229);
    doc.text('Total Facturado:', 140, currentY, { align: 'right' });
    doc.text(`$${total.toFixed(2)} USD`, 192, currentY, { align: 'right' });
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Gracias por su confianza y por hacer negocios con nosotros.', 105, 275, { align: 'center' });
    doc.save(`${inv.invoiceNumber}.pdf`);
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
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors cursor-pointer"
                        title="Imprimir Factura"
                      >
                        <Printer className="w-3.5 h-3.5" /> Imprimir
                      </button>
                      <button
                        onClick={() => handleDownloadPdf(inv)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-semibold transition-colors cursor-pointer"
                        title="Descargar PDF"
                      >
                        <Download className="w-3.5 h-3.5" /> Descargar
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
