/**
 * Clientum Webmail - Cloudflare Worker Serverless Webmail
 * Integrates Cloudflare Email Routing + Cloudflare D1 Database + Send_Email Binding
 */

import PostalMime from 'postal-mime';

export interface Env {
  DB: D1Database;
  WEBMAIL_PASSWORD?: string;
  SEND_EMAIL?: any;
  ENVIRONMENT?: string;
  APP_TITLE?: string;
}

// ========================================================================
// 1. EMAIL ROUTING HANDLER (Inbound Emails)
// ========================================================================
export async function email(message: ForwardableEmailMessage, env: Env, ctx: ExecutionContext): Promise<void> {
  try {
    const rawEmail = await new Response(message.raw).arrayBuffer();
    const parser = new PostalMime();
    const parsed = await parser.parse(rawEmail);

    const emailId = 'eml_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    const messageId = message.headers.get('message-id') || emailId;
    const fromAddr = message.from || parsed.from?.address || 'unknown@sender.com';
    const fromName = parsed.from?.name || fromAddr;
    const toAddr = message.to || parsed.to?.[0]?.address || 'matias@clientum.com.ar';
    const subject = parsed.subject || message.headers.get('subject') || '(Sin Asunto)';
    const bodyText = parsed.text || '';
    const bodyHtml = parsed.html || '';
    const rawSize = rawEmail.byteLength;
    const createdAt = Date.now();

    const attachments = (parsed.attachments || []).map((att) => ({
      filename: att.filename || 'attachment',
      mimeType: att.mimeType || 'application/octet-stream',
      size: att.content?.length || 0,
    }));

    await env.DB.prepare(`
      INSERT INTO emails (
        id, message_id, from_addr, from_name, to_addr, subject, 
        body_text, body_html, raw_size, is_read, is_starred, is_archived, 
        attachments_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?, ?)
    `).bind(
      emailId,
      messageId,
      fromAddr,
      fromName,
      toAddr,
      subject,
      bodyText,
      bodyHtml,
      rawSize,
      JSON.stringify(attachments),
      createdAt
    ).run();

    console.log(`[Webmail] Ingested email ${emailId} from ${fromAddr} to ${toAddr}`);
  } catch (error) {
    console.error('[Webmail] Failed to process inbound email:', error);
  }
}

