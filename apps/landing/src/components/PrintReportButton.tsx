import React from 'react';
import { Printer } from 'lucide-react';

interface PrintReportButtonProps {
  label?: string;
  variant?: 'header' | 'default' | 'compact';
  className?: string;
}

export function PrintReportButton({
  label = 'Imprimir / PDF',
  variant = 'header',
  className = '',
}: PrintReportButtonProps) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handlePrint}
        className={`p-2 rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors no-print cursor-pointer ${className}`}
        title="Imprimir vista actual o guardar como PDF"
        aria-label="Imprimir reporte"
      >
        <Printer className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={`no-print inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-semibold transition-all border border-slate-300 shadow-xs cursor-pointer ${className}`}
      title="Imprimir reporte o exportar como PDF con estilos nativos"
    >
      <Printer className="w-3.5 h-3.5 text-slate-600" />
      <span>{label}</span>
    </button>
  );
}

export default PrintReportButton;
