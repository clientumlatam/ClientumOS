import jsPDF from 'jspdf';

export interface ProposalData {
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  solutionType: string;
  businessSize: string;
  monthlyLeads: number;
  estimatedBudget: string;
  deliveryDays: number;
  projectedSavings: string;
  features: string[];
}

export function generateProposalPdf(data: ProposalData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [10, 37, 88]; // #0A2558 (Navy Blue)
  const secondaryColor = [16, 185, 129]; // #10B981 (Emerald Green)
  const darkTextColor = [30, 41, 59]; // Slate 800
  const lightTextColor = [100, 116, 139]; // Slate 500

  // 1. Header Banner
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 38, 'F');

  // Accent Line
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(0, 38, 210, 2, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('CLIENTUM LATAM', 15, 18);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('AGENCIA DE IA, CHATBOTS WHATSAPP & CRM PARA PYMES', 15, 25);
  doc.text('www.clientum.com.ar | info@clientum.com.ar', 15, 31);

  // Proposal Meta (Right aligned)
  const dateStr = new Date().toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('PROPUESTA TÉCNICA Y ESTIMACIÓN', 195, 18, { align: 'right' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha: ${dateStr}`, 195, 25, { align: 'right' });
  doc.text('Validez: 15 días hábiles', 195, 31, { align: 'right' });

  // 2. Client Info Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, 46, 180, 28, 2, 2, 'FD');

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('DATOS DEL DESTINATARIO:', 20, 53);

  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Cliente / Contacto: ${data.clientName || 'A definir'}`, 20, 60);
  doc.text(`Empresa: ${data.companyName || 'Empresa Privada'}`, 20, 67);

  doc.text(`Email: ${data.email || 'No especificado'}`, 110, 60);
  doc.text(`WhatsApp: ${data.phone || 'No especificado'}`, 110, 67);

  // 3. Solution Overview Section
  let curY = 82;
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('1. SOLUCIÓN TECNOLÓGICA PROPUESTA', 15, curY);

  curY += 6;
  doc.setFillColor(241, 245, 249);
  doc.rect(15, curY, 180, 0.5, 'F');

  curY += 8;
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Solución: ${data.solutionType}`, 20, curY);

  curY += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Segmento PyME: ${data.businessSize}`, 20, curY);
  doc.text(`Volumen Estimado: ~${data.monthlyLeads} consultas/mes`, 110, curY);

  // Deliverables List
  curY += 12;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('2. ENTREGABLES Y ALCANCE TÉCNICO', 15, curY);

  curY += 6;
  doc.setFillColor(241, 245, 249);
  doc.rect(15, curY, 180, 0.5, 'F');

  curY += 6;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);

  (data.features || []).forEach((feat, idx) => {
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.circle(20, curY - 1, 1.2, 'F');
    doc.text(feat, 25, curY);
    curY += 6.5;
  });

  // 4. Investment & SLA Box
  curY += 4;
  doc.setFillColor(236, 253, 245); // Emerald light background
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(15, curY, 180, 32, 2, 2, 'FD');

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('3. ESTIMACIÓN DE INVERSIÓN Y TIEMPOS DE ENTREGA', 20, curY + 8);

  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Inversión Estimada: ${data.estimatedBudget}`, 20, curY + 18);

  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Plazo Garantizado de Entrega (SLA): ${data.deliveryDays} Días Hábiles`, 20, curY + 26);
  doc.text(`Ahorro Estimado de Tiempo/Costos: ${data.projectedSavings}`, 110, curY + 26);

  // 5. Official Guarantee & Next Steps
  curY += 40;
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('4. GARANTÍA OFICIAL CLIENTUM', 15, curY);

  curY += 6;
  doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('• Implementación llave en mano con capacitación para todo tu equipo comercial.', 15, curY);
  curY += 5;
  doc.text('• Soporte técnico continuo y garantía de funcionamiento 99.9% uptime.', 15, curY);
  curY += 5;
  doc.text('• Facturación oficial AFIP (Facturas A y B) y opciones de pago flexibles en ARS/USD.', 15, curY);

  // Footer
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 282, 210, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.text('Clientum Latam · Transformación Digital & Agentes IA · WhatsApp: +54 298 451-0883 · https://clientum.com.ar', 105, 290, { align: 'center' });

  // Save the document
  const fileName = `Propuesta_Clientum_${(data.companyName || 'Empresa').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(fileName);
}
