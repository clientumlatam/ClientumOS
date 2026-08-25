import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PublicWebsite from './components/PublicWebsite';
import { AboutUs } from './components/AboutUs';
import { GmailManager } from './components/gmail/GmailManager';
import { ArrowLeft, Mail } from 'lucide-react';

export default function App() {
  const publicWebsiteElement = (
    <div className="w-screen min-h-screen bg-slate-900 overflow-y-auto">
      <PublicWebsite onBackToEditor={() => {}} />
    </div>
  );

  return (
    <Routes>
      <Route path="/about" element={<div className="w-screen min-h-screen bg-slate-900 overflow-y-auto"><AboutUs /></div>} />
      <Route
        path="/gmail"
        element={
          <div className="w-screen min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            <header className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver al Portal</span>
                </Link>
                <div className="h-4 w-px bg-slate-700" />
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-400" />
                  <span className="font-bold text-sm tracking-tight text-white">Clientum Gmail Suite</span>
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              <GmailManager />
            </main>
          </div>
        }
      />
      <Route path="*" element={publicWebsiteElement} />
    </Routes>
  );
}
