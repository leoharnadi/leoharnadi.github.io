import type { Plugin } from 'vite';
import { resolve } from 'node:path';
import { projects } from '../src/content/projects.ts';
import { portfolioDownload } from '../src/content/downloads.ts';
import { createPortfolioPdf } from './pdf/portfolio.ts';

export function portfolioPdfPlugin(projectRoot: string): Plugin {
  const generate = () => createPortfolioPdf({ projects, publicDir: resolve(projectRoot, 'public') });
  return {
    name: 'portfolio-pdf',
    async generateBundle() {
      const { bytes } = await generate();
      this.emitFile({ type: 'asset', fileName: portfolioDownload.path.slice(1), source: bytes });
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (request.url?.split('?')[0] !== portfolioDownload.path || !['GET', 'HEAD'].includes(request.method ?? '')) return next();
        void generate().then(({ bytes }) => {
          response.setHeader('Content-Type', 'application/pdf');
          response.setHeader('Content-Disposition', `attachment; filename="${portfolioDownload.filename}"`);
          response.setHeader('Cache-Control', 'no-store');
          response.setHeader('Content-Length', bytes.length);
          response.end(request.method === 'HEAD' ? undefined : bytes);
        }).catch((error: unknown) => {
          server.config.logger.error(error instanceof Error ? error.message : String(error));
          response.statusCode = 500;
          response.end('Could not generate the portfolio PDF. Check the development server log.');
        });
      });
    },
  };
}
