import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Users,
  Sparkles,
  Phone,
  Building2,
  MapPin,
  Trash2,
  ArrowRight,
  RefreshCw,
  FileText
} from 'lucide-react';
import { BulkContactItem } from '../BulkWhatsAppModal';

interface WhatsAppCsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (contacts: BulkContactItem[], openBulkSender?: boolean) => void;
}

const SAMPLE_CSV_DATA = `Nombre,Telefono,Empresa,Cargo,Ciudad,LeadScore,PersonaTag
Ing. Juan Ignacio Morales,+54 9 298 465-1122,Frutícola del Valle S.A.,Director de Planta,General Roca,92,CEO PyME
Mariana Costa,+54 9 299 433-8899,Transportes Patagónicos,Jefa de Logística,Neuquén,88,Logística
Esteban Valenzuela,+54 9 261 588-4433,Bodegas Andinas S.R.L.,Gerente Comercial,Mendoza,95,CRO / Ventas
Carla Benítez,+54 9 298 421-7766,AgroQuímica Comahue,Socia Gerente,Cipolletti,86,Compras
Rodrigo Silva,+55 22 99765-4321,Pousada & Náutica Buzios,Proprietário,Arraial do Cabo,90,CEO Brasil`;

export function WhatsAppCsvImportModal({
  isOpen,
  onClose,
  onImportComplete
}: WhatsAppCsvImportModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [parsedContacts, setParsedContacts] = useState<BulkContactItem[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const parseCsvContent = (text: string) => {
    setErrorMsg(null);
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) {
      setErrorMsg('El archivo CSV debe contener al menos un encabezado y una fila de datos.');
      return;
    }

    // Detect separator: comma, semicolon, tab, pipe
    const firstLine = lines[0];
    let sep = ',';
    if (firstLine.includes(';') && !firstLine.includes(',')) sep = ';';
    else if (firstLine.includes('\t')) sep = '\t';
    else if (firstLine.includes('|')) sep = '|';

    const headers = firstLine.split(sep).map(h => h.trim().toLowerCase().replace(/^["']|["']$/g, ''));

    // Map column positions
    const nameIdx = headers.findIndex(h => h.includes('nom') || h.includes('name') || h.includes('contact'));
    const phoneIdx = headers.findIndex(h => h.includes('tel') || h.includes('phone') || h.includes('cel') || h.includes('wa') || h.includes('movil'));
    const compIdx = headers.findIndex(h => h.includes('empresa') || h.includes('company') || h.includes('organiz') || h.includes('negocio'));
    const roleIdx = headers.findIndex(h => h.includes('cargo') || h.includes('role') || h.includes('puesto') || h.includes('posic'));
    const cityIdx = headers.findIndex(h => h.includes('ciudad') || h.includes('city') || h.includes('localidad') || h.includes('ubicac'));
    const scoreIdx = headers.findIndex(h => h.includes('score') || h.includes('puntaje') || h.includes('fit'));
    const tagIdx = headers.findIndex(h => h.includes('tag') || h.includes('persona') || h.includes('categoria') || h.includes('segmento'));

    if (phoneIdx === -1 && nameIdx === -1) {
      setErrorMsg('No se detectaron columnas de Nombre o Teléfono en el encabezado del CSV.');
      return;
    }

    const items: BulkContactItem[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;

      const cols = line.split(sep).map(c => c.trim().replace(/^["']|["']$/g, ''));
      const rawPhone = phoneIdx !== -1 ? cols[phoneIdx] : (cols[1] || '');
      const rawName = nameIdx !== -1 ? cols[nameIdx] : (cols[0] || `Prospecto #${i}`);
      const rawCompany = compIdx !== -1 ? cols[compIdx] : 'PyME Comercial';
      const rawRole = roleIdx !== -1 ? cols[roleIdx] : 'Decisor de Compra';
      const rawCity = cityIdx !== -1 ? cols[cityIdx] : 'General Roca / Patagonia';
      const rawScore = scoreIdx !== -1 ? parseInt(cols[scoreIdx]) || 85 : 85;
      const rawTag = tagIdx !== -1 ? cols[tagIdx] : 'CEO PyME';

      if (!rawPhone && !rawName) continue;

      // Normalize phone formatting
      let formattedPhone = rawPhone;
      if (formattedPhone && !formattedPhone.startsWith('+')) {
        if (formattedPhone.startsWith('54') || formattedPhone.startsWith('55')) {
          formattedPhone = `+${formattedPhone}`;
        } else if (formattedPhone.length >= 8) {
          formattedPhone = `+54 9 ${formattedPhone}`;
        }
      }

      items.push({
        id: `csv-${Date.now()}-${i}`,
        name: rawName || `Contacto ${formattedPhone}`,
        phone: formattedPhone || '+54 9 298 400-0000',
        company: rawCompany,
        role: rawRole,
        city: rawCity,
        country: rawCity.toLowerCase().includes('brasil') || formattedPhone.startsWith('+55') ? 'Brasil' : 'Argentina',
        leadScore: rawScore,
        status: 'Prospecto Calificado',
        personaTag: rawTag,
        whatsappVerified: true
      });
    }

    if (items.length === 0) {
      setErrorMsg('No se encontraron registros válidos para importar.');
      return;
    }

    setParsedContacts(items);
  };

  const handleFile = (file: File) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvText(text);
      parseCsvContent(text);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const loadSample = () => {
    setFileName('prospectos_patagonia_brasil_sample.csv');
    setCsvText(SAMPLE_CSV_DATA);
    parseCsvContent(SAMPLE_CSV_DATA);
  };

  const executeImport = async (openBulk: boolean) => {
    if (parsedContacts.length === 0) return;
    setImporting(true);
    try {
      await fetch('/api/whatsapp/import-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacts: parsedContacts })
      });
    } catch {
      // Local state will handle it
    } finally {
      setImporting(false);
      onImportComplete(parsedContacts, openBulk);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0A101F] border border-[#1E293B] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#1E293B] flex items-center justify-between bg-gradient-to-r from-[#0A101F] to-[#0D1528]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Importar Lista de Prospectos desde CSV
                <span className="text-[11px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                  WhatsApp AI
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Cargá archivos CSV, TSV o pegá registros para difusión masiva o atención automática.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {errorMsg && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {parsedContacts.length === 0 ? (
            <div className="space-y-4">
              {/* Dropzone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-[#1E293B] hover:border-slate-600 bg-[#050B14]'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv,.txt,.tsv"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                />
                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3 animate-bounce" />
                <p className="text-sm font-semibold text-white">
                  Arrastrá tu archivo CSV acá o <span className="text-emerald-400 underline">buscá en tu equipo</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Formatos soportados: .CSV, .TSV o texto delimitado por comas / punto y coma
                </p>
              </div>

              {/* Quick sample loader */}
              <div className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>¿No tenés un CSV listo? Cargá una muestra de prospectos de prueba.</span>
                </div>
                <button
                  type="button"
                  onClick={loadSample}
                  className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 rounded-lg font-semibold transition-colors shrink-0"
                >
                  Cargar Ejemplo CSV
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File details & reset */}
              <div className="flex items-center justify-between p-3 bg-[#050B14] border border-[#1E293B] rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">{fileName || 'Lista CSV cargada'}</span>
                  <span className="text-emerald-400 font-bold">({parsedContacts.length} prospectos válidos)</span>
                </div>
                <button
                  onClick={() => { setParsedContacts([]); setCsvText(''); setFileName(null); }}
                  className="text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Cambiar archivo
                </button>
              </div>

              {/* Table Preview */}
              <div className="border border-[#1E293B] rounded-xl overflow-hidden bg-[#050B14] max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A101F] text-slate-400 border-b border-[#1E293B] sticky top-0">
                    <tr>
                      <th className="p-2.5 font-semibold">Nombre</th>
                      <th className="p-2.5 font-semibold">WhatsApp</th>
                      <th className="p-2.5 font-semibold">Empresa / Cargo</th>
                      <th className="p-2.5 font-semibold">Ciudad</th>
                      <th className="p-2.5 font-semibold text-center">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E293B]/60 text-slate-300">
                    {parsedContacts.map((c) => (
                      <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-2.5 font-medium text-white">{c.name}</td>
                        <td className="p-2.5 font-mono text-emerald-400">{c.phone}</td>
                        <td className="p-2.5">
                          <p className="truncate max-w-[150px]">{c.company}</p>
                          <p className="text-[10px] text-slate-500">{c.role}</p>
                        </td>
                        <td className="p-2.5 text-slate-400">{c.city}</td>
                        <td className="p-2.5 text-center">
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-bold text-[10px]">
                            {c.leadScore} pts
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1E293B] bg-[#0A101F] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl transition-colors"
          >
            Cancelar
          </button>

          {parsedContacts.length > 0 && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => executeImport(false)}
                disabled={importing}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                {importing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Users className="w-3.5 h-3.5" />}
                Importar a WhatsApp AI
              </button>

              <button
                onClick={() => executeImport(true)}
                disabled={importing}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Importar y Abrir Envío Masivo IA
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
