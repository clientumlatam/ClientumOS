import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, Plus, Trash2, CheckCircle2, DollarSign, Store, Eye, Settings, Search, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import { useCRM } from '@clientum/ui';
import confetti from 'canvas-confetti';

interface ProductItem {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
}

interface OrderItem {
  id: string;
  customerName: string;
  customerPhone: string;
  items: string;
  total: number;
  status: string;
  createdAt: string;
}

const INITIAL_CATALOG: ProductItem[] = [
  {
    id: 'prod-101',
    name: 'Kit Cerveza Artesanal Patagonia (6 botellas)',
    price: 14500,
    category: 'Bebidas & Gourmet',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1608270119061-44b76c8c50d4?w=500&auto=format&fit=crop&q=60',
    description: 'Selección exclusiva de cervezas artesanales con copón templado de colección.'
  },
  {
    id: 'prod-102',
    name: 'Café de Especialidad Orgánico 500g',
    price: 9800,
    category: 'Almacén',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=60',
    description: 'Grano entero tostado medio, notas a chocolate y frutos rojos.'
  },
  {
    id: 'prod-103',
    name: 'Asador Portátil Inoxidable Plegable',
    price: 68900,
    category: 'Outdoor & Parrilla',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60',
    description: 'Estructura reforzada en acero inoxidable para camping y quinchos.'
  },
  {
    id: 'prod-104',
    name: 'Termo Lumilagro Acero 1.2L Tapa Mate',
    price: 32400,
    category: 'Bazar & Termos',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&auto=format&fit=crop&q=60',
    description: 'Doble capa térmica con pico matero de precisión.'
  }
];

