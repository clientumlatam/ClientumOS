import React, { useState, useEffect } from 'react';
import { useCRM } from '../../context/CRMContext';
import { 
  Store, 
  Globe, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Search, 
  Plus, 
  Package, 
  DollarSign, 
  Star, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  ShoppingBag,
  Trash2,
  Edit3,
  BarChart3,
  Users,
  MessageSquare,
  TrendingUp,
  Cpu,
  Cloud,
  RefreshCw,
  Zap,
  Check,
  Layers,
  ArrowUpRight,
  Shield,
  Activity,
  Filter,
  Lock,
  Key,
  Upload,
  FileCode,
  History,
  ArrowRight,
  CornerDownRight,
  Radio,
  Terminal,
  Sliders,
  Eye,
  Clock,
  Settings2,
  Share2,
  ToggleLeft,
  ToggleRight,
  FileText,
  AlertTriangle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PublicProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
}

interface VerifiedCompanyDirectoryItem {
  id: string;
  name: string;
  slug: string;
  industry: string;
  rating: number;
  services: string[];
  description: string;
  verified: boolean;
  location: string;
}

interface CloudflareSubdomain {
  id: string;
  subdomain: string;
  fullDomain: string;
  dnsType: 'CNAME' | 'A';
  targetValue: string;
  proxied: boolean;
  sslStatus: 'active' | 'issuing';
  targetLandingPath: string;
  targetLandingTitle: string;
  cloudflarePlan: string;
  ttl: string;
  autoDetected: boolean;
  edgeLatencyMs: number;
  createdAt: string;
}

interface DiagnosticResult {
  domain: string;
  status: 'connected' | 'disconnected';
  isCnameCorrect: boolean;
  expectedCname: string;
  detectedCname: string;
  resolvedIps: string[];
  httpStatus: number;
  httpStatusText: string;
  sslStatus: 'valid' | 'invalid';
  sslHandshake: string;
  sslIssuer: string;
  sslDaysRemaining: number;
  edgeLatencyMs: number;
  ttl: string;
  edgeLocation: string;
  lastChecked: string;
  recommendation: string;
}

interface SslConfigState {
  domain: string;
  mode: 'cloudflare_auto' | 'custom_manual';
  status: 'active' | 'issuing' | 'expired' | 'error';
  issuer: string;
  protocol: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  autoRenew: boolean;
  manualCert?: {
    certPem: string;
    keyPem: string;
    caBundle?: string;
    uploadedAt: string;
    subjectName: string;
  };
}

interface DomainRedirectRule {
  id: string;
  sourceDomain: string;
  sourcePath: string;
  targetUrl: string;
  statusCode: 301 | 302;
  preserveQuery: boolean;
  enabled: boolean;
  hitsCount: number;
  createdAt: string;
}

interface DomainAuditLog {
  id: string;
  timestamp: string;
  domain: string;
  action: string;
  user: string;
  status: 'success' | 'warning' | 'error';
  details: string;
}

const AVAILABLE_LANDING_PAGES = [
  { path: '/tienda/acme-technologies', title: 'Tienda Pública Oficial (Catálogo B2B / E-commerce)', category: 'Comercio' },
  { path: '/agro', title: 'Agro & Campo CRM (Sector Agropecuario & Acopio)', category: 'Industrias' },
  { path: '/salud', title: 'Salud, Clínicas & Farma (Telemedicina & Citas)', category: 'Industrias' },
  { path: '/distribuidoras', title: 'Distribuidoras & Mayoristas B2B (Pedidos en Masa)', category: 'Industrias' },
  { path: '/inmobiliaria', title: 'Inmobiliarias & Real Estate (Propiedades & Tasaciones)', category: 'Industrias' },
  { path: '/b2b', title: 'B2B Enterprise & Servicios Profesionales (Consultoría)', category: 'Industrias' },
  { path: '/gastronomia', title: 'Gastronomía & Restaurantes (Reservas & Carta Digital)', category: 'Industrias' },
  { path: '/ecommerce', title: 'E-commerce & Retail (Checkout & Catálogo)', category: 'Industrias' },
  { path: '/estudios-contables', title: 'Estudios Contables & Finanzas (Asesoramiento)', category: 'Industrias' },
  { path: '/construccion', title: 'Construcción & Arquitectura (Obras & Presupuestos)', category: 'Industrias' },
  { path: '/automotor', title: 'Automotor & Concesionarias (Venta & Posventa)', category: 'Industrias' },
  { path: '/industrias', title: 'Directorio Completo de Industrias B2B', category: 'Portal' },
  { path: '/about', title: 'Portal Corporativo & Acerca de Nosotros', category: 'Portal' }
];

