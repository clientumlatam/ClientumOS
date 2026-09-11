import React, { useState } from 'react';
import { ShoppingCart, Plus, Package, CheckCircle2, DollarSign } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

export const EcommerceView: React.FC = () => {
  const { showToast, triggerConfetti } = useCRM();
  const [orders, setOrders] = useState([
    { id: 'ECO-901', customer: 'Lucía Fernández', items: '2x Zapatillas Urbanas Pro', total: '$180.00', status: 'Despachado (OCA)' },
    { id: 'ECO-902', customer: 'Mateo Benítez', items: '1x Mochila Antirrobo USB', total: '$85.00', status: 'Preparando Paquete' },
    { id: 'ECO-903', customer: 'Sofía Roldán', items: '3x Remera Algodón Pima', total: '$120.00', status: 'Entregado' }
  ]);

  const [catalog, setCatalog] = useState([
    { name: 'Zapatillas Urbanas Pro', price: '$90.00', stock: 42, category: 'Calzado' },
    { name: 'Mochila Antirrobo USB', price: '$85.00', stock: 15, category: 'Accesorios' },
    { name: 'Remera Algodón Pima', price: '$40.00', stock: 120, category: 'Indumentaria' }
  ]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0c10] text-slate-300 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-400" />
            E-commerce Storefront & Gestión de Pedidos Online
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Catálogo de productos web, pasarelas de pago integradas y sincronización de envíos.</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-slate-400">Catálogo de Productos en Tienda Online</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {catalog.map((prod, idx) => (
            <div key={idx} className="bg-[#131722] border border-[#212a3d] p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{prod.name}</span>
                <span className="text-emerald-400 font-bold font-mono text-sm">{prod.price}</span>
              </div>
              <div className="text-[11px] text-slate-400">Categoría: {prod.category} • Stock web: <strong className="text-white">{prod.stock} un.</strong></div>
              <button
                onClick={() => showToast(`Sincronizando stock de ${prod.name} con Shopify/WooCommerce`, 'success')}
                className="w-full mt-2 py-1.5 bg-[#1c2333] hover:bg-[#252f44] text-white rounded font-semibold transition-colors cursor-pointer"
              >
                Sincronizar Stock
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-slate-400">Órdenes de Tienda Online</h4>
        <div className="bg-[#131722] border border-[#212a3d] rounded-xl overflow-hidden">
          <div className="divide-y divide-[#212a3d]">
            {orders.map(ord => (
              <div key={ord.id} className="p-4 flex items-center justify-between hover:bg-[#161b28] transition-colors">
                <div>
                  <div className="font-semibold text-white text-xs">{ord.id} — {ord.customer}</div>
                  <div className="text-[11px] text-slate-400">{ord.items}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono font-bold text-white text-sm">{ord.total}</span>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 font-medium text-[10px] border border-blue-500/20">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
