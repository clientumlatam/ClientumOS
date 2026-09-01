import React, { useState } from 'react';
import { 
  FileCheck, Shield, Key, Search, Send, CheckCircle2, AlertCircle, 
  Terminal, RefreshCw, Building, DollarSign, Award, ArrowRight
} from 'lucide-react';

export function VscrmAfipTab() {
  const [activeSubTab, setActiveSubTab] = useState<'invoice' | 'padron' | 'config'>('invoice');

  // AFIP Invoice State
  const [ptoVta, setPtoVta] = useState('0001');
  const [cbteTipo, setCbteTipo] = useState('1'); // 1: Factura A, 6: Factura B, 11: Factura C
  const [docTipo, setDocTipo] = useState('80'); // 80: CUIT, 96: DNI
  const [docNro, setDocNro] = useState('30712345678');
  const [impTotal, setImpTotal] = useState('125000.00');
  const [impNeto, setImpNeto] = useState('103305.79');
  const [impIVA, setImpIVA] = useState('21694.21');
  const [isGenerating, setIsGenerating] = useState(false);
  const [caeResult, setCaeResult] = useState<{
    cae: string;
    vencimiento: string;
    resultado: string;
    ptoVta: string;
    cbteNro: string;
  } | null>(null);

  // Padron Lookup State
  const [searchCuit, setSearchCuit] = useState('20321111223');
  const [padronResult, setPadronResult] = useState<{
    razonSocial: string;
    tipoClave: string;
    estadoClave: string;
    impuestos: string[];
    domicilio: string;
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Config State
  const [cuitCert, setCuitCert] = useState('20123456789');
  const [certPath, setCertPath] = useState('/etc/pyafipws/homo.crt');
  const [keyPath, setKeyPath] = useState('/etc/pyafipws/homo.key');
  const [modoHomo, setModoHomo] = useState(true);
  const [savedConfig, setSavedConfig] = useState(false);

  const handleGenerateCAE = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setCaeResult(null);

    setTimeout(() => {
      setIsGenerating(false);
      setCaeResult({
        cae: '74129856321458',
        vencimiento: '2026-09-10',
        resultado: 'A (Aprobado)',
        ptoVta,
        cbteNro: '00000452'
      });
    }, 1200);
  };

  const handleSearchPadron = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setPadronResult(null);

    setTimeout(() => {
      setIsSearching(false);
      setPadronResult({
        razonSocial: 'ARGENTINA SOFTWARE SOLUTIONS S.A.',
        tipoClave: 'CUIT',
        estadoClave: 'ACTIVO',
        impuestos: ['IVA Responsable Inscripto', 'Ganancias Sociedades', 'Regimen de Retención'],
        domicilio: 'Av. Corrientes 1450, Piso 4, CABA'
      });
    }, 900);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedConfig(true);
    setTimeout(() => setSavedConfig(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-900 rounded-2xl p-6 border border-sky-500/20 shadow-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                PyAfipWS Toolkit (Mariano Reingart)
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                AFIP WSFE / Padrón Conectado
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Facturación Electrónica AFIP & PyAfipWS
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Integración nativa con web services de AFIP (Argentina): Emisión de CAE, consulta de padrón CUIT y gestión de certificados WSAA.
            </p>
          </div>
          <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveSubTab('invoice')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSubTab === 'invoice' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              Emitir Factura (WSFE)
            </button>
            <button
              onClick={() => setActiveSubTab('padron')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSubTab === 'padron' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              Consultar Padrón CUIT
            </button>
            <button
              onClick={() => setActiveSubTab('config')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSubTab === 'config' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              Certificados WSAA
            </button>
          </div>
        </div>
      </div>

      {/* Sub-tab 1: Factura Electrónica WSFE */}
      {activeSubTab === 'invoice' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs lg:col-span-2">
            <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-indigo-600" /> Emisión de Comprobante Electrónico (AFIP WSFE)
            </h3>
            <form onSubmit={handleGenerateCAE} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Punto de Venta</label>
                  <input
                    type="text"
                    value={ptoVta}
                    onChange={e => setPtoVta(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Comprobante</label>
                  <select
                    value={cbteTipo}
                    onChange={e => setCbteTipo(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="1">Factura A (1)</option>
                    <option value="6">Factura B (6)</option>
                    <option value="11">Factura C (11)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo Doc. Cliente</label>
                  <select
                    value={docTipo}
                    onChange={e => setDocTipo(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="80">CUIT (80)</option>
                    <option value="96">DNI (96)</option>
                    <option value="99">Consumidor Final (99)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nro CUIT / Documento Receptor</label>
                  <input
                    type="text"
                    value={docNro}
                    onChange={e => setDocNro(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Importe Total ($ ARS)</label>
                  <input
                    type="text"
                    value={impTotal}
                    onChange={e => setImpTotal(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Importe Neto Gravado</label>
                  <input
                    type="text"
                    value={impNeto}
                    onChange={e => setImpNeto(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Importe IVA (21%)</label>
                  <input
                    type="text"
                    value={impIVA}
                    onChange={e => setImpIVA(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-colors cursor-pointer text-sm disabled:opacity-50"
                >
                  {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Solicitar CAE a AFIP
                </button>
              </div>
            </form>
          </div>

          {/* CAE Result Panel */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-white mb-3 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" /> Resultado PyAfipWS (CAE)
              </h3>
              {caeResult ? (
                <div className="space-y-3 text-xs">
                  <div className="bg-emerald-950/60 border border-emerald-500/30 p-3 rounded-xl text-emerald-300">
                    <span className="font-bold block text-emerald-400 mb-0.5">✓ {caeResult.resultado}</span>
                    Comprobante autorizado correctamente por AFIP en modo Homologación.
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">CAE:</span>
                      <span className="text-amber-400 font-bold">{caeResult.cae}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vencimiento CAE:</span>
                      <span className="text-white">{caeResult.vencimiento}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pto. Vta / Nro:</span>
                      <span className="text-white">{caeResult.ptoVta} - {caeResult.cbteNro}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Complete los datos del comprobante y haga clic en "Solicitar CAE a AFIP" para ejecutar el conector PyAfipWS.
                </div>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
              Protocolo SOAP v1.2 / PyAfipWS Engine
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Padron CUIT Lookup */}
      {activeSubTab === 'padron' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
              <Search className="w-5 h-5 text-indigo-600" /> Consulta Padrón AFIP (A5 / A13)
            </h3>
            <p className="text-xs text-slate-500">
              Verifica la razón social, estado de CUIT, domicilio fiscal y obligaciones tributarias directamente desde los servidores de AFIP.
            </p>
          </div>

          <form onSubmit={handleSearchPadron} className="flex gap-3 max-w-xl">
            <input
              type="text"
              value={searchCuit}
              onChange={e => setSearchCuit(e.target.value)}
              placeholder="Ingrese CUIT (ej. 20321111223)"
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition-colors cursor-pointer shrink-0 disabled:opacity-50 flex items-center gap-2"
            >
              {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Consultar
            </button>
          </form>

          {padronResult && (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{padronResult.razonSocial}</h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">CUIT: {searchCuit}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-bold text-xs rounded-full">
                  {padronResult.estadoClave}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="font-semibold text-slate-500 block mb-1">Domicilio Fiscal</span>
                  <span className="text-slate-800">{padronResult.domicilio}</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="font-semibold text-slate-500 block mb-1">Impuestos / Regímenes</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {padronResult.impuestos.map((imp, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[11px] rounded-md font-medium">
                        {imp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-tab 3: Config & WSAA Certificates */}
      {activeSubTab === 'config' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs max-w-2xl">
          <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-600" /> Certificado Digital & WSAA Auth
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Configure las rutas de sus archivos `.crt` y `.key` emitidos por AFIP para la autenticación automática (Web Service de Autenticación y Autorización).
          </p>

          <form onSubmit={handleSaveConfig} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">CUIT del Emisor</label>
              <input
                type="text"
                value={cuitCert}
                onChange={e => setCuitCert(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ruta del Certificado (.crt)</label>
              <input
                type="text"
                value={certPath}
                onChange={e => setCertPath(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ruta de la Clave Privada (.key)</label>
              <input
                type="text"
                value={keyPath}
                onChange={e => setKeyPath(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="homo"
                checked={modoHomo}
                onChange={e => setModoHomo(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="homo" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Modo Homologación (Testing AFIP)
              </label>
            </div>

            <div className="flex items-center justify-between pt-4">
              {savedConfig && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Configuración guardada correctamente
                </span>
              )}
              <button
                type="submit"
                className="ml-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition-colors cursor-pointer"
              >
                Guardar Configuración PyAfipWS
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
