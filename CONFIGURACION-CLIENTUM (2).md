# ⚙️ CONFIGURACIÓN - AUTOMATIZACIÓN EN CLIENTUM

**Objetivo:** Automatizar campañas de WhatsApp y Email para Shawarman Cátering  
**Plataforma:** Clientum.com.ar  
**Leads:** 47 contactos consolidados  

---

## 1️⃣ IMPORTAR LEADS A CLIENTUM

### Paso 1: Preparar CSV

Exportar desde `SHAWARMAN-LEADS-CONSOLIDADOS.xlsx`:
- Guardar como CSV (UTF-8)
- Columnas necesarias: `ID`, `Nombre`, `Teléfono`, `Email`, `Segmento`, `Canal Prioritario`
- Archivo: `shawarman-leads.csv`

### Paso 2: Crear Contacto Masivo

```
Dashboard Clientum → CRM → Contactos → Importar CSV

✓ Archivo: shawarman-leads.csv
✓ Mapeo de campos:
  - Nombre → Nombre
  - Teléfono → WhatsApp (si Canal = WhatsApp)
  - Email → Email
  - Segmento → Etiqueta
  - Estado: "Por contactar" (default)

✓ Tags automáticos:
  - shawarman-catering
  - [Segmento: gremio|colegio|empresa]
  - fase-1-presentacion
```

### Paso 3: Verificar Importación

```
Total contactos: 47
✓ Con WhatsApp: 43
✓ Con Email: 0
✓ Con Teléfono: 4

Problemas detectados: [si los hay]
```

---

## 2️⃣ CREAR FLUJO FASE 1: PRESENTACIÓN

**Trigger:** Contacto creado + Tag "fase-1-presentacion"  
**Acción:** Envío automático WhatsApp  
**Horario:** 10:00 hs (lunes-viernes)

### Configuración

```
Automations → Crear nuevo workflow

TRIGGER:
  ├─ Tipo: Tag added
  ├─ Tag: "fase-1-presentacion"
  └─ Condición: Contacto has "shawarman-catering" tag

DELAY: None (enviar inmediatamente)

ACTION 1: SEND WHATSAPP MESSAGE
  ├─ Template: "Presentación Shawarman"
  ├─ Contenido:
  │   "Hola {nombre},
  │
  │    Somos Shawarman Cátering 🍽️
  │    
  │    ✅ Catering profesional para gremios, colegios y empresas
  │    📍 General Roca y zona
  │    🎯 Menús personalizados | Eventos corporativos
  │
  │    ¿Te gustaría conocer nuestros servicios?
  │    
  │    👉 [LINK CATÁLOGO PDF si existe]"
  │
  └─ Enviar a: {whatsapp}

WAIT: 3 days

ACTION 2: SEND WHATSAPP FOLLOWUP (si no respondió)
  ├─ Condición: No response received
  ├─ Contenido:
  │   "Hola {nombre},
  │    
  │    ¿Viste el catálogo? Si te interesa,
  │    podemos armar algo especial para {segmento}.
  │    
  │    Disponible para una llamada 📞"
  │
  └─ Enviar a: {whatsapp}

TAG MANAGEMENT:
  ├─ Si responde: Add tag "fase-2-interesado"
  └─ Si no responde en 3 días: Remove tag, reintent en 7 días
```

---

## 3️⃣ CREAR FLUJO FASE 2: PROPUESTA

**Trigger:** Responde a Fase 1 + Tag "fase-2-interesado"  
**Acción:** Envío de propuesta (Email si disponible, sino WhatsApp)

### Configuración

