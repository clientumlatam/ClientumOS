import React, { useState, useEffect } from 'react';
import { PublicNavbar } from './PublicNavbar';
import { PublicFooter } from './PublicFooter';
import { PublicHome } from './PublicHome';
import { PublicProductPage } from './PublicProductPage';
import { PublicCrmLanding } from './PublicCrmLanding';
import { PublicPricingPage } from './PublicPricingPage';
import { PublicCaseStudiesPage } from './PublicCaseStudiesPage';
import { PublicServicesPage } from './PublicServicesPage';
import { PublicResourcesPage } from './PublicResourcesPage';
import { PublicCompanyPage } from './PublicCompanyPage';
import { PublicContactPage } from './PublicContactPage';
import { PublicLegalPage } from './PublicLegalPage';
import { IndustryLandingPage } from './IndustryLandingPage';
import { TiendaDigitalView } from './TiendaDigitalView';
import { PublicDomainManagerPage } from '../power/PublicDomainManagerPage';
import { CampusLMSView } from '../power/CampusLMSView';
import { QuoteWizardModal } from './QuoteWizardModal';
import { WhatsAppSimulatorModal } from './WhatsAppSimulatorModal';
import { ExpressAuditModal } from './ExpressAuditModal';
import { PublicSessionBanner } from './PublicSessionBanner';
import { PublicRoutePath } from './publicRoutes';

