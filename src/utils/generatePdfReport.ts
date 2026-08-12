import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

export interface ReportPdfData {
  title?: string;
  clientName?: string;
  region?: string;
  timeframe?: string;
  currencySymbol?: string;
  metrics?: {
    label: string;
    value: string;
    change?: string;
    subtext?: string;
  }[];
  channelData?: {
    channel: string;
    conversion: string;
    roi: string;
    costPerLead: string;
  }[];
  services?: {
    name: string;
    category: string;
    status: string;
    latencyMs: number;
  }[];
  elementIdToCapture?: string;
}

export async function generateClientPdfReport(data: ReportPdfData = {}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210
  const pageHeight = doc.internal.pageSize.getHeight(); // 297

  // 1. HEADER BANNER
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 38, 'F');

  // Accent line
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.rect(0, 36, pageWidth, 2, 'F');

  // Title in Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('CLIENTUM B2B INTELLIGENCE', 14, 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(data.title || 'REPORTE EJECUTIVO DE RENDIMIENTO Y MÉTRICAS', 14, 24);

  // Metadata right aligned
  const currentDate = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240);
  doc.text(`Fecha: ${currentDate}`, pageWidth - 14, 15, { align: 'right' });
  doc.text(`Región: ${data.region || 'LATAM & Global'}`, pageWidth - 14, 21, { align: 'right' });
  doc.text(`Período: ${data.timeframe || 'Últimos 6 Meses'}`, pageWidth - 14, 27, { align: 'right' });

  let currentY = 46;

  // 2. EXECUTIVE SUMMARY BOX
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(14, currentY, pageWidth - 28, 22, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Resumen Ejecutivo para Cliente', 18, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const summaryText = `Informe consolidado de rendimiento comercial, captación multicanal, retorno de inversión (ROI) e infraestructura de Inteligencia Artificial para ${data.clientName || 'Cliente Corporativo'}. Documento oficial exportado desde Clientum B2B Platform.`;
  const splitSummary = doc.splitTextToSize(summaryText, pageWidth - 36);
  doc.text(splitSummary, 18, currentY + 12);

  currentY += 28;

  // 3. KEY METRICS GRID (KPI boxes)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Métricas Clave de Rendimiento (KPIs)', 14, currentY);

  currentY += 5;

  const metricsList = data.metrics || [
    { label: 'Ingresos Totales', value: `${data.currencySymbol || '$'}142,850 USD`, change: '+18.4% vs mes anterior' },
    { label: 'Prospectos Activos', value: '1,248', change: '+12.2% nuevos leads' },
    { label: 'ROI Promedio Multicanal', value: '342%', change: '+5.1% eficiencia' },
    { label: 'Campañas Activas', value: '24', change: 'Optimizadas con IA' },
    { label: 'Ingresos Atribuibles CRM', value: `${data.currencySymbol || '$'}438,000 USD`, change: '+34.2% cierres' },
    { label: 'Costo Promedio por Lead', value: `${data.currencySymbol || '$'}14.50 USD`, change: '-14% reducción cost' },
  ];

  const boxWidth = (pageWidth - 28 - 8) / 3; // 3 columns
  const boxHeight = 22;

  metricsList.forEach((metric, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = 14 + col * (boxWidth + 4);
    const y = currentY + row * (boxHeight + 4);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(x, y, boxWidth, boxHeight, 2, 2, 'FD');

    // Label
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(metric.label, x + 4, y + 6);

    // Value
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(15, 23, 42);
    doc.text(metric.value, x + 4, y + 13);

    // Change
    if (metric.change) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(16, 185, 129); // emerald
      doc.text(metric.change, x + 4, y + 18.5);
    }
  });

  const totalRows = Math.ceil(metricsList.length / 3);
  currentY += totalRows * (boxHeight + 4) + 6;

  // 4. CAPTURED CANVAS / CHART IMAGE IF PROVIDED
  if (data.elementIdToCapture) {
    const el = document.getElementById(data.elementIdToCapture);
    if (el) {
      try {
        const canvas = await html2canvas(el, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false
        });
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - 28;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (currentY + imgHeight > pageHeight - 20) {
          doc.addPage();
          currentY = 20;
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text('Visualización de Gráficos y Tendencias', 14, currentY);
        currentY += 4;

        doc.addImage(imgData, 'PNG', 14, currentY, imgWidth, Math.min(imgHeight, 80));
        currentY += Math.min(imgHeight, 80) + 8;
      } catch (e) {
        console.warn('Could not capture chart canvas:', e);
      }
    }
  }

  // 5. CHANNEL BREAKDOWN TABLE
  if (currentY > pageHeight - 65) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Desglose de Rendimiento por Canal Comercial', 14, currentY);
  currentY += 5;

  const channels = data.channelData || [
    { channel: 'Email Marketing', conversion: '4.8%', roi: '620%', costPerLead: '$12.00 USD' },
    { channel: 'Social Ads / LinkedIn', conversion: '2.9%', roi: '480%', costPerLead: '$28.00 USD' },
    { channel: 'SEO & Orgánico', conversion: '6.5%', roi: '980%', costPerLead: '$5.00 USD' },
    { channel: 'Google Maps Prospecting', conversion: '5.2%', roi: '740%', costPerLead: '$15.00 USD' }
  ];

  // Table Header
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(14, currentY, pageWidth - 28, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('CANAL COMERCIAL', 18, currentY + 5.5);
  doc.text('CONVERSIÓN', 85, currentY + 5.5);
  doc.text('ROI ESTIMADO', 130, currentY + 5.5);
  doc.text('COSTO POR LEAD', 170, currentY + 5.5);

  currentY += 8;

  // Table Rows
  channels.forEach((ch, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, currentY, pageWidth - 28, 7.5, 'F');
    }
    doc.setDrawColor(241, 245, 249);
    doc.line(14, currentY + 7.5, pageWidth - 14, currentY + 7.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(ch.channel, 18, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.text(ch.conversion, 85, currentY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129); // emerald
    doc.text(ch.roi, 130, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(ch.costPerLead, 170, currentY + 5);

    currentY += 7.5;
  });

  currentY += 8;

  // 6. INFRASTRUCTURE & API SERVICES STATUS
  if (currentY > pageHeight - 50) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Estado de Infraestructura & Servicios de IA', 14, currentY);
  currentY += 5;

  const services = data.services || [
    { name: 'Gemini 3.6 Flash AI', category: 'Modelos de Lenguaje & Copys', status: 'Operativo', latencyMs: 280 },
    { name: 'Google Maps Places API', category: 'Geolocalización & Leads', status: 'Operativo', latencyMs: 310 },
    { name: 'Apify Web Scrapers', category: 'Scraping de Contactos B2B', status: 'Operativo', latencyMs: 420 },
    { name: 'Neon PostgreSQL Serverless', category: 'Base de Datos CRM', status: 'Operativo', latencyMs: 95 }
  ];

  doc.setFillColor(241, 245, 249);
  doc.rect(14, currentY, pageWidth - 28, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('SERVICIO / COMPONENTE', 18, currentY + 5.5);
  doc.text('CATEGORÍA', 95, currentY + 5.5);
  doc.text('ESTADO', 150, currentY + 5.5);
  doc.text('LATENCIA', 180, currentY + 5.5);

  currentY += 8;

  services.forEach((srv, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, currentY, pageWidth - 28, 7, 'F');
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(srv.name, 18, currentY + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(srv.category, 95, currentY + 4.8);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text(`* ${srv.status}`, 150, currentY + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(`${srv.latencyMs} ms`, 180, currentY + 4.8);

    currentY += 7;
  });

  // 7. FOOTER ON ALL PAGES
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.line(14, pageHeight - 12, pageWidth - 14, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('Clientum B2B Intelligence Platform · Reporte confidencial generado para cliente', 14, pageHeight - 7);
    doc.text(`Página ${i} de ${pageCount}`, pageWidth - 14, pageHeight - 7, { align: 'right' });
  }

  // Save the PDF file
  const fileName = `Reporte_Ejecutivo_Clientum_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
}
