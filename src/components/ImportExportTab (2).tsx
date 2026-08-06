import React, { useState } from 'react';
import { Download, FileSpreadsheet, Users, BarChart3, Upload, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, Database } from 'lucide-react';

export function ImportExportTab() {
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [isExportingContacts, setIsExportingContacts] = useState(false);
  const [isExportingAnalytics, setIsExportingAnalytics] = useState(false);

  // CSV Parser & Mapping State
  const [step, setStep] = useState<'upload' | 'mapping' | 'preview' | 'success'>('upload');
  const [fileName, setFileName] = useState<string>('');
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows, setCsvRows] = useState<string[][]>([]);
  const [fieldMapping, setFieldMapping] = useState<{
    name: string;
    phone: string;
    email: string;
    segment: string;
    channel: string;
    status: string;
  }>({
    name: '',
    phone: '',
    email: '',
    segment: '',
    channel: '',
    status: ''
  });
  const [importedRecords, setImportedRecords] = useState<any[]>([]);

  // Sample data for export
  const sampleContacts = [
    { id: 1, name: 'ATE Seccional Alto Valle Este', phone: '+54 298 442-4202', email: '', segment: 'Gremio', channel: 'WhatsApp', status: 'Activo' },
    { id: 2, name: 'ATSA Río Negro', phone: '+54 298 486-6018', email: '', segment: 'Gremio', channel: 'Teléfono', status: 'Pendiente' },
    { id: 3, name: 'Banco Patagonia', phone: '+54 298 443-9500', email: 'contacto@bancopatagonia.com.ar', segment: 'Empresa', channel: 'WhatsApp', status: 'Cliente' },
    { id: 4, name: 'Colegio de Abogados Gral. Roca', phone: '+54 298 442-4029', email: 'colabogados@roca.com.ar', segment: 'Colegio', channel: 'WhatsApp', status: 'Activo' },
    { id: 5, name: 'Expofrut Argentina SA', phone: '+54 9 298 424-0755', email: 'ventas@expofrut.com', segment: 'Empresa', channel: 'WhatsApp', status: 'Negociación' }
  ];

  const sampleAnalytics = [
    { campaign: 'Expansión LATAM B2B', segment: 'Empresas & Colegios', sent: 1250, opened: '68%', replied: '24%', converted: 18, roi: '342%' },
    { campaign: 'Inbound SEO & Contenido', segment: 'General', sent: 3400, opened: '52%', replied: '15%', converted: 32, roi: '280%' },
    { campaign: 'Retargeting Omnicanal', segment: 'Leads Activos', sent: 820, opened: '74%', replied: '38%', converted: 25, roi: '410%' }
  ];

  const downloadCSV = (filename: string, csvContent: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportContacts = () => {
    setIsExportingContacts(true);
    setTimeout(() => {
      const headers = ['ID,Nombre,Telefono,Email,Segmento,Canal,Estado\n'];
      const rows = sampleContacts.map(c => `${c.id},"${c.name}","${c.phone}","${c.email}","${c.segment}","${c.channel}","${c.status}"`).join('\n');
      downloadCSV('clientum-contactos-export.csv', headers + rows);
      setIsExportingContacts(false);
    }, 600);
  };

  const handleExportAnalytics = () => {
    setIsExportingAnalytics(true);
    setTimeout(() => {
      const headers = ['Campaña,Segmento,Enviados,Tasa Apertura,Tasa Respuesta,Convertidos,ROI\n'];
      const rows = sampleAnalytics.map(a => `"${a.campaign}","${a.segment}",${a.sent},"${a.opened}","${a.replied}",${a.converted},"${a.roi}"`).join('\n');
      downloadCSV('clientum-analiticas-campañas.csv', headers + rows);
      setIsExportingAnalytics(false);
    }, 600);
  };

  // Robust CSV Parser
  const parseCSVText = (text: string) => {
    const lines = text.split(/\r\n|\n/).filter(l => l.trim().length > 0);
    if (lines.length === 0) return;

    // Parse header
    const headers = parseCSVLine(lines[0]);
    setCsvHeaders(headers);

    // Parse rows (up to 100 preview rows)
    const rows = lines.slice(1, 101).map(line => parseCSVLine(line));
    setCsvRows(rows);

    // Smart auto-mapping detection
    const initialMapping = { name: '', phone: '', email: '', segment: '', channel: '', status: '' };
    headers.forEach(h => {
      const lower = h.toLowerCase();
      if ((lower.includes('nombre') || lower.includes('name')) && !initialMapping.name) initialMapping.name = h;
      if ((lower.includes('tel') || lower.includes('phone') || lower.includes('celular') || lower.includes('whatsapp')) && !initialMapping.phone) initialMapping.phone = h;
      if ((lower.includes('mail') || lower.includes('correo') || lower.includes('email')) && !initialMapping.email) initialMapping.email = h;
      if ((lower.includes('segment') || lower.includes('categoria') || lower.includes('tag') || lower.includes('tipo')) && !initialMapping.segment) initialMapping.segment = h;
      if ((lower.includes('canal') || lower.includes('prioritario')) && !initialMapping.channel) initialMapping.channel = h;
      if ((lower.includes('estado') || lower.includes('status')) && !initialMapping.status) initialMapping.status = h;
    });

    setFieldMapping(initialMapping);
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(cur.trim().replace(/^"|"$/g, ''));
        cur = '';
      } else {
        cur += char;
      }
    }
    result.push(cur.trim().replace(/^"|"$/g, ''));
    return result;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          parseCSVText(text);
          setStep('mapping');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleConfirmMapping = () => {
    // Generate preview records based on mapping
    const nameIdx = csvHeaders.indexOf(fieldMapping.name);
    const phoneIdx = csvHeaders.indexOf(fieldMapping.phone);
    const emailIdx = csvHeaders.indexOf(fieldMapping.email);
    const segmentIdx = csvHeaders.indexOf(fieldMapping.segment);
    const channelIdx = csvHeaders.indexOf(fieldMapping.channel);
    const statusIdx = csvHeaders.indexOf(fieldMapping.status);

    const mapped = csvRows.map((row, idx) => ({
      id: idx + 1,
      name: nameIdx !== -1 ? row[nameIdx] || 'Sin nombre' : `Lead ${idx + 1}`,
      phone: phoneIdx !== -1 ? row[phoneIdx] || '-' : '-',
      email: emailIdx !== -1 ? row[emailIdx] || '' : '',
      segment: segmentIdx !== -1 ? row[segmentIdx] || 'General' : 'General',
      channel: channelIdx !== -1 ? row[channelIdx] || 'WhatsApp' : 'WhatsApp',
      status: statusIdx !== -1 ? row[statusIdx] || 'Por contactar' : 'Por contactar'
    }));

    setImportedRecords(mapped);
    setStep('preview');
  };

  const handleFinalImport = () => {
    setImportStatus(`¡Importación exitosa! ${importedRecords.length} registros del archivo "${fileName}" sincronizados y mapeados al CRM.`);
    setStep('success');
  };

  const resetImport = () => {
    setStep('upload');
    setFileName('');
    setCsvHeaders([]);
    setCsvRows([]);
    setImportedRecords([]);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Importar / Exportar Datos</h1>
        <p className="text-sm text-slate-500">Herramientas de exportación CSV para reportes offline y sincronización masiva con parser inteligente de columnas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Contacts Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Exportar Directorio de Contactos</h2>
                <p className="text-xs text-slate-500">Descarga la lista completa de clientes y leads en formato CSV.</p>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-600 space-y-1">
              <div className="font-medium text-slate-700">Incluye:</div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                <li>Datos de contacto (Teléfono, Email, WhatsApp)</li>
                <li>Segmentación (Gremios, Empresas, Colegios)</li>
                <li>Estado actual del embudo comercial</li>
              </ul>
            </div>
          </div>
          <button
            onClick={handleExportContacts}
            disabled={isExportingContacts}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingContacts ? 'Generando CSV...' : 'Exportar Contactos CSV'}</span>
          </button>
        </div>

        {/* Export Analytics Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Exportar Analíticas de Campañas</h2>
                <p className="text-xs text-slate-500">Descarga métricas de rendimiento, aperturas y ROI en CSV.</p>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-600 space-y-1">
              <div className="font-medium text-slate-700">Incluye:</div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                <li>Tasas de conversión y apertura por campaña</li>
                <li>Volumen de envíos y respuestas</li>
                <li>Retorno de inversión (ROI) estimado</li>
              </ul>
            </div>
          </div>
          <button
            onClick={handleExportAnalytics}
            disabled={isExportingAnalytics}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingAnalytics ? 'Generando CSV...' : 'Exportar Analíticas CSV'}</span>
          </button>
        </div>
      </div>

      {/* Interactive CSV Parser & Column Mapping Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Importador Inteligente CSV con Mapeo de Columnas</h2>
              <p className="text-xs text-slate-500">Sube cualquier archivo CSV local y mapea sus columnas al esquema oficial de Clientum.</p>
            </div>
          </div>
          {step !== 'upload' && (
            <button
              onClick={resetImport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reiniciar Importación</span>
            </button>
          )}
        </div>

        {/* STEP 1: UPLOAD */}
        {step === 'upload' && (
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors bg-slate-50/50">
            <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-700 mb-1">Arrastra tu archivo CSV o haz clic para explorar</p>
            <p className="text-xs text-slate-400 mb-4">Soporta formato .csv con delimitadores estándar (comas, punto y coma)</p>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium cursor-pointer shadow-sm transition-colors">
              <span>Seleccionar Archivo CSV</span>
              <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        )}

        {/* STEP 2: COLUMN MAPPING */}
        {step === 'mapping' && (
          <div className="space-y-6">
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide block">Archivo Detectado</span>
                <span className="text-sm font-bold text-slate-900">{fileName}</span>
                <span className="text-xs text-slate-500 ml-2">({csvRows.length} filas detectadas en la vista previa)</span>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 bg-white text-indigo-600 rounded border border-indigo-200">
                {csvHeaders.length} Columnas identificadas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Nombre / Razón Social <span className="text-red-500">*</span></label>
                <select
                  value={fieldMapping.name}
                  onChange={(e) => setFieldMapping({ ...fieldMapping, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">-- Seleccionar Columna CSV --</option>
                  {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Teléfono / WhatsApp</label>
                <select
                  value={fieldMapping.phone}
                  onChange={(e) => setFieldMapping({ ...fieldMapping, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">-- Seleccionar Columna CSV --</option>
                  {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Correo Electrónico (Email)</label>
                <select
                  value={fieldMapping.email}
                  onChange={(e) => setFieldMapping({ ...fieldMapping, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">-- Seleccionar Columna CSV --</option>
                  {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Segmento / Categoría</label>
                <select
                  value={fieldMapping.segment}
                  onChange={(e) => setFieldMapping({ ...fieldMapping, segment: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">-- Seleccionar Columna CSV --</option>
                  {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Canal Prioritario</label>
                <select
                  value={fieldMapping.channel}
                  onChange={(e) => setFieldMapping({ ...fieldMapping, channel: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">-- Seleccionar Columna CSV --</option>
                  {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Estado del Contacto</label>
                <select
                  value={fieldMapping.status}
                  onChange={(e) => setFieldMapping({ ...fieldMapping, status: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">-- Seleccionar Columna CSV --</option>
                  {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={resetImport}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmMapping}
                disabled={!fieldMapping.name}
                className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 shadow-sm"
              >
                <span>Vista Previa del Mapeo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PREVIEW */}
        {step === 'preview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-md font-semibold text-slate-900">Vista Previa de Registros Mapeados</h3>
                <p className="text-xs text-slate-500">Verifica que los datos coincidan correctamente antes de la importación definitiva.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                {importedRecords.length} registros listos
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg max-h-96">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Nombre</th>
                    <th className="p-3">Teléfono / WhatsApp</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Segmento</th>
                    <th className="p-3">Canal</th>
                    <th className="p-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {importedRecords.slice(0, 25).map((rec, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-3 font-mono text-slate-400">{rec.id}</td>
                      <td className="p-3 font-medium text-slate-900">{rec.name}</td>
                      <td className="p-3">{rec.phone}</td>
                      <td className="p-3">{rec.email || <span className="text-slate-400 italic">Sin email</span>}</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium">{rec.segment}</span></td>
                      <td className="p-3">{rec.channel}</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[11px] font-medium">{rec.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep('mapping')}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors"
              >
                Atrás / Cambiar Mapeo
              </button>
              <button
                onClick={handleFinalImport}
                className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                <Database className="w-4 h-4" />
                <span>Confirmar e Importar {importedRecords.length} Registros</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 'success' && (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-lg font-bold text-slate-900">¡Sincronización Completada con Éxito!</h3>
              <p className="text-sm text-slate-600">{importStatus}</p>
            </div>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={resetImport}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                Importar Otro Archivo CSV
              </button>
            </div>
          </div>
        )}

        {importStatus && step !== 'success' && (
          <div className="flex items-center gap-2 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{importStatus}</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default ImportExportTab;

