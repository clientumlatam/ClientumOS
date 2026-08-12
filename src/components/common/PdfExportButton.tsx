import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FileDown, Loader2, CheckCircle2, Printer, Sparkles } from 'lucide-react';
import { generateClientPdfReport, ReportPdfData } from '../../utils/generatePdfReport';

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
  customData?: ReportPdfData;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  className?: string;
}

export function PdfExportButton({
  targetId,
  targetRef,
  filename,
  title = 'Reporte Ejecutivo de Desempeño',
  clientName = 'Cliente Corporativo',
  variant = 'primary',
  size = 'md',
  label = 'Descargar PDF',
  branding = {
    primaryColor: '#4f46e5',
    companyName: 'Clientum B2B Platform'
  },
  customData,
  onSuccess,
  onError,
  className = ''
}: PdfExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Helper to convert hex color to RGB
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

    try {
      // 1. Determine target element to capture
      let targetEl: HTMLElement | null = null;
      if (targetRef && targetRef.current) {
        targetEl = targetRef.current;
      } else if (targetId) {
        targetEl = document.getElementById(targetId);
      }

      // If no specific target provided, try fallback to main container or app content
      if (!targetEl && !customData) {
        targetEl = document.getElementById('main-content-area') || 
                   document.querySelector('main') as HTMLElement || 
                   document.body;
      }

      // 2. If target element exists and html2canvas capture is possible
      if (targetEl) {
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

        const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
        const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
        const margin = 12;
        const headerHeight = 30;
        const footerHeight = 12;
        const contentWidth = pageWidth - (margin * 2);

        // Header Brand Styling
        const rgb = hexToRgb(branding.primaryColor || '#4f46e5');
        
        // Render Cover / Top Banner Header on first page
        pdf.setFillColor(15, 23, 42); // slate-900 background
        pdf.rect(0, 0, pageWidth, headerHeight, 'F');

        // Brand color accent bar
        pdf.setFillColor(rgb.r, rgb.g, rgb.b);
        pdf.rect(0, headerHeight - 2, pageWidth, 2, 'F');

        // Company Name
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(255, 255, 255);
        pdf.text((branding.companyName || 'CLIENTUM B2B PLATFORM').toUpperCase(), margin, 12);

        // Report Title
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(203, 213, 225); // slate-300
        pdf.text(title, margin, 19);

        // Timestamp & Date
        const currentDate = new Date().toLocaleDateString('es-AR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });
        pdf.setFontSize(8);
        pdf.setTextColor(148, 163, 184);
        pdf.text(`Fecha: ${currentDate}`, pageWidth - margin, 12, { align: 'right' });
        pdf.text(`Cliente: ${clientName}`, pageWidth - margin, 18, { align: 'right' });

        // Content Image Calculation
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = headerHeight + 5;

        // Print first page content slice
        const printableHeightPerPage = pageHeight - headerHeight - footerHeight - 10;

        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= printableHeightPerPage;

        // Multi-page pagination handling
        while (heightLeft > 0) {
          position = heightLeft - imgHeight + headerHeight;
          pdf.addPage();
          
          // Mini header for subsequent pages
          pdf.setFillColor(15, 23, 42);
          pdf.rect(0, 0, pageWidth, 12, 'F');
          pdf.setFillColor(rgb.r, rgb.g, rgb.b);
          pdf.rect(0, 10, pageWidth, 2, 'F');
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(8);
          pdf.setTextColor(255, 255, 255);
          pdf.text(`${(branding.companyName || 'CLIENTUM').toUpperCase()} - ${title}`, margin, 7);

          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          heightLeft -= (pageHeight - 20);
        }

        // Add page numbers and footers to all pages
        const pageCount = pdf.internal.pages.length - 1;
        for (let i = 1; i <= pageCount; i++) {
          pdf.setPage(i);
          pdf.setDrawColor(226, 232, 240);
          pdf.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(7.5);
          pdf.setTextColor(148, 163, 184);
          pdf.text(`${branding.companyName || 'Clientum B2B Intelligence'} · Documento confidencial exportado`, margin, pageHeight - 5);
          pdf.text(`Página ${i} de ${pageCount}`, pageWidth - margin, pageHeight - 5, { align: 'right' });
        }

        const outName = filename || `${title.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
        pdf.save(outName);
      } else {
        // Fallback: Use structured PDF report generator
        await generateClientPdfReport({
          title,
          clientName,
          ...customData
        });
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      if (onSuccess) onSuccess();

    } catch (err) {
      console.error('Error al exportar reporte a PDF:', err);
      if (onError) onError(err);
    } finally {
      setIsExporting(false);
    }
  };

  // Button styling maps
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
    <button
      type="button"
      onClick={handleExportPdf}
      disabled={isExporting}
      title="Exportar visualización actual a documento PDF"
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
          <span>¡PDF Guardado!</span>
        </>
      ) : (
        <>
          <FileDown className="w-4 h-4 shrink-0" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
