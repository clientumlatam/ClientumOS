import { jsPDF } from "jspdf";
import * as fs from "fs";
import * as path from "path";

// Define a beautifully formatted 8-page PDF brochure for Clientum
async function generateStaticPdf() {
  console.log("Iniciando la generación del PDF estático corporativo...");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 15;

  // Primary Theme: Deep Corporate Blue & Gold Accent
  const primaryRGB = [26, 52, 97]; // #1a3461
  const accentRGB = [217, 119, 6];   // #d97706 (amber/gold)
  const darkSlateRGB = [15, 23, 42]; // #0f172a
  const textDarkRGB = [30, 41, 59];  // #1e293b
  const textMutedRGB = [100, 116, 139]; // #64748b

  const drawHeaderFooter = (pageNumber: number, title: string) => {
    // Top Bar Background
    doc.setFillColor(darkSlateRGB[0], darkSlateRGB[1], darkSlateRGB[2]);
    doc.rect(0, 0, pageWidth, 24, "F");

    // Accent line below top bar
    doc.setFillColor(accentRGB[0], accentRGB[1], accentRGB[2]);
    doc.rect(0, 24, pageWidth, 1.5, "F");

    // Header Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text("CLIENTUM B2B PLATFORM", margin, 11);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(203, 213, 225);
    doc.text(title, margin, 17);

    // Right-aligned header info
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("BROCHURE OFICIAL", pageWidth - margin, 11, { align: "right" });

    // Footer Accent line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

    // Footer Text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text("Clientum B2B Intelligence · Documento Confidencial", margin, pageHeight - 10);
    doc.text(`Página ${pageNumber} de 8`, pageWidth - margin, pageHeight - 10, { align: "right" });
  };

  // ================= PAGE 1: PORTADA =================
  // Dark luxury background for cover page
  doc.setFillColor(darkSlateRGB[0], darkSlateRGB[1], darkSlateRGB[2]);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Modern abstract geometric elements
  doc.setFillColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.rect(0, 0, pageWidth * 0.45, pageHeight, "F");

  // Accent stripe
  doc.setFillColor(accentRGB[0], accentRGB[1], accentRGB[2]);
  doc.rect(pageWidth * 0.45, 0, 4, pageHeight, "F");

  // Title elements on cover
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(255, 255, 255);
  doc.text("CLIENTUM", pageWidth * 0.52, 90);

  doc.setFontSize(20);
  doc.setTextColor(accentRGB[0], accentRGB[1], accentRGB[2]);
  doc.text("B2B Intelligent Platform", pageWidth * 0.52, 104);

  // Subtitle/Value Proposition
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(203, 213, 225);
  const sloganText = [
    "Acelere su pipeline de ventas con automatización",
    "de marketing de última generación, IA integrada,",
    "y un CRM robusto diseñado para mercados exigentes."
  ];
  let currentY = 125;
  sloganText.forEach((line) => {
    doc.text(line, pageWidth * 0.52, currentY);
    currentY += 6;
  });

  // Footer cover
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("EDICIÓN CORPORATIVA 2026", pageWidth * 0.52, pageHeight - 40);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Conexión directa con CRM, Whatsapp API & AFIP", pageWidth * 0.52, pageHeight - 34);


  // ================= PAGE 2: SOBRE CLIENTUM (EMPRESA) =================
  doc.addPage();
  drawHeaderFooter(2, "SOBRE NOSOTROS & NUESTRA MISIÓN");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text("Revolucionando el B2B", margin, 42);

  // Gold separator
  doc.setFillColor(accentRGB[0], accentRGB[1], accentRGB[2]);
  doc.rect(margin, 47, 30, 2, "F");

  // Description
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
  
  const aboutText = [
    "Clientum es la plataforma líder de inteligencia comercial B2B para Latinoamérica.",
    "Ayudamos a las empresas medianas y grandes a automatizar sus prospecciones,",
    "gestionar sus relaciones comerciales sin fricciones, y cerrar más tratos en menos tiempo.",
    "",
    "Nuestra misión es empoderar a los equipos de ventas con herramientas modernas,",
    "quitando la burocracia administrativa y trayendo inteligencia procesable a través de",
    "canales clave como WhatsApp, Email & CRM conectado de punta a punta."
  ];

  currentY = 60;
  aboutText.forEach((line) => {
    doc.text(line, margin, currentY);
    currentY += 6;
  });

  // Value Pillars (3 cards on page 2)
  const pillars = [
    { title: "Inteligencia de Datos", desc: "Encuentre perfiles ICP exactos y automatice el enriquecimiento de leads de forma nativa." },
    { title: "Omnicanalidad Real", desc: "Mantenga conversaciones fluidas integrando WhatsApp corporativo, Emails e IA en un solo pipeline." },
    { title: "Cumplimiento y AFIP", desc: "Facturación electrónica integrada directamente a las transacciones de sus clientes en segundos." }
  ];

  currentY = 120;
  pillars.forEach((p, index) => {
    // Card box
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, currentY, pageWidth - (margin * 2), 24, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, currentY, pageWidth - (margin * 2), 24, "S");

    // Accent line
    doc.setFillColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.rect(margin, currentY, 2, 24, "F");

    // Pillar title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text(p.title, margin + 5, currentY + 8);

    // Pillar desc
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
    doc.text(p.desc, margin + 5, currentY + 15);

    currentY += 32;
  });


  // ================= PAGE 3: SOLUCIONES OVERVIEW =================
  doc.addPage();
  drawHeaderFooter(3, "ECOLOGÍA DE SOLUCIONES COMERCIALES");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text("Soluciones Todo en Uno", margin, 42);

  doc.setFillColor(accentRGB[0], accentRGB[1], accentRGB[2]);
  doc.rect(margin, 47, 30, 2, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
  doc.text("Unimos las necesidades de Marketing, Ventas y Operaciones Financieras en un mismo espacio de trabajo.", margin, 56);

  // Big diagram placeholder visual block
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, 65, pageWidth - (margin * 2), 70, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, 65, pageWidth - (margin * 2), 70, "S");

  // Inside diagram labels
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text("ECOSISTEMA INTEGRADO CLIENTUM B2B", pageWidth * 0.5, 82, { align: "center" });

  doc.setFontSize(8.5);
  doc.setTextColor(textMutedRGB[0], textMutedRGB[1], textMutedRGB[2]);
  doc.text("Marketing Predictivo (ICP)   --->   WhatsApp Multiagente   --->   CRM de Cierre   --->   AFIP", pageWidth * 0.5, 96, { align: "center" });

  doc.setFillColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.rect(pageWidth * 0.2, 108, 120, 0.5, "F");

  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.setFont("helvetica", "bold");
  doc.text("EFICACIA COMPROBADA: AUMENTO DE HASTA 45% EN TASAS DE CONVERSIÓN", pageWidth * 0.5, 122, { align: "center" });

  // Features list below
  const solutionItems = [
    { name: "Prospección Automatizada", desc: "Campañas automáticas multicanal con plantillas probadas." },
    { name: "IA Generativa Integrada", desc: "Sugerencia de copys, análisis de sentimiento de leads y respuestas rápidas." },
    { name: "Gestión de Propuestas", desc: "Creación de cotizaciones y facturas profesionales con seguimiento en tiempo real." }
  ];

  currentY = 150;
  solutionItems.forEach((item) => {
    doc.setFillColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.circle(margin + 2, currentY + 4, 1.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text(item.name, margin + 8, currentY + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
    doc.text(item.desc, margin + 8, currentY + 12);

    currentY += 24;
  });


  // ================= PAGE 4: CHATBOT WHATSAPP =================
  doc.addPage();
  drawHeaderFooter(4, "CONECTIVIDAD 24/7 EN EL CANAL PREFERIDO");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text("WhatsApp API Multiagente", margin, 42);

  doc.setFillColor(accentRGB[0], accentRGB[1], accentRGB[2]);
  doc.rect(margin, 47, 30, 2, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
  doc.text("No pierda ningún cliente. Centralice sus números de WhatsApp y responda colaborativamente.", margin, 56);

  // Features
  const waFeatures = [
    "Bandeja de entrada compartida de nivel empresarial",
    "Automatización mediante Chatbots con Inteligencia Artificial integrados",
    "Campañas de envíos masivos personalizados sin riesgo de baneo",
    "Sincronización instantánea con el historial de contactos de su CRM"
  ];

  currentY = 75;
  waFeatures.forEach((feat) => {
    doc.setFillColor(16, 185, 129); // WhatsApp green accent
    doc.rect(margin, currentY, 4, 4, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
    doc.text(feat, margin + 8, currentY + 3.5);
    currentY += 12;
  });

  // Callout box
  doc.setFillColor(240, 253, 250); // Mint background
  doc.rect(margin, 135, pageWidth - (margin * 2), 40, "F");
  doc.setDrawColor(204, 251, 241);
  doc.rect(margin, 135, pageWidth - (margin * 2), 40, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 118, 110); // Dark teal
  doc.text("¿Por qué elegir WhatsApp API con Clientum?", margin + 6, 146);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(15, 118, 110);
  const waCalloutText = [
    "- Reduzca tiempos de primera respuesta de horas a solo milisegundos.",
    "- Permita que hasta 100 agentes atiendan el mismo número telefónico simultáneamente.",
    "- Automatice el 80% de las consultas frecuentes calificando leads en piloto automático."
  ];
  let calloutY = 154;
  waCalloutText.forEach((line) => {
    doc.text(line, margin + 6, calloutY);
    calloutY += 6;
  });


  // ================= PAGE 5: CRM INTELIGENTE =================
  doc.addPage();
  drawHeaderFooter(5, "CONTROL TOTAL DE SU EMBUDO DE VENTAS");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text("CRM Inteligente & AFIP", margin, 42);

  doc.setFillColor(accentRGB[0], accentRGB[1], accentRGB[2]);
  doc.rect(margin, 47, 30, 2, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
  doc.text("Un embudo visual potente con facturación integrada en la misma herramienta comercial.", margin, 56);

  // CRM Features Cards
  const crmFeatures = [
    { title: "Tableros Kanban Visuales", desc: "Mueva sus oportunidades entre etapas del embudo de forma ágil y asigne tareas con un clic." },
    { title: "Facturación AFIP Nativa", desc: "Genere facturas electrónicas A, B o C directamente vinculadas a los tratos ganados." },
    { title: "Historial de Actividades Completo", desc: "Registre cada llamada, email, reunión y chat de WhatsApp de forma cronológica." }
  ];

  currentY = 70;
  crmFeatures.forEach((feat) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, currentY, pageWidth - (margin * 2), 26, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, currentY, pageWidth - (margin * 2), 26, "S");

    doc.setFillColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.rect(margin, currentY, 3, 26, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text(feat.title, margin + 6, currentY + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
    doc.text(feat.desc, margin + 6, currentY + 16);

    currentY += 34;
  });

  // Flowchart visual box
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, 185, pageWidth - (margin * 2), 35, "F");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text("FLUJO SIMPLIFICADO DE VENTAS", pageWidth * 0.5, 195, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
  doc.text("Lead Calificado   ==>   Propuesta Enviada   ==>   Firma Digital   ==>   Factura Electrónica AFIP", pageWidth * 0.5, 208, { align: "center" });


  // ================= PAGE 6: SERVICIOS CATALOGO =================
  doc.addPage();
  drawHeaderFooter(6, "CATÁLOGO DE SERVICIOS ADICIONALES");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text("Servicios y Acompañamiento", margin, 42);

  doc.setFillColor(accentRGB[0], accentRGB[1], accentRGB[2]);
  doc.rect(margin, 47, 30, 2, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
  doc.text("Ofrecemos consultoría e implementación para acelerar el éxito de su equipo comercial.", margin, 56);

  // List of services
  const catalogServices = [
    { name: "Implementación Enterprise", price: "USD 1.500 / único", desc: "Configuración completa, onboarding de equipo, integración de bases de datos y setup de CRM a medida." },
    { name: "Capacitación de Ventas B2B", price: "USD 800 / taller", desc: "Entrenamiento práctico para que su equipo de ventas domine las prospecciones modernas y el uso de la IA." },
    { name: "Soporte Premier Dedicado", price: "USD 250 / mes", desc: "Gerente de cuenta exclusivo, soporte prioritario 24/7 y asistencia técnica directa por WhatsApp API." },
    { name: "Consultoría de Estrategia Digital", price: "USD 1.200 / mes", desc: "Diseño conjunto de embudos, estructuración de discursos de ventas y automatización de marketing avanzada." }
  ];

  currentY = 70;
  catalogServices.forEach((service) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, currentY, pageWidth - (margin * 2), 30, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, currentY, pageWidth - (margin * 2), 30, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text(service.name, margin + 6, currentY + 9);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(accentRGB[0], accentRGB[1], accentRGB[2]);
    doc.text(service.price, pageWidth - margin - 6, currentY + 9, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
    doc.text(service.desc, margin + 6, currentY + 19);

    currentY += 38;
  });


  // ================= PAGE 7: CASOS DE EXITO =================
  doc.addPage();
  drawHeaderFooter(7, "HISTORIAS REALES DE NUESTROS CLIENTES");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text("Casos de Éxito", margin, 42);

  doc.setFillColor(accentRGB[0], accentRGB[1], accentRGB[2]);
  doc.rect(margin, 47, 30, 2, "F");

  // Success Case 1
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, 60, pageWidth - (margin * 2), 64, "FD");

  doc.setFillColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.rect(margin, 60, pageWidth - (margin * 2), 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("CASO 1: Logística Sudamericana (Incremento del 320% en Leads Calificados)", margin + 6, 65.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
  
  const case1Text = [
    "Desafío: La empresa contaba con un equipo de 12 comerciales que prospectaban de forma manual",
    "en LinkedIn e emails fríos, obteniendo tasas de respuesta inferiores al 2.5%.",
    "",
    "Solución: Se implementó Clientum B2B automatizando la búsqueda de ICP, enviando correos",
    "personalizados en frío e integrando bots de precalificación por WhatsApp.",
    "",
    "Resultado: Lograron capturar un 320% más leads calificados mensuales y acortar el ciclo",
    "comercial promedio de 65 a 35 días en el primer trimestre."
  ];

  let textY = 74;
  case1Text.forEach((line) => {
    doc.text(line, margin + 6, textY);
    textY += 5.5;
  });

  // Success Case 2
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, 138, pageWidth - (margin * 2), 64, "FD");

  doc.setFillColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.rect(margin, 138, pageWidth - (margin * 2), 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("CASO 2: TecnoSaaS Argentina (Ahorro del 80% en Tiempos de Facturación)", margin + 6, 143.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
  
  const case2Text = [
    "Desafío: TecnoSaaS cerraba entre 120 y 150 contratos mensuales. Su equipo pasaba días completos",
    "copiando datos del CRM de forma manual a sistemas externos para facturar mediante AFIP.",
    "",
    "Solución: Se habilitó la facturación integrada de Clientum AFIP para emitir comprobantes",
    "electrónicos de manera inmediata al marcar un trato como ganado.",
    "",
    "Resultado: Eliminación total de errores de transcripción, ahorro inmediato de más de 30 horas",
    "mensuales del equipo administrativo, y un flujo de caja mucho más rápido."
  ];

  textY = 152;
  case2Text.forEach((line) => {
    doc.text(line, margin + 6, textY);
    textY += 5.5;
  });


  // ================= PAGE 8: PLANES & PRECIOS & CONTACTO =================
  doc.addPage();
  drawHeaderFooter(8, "COMIENCE HOY SU TRANSFORMACIÓN");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text("Planes Mensuales Adaptados", margin, 42);

  doc.setFillColor(accentRGB[0], accentRGB[1], accentRGB[2]);
  doc.rect(margin, 47, 30, 2, "F");

  // Plan 1: PyME
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, 58, (pageWidth - (margin * 2)) * 0.47, 72, "F");
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, 58, (pageWidth - (margin * 2)) * 0.47, 72, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text("Plan PYME", margin + 6, 68);

  doc.setFontSize(16);
  doc.setTextColor(accentRGB[0], accentRGB[1], accentRGB[2]);
  doc.text("USD 99 / mes", margin + 6, 78);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
  const pymeBullets = [
    "- Hasta 3 agentes comerciales",
    "- 1 Número de WhatsApp API",
    "- CRM y Embudo Kanban",
    "- Hasta 2.000 contactos",
    "- Facturación AFIP Estándar"
  ];
  let bulletY = 88;
  pymeBullets.forEach((bullet) => {
    doc.text(bullet, margin + 6, bulletY);
    bulletY += 6;
  });

  // Plan 2: Pro
  const col2X = margin + (pageWidth - (margin * 2)) * 0.53;
  doc.setFillColor(248, 250, 252);
  doc.rect(col2X, 58, (pageWidth - (margin * 2)) * 0.47, 72, "F");
  doc.setDrawColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.setLineWidth(1);
  doc.rect(col2X, 58, (pageWidth - (margin * 2)) * 0.47, 72, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text("Plan PROFESSIONAL", col2X + 6, 68);

  doc.setFontSize(16);
  doc.setTextColor(accentRGB[0], accentRGB[1], accentRGB[2]);
  doc.text("USD 199 / mes", col2X + 6, 78);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(textDarkRGB[0], textDarkRGB[1], textDarkRGB[2]);
  const proBullets = [
    "- Agentes ILIMITADOS",
    "- 2 Números WhatsApp API",
    "- CRM Inteligente + Automatizaciones",
    "- Contactos Ilimitados",
    "- API AFIP Multi-punto",
    "- Soporte Prioritario 24/7"
  ];
  bulletY = 88;
  proBullets.forEach((bullet) => {
    doc.text(bullet, col2X + 6, bulletY);
    bulletY += 5.5;
  });

  // Contact / Call to Action at the bottom
  doc.setLineWidth(0.5);
  doc.setFillColor(darkSlateRGB[0], darkSlateRGB[1], darkSlateRGB[2]);
  doc.rect(margin, 142, pageWidth - (margin * 2), 52, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text("¿LISTO PARA COMENZAR?", pageWidth * 0.5, 154, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text("Hable con uno de nuestros especialistas y obtenga un diagnóstico comercial gratuito.", pageWidth * 0.5, 163, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(accentRGB[0], accentRGB[1], accentRGB[2]);
  doc.text("info@clientum.com   ·   WhatsApp: +54 9 11 1234-5678   ·   www.clientum.com", pageWidth * 0.5, 178, { align: "center" });

  // Save the generated document directly inside the public directory
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, "brochure_clientum_2026.pdf");
  const pdfBuffer = doc.output("arraybuffer");
  fs.writeFileSync(outputPath, Buffer.from(pdfBuffer));
  
  console.log(`¡Excelente! El PDF del brochure se ha generado correctamente en: ${outputPath}`);
}

generateStaticPdf().catch((err) => {
  console.error("Error generating static brochure PDF:", err);
});
