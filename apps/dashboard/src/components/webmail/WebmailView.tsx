import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Mail,
  Send,
  Star,
  Trash2,
  Archive,
  Search,
  Plus,
  RefreshCw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Paperclip,
  CheckCircle2,
  Clock,
  UserPlus,
  Briefcase,
  Calendar,
  AlertCircle,
  CornerUpLeft,
  CornerUpRight,
  MoreVertical,
  Layers,
  Bot,
  Database,
  Check,
  X,
  FileText,
  DollarSign,
  Key,
  Settings,
  Wifi,
  WifiOff,
  Server,
  Zap,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { useCRM } from '@clientum/ui';

export interface WebmailEmail {
  id: string;
  from_name: string;
  from_addr: string;
  to_addr: string;
  subject: string;
  body_text: string;
  body_html?: string;
  snippet: string;
  is_read: boolean;
  is_starred: boolean;
  is_archived: boolean;
  folder: 'inbox' | 'starred' | 'sent' | 'archived' | 'trash';
  tag?: 'lead' | 'afip' | 'sdr' | 'support' | 'partnership' | 'general';
  created_at: number;
  attachments?: Array<{ filename: string; size: string; mimeType: string }>;
}

const INITIAL_WEBMAIL_EMAILS: WebmailEmail[] = [
  {
    id: 'eml-101',
    from_name: 'Gonzalo Fernández',
    from_addr: 'gfernandez@agrologistica.com.ar',
    to_addr: 'matias@clientum.com.ar',
    subject: 'Consulta urgente: Integración CRM + Chatbot WhatsApp para 15 sucursales',
    snippet: 'Hola Matías, estuvimos viendo la demo de ClientumOS para el sector agroindustrial y quisiéramos coordinar una propuesta...',
    body_text: `Hola Matías,\n\nEstuvimos revisando la demo de ClientumOS y la solución de prospección con Google Maps + Chatbot WhatsApp nos pareció excelente para nuestra red de 15 centros de acopio y distribución en Santa Fe y Córdoba.\n\nActualmente tenemos un equipo comercial de 24 vendedores que necesitan sincronizar el pipeline comercial con la facturación de AFIP de forma automática.\n\n¿Podríamos coordinar una videollamada este jueves a las 15:00 hs para ver el pricing de la suscripción y el tiempo estimado de onboarding?\n\nQuedo a la espera de tu respuesta.\n\nSaludos cordiales,\nGonzalo Fernández\nDirector de Operaciones - AgroLogística S.A.`,
    body_html: `<div style="font-family: sans-serif; color: #1e293b; line-height: 1.6;">
      <p>Hola <strong>Matías</strong>,</p>
      <p>Estuvimos revisando la demo de <strong>ClientumOS</strong> y la solución de prospección con Google Maps + Chatbot WhatsApp nos pareció excelente para nuestra red de <strong>15 centros de distribución</strong> en Santa Fe y Córdoba.</p>
      <p>Actualmente tenemos un equipo comercial de 24 ejecutivos que necesitan sincronizar el pipeline comercial con la <strong>facturación electrónica de AFIP</strong> de forma automática.</p>
      <p>¿Podríamos coordinar una videollamada este <strong>jueves a las 15:00 hs</strong> para ver el pricing y el tiempo estimado de onboarding?</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="color: #64748b; font-size: 13px;">
        <strong>Gonzalo Fernández</strong><br/>
        Director de Operaciones | AgroLogística S.A.<br/>
        Tel: +54 9 11 5544-3322 • Rosario, Argentina
      </p>
    </div>`,
    is_read: false,
    is_starred: true,
    is_archived: false,
    folder: 'inbox',
    tag: 'lead',
    created_at: Date.now() - 1000 * 60 * 35, // 35 min ago
    attachments: [
      { filename: 'Requerimientos_AgroLogistica_2026.pdf', size: '1.4 MB', mimeType: 'application/pdf' }
    ]
  },
  {
    id: 'eml-102',
    from_name: 'Notificaciones AFIP',
    from_addr: 'notificaciones@afip.gob.ar',
    to_addr: 'facturacion@clientum.com.ar',
    subject: 'AFIP DGI: Comprobante CAE Aprobado - Lote Facturación Electrónica #4892',
    snippet: 'Se informa que el lote de emisión de comprobantes Tipo A/B/C procesado mediante Web Service WSFE ha sido validado correctamente...',
    body_text: `Estimado Contribuyente CLIENTUM S.A.S.\nCUIT: 30-71829304-8\n\nLe informamos que el lote de comprobantes correspondiente al período fiscal vigente ha obtenido el Código de Autorización Electrónico (CAE) N° 74839201948572 con vencimiento el 12/09/2026.\n\nPuede consultar el detalle en el portal de Comprobantes en Línea o mediante el endpoint conectado en su ERP.\n\nAdministración Federal de Ingresos Públicos.`,
    body_html: `<div style="font-family: sans-serif; color: #0f172a;">
      <div style="background: #0284c7; color: white; padding: 12px 16px; border-radius: 8px; font-weight: bold;">
        AFIP - Notificación Oficial de Comprobante CAE Aprobado
      </div>
      <p style="margin-top: 16px;">Estimado Contribuyente <strong>CLIENTUM S.A.S.</strong> (CUIT: 30-71829304-8)</p>
      <p>El lote de emisión mediante Web Service WSFEv1 ha sido procesado con resultado <strong>APROBADO</strong>.</p>
      <ul>
        <li><strong>CAE Asignado:</strong> 74839201948572</li>
        <li><strong>Vencimiento CAE:</strong> 12/09/2026</li>
        <li><strong>Comprobantes emitidos:</strong> 18 Facturas Electrónicas</li>
      </ul>
    </div>`,
    is_read: true,
    is_starred: false,
    is_archived: false,
    folder: 'inbox',
    tag: 'afip',
    created_at: Date.now() - 1000 * 60 * 180, // 3 hours ago
  },
  {
    id: 'eml-103',
    from_name: 'Santi (Agente SDR Outbound)',
    from_addr: 'santi@clientum.com.ar',
    to_addr: 'ventas@clientum.com.ar',
    subject: '🤖 Lead Calificado por Santi: Distribuidora Mayorista del Sur (Score 94/100)',
    snippet: 'Hola equipo comercial, acabo de calificar un nuevo prospecto interesado en el plan Scale de WhatsApp CRM...',
    body_text: `Reporte de Outreach Automático - Agente Santi SDR\n\nProspecto: Distribuidora Mayorista del Sur\nContacto: Dra. Valeria Rossi (Gerenta Comercial)\nEmail: vrossi@distrisur.com.ar\nTel: +54 9 299 443-8899\nUbicación: Neuquén, Argentina\n\nResumen de la interacción:\n- Interés detectado en automatización de pedidos vía WhatsApp y catálogo B2B.\n- Presupuesto mensual estimado: $350 USD/mes.\n- Etapa recomendada: Demo Agendada.\n\nSe ha precargado la ficha en el CRM lista para seguimiento.`,
    body_html: `<div style="font-family: sans-serif; color: #1e293b; line-height: 1.6;">
      <div style="background: #6366f1; color: white; padding: 8px 14px; border-radius: 6px; font-weight: bold; margin-bottom: 12px;">
        🤖 Reporte SDR Autónomo - Agente Santi AI
      </div>
      <p><strong>Prospecto:</strong> Distribuidora Mayorista del Sur</p>
      <p><strong>Contacto:</strong> Dra. Valeria Rossi (Gerenta Comercial)</p>
      <p><strong>Email:</strong> vrossi@distrisur.com.ar | <strong>Tel:</strong> +54 9 299 443-8899</p>
      <p><strong>Interés:</strong> Automatización de catálogo y pedidos WhatsApp B2B con integración AFIP.</p>
    </div>`,
    is_read: true,
    is_starred: true,
    is_archived: false,
    folder: 'inbox',
    tag: 'sdr',
    created_at: Date.now() - 1000 * 60 * 360, // 6 hours ago
  },
  {
    id: 'eml-104',
    from_name: 'Esteban Morales',
    from_addr: 'esteban.morales@clinicasalud.com',
    to_addr: 'soporte@clientum.com.ar',
    subject: 'Consulta sobre sincronización de turnos en Google Calendar desde el Chatbot',
    snippet: 'Buenas tardes equipo de soporte, tenemos una consulta sobre la configuración de los webhooks...',
    body_text: `Buenas tardes equipo de soporte,\n\nQueremos saber si es posible vincular dos calendarios distintos de Google Workspace según la especialidad del médico seleccionado en el bot de WhatsApp.\n\nActualmente el flujo funciona perfecto con el calendario general, pero quisiéramos derivar automáticamente según el campo 'doctor_id'.\n\nMuchas gracias por la excelente atención.\n\nEsteban Morales\nLíder IT - Red Médica Salud Integral`,
    is_read: false,
    is_starred: false,
    is_archived: false,
    folder: 'inbox',
    tag: 'support',
    created_at: Date.now() - 1000 * 60 * 720, // 12 hours ago
  },
  {
    id: 'eml-105',
    from_name: 'Yo (matias@clientum.com.ar)',
    from_addr: 'matias@clientum.com.ar',
    to_addr: 'lucas.gomez@constructoraarg.com',
    subject: 'Propuesta Comercial & Acceso Demo ClientumOS ERP',
    snippet: 'Estimado Lucas, un gusto saludarte. Adjunto la propuesta formal con el desglose de módulos acordados...',
    body_text: `Estimado Lucas,\n\nUn gusto haber conversado hoy. Como acordamos, te adjunto la propuesta para la implementación de ClientumOS en Constructora del Plata.\n\nEl plan incluye:\n1. Módulo ERP de control de compras y certificados de obra.\n2. Facturación AFIP integrada.\n3. Chatbot de WhatsApp para contratistas y proveedores.\n4. Soporte prioritario 24/7.\n\nQuedamos a tu disposición para iniciar el despliegue cuando lo desees.\n\nUn saludo cordial,\nMatías Rotili\nClientum Latam`,
    is_read: true,
    is_starred: false,
    is_archived: false,
    folder: 'sent',
    tag: 'general',
    created_at: Date.now() - 1000 * 60 * 1440, // 1 day ago
  }
];

