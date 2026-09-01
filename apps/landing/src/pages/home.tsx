import React from "react";

export function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-8 bg-slate-950 text-white p-6">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-2">¡Bienvenido a Clientum CRM!</h1>
        <p className="text-zinc-400 mb-4">Plataforma de ventas B2B y automatización con IA.</p>
      </div>
    </div>
  );
}

export default Home;