export const EcommerceView: React.FC = () => {
  const { showToast, triggerConfetti } = useCRM();
  const [viewMode, setViewMode] = useState<'backoffice' | 'storefront'>('backoffice');
  const [storeName, setStoreName] = useState(() => localStorage.getItem('clientum_tenant_store') || 'Patagonia Market & Store (Tu Empresa)');
  
  const [catalog, setCatalog] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('clientum_tenant_catalog');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_CATALOG; }
    }
    return INITIAL_CATALOG;
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('clientum_tenant_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      { id: 'ECO-901', customerName: 'Mariana Benítez', customerPhone: '+54 9 299 445-1122', items: '2x Kit Cerveza Artesanal', total: 29000, status: 'Despachado', createdAt: 'Hace 2 horas' },
      { id: 'ECO-902', customerName: 'Mateo Roldán', customerPhone: '+54 9 11 4055-8822', items: '1x Asador Portátil', total: 68900, status: 'Preparando', createdAt: 'Hace 5 horas' }
    ];
  });

  const [cart, setCart] = useState<{ product: ProductItem; quantity: number }[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // New product form
  const [showNewModal, setShowNewModal] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Almacén');
  const [stock, setStock] = useState('30');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    localStorage.setItem('clientum_tenant_catalog', JSON.stringify(catalog));
  }, [catalog]);

  useEffect(() => {
    localStorage.setItem('clientum_tenant_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('clientum_tenant_store', storeName);
  }, [storeName]);

  const addToCart = (product: ProductItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Agregado al carrito: ${product.name}`, 'success');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone || cart.length === 0) return;

    const newOrder: OrderItem = {
      id: 'ECO-' + Math.floor(1000 + Math.random() * 9000),
      customerName: custName,
      customerPhone: custPhone,
      items: cart.map(i => `${i.quantity}x ${i.product.name}`).join(', '),
      total: cartTotal,
      status: 'Pendiente',
      createdAt: 'Justo ahora'
    };

    setOrders(prev => [newOrder, ...prev]);
    triggerConfetti();

    // WhatsApp send
    const itemsList = cart.map(i => `• ${i.quantity}x ${i.product.name} ($${i.product.price * i.quantity})`).join('\n');
    const waText = encodeURIComponent(`Hola *${storeName}*, nuevo pedido web:\n\n*Cliente:* ${custName}\n*Teléfono:* ${custPhone}\n\n*Productos:*\n${itemsList}\n\n*Total:* $${cartTotal.toLocaleString()}\n\nPor favor coordinar pago y entrega.`);
    window.open(`https://wa.me/?text=${waText}`, '_blank');

    setCart([]);
    setIsCheckoutOpen(false);
    setCustName('');
    setCustPhone('');
    showToast('¡Pedido creado y sincronizado con el CRM y WhatsApp!', 'success');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProd: ProductItem = {
      id: 'prod-' + Date.now(),
      name,
      price: parseFloat(price) || 0,
      category,
      stock: parseInt(stock) || 20,
      image: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
      description: description || 'Producto de tienda propia.'
    };

    setCatalog(prev => [newProd, ...prev]);
    setShowNewModal(false);
    setName('');
    setPrice('');
    setImage('');
    setDescription('');
    showToast('Producto agregado exitosamente al catálogo', 'success');
  };

  const deleteProduct = (id: string) => {
    setCatalog(prev => prev.filter(p => p.id !== id));
    showToast('Producto eliminado del catálogo', 'info');
  };

  const filteredCatalog = catalog.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#0a0c10] text-slate-300 text-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#212a3d]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[10px] border border-emerald-500/20">
              E-Commerce Multi-Tenant B2B/B2C
            </span>
            <input
              type="text"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              className="bg-[#131722] border border-[#212a3d] text-white px-2 py-0.5 rounded text-xs font-bold"
              title="Click para editar nombre de tu tienda"
            />
          </div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-400" />
            Tienda Online & Catálogo de Ventas de la Empresa
          </h3>
          <p className="text-xs text-slate-400">Cada usuario/empresa posee su propia tienda online con carrito, checkout y sincronización con leads del CRM.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('backoffice')}
            className={`px-3 py-1.5 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'backoffice' ? 'bg-emerald-600 text-white' : 'bg-[#131722] hover:bg-[#1c2333] text-slate-300'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Backoffice Tienda</span>
          </button>
          <button
            onClick={() => setViewMode('storefront')}
            className={`px-3 py-1.5 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'storefront' ? 'bg-emerald-600 text-white' : 'bg-[#131722] hover:bg-[#1c2333] text-slate-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista Storefront Público</span>
          </button>
        </div>
      </div>

      {viewMode === 'backoffice' ? (
        <div className="space-y-6">
          {/* Backoffice Management */}
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-slate-400">
              Gestión de Productos ({catalog.length}) & Inventario
            </h4>
            <button
              onClick={() => setShowNewModal(true)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nuevo Producto</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {catalog.map(prod => (
              <div key={prod.id} className="bg-[#131722] border border-[#212a3d] rounded-xl overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="h-32 bg-slate-900 relative overflow-hidden">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-black/70 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-semibold">
                      Stock: {prod.stock}
                    </span>
                  </div>
                  <div className="p-3 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase">{prod.category}</span>
                    <div className="font-bold text-white text-sm line-clamp-1">{prod.name}</div>
                    <p className="text-slate-400 text-[11px] line-clamp-2">{prod.description}</p>
                  </div>
                </div>
                <div className="p-3 pt-0 flex items-center justify-between border-t border-[#212a3d] mt-2">
                  <span className="font-mono font-bold text-emerald-400 text-sm">${prod.price.toLocaleString()}</span>
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="p-1 text-slate-400 hover:text-rose-400 rounded cursor-pointer"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Orders Section */}
          <div className="space-y-3 pt-4">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-slate-400">
              Órdenes de Compra Recibidas ({orders.length})
            </h4>
            <div className="bg-[#131722] border border-[#212a3d] rounded-xl overflow-hidden">
              <div className="divide-y divide-[#212a3d]">
                {orders.map(ord => (
                  <div key={ord.id} className="p-4 flex items-center justify-between hover:bg-[#161b28] transition-colors">
                    <div>
                      <div className="font-bold text-white text-xs">{ord.id} — Cliente: {ord.customerName} ({ord.customerPhone})</div>
                      <div className="text-[11px] text-slate-400">{ord.items}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-emerald-400 text-sm">${ord.total.toLocaleString()}</span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-[10px] border border-emerald-500/20">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Storefront Hero */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-[#131722] to-blue-950/40 border border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] mb-2 inline-block">
                🌐 Tu Tienda Online en Línea
              </span>
              <h2 className="text-xl font-bold text-white mb-1">{storeName}</h2>
              <p className="text-slate-400 text-xs">Catálogo interactivo con carrito de compras y pago directo vía WhatsApp o pasarela CRM.</p>
            </div>
            <button
              onClick={() => {
                const storeUrl = window.location.origin + '/tienda/' + storeName.toLowerCase().replace(/[^a-z0-9]/g, '-');
                navigator.clipboard.writeText(storeUrl);
                showToast(`¡Link público copiado al portapapeles! ${storeUrl}`, 'success');
              }}
              className="px-3.5 py-2.5 bg-[#1a2234] hover:bg-[#232d46] text-emerald-400 border border-emerald-500/30 rounded-xl font-bold flex items-center gap-2 text-xs transition-all cursor-pointer shadow"
              title="Copiar link público de tu tienda para compartir con clientes"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Copiar Link Tienda Pública</span>
            </button>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="relative px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Ver Carrito</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold animate-bounce">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar productos en la tienda..."
              className="w-full bg-[#131722] border border-[#212a3d] rounded-xl pl-9 pr-4 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Storefront Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCatalog.map(product => (
              <div key={product.id} className="bg-[#131722] border border-[#212a3d] rounded-xl overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="h-40 bg-slate-900 relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-2 right-2 bg-black/70 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-semibold">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase">{product.category}</span>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{product.name}</h4>
                    <p className="text-slate-400 text-[11px] line-clamp-2">{product.description}</p>
                  </div>
                </div>
                <div className="p-4 pt-0 flex items-center justify-between border-t border-[#212a3d] mt-3">
                  <span className="font-mono font-bold text-emerald-400 text-base">${product.price.toLocaleString()}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Comprar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Product Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#131722] border border-[#212a3d] rounded-2xl p-6 text-white space-y-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-400" />
              <span>Nuevo Producto para la Tienda</span>
            </h3>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">Nombre del Producto</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ej: Café Orgánico 1kg" className="w-full bg-[#0a0c10] border border-[#212a3d] rounded-lg px-3 py-2 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 text-[11px] block mb-1">Precio ($)</label>
                  <input required type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="12500" className="w-full bg-[#0a0c10] border border-[#212a3d] rounded-lg px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <label className="text-slate-400 text-[11px] block mb-1">Stock</label>
                  <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="50" className="w-full bg-[#0a0c10] border border-[#212a3d] rounded-lg px-3 py-2 text-xs text-white" />
                </div>
              </div>
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">Categoría</label>
                <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Ej: Bebidas" className="w-full bg-[#0a0c10] border border-[#212a3d] rounded-lg px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">URL de Imagen</label>
                <input type="url" value={image} onChange={e => setImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full bg-[#0a0c10] border border-[#212a3d] rounded-lg px-3 py-2 text-xs text-white" />
              </div>
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">Descripción</label>
                <textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="Detalle..." className="w-full bg-[#0a0c10] border border-[#212a3d] rounded-lg px-3 py-2 text-xs text-white resize-none" />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowNewModal(false)} className="px-3 py-1.5 text-slate-400 hover:text-white cursor-pointer">Cancelar</button>
                <button type="submit" className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold cursor-pointer">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Checkout Drawer */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#131722] border-l border-[#212a3d] h-full p-6 flex flex-col justify-between text-white">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#212a3d] mb-4">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-emerald-400" />
                  <span>Carrito de Compras ({cart.reduce((a,b)=>a+b.quantity,0)})</span>
                </h3>
                <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
              </div>

              {cart.length === 0 ? (
                <div className="py-16 text-center text-slate-400">El carrito está vacío.</div>
              ) : (
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between bg-[#0a0c10] p-2.5 rounded-xl border border-[#212a3d]">
                      <div>
                        <div className="font-bold text-white text-xs">{item.product.name}</div>
                        <div className="text-[11px] text-emerald-400">${item.product.price} x {item.quantity}</div>
                      </div>
                      <span className="font-bold text-xs">${(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <form onSubmit={handleCheckout} className="space-y-3 pt-4 border-t border-[#212a3d]">
                <div className="flex items-center justify-between font-bold text-sm">
                  <span>Total:</span>
                  <span className="text-emerald-400 text-base">${cartTotal.toLocaleString()}</span>
                </div>
                <input required type="text" value={custName} onChange={e => setCustName(e.target.value)} placeholder="Nombre y Apellido" className="w-full bg-[#0a0c10] border border-[#212a3d] rounded-lg px-3 py-2 text-xs text-white" />
                <input required type="tel" value={custPhone} onChange={e => setCustPhone(e.target.value)} placeholder="WhatsApp (+54...)" className="w-full bg-[#0a0c10] border border-[#212a3d] rounded-lg px-3 py-2 text-xs text-white" />
                <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg">
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Pedido por WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
