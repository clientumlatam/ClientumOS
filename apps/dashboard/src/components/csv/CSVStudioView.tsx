import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import {
  FileSpreadsheet,
  Upload,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Database,
  Sparkles,
  Download,
  FileText,
  Table,
  X
} from 'lucide-react';
import { useCRM } from '@clientum/ui';

export const CSVStudioView: React.FC = () => {
  const { importCSVData, exportOpportunitiesCSV, showToast } = useCRM();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [importTarget, setImportTarget] = useState<'opportunities' | 'companies' | 'people'>('opportunities');
  const [pastedData, setPastedData] = useState<string>('');

  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isParsed, setIsParsed] = useState(false);

  const handleParse = (data: string, isFile: boolean = false) => {
    Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          showToast(`Error parsing CSV: ${results.errors[0].message}`, 'error');
          return;
        }
        setHeaders(results.meta.fields || []);
        setParsedRows(results.data);
        setIsParsed(true);
        showToast(`Parsed ${results.data.length} rows successfully`, 'success');
      },
      error: (error) => {
        showToast(`Error: ${error.message}`, 'error');
      }
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          showToast(`Error parsing CSV file: ${results.errors[0].message}`, 'error');
          return;
        }
        setHeaders(results.meta.fields || []);
        setParsedRows(results.data);
        setIsParsed(true);
        showToast(`Parsed ${results.data.length} rows successfully`, 'success');
      }
    });
  };

  const handleParseManual = () => {
    if (!pastedData.trim()) {
      showToast('Please paste CSV or tabular data', 'error');
      return;
    }
    handleParse(pastedData);
  };

  const handleExecuteImport = () => {
    if (parsedRows.length === 0) return;
    importCSVData(importTarget, parsedRows);
    setIsParsed(false);
    setParsedRows([]);
    setPastedData('');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#0a0c10] text-[#e1e4ea] p-6">
      {/* Header Banner */}
      <div className="mb-6 p-6 rounded-2xl border border-[#1e222d] bg-[#0d0f14] flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">Clientum Data Import & Export Studio</h1>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                CSV Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Bulk import leads, companies, and deals with field auto-mapping, schema validation, and CSV export.
            </p>
          </div>
        </div>

        <button
          onClick={exportOpportunitiesCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#181d2a] hover:bg-[#202738] border border-[#2b3348] text-slate-200 text-xs font-semibold transition-all shadow-md"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          Export Deals to CSV
        </button>
      </div>

      {/* Grid: Config & Input */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Target Entity & Input Area */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-5 rounded-xl border border-[#1e222d] bg-[#0d0f14] space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" />
              1. Select Destination Entity
            </h2>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setImportTarget('opportunities')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  importTarget === 'opportunities'
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                    : 'bg-[#141720] border-[#222736] text-slate-400 hover:text-slate-200'
                }`}
              >
                Deals
              </button>
              <button
                onClick={() => setImportTarget('companies')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  importTarget === 'companies'
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                    : 'bg-[#141720] border-[#222736] text-slate-400 hover:text-slate-200'
                }`}
              >
                Companies
              </button>
              <button
                onClick={() => setImportTarget('people')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  importTarget === 'people'
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                    : 'bg-[#141720] border-[#222736] text-slate-400 hover:text-slate-200'
                }`}
              >
                People
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  2. Upload or Paste CSV
                </label>
                <div 
                  className="w-full h-32 border-2 border-dashed border-[#222736] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 transition-colors bg-[#090b0e]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-6 h-6 text-slate-500 mb-2" />
                  <span className="text-xs text-slate-400">Click to upload CSV</span>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept=".csv"
                  className="hidden" 
                />
              </div>

              <div>
                <textarea
                  value={pastedData}
                  onChange={(e) => {
                    setPastedData(e.target.value);
                    setIsParsed(false);
                  }}
                  placeholder="Or paste CSV content here..."
                  className="w-full h-32 px-3.5 py-2.5 rounded-xl bg-[#090b0e] border border-[#222736] text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleParseManual}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4" />
              Validate Pasted Data
            </button>
          </div>
        </div>

        {/* Right Col: Field Mapping & Preview Table */}
        <div className="lg:col-span-2">
          {isParsed ? (
            <div className="p-5 rounded-xl border border-[#1e222d] bg-[#0d0f14] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1e222d]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                    3. Mapped Data Preview ({parsedRows.length} rows)
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {setIsParsed(false); setParsedRows([]);}}
                    className="px-3 py-1.5 rounded-lg border border-[#2b3348] text-slate-400 text-xs font-semibold hover:text-white"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleExecuteImport}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg flex items-center gap-2 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    Import All {parsedRows.length} Records Now
                  </button>
                </div>
              </div>

              {/* Data Table Preview */}
              <div className="rounded-xl border border-[#1e222d] bg-[#090b0e] overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#141822] text-slate-300 border-b border-[#1e222d]">
                      {headers.map((h, i) => (
                        <th key={i} className="px-3 py-2.5 font-bold font-mono text-[11px]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e222d] text-slate-300">
                    {parsedRows.slice(0, 5).map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-[#121622]">
                        {headers.map((h, colIdx) => (
                          <td key={colIdx} className="px-3 py-2 text-[11px] truncate max-w-[180px]">
                            {row[h] || '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {parsedRows.length > 5 && (
                <p className="text-[11px] text-slate-500 text-center italic">
                  Showing first 5 of {parsedRows.length} rows...
                </p>
              )}
            </div>
          ) : (
            <div className="p-12 rounded-xl border border-dashed border-[#23293a] bg-[#0d0f14]/50 flex flex-col items-center justify-center text-center">
              <Table className="w-10 h-10 text-slate-600 mb-3" />
              <h3 className="text-sm font-semibold text-slate-300">No CSV Data Parsed Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Upload a CSV file or paste content on the left panel and click &quot;Validate&quot; to review the mapped table before importing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
