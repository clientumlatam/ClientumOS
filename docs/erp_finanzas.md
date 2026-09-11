# ERP & Facturación AFIP / MercadoPago (ClientumOS)

## Descripción General
Módulo financiero y contable integrado al CRM para emitir facturas electrónicas (AFIP con CAE), cobrar mediante links de MercadoPago y llevar el control de gastos y caja.

## Textos y Secciones Clave Extraídos de la Página

### 1. Invoicing & Facturación Electrónica AFIP
- **Tipos de Comprobantes Soportados:**
  - Factura A (Responsable Inscripto a Responsable Inscripto).
  - Factura B (A Consumidor Final / Monotributista).
  - Factura C y Nota de Crédito A/B.
- **Campos del Comprobante:**
  - CUIT del Cliente, Razón Social, Condición IVA.
  - Detalle de ítems, cantidades, alícuota de IVA (21%, 10.5%).
  - Código de Autorización Electrónica (CAE) y código de barras AFIP simulado.

### 2. Cobros & Pasarela MercadoPago
- **Generación de Links de Pago:**
  - Creación instantánea de botón de pago vinculado al deal del CRM.
- **Estado de Cobranzas:**
  - Pagos aprobados, pendientes de acreditación y rechazados.
  - Sustitución automática del estado de la oportunidad a "Cerrado / Cobrado" al recibir webhook de pago exitoso.

### 3. Control de Gastos & Inventario
- **Registro de Egresos:** Categorización de gastos operativos, software, servidores Cloud y sueldos.
- **Control de Stock / Inventario:** Gestión para PyMEs y operaciones con productos físicos o licencias digitales.