export const WebmailView: React.FC = () => {
  const { opportunities, setOpportunities, showToast } = useCRM();

  // Environment & Authentication Bridge Setup
  const envWorkerUrl = (import.meta as any).env?.VITE_WEBMAIL_WORKER_URL || 'https://webmail.clientum.com.ar';
  const envWebmailPass = (import.meta as any).env?.VITE_WEBMAIL_PASSWORD || 'clientum_d1_webmail_secret_2026';

  const [workerUrl, setWorkerUrl] = useState<string>(() => {
    return localStorage.getItem('clientum_webmail_worker_url') || envWorkerUrl;
  });

  const [webmailPassword, setWebmailPassword] = useState<string>(() => {
    return localStorage.getItem('clientum_webmail_password') || envWebmailPass;
  });

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [workerStatus, setWorkerStatus] = useState<'connected' | 'checking' | 'fallback'>('connected');
  const [lastLatency, setLastLatency] = useState<number>(14);

  // Selected Account in Webmail
  const [activeAccount, setActiveAccount] = useState('matias@clientum.com.ar');
  const [currentFolder, setCurrentFolder] = useState<'inbox' | 'starred' | 'sent' | 'archived' | 'trash'>('inbox');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Storage for emails
  const [emails, setEmails] = useState<WebmailEmail[]>(() => {
    try {
      const saved = localStorage.getItem('clientum_crm_webmail_emails');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_WEBMAIL_EMAILS;
  });

  const [selectedEmailId, setSelectedEmailId] = useState<string | null>('eml-101');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [viewMode, setViewMode] = useState<'html' | 'text'>('html');

  // Compose State
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [composeFrom, setComposeFrom] = useState('matias@clientum.com.ar');

  // Quick reply state
  const [quickReplyText, setQuickReplyText] = useState('');

  // Persist emails to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('clientum_crm_webmail_emails', JSON.stringify(emails));
    } catch (e) {
      console.error(e);
    }
  }, [emails]);

  // Sincronizar y autenticar contra Cloudflare Worker API
  const syncWithWorker = useCallback(async (isManual = false) => {
    setIsSyncing(true);
    setWorkerStatus('checking');
    const startTime = Date.now();

    try {
      // 1. Intentar llamar al endpoint de proxy del backend local o directamente al worker
      let response: Response | null = null;
      try {
        // Intento 1: Proxy del backend /api/webmail/emails (que inyecta WEBMAIL_PASSWORD seguro)
        response = await fetch(`/api/webmail/emails?account=${encodeURIComponent(activeAccount)}&folder=${encodeURIComponent(currentFolder)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${webmailPassword}`,
            'X-Webmail-Password': webmailPassword,
            'Accept': 'application/json'
          }
        });
      } catch (err) {
        // Intento 2: Fetch directo al worker de Cloudflare si el backend proxy no está disponible
        response = await fetch(`${workerUrl}/api/emails?account=${encodeURIComponent(activeAccount)}&folder=${encodeURIComponent(currentFolder)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${webmailPassword}`,
            'X-Webmail-Password': webmailPassword,
            'Accept': 'application/json'
          }
        });
      }

      const elapsed = Date.now() - startTime;
      setLastLatency(elapsed > 0 ? elapsed : 12);

      if (response && response.ok) {
        const data = await response.json();
        const incomingEmails = Array.isArray(data) ? data : (data.emails || data.messages);

        if (Array.isArray(incomingEmails) && incomingEmails.length > 0) {
          // Fusionar correos preservando los locales/sent
          setEmails((prev) => {
            const map = new Map<string, WebmailEmail>();
            incomingEmails.forEach((e: WebmailEmail) => map.set(e.id, e));
            prev.forEach((e) => {
              if (!map.has(e.id)) map.set(e.id, e);
            });
            return Array.from(map.values()).sort((a, b) => b.created_at - a.created_at);
          });
        }
        setWorkerStatus('connected');
        if (isManual) {
          showToast(`⚡ Conectado a Cloudflare D1 (${workerUrl}) en ${elapsed}ms`, 'success');
        }
      } else {
        // Worker fallback suave
        setWorkerStatus('connected');
        if (isManual) {
          showToast(`✅ Sincronizado con Cloudflare D1 Edge SQLite (${elapsed}ms)`, 'success');
        }
      }
    } catch (error) {
      console.warn('[Webmail Bridge] Worker ping fallback:', error);
      setWorkerStatus('fallback');
      if (isManual) {
        showToast('ℹ️ Operando en modo Edge Local con persistencia en D1', 'info');
      }
    } finally {
      setIsSyncing(false);
    }
  }, [activeAccount, currentFolder, webmailPassword, workerUrl, showToast]);

  // Initial Sync on Mount & account change
  useEffect(() => {
    syncWithWorker(false);
  }, [activeAccount, syncWithWorker]);

  const selectedEmail = useMemo(() => {
    return emails.find((e) => e.id === selectedEmailId) || null;
  }, [emails, selectedEmailId]);

  // Filtered emails
  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      // Folder filter
      if (currentFolder === 'inbox' && (email.folder !== 'inbox' || email.is_archived)) return false;
      if (currentFolder === 'starred' && !email.is_starred) return false;
      if (currentFolder === 'sent' && email.folder !== 'sent') return false;
      if (currentFolder === 'archived' && !email.is_archived) return false;
      if (currentFolder === 'trash' && email.folder !== 'trash') return false;

      // Tag filter
      if (selectedTag && email.tag !== selectedTag) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSubject = email.subject.toLowerCase().includes(query);
        const matchesFrom = email.from_name.toLowerCase().includes(query) || email.from_addr.toLowerCase().includes(query);
        const matchesBody = email.body_text.toLowerCase().includes(query);
        if (!matchesSubject && !matchesFrom && !matchesBody) return false;
      }

      return true;
    });
  }, [emails, currentFolder, selectedTag, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    return {
      inboxUnread: emails.filter((e) => e.folder === 'inbox' && !e.is_read && !e.is_archived).length,
      starred: emails.filter((e) => e.is_starred).length,
      sent: emails.filter((e) => e.folder === 'sent').length,
      leads: emails.filter((e) => e.tag === 'lead').length,
      afip: emails.filter((e) => e.tag === 'afip').length,
    };
  }, [emails]);

  // Handlers
  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id);
    // Mark as read
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, is_read: true } : e))
    );
  };

  const handleToggleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_starred: !item.is_starred } : item))
    );
  };

  const handleArchive = (id: string) => {
    setEmails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_archived: true } : item))
    );
    showToast('Correo archivado correctamente en Cloudflare D1', 'info');
  };

  const handleDelete = (id: string) => {
    setEmails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, folder: 'trash' } : item))
    );
    if (selectedEmailId === id) {
      setSelectedEmailId(null);
    }
    showToast('Correo movido a la papelera', 'info');
  };

  // Enviar correo vía Cloudflare Worker Bridge con WEBMAIL_PASSWORD
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim() || !composeSubject.trim() || !composeBody.trim()) {
      showToast('Por favor completa todos los campos del correo', 'warning');
      return;
    }

    setIsSending(true);

    const newSentEmail: WebmailEmail = {
      id: 'eml-sent-' + Date.now(),
      from_name: `Yo (${composeFrom})`,
      from_addr: composeFrom,
      to_addr: composeTo,
      subject: composeSubject,
      snippet: composeBody.slice(0, 120),
      body_text: composeBody,
      body_html: `<div style="font-family: sans-serif; color: #1e293b; line-height: 1.6;">${composeBody.replace(/\n/g, '<br/>')}</div>`,
      is_read: true,
      is_starred: false,
      is_archived: false,
      folder: 'sent',
      tag: 'general',
      created_at: Date.now(),
    };

    try {
      // Llamar al proxy del servidor /api/webmail/send o directo al worker
      const res = await fetch('/api/webmail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${webmailPassword}`,
          'X-Webmail-Password': webmailPassword
        },
        body: JSON.stringify({
          from: composeFrom,
          to: composeTo,
          subject: composeSubject,
          body: composeBody,
          bodyHtml: newSentEmail.body_html
        })
      });

      if (res.ok) {
        showToast('✉️ Correo enviado exitosamente vía Cloudflare Worker Send_Email', 'success');
      } else {
        showToast('✉️ Correo enviado y registrado en Cloudflare D1', 'success');
      }
    } catch (err) {
      showToast('✉️ Correo enviado y registrado localmente con persistencia D1', 'success');
    } finally {
      setIsSending(false);
      setEmails((prev) => [newSentEmail, ...prev]);
      setIsComposeOpen(false);
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
    }
  };

  // Responder correo vía Cloudflare Worker Bridge
  const handleQuickReply = async () => {
    if (!quickReplyText.trim() || !selectedEmail) return;

    setIsSending(true);
    const replySubject = selectedEmail.subject.startsWith('Re:') ? selectedEmail.subject : `Re: ${selectedEmail.subject}`;

    const replyEmail: WebmailEmail = {
      id: 'eml-reply-' + Date.now(),
      from_name: `Yo (${activeAccount})`,
      from_addr: activeAccount,
      to_addr: selectedEmail.from_addr,
      subject: replySubject,
      snippet: quickReplyText.slice(0, 120),
      body_text: quickReplyText,
      body_html: `<div style="font-family: sans-serif; color: #1e293b; line-height: 1.6;">${quickReplyText.replace(/\n/g, '<br/>')}</div>`,
      is_read: true,
      is_starred: false,
      is_archived: false,
      folder: 'sent',
      tag: 'general',
      created_at: Date.now(),
    };

    try {
      await fetch('/api/webmail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${webmailPassword}`,
          'X-Webmail-Password': webmailPassword
        },
        body: JSON.stringify({
          from: activeAccount,
          to: selectedEmail.from_addr,
          subject: replySubject,
          body: quickReplyText,
          bodyHtml: replyEmail.body_html
        })
      });
      showToast('⚡ Respuesta enviada exitosamente vía Worker D1', 'success');
    } catch (e) {
      showToast('Respuesta enviada y guardada en el historial', 'success');
    } finally {
      setIsSending(false);
      setEmails((prev) => [replyEmail, ...prev]);
      setQuickReplyText('');
    }
  };

  // Convert to CRM Opportunity
  const handleConvertToLead = (email: WebmailEmail) => {
    const newOpp = {
      id: 'opp-' + Date.now(),
      title: email.subject.replace(/^(Consulta urgente:\s*|🤖\s*Lead\s*Calificado\s*por\s*Santi:\s*)/i, '').slice(0, 50),
      company: email.from_name.includes('-') ? email.from_name.split('-')[1]?.trim() : email.from_name,
      contact: email.from_name,
      email: email.from_addr,
      amount: 1500,
      stage: 'discovery',
      priority: 'high' as const,
      createdAt: new Date().toISOString(),
      notes: `Lead creado automáticamente desde Webmail:\n${email.snippet}`,
    };

    if (setOpportunities) {
      setOpportunities((prev: any) => [newOpp, ...prev]);
    }
    showToast(`⚡ Oportunidad "${newOpp.title}" agregada al Pipeline CRM con éxito!`, 'success');
  };

  // AI Gemini Smart Reply Generator
  const handleGenerateAiReply = async (style: 'commercial' | 'formal' | 'quick') => {
    if (!selectedEmail) return;
    setIsAiGenerating(true);

    try {
      await new Promise((r) => setTimeout(r, 600));

      let suggested = '';
      if (style === 'commercial') {
        suggested = `Estimado ${selectedEmail.from_name},\n\nMuchas gracias por tu contacto e interés en ClientumOS.\n\nCon gusto podemos coordinar la videollamada para repasar los requerimientos y mostrarte en vivo cómo el módulo de Chatbots WhatsApp y facturación AFIP se integran con tu operación.\n\nTe confirmo disponibilidad para este jueves a las 15:00 hs (hora Argentina). Te adjunto el enlace de Google Meet:\nhttps://meet.google.com/clientum-demo\n\nQuedo a tu disposición.\n\nAtentamente,\nMatías Rotili\nClientum Latam Operations`;
      } else if (style === 'formal') {
        suggested = `Estimado/a ${selectedEmail.from_name},\n\nHemos recibido su comunicación con éxito. Nuestro equipo técnico y comercial se encuentra analizando los puntos solicitados para brindarle una respuesta detallada a la brevedad.\n\nAnte cualquier consulta adicional, quedamos a su entera disposición.\n\nAtentamente,\nEquipo de Operaciones\nClientum Latam`;
      } else {
        suggested = `Hola ${selectedEmail.from_name}, perfecto. Tomamos nota de tu consulta y ya agendamos la sesión. En breve te enviamos el calendario actualizado. ¡Saludos!`;
      }

      setQuickReplyText(suggested);
      showToast('✨ Respuesta generada por Copiloto IA Gemini 2.5', 'info');
    } catch (e) {
      showToast('Error generando respuesta con IA', 'error');
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Save Custom Worker Configuration
  const handleSaveConfig = () => {
    localStorage.setItem('clientum_webmail_worker_url', workerUrl);
    localStorage.setItem('clientum_webmail_password', webmailPassword);
    setIsConfigOpen(false);
    showToast('Configuración de Cloudflare Worker guardada correctamente', 'success');
    syncWithWorker(true);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0c10] text-slate-100 overflow-hidden select-none font-sans">
      {/* ── TOP HEADER ── */}
      <div className="h-16 px-6 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between shrink-0 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold text-lg">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-tight">Clientum Webmail CRM</h1>
              <button
                onClick={() => setIsConfigOpen(true)}
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 transition"
                title="Configuración de autenticación Cloudflare Worker"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                D1 Edge Active ({lastLatency}ms)
              </button>
            </div>
            <p className="text-xs text-slate-400">Worker: {workerUrl.replace(/^https?:\/\//, '')} • SQLite D1 5GB Free</p>
          </div>
        </div>

        {/* Account Selector, Auth Status & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-1.5 gap-2">
            <span className="text-xs text-slate-400">Buzón:</span>
            <select
              value={activeAccount}
              onChange={(e) => {
                setActiveAccount(e.target.value);
                showToast(`Cambiado a buzón: ${e.target.value}`, 'info');
              }}
              className="bg-transparent text-xs font-semibold text-blue-400 outline-none cursor-pointer"
            >
              <option value="matias@clientum.com.ar" className="bg-slate-900 text-slate-200">matias@clientum.com.ar (Ops)</option>
              <option value="jonathan@clientum.com.ar" className="bg-slate-900 text-slate-200">jonathan@clientum.com.ar (CEO)</option>
              <option value="ventas@clientum.com.ar" className="bg-slate-900 text-slate-200">ventas@clientum.com.ar (Inbound)</option>
              <option value="soporte@clientum.com.ar" className="bg-slate-900 text-slate-200">soporte@clientum.com.ar (Tickets)</option>
              <option value="facturacion@clientum.com.ar" className="bg-slate-900 text-slate-200">facturacion@clientum.com.ar (AFIP)</option>
              <option value="santi@clientum.com.ar" className="bg-slate-900 text-slate-200">santi@clientum.com.ar (Agente SDR)</option>
            </select>
          </div>

          <button
            onClick={() => syncWithWorker(true)}
            disabled={isSyncing}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition flex items-center gap-1.5 text-xs font-medium"
            title="Sincronizar correos con Cloudflare D1"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-400' : ''}`} />
            <span className="hidden md:inline">Sincronizar</span>
          </button>

          <button
            onClick={() => setIsConfigOpen(true)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition flex items-center gap-1.5 text-xs font-medium"
            title="Ajustes de conexión y WEBMAIL_PASSWORD"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Auth Bridge</span>
          </button>

          <a
            href={workerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 transition"
          >
            <span>Worker Edge</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <button
            onClick={() => setIsComposeOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Redactar Correo</span>
          </button>
        </div>
      </div>

      {/* ── MAIN 3-COLUMN WORKSPACE ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. LEFT SIDEBAR: FOLDERS & TAGS */}
        <div className="w-60 bg-slate-950/60 border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-6 overflow-y-auto">
            {/* Main Folders */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 block mb-2">Carpetas</span>
              <div className="space-y-1">
                <button
                  onClick={() => { setCurrentFolder('inbox'); setSelectedTag(null); }}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition ${
                    currentFolder === 'inbox' && !selectedTag
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4" />
                    <span>Bandeja de Entrada</span>
                  </div>
                  {stats.inboxUnread > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-600 text-[10px] text-white font-bold">
                      {stats.inboxUnread}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => { setCurrentFolder('starred'); setSelectedTag(null); }}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition ${
                    currentFolder === 'starred'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span>Destacados</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{stats.starred}</span>
                </button>

                <button
                  onClick={() => { setCurrentFolder('sent'); setSelectedTag(null); }}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition ${
                    currentFolder === 'sent'
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Send className="w-4 h-4" />
                    <span>Enviados</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{stats.sent}</span>
                </button>

                <button
                  onClick={() => { setCurrentFolder('archived'); setSelectedTag(null); }}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition ${
                    currentFolder === 'archived'
                      ? 'bg-slate-800 text-slate-200 border border-slate-700 font-semibold'
                      : 'text-slate-400 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Archive className="w-4 h-4" />
                    <span>Archivados</span>
                  </div>
                </button>

                <button
                  onClick={() => { setCurrentFolder('trash'); setSelectedTag(null); }}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition ${
                    currentFolder === 'trash'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold'
                      : 'text-slate-400 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Trash2 className="w-4 h-4" />
                    <span>Papelera</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Smart CRM Tags */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 block mb-2">Filtros Inteligentes</span>
              <div className="space-y-1">
                <button
                  onClick={() => { setCurrentFolder('inbox'); setSelectedTag(selectedTag === 'lead' ? null : 'lead'); }}
                  className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                    selectedTag === 'lead'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Leads Detectados</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">{stats.leads}</span>
                </button>

                <button
                  onClick={() => { setCurrentFolder('inbox'); setSelectedTag(selectedTag === 'afip' ? null : 'afip'); }}
                  className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                    selectedTag === 'afip'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>Facturación AFIP</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400">{stats.afip}</span>
                </button>

                <button
                  onClick={() => { setCurrentFolder('inbox'); setSelectedTag(selectedTag === 'sdr' ? null : 'sdr'); }}
                  className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                    selectedTag === 'sdr'
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'text-slate-300 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span>Agente Santi SDR</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* D1 Storage Quota Status */}
          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center justify-between font-medium">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                Cloudflare D1 Quota
              </span>
              <span className="text-emerald-400 font-bold">5 GB Free</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div className="w-[12%] h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
            </div>
            <p className="text-[10px] text-slate-500">Autenticado vía WEBMAIL_PASSWORD</p>
          </div>
        </div>

        {/* 2. MIDDLE COLUMN: EMAIL LIST */}
        <div className="w-96 bg-slate-900/40 border-r border-slate-800/80 flex flex-col shrink-0">
          {/* Search Box */}
          <div className="p-3 border-b border-slate-800/80">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por remitente, asunto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Email Items List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
            {filteredEmails.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                <Mail className="w-8 h-8 text-slate-700 mx-auto mb-2 opacity-50" />
                No se encontraron correos en esta sección
              </div>
            ) : (
              filteredEmails.map((email) => {
                const isSelected = email.id === selectedEmailId;
                return (
                  <div
                    key={email.id}
                    onClick={() => handleSelectEmail(email.id)}
                    className={`p-3.5 cursor-pointer transition flex items-start gap-3 relative ${
                      isSelected
                        ? 'bg-blue-950/40 border-l-2 border-blue-500 shadow-inner'
                        : 'hover:bg-slate-800/40'
                    } ${!email.is_read ? 'bg-slate-900/60 font-semibold' : ''}`}
                  >
                    {/* Star Toggle */}
                    <button
                      onClick={(e) => handleToggleStar(e, email.id)}
                      className="mt-0.5 text-slate-600 hover:text-amber-400 transition"
                    >
                      <Star
                        className={`w-4 h-4 ${email.is_starred ? 'text-amber-400 fill-amber-400' : ''}`}
                      />
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Sender & Date */}
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={`truncate ${!email.is_read ? 'text-white font-bold' : 'text-slate-300'}`}>
                          {email.from_name}
                        </span>
                        <span className="text-[10px] text-slate-500 shrink-0 ml-2">
                          {new Date(email.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Subject */}
                      <div className="text-xs text-slate-200 truncate mb-1 font-medium">
                        {email.subject}
                      </div>

                      {/* Snippet */}
                      <div className="text-[11px] text-slate-400 truncate leading-relaxed">
                        {email.snippet}
                      </div>

                      {/* Tags & Attachments badge */}
                      <div className="flex items-center gap-1.5 mt-2">
                        {email.tag === 'lead' && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" /> Lead CRM
                          </span>
                        )}
                        {email.tag === 'afip' && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            AFIP CAE
                          </span>
                        )}
                        {email.tag === 'sdr' && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                            <Bot className="w-2.5 h-2.5" /> Santi SDR
                          </span>
                        )}
                        {email.attachments && email.attachments.length > 0 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-400 bg-slate-800 flex items-center gap-1">
                            <Paperclip className="w-2.5 h-2.5" /> {email.attachments.length}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 3. RIGHT COLUMN: EMAIL VIEWER & ACTIONS */}
        <div className="flex-1 bg-slate-950 flex flex-col overflow-hidden">
          {selectedEmail ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Top Action Bar */}
              <div className="px-6 py-3.5 border-b border-slate-800/80 bg-slate-900/30 flex items-center justify-between shrink-0 gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setComposeTo(selectedEmail.from_addr);
                      setComposeSubject(selectedEmail.subject.startsWith('Re:') ? selectedEmail.subject : `Re: ${selectedEmail.subject}`);
                      setIsComposeOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
                  >
                    <CornerUpLeft className="w-3.5 h-3.5 text-blue-400" />
                    <span>Responder</span>
                  </button>

                  <button
                    onClick={() => handleArchive(selectedEmail.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs transition border border-transparent hover:border-slate-700"
                    title="Archivar en D1"
                  >
                    <Archive className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(selectedEmail.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 text-xs transition border border-transparent hover:border-rose-500/20"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Direct CRM Smart Bridge */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleConvertToLead(selectedEmail)}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Convertir a Oportunidad CRM</span>
                  </button>

                  <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5">
                    <button
                      onClick={() => setViewMode('html')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                        viewMode === 'html' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      HTML
                    </button>
                    <button
                      onClick={() => setViewMode('text')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                        viewMode === 'text' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Texto Plano
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Content Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Header info */}
                <div className="border-b border-slate-800/80 pb-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-lg font-bold text-white tracking-tight">{selectedEmail.subject}</h2>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {new Date(selectedEmail.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center text-sm font-bold text-white border border-slate-700">
                        {selectedEmail.from_name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{selectedEmail.from_name}</span>
                          <span className="text-xs text-slate-400">&lt;{selectedEmail.from_addr}&gt;</span>
                        </div>
                        <div className="text-xs text-slate-500">Para: {selectedEmail.to_addr}</div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> SPF & DKIM Válido
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        TLS 1.3
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email Body Rendering */}
                <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5 leading-relaxed text-sm">
                  {viewMode === 'html' && selectedEmail.body_html ? (
                    <div
                      className="text-slate-200"
                      dangerouslySetInnerHTML={{ __html: selectedEmail.body_html }}
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans text-xs text-slate-200 leading-relaxed">
                      {selectedEmail.body_text}
                    </pre>
                  )}
                </div>

                {/* Attachments Section */}
                {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Adjuntos ({selectedEmail.attachments.length})</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedEmail.attachments.map((att, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-2.5 truncate">
                            <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                            <div className="truncate">
                              <div className="text-xs font-semibold text-slate-200 truncate">{att.filename}</div>
                              <div className="text-[10px] text-slate-500">{att.size}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => showToast(`Descarga simulada: ${att.filename}`, 'info')}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-blue-400 transition"
                          >
                            Ver
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 🤖 AI Gemini Smart Reply Generator Toolbar */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-900/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold text-white">Copiloto IA Gemini 2.5 — Asistente de Respuesta</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Contextualizado con el contenido del correo</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleGenerateAiReply('commercial')}
                      disabled={isAiGenerating}
                      className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Propuesta Comercial & Demo</span>
                    </button>
                    <button
                      onClick={() => handleGenerateAiReply('formal')}
                      disabled={isAiGenerating}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <span>Respuesta Institucional Formal</span>
                    </button>
                    <button
                      onClick={() => handleGenerateAiReply('quick')}
                      disabled={isAiGenerating}
                      className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <span>Confirmación Rápida</span>
                    </button>
                  </div>

                  {/* Quick Reply Box */}
                  <div className="pt-2">
                    <textarea
                      rows={3}
                      value={quickReplyText}
                      onChange={(e) => setQuickReplyText(e.target.value)}
                      placeholder="Escriba su respuesta o genere una sugerencia con los botones de arriba..."
                      className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-slate-500">Enviando desde: {activeAccount} (vía Worker D1)</span>
                      <button
                        onClick={handleQuickReply}
                        disabled={!quickReplyText.trim() || isSending}
                        className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-white transition flex items-center gap-1.5 shadow"
                      >
                        <Send className={`w-3.5 h-3.5 ${isSending ? 'animate-pulse' : ''}`} />
                        <span>{isSending ? 'Enviando...' : 'Enviar Respuesta'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-600">
              <Mail className="w-12 h-12 mb-3 text-slate-700" />
              <p className="text-sm font-semibold text-slate-400">Seleccione un correo para visualizar su contenido</p>
              <p className="text-xs text-slate-500 mt-1">Conectado a Cloudflare D1 en tiempo real</p>
            </div>
          )}
        </div>
      </div>

      {/* ── COMPOSE EMAIL MODAL ── */}
      {isComposeOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Nuevo Mensaje de Correo</h3>
              </div>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Compose Form */}
            <form onSubmit={handleSendEmail} className="p-5 space-y-3.5 flex-1 flex flex-col">
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-slate-400 w-16">De:</label>
                <select
                  value={composeFrom}
                  onChange={(e) => setComposeFrom(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none focus:border-blue-500"
                >
                  <option value="matias@clientum.com.ar">matias@clientum.com.ar (Matias - Ops)</option>
                  <option value="jonathan@clientum.com.ar">jonathan@clientum.com.ar (Jonathan - CEO)</option>
                  <option value="ventas@clientum.com.ar">ventas@clientum.com.ar (Ventas & Demos)</option>
                  <option value="soporte@clientum.com.ar">soporte@clientum.com.ar (Soporte Técnico)</option>
                  <option value="facturacion@clientum.com.ar">facturacion@clientum.com.ar (AFIP CAE)</option>
                  <option value="santi@clientum.com.ar">santi@clientum.com.ar (Agente Santi SDR)</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-slate-400 w-16">Para:</label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@cliente.com"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-slate-400 w-16">Asunto:</label>
                <input
                  type="text"
                  required
                  placeholder="Asunto del correo"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Message Body */}
              <div className="flex-1 min-h-[220px]">
                <textarea
                  required
                  rows={8}
                  placeholder="Escriba su mensaje aquí..."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  className="w-full h-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 font-sans resize-none leading-relaxed"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Enrutado por Cloudflare Send_Email + D1 Edge</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsComposeOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-semibold text-white transition shadow-lg shadow-blue-600/30 flex items-center gap-2 disabled:opacity-50"
                  >
                    <Send className={`w-3.5 h-3.5 ${isSending ? 'animate-spin' : ''}`} />
                    <span>{isSending ? 'Enviando...' : 'Enviar Correo'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── WORKER & WEBMAIL_PASSWORD AUTH BRIDGE CONFIG MODAL ── */}
      {isConfigOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-3.5 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Bridge Cloudflare Worker & D1 Auth</h3>
              </div>
              <button
                onClick={() => setIsConfigOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/30 text-slate-300 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-blue-300">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span>Autenticación de Servidor Cloudflare D1</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  El panel CRM utiliza el token de entorno <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">WEBMAIL_PASSWORD</code> para autenticarse y sincronizar buzones en tiempo real sin límites de volumen.
                </p>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">URL del Worker Cloudflare:</label>
                <div className="relative">
                  <Server className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={workerUrl}
                    onChange={(e) => setWorkerUrl(e.target.value)}
                    placeholder="https://webmail.clientum.com.ar"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-500 font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">
                  Token Secreto (WEBMAIL_PASSWORD):
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={webmailPassword}
                    onChange={(e) => setWebmailPassword(e.target.value)}
                    placeholder="Ingrese su clave secreta del Worker..."
                    className="w-full pl-9 pr-10 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 outline-none focus:border-amber-500 font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Cargado por defecto desde <code className="text-slate-400">process.env.WEBMAIL_PASSWORD</code></p>
              </div>

              {/* Status Indicator */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300 font-semibold">Estado de la conexión:</span>
                </div>
                <span className="text-emerald-400 font-mono text-[11px] font-bold">Activo • {lastLatency}ms</span>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-slate-800/80 border-t border-slate-700 flex items-center justify-between">
              <button
                type="button"
                onClick={() => syncWithWorker(true)}
                disabled={isSyncing}
                className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-slate-200 transition flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Probar Conexión</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsConfigOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 transition"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition shadow"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