```
Automations → Crear nuevo workflow

TRIGGER:
  ├─ Tipo: Specific keyword detected in response
  ├─ Keywords: ["interés", "precio", "presupuesto", "cómo", "cuánto"]
  └─ Source: WhatsApp message

ACTION 1: SEND EMAIL PROPOSAL (si Email disponible)
  ├─ Template: "Propuesta Shawarman - {segmento}"
  ├─ Subject: "Tu propuesta exclusiva de catering"
  ├─ Contenido HTML: [usar template email-1-presentacion.html adaptado]
  └─ Enviar a: {email}

ACTION 2 (ELSE): SEND WHATSAPP MESSAGE
  ├─ Contenido:
  │   "Perfecto {nombre}!
  │    
  │    Te envío las opciones que tenemos para {segmento}:
  │    
  │    📋 Opción 1: Menú básico ($)
  │    📋 Opción 2: Menú premium ($$)
  │    📋 Opción 3: Menú personalizado ($$$)
  │    
  │    ¿Cuál te interesa?"
  │
  └─ Enviar a: {whatsapp}

WAIT: 5 days

ACTION 3: FOLLOW-UP
  ├─ Condición: No response to email/WhatsApp
  ├─ Mensaje: "¿Aún interesado? Te damos mas info"
  └─ Enviar a: {whatsapp}

TAG MANAGEMENT:
  ├─ Recibió propuesta: Add tag "fase-3-propuesta-enviada"
  └─ Pidió info: Add tag "manual-follow-up"
```

---

## 4️⃣ CREAR FLUJO FASE 3-4: MANUAL

**Tipo:** Manual/Reminder para equipo  
**Acción:** Notificación a Jonathan para contacto personal

### Configuración

```
Automations → Crear nuevo workflow

TRIGGER:
  ├─ Tag: "manual-follow-up"
  └─ Tiempo: 5 days after tag added

ACTION: SEND NOTIFICATION TO TEAM
  ├─ Tipo: Email a Jonathan
  ├─ Contenido:
  │   "Contacto {nombre} ({segmento}) pidió info.
  │    
  │    Última interacción: {fecha}
  │    Propuesta enviada: [sí/no]
  │    
  │    👉 Hacer call/WhatsApp personal"
  │
  └─ Prioridad: High

TAGS:
  ├─ Add: "fase-4-cierre-manual"
  └─ Remove: "manual-follow-up"
```

---

## 5️⃣ TAGS & SEGMENTACIÓN

Crear las siguientes etiquetas en Clientum:

```
CAMPAÑAS:
├─ shawarman-catering (todos)
├─ fase-1-presentacion
├─ fase-2-interesado
├─ fase-3-propuesta-enviada
└─ fase-4-cierre-manual

SEGMENTOS:
├─ segmento-gremio
├─ segmento-colegio
└─ segmento-empresa

ESTADOS:
├─ por-contactar
├─ respondio-positivo
├─ respondio-negativo
└─ cliente-convertido
```

---

## 6️⃣ TEMPLATES DE MENSAJES

### WhatsApp Template 1: Presentación

```
Hola {nombre},

¡Bienvenida Shawarman Cátering! 🍽️

Sabemos que en {segmento} necesitan catering de calidad
para sus eventos y reuniones.

✅ Menús profesionales
✅ Servicio integral
✅ Precios competitivos
📍 General Roca y zona

¿Te interesa conocer más?

👉 [CATÁLOGO PDF]
```

### Email Template 1: Presentación Formal

```
Subject: "Catering profesional para [Segmento]"

Hola {nombre},

En Shawarman Cátering nos especializamos en servicios
de catering para {segmento}s con eventos y reuniones.

[CATÁLOGO HTML]

¿Queres que armemos una propuesta?

Disponible para una reunión 📞

Saludos,
Shawarman Cátering
General Roca, Patagonia
```

### Email Template 2: Propuesta Formal

```
Subject: "Tu propuesta exclusiva - Shawarman Cátering"

Hola {nombre},

Basado en tu interés en {segmento}, te presentamos
nuestra propuesta:

OPCIÓN 1: Menú Básico
- Descripción
- Precio por persona: $XXX
- Incluye: [detalles]

OPCIÓN 2: Menú Premium
- Descripción
- Precio por persona: $XXX
- Incluye: [detalles]

OPCIÓN 3: Menú Personalizado
- Consultanos para presupuesto
- Menú 100% adaptado

PRÓXIMOS PASOS:
1. Elegí una opción
2. Confirmá fecha + cantidad
3. Damos detalles finales

¿Cuándo podemos charlar?

Saludos,
Shawarman Cátering
```

