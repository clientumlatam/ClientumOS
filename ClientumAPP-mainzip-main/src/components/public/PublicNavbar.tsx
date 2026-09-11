import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ArrowRight,
  Calculator,
  Bot,
  Sparkles,
  Menu,
  X,
  Store,
  Search,
  Zap,
  Layers,
  FileSpreadsheet,
  MessageSquare,
  BarChart3,
  Globe,
  GraduationCap,
  Award,
  Building2,
  Tractor,
  Briefcase,
  Stethoscope,
  Utensils,
  ShoppingBag,
  HardHat,
  Car,
  Phone,
} from 'lucide-react';
import { ClientumLogo } from '../common/ClientumLogo';
import { useCRM } from '../../context/CRMContext';
import { PublicRoutePath, PRODUCT_SUBNAV, INDUSTRIES_SUBNAV } from './publicRoutes';
import { PublicSearchDialog } from './PublicSearchDialog';
import { PUBLIC_SEARCH_ITEMS } from './publicNavData';
import { PublicMobileMenu } from './PublicMobileMenu';

interface PublicNavbarProps {
  currentPath: string;
  onNavigate: (path: PublicRoutePath) => void;
  currency: 'ARS' | 'USD';
  onToggleCurrency: () => void;
  onOpenWizard: () => void;
  onOpenSimulator: () => void;
  onOpenAudit: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentPath,
  onNavigate,
  currency,
  onToggleCurrency,
  onOpenWizard,
  onOpenSimulator,
  onOpenAudit,
}) => {
  const { enterApp, setIsAuthModalOpen, isAuthenticated } = useCRM();

  // Dropdown states
  const [activeMenu, setActiveMenu] = useState<'product' | 'industries' | 'resources' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Interactive Quick Search / Command Palette in header
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut (⌘K or Ctrl+K) to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setActiveMenu(null);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const handleNavClick = (path: PublicRoutePath) => {
    onNavigate(path);
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Industry icons map
  const getIndustryIcon = (path: string) => {
    if (path.includes('agro')) return <Tractor className="w-4 h-4 text-emerald-600" />;
    if (path.includes('estudios')) return <Briefcase className="w-4 h-4 text-blue-600" />;
    if (path.includes('distribuidoras')) return <Building2 className="w-4 h-4 text-amber-600" />;
    if (path.includes('salud')) return <Stethoscope className="w-4 h-4 text-rose-600" />;
    if (path.includes('inmobiliaria')) return <Building2 className="w-4 h-4 text-indigo-600" />;
    if (path.includes('gastronomia')) return <Utensils className="w-4 h-4 text-orange-600" />;
    if (path.includes('ecommerce')) return <ShoppingBag className="w-4 h-4 text-cyan-600" />;
    if (path.includes('construccion')) return <HardHat className="w-4 h-4 text-yellow-600" />;
    if (path.includes('automotor')) return <Car className="w-4 h-4 text-slate-700" />;
    return <Briefcase className="w-4 h-4 text-blue-600" />;
  };

  return (
    <>
      {/* Main sticky navigation header */}
      <header
        ref={navRef}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs font-['Plus_Jakarta_Sans',sans-serif]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand Logo Placeholder & ClientumCRM Title */}
          <div
            id="public-header-brand"
            className="flex items-center gap-3.5 cursor-pointer select-none group shrink-0"
            onClick={() => handleNavClick('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick('/');
              }
            }}
            aria-label="ClientumCRM Inicio"
          >
            {/* Professional Minimalist Brand Logo Placeholder */}
            <div
              id="brand-logo-placeholder"
              className="relative w-10 h-10 rounded-xl bg-slate-900 border border-slate-200/90 shadow-xs flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-md transition-all duration-200 shrink-0 overflow-visible"
              title="ClientumCRM Brand Logo"
            >
              {/* Inner geometric logo emblem with subtle gradient */}
              <div className="w-full h-full rounded-[11px] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex items-center justify-center p-1.5 overflow-hidden">
                <ClientumLogo className="w-6 h-6 text-white group-hover:scale-105 transition-transform duration-200" />
              </div>

              {/* Minimalist Live Service Pulse Indicator */}
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
                title="Plataforma Operativa 99.9% Uptime"
              />
            </div>

            {/* ClientumCRM Title & Subtitle with Optical Alignment */}
            <div className="flex flex-col justify-center select-none">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Clientum
                </span>
                <span className="text-xl font-extrabold text-blue-600 tracking-tight">
                  CRM
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 leading-none">
                <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                  Suite Comercial
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-[10px] text-blue-600 font-bold tracking-tight">
                  AFIP CAE
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Primary Navigation Bar */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-700">
            {/* Inicio */}
            <button
              onClick={() => handleNavClick('/')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                currentPath === '/'
                  ? 'text-blue-700 bg-blue-50 font-bold'
                  : 'hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              Inicio
            </button>

            {/* 1. PRODUCTO MEGA-MENU TRIGGER */}
            <div className="relative">
              <button
                id="public-header-product-link"
                type="button"
                onClick={() => handleNavClick('/producto')}
                aria-current={currentPath === '/producto' ? 'page' : undefined}
                className={`px-3 py-2 rounded-l-xl transition-all cursor-pointer ${
                  activeMenu === 'product' || currentPath.startsWith('/producto') || currentPath === '/clientum-crm'
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                <span>Producto</span>
              </button>
              <button
                type="button"
                aria-label="Abrir menú de Producto"
                aria-haspopup="menu"
                aria-expanded={activeMenu === 'product'}
                onClick={() => setActiveMenu(activeMenu === 'product' ? null : 'product')}
                className={`px-1.5 py-2 rounded-r-xl transition-all cursor-pointer ${
                  activeMenu === 'product' || currentPath.startsWith('/producto') || currentPath === '/clientum-crm'
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'product' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* PRODUCT MEGA-MENU DROPDOWN */}
              {activeMenu === 'product' && (
                <div className="absolute top-full left-0 mt-2 w-[760px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-12 gap-5">
                    
                    {/* Left: Product Modules (8 cols) */}
                    <div className="col-span-8 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Módulos Centrales de la Suite
                        </span>
                        <button
                          onClick={() => handleNavClick('/producto')}
                          className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Ver arquitectura completa</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleNavClick('/clientum-crm')}
                          className="p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700 flex items-center gap-1.5">
                              CRM 360° Omnicanal
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 font-bold">Principal</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Pipeline Kanban, scoring MEDDIC y seguimiento de oportunidades.</p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('/producto/whatsapp-ia')}
                          className="p-2.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                              WhatsApp Multiagente
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">Baileys QR</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Atención simultánea de varios vendedores con bot IA 24/7.</p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('/producto/erp')}
                          className="p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                            <FileSpreadsheet className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700 flex items-center gap-1.5">
                              Facturación AFIP CAE
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 font-bold">WSFE</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Facturas A, B, C y notas de crédito en &lt; 2s con código QR oficial.</p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('/producto/agentes-ia')}
                          className="p-2.5 rounded-xl hover:bg-purple-50/70 border border-transparent hover:border-purple-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-purple-700 flex items-center gap-1.5">
                              Agente OS Autónomo
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-700 font-bold">14 Roles</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Organigrama corporativo autónomo con modelos Gemini 3.7.</p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('/producto/automatizaciones')}
                          className="p-2.5 rounded-xl hover:bg-amber-50/70 border border-transparent hover:border-amber-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                            <Zap className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-amber-700">Automatizaciones DAG</div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Editor visual de flujos sin código para tareas y alertas automáticas.</p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('/producto/bi')}
                          className="p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                            <BarChart3 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700">Business Intelligence</div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Forecast, tasa de conversión y analítica por vendedor.</p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('/producto/integraciones')}
                          className="p-2.5 rounded-xl hover:bg-cyan-50/70 border border-transparent hover:border-cyan-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors shrink-0">
                            <Map className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-cyan-700 flex items-center gap-1.5">
                              Prospección Maps IA
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-100 text-cyan-700 font-bold">B2B</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Encontrá empresas, enriquecé datos e importá prospectos al CRM.</p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('/producto/integraciones')}
                          className="p-2.5 rounded-xl hover:bg-orange-50/70 border border-transparent hover:border-orange-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors shrink-0">
                            <Store className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 group-hover:text-orange-700 flex items-center gap-1.5">
                              Portal & Canales Digitales
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-700 font-bold">B2B</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Portal de clientes, widgets, KDS y pedidos de e-commerce conectados.</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Right: Featured Callout Banner (4 cols) */}
                    <div className="col-span-4 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-slate-50 border border-blue-100 rounded-xl p-4 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Pruébalo en Vivo</span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                          Simulador Interactivo de WhatsApp con IA
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                          Experimenta en tiempo real cómo responde un bot de ventas o soporte antes de activarlo en tu negocio.
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-blue-100/80">
                        <button
                          onClick={() => {
                            setActiveMenu(null);
                            onOpenSimulator();
                          }}
                          className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          <span>Abrir Simulador WhatsApp</span>
                        </button>
                        <button
                          onClick={() => handleNavClick('/tienda/central')}
                          className="w-full py-1.5 px-3 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Store className="w-3.5 h-3.5 text-blue-600" />
                          <span>Ver Catálogo en Tienda</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* 2. INDUSTRIAS MEGA-MENU TRIGGER */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'industries' ? null : 'industries')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMenu === 'industries' || currentPath.startsWith('/industrias')
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                <span>Industrias</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'industries' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* INDUSTRIES MEGA-MENU DROPDOWN */}
              {activeMenu === 'industries' && (
                <div className="absolute top-full left-0 mt-2 w-[720px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Soluciones Especializadas por Sector
                    </span>
                    <button
                      onClick={() => handleNavClick('/industrias')}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ver todas las 10 verticales</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {INDUSTRIES_SUBNAV.map((ind) => (
                      <button
                        key={ind.path}
                        onClick={() => handleNavClick(ind.path)}
                        className="p-2 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all text-left flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-100 transition-colors shrink-0 mt-0.5">
                          {getIndustryIcon(ind.path)}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700">
                            {ind.label}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {ind.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span className="text-xs text-slate-700 font-semibold">¿Tu sector requiere una integración personalizada?</span>
                    </div>
                    <button
                      onClick={() => handleNavClick('/contacto')}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Consultar con un especialista →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Precios (direct link) */}
            <button
              onClick={() => handleNavClick('/precios')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPath === '/precios'
                  ? 'text-blue-700 bg-blue-50 font-bold'
                  : 'hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
                <span>Precios</span>
            </button>

            {/* 3. RECURSOS & EMPRESA DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === 'resources' ? null : 'resources')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMenu === 'resources' ||
                  currentPath === '/casos' ||
                  currentPath === '/recursos' ||
                  currentPath === '/academia' ||
                  currentPath === '/servicios' ||
                  currentPath === '/about'
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                <span>Recursos</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'resources' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {activeMenu === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-[340px] bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                    Centro de Recursos & Empresa
                  </div>

                  <button
                    onClick={() => handleNavClick('/casos')}
                    className="w-full p-2.5 rounded-xl hover:bg-blue-50 text-left flex items-start gap-2.5 group cursor-pointer transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700">Casos de Éxito Reales</div>
                      <div className="text-[11px] text-slate-500">Métricas y testimonios verificados de clientes.</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/academia')}
                    className="w-full p-2.5 rounded-xl hover:bg-amber-50 text-left flex items-start gap-2.5 group cursor-pointer transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-amber-700">Campus Academia LMS</div>
                      <div className="text-[11px] text-slate-500">Capacitación comercial interactiva con diploma.</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/servicios')}
                    className="w-full p-2.5 rounded-xl hover:bg-blue-50 text-left flex items-start gap-2.5 group cursor-pointer transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700">Servicios de Migración</div>
                      <div className="text-[11px] text-slate-500">Acompañamiento e implementación en tu empresa.</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/dominios')}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-100 text-left flex items-start gap-2.5 group cursor-pointer transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-slate-900">Gestor de Dominios & DNS</div>
                      <div className="text-[11px] text-slate-500">Cloudflare Proxy, certificados SSL y SEO.</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/about')}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-100 text-left flex items-start gap-2.5 group cursor-pointer transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-slate-900">Sobre Clientum Latam</div>
                      <div className="text-[11px] text-slate-500">Nuestra historia, infraestructura y valores.</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Contacto Directo */}
            <button
              onClick={() => handleNavClick('/contacto')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                currentPath === '/contacto' || currentPath === '/demo'
                  ? 'text-blue-700 bg-blue-50 font-bold'
                  : 'hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              Contacto
            </button>
          </nav>

          {/* Quick Search, Auth & Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Interactive Search Bar Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 text-xs transition-colors cursor-pointer shadow-2xs"
              title="Buscar en todo el sitio (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px]">Buscar...</span>
              <kbd className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white border border-slate-200 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Secondary CTA: Pedir Demo */}
            <button
              onClick={() => handleNavClick('/contacto')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-700 hover:bg-blue-50/50 font-bold text-xs transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Pedir Demo</span>
            </button>

            {/* Primary CTA: dashboard access */}
            <button
              onClick={enterApp}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-600/20 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>{isAuthenticated ? 'Ir al Dashboard' : 'Ingresar al CRM'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs"
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* 3. MOBILE INTERACTIVE DRAWER / ACCORDION */}
        {isMobileMenuOpen && (
          <PublicMobileMenu
            currency={currency}
            isAuthenticated={isAuthenticated}
            onNavigate={handleNavClick}
            onClose={() => setIsMobileMenuOpen(false)}
            onToggleCurrency={onToggleCurrency}
            onOpenWizard={onOpenWizard}
            onOpenSimulator={onOpenSimulator}
            onOpenAudit={onOpenAudit}
            onOpenLogin={() => {
              setIsMobileMenuOpen(false);
              setIsAuthModalOpen(true);
            }}
            onEnterApp={() => {
              setIsMobileMenuOpen(false);
              enterApp();
            }}
          />
        )}
      </header>

      {/* 4. COMMAND PALETTE / QUICK FINDER MODAL (⌘K) */}
      <PublicSearchDialog
        isOpen={isSearchOpen}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onClose={() => setIsSearchOpen(false)}
        onSelect={handleNavClick}
        items={PUBLIC_SEARCH_ITEMS}
        inputRef={searchInputRef}
      />
    </>
  );
};
