# ClientumOS — Sitio Público & Portal de Marketing (App 1) 🚀

Sitio web oficial, catálogo comercial interactivo, simulador de WhatsApp, calculadora de ROI, cotizador de planes y páginas de aterrizaje SEO especializadas por industria para **ClientumOS** (LATAM).

---

## 📦 Características Principales

- 🌐 **Portal de Marketing Completo**: Hero dinámico, propuesta de valor, cotizador interactivo y testimonios reales.
- 🤖 **Simulador de Chatbots WhatsApp**: Demostración interactiva en vivo con agentes autónomos por sector (Agro, Salud, Distribuidoras, Contable, etc.).
- 💰 **Calculadora de ROI & Wizard de Cotización**: Presupuestador de planes (Starter, Growth, Scale, Enterprise) en ARS y USD con facturación mensual/anual.
- 🏭 **Verticales por Industria (SEO / Pauta)**: Rutas dedicadas `/agro`, `/distribuidoras`, `/estudios-contables`, `/salud`, `/inmobiliaria`, `/ecommerce`, `/construccion`, etc.
- ⚡ **Stack Tecnológico Moderno**: React 18, Vite 5, TypeScript, Tailwind CSS v4, Lucide Icons, Framer Motion, Recharts.

---

## 🛠️ Instrucciones para Crear y Subir el Repositorio a GitHub

### 1. Inicializar Git y Crear el Repositorio

Abre tu terminal dentro de esta carpeta (`clientum-web-public`):

```bash
# Entrar a la carpeta
cd clientum-web-public

# Inicializar Git
git init
git branch -M main

# Agregar todos los archivos
git add .
git commit -m "feat: initial commit - ClientumOS Public Website & Marketing Portal"
```

### 2. Vincular con tu nuevo repositorio en GitHub

Crea un repositorio vacío en [GitHub](https://github.com/new) (por ejemplo `clientum-website` o `clientum-marketing-web`) y ejecuta:

```bash
# Vincular el origen remoto (reemplaza TU-USUARIO y TU-REPO)
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git

# Subir a GitHub
git push -u origin main
```

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

---

## 🚀 Despliegue en Producción

Este proyecto es una SPA estática optimizada para desplegarse instantáneamente en:
- **Vercel** (`vercel deploy` o conexión con GitHub)
- **Cloudflare Pages** (Build command: `npm run build`, Output directory: `dist`)
- **Netlify**
- **Google Cloud Run / Firebase Hosting / AWS S3 + CloudFront**

---

© 2026 Clientum Latam. Todos los derechos reservados.
