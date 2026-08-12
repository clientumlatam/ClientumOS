import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FileDown, Loader2, CheckCircle2 } from 'lucide-react';

export interface PdfExportButtonProps {
  targetId?: string;
  targetRef?: React.RefObject<HTMLElement | null>;
  filename?: string;
  title?: string;
  clientName?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'header' | 'minimal';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  label?: string;
  branding?: {
    logoUrl?: string;
    primaryColor?: string;
    companyName?: string;
  };
  onSuccess?: () => void;
  onError?: (error: any) => void;
  className?: string;
}

export function PdfExportButton({
  targetId = 'main-content-area',
  targetRef,
  filename,
  title = 'Reporte Ejecutivo Clientum B2B',
  clientName = 'Cliente Corporativo LATAM',
  variant = 'primary',
  size = 'md',
  label = 'Descargar PDF',
  branding = {
    primaryColor: '#4f46e5',
    companyName: 'Clientum B2B Platform'
  },
  onSuccess,
  onError,
  className = ''
}: PdfExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  };

  const handleExportPdf = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (isExporting) return;
    setIsExporting(true);
    setIsSuccess(false);
    setShowNotice(true);

    try {
      let targetEl: HTMLElement | null = null;
      if (targetRef && targetRef.current) {
        targetEl = targetRef.current;
      } else if (targetId) {
        targetEl = document.getElementById(targetId);
      }

      if (!targetEl) {
        targetEl = document.getElementById('main-content-area') || 
                   document.querySelector('main') as HTMLElement || 
                   document.body;
      }

      if (!targetEl) {
        throw new Error('No se encontró el contenedor de contenido para exportar a PDF.');
      }

      const pages = targetEl.querySelectorAll('.print-page');

      if (pages && pages.length > 0) {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const pagesToClean: HTMLElement[] = [];
        pages.forEach((pageEl) => {
          const el = pageEl as HTMLElement;
          pagesToClean.push(el);
          el.style.setProperty('box-shadow', 'none', 'important');
          el.style.setProperty('border', 'none', 'important');
          el.style.setProperty('border-radius', '0px', 'important');
        });

        try {
          for (let i = 0; i < pages.length; i++) {
            const pageEl = pages[i] as HTMLElement;
            const canvas = await html2canvas(pageEl, {
              scale: 2.2,
              useCORS: true,
              allowTaint: true,
              backgroundColor: '#ffffff',
              logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            if (i > 0) {
              pdf.addPage();
            }
            pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
          }

          const outName = filename || `${title.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
          pdf.save(outName);

        } finally {
          pagesToClean.forEach((el) => {
            el.style.removeProperty('box-shadow');
            el.style.removeProperty('border');
            el.style.removeProperty('border-radius');
          });
        }
      } else {
        const canvas = await html2canvas(targetEl, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          ignoreElements: (element) => {
            return element.classList.contains('no-pdf') || element.classList.contains('no-print');
          }
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 12;
        const headerHeight = 28;
        const footerHeight = 12;
        const contentWidth = pageWidth - (margin * 2);

        const rgb = hexToRgb(branding.primaryColor || '#4f46e5');
        
        pdf.setFillColor(15, 23, 42);
        pdf.rect(0, 0, pageWidth, headerHeight, 'F');

        pdf.setFillColor(rgb.r, rgb.g, rgb.b);
        pdf.rect(0, headerHeight - 2, pageWidth, 2, 'F');

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(13);
        pdf.setTextColor(255, 255, 255);
        pdf.text((branding.companyName || 'CLIENTUM B2B PLATFORM').toUpperCase(), margin, 11);

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8.5);
        pdf.setTextColor(203, 213, 225);
        pdf.text(title, margin, 18);

        const currentDate = new Date().toLocaleDateString('es-AR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });
        pdf.setFontSize(8);
        pdf.setTextColor(148, 163, 184);
        pdf.text(`Fecha: ${currentDate}`, pageWidth - margin, 11, { align: 'right' });
        pdf.text(`Cliente: ${clientName}`, pageWidth - margin, 17, { align: 'right' });

        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = headerHeight + 5;

        const printableHeightPerPage = pageHeight - headerHeight - footerHeight - 10;

        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= printableHeightPerPage;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight + headerHeight;
          pdf.addPage();
          
          pdf.setFillColor(15, 23, 42);
          pdf.rect(0, 0, pageWidth, 10, 'F');
          pdf.setFillColor(rgb.r, rgb.g, rgb.b);
          pdf.rect(0, 8, pageWidth, 2, 'F');
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(8);
          pdf.setTextColor(255, 255, 255);
          pdf.text(`${(branding.companyName || 'CLIENTUM').toUpperCase()} - ${title}`, margin, 6);

          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          heightLeft -= (pageHeight - 20);
        }

        const pageCount = pdf.internal.pages.length - 1;
        for (let i = 1; i <= pageCount; i++) {
          pdf.setPage(i);
          pdf.setDrawColor(226, 232, 240);
          pdf.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(7.5);
          pdf.setTextColor(148, 163, 184);
          pdf.text(`${branding.companyName || 'Clientum B2B Intelligence'} · Documento Confidencial`, margin, pageHeight - 5);
          pdf.text(`Página ${i} de ${pageCount}`, pageWidth - margin, pageHeight - 5, { align: 'right' });
        }

        const outName = filename || `${title.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
        pdf.save(outName);
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      if (onSuccess) onSuccess();

    } catch (err) {
      console.error('Error al generar el PDF:', err);
      if (onError) onError(err);
    } finally {
      setIsExporting(false);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 border-0';
      case 'secondary':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 border-0';
      case 'outline':
        return 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs';
      case 'ghost':
        return 'bg-transparent hover:bg-slate-100 text-slate-600 border-0';
      case 'header':
        return 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200';
      case 'minimal':
        return 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-0';
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'px-2.5 py-1 text-[11px] rounded-lg gap-1.5';
      case 'sm':
        return 'px-3 py-1.5 text-xs rounded-xl gap-1.5';
      case 'md':
        return 'px-4 py-2 text-xs rounded-xl gap-2 font-bold';
      case 'lg':
        return 'px-5 py-2.5 text-sm rounded-xl gap-2.5 font-bold';
      default:
        return 'px-4 py-2 text-xs rounded-xl gap-2 font-bold';
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleExportPdf}
        disabled={isExporting}
        title="Exportar reporte PDF del área de trabajo actual"
        className={`inline-flex items-center justify-center transition-all cursor-pointer font-bold disabled:opacity-60 disabled:cursor-not-allowed ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>Generando PDF...</span>
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>¡PDF Exportado!</span>
          </>
        ) : (
          <>
            <FileDown className="w-4 h-4 shrink-0" />
            <span>{label}</span>
          </>
        )}
      </button>

      {showNotice && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-white border border-slate-200 rounded-xl shadow-2xl p-5 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0 mt-0.5">
              <FileDown className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-slate-950 mb-1">
                Generando Reporte PDF
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Si tu navegador bloquea la descarga automática debido a las políticas de seguridad del iFrame de desarrollo, haz clic en el botón <strong className="text-indigo-600">"Abrir en nueva pestaña"</strong> en la esquina superior derecha para descargarlo directamente.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowNotice(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PdfExportButton;