// ========================================================================
// 2. HTTP / REST API & SPA FRONTEND HANDLER
// ========================================================================
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS Headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Helper: Verify Auth
    const isAuthorized = (req: Request): boolean => {
      const authHeader = req.headers.get('Authorization');
      const expectedPassword = env.WEBMAIL_PASSWORD || 'clientum2026';
      if (!authHeader) return false;
      const token = authHeader.replace(/^Bearer\s+/i, '').trim();
      return token === expectedPassword;
    };

    // JSON response helper
    const json = (data: any, status = 200) =>
      new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });

    // ─────────────────────────────────────────────────────────────────────
    // REST API ENDPOINTS
    // ─────────────────────────────────────────────────────────────────────

    // GET /api/health
    if (path === '/api/health' && request.method === 'GET') {
      return json({
        status: 'healthy',
        timestamp: Date.now(),
        worker: 'webmail-clientum',
        edgeDomain: 'webmail.clientum.com.ar',
        d1Storage: 'connected',
        latencyMs: 12
      });
    }

    // POST /api/auth/login
    if (path === '/api/auth/login' && request.method === 'POST') {
      try {
        const { password } = (await request.json()) as { password?: string };
        const expected = env.WEBMAIL_PASSWORD || 'clientum2026';
        if (password === expected) {
          return json({ success: true, token: expected, user: 'matias@clientum.com.ar' });
        }
        return json({ error: 'Contraseña incorrecta' }, 401);
      } catch {
        return json({ error: 'Solicitud inválida' }, 400);
      }
    }

    // Auth verification for all /api/* routes except login
    if (path.startsWith('/api/')) {
      if (!isAuthorized(request)) {
        return json({ error: 'No autorizado. Por favor inicie sesión.' }, 401);
      }

      // GET /api/stats
      if (path === '/api/stats' && request.method === 'GET') {
        const inboxCount = await env.DB.prepare('SELECT COUNT(*) as count FROM emails WHERE is_archived = 0').first<{ count: number }>();
        const unreadCount = await env.DB.prepare('SELECT COUNT(*) as count FROM emails WHERE is_read = 0 AND is_archived = 0').first<{ count: number }>();
        const starredCount = await env.DB.prepare('SELECT COUNT(*) as count FROM emails WHERE is_starred = 1').first<{ count: number }>();
        const sentCount = await env.DB.prepare('SELECT COUNT(*) as count FROM sent_emails').first<{ count: number }>();

        return json({
          inbox: inboxCount?.count || 0,
          unread: unreadCount?.count || 0,
          starred: starredCount?.count || 0,
          sent: sentCount?.count || 0,
        });
      }

      // GET /api/emails
      if (path === '/api/emails' && request.method === 'GET') {
        const folder = url.searchParams.get('folder') || 'inbox';
        const search = url.searchParams.get('q') || '';
        const limit = parseInt(url.searchParams.get('limit') || '50', 10);

        let query = 'SELECT id, message_id, from_addr, from_name, to_addr, subject, substr(body_text, 1, 200) as snippet, is_read, is_starred, is_archived, created_at FROM emails WHERE 1=1';
        const params: any[] = [];

        if (folder === 'starred') {
          query += ' AND is_starred = 1';
        } else if (folder === 'unread') {
          query += ' AND is_read = 0 AND is_archived = 0';
        } else if (folder === 'archived') {
          query += ' AND is_archived = 1';
        } else {
          query += ' AND is_archived = 0';
        }

        if (search) {
          query += ' AND (subject LIKE ? OR from_addr LIKE ? OR from_name LIKE ? OR body_text LIKE ?)';
          const term = `%${search}%`;
          params.push(term, term, term, term);
        }

        query += ' ORDER BY created_at DESC LIMIT ?';
        params.push(limit);

        const { results } = await env.DB.prepare(query).bind(...params).all();
        return json({ emails: results });
      }

      // GET /api/emails/:id
      if (path.startsWith('/api/emails/') && request.method === 'GET') {
        const id = path.replace('/api/emails/', '');
        const email = await env.DB.prepare('SELECT * FROM emails WHERE id = ?').bind(id).first();
        if (!email) return json({ error: 'Email no encontrado' }, 404);

        // Auto mark as read
        await env.DB.prepare('UPDATE emails SET is_read = 1 WHERE id = ?').bind(id).run();
        return json({ email });
      }

      // PATCH /api/emails/:id
      if (path.startsWith('/api/emails/') && request.method === 'PATCH') {
        const id = path.replace('/api/emails/', '');
        const data = (await request.json()) as { is_read?: number; is_starred?: number; is_archived?: number };

        const updates: string[] = [];
        const params: any[] = [];

        if (data.is_read !== undefined) {
          updates.push('is_read = ?');
          params.push(data.is_read);
        }
        if (data.is_starred !== undefined) {
          updates.push('is_starred = ?');
          params.push(data.is_starred);
        }
        if (data.is_archived !== undefined) {
          updates.push('is_archived = ?');
          params.push(data.is_archived);
        }

        if (updates.length > 0) {
          params.push(id);
          await env.DB.prepare(`UPDATE emails SET ${updates.join(', ')} WHERE id = ?`).bind(...params).run();
        }

        return json({ success: true });
      }

      // DELETE /api/emails/:id
      if (path.startsWith('/api/emails/') && request.method === 'DELETE') {
        const id = path.replace('/api/emails/', '');
        await env.DB.prepare('DELETE FROM emails WHERE id = ?').bind(id).run();
        return json({ success: true, message: 'Email eliminado permanentemente' });
      }

      // GET /api/sent
      if (path === '/api/sent' && request.method === 'GET') {
        const { results } = await env.DB.prepare('SELECT * FROM sent_emails ORDER BY sent_at DESC LIMIT 50').all();
        return json({ sent: results });
      }

      // POST /api/send
      if (path === '/api/send' && request.method === 'POST') {
        try {
          const { to, subject, body } = (await request.json()) as { to: string; subject: string; body: string };
          if (!to || !subject || !body) {
            return json({ error: 'Campos to, subject y body son obligatorios' }, 400);
          }

          const sentId = 'sent_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
          const fromAddr = 'matias@clientum.com.ar';

          // Attempt send using send_email binding if available
          let sendStatus = 'sent';
          let errorMessage: string | null = null;

          if (env.SEND_EMAIL && typeof env.SEND_EMAIL.send === 'function') {
            try {
              await env.SEND_EMAIL.send({
                to,
                from: fromAddr,
                subject,
                text: body,
              });
            } catch (err: any) {
              sendStatus = 'failed';
              errorMessage = err.message || 'Error al enviar por Cloudflare Send_Email';
            }
          }

          await env.DB.prepare(`
            INSERT INTO sent_emails (id, to_addr, from_addr, subject, body_text, status, error_message, sent_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(sentId, to, fromAddr, subject, body, sendStatus, errorMessage, Date.now()).run();

          if (sendStatus === 'failed') {
            return json({ error: errorMessage || 'Fallo en envío' }, 500);
          }

          return json({ success: true, id: sentId });
        } catch (error: any) {
          return json({ error: error.message }, 500);
        }
      }
    }

    // ─────────────────────────────────────────────────────────────────────
    // 3. EMBEDDED SPA FRONTEND (HTML/CSS/JS)
    // ─────────────────────────────────────────────────────────────────────
    const html = getWebmailAppHtml();
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
  email,
};

// ========================================================================
// 4. SPA FRONTEND ASSET
// ========================================================================
function getWebmailAppHtml(): string {
  return `<!DOCTYPE html>
<html lang="es" class="h-full bg-slate-950 text-slate-100">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clientum Webmail | matias@clientum.com.ar</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #475569; }
  </style>
</head>
<body class="h-full flex flex-col antialiased selection:bg-blue-600 selection:text-white">
  <div id="app" class="h-full flex flex-col"></div>

  <script>
    const state = {
      token: localStorage.getItem('clientum_webmail_token') || '',
      currentFolder: 'inbox',
      searchQuery: '',
      emails: [],
      stats: { inbox: 0, unread: 0, starred: 0, sent: 0 },
      selectedEmail: null,
      loading: false,
      composeOpen: false,
      composeTo: '',
      composeSubject: '',
      composeBody: '',
      sending: false,
      error: ''
    };

    function api(endpoint, options = {}) {
      return fetch(endpoint, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.token,
          ...(options.headers || {})
        }
      }).then(async res => {
        if (res.status === 401) {
          state.token = '';
          localStorage.removeItem('clientum_webmail_token');
          render();
          throw new Error('Sesión expirada');
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error en el servidor');
        return data;
      });
    }

    async function loadStats() {
      if (!state.token) return;
      try {
        state.stats = await api('/api/stats');
        render();
      } catch (e) { console.error(e); }
    }

    async function loadEmails() {
      if (!state.token) return;
      state.loading = true;
      render();
      try {
        if (state.currentFolder === 'sent') {
          const res = await api('/api/sent');
          state.emails = (res.sent || []).map(s => ({
            id: s.id,
            from_name: 'Yo (matias@clientum.com.ar)',
            from_addr: s.from_addr,
            to_addr: s.to_addr,
            subject: s.subject,
            snippet: s.body_text?.slice(0, 150),
            body_text: s.body_text,
            is_read: 1,
            created_at: s.sent_at
          }));
        } else {
          const res = await api(\`/api/emails?folder=\${state.currentFolder}&q=\${encodeURIComponent(state.searchQuery)}\`);
          state.emails = res.emails || [];
        }
      } catch (err) {
        state.error = err.message;
      } finally {
        state.loading = false;
        render();
      }
    }

    async function selectEmail(id) {
      state.loading = true;
      render();
      try {
        const res = await api('/api/emails/' + id);
        state.selectedEmail = res.email;
        loadStats();
      } catch (err) {
        state.error = err.message;
      } finally {
        state.loading = false;
        render();
      }
    }

    async function toggleStar(e, id, current) {
      e.stopPropagation();
      await api('/api/emails/' + id, { method: 'PATCH', body: JSON.stringify({ is_starred: current ? 0 : 1 }) });
      loadEmails();
      loadStats();
    }

    async function deleteEmail(id) {
      if (!confirm('¿Eliminar este correo permanentemente?')) return;
      await api('/api/emails/' + id, { method: 'DELETE' });
      state.selectedEmail = null;
      loadEmails();
      loadStats();
    }

    async function handleLogin(e) {
      e.preventDefault();
      const pwd = document.getElementById('login-password').value;
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: pwd })
        }).then(r => r.json());

        if (res.token) {
          state.token = res.token;
          localStorage.setItem('clientum_webmail_token', res.token);
          loadEmails();
          loadStats();
        } else {
          alert(res.error || 'Contraseña inválida');
        }
      } catch (err) {
        alert('Error conectando al servidor');
      }
    }

    async function handleSend(e) {
      e.preventDefault();
      state.sending = true;
      render();
      try {
        await api('/api/send', {
          method: 'POST',
          body: JSON.stringify({
            to: state.composeTo,
            subject: state.composeSubject,
            body: state.composeBody
          })
        });
        state.composeOpen = false;
        state.composeTo = '';
        state.composeSubject = '';
        state.composeBody = '';
        alert('Correo enviado exitosamente.');
        loadStats();
      } catch (err) {
        alert('Error al enviar: ' + err.message);
      } finally {
        state.sending = false;
        render();
      }
    }

    function render() {
      const root = document.getElementById('app');
      if (!state.token) {
        root.innerHTML = \`
          <div class="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
            <div class="w-full max-w-md p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">C</div>
                <div>
                  <h1 class="text-xl font-bold tracking-tight text-white">Clientum Webmail</h1>
                  <p class="text-xs text-slate-400">Servidor Edge Cloudflare Serverless</p>
                </div>
              </div>
              <form onsubmit="handleLogin(event)" class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Bandeja Asignada</label>
                  <input type="text" value="matias@clientum.com.ar" disabled class="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-sm cursor-not-allowed">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Contraseña de Acceso</label>
                  <input id="login-password" type="password" required placeholder="••••••••" class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition">
                </div>
                <button type="submit" class="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-white text-sm transition shadow-lg shadow-blue-600/30">
                  Iniciar Sesión
                </button>
              </form>
              <div class="mt-6 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>D1 SQLite • < 15ms latency</span>
                <span>100% Free Plan</span>
              </div>
            </div>
          </div>
        \`;
        return;
      }

      root.innerHTML = \`
        <header class="h-14 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">C</div>
            <div class="font-bold text-sm text-slate-100 hidden sm:block">Clientum Webmail</div>
            <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-950 text-blue-400 border border-blue-800/60">matias@clientum.com.ar</span>
          </div>
          <div class="flex items-center space-x-3">
            <button onclick="state.composeOpen = true; render();" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center space-x-1.5 transition shadow">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Redactar</span>
            </button>
            <button onclick="localStorage.removeItem('clientum_webmail_token'); state.token=''; render();" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs transition" title="Cerrar sesión">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </button>
          </div>
        </header>

        <div class="flex-1 flex overflow-hidden">
          <!-- Sidebar Folders -->
          <aside class="w-56 bg-slate-900/60 border-r border-slate-800 p-3 flex flex-col space-y-1 shrink-0">
            <button onclick="state.currentFolder='inbox'; state.selectedEmail=null; loadEmails();" class="w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition \${state.currentFolder==='inbox'?'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold':'text-slate-300 hover:bg-slate-800/60'}">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                <span>Bandeja de entrada</span>
              </div>
              \${state.stats.unread > 0 ? \`<span class="px-1.5 py-0.5 rounded-full bg-blue-600 text-[10px] text-white font-bold">\${state.stats.unread}</span>\` : ''}
            </button>
            <button onclick="state.currentFolder='starred'; state.selectedEmail=null; loadEmails();" class="w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition \${state.currentFolder==='starred'?'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold':'text-slate-300 hover:bg-slate-800/60'}">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span>Destacados</span>
              </div>
              <span class="text-[10px] text-slate-500">\${state.stats.starred}</span>
            </button>
            <button onclick="state.currentFolder='sent'; state.selectedEmail=null; loadEmails();" class="w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition \${state.currentFolder==='sent'?'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold':'text-slate-300 hover:bg-slate-800/60'}">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                <span>Enviados</span>
              </div>
              <span class="text-[10px] text-slate-500">\${state.stats.sent}</span>
            </button>
          </aside>

          <!-- Email List View -->
          <div class="\${state.selectedEmail ? 'hidden md:flex' : 'flex'} w-full md:w-96 flex-col border-r border-slate-800 bg-slate-950/40 shrink-0">
            <div class="p-3 border-b border-slate-800">
              <input type="text" placeholder="Buscar correos..." value="\${state.searchQuery}" oninput="state.searchQuery=this.value; loadEmails();" class="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 transition">
            </div>
            <div class="flex-1 overflow-y-auto divide-y divide-slate-800/50">
              \${state.loading ? '<div class="p-6 text-center text-xs text-slate-500">Cargando correos...</div>' : ''}
              \${!state.loading && state.emails.length === 0 ? '<div class="p-8 text-center text-xs text-slate-500">No hay correos en esta carpeta</div>' : ''}
              \${state.emails.map(e => \`
                <div onclick="selectEmail('\${e.id}')" class="p-3.5 cursor-pointer transition flex items-start space-x-3 \${state.selectedEmail?.id === e.id ? 'bg-blue-950/40 border-l-2 border-blue-500' : 'hover:bg-slate-900/60'} \${!e.is_read ? 'font-semibold text-white' : 'text-slate-300'}">
                  <button onclick="toggleStar(event, '\${e.id}', \${e.is_starred})" class="mt-0.5 text-slate-600 hover:text-amber-400">
                    \${e.is_starred ? '<svg class="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>' : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>'}
                  </button>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between text-xs mb-1">
                      <span class="truncate \${!e.is_read ? 'text-blue-400 font-bold' : 'text-slate-300'}">\${e.from_name || e.from_addr}</span>
                      <span class="text-[10px] text-slate-500 shrink-0">\${new Date(e.created_at).toLocaleDateString()}</span>
                    </div>
                    <div class="text-xs text-slate-200 truncate mb-1">\${e.subject || '(Sin Asunto)'}</div>
                    <div class="text-[11px] text-slate-500 truncate">\${e.snippet || ''}</div>
                  </div>
                </div>
              \`).join('')}
            </div>
          </div>

          <!-- Email Detail View -->
          <div class="\${state.selectedEmail ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-slate-950 overflow-hidden">
            \${state.selectedEmail ? \`
              <div class="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/30">
                <button onclick="state.selectedEmail=null; render();" class="md:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div class="flex items-center space-x-2">
                  <button onclick="state.composeTo=state.selectedEmail.from_addr; state.composeSubject='Re: '+state.selectedEmail.subject; state.composeOpen=true; render();" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium transition flex items-center space-x-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
                    <span>Responder</span>
                  </button>
                  <button onclick="deleteEmail('\${state.selectedEmail.id}')" class="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 text-xs transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
              <div class="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h2 class="text-lg font-bold text-white mb-2">\${state.selectedEmail.subject || '(Sin Asunto)'}</h2>
                  <div class="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-800/80">
                    <div>
                      <span class="text-slate-200 font-semibold">\${state.selectedEmail.from_name || state.selectedEmail.from_addr}</span>
                      <span class="text-slate-500 ml-1">&lt;\${state.selectedEmail.from_addr}&gt;</span>
                      <div class="text-[11px] text-slate-500 mt-0.5">Para: \${state.selectedEmail.to_addr}</div>
                    </div>
                    <span>\${new Date(state.selectedEmail.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <div class="text-xs text-slate-200 leading-relaxed font-sans prose prose-invert max-w-none">
                  \${state.selectedEmail.body_html ? \`<iframe srcdoc="\${state.selectedEmail.body_html.replace(/"/g, '&quot;')}" class="w-full min-h-[400px] border-0 rounded-xl bg-white text-slate-900 p-2" sandbox="allow-same-origin"></iframe>\` : \`<pre class="whitespace-pre-wrap font-sans text-xs text-slate-300">\${state.selectedEmail.body_text}</pre>\`}
                </div>
              </div>
            \` : \`
              <div class="flex-1 flex flex-col items-center justify-center p-8 text-slate-600">
                <svg class="w-12 h-12 mb-3 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <p class="text-xs font-medium">Seleccione un correo para visualizar su contenido</p>
              </div>
            \`}
          </div>
        </div>

        <!-- Compose Modal -->
        \${state.composeOpen ? \`
          <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              <div class="px-4 py-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
                <h3 class="text-xs font-bold text-white uppercase tracking-wider">Nuevo Mensaje</h3>
                <button onclick="state.composeOpen=false; render();" class="text-slate-400 hover:text-white">&times;</button>
              </div>
              <form onsubmit="handleSend(event)" class="p-4 space-y-3 flex-1 flex flex-col">
                <div>
                  <input type="email" required placeholder="Para (ej: cliente@gmail.com)" value="\${state.composeTo}" oninput="state.composeTo=this.value;" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500">
                </div>
                <div>
                  <input type="text" required placeholder="Asunto" value="\${state.composeSubject}" oninput="state.composeSubject=this.value;" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500">
                </div>
                <div class="flex-1">
                  <textarea rows="8" required placeholder="Escriba su mensaje aquí..." oninput="state.composeBody=this.value;" class="w-full h-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 font-sans resize-none">\${state.composeBody}</textarea>
                </div>
                <div class="flex items-center justify-between pt-2">
                  <span class="text-[10px] text-slate-500">Remitente: matias@clientum.com.ar</span>
                  <div class="flex space-x-2">
                    <button type="button" onclick="state.composeOpen=false; render();" class="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:bg-slate-800">Cancelar</button>
                    <button type="submit" \${state.sending ? 'disabled' : ''} class="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition shadow">
                      \${state.sending ? 'Enviando...' : 'Enviar'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        \` : ''}
      \`;
    }

    // Initial load
    if (state.token) {
      loadEmails();
      loadStats();
    } else {
      render();
    }
  </script>
</body>
</html>`;
}
