import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    include: ['pdfjs-dist/build/pdf']
  },
  ssr: {
    noExternal: ['pdfjs-dist']
  }
});