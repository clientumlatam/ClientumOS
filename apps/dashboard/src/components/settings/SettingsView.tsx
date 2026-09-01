import React, { useState } from 'react';
import {
  Database,
  Layers,
  Plus,
  Trash2,
  Check,
  Shield,
  Users,
  Download,
  RotateCcw,
  Zap,
  Globe,
  Sliders,
  CheckCircle2,
  Sun,
  Moon,
  Palette,
  Eye,
  Sparkles,
  Monitor,
  GitBranch,
  ExternalLink,
  Code2,
  Workflow,
  Bug,
  BookOpen,
  Cloud,
} from 'lucide-react';
import { useCRM } from '@clientum/ui';
import { CustomField, Language } from '@clientum/types';
import { generateStoreSitemap } from '@clientum/types';
import { 
  DomainCloudflareManager, 
  VisualSitemapGraph, 
  PublicSiteSeoAudit, 
  SeoMetadataManager 
} from '@clientum/ui';

export const SettingsView: React.FC = () => {
  const {
    users,
    resetToDemoData,
    loadClientumLeads,
    exportOpportunitiesCSV,
    exportFullWorkspaceJSON,
    opportunities,
    companies,
    people,
    tasks,
    theme,
    setTheme,
    toggleTheme,
    language,
    setLanguage,
    t,
    showToast,
  } = useCRM();

  const [activeSubTab, setActiveSubTab] = useState<'appearance' | 'schema' | 'members' | 'integrations' | 'ecosystem' | 'data' | 'publicSeo' | 'domains' | 'seoGraph' | 'seoAudit' | 'seoManager'>('appearance');

  // Public SEO Settings State
  const [storeSlug, setStoreSlug] = useState('acme-technologies');
  const [seoTitle, setSeoTitle] = useState('Acme Technologies | Soluciones y Servicios B2B');
  const [metaDescription, setMetaDescription] = useState('Descubre nuestra oferta comercial y servicios profesionales. Compra online o contáctanos directamente.');
  const [ogImage, setOgImage] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80');
  const [keywords, setKeywords] = useState<string[]>(['b2b', 'software', 'consultoria', 'clientum']);
  const [newKeyword, setNewKeyword] = useState('');
  const [isAiOptimizingSeo, setIsAiOptimizingSeo] = useState(false);

  const handleAiOptimizeSeo = async () => {
    setIsAiOptimizingSeo(true);
    try {
      const res = await fetch('/api/ai/seo-optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeName: storeSlug.replace(/-/g, ' ').toUpperCase(),
          storeSlogan: metaDescription,
          products: [
            { id: 'p1', name: 'Licencia Enterprise CRM' },
            { id: 'p2', name: 'Bot de WhatsApp IA 24/7' },
            { id: 'p3', name: 'Consultoría Estratégica' }
          ],
          language
        })
      });
      const data = await res.json();
      if (data.seoTitle) setSeoTitle(data.seoTitle);
      if (data.metaDescription) setMetaDescription(data.metaDescription);
      if (data.ogImage) setOgImage(data.ogImage);
      if (data.keywords && Array.isArray(data.keywords)) setKeywords(data.keywords);
      showToast('¡Metadatos SEO generados y optimizados con éxito por Gemini AI!', 'success');
    } catch (err) {
      showToast('Error conectando con Gemini AI para SEO', 'error');
    } finally {
      setIsAiOptimizingSeo(false);
    }
  };

  const generatedSitemap = generateStoreSitemap(`${storeSlug}.clientum.com.ar`, [
    { id: 'p1', name: 'Licencia Enterprise CRM' },
    { id: 'p2', name: 'Bot de WhatsApp IA 24/7' },
    { id: 'p3', name: 'Consultoría Estratégica' }
  ]);

  // Custom fields state
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: 'f-1', name: 'Contract Duration (Months)', type: 'number' },
    { id: 'f-2', name: 'Lead Acquisition Source', type: 'select', options: ['Inbound Demo', 'GitHub', 'Cold Email', 'Event'] },
    { id: 'f-3', name: 'Security Review Completed', type: 'boolean' },
    { id: 'f-4', name: 'Competitor Mentioned', type: 'text' },
  ]);

  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<'text' | 'number' | 'select' | 'boolean'>('text');

  const handleAddCustomField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;

    const newField: CustomField = {
      id: 'f-' + Date.now(),
      name: newFieldName,
      type: newFieldType,
      options: newFieldType === 'select' ? ['Option 1', 'Option 2'] : undefined,
    };

    setCustomFields((prev) => [...prev, newField]);
    setNewFieldName('');
    showToast(`Added custom field "${newField.name}"`, 'success');
  };

  const handleDeleteField = (id: string) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== id));
    showToast('Custom field removed', 'info');
  };

  const handleExportAllJSON = () => {
    const fullBackup = {
      opportunities,
      companies,
      people,
      tasks,
      customFields,
      theme,
      exportedAt: new Date().toISOString(),
      version: 'clientum-crm-v1',
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `clientum_crm_workspace_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Full workspace JSON backup exported', 'success');
  };

  return (
    <div id="clientum-settings-view" className="flex-1 flex flex-col h-full bg-[#0a0c10] overflow-y-auto p-4 select-none">
      {/* Settings Header with Quick Theme Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2">
        <div>
          <h2 className="text-base font-semibold text-white">{t('settingsTitle')}</h2>
          <p className="text-xs text-slate-400">
            {t('settingsSubtitle')}
          </p>
        </div>

        {/* Header Quick Theme Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#141822] border border-[#1e2330] p-1 rounded-lg">
            <button
              id="header-theme-toggle-dark"
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark</span>
            </button>
            <button
              id="header-theme-toggle-light"
              onClick={() => setTheme('light')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                theme === 'light'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="High-Contrast Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Light</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1e2330] pb-2 mb-4 overflow-x-auto">
        <button
          id="tab-settings-appearance"
          onClick={() => setActiveSubTab('appearance')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'appearance'
              ? 'bg-[#1e2434] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          {t('appearanceTheme')}
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-400 font-mono">
            {language.toUpperCase()} • {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </button>

        <button
          id="tab-settings-schema"
          onClick={() => setActiveSubTab('schema')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'schema'
              ? 'bg-[#1e2434] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          {t('customFieldsSchema')}
        </button>

        <button
          id="tab-settings-members"
          onClick={() => setActiveSubTab('members')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'members'
              ? 'bg-[#1e2434] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          {t('teamMembers')} ({users.length})
        </button>

        <button
          id="tab-settings-integrations"
          onClick={() => setActiveSubTab('integrations')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'integrations'
              ? 'bg-[#1e2434] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          {t('integrationsApis')}
        </button>

        <button
          id="tab-settings-ecosystem"
          onClick={() => setActiveSubTab('ecosystem')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'ecosystem'
              ? 'bg-[#1e2434] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          {t('clientumRepos')}
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
            4 Repos
          </span>
        </button>

        <button
          id="tab-settings-data"
          onClick={() => setActiveSubTab('data')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'data'
              ? 'bg-[#1e2434] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          {t('dataManagement')}
        </button>

        <button
          id="tab-settings-publicSeo"
          onClick={() => setActiveSubTab('publicSeo')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'publicSeo'
              ? 'bg-[#1e2434] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Public SEO Settings
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 font-mono">
            Gemini
          </span>
        </button>

        <button
          id="tab-settings-domains"
          onClick={() => setActiveSubTab('domains')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'domains'
              ? 'bg-[#1e2434] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cloud className="w-3.5 h-3.5 text-orange-400" />
          Dominios & Cloudflare
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-orange-500/20 text-orange-300 font-mono">
            DNS/SSL
          </span>
        </button>

        <button
          id="tab-settings-seoGraph"
          onClick={() => setActiveSubTab('seoGraph')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'seoGraph'
              ? 'bg-[#1e2434] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          Sitemap Graph
        </button>

        <button
          id="tab-settings-seoAudit"
          onClick={() => setActiveSubTab('seoAudit')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'seoAudit'
              ? 'bg-[#1e2434] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-purple-400" />
          SEO Audit
        </button>

        <button
          id="tab-settings-seoManager"
          onClick={() => setActiveSubTab('seoManager')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'seoManager'
              ? 'bg-[#1e2434] text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Meta Manager
        </button>
      </div>

      {/* SUBTAB 0: APPEARANCE, THEME & LANGUAGE */}
      {activeSubTab === 'appearance' && (
        <div className="space-y-4 max-w-4xl">
          {/* Language Selector Card */}
          <div className="bg-[#12151d] border border-[#1e2330] p-5 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  {t('languageSelector')} (i18n)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Selecciona tu idioma preferido / Escolha seu idioma preferido / Select your preferred language
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              {/* English */}
              <div
                id="lang-card-en"
                onClick={() => setLanguage('en')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  language === 'en'
                    ? 'border-blue-500 bg-[#161a26] shadow-md shadow-blue-500/10'
                    : 'border-[#1e2330] bg-[#0e1118] hover:border-[#2a3348]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">🇺🇸</span>
                  {language === 'en' && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                      <Check className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-white">English</div>
                <div className="text-[11px] text-slate-400">United States / Global</div>
              </div>

              {/* Spanish */}
              <div
                id="lang-card-es"
                onClick={() => setLanguage('es')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  language === 'es'
                    ? 'border-blue-500 bg-[#161a26] shadow-md shadow-blue-500/10'
                    : 'border-[#1e2330] bg-[#0e1118] hover:border-[#2a3348]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">🇪🇸</span>
                  {language === 'es' && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                      <Check className="w-3 h-3" />
                      Activo
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-white">Español</div>
                <div className="text-[11px] text-slate-400">España / Latinoamérica</div>
              </div>

              {/* Portuguese */}
              <div
                id="lang-card-pt"
                onClick={() => setLanguage('pt')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  language === 'pt'
                    ? 'border-blue-500 bg-[#161a26] shadow-md shadow-blue-500/10'
                    : 'border-[#1e2330] bg-[#0e1118] hover:border-[#2a3348]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">🇧🇷</span>
                  {language === 'pt' && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                      <Check className="w-3 h-3" />
                      Ativo
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-white">Português</div>
                <div className="text-[11px] text-slate-400">Brasil / Portugal</div>
              </div>
            </div>
          </div>

          {/* Main Theme Selection Card */}
          <div className="bg-[#12151d] border border-[#1e2330] p-5 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-blue-400" />
                  {t('visualTheme')}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t('visualThemeDesc')}
                </p>
              </div>

              {/* Interactive toggle switch */}
              <button
                id="theme-switch-btn"
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181d29] hover:bg-[#202738] text-xs font-medium text-white border border-[#2b354a] transition-all cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('switchTheme')} (Light)</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{t('switchTheme')} (Dark)</span>
                  </>
                )}
              </button>
            </div>

            {/* Visual Theme Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Option 1: Default Dark (Clientum Obsidian) */}
              <div
                id="theme-card-dark"
                onClick={() => setTheme('dark')}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'border-blue-500 bg-[#161a26] shadow-lg shadow-blue-500/10'
                    : 'border-[#1e2330] bg-[#0e1118] hover:border-[#2a3348]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0a0c10] border border-[#1e2434] flex items-center justify-center text-blue-400">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Default Dark Mode</h4>
                      <span className="text-[11px] text-slate-400 font-mono">Clientum Obsidian</span>
                    </div>
                  </div>

                  {theme === 'dark' && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                      <Check className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>

                {/* Mockup Preview - Dark */}
                <div className="rounded-lg bg-[#0a0c10] p-3 border border-[#1e2434] space-y-2 mb-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-[#181d28]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-white font-medium">Acme Enterprise</span>
                    </div>
                    <span className="text-emerald-400 font-mono font-semibold">$120,000</span>
                  </div>
                  <div className="flex items-center gap-2 text-[9px]">
                    <span className="px-1.5 py-0.5 rounded bg-[#181d29] text-blue-300 font-mono">
                      Negotiation
                    </span>
                    <span className="text-slate-400">Close: Dec 15</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    Low-light & OLED optimized
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">Dark #0A0C10</span>
                </div>
              </div>

              {/* Option 2: High-Contrast Light (Clientum Clarity) */}
              <div
                id="theme-card-light"
                onClick={() => setTheme('light')}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  theme === 'light'
                    ? 'border-blue-500 bg-[#f1f5f9] shadow-lg shadow-blue-500/10'
                    : 'border-[#1e2330] bg-[#141822] hover:border-[#2a3348]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-amber-500 shadow-sm">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900">High-Contrast Light Mode</h4>
                      <span className="text-[11px] text-slate-700 font-mono font-medium">Clientum Clarity (WCAG AAA)</span>
                    </div>
                  </div>

                  {theme === 'light' && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-300">
                      <Check className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>

                {/* Mockup Preview - High Contrast Light */}
                <div className="rounded-lg bg-white p-3 border border-slate-300 space-y-2 mb-3 shadow-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-700 pb-1 border-b border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="text-slate-900 font-bold">Acme Enterprise</span>
                    </div>
                    <span className="text-emerald-700 font-mono font-bold">$120,000</span>
                  </div>
                  <div className="flex items-center gap-2 text-[9px]">
                    <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 font-mono font-semibold border border-blue-300">
                      Negotiation
                    </span>
                    <span className="text-slate-700 font-medium">Close: Dec 15</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-700 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Ultra-readable high contrast
                  </span>
                  <span className="font-mono text-[10px] text-slate-600">Light #F8FAFC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Accessibility & Readability Details */}
          <div className="bg-[#12151d] border border-[#1e2330] p-4 rounded-xl">
            <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              Accessibility & Display Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="p-3 rounded-lg bg-[#141822] border border-[#1e2330]">
                <div className="font-semibold text-slate-200 mb-1">Contrast Ratio</div>
                <p className="text-[11px] text-slate-400">
                  Meets WCAG 2.1 AAA contrast benchmarks with 7:1+ text-to-background ratio in light mode.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#141822] border border-[#1e2330]">
                <div className="font-semibold text-slate-200 mb-1">Crisp Borders</div>
                <p className="text-[11px] text-slate-400">
                  Clear visual delineations on Kanban cards, table headers, and form inputs for cognitive ease.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#141822] border border-[#1e2330]">
                <div className="font-semibold text-slate-200 mb-1">Local Persistence</div>
                <p className="text-[11px] text-slate-400">
                  Your theme preference is automatically remembered and restored upon every session.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 1: CUSTOM FIELDS & SCHEMA */}
      {activeSubTab === 'schema' && (
        <div className="space-y-4 max-w-3xl">
          {/* Add Field Card */}
          <div className="bg-[#12151d] border border-[#1e2330] p-4 rounded-xl">
            <h3 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-400" />
              Define New Custom Field
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Extend standard CRM objects (Deals, Accounts, Contacts) with custom properties.
            </p>

            <form onSubmit={handleAddCustomField} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                required
                placeholder="Field name (e.g. Renewal Probability, Slack Channel)..."
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                className="flex-1 bg-[#181d29] text-xs text-white px-3 py-2 rounded-lg border border-[#273044] focus:outline-none focus:border-blue-500"
              />

              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value as any)}
                className="bg-[#181d29] text-xs text-white px-3 py-2 rounded-lg border border-[#273044] focus:outline-none focus:border-blue-500"
              >
                <option value="text">Text (String)</option>
                <option value="number">Number</option>
                <option value="select">Dropdown Select</option>
                <option value="boolean">Boolean Flag</option>
              </select>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
              >
                Add Field
              </button>
            </form>
          </div>

          {/* Existing Fields List */}
          <div className="bg-[#12151d] border border-[#1e2330] rounded-xl overflow-hidden">
            <div className="p-3 bg-[#141822] border-b border-[#1e2330] text-xs font-semibold text-white">
              Active Custom Schema Properties
            </div>

            <div className="divide-y divide-[#181d28]">
              {customFields.map((field) => (
                <div
                  key={field.id}
                  className="p-3.5 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <div>
                      <div className="font-semibold text-slate-100">{field.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Type: <span className="text-blue-400">{field.type}</span>
                        {field.options && ` • Options: [${field.options.join(', ')}]`}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteField(field.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete field"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: MEMBERS */}
      {activeSubTab === 'members' && (
        <div className="bg-[#12151d] border border-[#1e2330] rounded-xl max-w-3xl overflow-hidden">
          <div className="p-3 bg-[#141822] border-b border-[#1e2330] flex items-center justify-between text-xs font-semibold text-white">
            <span>Workspace Team Members</span>
            <span className="text-[11px] text-slate-400 font-normal">Active Seats: 4 of 10</span>
          </div>

          <div className="divide-y divide-[#181d28]">
            {users.map((u) => (
              <div key={u.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#2b3345]"
                  />
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      {u.name}
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1f2536] text-blue-300 font-mono">
                        {u.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: INTEGRATIONS */}
      {activeSubTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-4xl">
          {[
            {
              name: 'PostgreSQL Direct Sync',
              desc: 'Bidirectional sync with production database tables and foreign keys.',
              status: 'Connected',
              badge: 'Real-time',
            },
            {
              name: 'Google Workspace & Gmail',
              desc: 'Automatic email logging and Google Calendar meeting sync.',
              status: 'Active',
              badge: 'OAuth2',
            },
            {
              name: 'Slack Deal Notifications',
              desc: 'Broadcast deal won celebrations and high-priority lead alerts to #sales.',
              status: 'Active',
              badge: 'Webhooks',
            },
            {
              name: 'Resend Transactional Email',
              desc: 'High deliverability transactional and sequence email infrastructure.',
              status: 'Ready',
              badge: 'API v1',
            },
          ].map((int, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[#12151d] border border-[#1e2330] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-xs text-white">{int.name}</h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    {int.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{int.desc}</p>
              </div>
              <div className="pt-2 border-t border-[#181d28] flex items-center justify-between text-[11px] text-slate-400">
                <span>Protocol: {int.badge}</span>
                <button
                  onClick={() => showToast(`Sync status refreshed for ${int.name}`, 'info')}
                  className="text-blue-400 hover:underline cursor-pointer"
                >
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB: CLIENTUM REPOSITORIES */}
      {activeSubTab === 'ecosystem' && (
        <div className="space-y-4 max-w-4xl">
          {/* Header Banner */}
          <div className="bg-[#12151d] border border-[#1e2330] p-4 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-semibold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  Official Clientum Open Source Repositories
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Clientum is the ultimate CRM & growth automation platform built with TypeScript, React, Vite, and PostgreSQL.
                </p>
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181d29] hover:bg-[#202738] text-white border border-[#273044] text-xs font-medium transition-colors shrink-0"
              >
                <span>Browse @clientum Org</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* 4 Official Repositories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Repo 1: clientum */}
            <div className="p-4 rounded-xl bg-[#12151d] border border-[#1e2330] flex flex-col justify-between hover:border-[#2b354a] transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">
                      CL
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-white flex items-center gap-1.5">
                        clientumhq/clientum
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                          Primary
                        </span>
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">Core CRM Application</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                    AGPL-3.0
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Building a modern enterprise solution. An open-source, flexible, and powerful CRM crafted with Next-gen UX and extensible metadata schemas.
                </p>

                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">TypeScript</span>
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">NestJS</span>
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">React + Vite</span>
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">PostgreSQL</span>
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">GraphQL</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#181d28] flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <GitBranch className="w-3 h-3 text-blue-400" />
                  main branch
                </span>
                <a
                  href="https://github.com/clientumhq/clientum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium"
                >
                  <span>View Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Repo 2: favicon */}
            <div className="p-4 rounded-xl bg-[#12151d] border border-[#1e2330] flex flex-col justify-between hover:border-[#2b354a] transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-white flex items-center gap-1.5">
                        clientumhq/favicon
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                          Assets
                        </span>
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">Favicon & Visual Brand Identity</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono border border-blue-500/20">
                    Public
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Repository hosting Clientum&apos;s modern favicon sets, SVG brand assets, high-resolution logos, app icon variations, and company icon resolution tooling.
                </p>

                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">SVG Vectors</span>
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">Brand Assets</span>
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">Favicon Engine</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#181d28] flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <GitBranch className="w-3 h-3 text-indigo-400" />
                  main branch
                </span>
                <a
                  href="https://github.com/clientumhq/favicon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium"
                >
                  <span>View Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Repo 3: ci-public */}
            <div className="p-4 rounded-xl bg-[#12151d] border border-[#1e2330] flex flex-col justify-between hover:border-[#2b354a] transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Workflow className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-white flex items-center gap-1.5">
                        clientumhq/ci-public
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                          DevOps
                        </span>
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">Continuous Integration Pipelines</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                    CI / CD
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Public reusable GitHub Actions, CI validation scripts, automated PR benchmarks, multi-architecture docker builds, and security scanning configurations.
                </p>

                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">GitHub Actions</span>
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">Docker BuildKit</span>
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">Playwright E2E</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#181d28] flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <GitBranch className="w-3 h-3 text-amber-400" />
                  main branch
                </span>
                <a
                  href="https://github.com/clientumhq/ci-public"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium"
                >
                  <span>View Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Repo 4: core-team-issues */}
            <div className="p-4 rounded-xl bg-[#12151d] border border-[#1e2330] flex flex-col justify-between hover:border-[#2b354a] transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Bug className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-white flex items-center gap-1.5">
                        clientumhq/core-team-issues
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                          Roadmap
                        </span>
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">Core Team Sprint Tracker</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono border border-purple-500/20">
                    Tracker
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Tracking repository for Clientum&apos;s core development team milestones, sprint retrospectives, roadmap issues, architectural RFCs, and release planning.
                </p>

                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">Sprint Tracking</span>
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">Architecture RFCs</span>
                  <span className="px-2 py-0.5 rounded bg-[#181d28] text-slate-300">Release Planning</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#181d28] flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <GitBranch className="w-3 h-3 text-purple-400" />
                  main branch
                </span>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium"
                >
                  <span>View Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Technical Specs */}
          <div className="bg-[#12151d] border border-[#1e2330] p-4 rounded-xl">
            <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Clientum Architecture & Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="p-3 rounded-lg bg-[#141822] border border-[#1e2330]">
                <div className="font-semibold text-slate-200 mb-1">Standard & Custom Objects</div>
                <p className="text-[11px] text-slate-400">
                  Opportunities, Companies, People, Tasks, and Activities dynamically mapped through metadata schema tables.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#141822] border border-[#1e2330]">
                <div className="font-semibold text-slate-200 mb-1">Dual-View Workspace</div>
                <p className="text-[11px] text-slate-400">
                  Interactive drag-and-drop Kanban pipeline paired with keyboard-accessible inline editable tabular views.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#141822] border border-[#1e2330]">
                <div className="font-semibold text-slate-200 mb-1">Modern AI Assistant</div>
                <p className="text-[11px] text-slate-400">
                  Natural language deal copilot with automated qualification scoring, next-step recommendations, and email draft generation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: DATA MANAGEMENT */}
      {activeSubTab === 'data' && (
        <div className="bg-[#12151d] border border-[#1e2330] rounded-xl p-5 max-w-3xl space-y-5 text-xs">
          {/* Clientum B2B Leads Integration */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/40 to-indigo-950/30 border border-blue-500/20 shadow-lg shadow-blue-500/5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20 mb-2">
                  Dataset de Leads 🇦🇷
                </span>
                <h3 className="font-bold text-white text-sm">Cargar Leads de Clientum B2B</h3>
                <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                  Carga la base de datos de prospectos e industrias plásticas de Argentina (ABEPOL S.R.L., ACHA PLAST S.A., Verion ICSA, Dr. Lantos, etc.) directamente en tu pipeline activo de Clientum OS.
                </p>
              </div>
              <Database className="w-8 h-8 text-blue-400 shrink-0 opacity-80" />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-blue-500/15">
              <div className="text-[11px] text-slate-400">
                <strong className="text-white">Leads Disponibles:</strong> +3,740 empresas industriales segmentadas por provincia y email verificado.
              </div>
              <button
                onClick={loadClientumLeads}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md transition-all shrink-0 cursor-pointer text-xs"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Importar Base Clientum</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white text-xs mb-1">Backup & Migration</h3>
            <p className="text-slate-400 text-xs">
              Export your CRM state to JSON or CSV for reporting, data warehousing, or backup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportFullWorkspaceJSON}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Export Full CRM & ERP Workspace (JSON)</span>
            </button>

            <button
              onClick={exportOpportunitiesCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#181e2b] hover:bg-[#202738] text-white border border-[#2b354a] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export Deals (CSV)</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#1e2330]">
            <h3 className="font-semibold text-rose-400 text-xs mb-1">Danger Zone</h3>
            <p className="text-slate-400 text-xs mb-3">
              Reset your entire workspace database back to standard sample seed data.
            </p>
            <button
              onClick={resetToDemoData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Database to Demo State</span>
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB: PUBLIC SEO SETTINGS & SITEMAP */}
      {activeSubTab === 'publicSeo' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-[#12151d] border border-[#1e2330] p-6 rounded-2xl space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2330]">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>Public SEO Settings & Gemini Optimization</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Configura los metadatos de Google, imágenes OpenGraph para redes sociales y gestiona el sitemap.xml automático de tu tienda pública.
                </p>
              </div>
              <button
                onClick={handleAiOptimizeSeo}
                disabled={isAiOptimizingSeo}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/25 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAiOptimizingSeo ? 'Optimizando con Gemini...' : 'Optimizar SEO con IA'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">SEO Title (Título de Página)</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#171c29] border border-[#232d44] rounded-xl text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                  <span className="text-[10px] text-slate-500">{seoTitle.length}/60 caracteres recomendados</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Meta Description (Descripción en Buscadores)</label>
                  <textarea
                    rows={3}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#171c29] border border-[#232d44] rounded-xl text-white text-xs focus:outline-none focus:border-purple-500 resize-none"
                  />
                  <span className="text-[10px] text-slate-500">{metaDescription.length}/160 caracteres recomendados</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Social Sharing Image (OpenGraph URL)</label>
                  <input
                    type="text"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#171c29] border border-[#232d44] rounded-xl text-white text-xs focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Keyword Tags (Palabras Clave)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nueva keyword..."
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newKeyword.trim()) {
                          e.preventDefault();
                          setKeywords([...keywords, newKeyword.trim()]);
                          setNewKeyword('');
                        }
                      }}
                      className="flex-1 px-3 py-2 bg-[#171c29] border border-[#232d44] rounded-xl text-white text-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newKeyword.trim()) {
                          setKeywords([...keywords, newKeyword.trim()]);
                          setNewKeyword('');
                        }
                      }}
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Añadir
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {keywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[11px] font-medium flex items-center gap-1.5">
                        {kw}
                        <button
                          onClick={() => setKeywords(keywords.filter((_, idx) => idx !== i))}
                          className="hover:text-rose-400 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Preview & OpenGraph Card */}
              <div className="space-y-4 bg-[#171c29] p-5 rounded-2xl border border-[#232d44] flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Vista Previa Social (OpenGraph / Twitter Card)</div>
                  
                  <div className="bg-[#12151d] border border-slate-700/80 rounded-xl overflow-hidden shadow-lg">
                    <div className="h-32 bg-slate-800 overflow-hidden relative">
                      <img src={ogImage} alt="OG Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600'; }} />
                    </div>
                    <div className="p-3 space-y-1">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wide font-mono">clientum.com.ar/{storeSlug}</div>
                      <h4 className="font-bold text-white text-xs line-clamp-1">{seoTitle}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{metaDescription}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      showToast('¡Configuración SEO guardada y aplicada al subdominio!', 'success');
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
                  >
                    Guardar Cambios SEO
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Automatic Sitemap.xml Generator & Viewer */}
          <div className="bg-[#12151d] border border-[#1e2330] p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <span>Sitemap.xml Automático (Indexación Google)</span>
                </h3>
                <p className="text-xs text-slate-400">Generado dinámicamente con todas las páginas de productos y servicios de tu tienda.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedSitemap);
                    showToast('¡Sitemap.xml copiado al portapapeles!', 'success');
                  }}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 cursor-pointer"
                >
                  Copiar Sitemap
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([generatedSitemap], { type: 'application/xml' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'sitemap.xml';
                    a.click();
                    showToast('¡sitemap.xml descargado con éxito!', 'success');
                  }}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer shadow"
                >
                  Descargar sitemap.xml
                </button>
              </div>
            </div>

            <pre className="text-[11px] font-mono text-emerald-400 bg-[#171c29] p-4 rounded-xl border border-[#232d44] h-48 overflow-y-auto">
              {generatedSitemap}
            </pre>
          </div>
        </div>
      )}

      {/* SUBTAB DOMAINS & CLOUDFLARE MANAGEMENT */}
      {activeSubTab === 'domains' && (
        <DomainCloudflareManager onToast={showToast} titlePrefix="CRM Enterprise" />
      )}

      {/* SUBTAB SEO GRAPH */}
      {activeSubTab === 'seoGraph' && (
        <VisualSitemapGraph onToast={showToast} />
      )}

      {/* SUBTAB SEO AUDIT */}
      {activeSubTab === 'seoAudit' && (
        <PublicSiteSeoAudit onToast={showToast} />
      )}

      {/* SUBTAB SEO MANAGER */}
      {activeSubTab === 'seoManager' && (
        <SeoMetadataManager onToast={showToast} />
      )}
    </div>
  );
};
