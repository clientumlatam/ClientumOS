import fs from 'fs';
import path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  convertInchesToTwip,
  PageOrientation
} from 'docx';

async function generateCourseProposalDocx() {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
            },
          },
        },
        children: [
          // Header / Tagline
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "CLIENTUM ACADEMIA · ISSAG GENERAL ROCA",
                bold: true,
                size: 18,
                color: "4F46E5", // Indigo 600
                font: "Calibri",
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: "Propuesta de Curso de Capacitación",
                bold: true,
                size: 28,
                color: "64748B", // Slate 500
                font: "Calibri",
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 100, after: 200 },
            children: [
              new TextRun({
                text: "Marketing Digital para Principiantes",
                bold: true,
                size: 44,
                color: "0F172A", // Slate 900
                font: "Calibri",
              }),
            ],
          }),

          // Metadata Badge Bar
          new Table({
            columnWidths: [3100, 3100, 3100],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 3100, type: WidthType.DXA },
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 160, right: 160 },
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      bottom: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      left: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      right: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                    },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: "SKU: ", bold: true, size: 20, color: "475569" }),
                          new TextRun({ text: "CRS-1321", bold: true, size: 20, color: "4F46E5" }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 3100, type: WidthType.DXA },
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 160, right: 160 },
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      bottom: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      left: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      right: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                    },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: "PRECIO: ", bold: true, size: 20, color: "475569" }),
                          new TextRun({ text: "USD 15", bold: true, size: 20, color: "059669" }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 3100, type: WidthType.DXA },
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 160, right: 160 },
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      bottom: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      left: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                      right: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
                    },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: "MODALIDAD: ", bold: true, size: 20, color: "475569" }),
                          new TextRun({ text: "Presencial (Aula ISSAG)", bold: true, size: 20, color: "0F172A" }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // Divider
          new Paragraph({
            spacing: { before: 240, after: 200 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "E2E8F0" } },
            children: [],
          }),

          // 1. Descripción
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 120 },
            children: [
              new TextRun({ text: "1. Descripción del Curso", bold: true, size: 28, color: "1E293B" }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 180 },
            children: [
              new TextRun({
                text: "Curso introductorio y 100% práctico pensado para dueños de PyME, emprendedores y profesionales del Alto Valle que quieren empezar a vender y comunicar su negocio en redes sociales y canales digitales, sin conocimientos previos de marketing. Cada clase combina teoría concisa con ejercitación aplicada sobre el negocio real de cada participante.",
                size: 22,
                color: "334155",
              }),
            ],
          }),

          // 2. A quién está dirigido
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 120 },
            children: [
              new TextRun({ text: "2. A quién está dirigido", bold: true, size: 28, color: "1E293B" }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 80 },
            bullet: { level: 0 },
            children: [
              new TextRun({
                text: "Dueños y encargados de comercios del Alto Valle que todavía no tienen presencia digital ordenada.",
                size: 22,
                color: "334155",
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 80 },
            bullet: { level: 0 },
            children: [
              new TextRun({
                text: "Emprendedores que arrancan un proyecto y necesitan una base sólida de marketing y ventas.",
                size: 22,
                color: "334155",
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 180 },
            bullet: { level: 0 },
            children: [
              new TextRun({
                text: "Personal administrativo o comercial que busca sumar herramientas digitales prácticas a su rol profesional.",
                size: 22,
                color: "334155",
              }),
            ],
          }),

          // 3. Objetivos de Aprendizaje
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 120 },
            children: [
              new TextRun({ text: "3. Objetivos de Aprendizaje", bold: true, size: 28, color: "1E293B" }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 120 },
            children: [
              new TextRun({
                text: "Al finalizar el programa de 6 módulos, el participante estará capacitado para:",
                size: 22,
                color: "334155",
                italics: true,
              }),
            ],
          }),
          ...[
            "Comprender los fundamentos del marketing digital y cómo aplican a un negocio PyME real.",
            "Definir su público objetivo, propuesta de valor y un mensaje de marca simple pero persuasivo.",
            "Crear, optimizar y vincular perfiles de Instagram, Facebook, Google My Business y WhatsApp Business para captar consultas comerciales.",
            "Planificar contenido consistente con un calendario editorial de fácil mantenimiento.",
            "Reconocer cuándo y cómo invertir en publicidad paga en Meta Ads sin complejidades técnicas.",
            "Interpretar métricas básicas (alcance, mensajes recibidos, costo por consulta) para evaluar el retorno.",
          ].map((obj, i) =>
            new Paragraph({
              spacing: { before: 40, after: 60 },
              children: [
                new TextRun({ text: `${i + 1}. `, bold: true, color: "4F46E5", size: 22 }),
                new TextRun({ text: obj, color: "334155", size: 22 }),
              ],
            })
          ),

          // 4. Módulos y Carga Horaria
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 260, after: 140 },
            children: [
              new TextRun({ text: "4. Estructura de Módulos y Carga Horaria", bold: true, size: 28, color: "1E293B" }),
            ],
          }),
          new Table({
            columnWidths: [1400, 5800, 2100],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 1400, type: WidthType.DXA },
                    shading: { fill: "1E293B", type: ShadingType.CLEAR },
                    margins: { top: 100, bottom: 100, left: 120, right: 120 },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "MÓDULO", bold: true, color: "FFFFFF", size: 20 })],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 5800, type: WidthType.DXA },
                    shading: { fill: "1E293B", type: ShadingType.CLEAR },
                    margins: { top: 100, bottom: 100, left: 120, right: 120 },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "TEMA PRINCIPAL & PRÁCTICA", bold: true, color: "FFFFFF", size: 20 })],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 2100, type: WidthType.DXA },
                    shading: { fill: "1E293B", type: ShadingType.CLEAR },
                    margins: { top: 100, bottom: 100, left: 120, right: 120 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [new TextRun({ text: "DURACIÓN", bold: true, color: "FFFFFF", size: 20 })],
                      }),
                    ],
                  }),
                ],
              }),
              ...[
                { mod: "Módulo 1", tema: "Fundamentos del marketing digital para PyMEs (ecosistema digital del Alto Valle)", dur: "2 hs" },
                { mod: "Módulo 2", tema: "Definición de público, cliente ideal y propuesta de valor diferenciadora", dur: "2 hs" },
                { mod: "Módulo 3", tema: "Redes sociales para vender: Instagram, Facebook y WhatsApp Business", dur: "3 hs" },
                { mod: "Módulo 4", tema: "Calendario de contenido, formatos de alto impacto y buenas prácticas", dur: "2 hs" },
                { mod: "Módulo 5", tema: "Introducción a la publicidad paga (primeras campañas en Meta Ads)", dur: "2 hs" },
                { mod: "Módulo 6", tema: "Métricas básicas, seguimiento y cierre con plan de acción individual", dur: "2 hs" },
              ].map((row, idx) =>
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 1400, type: WidthType.DXA },
                      shading: { fill: idx % 2 === 0 ? "F8FAFC" : "FFFFFF", type: ShadingType.CLEAR },
                      margins: { top: 100, bottom: 100, left: 120, right: 120 },
                      borders: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" } },
                      children: [
                        new Paragraph({
                          children: [new TextRun({ text: row.mod, bold: true, color: "0F172A", size: 20 })],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: { size: 5800, type: WidthType.DXA },
                      shading: { fill: idx % 2 === 0 ? "F8FAFC" : "FFFFFF", type: ShadingType.CLEAR },
                      margins: { top: 100, bottom: 100, left: 120, right: 120 },
                      borders: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" } },
                      children: [
                        new Paragraph({
                          children: [new TextRun({ text: row.tema, color: "334155", size: 20 })],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: { size: 2100, type: WidthType.DXA },
                      shading: { fill: idx % 2 === 0 ? "F8FAFC" : "FFFFFF", type: ShadingType.CLEAR },
                      margins: { top: 100, bottom: 100, left: 120, right: 120 },
                      borders: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" } },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.RIGHT,
                          children: [new TextRun({ text: row.dur, bold: true, color: "4F46E5", size: 20 })],
                        }),
                      ],
                    }),
                  ],
                })
              ),
              // Total Row
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 7200, type: WidthType.DXA },
                    shading: { fill: "EEF2FF", type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 120, right: 120 },
                    columnSpan: 2,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "CARGA HORARIA TOTAL (6 Módulos / Clases Presenciales + Práctica Guiada):", bold: true, color: "3730A3", size: 20 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 2100, type: WidthType.DXA },
                    shading: { fill: "EEF2FF", type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 120, right: 120 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({ text: "13 hs reloj", bold: true, color: "4338CA", size: 22 }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // 5. Condiciones de Dictado e Inscripción
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 260, after: 120 },
            children: [
              new TextRun({ text: "5. Condiciones de Dictado e Inscripción", bold: true, size: 28, color: "1E293B" }),
            ],
          }),
          new Paragraph({
            spacing: { before: 40, after: 60 },
            children: [
              new TextRun({ text: "• Sede: ", bold: true, color: "0F172A", size: 22 }),
              new TextRun({ text: "Aula ISSAG General Roca (Cnel. Rodhe 55, General Roca, Río Negro).", color: "334155", size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 40, after: 60 },
            children: [
              new TextRun({ text: "• Modalidad: ", bold: true, color: "0F172A", size: 22 }),
              new TextRun({ text: "Presencial con soporte y campus virtual complementario.", color: "334155", size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 40, after: 60 },
            children: [
              new TextRun({ text: "• Cupo Mínimo: ", bold: true, color: "0F172A", size: 22 }),
              new TextRun({ text: "10 inscriptos para apertura de comisión (Capacidad cohorte piloto: 145 vacantes).", color: "334155", size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 40, after: 60 },
            children: [
              new TextRun({ text: "• Fecha de Inicio: ", bold: true, color: "0F172A", size: 22 }),
              new TextRun({ text: "1 de septiembre de 2026.", bold: true, color: "4F46E5", size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 40, after: 60 },
            children: [
              new TextRun({ text: "• Condiciones de Pago: ", bold: true, color: "0F172A", size: 22 }),
              new TextRun({ text: "Inscripción vía formulario web con seña del 30% para reserva de vacante.", color: "334155", size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 40, after: 180 },
            children: [
              new TextRun({ text: "• Cierre de Inscripción: ", bold: true, color: "0F172A", size: 22 }),
              new TextRun({ text: "3 días previos al inicio de la cursada.", color: "334155", size: 22 }),
            ],
          }),

          // 6. Precios y Canales de Venta
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 220, after: 120 },
            children: [
              new TextRun({ text: "6. Canales de Comercialización y Precios", bold: true, size: 28, color: "1E293B" }),
            ],
          }),
          new Table({
            columnWidths: [6300, 3000],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 6300, type: WidthType.DXA },
                    shading: { fill: "334155", type: ShadingType.CLEAR },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "CANAL DE VENTA", bold: true, color: "FFFFFF", size: 20 })] })],
                  }),
                  new TableCell({
                    width: { size: 3000, type: WidthType.DXA },
                    shading: { fill: "334155", type: ShadingType.CLEAR },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "PRECIO FINAL", bold: true, color: "FFFFFF", size: 20 })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 6300, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "ISSAG General Roca (Venta Presencial)", size: 20, color: "0F172A" })] })],
                  }),
                  new TableCell({
                    width: { size: 3000, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "USD 15", bold: true, size: 20, color: "059669" })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 6300, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Campus Virtual (clientum.com.ar)", size: 20, color: "0F172A" })] })],
                  }),
                  new TableCell({
                    width: { size: 3000, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "USD 15", bold: true, size: 20, color: "059669" })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 6300, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Plataforma Hotmart (LATAM)", size: 20, color: "0F172A" })] })],
                  }),
                  new TableCell({
                    width: { size: 3000, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "USD 15", bold: true, size: 20, color: "059669" })] })],
                  }),
                ],
              }),
            ],
          }),

          // Footer / Note
          new Paragraph({
            spacing: { before: 300, after: 100 },
            children: [
              new TextRun({
                text: "Documento oficial generado por Clientum Academia en convenio de extensión con ISSAG General Roca. Sujeto a confirmación final de calendario lectivo.",
                italics: true,
                size: 18,
                color: "94A3B8",
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  
  // Guardar en docs y en public para descarga web
  const outputDirs = [
    path.join(process.cwd(), 'public', 'docs', 'academia'),
    path.join(process.cwd(), 'docs', 'academia'),
    path.join(process.cwd(), 'public', 'propuestas')
  ];

  for (const dir of outputDirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const fileName = 'Propuesta_Curso_Marketing_Digital_Principiantes_CRS-1321.docx';
  for (const dir of outputDirs) {
    fs.writeFileSync(path.join(dir, fileName), buffer);
    console.log(`Documento creado en: ${path.join(dir, fileName)}`);
  }

  // Copiar también con el nombre estándar que busca la UI
  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'docs', 'academia', 'clientum-academia-propuesta-issag.docx'),
    buffer
  );
  console.log('Generación exitosa de todos los archivos .docx');
}

generateCourseProposalDocx().catch(console.error);
