import React, { useState, useEffect } from 'react';
import {
  Cloud,
  Globe,
  RefreshCw,
  Plus,
  ShieldCheck,
  Zap,
  Layers,
  Search,
  Copy,
  Trash2,
  CheckCircle2,
  ExternalLink,
  ArrowUpRight,
  Shield,
  Activity,
  Lock,
  Key,
  Upload,
  FileCode,
  History,
  CornerDownRight,
  Radio,
  FileText,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Mail,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DomainAuditTable } from './DomainAuditTable';

export interface CloudflareSubdomain {
  id: string;
  subdomain: string;
  fullDomain: string;
  targetLandingPath: string;
  targetLandingTitle: string;
  dnsType: string;
  targetValue: string;
  proxied: boolean;
  sslStatus: string;
  edgeLatencyMs: number;
  createdAt: string;
}

export interface DiagnosticResult {
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

export interface SslConfigState {
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

export interface DomainRedirectRule {
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

export interface DomainAuditLog {
  id: string;
  timestamp: string;
  domain: string;
  action: string;
  user: string;
  status: 'success' | 'warning' | 'error';
  details: string;
}

export const AVAILABLE_LANDING_PAGES = [
  { path: '/tienda/acme-technologies', title: 'Tienda Pública Oficial (Catálogo B2B / E-commerce)', category: 'Comercio' },
  { path: '/agro', title: 'Agro & Campo CRM (Sector Agropecuario & Acopio)', category: 'Industrias' },
  { path: '/salud', title: 'Salud, Clínicas & Turnos Médicos', category: 'Industrias' },
  { path: '/educacion', title: 'Colegios, Universidades & Academias', category: 'Industrias' },
  { path: '/inmobiliaria', title: 'Real Estate & Propiedades', category: 'Industrias' },
  { path: '/gastronomia', title: 'Restaurantes, Bares & KDS', category: 'Industrias' },
  { path: '/logistica', title: 'Transporte, Envíos & Trazabilidad', category: 'Industrias' },
  { path: '/turismo', title: 'Hoteles, Cabañas & Experiencias', category: 'Industrias' },
  { path: '/legal', title: 'Estudios Jurídicos & Notariales', category: 'Industrias' },
  { path: '/retail', title: 'Locales Comerciales & Franquicias', category: 'Industrias' },
  { path: '/servicios', title: 'Empresas de Servicios & Oficios', category: 'Industrias' },
  { path: '/finanzas', title: 'Finanzas, Seguros & Asesorías', category: 'Industrias' },
  { path: '/fitness', title: 'Gimnasios, Crossfit & Centros de Yoga', category: 'Industrias' },
];

interface DomainCloudflareManagerProps {
  onToast?: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  titlePrefix?: string;
}

export const DomainCloudflareManager: React.FC<DomainCloudflareManagerProps> = ({
  onToast,
  titlePrefix = 'CRM & Tienda'
}) => {
  const [customDomainInput, setCustomDomainInput] = useState('tienda.acmetech.com');
  const [customDomainSaved, setCustomDomainSaved] = useState('tienda.acmetech.com');
  const [dnsStatus, setDnsStatus] = useState<'verified' | 'pending' | 'checking'>('verified');

  // Domain Sub-tabs navigation
  const [domainSubTab, setDomainSubTab] = useState<'subdomains' | 'diagnostics' | 'ssl' | 'redirects' | 'audit' | 'dnsRecords'>('subdomains');

  // Advanced DNS Records State
  const [dnsRecords, setDnsRecords] = useState<any[]>([]);
  const [isLoadingDnsRecords, setIsLoadingDnsRecords] = useState(false);
  const [newDnsType, setNewDnsType] = useState<'A' | 'TXT' | 'MX' | 'CNAME'>('A');
  const [newDnsName, setNewDnsName] = useState('www');
  const [newDnsContent, setNewDnsContent] = useState('192.0.2.2');
  const [newDnsTtl, setNewDnsTtl] = useState(1);
  const [newDnsPriority, setNewDnsPriority] = useState(10);
  const [newDnsProxied, setNewDnsProxied] = useState(true);

  // Batch Health Scan & PDF Report State
  const [batchScanResults, setBatchScanResults] = useState<any[] | null>(null);
  const [isBatchScanning, setIsBatchScanning] = useState(false);

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
  const [isAutoConfiguring, setIsAutoConfiguring] = useState(false);
  const [testRedirectUrl, setTestRedirectUrl] = useState('');
  const [testRedirectResult, setTestRedirectResult] = useState<any>(null);
  const [isTestingRedirect, setIsTestingRedirect] = useState(false);
  const [isSendingExpiryAlert, setIsSendingExpiryAlert] = useState(false);

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
  const [newSubTargetLanding, setNewSubTargetLanding] = useState(AVAILABLE_LANDING_PAGES[0].path);
  const [newSubProxied, setNewSubProxied] = useState(true);
  const [isCreatingSubdomain, setIsCreatingSubdomain] = useState(false);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    if (onToast) {
      onToast(msg, type);
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchCloudflareSubdomains();
    fetchSslConfig();
    fetchRedirectRules();
    fetchAuditLogs();
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

  const handleSmartAutoConfig = async () => {
    if (!customDomainInput.trim()) {
      showToast('Ingresa un dominio para la auto-configuración.', 'warning');
      return;
    }
    setIsAutoConfiguring(true);
    try {
      const res = await fetch('/api/domain/smart-autoconfig', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: customDomainInput.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        confetti({ particleCount: 50, spread: 50 });
        showToast(data.message || 'Auto-configuración CNAME exitosa', 'success');
        setDnsStatus('verified');
        setCustomDomainSaved(customDomainInput.trim());
        fetchAuditLogs();
      } else {
        showToast(data.error || 'Error en auto-configuración CNAME', 'error');
      }
    } catch (err) {
      showToast('Error de conexión con Cloudflare API', 'error');
    } finally {
      setIsAutoConfiguring(false);
    }
  };

  const handleTestRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testRedirectUrl.trim()) {
      showToast('Ingresa una URL de origen para probar.', 'warning');
      return;
    }
    setIsTestingRedirect(true);
    setTestRedirectResult(null);
    try {
      const res = await fetch('/api/domain/redirects/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testUrl: testRedirectUrl.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setTestRedirectResult(data);
        showToast(data.message, data.matched ? 'success' : 'info');
      } else {
        showToast(data.error || 'Error al probar redirección', 'error');
      }
    } catch (err) {
      showToast('Error al conectar con el motor de redirección', 'error');
    } finally {
      setIsTestingRedirect(false);
    }
  };

