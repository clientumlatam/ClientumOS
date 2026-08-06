import React from 'react';
export function SmtpTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Configuración SMTP</h1>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-sm text-slate-600">Configura servidores de correo saliente (SendGrid, AWS SES, Gmail SMTP).</p>
      </div>
    </div>
  );
}