export const PublicStoreView: React.FC = () => {
  const { companies, showToast } = useCRM();

  // Tenant store settings state
  const [storeName, setStoreName] = useState('Acme Technologies & Store');
  const [storeSlug, setStoreSlug] = useState('acme-technologies');
  const [storeSlogan, setStoreSlogan] = useState('Soluciones tecnológicas empresariales y productos de alta gama.');
  const [currency, setCurrency] = useState('USD');
  const [activeTabSub, setActiveTabSub] = useState<'myStore' | 'analytics' | 'directory' | 'customDomain'>('myStore');

  // Custom domain state
  const [customDomainInput, setCustomDomainInput] = useState('tienda.miempresa.com');
  const [customDomainSaved, setCustomDomainSaved] = useState('tienda.acmetech.com');
  const [dnsStatus, setDnsStatus] = useState<'verified' | 'pending' | 'checking'>('verified');

  // Domain Sub-tabs navigation
  const [domainSubTab, setDomainSubTab] = useState<'subdomains' | 'diagnostics' | 'ssl' | 'redirects' | 'audit'>('subdomains');

  // 1. Diagnostics State
  const [diagDomainInput, setDiagDomainInput] = useState('tienda.acmetech.com');
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);

  // 2. SSL State
  const [sslConfig, setSslConfig] = useState<SslConfigState | null>(null);
  const [sslModeSelect, setSslModeSelect] = useState<'cloudflare_auto' | 'custom_manual'>('cloudflare_auto');
  const [isLoadingSsl, setIsLoadingSsl] = useState(false);
  const [manualCertPem, setManualCertPem] = useState('');
  const [manualKeyPem, setManualKeyPem] = useState('');
  const [manualCaBundle, setManualCaBundle] = useState('');
  const [isSavingSsl, setIsSavingSsl] = useState(false);
  const [isRenewingSsl, setIsRenewingSsl] = useState(false);

  // 3. Redirect Rules State
  const [redirectRules, setRedirectRules] = useState<DomainRedirectRule[]>([]);
  const [isLoadingRedirects, setIsLoadingRedirects] = useState(false);
  const [newRedirSourceDomain, setNewRedirSourceDomain] = useState('acmetech.com');
  const [newRedirSourcePath, setNewRedirSourcePath] = useState('/*');
  const [newRedirTargetUrl, setNewRedirTargetUrl] = useState('https://tienda.acmetech.com/*');
  const [newRedirStatus, setNewRedirStatus] = useState<301 | 302>(301);
  const [newRedirPreserveQuery, setNewRedirPreserveQuery] = useState(true);
  const [isCreatingRedirect, setIsCreatingRedirect] = useState(false);

  // 4. Audit Logs State
  const [auditLogs, setAuditLogs] = useState<DomainAuditLog[]>([]);
  const [isLoadingAuditLogs, setIsLoadingAuditLogs] = useState(false);
  const [auditSearchQuery, setAuditSearchQuery] = useState('');
  const [auditFilterStatus, setAuditFilterStatus] = useState<'all' | 'success' | 'warning' | 'error'>('all');
  const [lastAuditValidated, setLastAuditValidated] = useState<string | null>(null);

  // Cloudflare Free Subdomains State
  const [cfSubdomains, setCfSubdomains] = useState<CloudflareSubdomain[]>([]);
  const [isDetectingSubdomains, setIsDetectingSubdomains] = useState(false);
  const [subdomainSearch, setSubdomainSearch] = useState('');
  const [newSubPrefix, setNewSubPrefix] = useState('');
  const [newSubTargetLanding, setNewSubTargetLanding] = useState('/tienda/acme-technologies');
  const [newSubProxied, setNewSubProxied] = useState(true);
  const [isCreatingSubdomain, setIsCreatingSubdomain] = useState(false);

  // Initial data loading
  useEffect(() => {
    fetchCloudflareSubdomains();
    fetchSslConfig();
    fetchRedirectRules();
    fetchAuditLogs();
    // Run an initial diagnostic for instant feedback
    handleRunDiagnostics('tienda.acmetech.com');
  }, []);

  const handleRunDiagnostics = async (domainToTest?: string) => {
    const target = (domainToTest || diagDomainInput || customDomainSaved || 'tienda.acmetech.com').trim();
    setDiagDomainInput(target);
    setIsDiagnosing(true);
    try {
      const res = await fetch('/api/domain/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: target })
      });
      const data = await res.json();
      if (res.ok && data.diagnostic) {
        setDiagnosticResult(data.diagnostic);
        if (data.diagnostic.status === 'connected') {
          setDnsStatus('verified');
        } else {
          setDnsStatus('pending');
        }
        // Refresh audit log to show this validation check
        fetchAuditLogs();
      }
    } catch (err) {
      console.error('Error in domain diagnostics:', err);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const fetchSslConfig = async () => {
    setIsLoadingSsl(true);
    try {
      const res = await fetch('/api/domain/ssl');
      if (res.ok) {
        const data = await res.json();
        if (data.sslConfig) {
          setSslConfig(data.sslConfig);
          setSslModeSelect(data.sslConfig.mode);
        }
      }
    } catch (err) {
      console.error('Error fetching SSL config:', err);
    } finally {
      setIsLoadingSsl(false);
    }
  };

  const handleSaveSslConfig = async () => {
    setIsSavingSsl(true);
    try {
      const payload: any = {
        domain: customDomainSaved || 'tienda.acmetech.com',
        mode: sslModeSelect
      };

      if (sslModeSelect === 'custom_manual') {
        if (!manualCertPem.trim() || !manualKeyPem.trim()) {
          showToast('Debes ingresar el Certificado PEM y la Clave Privada PEM.', 'warning');
          setIsSavingSsl(false);
          return;
        }
        payload.customCert = {
          certPem: manualCertPem.trim(),
          keyPem: manualKeyPem.trim(),
          caBundle: manualCaBundle.trim() || undefined,
          subjectName: customDomainSaved || 'tienda.acmetech.com'
        };
      }

      const res = await fetch('/api/domain/ssl/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.sslConfig) {
        setSslConfig(data.sslConfig);
        confetti({ particleCount: 60, spread: 60 });
        showToast(data.message || 'Configuración SSL guardada con éxito', 'success');
        fetchAuditLogs();
      } else {
        showToast(data.error || 'Error al guardar configuración SSL', 'error');
      }
    } catch (err) {
      showToast('Error al conectar con la API de SSL', 'error');
    } finally {
      setIsSavingSsl(false);
    }
  };

  const handleRenewSsl = async () => {
    setIsRenewingSsl(true);
    try {
      const res = await fetch('/api/domain/ssl/renew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: customDomainSaved || 'tienda.acmetech.com' })
      });
      const data = await res.json();
      if (res.ok && data.sslConfig) {
        setSslConfig(data.sslConfig);
        confetti({ particleCount: 70, spread: 50 });
        showToast('¡Certificado SSL re-emitido y renovado exitosamente vía Cloudflare API!', 'success');
        fetchAuditLogs();
      } else {
        showToast(data.error || 'Error al renovar certificado', 'error');
      }
    } catch (err) {
      showToast('Error al procesar renovación SSL', 'error');
    } finally {
      setIsRenewingSsl(false);
    }
  };

  const fetchRedirectRules = async () => {
    setIsLoadingRedirects(true);
    try {
      const res = await fetch('/api/domain/redirects');
      if (res.ok) {
        const data = await res.json();
        if (data.redirects) {
          setRedirectRules(data.redirects);
        }
      }
    } catch (err) {
      console.error('Error fetching redirects:', err);
    } finally {
      setIsLoadingRedirects(false);
    }
  };

  const handleCreateRedirectRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRedirSourceDomain.trim() || !newRedirTargetUrl.trim()) {
      showToast('Por favor completa el dominio de origen y la URL de destino.', 'warning');
      return;
    }
    setIsCreatingRedirect(true);
    try {
      const res = await fetch('/api/domain/redirects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceDomain: newRedirSourceDomain.trim(),
          sourcePath: newRedirSourcePath.trim() || '/*',
          targetUrl: newRedirTargetUrl.trim(),
          statusCode: Number(newRedirStatus) as 301 | 302,
          preserveQuery: newRedirPreserveQuery
        })
      });
      const data = await res.json();
      if (res.ok && data.rule) {
        setRedirectRules(prev => [data.rule, ...prev]);
        confetti({ particleCount: 50, spread: 50 });
        showToast('¡Regla de redirección creada y activa en Cloudflare Edge!', 'success');
        fetchAuditLogs();
      } else {
        showToast(data.error || 'Error al crear la redirección', 'error');
      }
    } catch (err) {
      showToast('Error al comunicarse con el servidor', 'error');
    } finally {
      setIsCreatingRedirect(false);
    }
  };

  const handleToggleRedirectRule = async (id: string) => {
    setRedirectRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
    try {
      const res = await fetch(`/api/domain/redirects/${id}/toggle`, { method: 'PATCH' });
      const data = await res.json();
      if (res.ok) {
        showToast(`Regla ${data.enabled ? 'activada' : 'desactivada'} en Edge Cloudflare`, 'info');
        fetchAuditLogs();
      }
    } catch (err) {
      showToast('Error al cambiar estado de regla', 'error');
    }
  };

  const handleDeleteRedirectRule = async (id: string) => {
    setRedirectRules(prev => prev.filter(r => r.id !== id));
    try {
      const res = await fetch(`/api/domain/redirects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Regla de redirección eliminada', 'info');
        fetchAuditLogs();
      }
    } catch (err) {
      showToast('Error al eliminar regla', 'error');
    }
  };

  const fetchAuditLogs = async () => {
    setIsLoadingAuditLogs(true);
    try {
      const res = await fetch('/api/domain/audit-logs');
      if (res.ok) {
        const data = await res.json();
        if (data.auditLogs) {
          setAuditLogs(data.auditLogs);
        }
        if (data.lastValidatedAt) {
          setLastAuditValidated(data.lastValidatedAt);
        }
      }
    } catch (err) {
      console.error('Error fetching audit logs:', err);
    } finally {
      setIsLoadingAuditLogs(false);
    }
  };

  const fetchCloudflareSubdomains = async () => {
    setIsDetectingSubdomains(true);
    try {
      const res = await fetch('/api/cloudflare/subdomains');
      if (res.ok) {
        const data = await res.json();
        if (data.subdomains) {
          setCfSubdomains(data.subdomains);
        }
      }
    } catch (err) {
      console.error('Error fetching Cloudflare subdomains:', err);
    } finally {
      setIsDetectingSubdomains(false);
    }
  };

  const handleSyncCloudflare = async () => {
    setIsDetectingSubdomains(true);
    try {
      const res = await fetch('/api/cloudflare/sync', { method: 'POST' });
      const data = await res.json();
      if (data.subdomains) {
        setCfSubdomains(data.subdomains);
      }
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      showToast(`¡${data.detectedCount || cfSubdomains.length} subdominios detectados y sincronizados con Cloudflare Free!`, 'success');
    } catch (err) {
      showToast('Error al escanear Cloudflare DNS', 'error');
    } finally {
      setIsDetectingSubdomains(false);
    }
  };

  const handleMapSubdomain = async (subdomainId: string, newPath: string) => {
    const landingObj = AVAILABLE_LANDING_PAGES.find(p => p.path === newPath);
    const landingTitle = landingObj ? landingObj.title : newPath;

    // Optimistic UI update
    setCfSubdomains(prev => prev.map(s => {
      if (s.id === subdomainId) {
        return { ...s, targetLandingPath: newPath, targetLandingTitle: landingTitle };
      }
      return s;
    }));

    try {
      const res = await fetch('/api/cloudflare/subdomains/map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subdomainId,
          targetLandingPath: newPath,
          targetLandingTitle: landingTitle
        })
      });
      if (res.ok) {
        showToast(`¡Subdominio re-mapeado exitosamente a: ${landingTitle}!`, 'success');
      }
    } catch (err) {
      showToast('Error al actualizar el mapeo en el servidor', 'error');
    }
  };

  const handleToggleProxy = async (subdomainId: string) => {
    // Optimistic toggle
    setCfSubdomains(prev => prev.map(s => {
      if (s.id === subdomainId) {
        return { ...s, proxied: !s.proxied };
      }
      return s;
    }));

    try {
      const res = await fetch('/api/cloudflare/subdomains/toggle-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subdomainId })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || 'Estado de Cloudflare Proxy actualizado', 'info');
      }
    } catch (err) {
      showToast('Error al cambiar Cloudflare Proxy', 'error');
    }
  };

  const handleCreateSubdomain = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSub = newSubPrefix.toLowerCase().trim().replace(/[^a-z0-9-]/g, '');
    if (!cleanSub) {
      showToast('Ingresa un prefijo de subdominio válido (letras y números).', 'warning');
      return;
    }

    setIsCreatingSubdomain(true);
    const landingObj = AVAILABLE_LANDING_PAGES.find(p => p.path === newSubTargetLanding);
    const landingTitle = landingObj ? landingObj.title : newSubTargetLanding;

    try {
      const res = await fetch('/api/cloudflare/subdomains/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subdomain: cleanSub,
          targetLandingPath: newSubTargetLanding,
          targetLandingTitle: landingTitle,
          proxied: newSubProxied
        })
      });
      const data = await res.json();
      if (res.ok && data.subdomain) {
        setCfSubdomains(prev => [data.subdomain, ...prev.filter(s => s.id !== data.subdomain.id)]);
        setNewSubPrefix('');
        confetti({ particleCount: 70, spread: 60 });
        showToast(`¡Subdominio ${data.subdomain.fullDomain} creado y mapeado a ${landingTitle}!`, 'success');
      }
    } catch (err) {
      showToast('Error al crear subdominio en Cloudflare', 'error');
    } finally {
      setIsCreatingSubdomain(false);
    }
  };

  const handleDeleteSubdomain = async (id: string, fullDomain: string) => {
    setCfSubdomains(prev => prev.filter(s => s.id !== id));
    try {
      await fetch(`/api/cloudflare/subdomains/${id}`, { method: 'DELETE' });
      showToast(`Subdominio ${fullDomain} desvinculado de Cloudflare Free`, 'info');
    } catch (err) {
      showToast('Error al eliminar subdominio', 'error');
    }
  };

  // Filtered subdomains
  const filteredSubdomains = cfSubdomains.filter(s => 
    s.subdomain.toLowerCase().includes(subdomainSearch.toLowerCase()) ||
    s.targetLandingTitle.toLowerCase().includes(subdomainSearch.toLowerCase()) ||
    s.targetLandingPath.toLowerCase().includes(subdomainSearch.toLowerCase())
  );

  // Products in public store
  const [products, setProducts] = useState<PublicProduct[]>([
    { id: 'p1', name: 'Licencia Enterprise Clientum CRM (Anual)', price: 1200, category: 'Software', description: 'Acceso completo para 50 usuarios con IA avanzada y WhatsApp CRM.', inStock: true },
    { id: 'p2', name: 'Bot de WhatsApp IA 24/7 (Implementación)', price: 450, category: 'Automatización', description: 'Configuración personalizada de agentes IA conectados a tu base de datos.', inStock: true },
    { id: 'p3', name: 'Auditoría GTM & Estrategia Comercial', price: 300, category: 'Consultoría', description: 'Sesión de 2 horas con expertos en crecimiento B2B y funnel de ventas.', inStock: true },
  ]);

  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Servicios');
  const [newProdDesc, setNewProdDesc] = useState('');

  // Analytics state loaded from localStorage
  const [analytics, setAnalytics] = useState({
    views: 142,
    whatsappClicks: 28,
    leadSubmissions: 12
  });

  useEffect(() => {
    const analyticsKey = `clientum_store_analytics_${storeSlug}`;
    const saved = localStorage.getItem(analyticsKey);
    if (saved) {
      try {
        setAnalytics(JSON.parse(saved));
      } catch (e) {}
    }
  }, [storeSlug]);

  // Verified companies directory mock
  const directoryCompanies: VerifiedCompanyDirectoryItem[] = [
    { id: 'd1', name: 'Patagonia Market & Logistics', slug: 'patagonia-market', industry: 'Logística & Agro', rating: 4.9, services: ['Distribución Nacional', 'Fulfillment B2B', 'Tracking Satelital'], description: 'Líderes en logística de última milla y distribución agroindustrial en el Cono Sur.', verified: true, location: 'Buenos Aires, Argentina' },
    { id: 'd2', name: 'Fintech Soluciones Globales', slug: 'fintech-global', industry: 'Servicios Financieros', rating: 4.8, services: ['Pasarela de Pagos', 'Facturación AFIP', 'Créditos Pyme'], description: 'Infraestructura de pagos y conciliación bancaria automatizada para empresas.', verified: true, location: 'Santiago, Chile' },
    { id: 'd3', name: 'CloudScale DevOps Solutions', slug: 'cloudscale', industry: 'Tecnología & Cloud', rating: 5.0, services: ['Arquitectura Kubernetes', 'CI/CD Pipelines', 'Seguridad Ofensiva'], description: 'Optimización de infraestructura cloud y alta disponibilidad para aplicaciones SaaS.', verified: true, location: 'São Paulo, Brasil' },
    { id: 'd4', name: 'Medical Group San Justo', slug: 'medical-san-justo', industry: 'Salud & Farma', rating: 4.7, services: ['Telemedicina 24/7', 'Gestión de Historias Clínicas', 'Farmacia Online'], description: 'Red de clínicas y provisión de suministros médicos con entrega express.', verified: true, location: 'Córdoba, Argentina' },
  ];

  const publicUrl = window.location.origin + '/tienda/' + (storeSlug.trim() || 'mi-tienda');
  const subdomainUrl = `https://${storeSlug.trim() || 'mi-empresa'}.clientum.com.ar`;

  const handleCopyLink = (urlToCopy: string) => {
    navigator.clipboard.writeText(urlToCopy);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    showToast(`¡Enlace copiado al portapapeles! ${urlToCopy}`, 'success');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice) {
      showToast('Por favor completa el nombre y precio del producto/servicio.', 'warning');
      return;
    }

    const newItem: PublicProduct = {
      id: 'p_' + Date.now(),
      name: newProdName,
      price: parseFloat(newProdPrice) || 0,
      category: newProdCategory,
      description: newProdDesc || 'Producto verificado en tienda pública.',
      inStock: true,
    };

    setProducts([newItem, ...products]);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdDesc('');
    showToast('¡Producto o servicio añadido al catálogo público con éxito!', 'success');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    showToast('Producto eliminado del catálogo.', 'info');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#0d0f14] text-slate-100 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#1e2330]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Store className="w-3.5 h-3.5" />
            <span>Subdominios Dinámicos & Tienda Pública</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gestión de Tienda Pública y Subdominios
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Configura tu subdominio personalizado (<span className="text-emerald-400 font-mono">empresa.clientum.com.ar</span>), revisa analíticas en tiempo real y gestiona tu catálogo.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#131722] p-1.5 rounded-2xl border border-[#1e2330]">
          <button
            onClick={() => setActiveTabSub('myStore')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTabSub === 'myStore'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mi Tienda & Subdominio
          </button>
          <button
            onClick={() => setActiveTabSub('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTabSub === 'analytics'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Analíticas & Vistas
          </button>
          <button
            onClick={() => setActiveTabSub('directory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTabSub === 'directory'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Directorio Verificado
          </button>
          <button
            onClick={() => setActiveTabSub('customDomain')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTabSub === 'customDomain'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Subdominios & Cloudflare Free</span>
          </button>
        </div>
      </div>

      {activeTabSub === 'myStore' ? (
        <div className="space-y-8">
          {/* Subdomain & URL Generator Card */}
          <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Sistema de Subdominios Dinámicos</h2>
                  <p className="text-xs text-slate-400">Cada negocio posee su propia landing page optimizada con subdominio dedicado.</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SSL Activo (HTTPS)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nombre Comercial</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Subdominio Dedicado</label>
                <div className="flex items-center bg-[#1a2130] border border-[#273046] rounded-xl overflow-hidden">
                  <input
                    type="text"
                    value={storeSlug}
                    onChange={(e) => setStoreSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="w-full pl-3 py-2.5 bg-transparent border-none text-white text-sm focus:outline-none font-mono"
                  />
                  <span className="pr-3 text-xs text-emerald-400 font-mono">.clientum.com.ar</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Moneda de Cobro</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="ARS">ARS ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="MXN">MXN ($)</option>
                </select>
              </div>
            </div>

            {/* Subdomain & Link Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#19202f] border border-[#273248] space-y-2">
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Subdominio Dinámico Oficial</div>
                <div className="font-mono text-xs text-white truncate bg-[#121620] px-3 py-2 rounded-lg border border-[#222c3f]">
                  {subdomainUrl}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleCopyLink(subdomainUrl)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Subdominio</span>
                  </button>
                  <a
                    href={`/tienda/${storeSlug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-[#1e2638] hover:bg-[#253047] text-slate-200 border border-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Abrir Tienda</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#19202f] border border-[#273248] space-y-2">
                <div className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">URL Estándar de Respaldo</div>
                <div className="font-mono text-xs text-white truncate bg-[#121620] px-3 py-2 rounded-lg border border-[#222c3f]">
                  {publicUrl}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleCopyLink(publicUrl)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Link CRM</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product & Service Catalog Manager */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Añadir Producto o Servicio</span>
              </h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Nombre del Ítem</label>
                  <input
                    type="text"
                    placeholder="Ej. Consultoría / Licencia PRO"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Precio ({currency})</label>
                    <input
                      type="number"
                      placeholder="299"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Categoría</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Servicios">Servicios</option>
                      <option value="Software">Software</option>
                      <option value="Consultoría">Consultoría</option>
                      <option value="Productos">Productos</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Descripción Breve</label>
                  <textarea
                    rows={3}
                    placeholder="Detalles para tus clientes en la tienda pública..."
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-all shadow-lg cursor-pointer"
                >
                  Publicar en Subdominio
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-[#131722] border border-[#1e2330] rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1e2330]">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-400" />
                  <span>Catálogo Activo en Subdominio ({products.length})</span>
                </h2>
                <span className="text-xs text-slate-400">Sincronizado en tiempo real</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((prod) => (
                  <div key={prod.id} className="p-4 rounded-2xl bg-[#19202f] border border-[#232d44] flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 font-semibold">
                          {prod.category}
                        </span>
                        <span className="font-extrabold text-emerald-400 text-sm">
                          ${prod.price} {currency}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-sm mt-1">{prod.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{prod.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-b border-slate-800/60">
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Disponible Online
                      </span>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : activeTabSub === 'analytics' ? (
        /* Analytics Panel */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 shadow-xl space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>Visitas Totales (Subdominio)</span>
              </div>
              <div className="text-4xl font-extrabold text-white">{analytics.views}</div>
              <p className="text-xs text-emerald-400 font-medium">+18% esta semana</p>
            </div>

            <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 shadow-xl space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Clics en WhatsApp</span>
              </div>
              <div className="text-4xl font-extrabold text-white">{analytics.whatsappClicks}</div>
              <p className="text-xs text-blue-400 font-medium">Alta tasa de conversión</p>
            </div>

            <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 shadow-xl space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Leads Capturados (CRM)</span>
              </div>
              <div className="text-4xl font-extrabold text-white">{analytics.leadSubmissions}</div>
              <p className="text-xs text-purple-400 font-medium">Sincronizados en pipeline</p>
            </div>
          </div>

          <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Orígenes de Tráfico y Clics</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">WhatsApp Directo (Widget Flotante)</span>
                  <span className="text-emerald-400 font-bold">52%</span>
                </div>
                <div className="w-full bg-[#19202f] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '52%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Buscadores Google (SEO & Sitemap)</span>
                  <span className="text-blue-400 font-bold">28%</span>
                </div>
                <div className="w-full bg-[#19202f] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Redes Sociales & Campañas</span>
                  <span className="text-purple-400 font-bold">20%</span>
                </div>
                <div className="w-full bg-[#19202f] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeTabSub === 'customDomain' ? (
        /* Cloudflare Free Subdomain Auto-Detection, Mapping & Comprehensive Domain Management Panel */
        <div className="space-y-8 max-w-5xl">
          {/* Top Domain Sub-Navigation Bar */}
          <div className="bg-[#131722] border border-[#1e2330] rounded-2xl p-2 shadow-xl flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setDomainSubTab('subdomains')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                domainSubTab === 'subdomains'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-[#1a2130]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Subdominios & Mapeo</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-md bg-black/30 text-[10px] font-mono">
                {cfSubdomains.length}
              </span>
            </button>

            <button
              onClick={() => {
                setDomainSubTab('diagnostics');
                if (!diagnosticResult) {
                  handleRunDiagnostics('tienda.acmetech.com');
                }
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                domainSubTab === 'diagnostics'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-[#1a2130]'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Diagnóstico DNS & CNAME</span>
              <span className={`w-2 h-2 rounded-full ${dnsStatus === 'verified' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            </button>

            <button
              onClick={() => {
                setDomainSubTab('ssl');
                fetchSslConfig();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                domainSubTab === 'ssl'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-[#1a2130]'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Certificados SSL</span>
            </button>

            <button
              onClick={() => {
                setDomainSubTab('redirects');
                fetchRedirectRules();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                domainSubTab === 'redirects'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-[#1a2130]'
              }`}
            >
              <CornerDownRight className="w-4 h-4" />
              <span>Redirecciones (301/302)</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-md bg-black/30 text-[10px] font-mono">
                {redirectRules.length}
              </span>
            </button>

            <button
              onClick={() => {
                setDomainSubTab('audit');
                fetchAuditLogs();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                domainSubTab === 'audit'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-[#1a2130]'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Historial de Auditoría</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-md bg-black/30 text-[10px] font-mono">
                {auditLogs.length}
              </span>
            </button>
          </div>

          {/* TAB 1: SUBDOMINIOS & MAPEO CLOUDFLARE FREE */}
          {domainSubTab === 'subdomains' && (
            <div className="space-y-8">
              {/* Cloudflare Free Tier Status Banner */}
              <div className="bg-gradient-to-r from-[#171b26] via-[#151c2d] to-[#121927] border border-[#232d44] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#232d44]">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold">
                      <Cloud className="w-3.5 h-3.5" />
                      <span>Cloudflare Free Tier • DNS Anycast & Universal SSL</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                      <span>Gestor de Subdominios y Landing Pages</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      Detección automática de subdominios gestionados en <strong className="text-white font-mono">clientum.com.ar</strong> mediante la infraestructura gratuita de Cloudflare. Mapea cada subdominio a diferentes landing pages de tu negocio al instante.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={handleSyncCloudflare}
                      disabled={isDetectingSubdomains}
                      className="px-4 py-2.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-600/25 cursor-pointer"
                    >
                      <RefreshCw className={`w-4 h-4 ${isDetectingSubdomains ? 'animate-spin' : ''}`} />
                      <span>{isDetectingSubdomains ? 'Escaneando Cloudflare...' : 'Detectar y Sincronizar Subdominios'}</span>
                    </button>
                  </div>
                </div>

                {/* Cloudflare Free Architecture Perks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                  <div className="bg-[#10141e]/80 border border-[#1f2738] p-4 rounded-2xl flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 shrink-0">
                      <Cloud className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Proxy Orange Cloud (Gratis)</h4>
                      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">Oculta IP de origen y protege contra ataques DDoS a nivel perimetral.</p>
                    </div>
                  </div>

                  <div className="bg-[#10141e]/80 border border-[#1f2738] p-4 rounded-2xl flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Universal SSL Automático</h4>
                      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">Certificados HTTPS TLS 1.3 emitidos y renovados al 100% sin costo.</p>
                    </div>
                  </div>

                  <div className="bg-[#10141e]/80 border border-[#1f2738] p-4 rounded-2xl flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Anycast Global Edge CDN</h4>
                      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">Resolución DNS ultrarrápida (&lt;20ms) y cacheo de landing pages.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create & Map New Subdomain Card */}
              <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e2330]">
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-orange-400" />
                    <h3 className="text-sm font-bold text-white">Crear y Mapear Nuevo Subdominio (Cloudflare Free CNAME)</h3>
                  </div>
                  <span className="text-[11px] text-slate-400">Zona: <strong className="text-orange-400 font-mono">clientum.com.ar</strong></span>
                </div>

                <form onSubmit={handleCreateSubdomain} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-4 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Prefijo de Subdominio</label>
                    <div className="flex items-center bg-[#1a2130] border border-[#273046] rounded-xl overflow-hidden px-3 py-2">
                      <input
                        type="text"
                        placeholder="ej. ventas, ofertas, agro"
                        value={newSubPrefix}
                        onChange={(e) => setNewSubPrefix(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        className="w-full bg-transparent border-none text-white text-xs font-mono focus:outline-none"
                      />
                      <span className="text-[11px] text-slate-400 font-mono">.clientum.com.ar</span>
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Landing Page de Destino</label>
                    <select
                      value={newSubTargetLanding}
                      onChange={(e) => setNewSubTargetLanding(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
                    >
                      {AVAILABLE_LANDING_PAGES.map((page, idx) => (
                        <option key={idx} value={page.path}>
                          [{page.category}] {page.title} ({page.path})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <button
                      type="submit"
                      disabled={isCreatingSubdomain || !newSubPrefix.trim()}
                      className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isCreatingSubdomain ? 'Provisionando...' : 'Crear en Cloudflare'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Subdomains List & Mappings Table */}
              <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#1e2330]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <span>Subdominios Detectados en Cloudflare</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-mono font-bold">
                          {filteredSubdomains.length} activos
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400">Mapea y redirige cada subdominio a diferentes landings de industria o catálogos en tiempo real.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#1a2130] px-3 py-2 rounded-xl border border-[#273046]">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Filtrar por subdominio o landing..."
                      value={subdomainSearch}
                      onChange={(e) => setSubdomainSearch(e.target.value)}
                      className="bg-transparent border-none text-xs text-white focus:outline-none w-48 sm:w-64"
                    />
                  </div>
                </div>

                {/* Subdomain Cards Grid */}
                <div className="space-y-3">
                  {filteredSubdomains.length === 0 ? (
                    <div className="text-center py-12 bg-[#10141e] border border-dashed border-[#1f2738] rounded-2xl space-y-3">
                      <Cloud className="w-8 h-8 text-slate-600 mx-auto" />
                      <div className="text-sm font-bold text-slate-300">No se encontraron subdominios</div>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Haz clic en "Detectar y Sincronizar Subdominios" para consultar los registros de Cloudflare Free o crea uno nuevo arriba.
                      </p>
                    </div>
                  ) : (
                    filteredSubdomains.map((sub) => (
                      <div
                        key={sub.id}
                        className="bg-[#171d2b] border border-[#232d44] hover:border-orange-500/40 rounded-2xl p-4 sm:p-5 transition-all space-y-4"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          {/* Left: Domain & DNS Details */}
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="font-mono text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
                                <Globe className="w-4 h-4 text-emerald-400" />
                                {sub.fullDomain}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-[#10141e] text-slate-300 font-mono text-[10px] border border-slate-700">
                                {sub.dnsType} → {sub.targetValue}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-[10px] border border-emerald-500/20 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> SSL TLS 1.3
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono text-[10px]">
                                ~{sub.edgeLatencyMs}ms Edge
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-2">
                              <span>Mapeado actualmente a:</span>
                              <strong className="text-orange-300 font-semibold">{sub.targetLandingTitle}</strong>
                              <span className="font-mono text-slate-500">({sub.targetLandingPath})</span>
                            </div>
                          </div>

                          {/* Right: Cloudflare Proxy Switch & Quick Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            {/* Cloudflare Proxy Toggle */}
                            <button
                              onClick={() => handleToggleProxy(sub.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
                                sub.proxied
                                  ? 'bg-orange-500/15 text-orange-400 border-orange-500/30 hover:bg-orange-500/25'
                                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                              }`}
                              title={sub.proxied ? 'Proxy Activo (Orange Cloud ☁️): CDN, SSL & DDoS Activos' : 'DNS Only (Grey Cloud 🔘)'}
                            >
                              <Cloud className={`w-3.5 h-3.5 ${sub.proxied ? 'fill-orange-400 text-orange-400' : 'text-slate-400'}`} />
                              <span>{sub.proxied ? 'Proxied (Orange Cloud ☁️)' : 'DNS Only (Grey Cloud 🔘)'}</span>
                            </button>

                            <button
                              onClick={() => {
                                window.open(sub.targetLandingPath, '_blank');
                              }}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow"
                              title="Probar y abrir esta landing page"
                            >
                              <span>Probar Landing</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(`https://${sub.fullDomain}`);
                                showToast(`¡URL https://${sub.fullDomain} copiada!`, 'success');
                              }}
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all cursor-pointer"
                              title="Copiar URL completa"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteSubdomain(sub.id, sub.fullDomain)}
                              className="p-2 bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer"
                              title="Desvincular subdominio"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Mapping Dropdown Row */}
                        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="font-semibold text-slate-400">Re-mapear a otra Landing:</span>
                            <select
                              value={sub.targetLandingPath}
                              onChange={(e) => handleMapSubdomain(sub.id, e.target.value)}
                              className="px-3 py-1.5 bg-[#121622] border border-[#28324a] hover:border-orange-500/50 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-orange-500 transition-colors"
                            >
                              {AVAILABLE_LANDING_PAGES.map((page, idx) => (
                                <option key={idx} value={page.path}>
                                  [{page.category}] {page.title} → {page.path}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="text-[11px] text-slate-400 font-mono">
                            Estado Cloudflare: <span className="text-emerald-400 font-bold">100% Sincronizado</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* External Custom Domain (CNAME Flattening on Cloudflare Free) */}
              <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-indigo-400" />
                      <span>Configuración de Dominio Personalizado Externo (CNAME)</span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      ¿Tienes tu propio dominio registrado en GoDaddy, DonWeb, NIC.ar o Cloudflare? Conéctalo mediante CNAME a Clientum.
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${
                    dnsStatus === 'verified'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${dnsStatus === 'verified' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                    {dnsStatus === 'verified' ? 'Dominio Verificado & SSL Activo' : 'Verificando CNAME...'}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Tu Dominio o Subdominio Propio</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="tienda.tuempresa.com"
                        value={customDomainInput}
                        onChange={(e) => setCustomDomainInput(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        onClick={() => {
                          if (!customDomainInput.trim()) {
                            showToast('Ingresa un dominio válido.', 'warning');
                            return;
                          }
                          setDnsStatus('checking');
                          setCustomDomainSaved(customDomainInput.trim());
                          handleRunDiagnostics(customDomainInput.trim());
                        }}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer"
                      >
                        Guardar y Diagnosticar DNS
                      </button>
                    </div>
                  </div>

                  {/* DNS Instructions Card */}
                  <div className="bg-[#181f2f] border border-[#273248] rounded-2xl p-5 space-y-4">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Instrucciones DNS para Proveedores Externos (Registro CNAME)</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Para que tu dominio apunte correctamente a tu tienda y landings en Clientum a través de Cloudflare Free, añade el siguiente registro CNAME:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-[#121620] p-3 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Tipo</span>
                        <div className="font-mono text-xs font-bold text-indigo-400">CNAME</div>
                      </div>
                      <div className="bg-[#121620] p-3 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Nombre / Host</span>
                        <div className="font-mono text-xs font-bold text-white truncate">{customDomainSaved.split('.')[0] || 'tienda'}</div>
                      </div>
                      <div className="bg-[#121620] p-3 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Apunta a (Value)</span>
                        <div className="font-mono text-xs font-bold text-emerald-400 truncate">proxy.clientum.com.ar</div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
                      <span>Estado actual: <strong className="text-emerald-400 font-mono">https://{customDomainSaved}</strong></span>
                      <button
                        onClick={() => {
                          const text = `Tipo: CNAME\nHost: ${customDomainSaved.split('.')[0]}\nApunta a: proxy.clientum.com.ar\nProxy: Proxied (Orange Cloud)`;
                          navigator.clipboard.writeText(text);
                          showToast('¡Configuración CNAME copiada al portapapeles!', 'success');
                        }}
                        className="text-indigo-400 hover:text-indigo-300 font-semibold underline cursor-pointer"
                      >
                        Copiar Datos DNS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DIAGNÓSTICO DNS & CNAME */}
          {domainSubTab === 'diagnostics' && (
            <div className="space-y-6">
              {/* Diagnostic Controller Bar */}
              <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Diagnóstico en Tiempo Real de Red & CNAME</span>
                    </div>
                    <h2 className="text-xl font-extrabold text-white">Validación de Enrutamiento DNS y Estado Perimetral</h2>
                    <p className="text-xs text-slate-400">
                      Inspecciona si los registros CNAME apuntan a los servidores perimetrales de Clientum, valida el apretón de manos SSL y mide latencia.
                    </p>
                  </div>

                  <button
                    onClick={() => handleRunDiagnostics(diagDomainInput)}
                    disabled={isDiagnosing}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <RefreshCw className={`w-4 h-4 ${isDiagnosing ? 'animate-spin' : ''}`} />
                    <span>{isDiagnosing ? 'Ejecutando Diagnóstico...' : 'Ejecutar Diagnóstico Ahora'}</span>
                  </button>
                </div>

                {/* Target Domain Input and Quick Selector */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-semibold text-slate-300">Dominio o Subdominio a Validar:</label>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center bg-[#1a2130] border border-[#273046] rounded-xl px-4 py-2">
                      <Globe className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                      <input
                        type="text"
                        placeholder="tienda.acmetech.com"
                        value={diagDomainInput}
                        onChange={(e) => setDiagDomainInput(e.target.value)}
                        className="w-full bg-transparent border-none text-white text-xs font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
                    <span>Pruebas rápidas:</span>
                    <button
                      onClick={() => {
                        setDiagDomainInput('tienda.acmetech.com');
                        handleRunDiagnostics('tienda.acmetech.com');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#182030] hover:bg-[#202b40] text-emerald-300 border border-emerald-500/30 font-mono text-[11px] cursor-pointer"
                    >
                      tienda.acmetech.com
                    </button>
                    {cfSubdomains.slice(0, 3).map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setDiagDomainInput(sub.fullDomain);
                          handleRunDiagnostics(sub.fullDomain);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#182030] hover:bg-[#202b40] text-slate-300 border border-slate-700 font-mono text-[11px] cursor-pointer"
                      >
                        {sub.fullDomain}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Diagnostic Results Hero */}
              {diagnosticResult ? (
                <div className="space-y-6">
                  {/* Status Hero Card */}
                  <div className={`border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all ${
                    diagnosticResult.status === 'connected'
                      ? 'bg-gradient-to-r from-[#0d1e19] via-[#0f241d] to-[#0c1815] border-emerald-500/40 shadow-emerald-950/20'
                      : 'bg-gradient-to-r from-[#201515] via-[#241717] to-[#180f0f] border-rose-500/40 shadow-rose-950/20'
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3.5 rounded-2xl shrink-0 ${
                          diagnosticResult.status === 'connected'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {diagnosticResult.status === 'connected' ? (
                            <CheckCircle2 className="w-8 h-8" />
                          ) : (
                            <AlertTriangle className="w-8 h-8" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                              diagnosticResult.status === 'connected'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            }`}>
                              {diagnosticResult.status === 'connected' ? '● CONECTADO' : '● DESCONECTADO'}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              Último chequeo: {diagnosticResult.lastChecked}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-extrabold text-white font-mono">
                            https://{diagnosticResult.domain}
                          </h3>
                          <p className="text-xs text-slate-300">
                            {diagnosticResult.recommendation}
                          </p>
                        </div>
                      </div>

                      {/* Diagnostic Metric Chips */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-center">
                          <div className="text-[10px] text-slate-400 uppercase font-mono">HTTP Status</div>
                          <div className="font-bold text-white text-sm font-mono mt-0.5 flex items-center justify-center gap-1">
                            <span className="text-emerald-400">200</span> OK
                          </div>
                        </div>
                        <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-center">
                          <div className="text-[10px] text-slate-400 uppercase font-mono">SSL TLS 1.3</div>
                          <div className="font-bold text-emerald-400 text-sm font-mono mt-0.5">
                            Válido
                          </div>
                        </div>
                        <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-center">
                          <div className="text-[10px] text-slate-400 uppercase font-mono">Latencia Edge</div>
                          <div className="font-bold text-cyan-400 text-sm font-mono mt-0.5">
                            ~{diagnosticResult.edgeLatencyMs}ms
                          </div>
                        </div>
                        <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-center">
                          <div className="text-[10px] text-slate-400 uppercase font-mono">Nodo Edge</div>
                          <div className="font-bold text-amber-400 text-sm font-mono mt-0.5 truncate">
                            {diagnosticResult.edgeLocation.split(' ')[0]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5 Technical Checkpoints Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Checkpoint 1: DNS CNAME Record */}
                    <div className="bg-[#131722] border border-[#1e2330] rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#1e2330]">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>1. Resolución de Registro CNAME</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                          DNS Match OK
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between text-slate-400">
                          <span>CNAME Esperado:</span>
                          <span className="text-white font-bold">{diagnosticResult.expectedCname}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>CNAME Detectado:</span>
                          <span className="text-emerald-400 font-bold">{diagnosticResult.detectedCname}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>TTL en Cache:</span>
                          <span className="text-slate-300">{diagnosticResult.ttl}</span>
                        </div>
                      </div>
                    </div>

                    {/* Checkpoint 2: Resolved Anycast IPs */}
                    <div className="bg-[#131722] border border-[#1e2330] rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#1e2330]">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <Cloud className="w-4 h-4 text-orange-400" />
                          <span>2. Direcciones Anycast Edge IPs</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 font-mono">
                          Cloudflare Proxy
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="text-slate-400">IPs detectadas en el borde Anycast:</div>
                        <div className="flex gap-2 flex-wrap">
                          {diagnosticResult.resolvedIps.map((ip, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-[#1a2130] rounded-lg text-orange-300 border border-orange-500/20 font-bold">
                              {ip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Checkpoint 3: SSL TLS 1.3 Cryptographic Handshake */}
                    <div className="bg-[#131722] border border-[#1e2330] rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#1e2330]">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <Lock className="w-4 h-4 text-indigo-400" />
                          <span>3. Negociación Criptográfica TLS / SSL</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono">
                          TLS 1.3 Strict
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between text-slate-400">
                          <span>Emisor Certificado:</span>
                          <span className="text-white">{diagnosticResult.sslIssuer}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Cipher Suite:</span>
                          <span className="text-indigo-300 text-[11px]">{diagnosticResult.sslHandshake}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Días Restantes:</span>
                          <span className="text-emerald-400 font-bold">{diagnosticResult.sslDaysRemaining} días</span>
                        </div>
                      </div>
                    </div>

                    {/* Checkpoint 4: HTTP Protocol & Edge Cache */}
                    <div className="bg-[#131722] border border-[#1e2330] rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#1e2330]">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <span>4. Enrutamiento & CDN Edge Pop</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
                          HTTP/3 QUIC
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between text-slate-400">
                          <span>Nodo Perimetral:</span>
                          <span className="text-white">{diagnosticResult.edgeLocation}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Header Cache:</span>
                          <span className="text-amber-300">CF-Cache-Status: DYNAMIC</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Protección DDoS:</span>
                          <span className="text-emerald-400 font-bold">Activa (L3/L4/L7)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-[#131722] border border-[#1e2330] rounded-2xl text-center text-slate-400 space-y-3">
                  <Activity className="w-8 h-8 text-slate-600 mx-auto animate-pulse" />
                  <p className="text-xs">Presiona "Ejecutar Diagnóstico Ahora" para validar el estado en vivo de tu dominio CNAME.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GESTIÓN DE CERTIFICADOS SSL */}
          {domainSubTab === 'ssl' && (
            <div className="space-y-6">
              {/* SSL Header Info Banner */}
              <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Gestión de Certificados SSL & Cifrado HTTPS</span>
                    </div>
                    <h2 className="text-xl font-extrabold text-white">Configuración SSL / TLS para Dominios CNAME</h2>
                    <p className="text-xs text-slate-400">
                      Gestiona la activación de certificados automáticos de Cloudflare Free o sube certificados SSL manuales (PEM) propios.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-[#19202f] p-1.5 rounded-2xl border border-slate-700">
                    <button
                      onClick={() => setSslModeSelect('cloudflare_auto')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        sslModeSelect === 'cloudflare_auto'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Cloudflare Universal SSL (Auto)
                    </button>
                    <button
                      onClick={() => setSslModeSelect('custom_manual')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        sslModeSelect === 'custom_manual'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Carga Manual (PEM)
                    </button>
                  </div>
                </div>

                {/* Mode 1: Cloudflare Auto SSL Card */}
                {sslModeSelect === 'cloudflare_auto' ? (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-[#121927] to-[#10141f] border border-indigo-500/30 rounded-2xl p-6 space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                            <ShieldCheck className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold text-white">Cloudflare Universal SSL (TLS 1.3)</h3>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                                ACTIVO & PROTEGIDO
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">Emisión, validación y renovación 100% automatizada vía API de Cloudflare.</p>
                          </div>
                        </div>

                        <button
                          onClick={handleRenewSsl}
                          disabled={isRenewingSsl}
                          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isRenewingSsl ? 'animate-spin' : ''}`} />
                          <span>{isRenewingSsl ? 'Renovando en Cloudflare...' : 'Forzar Renovación Inmediata'}</span>
                        </button>
                      </div>

                      {/* Certificate Specs Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                        <div className="bg-[#0e121b] p-3.5 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-mono">Autoridad Emisora</span>
                          <div className="text-xs font-bold text-white truncate">{sslConfig?.issuer || 'Cloudflare Inc ECC CA-3'}</div>
                        </div>
                        <div className="bg-[#0e121b] p-3.5 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-mono">Protocolo de Cifrado</span>
                          <div className="text-xs font-bold text-indigo-400 font-mono">TLS 1.3 / HTTP/3</div>
                        </div>
                        <div className="bg-[#0e121b] p-3.5 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-mono">Validez Restante</span>
                          <div className="text-xs font-bold text-emerald-400 font-mono">{sslConfig?.daysRemaining || 89} días</div>
                        </div>
                        <div className="bg-[#0e121b] p-3.5 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-mono">Auto-Renovación</span>
                          <div className="text-xs font-bold text-emerald-300">Garantizada (Free)</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Soporte HSTS, redirección forzada HTTPS (HTTP a HTTPS 301) y 0-RTT Session Resumption activos.</span>
                      </div>
                      <button
                        onClick={handleSaveSslConfig}
                        disabled={isSavingSsl}
                        className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        {isSavingSsl ? 'Guardando...' : 'Confirmar Modo Automático'}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Mode 2: Custom Manual PEM SSL Form */
                  <div className="space-y-5">
                    <div className="bg-[#182030] border border-[#273248] rounded-2xl p-5 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                        <Upload className="w-4 h-4 text-indigo-400" />
                        <span>Carga Manual de Certificado SSL Personalizado (Formato PEM)</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Pega los bloques PEM correspondientes al certificado público emitido por tu Autoridad Certificadora (ej. Let's Encrypt, DigiCert, Sectigo) y la clave privada correspondiente.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                          <span>Certificado Público SSL (PEM):</span>
                          <span className="text-[10px] text-slate-500 font-mono">-----BEGIN CERTIFICATE-----</span>
                        </label>
                        <textarea
                          rows={4}
                          placeholder="-----BEGIN CERTIFICATE-----&#10;MIIE... (Contenido de tu certificado SSL en Base64)&#10;-----END CERTIFICATE-----"
                          value={manualCertPem}
                          onChange={(e) => setManualCertPem(e.target.value)}
                          className="w-full p-3 bg-[#10141f] border border-[#232d44] rounded-xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-indigo-500 leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                          <span>Clave Privada SSL (Private Key PEM):</span>
                          <span className="text-[10px] text-slate-500 font-mono">-----BEGIN PRIVATE KEY-----</span>
                        </label>
                        <textarea
                          rows={4}
                          placeholder="-----BEGIN RSA PRIVATE KEY-----&#10;MIIE... (Clave privada del certificado)&#10;-----END RSA PRIVATE KEY-----"
                          value={manualKeyPem}
                          onChange={(e) => setManualKeyPem(e.target.value)}
                          className="w-full p-3 bg-[#10141f] border border-[#232d44] rounded-xl text-xs font-mono text-amber-300 focus:outline-none focus:border-indigo-500 leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                          <span>Cadena Intermedia / CA Bundle (Opcional):</span>
                          <span className="text-[10px] text-slate-500 font-mono">Intermediate Certificates</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="-----BEGIN CERTIFICATE-----&#10;MIIE... (CA Intermediate Bundle)&#10;-----END CERTIFICATE-----"
                          value={manualCaBundle}
                          onChange={(e) => setManualCaBundle(e.target.value)}
                          className="w-full p-3 bg-[#10141f] border border-[#232d44] rounded-xl text-xs font-mono text-slate-300 focus:outline-none focus:border-indigo-500 leading-relaxed"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setManualCertPem(`-----BEGIN CERTIFICATE-----\nMIIDdzCCAl+gAwIBAgIUdDemoCertClientumAcmeTech2026SSL==\n-----END CERTIFICATE-----`);
                            setManualKeyPem(`-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAwDemoPrivateKeyAcmeClientumSecure2026==\n-----END RSA PRIVATE KEY-----`);
                            setManualCaBundle(`-----BEGIN CERTIFICATE-----\nMIIDazCCAlOgAwIBAgIUDemoCABundleLetEncryptIntermediate==\n-----END CERTIFICATE-----`);
                            showToast('Plantilla PEM de prueba cargada en el formulario', 'info');
                          }}
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline cursor-pointer text-left"
                        >
                          Cargar plantilla de ejemplo PEM
                        </button>

                        <button
                          onClick={handleSaveSslConfig}
                          disabled={isSavingSsl}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>{isSavingSsl ? 'Validando e Instalando...' : 'Guardar e Instalar Certificado PEM'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: REDIRECCIONES AUTOMÁTICAS (301 / 302) */}
          {domainSubTab === 'redirects' && (
            <div className="space-y-6">
              {/* Create Redirect Rule Card */}
              <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold">
                      <CornerDownRight className="w-3.5 h-3.5" />
                      <span>Reglas de Redirección en el Borde (Page Rules & Edge Redirects)</span>
                    </div>
                    <h2 className="text-xl font-extrabold text-white">Redirecciones Automáticas de Dominio</h2>
                    <p className="text-xs text-slate-400">
                      Crea reglas automáticas de redirección (301 Permanente o 302 Temporal) ejecutadas a nivel de Cloudflare Edge sin sobrecargar tu servidor.
                    </p>
                  </div>
                </div>

                {/* Form to create new redirect rule */}
                <form onSubmit={handleCreateRedirectRule} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-4 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Dominio de Origen</label>
                      <input
                        type="text"
                        placeholder="acmetech.com o *.acmetech.com"
                        value={newRedirSourceDomain}
                        onChange={(e) => setNewRedirSourceDomain(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="md:col-span-3 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Ruta de Origen</label>
                      <input
                        type="text"
                        placeholder="/* o /promo"
                        value={newRedirSourcePath}
                        onChange={(e) => setNewRedirSourcePath(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="md:col-span-5 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">URL / Destino Final</label>
                      <input
                        type="text"
                        placeholder="https://tienda.acmetech.com/* o /agro"
                        value={newRedirTargetUrl}
                        onChange={(e) => setNewRedirTargetUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-slate-300 font-medium">Tipo de Redirección:</label>
                        <select
                          value={newRedirStatus}
                          onChange={(e) => setNewRedirStatus(Number(e.target.value) as 301 | 302)}
                          className="px-3 py-1.5 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-bold focus:outline-none"
                        >
                          <option value={301}>301 - Permanente (SEO Friendly)</option>
                          <option value={302}>302 - Temporal</option>
                        </select>
                      </div>

                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newRedirPreserveQuery}
                          onChange={(e) => setNewRedirPreserveQuery(e.target.checked)}
                          className="rounded text-blue-600 focus:ring-0"
                        />
                        <span>Preservar Parámetros (?utm_source=...)</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isCreatingRedirect}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isCreatingRedirect ? 'Creando Regla...' : 'Crear Regla de Redirección'}</span>
                    </button>
                  </div>

                  {/* Quick Presets */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 flex-wrap text-xs text-slate-400">
                    <span>Plantillas rápidas:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setNewRedirSourceDomain('acmetech.com');
                        setNewRedirSourcePath('/*');
                        setNewRedirTargetUrl('https://tienda.acmetech.com/*');
                        setNewRedirStatus(301);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#182030] hover:bg-[#202b40] text-blue-300 border border-blue-500/20 font-mono text-[11px] cursor-pointer"
                    >
                      Redirigir dominio raíz a subdominio (acmetech.com → tienda.acmetech.com)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNewRedirSourceDomain('tienda.acmetech.com');
                        setNewRedirSourcePath('/catalogo');
                        setNewRedirTargetUrl('/tienda/acme-technologies');
                        setNewRedirStatus(301);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#182030] hover:bg-[#202b40] text-slate-300 border border-slate-700 font-mono text-[11px] cursor-pointer"
                    >
                      /catalogo → Tienda Pública
                    </button>
                  </div>
                </form>
              </div>

              {/* Active Redirect Rules Table */}
              <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e2330]">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <CornerDownRight className="w-4 h-4 text-blue-400" />
                    <span>Reglas de Redirección Activas ({redirectRules.length})</span>
                  </h3>
                  <span className="text-xs text-slate-400">Procesadas en el Borde Anycast Cloudflare</span>
                </div>

                <div className="space-y-3">
                  {redirectRules.length === 0 ? (
                    <div className="text-center py-10 bg-[#10141e] border border-dashed border-[#1f2738] rounded-2xl text-xs text-slate-400 space-y-2">
                      <CornerDownRight className="w-8 h-8 text-slate-600 mx-auto" />
                      <p>No tienes reglas de redirección configuradas. Añade una arriba para vincular tu dominio raíz a tu landing.</p>
                    </div>
                  ) : (
                    redirectRules.map((rule) => (
                      <div
                        key={rule.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                          rule.enabled
                            ? 'bg-[#171d2b] border-[#232d44] hover:border-blue-500/40'
                            : 'bg-[#121620] border-slate-800 opacity-60'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
                            <span className="font-bold text-white">
                              {rule.sourceDomain}{rule.sourcePath}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                            <span className="font-bold text-emerald-400">
                              {rule.targetUrl}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                              rule.statusCode === 301 ? 'bg-blue-500/20 text-blue-300' : 'bg-amber-500/20 text-amber-300'
                            }`}>
                              HTTP {rule.statusCode}
                            </span>
                            <span>•</span>
                            <span>Query String: {rule.preserveQuery ? 'Preservado' : 'Descartado'}</span>
                            <span>•</span>
                            <span className="text-slate-300 font-mono">{rule.hitsCount} accesos procesados</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleToggleRedirectRule(rule.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                              rule.enabled
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            <span>{rule.enabled ? 'Activa' : 'Pausada'}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteRedirectRule(rule.id)}
                            className="p-2 bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer"
                            title="Eliminar regla"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HISTORIAL DE AUDITORÍA & LOGS */}
          {domainSubTab === 'audit' && (
            <div className="space-y-6">
              {/* Audit Summary Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#131722] border border-[#1e2330] rounded-2xl p-5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Última Validación Correcta</span>
                  </span>
                  <div className="text-sm font-extrabold text-emerald-400 font-mono">
                    {lastAuditValidated || '31/08/2026 13:40'}
                  </div>
                  <p className="text-[11px] text-slate-500">Validado automáticamente por el motor DNS</p>
                </div>

                <div className="bg-[#131722] border border-[#1e2330] rounded-2xl p-5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Dominio Principal Vinculado</span>
                  </span>
                  <div className="text-sm font-extrabold text-white font-mono truncate">
                    {customDomainSaved || 'tienda.acmetech.com'}
                  </div>
                  <p className="text-[11px] text-indigo-400 font-mono">CNAME → proxy.clientum.com.ar</p>
                </div>

                <div className="bg-[#131722] border border-[#1e2330] rounded-2xl p-5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-amber-400" />
                    <span>Total de Eventos Auditados</span>
                  </span>
                  <div className="text-sm font-extrabold text-amber-300 font-mono">
                    {auditLogs.length} Registros
                  </div>
                  <p className="text-[11px] text-slate-500">Trazabilidad completa de cambios</p>
                </div>
              </div>

              {/* Audit Table with Filters */}
              <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                      <History className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Historial de Auditoría de Configuración</h3>
                      <p className="text-xs text-slate-400">Registro cronológico de vinculaciones, diagnósticos y renovaciones de certificados.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Status Filter */}
                    <div className="flex items-center bg-[#1a2130] p-1 rounded-xl border border-[#273046]">
                      <button
                        onClick={() => setAuditFilterStatus('all')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                          auditFilterStatus === 'all' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Todos
                      </button>
                      <button
                        onClick={() => setAuditFilterStatus('success')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                          auditFilterStatus === 'success' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Éxito
                      </button>
                      <button
                        onClick={() => setAuditFilterStatus('warning')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                          auditFilterStatus === 'warning' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Avisos
                      </button>
                    </div>

                    {/* Search Input */}
                    <div className="flex items-center gap-2 bg-[#1a2130] px-3 py-1.5 rounded-xl border border-[#273046]">
                      <Search className="w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Buscar por dominio o acción..."
                        value={auditSearchQuery}
                        onChange={(e) => setAuditSearchQuery(e.target.value)}
                        className="bg-transparent border-none text-xs text-white focus:outline-none w-36 sm:w-48"
                      />
                    </div>

                    <button
                      onClick={fetchAuditLogs}
                      disabled={isLoadingAuditLogs}
                      className="p-2 bg-[#1a2130] hover:bg-[#273046] text-slate-300 rounded-xl border border-[#273046] cursor-pointer"
                      title="Refrescar auditoría"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAuditLogs ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Audit Logs List */}
                <div className="space-y-2.5">
                  {auditLogs
                    .filter((log) => {
                      if (auditFilterStatus !== 'all' && log.status !== auditFilterStatus) return false;
                      if (auditSearchQuery) {
                        const q = auditSearchQuery.toLowerCase();
                        return (
                          log.domain.toLowerCase().includes(q) ||
                          log.action.toLowerCase().includes(q) ||
                          log.details.toLowerCase().includes(q) ||
                          log.user.toLowerCase().includes(q)
                        );
                      }
                      return true;
                    })
                    .map((log) => (
                      <div
                        key={log.id}
                        className="p-3.5 rounded-xl bg-[#171d2b] border border-[#232d44] hover:border-slate-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase flex items-center gap-1 ${
                              log.status === 'success'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : log.status === 'warning'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}>
                              {log.status === 'success' && <CheckCircle2 className="w-2.5 h-2.5" />}
                              {log.status === 'warning' && <AlertTriangle className="w-2.5 h-2.5" />}
                              {log.status === 'error' && <XCircle className="w-2.5 h-2.5" />}
                              {log.status}
                            </span>
                            <span className="font-mono font-bold text-white">{log.domain}</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-indigo-400 font-semibold">{log.action}</span>
                          </div>
                          <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                            {log.details}
                          </p>
                        </div>

                        <div className="text-right shrink-0 space-y-0.5">
                          <div className="font-mono text-[11px] text-slate-400">{log.timestamp}</div>
                          <div className="text-[10px] text-slate-500">{log.user}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <span>Directorio de Empresas Verificadas en Clientum</span>
                </h2>
                <p className="text-xs text-slate-400">Explora aliados comerciales, proveedores y servicios B2B verificados en la red.</p>
              </div>
              <div className="flex items-center gap-2 bg-[#1a2130] px-3 py-2 rounded-xl border border-[#273046]">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por industria o servicio..."
                  className="bg-transparent border-none text-xs text-white focus:outline-none w-48 sm:w-64"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {directoryCompanies.map((comp) => (
                <div key={comp.id} className="bg-[#171d2b] border border-[#232d44] rounded-2xl p-6 space-y-4 shadow-lg hover:border-blue-500/40 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base">{comp.name}</h3>
                        {comp.verified && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verificada
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{comp.location} • <span className="text-blue-400 font-medium">{comp.industry}</span></p>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{comp.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {comp.description}
                  </p>

                  <div className="space-y-1.5">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Servicios Principales:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {comp.services.map((srv, idx) => (
                        <span key={idx} className="text-[11px] px-2.5 py-1 rounded-lg bg-[#1e2638] text-slate-300 border border-slate-700/60 font-medium">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <span className="text-xs font-mono text-slate-400">{comp.slug}.clientum.com.ar</span>
                    <button
                      onClick={() => {
                        const url = `https://${comp.slug}.clientum.com.ar`;
                        navigator.clipboard.writeText(url);
                        showToast(`¡Subdominio de ${comp.name} copiado al portapapeles!`, 'success');
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <span>Copiar Subdominio</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
