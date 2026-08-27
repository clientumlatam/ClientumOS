import React, { useState, useEffect } from 'react';
import { ShoppingBag, Package, Plus, Trash2, ShoppingCart, CheckCircle2, MessageSquare, Store, Settings, Search, ExternalLink, ArrowRight, DollarSign, Eye, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface EcommerceProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
}

interface EcommerceOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: { product: EcommerceProduct; quantity: number }[];
  total: number;
  status: 'pendiente' | 'pagado' | 'despachado';
  createdAt: string;
}

const INITIAL_PRODUCTS: EcommerceProduct[] = [
  {
    id: 'prod-1',
    name: 'Kit Cerveza Artesanal Patagonia (6 botellas + Copón)',
    price: 14500,
    category: 'Bebidas & Gourmet',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1608270119061-44b76c8c50d4?w=500&auto=format&fit=crop&q=60',
    description: 'Selección exclusiva de cervezas artesanales de Bariloche con copón templado de colección.'
  },
  {
    id: 'prod-2',
    name: 'Café de Especialidad Orgánico 500g',
    price: 9800,
    category: 'Almacén',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=60',
    description: 'Grano entero tostado medio, notas a chocolate y frutos rojos. Origen sustentable.'
  },
  {
    id: 'prod-3',
    name: 'Asador Portátil Inoxidable con Estuche',
    price: 68900,
    category: 'Outdoor & Parrilla',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60',
    description: 'Estructura reforzada en acero inoxidable plegable para camping y quinchos.'
  },
  {
    id: 'prod-4',
    name: 'Termo Lumilagro Acero 1.2L Tapa Mate',
    price: 32400,
    category: 'Bazar & Termos',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&auto=format&fit=crop&q=60',
    description: 'Doble capa térmica con pico matero de precisión y manija ergonómica.'
  }
];