  const handleSendExpiryAlert = async () => {
    setIsSendingExpiryAlert(true);
    try {
      const res = await fetch('/api/domain/ssl/expiry-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: customDomainSaved })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message, 'warning');
        fetchAuditLogs();
      } else {
        showToast(data.error || 'Error al enviar alerta SMTP', 'error');
      }
    } catch (err) {
      showToast('Error al conectar con el servicio SMTP', 'error');
    } finally {
      setIsSendingExpiryAlert(false);
    }
  };

  const fetchDnsRecords = async () => {
    setIsLoadingDnsRecords(true);
    try {
      const res = await fetch(`/api/domain/dns-records?domain=${customDomainSaved}`);
      const data = await res.json();
      if (res.ok && data.records) {
        setDnsRecords(data.records);
      }
    } catch (err) {
      console.error('Error fetching DNS records:', err);
    } finally {
      setIsLoadingDnsRecords(false);
    }
  };

  const handleCreateDnsRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDnsName.trim() || !newDnsContent.trim()) {
      showToast('Nombre y contenido del registro DNS son obligatorios.', 'warning');
      return;
    }
    try {
      const res = await fetch('/api/domain/dns-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: customDomainSaved,
          type: newDnsType,
          name: newDnsName.trim(),
          content: newDnsContent.trim(),
          ttl: newDnsTtl,
          priority: newDnsType === 'MX' ? newDnsPriority : undefined,
          proxied: newDnsProxied
        })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message, 'success');
        fetchDnsRecords();
        setNewDnsName('');
        setNewDnsContent('');
        fetchAuditLogs();
      } else {
        showToast(data.error || 'Error al crear registro DNS', 'error');
      }
    } catch (err) {
      showToast('Error de conexión con Cloudflare API', 'error');
    }
  };

  const handleDeleteDnsRecord = async (id: string) => {
    try {
      const res = await fetch(`/api/domain/dns-records/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        showToast('Registro DNS eliminado', 'info');
        fetchDnsRecords();
        fetchAuditLogs();
      } else {
        showToast(data.error || 'Error al eliminar', 'error');
      }
    } catch (err) {
      showToast('Error de conexión', 'error');
    }
  };

  const handleBatchHealthScan = async () => {
    setIsBatchScanning(true);
    try {
      const res = await fetch('/api/domain/batch-health-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domains: [customDomainSaved, 'acmetech.com', 'agro.clientum.com.ar', 'tienda.miempresa.com'] })
      });
      const data = await res.json();
      if (res.ok) {
        setBatchScanResults(data.results);
        showToast(`Escaneo de salud en lote completado (${data.scannedCount} dominios)`, 'success');
        fetchAuditLogs();
      } else {
        showToast(data.error || 'Error en escaneo de salud', 'error');
      }
    } catch (err) {
      showToast('Error de conexión', 'error');
    } finally {
      setIsBatchScanning(false);
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
        if (data.subdomains && Array.isArray(data.subdomains)) {
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
      const res = await fetch('/api/cloudflare/subdomains/sync', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.subdomains) {
        setCfSubdomains(data.subdomains);
        confetti({ particleCount: 50, spread: 60 });
        showToast(`¡Sincronización exitosa! ${data.subdomains.length} subdominios detectados en Cloudflare Free.`, 'success');
        fetchAuditLogs();
      } else {
        showToast('No se pudieron detectar nuevos subdominios.', 'info');
      }
    } catch (err) {
      showToast('Error al conectar con Cloudflare API.', 'error');
    } finally {
      setIsDetectingSubdomains(false);
    }
  };

  const handleCreateSubdomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubPrefix.trim()) {
      showToast('Ingresa un prefijo de subdominio (ej: ventas, demo, agro).', 'warning');
      return;
    }
    setIsCreatingSubdomain(true);
    try {
      const targetPage = AVAILABLE_LANDING_PAGES.find(p => p.path === newSubTargetLanding);
      const res = await fetch('/api/cloudflare/subdomains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subdomain: newSubPrefix.toLowerCase().trim(),
          targetLandingPath: newSubTargetLanding,
          targetLandingTitle: targetPage?.title || 'Landing Personalizada',
          proxied: newSubProxied
        })
      });
      const data = await res.json();
      if (res.ok && data.subdomain) {
        setCfSubdomains(prev => [data.subdomain, ...prev]);
        setNewSubPrefix('');
        confetti({ particleCount: 70, spread: 70 });
        showToast(`¡Subdominio ${data.subdomain.fullDomain} creado y mapeado con éxito!`, 'success');
        fetchAuditLogs();
      } else {
        showToast(data.error || 'Error al crear subdominio en Cloudflare.', 'error');
      }
    } catch (err) {
      showToast('Error al procesar la solicitud con Cloudflare.', 'error');
    } finally {
      setIsCreatingSubdomain(false);
    }
  };

  const handleMapSubdomain = async (id: string, newLandingPath: string) => {
    const targetPage = AVAILABLE_LANDING_PAGES.find(p => p.path === newLandingPath);
    try {
      const res = await fetch(`/api/cloudflare/subdomains/${id}/map`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetLandingPath: newLandingPath,
          targetLandingTitle: targetPage?.title || 'Landing Mapeada'
        })
      });
      if (res.ok) {
        setCfSubdomains(prev => prev.map(s => s.id === id ? {
          ...s,
          targetLandingPath: newLandingPath,
          targetLandingTitle: targetPage?.title || 'Landing Mapeada'
        } : s));
        showToast('Mapeo de landing page actualizado al instante en Cloudflare.', 'success');
        fetchAuditLogs();
      }
    } catch (err) {
      showToast('Error al actualizar el mapeo.', 'error');
    }
  };

  const handleToggleProxy = async (id: string) => {
    try {
      const res = await fetch(`/api/cloudflare/subdomains/${id}/toggle-proxy`, {
        method: 'PATCH'
      });
      const data = await res.json();
      if (res.ok) {
        setCfSubdomains(prev => prev.map(s => s.id === id ? { ...s, proxied: data.proxied } : s));
        showToast(`Proxy ${data.proxied ? 'activado (Orange Cloud ☁️)' : 'desactivado (Grey Cloud 🔘)'}`, 'info');
        fetchAuditLogs();
      }
    } catch (err) {
      showToast('Error al cambiar modo de proxy.', 'error');
    }
  };

  const handleDeleteSubdomain = async (id: string, fullDomain: string) => {
    try {
      const res = await fetch(`/api/cloudflare/subdomains/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setCfSubdomains(prev => prev.filter(s => s.id !== id));
        showToast(`Subdominio ${fullDomain} desvinculado de Cloudflare.`, 'info');
        fetchAuditLogs();
      }
    } catch (err) {
      showToast('Error al eliminar subdominio.', 'error');
    }
  };

  const filteredSubdomains = cfSubdomains.filter(s =>
    s.fullDomain.toLowerCase().includes(subdomainSearch.toLowerCase()) ||
    s.targetLandingTitle.toLowerCase().includes(subdomainSearch.toLowerCase())
  );

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesSearch = log.domain.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(auditSearchQuery.toLowerCase());
    const matchesStatus = auditFilterStatus === 'all' || log.status === auditFilterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
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

        <button
          onClick={() => {
            setDomainSubTab('dnsRecords');
            fetchDnsRecords();
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            domainSubTab === 'dnsRecords'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
              : 'text-slate-400 hover:text-white hover:bg-[#1a2130]'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>Registros DNS Avanzados</span>
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
                  <span>Gestor de Subdominios y Landing Pages ({titlePrefix})</span>
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
                  <button
                    onClick={handleSmartAutoConfig}
                    disabled={isAutoConfiguring}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 cursor-pointer shrink-0"
                    title="Crea automáticamente los registros CNAME en Cloudflare"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAutoConfiguring ? 'Configurando...' : 'Auto-Configuración Inteligente'}</span>
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
          {/* Batch Health Scan & PDF Export Card */}
          <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Escaneo Global de Salud de Dominios en Lote</span>
                </div>
                <h3 className="text-base font-bold text-white">Validación Simultánea de Todos los Dominios y Certificados</h3>
                <p className="text-xs text-slate-400">
                  Valida en paralelo el estado de propagación Anycast, expiración de certificados SSL y latencia de todos los dominios y subdominios configurados.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleBatchHealthScan}
                  disabled={isBatchScanning}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isBatchScanning ? 'animate-spin' : ''}`} />
                  <span>{isBatchScanning ? 'Escaneando Lote...' : 'Ejecutar Escaneo en Lote'}</span>
                </button>
                {batchScanResults && (
                  <a
                    href="/api/domain/report/pdf-download"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                    title="Exportar reporte de errores y certificados expirados en formato PDF"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Exportar Reporte PDF</span>
                  </a>
                )}
              </div>
            </div>

            {batchScanResults && (
              <div className="space-y-3 pt-4 border-t border-[#1e2330]">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Resultados del Escaneo Simultáneo ({batchScanResults.length} dominios):</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {batchScanResults.map((res: any, idx: number) => (
                    <div key={idx} className="bg-[#182030] border border-[#273248] p-4 rounded-2xl flex items-center justify-between gap-3">
                      <div className="space-y-1 font-mono text-xs">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{res.domain}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          SSL: <strong className="text-emerald-300">{res.sslStatus}</strong> • Latencia: <strong className="text-cyan-300">{res.edgeLatencyMs}ms</strong>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        res.status === 'healthy' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}>
                        {res.status === 'healthy' ? 'Saludable' : 'Error Config'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

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
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>2. Direcciones Anycast Edge IPs</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                      Cloudflare Network
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {diagnosticResult.resolvedIps.map((ip, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-[#1a2130] text-cyan-300 rounded-lg text-xs font-mono border border-cyan-500/20">
                        {ip}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Las peticiones son absorbidas por los más de 330 datacenters globales de Cloudflare.
                  </p>
                </div>

                {/* Checkpoint 3: SSL Handshake */}
                <div className="bg-[#131722] border border-[#1e2330] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1e2330]">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>3. Apretón Criptográfico TLS 1.3</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                      256-Bit Strong
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Ciphersuite:</span>
                      <span className="text-emerald-400 font-bold">{diagnosticResult.sslHandshake}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Emisor CA:</span>
                      <span className="text-slate-200">{diagnosticResult.sslIssuer}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Validez Restante:</span>
                      <span className="text-emerald-400 font-bold">{diagnosticResult.sslDaysRemaining} días</span>
                    </div>
                  </div>
                </div>

                {/* Checkpoint 4: Edge POP & Headers */}
                <div className="bg-[#131722] border border-[#1e2330] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1e2330]">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>4. POP Perimetral & Headers HTTP</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
                      Cache HIT
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Datacenter POP:</span>
                      <span className="text-white font-bold">{diagnosticResult.edgeLocation}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>CF-Cache-Status:</span>
                      <span className="text-emerald-400 font-bold">DYNAMIC (Edge Cached)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Server Header:</span>
                      <span className="text-slate-300">cloudflare</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-[#10141e] border border-dashed border-[#1f2738] rounded-3xl space-y-3">
              <Activity className="w-10 h-10 text-slate-600 mx-auto animate-pulse" />
              <div className="text-sm font-bold text-slate-300">Sin diagnóstico reciente</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Haz clic en "Ejecutar Diagnóstico Ahora" para validar el estado en vivo de tu dominio o subdominios.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GESTIÓN DE CERTIFICADOS SSL */}
      {domainSubTab === 'ssl' && (
        <div className="space-y-6">
          {/* SSL Certificate Status Widget for All Protected Domains */}
          <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e2330]">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Estado de Certificados SSL en Cloudflare Edge</span>
                </div>
                <h3 className="text-base font-bold text-white">Monitoreo de Cifrado y Expiración por Dominio</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { domain: customDomainSaved, issuer: 'Cloudflare Inc ECC CA-3', protocol: 'TLS 1.3 / QUIC', expires: '89 días', status: 'Activo' },
                { domain: 'acmetech.com', issuer: 'Let\'s Encrypt Authority X3', protocol: 'TLS 1.3', expires: '74 días', status: 'Activo' },
                { domain: 'agro.clientum.com.ar', issuer: 'Cloudflare Universal SSL', protocol: 'TLS 1.3 / HTTP/2', expires: '82 días', status: 'Activo' }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#182030] border border-[#273248] p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white truncate">{item.domain}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">{item.status}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-0.5 font-mono">
                    <div>Emisor: <span className="text-slate-200">{item.issuer}</span></div>
                    <div>Protocolo: <span className="text-indigo-300">{item.protocol}</span></div>
                    <div>Validez restante: <span className="text-emerald-400 font-bold">{item.expires}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SSL Overview Card */}
          <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Seguridad Perimetral & HTTPS</span>
                </div>
                <h2 className="text-xl font-extrabold text-white">Configuración de Certificados SSL / TLS</h2>
                <p className="text-xs text-slate-400">
                  Administra certificados automáticos gratuitos de Cloudflare Universal SSL o instala certificados empresariales personalizados (PEM).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRenewSsl}
                  disabled={isRenewingSsl}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRenewingSsl ? 'animate-spin' : ''}`} />
                  <span>{isRenewingSsl ? 'Re-emitiendo en Cloudflare...' : 'Forzar Renovación Inmediata'}</span>
                </button>
              </div>
            </div>

            {/* Mode Toggle Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setSslModeSelect('cloudflare_auto')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  sslModeSelect === 'cloudflare_auto'
                    ? 'bg-indigo-500/10 border-indigo-500 text-white shadow-lg'
                    : 'bg-[#181f2f] border-[#252f44] text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <Cloud className="w-4 h-4 text-indigo-400" />
                    <span>Cloudflare Universal SSL (Automático & Gratis)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                    Recomendado
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Generado automáticamente por Cloudflare para todos los dominios y subdominios. Renovación 100% desatendida cada 90 días, soporte TLS 1.3, HSTS y HTTP/3.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono text-indigo-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Emisor: Cloudflare Inc ECC CA-3</span>
                </div>
              </div>

              <div
                onClick={() => setSslModeSelect('custom_manual')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  sslModeSelect === 'custom_manual'
                    ? 'bg-indigo-500/10 border-indigo-500 text-white shadow-lg'
                    : 'bg-[#181f2f] border-[#252f44] text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>Certificado Personalizado (Custom PEM / Key)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400">
                    Empresarial
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Carga tu propio certificado X.509 emitido por DigiCert, Let's Encrypt o Sectigo junto con tu clave privada RSA/ECC en formato PEM.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono text-amber-300">
                  <FileCode className="w-3.5 h-3.5 text-amber-400" />
                  <span>Soporta RSA 2048/4096 & ECDSA P-256</span>
                </div>
              </div>
            </div>

            {/* Custom PEM Form when selected */}
            {sslModeSelect === 'custom_manual' && (
              <div className="space-y-4 p-5 bg-[#10141e] border border-[#232d44] rounded-2xl">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Upload className="w-4 h-4 text-indigo-400" />
                    <span>Carga de Certificados X.509 (Formato PEM)</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setManualCertPem('-----BEGIN CERTIFICATE-----\nMIIEkjCCA3qgAwIBAgITAP1...CLIENTUM.CERT.DEMO...==\n-----END CERTIFICATE-----');
                      setManualKeyPem('-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0...CLIENTUM.KEY.DEMO...==\n-----END PRIVATE KEY-----');
                      setManualCaBundle('-----BEGIN CERTIFICATE-----\nMIIEkjCCA3qgAwIBAgITAP1...INTERMEDIATE.CA.DEMO...==\n-----END CERTIFICATE-----');
                      showToast('Plantilla PEM cargada como ejemplo.', 'info');
                    }}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                  >
                    Cargar Ejemplo PEM
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Certificado SSL (PEM)</label>
                    <textarea
                      rows={3}
                      value={manualCertPem}
                      onChange={(e) => setManualCertPem(e.target.value)}
                      placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
                      className="w-full px-3 py-2 bg-[#182030] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Clave Privada (Private Key PEM)</label>
                    <textarea
                      rows={3}
                      value={manualKeyPem}
                      onChange={(e) => setManualKeyPem(e.target.value)}
                      placeholder="-----BEGIN PRIVATE KEY-----&#10;...&#10;-----END PRIVATE KEY-----"
                      className="w-full px-3 py-2 bg-[#182030] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Cadena Intermedia / CA Bundle (Opcional)</label>
                    <textarea
                      rows={2}
                      value={manualCaBundle}
                      onChange={(e) => setManualCaBundle(e.target.value)}
                      placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
                      className="w-full px-3 py-2 bg-[#182030] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save SSL Config Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSaveSslConfig}
                disabled={isSavingSsl}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSavingSsl ? 'Guardando en Cloudflare...' : 'Guardar y Aplicar Configuración SSL'}</span>
              </button>
            </div>
          </div>

          {/* SMTP Preventive SSL Expiry Alert Card */}
          <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Sistema de Alertas SMTP Preventivas</span>
                </div>
                <h3 className="text-base font-bold text-white">Aviso Automático 7 Días Antes de Expirar SSL</h3>
                <p className="text-xs text-slate-400">
                  Envía una notificación preventiva por correo electrónico utilizando la configuración SMTP del sistema cuando un certificado manual esté próximo a caducar.
                </p>
              </div>

              <button
                onClick={handleSendExpiryAlert}
                disabled={isSendingExpiryAlert}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Mail className="w-4 h-4" />
                <span>{isSendingExpiryAlert ? 'Enviando...' : 'Simular Alerta SMTP (-7 días)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REDIRECCIONES AUTOMÁTICAS (301/302) */}
      {domainSubTab === 'redirects' && (
        <div className="space-y-6">
          {/* Redirect Tester Tool Card */}
          <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
                <Search className="w-3.5 h-3.5" />
                <span>Simulador en Tiempo Real</span>
              </div>
              <h3 className="text-base font-bold text-white">Test de Redirección Automática</h3>
              <p className="text-xs text-slate-400">
                Ingresa cualquier URL de origen (ej. <code className="text-cyan-300 font-mono">https://acmetech.com/contacto?utm=1</code>) para verificar si el sistema la redirigirá correctamente según tus reglas.
              </p>
            </div>

            <form onSubmit={handleTestRedirect} className="flex gap-3">
              <input
                type="text"
                placeholder="https://acmetech.com/tienda"
                value={testRedirectUrl}
                onChange={(e) => setTestRedirectUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={isTestingRedirect}
                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>{isTestingRedirect ? 'Probando...' : 'Probar Redirección'}</span>
              </button>
            </form>

            {testRedirectResult && (
              <div className={`p-4 rounded-2xl border text-xs font-mono space-y-1.5 ${
                testRedirectResult.matched 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300'
              }`}>
                <div className="font-bold flex items-center gap-2">
                  {testRedirectResult.matched ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Info className="w-4 h-4 text-slate-400" />}
                  <span>{testRedirectResult.message}</span>
                </div>
                {testRedirectResult.matched && (
                  <div className="text-[11px] text-slate-300 pt-1 border-t border-emerald-500/20">
                    <div>Código HTTP: <strong className="text-white">{testRedirectResult.statusCode}</strong></div>
                    <div>Destino Final: <strong className="text-cyan-300">{testRedirectResult.resultUrl}</strong></div>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Create Redirect Card */}
          <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold">
                  <CornerDownRight className="w-3.5 h-3.5" />
                  <span>Cloudflare Page Rules & Edge Redirects</span>
                </div>
                <h2 className="text-xl font-extrabold text-white">Reglas de Redirección Automática de Dominios</h2>
                <p className="text-xs text-slate-400">
                  Configura redirecciones 301 (Permanente) o 302 (Temporal) en el borde Anycast de Cloudflare sin consumir procesamiento en tu servidor.
                </p>
              </div>
            </div>

            {/* New Redirect Form */}
            <form onSubmit={handleCreateRedirectRule} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                <div className="md:col-span-4 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Dominio de Origen</label>
                  <input
                    type="text"
                    placeholder="acmetech.com"
                    value={newRedirSourceDomain}
                    onChange={(e) => setNewRedirSourceDomain(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Ruta (Path)</label>
                  <input
                    type="text"
                    placeholder="/* o /tienda"
                    value={newRedirSourcePath}
                    onChange={(e) => setNewRedirSourcePath(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-4 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">URL de Destino</label>
                  <input
                    type="text"
                    placeholder="https://tienda.acmetech.com/*"
                    value={newRedirTargetUrl}
                    onChange={(e) => setNewRedirTargetUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Código HTTP</label>
                  <select
                    value={newRedirStatus}
                    onChange={(e) => setNewRedirStatus(Number(e.target.value) as 301 | 302)}
                    className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
                  >
                    <option value={301}>301 (Permanente)</option>
                    <option value={302}>302 (Temporal)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newRedirPreserveQuery}
                    onChange={(e) => setNewRedirPreserveQuery(e.target.checked)}
                    className="rounded bg-[#1a2130] border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Preservar parámetros de consulta (Query Strings ?utm_source=...)</span>
                </label>

                <button
                  type="submit"
                  disabled={isCreatingRedirect}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isCreatingRedirect ? 'Creando...' : 'Crear Regla en Edge'}</span>
                </button>
              </div>
            </form>

            {/* Quick Preset Templates */}
            <div className="pt-3 border-t border-[#1e2330] flex items-center gap-2 flex-wrap text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Plantillas recomendadas:</span>
              <button
                onClick={() => {
                  setNewRedirSourceDomain('acmetech.com');
                  setNewRedirSourcePath('/*');
                  setNewRedirTargetUrl('https://tienda.acmetech.com/*');
                  setNewRedirStatus(301);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#182030] hover:bg-[#202b40] text-blue-300 border border-blue-500/30 font-mono text-[11px] cursor-pointer"
              >
                Apex @ a www / Subdominio
              </button>
              <button
                onClick={() => {
                  setNewRedirSourceDomain('catalogo.acmetech.com');
                  setNewRedirSourcePath('/*');
                  setNewRedirTargetUrl('https://tienda.acmetech.com/catalogo');
                  setNewRedirStatus(301);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#182030] hover:bg-[#202b40] text-slate-300 border border-slate-700 font-mono text-[11px] cursor-pointer"
              >
                Catálogo a Tienda Oficial
              </button>
            </div>
          </div>

          {/* Redirect Rules Table */}
          <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e2330]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CornerDownRight className="w-4 h-4 text-blue-400" />
                <span>Reglas Activas en Cloudflare Edge ({redirectRules.length})</span>
              </h3>
            </div>

            <div className="space-y-3">
              {redirectRules.length === 0 ? (
                <div className="text-center py-10 bg-[#10141e] border border-dashed border-[#1f2738] rounded-2xl text-slate-400 text-xs">
                  No hay reglas de redirección creadas todavía.
                </div>
              ) : (
                redirectRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="bg-[#171d2b] border border-[#232d44] hover:border-blue-500/40 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white">{rule.sourceDomain}{rule.sourcePath}</span>
                        <span className="text-slate-500">→</span>
                        <span className="text-blue-400 font-bold">{rule.targetUrl}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rule.statusCode === 301 ? 'bg-indigo-500/20 text-indigo-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          HTTP {rule.statusCode}
                        </span>
                        {rule.preserveQuery && (
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                            +Query
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Hits procesados: <strong className="text-slate-200">{rule.hitsCount.toLocaleString()}</strong> • Creada: {rule.createdAt}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleRedirectRule(rule.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          rule.enabled
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {rule.enabled ? 'Activa' : 'Pausada'}
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

      {/* TAB 5: HISTORIAL DE AUDITORÍA */}
      {domainSubTab === 'audit' && (
        <DomainAuditTable
          logs={auditLogs}
          isLoading={isLoadingAuditLogs}
          onRefresh={fetchAuditLogs}
        />
      )}

      {/* TAB 6: REGISTROS DNS AVANZADOS */}
      {domainSubTab === 'dnsRecords' && (
        <div className="space-y-6">
          <div className="bg-[#131722] border border-[#1e2330] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold">
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Editor Granular Cloudflare API</span>
                </div>
                <h2 className="text-lg font-extrabold text-white">Registros DNS Avanzados (A, TXT, MX, CNAME)</h2>
                <p className="text-xs text-slate-400">
                  Administra registros DNS específicos para <strong className="text-white font-mono">{customDomainSaved}</strong> con sincronización instantánea en Cloudflare.
                </p>
              </div>
            </div>

            {/* Create DNS Record Form */}
            <form onSubmit={handleCreateDnsRecord} className="grid grid-cols-1 sm:grid-cols-6 gap-3 bg-[#10141e] p-5 rounded-2xl border border-[#232d44]">
              <div className="space-y-1 sm:col-span-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Tipo</label>
                <select
                  value={newDnsType}
                  onChange={(e) => setNewDnsType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                >
                  <option value="A">A</option>
                  <option value="TXT">TXT</option>
                  <option value="MX">MX</option>
                  <option value="CNAME">CNAME</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Nombre</label>
                <input
                  type="text"
                  placeholder="@ o sub"
                  value={newDnsName}
                  onChange={(e) => setNewDnsName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Contenido / Valor</label>
                <input
                  type="text"
                  placeholder="192.0.2.1 o valor TXT"
                  value={newDnsContent}
                  onChange={(e) => setNewDnsContent(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              {newDnsType === 'MX' ? (
                <div className="space-y-1 sm:col-span-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Prioridad</label>
                  <input
                    type="number"
                    value={newDnsPriority}
                    onChange={(e) => setNewDnsPriority(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>
              ) : (
                <div className="space-y-1 sm:col-span-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">TTL</label>
                  <select
                    value={newDnsTtl}
                    onChange={(e) => setNewDnsTtl(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1a2130] border border-[#273046] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                  >
                    <option value={1}>Auto (1s)</option>
                    <option value={300}>5 min</option>
                    <option value={3600}>1 hora</option>
                  </select>
                </div>
              )}

              <div className="flex items-end sm:col-span-1">
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir</span>
                </button>
              </div>
            </form>

            {/* DNS Records Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1e2330] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Tipo</th>
                    <th className="py-3 px-4">Nombre</th>
                    <th className="py-3 px-4">Contenido</th>
                    <th className="py-3 px-4">TTL</th>
                    <th className="py-3 px-4">Proxy Cloudflare</th>
                    <th className="py-3 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#181f2f] text-xs font-mono">
                  {dnsRecords.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-slate-500">
                        No hay registros DNS avanzados configurados para este dominio.
                      </td>
                    </tr>
                  ) : (
                    dnsRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-[#181f2f]/60 transition-colors">
                        <td className="py-3 px-4 font-bold text-purple-300">{rec.type}</td>
                        <td className="py-3 px-4 font-bold text-white">{rec.name}</td>
                        <td className="py-3 px-4 text-slate-300 truncate max-w-xs" title={rec.content}>{rec.content}</td>
                        <td className="py-3 px-4 text-slate-400">{rec.ttl === 1 ? 'Auto' : `${rec.ttl}s`}</td>
                        <td className="py-3 px-4">
                          {rec.proxied ? (
                            <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold text-[10px]">Proxied (☁️)</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">DNS Only (🔘)</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteDnsRecord(rec.id)}
                            className="p-1.5 bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded-lg transition-all cursor-pointer"
                            title="Eliminar registro"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
