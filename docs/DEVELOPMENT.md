# 💻 Guía de Desarrollo, Convenciones de Código & Depuración

Este documento establece los estándares de ingeniería, la estructura de directorios, las convenciones de código y los procedimientos de depuración para los desarrolladores que trabajan en el repositorio de **Clientum Latam**.

---

## 1. 📂 Estructura Detallada del Monorepo

```
.
├── apps/
│   ├── landing/                  # Aplicación Frontend Principal (Puerto 3000)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── crm-full/     # Pipeline, WhatsApp, MEDDIC, Mapas, Propuestas, ERP
│   │   │   │   ├── public/       # Componentes de la landing y verticales de industria
│   │   │   │   └── ui/           # Primitivos UI locales
│   │   │   ├── context/          # CRMContext y Proveedor Global de Estado
│   │   │   ├── types/            # Tipos de la aplicación landing
│   │   │   └── App.tsx           # Enrutador principal y layout
│   │   ├── public/               # Assets estáticos y Service Worker (sw.js)
│   │   └── vite.config.ts        # Configuración de Vite, Rollup Chunks y Alias
│   │
│   ├── dashboard/                # Portal Administrativo / Tenant Hub
│   │   ├── src/
│   │   │   ├── components/       # Vistas de métricas, inventario y finanzas
│   │   │   └── App.tsx
│   │   └── vite.config.ts
│   │
│   └── api/                      # Backend Express REST
│       └── src/
│           ├── db.ts             # Pool de PostgreSQL (Neon) con reconexión
│           ├── mailer.ts         # Servicio Nodemailer SMTP
│           ├── smtp.ts           # Cargador de credenciales con fallback
│           └── index.ts          # Endpoints de API y handlers de webhook
│
├── packages/
│   ├── ui/                       # Componentes compartidos de UI y diseño
│   ├── types/                    # Interfaces y contratos TypeScript comunes
│   └── agents/                   # Lógica de los 14 agentes de IA
│
├── .env.example                  # Plantilla de variables de entorno y Free Tier
├── turbo.json                    # Configuración del pipeline de Turborepo
└── package.json                  # Workspaces y scripts raíz
```

---

## 2. 📐 Convenciones de Código & Estándares

### 2.1. TypeScript & Tipado Estricto
- **Cero uso de `any` no justificado**: Todas las interfaces de datos deben definirse en `packages/types` o en archivos `.d.ts` locales.
- **Importaciones Nombradas**: Utilizar siempre importaciones nombradas en la parte superior del archivo.
  ```typescript
  // ✅ Correcto
  import { useState, useEffect, useMemo } from 'react';
  import { Lead, PipelineStage } from '@clientum/types';

  // ❌ Incorrecto
  import * as React from 'react';
  ```
- **Enums**: Utilizar declaraciones estándar `enum` (evitar `const enum` para compatibilidad con transpiladores modernos).

### 2.2. Estilos con Tailwind CSS
- **Sin CSS en archivos externos**: Toda la estilización se realiza mediante clases utilitarias de Tailwind CSS.
- **Diseño Responsive Mobile-First**: Diseñar con breakpoints ascendentes (`sm:`, `md:`, `lg:`, `xl:`).
- **Accesibilidad & Contraste**: Los textos deben cumplir un ratio mínimo de contraste de 4.5:1 (WCAG AA).
- **IDs Únicos en Elementos Interactivos**: Todos los botones, modales, formularios y tarjetas clave deben contar con un atributo `id` único para accesibilidad y pruebas automatizadas.

### 2.3. Manejo de Estado & React Hooks
- Mantener los componentes funcionales puros y modularizados (máximo 300-400 líneas por archivo).
- Extraer la lógica de manipulación de datos a custom hooks o al contexto global `useCRM()`.

---

## 3. 🛠️ Scripts de Utilidad para el Equipo

### 3.1. Generación de Claves VAPID (Web Push Notifications)
Para habilitar notificaciones push en el navegador sin servicios pagos externos:
```bash
npx web-push generate-vapid-keys
```
Copia la clave pública en `VAPID_PUBLIC_KEY` y la privada en `VAPID_PRIVATE_KEY` dentro de tu `.env`.

### 3.2. Generación de Secretos Criptográficos
Para generar cadenas seguras de 32 bytes para `BETTER_AUTH_SEC`, `SESSION_SECRET` y `CRON_SECRET`:
```bash
openssl rand -hex 32
```

### 3.3. Testeo del Transporte de Correo SMTP
Para probar el envío de correos desde la consola local usando el backend:
```bash
node -e "import('./apps/api/src/mailer.js').then(m => m.createMailTransport().verify().then(() => console.log('SMTP OK')).catch(console.error))"
```

---

## 4. 🐞 Procesos de Depuración y Resolución de Problemas

### 4.1. Diagnóstico del Servidor de Desarrollo (Vite)
Si la aplicación no responde en `http://localhost:3000`:
1. Verificar que el proceso no esté ocupado por otra instancia:
   ```bash
   lsof -i :3000
   ```
2. Comprobar que en `apps/landing/vite.config.ts` el servidor esté configurado con:
   ```typescript
   server: {
     host: '0.0.0.0',
     port: 3000,
     hmr: process.env.DISABLE_HMR !== 'true',
   }
   ```

### 4.2. Depuración de Errores de Base de Datos (PostgreSQL Pool)
En `apps/api/src/db.ts`, el pool de conexiones maneja eventos de error en clientes inactivos de forma silenciosa para evitar caídas del servidor:
```typescript
pgPool.on('error', (err: any) => {
  console.error('Error inesperado en cliente inactivo de PostgreSQL:', err);
});
```
- Si la base de datos no está disponible (ej: Neon pausado en Free Tier), la aplicación activa automáticamente el **modo de persistencia en memoria y LocalStorage**.

### 4.3. Inspección del Tamaño de Chunks (Rollup)
Si la compilación de Vite advierte sobre paquetes de gran tamaño (>500 kB), verificar que `manualChunks` en `vite.config.ts` clasifique las librerías pesadas en sus respectivos grupos:
- `vendor-react` (`react`, `react-dom`, `react-router-dom`)
- `vendor-maps` (`leaflet`)
- `vendor-charts` (`recharts`, `d3`)
- `vendor-pdf` (`jspdf`, `html2canvas`)
- `vendor-ai` (`@google/genai`)

### 4.4. Comandos de Validación Rápida
Antes de enviar un Pull Request o desplegar, ejecutar:
```bash
# Validar compilación global
npm run build
# Compila el frontend y empaqueta el backend en ./dist/server.cjs
```

---

&copy; 2026 Clientum Latam. Todos los derechos reservados.