export function CompanyEcommerceView() {
  const [viewMode, setViewMode] = useState<'backoffice' | 'storefront'>('backoffice');
  const [products, setProducts] = useState<EcommerceProduct[]>(() => {
    const saved = localStorage.getItem('clientum_ecommerce_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_PRODUCTS; }
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<EcommerceOrder[]>(() => {
    const saved = localStorage.getItem('clientum_ecommerce_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: 'ORD-8821',
        customerName: 'Mariana Benítez',
        customerPhone: '+54 9 299 445-1122',
        customerEmail: 'mbenitez@gmail.com',
        items: [{ product: INITIAL_PRODUCTS[0], quantity: 2 }],
        total: 29000,
        status: 'pagado',
        createdAt: 'Hace 2 horas'
      }
    ];
  });

  const [storeName, setStoreName] = useState(() => localStorage.getItem('clientum_store_name') || 'Patagonia Market & Store');
  const [currency, setCurrency] = useState('$');
  const [cart, setCart] = useState<{ product: EcommerceProduct; quantity: number }[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // New product form
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Almacén');
  const [newProdStock, setNewProdStock] = useState('50');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');

  useEffect(() => {
    localStorage.setItem('clientum_ecommerce_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('clientum_ecommerce_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('clientum_store_name', storeName);
  }, [storeName]);

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const addToCart = (product: EcommerceProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const nextQ = item.quantity + delta;
        return nextQ > 0 ? { ...item, quantity: nextQ } : null;
      }
      return item;
    }).filter(Boolean) as { product: EcommerceProduct; quantity: number }[]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || cart.length === 0) return;

    const newOrder: EcommerceOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'cliente@tienda.com',
      items: [...cart],
      total: cartTotal,
      status: 'pendiente',
      createdAt: 'Justo ahora'
    };

    setOrders(prev => [newOrder, ...prev]);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });

    // Format WhatsApp text
    const itemsList = cart.map(i => `• ${i.quantity}x ${i.product.name} ($${(i.product.price * i.quantity).toLocaleString()})`).join('\n');
    const waText = encodeURIComponent(`Hola *${storeName}*, ¡acabo de realizar un pedido desde la tienda online!\n\n*Cliente:* ${customerName}\n*Teléfono:* ${customerPhone}\n\n*Detalle del Pedido:*\n${itemsList}\n\n*Total a pagar:* $${cartTotal.toLocaleString()}\n\nPor favor confirmar despacho y datos de pago. ¡Gracias!`);
    
    window.open(`https://wa.me/?text=${waText}`, '_blank');

    setCart([]);
    setIsCheckoutOpen(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const newP: EcommerceProduct = {
      id: 'prod-' + Date.now(),
      name: newProdName,
      price: parseFloat(newProdPrice) || 0,
      category: newProdCategory,
      stock: parseInt(newProdStock) || 10,
      image: newProdImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
      description: newProdDesc || 'Nuevo producto añadido al catálogo de la tienda.'
    };

    setProducts(prev => [newP, ...prev]);
    setShowNewProductModal(false);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdImage('');
    setNewProdDesc('');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in p-4 sm:p-6 bg-slate-950 text-white min-h-screen">
      {/* Top Banner & Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              E-Commerce Multi-Tenant B2B/B2C
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Tienda: {storeName}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Store className="w-7 h-7 text-emerald-400" />
            {storeName} — Gestor & Storefront
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center">
            <button
              onClick={() => setViewMode('backoffice')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'backoffice'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Backoffice Tienda</span>
            </button>
            <button
              onClick={() => setViewMode('storefront')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'storefront'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Ver Tienda Pública</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'backoffice' ? (
        /* BACKOFFICE VIEW */
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-medium">Productos Activos</span>
                <Package className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white">{products.length}</div>
              <p className="text-[11px] text-emerald-400 mt-1">Sincronizado con inventario</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-medium">Pedidos Recibidos</span>
                <ShoppingCart className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{orders.length}</div>
              <p className="text-[11px] text-blue-400 mt-1">Integrados con WhatsApp & CRM</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-medium">Facturación Tienda</span>
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                ${orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()}
              </div>
              <p className="text-[11px] text-purple-400 mt-1">Conversión óptima</p>
            </div>
          </div>

          {/* Product Management Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Gestión del Catálogo E-Commerce</h3>
                <p className="text-xs text-slate-400">Administra los productos que se muestran en tu tienda virtual propia.</p>
              </div>
              <button
                onClick={() => setShowNewProductModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Producto</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden flex flex-col group">
                  <div className="relative h-40 overflow-hidden bg-slate-900">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-[10px] font-semibold text-emerald-400">
                      Stock: {p.stock}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block mb-1">
                        {p.category}
                      </span>
                      <h4 className="text-sm font-bold text-white line-clamp-2 mb-2">{p.name}</h4>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                      <span className="text-base font-extrabold text-emerald-400">${p.price.toLocaleString()}</span>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Pedidos Recientes de la Tienda</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">ID Pedido</th>
                    <th className="py-3 px-4 font-semibold">Cliente</th>
                    <th className="py-3 px-4 font-semibold">Teléfono / WhatsApp</th>
                    <th className="py-3 px-4 font-semibold">Total</th>
                    <th className="py-3 px-4 font-semibold">Estado</th>
                    <th className="py-3 px-4 font-semibold">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">{o.id}</td>
                      <td className="py-3 px-4 font-medium text-white">{o.customerName}</td>
                      <td className="py-3 px-4 text-slate-300">{o.customerPhone}</td>
                      <td className="py-3 px-4 font-bold text-white">${o.total.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          o.status === 'pagado'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {o.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">{o.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* STOREFRONT PUBLIC VIEW */
        <div className="space-y-6">
          {/* Storefront Hero */}
          <div className="bg-gradient-to-r from-emerald-900/40 via-slate-900 to-blue-900/40 border border-emerald-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 inline-block">
                🛒 Tu Tienda Online Propia
              </span>
              <h2 className="text-3xl font-extrabold text-white mb-2">{storeName}</h2>
              <p className="text-slate-300 text-sm max-w-xl">
                Catálogo exclusivo sincronizado en tiempo real con tu inventario, WhatsApp y pipeline CRM. ¡Comprá directo o hacé tu pedido asistido por IA!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="relative flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Ver Carrito</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md animate-bounce">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search & Categories Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar productos en la tienda..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Storefront Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-xl font-black text-emerald-400">${product.price.toLocaleString()}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* New Product Modal */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-2xl"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-400" />
              <span>Nuevo Producto para la Tienda</span>
            </h3>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">Nombre del Producto</label>
                <input
                  required
                  type="text"
                  value={newProdName}
                  onChange={e => setNewProdName(e.target.value)}
                  placeholder="Ej: Kit Matero Premium"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1 block">Precio ($)</label>
                  <input
                    required
                    type="number"
                    value={newProdPrice}
                    onChange={e => setNewProdPrice(e.target.value)}
                    placeholder="15000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1 block">Stock Inicial</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={e => setNewProdStock(e.target.value)}
                    placeholder="50"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">Categoría</label>
                <input
                  type="text"
                  value={newProdCategory}
                  onChange={e => setNewProdCategory(e.target.value)}
                  placeholder="Ej: Almacén, Bebidas"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">URL de Imagen (Unsplash u otra)</label>
                <input
                  type="url"
                  value={newProdImage}
                  onChange={e => setNewProdImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">Descripción</label>
                <textarea
                  rows={2}
                  value={newProdDesc}
                  onChange={e => setNewProdDesc(e.target.value)}
                  placeholder="Detalle del producto..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewProductModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg cursor-pointer"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Cart & Checkout Drawer */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between p-6 text-white shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-base">Carrito de Compras</h3>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer p-1"
                >
                  ✕ Cerrar
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-16 text-center text-slate-400 text-sm">
                  Tu carrito está vacío. ¡Agregá productos de la tienda!
                </div>
              ) : (
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-3">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                          <span className="text-xs text-emerald-400 font-semibold">${item.product.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-xs font-bold hover:bg-slate-700 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-xs font-bold hover:bg-slate-700 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-base font-bold">
                  <span>Total Pedido:</span>
                  <span className="text-emerald-400 text-xl">${cartTotal.toLocaleString()}</span>
                </div>

                <div className="space-y-3">
                  <input
                    required
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Tu Nombre o Razón Social"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    required
                    type="tel"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="WhatsApp / Teléfono (+54...)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Pedido por WhatsApp</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
