import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: './', // This enables relative paths which are needed for GitHub Pages
  server: {
    port: 4000,
    strictPort: true, // Fail if port is already in use
  },
});