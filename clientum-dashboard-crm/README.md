# ClientumOS — Dashboard CRM / ERP / IA (App 2) 💼⚡

Plataforma unificada para gestión comercial, pipeline Kanban MEDDIC, facturación AFIP con CAE (Facturas A, B y C), agentes autónomos de IA WhatsApp, prospección geolocalizada en Google Maps y reportes ejecutivos en PDF/Excel.

---

## 🚀 Especificaciones & Runtime

- **Dominio de Producción:** [https://crm.clientum.com.ar](https://crm.clientum.com.ar)
- **Punto de Entrada:** `src/main.tsx` & `src/App.tsx`
- **Hosting sugerido:** Render Free Web Service / Vercel / Railway / Cloud Run
- **Base de Datos & Persistencia:** PostgreSQL (Neon Tech) + Firebase Auth (Google SSO)
- **Stack Tecnológico:** React 18, Vite 5, TypeScript, Tailwind CSS v4, Framer Motion, Lucide Icons, Recharts, Leaflet, jsPDF, D3.

---

## 📦 Módulos Incluidos

1. **Pipeline Kanban MEDDIC**: Gestión visual de oportunidades comerciales con calificación de métricas, decisores económicos y criterios de decisión.
2. **Facturación AFIP (CAE A/B/C)**: Generación y seguimiento de facturas electrónicas con cálculo de alícuotas e IVA.
3. **Agentes IA WhatsApp**: Automatización de conversaciones, respuestas contextuales de ventas y sincronización de mensajes.
4. **Prospección en Google Maps**: Búsqueda interactiva de empresas y prospectos B2B por zona geográfica y sector.
5. **ERP & Finanzas**: Control de clientes, empresas, tareas, contactos y flujos de trabajo automatizados.
6. **Exportación de Informes**: Generación de presupuestos y propuestas comerciales en PDF (jsPDF) y exportación a Excel/CSV.

---

## 🛠️ Instrucciones para Crear y Subir el Repositorio a GitHub

### 1. Inicializar Git dentro de la carpeta

```bash
cd clientum-dashboard-crm

git init
git branch -M main
git add .
git commit -m "feat: ClientumOS Dashboard CRM / ERP / IA (App 2)"
```

### 2. Vincular con tu repositorio en GitHub y hacer Push

Crea un repositorio en [GitHub.com](https://github.com/new) (por ejemplo `clientum-crm` o `clientum-dashboard`) y ejecuta:

```bash
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

*(O vía SSH: `git remote add origin git@github.com:TU-USUARIO/TU-REPO.git && git push -u origin main`)*

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en http://localhost:5173
npm run dev

# Compilar para producción
npm run build

# Previsualizar el build
npm run preview
```

---

© 2026 Clientum Latam. Todos los derechos reservados.
