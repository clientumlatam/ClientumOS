import React from 'react';

export function AboutUs() {
  return (
    <div className="p-8 bg-slate-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Sobre Nosotros</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Nuestra Historia</h2>
        <p>Clientum nació para ayudar a las PYMEs a escalar...</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Misión</h2>
        <p>Democratizar la IA para el crecimiento empresarial.</p>
      </section>
      {/* Add team profiles here */}
    </div>
  );
}
