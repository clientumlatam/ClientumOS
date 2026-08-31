import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PublicWebsite from './components/PublicWebsite';
import { AboutUs } from './components/AboutUs';
import { GmailManager } from './components/gmail/GmailManager';
import { PublicDomainManagerPage } from './pages/PublicDomainManagerPage';
import DashboardApp from './dashboard/src/App';
import { IndustryLandingPage } from './components/public/IndustryLandingPage';
import { IndustryDirectoryPage } from './components/public/IndustryDirectoryPage';
import { PublicStorefrontPage } from './components/public/PublicStorefrontPage';
import { ClientumCrmLanding } from './components/public/ClientumCrmLanding';
import { ArrowLeft, Mail } from 'lucide-react';
import { ThemeContextProvider } from './lib/ThemeContext';

export default function App() {
  const publicWebsiteElement = (
    <div className="w-screen min-h-screen bg-slate-900 overflow-y-auto">
      <PublicWebsite onBackToEditor={() => {}} />
    </div>
  );

  return (
    <ThemeContextProvider>
      <Routes>
        <Route path="/about" element={<div className="w-screen min-h-screen bg-slate-900 overflow-y-auto"><AboutUs /></div>} />
        <Route path="/crm/*" element={<DashboardApp />} />
        <Route path="/dashboard/*" element={<DashboardApp />} />
        
        {/* Industry Landing Pages & SEO Verticals */}
        <Route path="/clientum-crm" element={<ClientumCrmLanding />} />
        <Route path="/tienda/:slug" element={<PublicStorefrontPage />} />
        <Route path="/industrias" element={<IndustryDirectoryPage />} />
        <Route path="/industria/:slug" element={<IndustryLandingPage />} />
        <Route path="/agro" element={<IndustryLandingPage customSlug="agro" />} />
        <Route path="/estudios-contables" element={<IndustryLandingPage customSlug="estudios-contables" />} />
        <Route path="/distribuidoras" element={<IndustryLandingPage customSlug="distribuidoras" />} />
        <Route path="/salud" element={<IndustryLandingPage customSlug="salud" />} />
        <Route path="/inmobiliaria" element={<IndustryLandingPage customSlug="inmobiliaria" />} />
        <Route path="/gastronomia" element={<IndustryLandingPage customSlug="gastronomia" />} />
        <Route path="/ecommerce" element={<IndustryLandingPage customSlug="ecommerce" />} />
        <Route path="/b2b" element={<IndustryLandingPage customSlug="b2b" />} />
        <Route path="/construccion" element={<IndustryLandingPage customSlug="construccion" />} />
        <Route path="/automotor" element={<IndustryLandingPage customSlug="automotor" />} />

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
        <Route path="/dominios" element={<PublicDomainManagerPage />} />
        <Route path="/cloudflare" element={<PublicDomainManagerPage />} />
        <Route path="*" element={publicWebsiteElement} />
      </Routes>
    </ThemeContextProvider>
  );
}