---

## 7️⃣ CALENDARIOS & HORARIOS

### Horarios de Envío Óptimos

```
WhatsApp:
  ├─ Lunes-Viernes: 10:00, 14:00 hs
  └─ Evitar: Fines de semana, 22:00+

Email:
  ├─ Martes-Jueves: 09:00, 14:00 hs
  └─ Evitar: Viernes PM, Lunes temprano
```

### Calendario de Fases

```
SEMANA 1 (Aug 1-7):
  ├─ Lunes 1: Importar leads a Clientum
  ├─ Martes 2: Activar Fase 1 (presenta)
  ├─ Viernes 5: Revisar respuestas
  └─ Domingo 7: Análisis semanal

SEMANA 2 (Aug 8-14):
  ├─ Lunes 8: Activar Fase 2 (interesados)
  ├─ Viernes 12: Revisar propuestas enviadas
  └─ Domingo 14: REUNIÓN MIÉRCOLES 14:00 hs

SEMANA 3 (Aug 15-21):
  ├─ Martes 15: Activar Fase 3 (propuesta formal)
  ├─ Jueves 17: Follow-ups manuales
  └─ Domingo 21: Análisis semanal

SEMANA 4 (Aug 22-31):
  ├─ Lunes 22: Cierre manual (calls)
  ├─ Jueves 25: Push final a no-responden
  └─ Viernes 31: Cierre de mes / resultados finales
```

---

## 8️⃣ TRACKING & REPORTE

### Exportar Datos a Google Sheets

```
Cada viernes:

Dashboard Clientum → Reportes → Contactos

Filtrar por: Tag "shawarman-catering"
Columnas: 
  - Nombre
  - Segmento
  - Estado (respondió/no)
  - Tags (qué fase)
  - Último mensaje
  - Fecha contacto

Exportar CSV → Importar a Google Sheet de tracking
```

### Métricas a Trackear

```
✓ Total enviados (Fase 1)
✓ Respuestas recibidas (%)
✓ En Fase 2 (interesados)
✓ Propuestas enviadas (Fase 3)
✓ Conversiones (Fase 4)
✓ Tasa por segmento
✓ Tasa por canal
```

---

## 9️⃣ TROUBLESHOOTING

### Problema: No llegan mensajes WhatsApp

**Solución:**
1. Verificar número en formato: +54 299 XXXXX (con 0 al final si es celular)
2. Confirmar que Clientum tiene permisos en Evolution API
3. Probar con un contacto piloto (Jonathan)

### Problema: Bajo engagement

**Solución:**
1. Cambiar horario de envío
2. Revisar copy del mensaje
3. Probar segmentación diferente
4. Agregar urgencia ("limitado", "esta semana", etc.)

### Problema: Muchos "no interesado"

**Solución:**
1. Revisar si es el segmento correcto
2. Cambiar propuesta de valor
3. Ofrecer descuento inicial
4. Hacer call personal antes de descartar

---

## 🔟 CHECKLIST DE IMPLEMENTACIÓN

```
□ Consolidar leads (HECHO)
□ Importar a Clientum
□ Crear tags
□ Setup Fase 1 workflow
□ Setup Fase 2 workflow
□ Setup manual follow-up
□ Crear templates WhatsApp/Email
□ Probar con 5 contactos piloto
□ Verificar entregas
□ Ajustar copy según respuestas
□ Lanzar a todos los 47 leads
□ Crear Google Sheet tracking
□ Configurar reunión semanal
```

---

**Próximo paso:** Confirmar que Clientum está listo → Lanzar Fase 1

