import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { generateSite } from './scripts/generate-site.ts';
import { portfolioPdfPlugin } from './scripts/portfolio-pdf-plugin.ts';

export default defineConfig(async () => ({
  root: resolve(import.meta.dirname, '.generated'),
  publicDir: resolve(import.meta.dirname, 'public'),
  resolve: { alias: { '/src': resolve(import.meta.dirname, 'src') } },
  plugins: [portfolioPdfPlugin(import.meta.dirname)],
  // This is a user site at the domain root, not a /repository/ project site.
  base: '/',
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    rolldownOptions: { input: await generateSite(resolve(import.meta.dirname, '.generated')) },
  },
}));