export const PublicSite: React.FC = () => {
  // Support both direct public URLs and the hash-based navigation used by
  // the existing navbar.
  const [currentPath, setCurrentPath] = useState<PublicRoutePath>(() => {
    const hashPath = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    if (hashPath.startsWith('/')) return hashPath as PublicRoutePath;

    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
    return (pathname || '/') as PublicRoutePath;
  });
  const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');

  // Modal states
  const [isQuoteWizardOpen, setIsQuoteWizardOpen] = useState(false);
  const [isWhatsAppSimOpen, setIsWhatsAppSimOpen] = useState(false);
  const [isExpressAuditOpen, setIsExpressAuditOpen] = useState(false);

    // Sync hash and direct public URL changes.
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.replace('#', '');
      const nextPath = hash.startsWith('/') ? hash : window.location.pathname;
      setCurrentPath((nextPath || '/') as PublicRoutePath);
    };
    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const handleNavigate = (path: PublicRoutePath) => {
    setCurrentPath(path);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine which industry slug to pass to IndustryLandingPage
  const getIndustrySlug = () => {
    if (currentPath.startsWith('/industrias/')) {
      return currentPath.replace('/industrias/', '');
    }
    return 'agro';
  };

  // Render current view
  const renderCurrentView = () => {
    // 1. Home
    if (currentPath === '/') {
      return (
        <PublicHome
          onNavigate={handleNavigate}
          onOpenWizard={() => setIsQuoteWizardOpen(true)}
          onOpenSimulator={() => setIsWhatsAppSimOpen(true)}
          onOpenAudit={() => setIsExpressAuditOpen(true)}
        />
      );
    }

    // 2. Product Suite & Sub-modules
    if (currentPath.startsWith('/producto')) {
      return (
        <PublicProductPage
          currentSubPath={currentPath}
          onNavigate={handleNavigate}
        />
      );
    }

    // 3. CRM Dedicated Landing
    if (currentPath === '/clientum-crm') {
      return <PublicCrmLanding onNavigate={handleNavigate} />;
    }

    // 4. Industries & Verticals
    if (currentPath.startsWith('/industrias')) {
      return (
        <IndustryLandingPage
          initialSlug={getIndustrySlug()}
          onBackToHome={() => handleNavigate('/')}
          onOpenWizard={() => setIsQuoteWizardOpen(true)}
          onOpenSimulator={() => setIsWhatsAppSimOpen(true)}
        />
      );
    }

    // 5. Pricing & Plans
    if (currentPath === '/precios' || currentPath === '/planes') {
      return (
        <PublicPricingPage
          currency={currency}
          onToggleCurrency={() => setCurrency((c) => (c === 'ARS' ? 'USD' : 'ARS'))}
          onNavigate={handleNavigate}
          onOpenWizard={() => setIsQuoteWizardOpen(true)}
        />
      );
    }

    // 6. Professional Services
    if (currentPath === '/servicios') {
      return (
        <PublicServicesPage
          onNavigate={handleNavigate}
          onOpenWizard={() => setIsQuoteWizardOpen(true)}
        />
      );
    }

    // 7. Case Studies
    if (currentPath === '/casos' || currentPath === '/casos-de-exito') {
      return <PublicCaseStudiesPage onNavigate={handleNavigate} />;
    }

    // 8. Resources & Blog
    if (currentPath === '/recursos' || currentPath === '/blog') {
      return <PublicResourcesPage onNavigate={handleNavigate} />;
    }

    // 9. Campus LMS
    if (currentPath === '/academia') {
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-4">
            <button
              onClick={() => handleNavigate('/')}
              className="text-xs text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              ← Volver al Portal Principal
            </button>
          </div>
          <CampusLMSView />
        </div>
      );
    }

    // 10. DNS & Domains Tool
    if (currentPath === '/dominios') {
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-4">
            <button
              onClick={() => handleNavigate('/')}
              className="text-xs text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              ← Volver al Portal Principal
            </button>
          </div>
          <PublicDomainManagerPage />
        </div>
      );
    }

    // 11. Company & About Us
    if (currentPath === '/about' || currentPath === '/nosotros') {
      return <PublicCompanyPage onNavigate={handleNavigate} />;
    }

    // 12. Contact & Demo Request
    if (currentPath === '/contacto') {
      return <PublicContactPage onNavigate={handleNavigate} />;
    }

    // Keep the canonical demo alias useful for direct links and bookmarks.
    if (currentPath === '/demo') {
      return <PublicContactPage onNavigate={handleNavigate} />;
    }

    // 13. Legal & Privacy & Terms
    if (currentPath === '/legal' || currentPath === '/terminos' || currentPath === '/privacidad') {
      const tab = currentPath === '/privacidad' ? 'privacy' : currentPath === '/terminos' ? 'sla' : 'terms';
      return <PublicLegalPage initialTab={tab} onNavigate={handleNavigate} />;
    }

    // 14. Demo Digital Store
    if (currentPath.startsWith('/tienda')) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-4">
            <button
              onClick={() => handleNavigate('/')}
              className="text-xs text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              ← Volver al Portal Principal
            </button>
          </div>
          <TiendaDigitalView />
        </div>
      );
    }

    // Fallback to Home
    return (
      <PublicHome
        onNavigate={handleNavigate}
        onOpenWizard={() => setIsQuoteWizardOpen(true)}
        onOpenSimulator={() => setIsWhatsAppSimOpen(true)}
        onOpenAudit={() => setIsExpressAuditOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Global Modular Navbar */}
      <PublicNavbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'ARS' ? 'USD' : 'ARS'))}
        onOpenWizard={() => setIsQuoteWizardOpen(true)}
        onOpenSimulator={() => setIsWhatsAppSimOpen(true)}
        onOpenAudit={() => setIsExpressAuditOpen(true)}
      />
      <PublicSessionBanner />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* 3. Global Modular Footer with Full Sitemap */}
      <PublicFooter onNavigate={handleNavigate} />

      {/* 4. Interactive Floating Modals */}
      <QuoteWizardModal
        isOpen={isQuoteWizardOpen}
        onClose={() => setIsQuoteWizardOpen(false)}
      />
      <WhatsAppSimulatorModal
        isOpen={isWhatsAppSimOpen}
        onClose={() => setIsWhatsAppSimOpen(false)}
      />
      <ExpressAuditModal
        isOpen={isExpressAuditOpen}
        onClose={() => setIsExpressAuditOpen(false)}
      />

    </div>
  );
};
