import React, { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Nombre" required className="w-full p-2 rounded bg-slate-800 text-white" />
      <input name="email" type="email" placeholder="Email" required className="w-full p-2 rounded bg-slate-800 text-white" />
      <input name="subject" placeholder="Asunto" required className="w-full p-2 rounded bg-slate-800 text-white" />
      <textarea name="message" placeholder="Mensaje" required className="w-full p-2 rounded bg-slate-800 text-white" />
      <button type="submit" disabled={status === 'submitting'} className="bg-emerald-500 text-white p-2 rounded">
        {status === 'submitting' ? 'Enviando...' : 'Enviar'}
      </button>
      {status === 'success' && <p className="text-emerald-400">Mensaje enviado con éxito.</p>}
      {status === 'error' && <p className="text-red-400">Error al enviar el mensaje.</p>}
    </form>
  );
}
