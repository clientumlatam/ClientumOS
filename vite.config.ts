import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      chunkSizeWarningLimit: 2500,
      rollupOptions: {
        external: ['jspdf'],
        cache: false,
        maxParallelFileOps: 10,
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react/') || id.includes('react-dom/') || id.includes('react-router') || id.includes('scheduler/')) {
                return 'vendor-react';
              }
              if (id.includes('recharts') || id.includes('d3')) {
                return 'vendor-charts';
              }
              if (id.includes('leaflet')) {
                return 'vendor-maps';
              }
              if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('docx')) {
                return 'vendor-pdf';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('@google/genai')) {
                return 'vendor-ai';
              }
            }
            if (id.includes('src/components/')) {
              if (id.includes('/crm-full/')) {
                return 'components-crm-full';
              }
              if (id.includes('/vscrm/')) {
                return 'components-vscrm';
              }
              if (id.includes('PublicWebsite') || id.includes('PublicFeatureModal') || id.includes('PublicLeadFormModal')) {
                return 'components-public';
              }
              if (id.includes('Seo') || id.includes('Keyword') || id.includes('Topic') || id.includes('OnPage') || id.includes('LinkBuilding') || id.includes('RankTracker')) {
                return 'components-seo';
              }
              if (id.includes('Email') || id.includes('TemplatesTab') || id.includes('Smtp')) {
                return 'components-email';
              }
              if (id.includes('Brochure') || id.includes('IcpBuilder') || id.includes('Meddic') || id.includes('Workflow')) {
                return 'components-marketing-sales';
              }
              if (id.includes('Sidebar') || id.includes('Header') || id.includes('NavigationRail') || id.includes('CommandPalette')) {
                return 'components-navigation';
              }
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
