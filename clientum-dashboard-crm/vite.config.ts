import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@clientum/ui': path.resolve(__dirname, './packages/ui/src'),
      '@clientum/types': path.resolve(__dirname, './packages/types/src'),
      '@clientum/agents': path.resolve(__dirname, './packages/agents/src'),
      '@aime/wp-components': path.resolve(__dirname, './packages/ui/src/wp-mocks.tsx'),
    },
  },
  server: {
    host: '0.0.0.0',
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  }
});
