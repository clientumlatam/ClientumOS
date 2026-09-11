import React, { useEffect, useMemo, useState } from 'react';
import {
  Check,
  Copy,
  KeyRound,
  Layers3,
  LockKeyhole,
  Plus,
  ShieldCheck,
  Trash2,
  UserRound,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { APIKey } from '../../types';
import { getClientumAuthHeaders, getClientumAuthJsonHeaders } from '../../lib/api';

type ModuleGroup = {
  label: string;
  items: Array<{ id: string; label: string }>;
};

const MODULE_GROUPS: ModuleGroup[] = [
  {
    label: 'Ventas & cierre',
    items: [
      { id: 'propuestas', label: 'Propuestas & Presupuestos' },
      { id: 'googleMaps', label: 'Prospección Maps B2B' },
      { id: 'meddic', label: 'Lead Scoring MEDDIC' },
      { id: 'chatbot', label: 'Chatbot WhatsApp 24/7' },
      { id: 'campaigns', label: 'Campañas Masivas' },
    ],
  },
  {
    label: 'Inteligencia artificial',
    items: [
      { id: 'agenteOS', label: 'Agent OS (14 Agentes)' },
      { id: 'aiAssistant', label: 'Asistente Gemini 3.6' },
      { id: 'gtmStrategy', label: 'Estrategias GTM' },
      { id: 'sdrOutreach', label: 'Agente SDR Outreach' },
    ],
  },
  {
    label: 'Operaciones & sistema',
    items: [
      { id: 'payments', label: 'Cobros MercadoPago' },
      { id: 'tiendaDigital', label: 'Tienda Digital WhatsApp' },
      { id: 'campusLMS', label: 'Campus Academia LMS' },
      { id: 'workflows', label: 'Workflows & Flujos' },
      { id: 'customObjects', label: 'Custom Objects Studio' },
      { id: 'csvStudio', label: 'CSV Import & Export' },
      { id: 'domainManager', label: 'Gestor de Dominios' },
    ],
  },
];

const ALL_MODULE_IDS = MODULE_GROUPS.flatMap((group) => group.items.map((item) => item.id));

export const UserApiKeysTab: React.FC = () => {
  const {
    users,
    currentUser,
    hasPermission,
    showToast,
  } = useCRM();
  const [selectedUserId, setSelectedUserId] = useState(currentUser.id);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [selectedModules, setSelectedModules] = useState<string[]>(() => {
    try {
      const requestedModule = sessionStorage.getItem('clientum_api_key_module');
      return requestedModule ? [requestedModule] : ['propuestas', 'googleMaps'];
    } catch {
      return ['propuestas', 'googleMaps'];
    }
  });
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [revealedToken, setRevealedToken] = useState<{ keyName: string; token: string } | null>(null);
  const [secureKeysByUser, setSecureKeysByUser] = useState<Record<string, APIKey[]>>({});
  const canManageUserKeys = hasPermission('integrations', 'manage');
  const visibleUsers = canManageUserKeys ? users : [currentUser];

  const selectedUser = visibleUsers.find((user) => user.id === selectedUserId) || currentUser;
  useEffect(() => {
    const ownerUserId = selectedUser.id;
    let isMounted = true;
    void (async () => {
      try {
        const response = await fetch(`/api/user-api-keys?ownerUserId=${encodeURIComponent(ownerUserId)}`, {
          headers: await getClientumAuthHeaders(currentUser),
        });
        if (!response.ok) throw new Error('secure API key read failed');
        const payload = await response.json() as { keys?: APIKey[] };
        if (isMounted) {
          setSecureKeysByUser((previous) => ({ ...previous, [ownerUserId]: payload.keys || [] }));
        }
      } catch {
        if (isMounted) showToast('No se pudieron cargar las API Keys REST seguras', 'warning');
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [currentUser, selectedUser.id, showToast]);

  const userKeys = useMemo(
    () => secureKeysByUser[selectedUser.id] || [],
    [secureKeysByUser, selectedUser.id],
  );
  const activeKeyCount = userKeys.filter((key) => key.status === 'active').length;

  const toggleModule = (moduleId: string) => {
    setSelectedModules((current) =>
      current.includes(moduleId)
        ? current.filter((id) => id !== moduleId)
        : [...current, moduleId],
    );
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!keyName.trim() || selectedModules.length === 0) {
      showToast('Define un nombre y al menos un módulo para la API Key', 'warning');
      return;
    }

    const scopes = selectedModules.map((moduleId) => `module:${moduleId}`);
    try {
      const response = await fetch('/api/user-api-keys', {
        method: 'POST',
        headers: await getClientumAuthJsonHeaders(currentUser),
        body: JSON.stringify({
          name: keyName.trim(),
          scopes,
          ownerUserId: selectedUser.id,
        }),
      });
      if (!response.ok) throw new Error('secure API key create failed');
      const payload = await response.json() as { key: APIKey; token: string };
      setSecureKeysByUser((previous) => ({
        ...previous,
        [selectedUser.id]: [payload.key, ...(previous[selectedUser.id] || [])],
      }));
      setRevealedToken({ keyName: payload.key.name, token: payload.token });
    } catch {
      showToast('No se pudo generar la API Key REST segura', 'error');
      return;
    }
    setKeyName('');
    setSelectedModules(['propuestas', 'googleMaps']);
    setIsCreateOpen(false);
  };

  const handleRevoke = async (key: APIKey) => {
    try {
      const response = await fetch(`/api/user-api-keys/${encodeURIComponent(key.id)}`, {
        method: 'DELETE',
        headers: await getClientumAuthHeaders(currentUser),
      });
      if (!response.ok) throw new Error('secure API key revoke failed');
      setSecureKeysByUser((previous) => ({
        ...previous,
        [selectedUser.id]: (previous[selectedUser.id] || []).map((item) =>
          item.id === key.id ? { ...item, status: 'revoked' } : item,
        ),
      }));
      showToast(`API Key "${key.name}" revocada`, 'warning');
    } catch {
      showToast('No se pudo revocar la API Key REST segura', 'error');
    }
  };

  const handleCopy = async (key: APIKey) => {
    if (!key.token) {
      showToast('Por seguridad, el token completo solo se puede copiar durante su creación', 'warning');
      return;
    }
    await navigator.clipboard.writeText(key.token);
    setCopiedKeyId(key.id);
    showToast(`Token ${key.keyPrefix}... copiado al portapapeles`, 'success');
    window.setTimeout(() => setCopiedKeyId(null), 2000);
  };

  return (
    <div id="user-api-keys-container" className="space-y-4">
      <div className="rounded-xl border border-[#1e2434] bg-[#121620] p-5">
        <div className="flex flex-col gap-4 border-b border-[#1e2434] pb-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10 text-purple-400">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                API Keys por usuario
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                  Configuración granular
                </span>
              </h3>
              <p className="mt-1 max-w-2xl text-xs text-slate-400">
                 Asigna tokens independientes a cada integrante y limita el acceso a los módulos del menú. El token completo solo se muestra una vez.
              </p>
            </div>
          </div>

          <button
            id="create-user-api-key-btn"
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-purple-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-purple-500"
          >
            <Plus className="h-3.5 w-3.5" />
            Nueva API Key para {selectedUser.name.split(' ')[0]}
          </button>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
           {visibleUsers.map((user) => {
              const count = (secureKeysByUser[user.id] || []).filter((key) => key.status === 'active').length;
            return (
              <button
                type="button"
                key={user.id}
                id={`user-api-key-tab-${user.id}`}
                onClick={() => setSelectedUserId(user.id)}
                className={`flex min-w-[190px] items-center gap-2 rounded-xl border px-3 py-2 text-left transition-colors ${
                  selectedUser.id === user.id
                    ? 'border-blue-500/60 bg-blue-500/10 text-white'
                    : 'border-[#1e2434] bg-[#0e121a] text-slate-400 hover:border-[#2b354c] hover:text-white'
                }`}
              >
                <img src={user.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold">{user.name}</span>
                  <span className="block truncate text-[10px] text-slate-500">{user.role}</span>
                </span>
                <span className="rounded-full bg-[#1e2434] px-1.5 py-0.5 font-mono text-[10px] text-blue-300">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        {revealedToken && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 xl:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold text-amber-200">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  Token generado para {revealedToken.keyName}
                </p>
                <p className="mt-1 text-[11px] text-amber-100/70">
                  Cópialo ahora. Por seguridad no volverá a mostrarse después de recargar o cerrar esta vista.
                </p>
              </div>
              <div className="flex min-w-0 items-center gap-2">
                <code className="max-w-[360px] truncate rounded-lg border border-amber-500/30 bg-[#0e121a] px-3 py-2 text-[11px] text-amber-100">
                  {revealedToken.token}
                </code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(revealedToken.token);
                    showToast('Token copiado al portapapeles', 'success');
                  }}
                  className="rounded-lg border border-amber-500/30 px-2.5 py-2 text-[11px] font-semibold text-amber-200 hover:bg-amber-500/10"
                >
                  Copiar
                </button>
                <button type="button" onClick={() => setRevealedToken(null)} className="rounded-lg p-2 text-amber-200/70 hover:bg-amber-500/10" aria-label="Ocultar token">
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-[#1e2434] bg-[#121620] p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-white">
                <UserRound className="h-4 w-4 text-blue-400" />
                Tokens de {selectedUser.name}
              </h4>
              <p className="mt-0.5 text-[11px] text-slate-500">{selectedUser.email} · {activeKeyCount} activas</p>
            </div>
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-[10px] font-mono text-blue-300">
              user_id: {selectedUser.id}
            </span>
          </div>

          {userKeys.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#2b354c] bg-[#0e121a] px-4 py-8 text-center">
              <KeyRound className="mx-auto h-6 w-6 text-slate-600" />
              <p className="mt-2 text-xs font-medium text-slate-300">Este usuario todavía no tiene API Keys</p>
              <p className="mt-1 text-[11px] text-slate-500">Crea un token y asigna solo los módulos que necesita.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#1e2434]">
              {userKeys.map((key) => (
                <div key={key.id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-white">{key.name}</span>
                      <span className={`rounded border px-2 py-0.5 text-[10px] ${
                        key.status === 'active'
                          ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                          : 'border-slate-600/30 bg-slate-700/50 text-slate-400'
                      }`}>
                        {key.status === 'active' ? 'Activa' : 'Revocada'}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 font-mono text-[11px] text-slate-400">
                      <span>{key.keyPrefix}••••••••••••••••</span>
                       {key.status === 'active' && key.token && (
                        <button type="button" onClick={() => handleCopy(key)} className="rounded p-0.5 text-slate-400 hover:text-white" title="Copiar token">
                          {copiedKeyId === key.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {key.scopes.map((scope) => (
                        <span key={scope} className="rounded bg-[#182030] px-1.5 py-0.5 font-mono text-[10px] text-blue-300">
                          {scope.replace('module:', '')}
                        </span>
                      ))}
                    </div>
                  </div>
                  {key.status === 'active' && (
                    <button
                      type="button"
                      onClick={() => {
                         if (window.confirm(`¿Revocar la clave "${key.name}"?`)) void handleRevoke(key);
                      }}
                      className="flex shrink-0 items-center gap-1.5 self-start rounded border border-rose-500/20 px-2.5 py-1 text-xs font-medium text-rose-400 transition-colors hover:bg-rose-950/30 sm:self-center"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Revocar
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-[#1e2434] bg-[#121620] p-4">
          <h4 className="flex items-center gap-2 text-xs font-semibold text-white">
            <Layers3 className="h-4 w-4 text-purple-400" />
            Módulos disponibles
          </h4>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
            Cada token puede limitarse a los módulos del menú avanzado.
          </p>
          <div className="mt-3 space-y-3">
            {MODULE_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{group.label}</p>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <span key={item.id} className="rounded border border-[#253047] bg-[#0e121a] px-1.5 py-1 text-[10px] text-slate-400">
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#222a3d] bg-[#121620] p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1e2434] pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Nueva API Key por módulo</h3>
                <p className="mt-0.5 text-[11px] text-slate-400">Usuario: {selectedUser.name}</p>
              </div>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-white">×</button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-300">Nombre de la clave *</span>
                <input
                  required
                  value={keyName}
                  onChange={(event) => setKeyName(event.target.value)}
                  placeholder="ej. Integración de propuestas"
                  className="w-full rounded-md border border-[#2b354c] bg-[#0e121a] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </label>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">Módulos permitidos *</span>
                  <button type="button" onClick={() => setSelectedModules(selectedModules.length === ALL_MODULE_IDS.length ? [] : ALL_MODULE_IDS)} className="text-[10px] font-semibold text-blue-400 hover:text-blue-300">
                    {selectedModules.length === ALL_MODULE_IDS.length ? 'Quitar todos' : 'Seleccionar todos'}
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {MODULE_GROUPS.flatMap((group) => group.items).map((module) => (
                    <label key={module.id} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2 text-[11px] transition-colors ${
                      selectedModules.includes(module.id) ? 'border-blue-500/40 bg-blue-500/10 text-blue-200' : 'border-[#1e2434] bg-[#0e121a] text-slate-400'
                    }`}>
                      <input type="checkbox" checked={selectedModules.includes(module.id)} onChange={() => toggleModule(module.id)} className="rounded border-[#2b354c] bg-[#121620] text-blue-600 focus:ring-0" />
                      <span>{module.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-amber-200/80">
                <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                 El token completo se muestra una sola vez. En producción, el hash debe guardarse en el backend y el valor original no debe persistirse en el navegador.
              </div>

              <div className="flex justify-end gap-2 border-t border-[#1e2434] pt-3">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="rounded-md px-3 py-1.5 text-xs text-slate-300 hover:text-white">Cancelar</button>
                <button type="submit" className="flex items-center gap-1.5 rounded-md bg-purple-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-purple-500">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Generar token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};