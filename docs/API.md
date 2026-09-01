# 🔌 Referencia de Endpoints de la API REST (`apps/api`)

La API del ecosistema **Clientum Latam** está implementada con Express.js y TypeScript, proveyendo servicios seguros para la autenticación, prospección con IA, envío de correos y webhooks.

---

## 1. 🔐 Autenticación & Usuarios

### `POST /api/auth/register`
Registra una nueva cuenta corporativa y crea su espacio de trabajo inicial.
- **Request Body**:
  ```json
  {
    "name": "Juan Pérez",
    "email": "juan@empresa.com",
    "password": "PasswordSeguro123!",
    "companyName": "Empresa S.A."
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "success": true,
    "user": {
      "id": "usr_123",
      "name": "Juan Pérez",
      "email": "juan@empresa.com",
      "role": "admin"
    }
  }
  ```

### `POST /api/auth/login`
Autenticación tradicional por correo y contraseña.

### `POST /api/auth/forgot-password`
Genera un token de restablecimiento seguro y dispara el correo transaccional vía SMTP.

---

## 2. 🤖 IA & Orquestación con Gemini

### `POST /api/ai/generate-copy`
Genera copys persuasivos para correos, anuncios y mensajes de WhatsApp.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "prompt": "Generar mensaje de primer contacto para directores de logística en Córdoba",
    "tone": "profesional",
    "channel": "whatsapp"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "result": "Hola [Nombre], estuve viendo la operativa de distribución de [Empresa]...",
    "tokensUsed": 142
  }
  ```

### `POST /api/ai/score-meddic`
Evalúa las respuestas de una oportunidad comercial y devuelve el puntaje MEDDIC y recomendaciones de cierre.

---

## 3. 🗺️ Prospección Geolocalizada & Google Places

### `POST /api/prospecting/search`
Busca prospectos comerciales en una localidad determinada mediante la API de Google Places.
- **Request Body**:
  ```json
  {
    "keyword": "distribuidora de alimentos",
    "city": "Rosario, Santa Fe",
    "radiusKm": 15
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "total": 24,
    "places": [
      {
        "company": "Distribuidora Central SRL",
        "address": "Av. Pellegrini 1234, Rosario",
        "rating": 4.6,
        "phone": "+54 341 555 1234",
        "website": "https://distribuidoracentral.com.ar"
      }
    ]
  }
  ```

---

## 4. 💬 Webhooks & WhatsApp Meta Cloud API

### `GET /api/whatsapp/webhook`
Endpoint de verificación para Meta Developers (valida `hub.verify_token` contra `META_WA_VERIFY_TOKEN`).

### `POST /api/whatsapp/webhook`
Recepción de eventos en tiempo real (mensajes entrantes, confirmaciones de entrega y lecturas).

---

## 5. 📧 Servicio de Correo Transaccional

### `POST /api/mailer/send`
Envía un correo transaccional utilizando el transporte configurado (Gmail, Brevo, Resend).
- **Request Body**:
  ```json
  {
    "to": "cliente@empresa.com",
    "subject": "Tu cotización personalizada de Clientum OS",
    "template": "quote_notification",
    "data": {
      "clientName": "Carlos López",
      "proposalUrl": "https://crm.clientum.com.ar/propuesta/prop_789"
    }
  }
  ```

---

## 6. 📊 Facturación Electrónica AFIP (Simulador & Gateway)

### `POST /api/erp/invoices/issue`
Genera y firma un comprobante electrónico (Facturas A, B, C) calculando alícuotas de IVA y obteniendo el CAE.

---

&copy; 2026 Clientum Latam. Todos los derechos reservados.
