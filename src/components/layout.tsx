import type { ReactNode } from 'react';
import type { ContentPage } from '../types/content.ts';
import { site } from '../content/site.ts';
import { SiteHeader } from './site-header.tsx';
import { SiteFooter } from './site-footer.tsx';

interface LayoutProps {
  path: string;
  title: string;
  description: string;
  pages: readonly ContentPage[];
  children: ReactNode;
  notFound?: boolean;
}

// Restore a saved theme before paint; page content never supplies this script.
const themeScript = `try { const theme = localStorage.getItem('portfolio-theme'); if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme; } catch {}`;

export function Layout({ path, title, description, pages, children, notFound = false }: LayoutProps) {
  const documentTitle = path === '/' ? `${site.name} | ${site.role}` : `${title} | ${site.name}`;
  const url = `${site.url}${path}`;
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="color-scheme" content="dark light" />
        {notFound ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={documentTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <title>{documentTitle}</title>
        <script>{themeScript}</script>
        <script type="module" src="/src/main.ts" />
      </head>
      <body>
        <SiteHeader path={path} pages={pages} />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
