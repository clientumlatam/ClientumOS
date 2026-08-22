import React, { useState } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  Sparkles,
  Bot,
  MessageSquare,
  Building,
  Receipt,
  CreditCard,
  Globe,
  Zap,
  Briefcase,
  Headphones,
  GraduationCap,
  Users,
  ShieldCheck,
  Calendar,
  DollarSign,
  AlertCircle,
  FileText
} from 'lucide-react';

export type PublicFormType =
  | 'diagnostico_pyme'
  | 'cotizador_chatbot'
  | 'cotizador_crm'
  | 'cotizador_afip'
  | 'cotizador_mercadopago'
  | 'cotizador_web'
  | 'cotizador_automatizacion'
  | 'plan_enterprise'
  | 'contacto_comercial'
  | 'soporte_ticket'
  | 'postulacion_partner'
  | 'postulacion_carrera'
  | 'inscripcion_academia';

interface PublicLeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: PublicFormType;
  initialData?: Record<string, any>;
  onSuccess?: () => void;
}

export function PublicLeadFormModal({
  isOpen,
  onClose,
  formType,
  initialData = {},
  onSuccess
}: PublicLeadFormModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState<Record<string, any>>({
    nombre: initialData.nombre || '',
    email: initialData.email || '',
    telefono: initialData.telefono || '',
    empresa: initialData.empresa || '',
    rubro: initialData.rubro || 'Comercio / Retail',
    provincia: initialData.provincia || 'Río Negro',
    ciudad: initialData.ciudad || '',
    mensaje: initialData.mensaje || '',
    // Specific fields
    chats_estimados: initialData.chats_estimados || '1000 - 5000 chats/mes',
    cantidad_usuarios: initialData.cantidad_usuarios || '3 a 5 vendedores',
    cuit: initialData.cuit || '',
    condicion_iva: initialData.condicion_iva || 'Responsable Inscripto',
    presupuesto: initialData.presupuesto || 'USD 500 - 1500',
    plazo: initialData.plazo || '1 a 2 semanas',
    plan_interes: initialData.plan_interes || 'Plan Pro ($80 USD/mes)',
    urgencia: initialData.urgencia || 'Media (Resolver en 48hs)',
    modulo_afectado: initialData.modulo_afectado || 'WhatsApp Bot & CRM',
    area_postulacion: initialData.area_postulacion || 'Desarrollo Full Stack',
    linkedin_url: initialData.linkedin_url || '',
    portfolio_url: initialData.portfolio_url || '',
    tipo_alianza: initialData.tipo_alianza || 'Implementador / Consultor Técnico',
    clientes_actuales: initialData.clientes_actuales || '5 a 15 clientes PyME',
    curso_interes: initialData.curso_interes || 'Aprende IA para Negocios'
  });

  if (!isOpen) return null;

  const getFormMetadata = () => {
    switch (formType) {
      case 'diagnostico_pyme':
        return {
          title: 'Diagnóstico Comercial y Tecnológico PyME',
          subtitle: 'Evaluamos gratis el nivel de digitalización de tu empresa y te entregamos un plan de acción.',
          icon: Sparkles,
          badge: 'Sin Costo · Respuesta en 24hs',
          color: 'from-blue-600 to-indigo-700'
        };
      case 'cotizador_chatbot':
        return {
          title: 'Cotizador de Chatbot WhatsApp con IA',
          subtitle: 'Automatizá la atención 24/7 de tu catálogo, calificación de prospectos y agendamiento.',
          icon: Bot,
          badge: 'WhatsApp Cloud API Oficial',
          color: 'from-emerald-600 to-teal-700'
        };
      case 'cotizador_crm':
        return {
          title: 'Implementación de CRM Inteligente',
          subtitle: 'Organizá tu pipeline comercial, seguimientos automáticos y métricas de tu equipo de ventas.',
          icon: Building,
          badge: 'Pipeline + Multi-Embudo',
          color: 'from-sky-600 to-blue-700'
        };
      case 'cotizador_afip':
        return {
          title: 'Facturación Electrónica AFIP / ARCA',
          subtitle: 'Emisión masiva o por evento de comprobantes A, B y C con CAE y envío automático a clientes.',
          icon: Receipt,
          badge: 'Homologado AFIP',
          color: 'from-cyan-600 to-blue-800'
        };
      case 'cotizador_mercadopago':
        return {
          title: 'Cobros & Pasarelas Mercado Pago',
          subtitle: 'Integración de checkout pro, suscripciones automáticas, QR y conciliación contable.',
          icon: CreditCard,
          badge: 'Cobros Automatizados',
          color: 'from-sky-500 to-blue-600'
        };
      case 'cotizador_web':
        return {
          title: 'Desarrollo Web & Portales a Medida',
          subtitle: 'Landing pages de alta conversión, e-commerce B2B y portales de clientes conectados al CRM.',
          icon: Globe,
          badge: 'Diseño UX/UI & Alta Conversión',
          color: 'from-violet-600 to-purple-800'
        };
      case 'cotizador_automatizacion':
        return {
          title: 'Automatización de Procesos & BI',
          subtitle: 'Conectá tu ERP, planillas de Google y herramientas en flujos automáticos sin errores.',
          icon: Zap,
          badge: 'Ahorro de +20hs/semana',
          color: 'from-amber-600 to-orange-700'
        };
      case 'plan_enterprise':
        return {
          title: 'Cotización de Plan Enterprise & A Medida',
          subtitle: 'Infraestructura dedicada, volumen ilimitado y consultor comercial asignado.',
          icon: DollarSign,
          badge: 'Solución Corporativa',
          color: 'from-slate-800 to-slate-950'
        };
      case 'soporte_ticket':
        return {
          title: 'Mesa de Ayuda & Ticket de Soporte',
          subtitle: 'Asistencia técnica prioritaria de nuestro equipo de ingeniería y soporte de guardia.',
          icon: Headphones,
          badge: 'Soporte Técnico Especializado',
          color: 'from-rose-600 to-red-700'
        };
      case 'postulacion_partner':
        return {
          title: 'Programa de Partners & Agencias Aliadas',
          subtitle: 'Sumá comisiones recurrentes implementando Clientum en tu cartera de clientes.',
          icon: Users,
          badge: 'Hasta 30% Comisión Recurrente',
          color: 'from-emerald-700 to-slate-900'
        };
      case 'postulacion_carrera':
        return {
          title: 'Trabajá con Nosotros en Clientum',
          subtitle: 'Envianos tu perfil para sumarte a nuestro equipo 100% remoto de tecnología y ventas.',
          icon: Briefcase,
          badge: '100% Remoto · Equipo Ágil',
          color: 'from-indigo-600 to-blue-900'
        };
      case 'inscripcion_academia':
        return {
          title: 'Inscripción a Clientum Academia',
          subtitle: 'Capacitate en herramientas de IA, CRM y automatización de negocios.',
          icon: GraduationCap,
          badge: 'Campus Virtual & Certificación',
          color: 'from-teal-600 to-emerald-800'
        };
      case 'contacto_comercial':
      default:
        return {
          title: 'Contacto Directo con un Asesor',
          subtitle: 'Contanos qué necesita tu negocio y te armamos una propuesta a medida.',
          icon: MessageSquare,
          badge: 'Atención Inmediata',
          color: 'from-slate-900 to-[#1A3461]'
        };
    }
  };

  const meta = getFormMetadata();
  const IconComponent = meta.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/public/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType,
          ...formData,
          whatsapp: formData.telefono,
          servicio_interes: meta.title
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'No se pudo registrar la solicitud.');
      }

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Error enviando formulario:', err);
      setErrorMsg(err.message || 'Error de conexión. Intente nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="public-lead-form-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
    >
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header con gradiente temático */}
        <div className={`bg-gradient-to-r ${meta.color} p-6 text-white relative shrink-0`}>
          <button
            id="close-public-lead-form-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
              {meta.badge}
            </span>
          </div>
          <h2 className="text-xl font-display font-bold leading-snug">{meta.title}</h2>
          <p className="text-white/80 text-xs mt-1 leading-relaxed">{meta.subtitle}</p>
        </div>

        {/* Contenido del Formulario o Pantalla de Éxito */}
        <div className="p-6 overflow-y-auto grow">
          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-sm animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900">
                ¡Solicitud Registrada con Éxito!
              </h3>
              <p className="text-xs text-slate-600 max-w-md leading-relaxed">
                Hemos recibido tu información correctamente y ya fue derivada al equipo especialista de Clientum. Te responderemos por WhatsApp o Email en menos de 24hs hábiles.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left w-full max-w-md text-xs text-slate-700 mt-2 space-y-1 font-mono">
                <div><span className="text-slate-400">Contacto:</span> {formData.nombre} ({formData.email})</div>
                <div><span className="text-slate-400">Teléfono:</span> {formData.telefono || 'No provisto'}</div>
                <div><span className="text-slate-400">Módulo:</span> {meta.title}</div>
              </div>
              <button
                id="finish-lead-form-btn"
                onClick={onClose}
                className="mt-4 bg-slate-900 hover:bg-[#1A3461] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl cursor-pointer shadow-sm transition-all"
              >
                Cerrar Ventana
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-medium text-slate-700">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Datos Principales de Contacto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Nombre Completo *</label>
                  <input
                    id="form-nombre"
                    type="text"
                    required
                    placeholder="Ej. Martín Rodríguez"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#1A3461] focus:ring-1 focus:ring-[#1A3461] focus:outline-none transition-all"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Email Corporativo / Personal *</label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    placeholder="martin@empresa.com.ar"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#1A3461] focus:ring-1 focus:ring-[#1A3461] focus:outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold text-slate-800">WhatsApp / Teléfono *</label>
                  <input
                    id="form-telefono"
                    type="tel"
                    required
                    placeholder="+54 9 298 451-0883"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#1A3461] focus:ring-1 focus:ring-[#1A3461] focus:outline-none transition-all"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Empresa o Negocio</label>
                  <input
                    id="form-empresa"
                    type="text"
                    placeholder="Ej. Distribuidora del Valle"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#1A3461] focus:ring-1 focus:ring-[#1A3461] focus:outline-none transition-all"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  />
                </div>
              </div>

              {/* Campos dinámicos según el tipo de formulario */}
              {formType === 'cotizador_chatbot' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-emerald-50/60 border border-emerald-100 p-3.5 rounded-xl">
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Volumen mensual de chats</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.chats_estimados}
                      onChange={(e) => setFormData({ ...formData, chats_estimados: e.target.value })}
                    >
                      <option>Menos de 1.000 chats/mes</option>
                      <option>1.000 a 5.000 chats/mes</option>
                      <option>5.000 a 20.000 chats/mes</option>
                      <option>Más de 20.000 chats/mes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Rubro del Negocio</label>
                    <input
                      type="text"
                      placeholder="Ej. Concesionaria, Ferretería, Salud"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.rubro}
                      onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {formType === 'cotizador_crm' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-sky-50/60 border border-sky-100 p-3.5 rounded-xl">
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Cantidad de asesores/vendedores</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.cantidad_usuarios}
                      onChange={(e) => setFormData({ ...formData, cantidad_usuarios: e.target.value })}
                    >
                      <option>1 a 2 asesores</option>
                      <option>3 a 5 vendedores</option>
                      <option>6 a 15 vendedores</option>
                      <option>Más de 15 integrantes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">¿Usan algún CRM o Excel hoy?</label>
                    <input
                      type="text"
                      placeholder="Ej. Planillas de Google, HubSpot, Ninguno"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.rubro}
                      onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {formType === 'cotizador_afip' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-cyan-50/60 border border-cyan-100 p-3.5 rounded-xl">
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">CUIT de la Empresa / Persona</label>
                    <input
                      type="text"
                      placeholder="30-71829384-9"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.cuit}
                      onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Condición Fiscal</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.condicion_iva}
                      onChange={(e) => setFormData({ ...formData, condicion_iva: e.target.value })}
                    >
                      <option>Responsable Inscripto</option>
                      <option>Monotributo</option>
                      <option>Exento</option>
                    </select>
                  </div>
                </div>
              )}

              {formType === 'cotizador_web' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-purple-50/60 border border-purple-100 p-3.5 rounded-xl">
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Presupuesto Estimado</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.presupuesto}
                      onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                    >
                      <option>USD 250 - 500 (Landing Page / Web)</option>
                      <option>USD 500 - 1500 (E-Commerce / Portal)</option>
                      <option>USD 1500 - 3000 (Plataforma Completa)</option>
                      <option>A definir con asesor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Plazo Deseado</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.plazo}
                      onChange={(e) => setFormData({ ...formData, plazo: e.target.value })}
                    >
                      <option>Urgente (menos de 7 días)</option>
                      <option>1 a 2 semanas</option>
                      <option>1 mes</option>
                    </select>
                  </div>
                </div>
              )}

              {formType === 'plan_enterprise' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-100/80 border border-slate-200 p-3.5 rounded-xl">
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Plan de Interés</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.plan_interes}
                      onChange={(e) => setFormData({ ...formData, plan_interes: e.target.value })}
                    >
                      <option>Plan Pro ($80 USD/mes)</option>
                      <option>Plan Corporativo ($150 USD/mes)</option>
                      <option>Plan Especializado Enterprise ($250 USD/mes)</option>
                      <option>Infraestructura Dedicada / On-Premise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Cantidad de Usuarios</label>
                    <input
                      type="text"
                      placeholder="Ej. 20 vendedores + 3 administradores"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.cantidad_usuarios}
                      onChange={(e) => setFormData({ ...formData, cantidad_usuarios: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {formType === 'soporte_ticket' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-rose-50/60 border border-rose-100 p-3.5 rounded-xl">
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Módulo o Servicio Afectado</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.modulo_afectado}
                      onChange={(e) => setFormData({ ...formData, modulo_afectado: e.target.value })}
                    >
                      <option>WhatsApp Bot & Webhooks</option>
                      <option>CRM & Pipeline Comercial</option>
                      <option>Facturación AFIP / CAE</option>
                      <option>Acceso / Login / Cuenta</option>
                      <option>Otro requerimiento</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Nivel de Urgencia</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.urgencia}
                      onChange={(e) => setFormData({ ...formData, urgencia: e.target.value })}
                    >
                      <option>Baja (Consulta general)</option>
                      <option>Media (Resolver en 48hs)</option>
                      <option>Alta (Afecta operación comercial)</option>
                      <option>Crítica (Servicio interrumpido)</option>
                    </select>
                  </div>
                </div>
              )}

              {formType === 'postulacion_partner' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-emerald-50/60 border border-emerald-100 p-3.5 rounded-xl">
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Tipo de Alianza</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.tipo_alianza}
                      onChange={(e) => setFormData({ ...formData, tipo_alianza: e.target.value })}
                    >
                      <option>Implementador / Consultor Técnico</option>
                      <option>Agencia de Marketing / Revendedor</option>
                      <option>Afiliado Comercial / Referencias</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Clientes PyME actuales</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.clientes_actuales}
                      onChange={(e) => setFormData({ ...formData, clientes_actuales: e.target.value })}
                    >
                      <option>1 a 5 clientes</option>
                      <option>5 a 15 clientes PyME</option>
                      <option>Más de 15 clientes</option>
                    </select>
                  </div>
                </div>
              )}

              {formType === 'postulacion_carrera' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-indigo-50/60 border border-indigo-100 p-3.5 rounded-xl">
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Área de Postulación</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.area_postulacion}
                      onChange={(e) => setFormData({ ...formData, area_postulacion: e.target.value })}
                    >
                      <option>Desarrollador/a Full Stack (React/Node)</option>
                      <option>Consultor/a de Implementación CRM</option>
                      <option>Ejecutivo/a Comercial B2B</option>
                      <option>Diseñador/a UI/UX</option>
                      <option>Postulación Espontánea</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-slate-800">Enlace a LinkedIn / CV / Portfolio</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/tu-perfil"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {formType === 'inscripcion_academia' && (
                <div className="bg-teal-50/60 border border-teal-100 p-3.5 rounded-xl">
                  <label className="block mb-1 font-bold text-slate-800">Curso o Taller de Interés</label>
                  <select
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                    value={formData.curso_interes}
                    onChange={(e) => setFormData({ ...formData, curso_interes: e.target.value })}
                  >
                    <option>Aprende IA para Negocios (Completo 6 Módulos)</option>
                    <option>Masterclass: Automatización WhatsApp & CRM</option>
                    <option>Taller: Facturación AFIP y Conexión Contable</option>
                    <option>Capacitación Corporativa para Equipos</option>
                  </select>
                </div>
              )}

              {/* Mensaje o Descripción */}
              <div>
                <label className="block mb-1 font-bold text-slate-800">
                  {formType === 'soporte_ticket'
                    ? 'Descripción detallada del problema o consulta *'
                    : 'Detalles adicionales o requerimientos específicos'}
                </label>
                <textarea
                  id="form-mensaje"
                  rows={3}
                  placeholder={
                    formType === 'soporte_ticket'
                      ? 'Describa el paso a paso del error o la consulta técnica...'
                      : 'Contanos brevemente qué buscas lograr o qué dudas tenés...'
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#1A3461] focus:ring-1 focus:ring-[#1A3461] focus:outline-none transition-all resize-none"
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                />
              </div>

              {/* Botón de Envío */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tus datos están protegidos y no enviamos spam.</span>
                </div>
                <button
                  id="submit-public-lead-form-btn"
                  type="submit"
                  disabled={submitting}
                  className={`bg-[#1A3461] hover:bg-[#0d1f3c] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl cursor-pointer shadow-md transition-all flex items-center gap-2 ${
                    submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Enviar Solicitud</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
