import { defineConfig } from 'vite';

export default defineConfig({
  // This is a user site at the domain root, not a /repository/ project site.
  base: '/',
  build: {
    outDir: 'dist',
  },
});
