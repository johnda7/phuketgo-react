import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/phuketgo-react/' : '/',
  server: {
    port: 5173,
    strictPort: true
  },
  build: {
    outDir: 'dist'
  },
  define: {
    // Хардкодим Directus URL для production билда
    // Vite не читает .env.local при production build по дизайну
    'import.meta.env.VITE_DIRECTUS_URL': process.env.NODE_ENV === 'production' 
      ? JSON.stringify('https://phuketgo-directus-production.up.railway.app')
      : undefined
  }
});
