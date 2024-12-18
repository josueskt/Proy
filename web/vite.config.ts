import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      external: ['ng2-pdf-viewer'], 
    }
  },
  server: {
    hmr: false, // Esto puede desactivar los errores de recarga en caliente, si es necesario
  },
});
