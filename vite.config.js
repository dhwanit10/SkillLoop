import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.js'
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
}); 