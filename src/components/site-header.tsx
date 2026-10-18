import { site } from '../content/site.ts';
import type { ContentPage } from '../types/content.ts';

interface SiteHeaderProps {
  path: string;
  pages: readonly ContentPage[];
}

export function SiteHeader({ path, pages }: SiteHeaderProps) {
  const onWork = path === '/' || path.startsWith('/projects/');
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header container">
        <a className="brand" href="/" aria-label={`${site.name}, home`}>
          {site.name}<span>Software developer &amp; tutor</span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="/#work" className={onWork ? 'is-current' : undefined}>Projects</a>
          {pages.filter((page) => page.navigationLabel).map((page) => (
            <a key={page.slug} href={`/${page.slug}/`} aria-current={path === `/${page.slug}/` ? 'page' : undefined}>
              {page.navigationLabel}
            </a>
          ))}
          <a href="#contact">Contact</a>
        </nav>
        <button className="theme-toggle" type="button" data-theme-toggle hidden>Light mode</button>
      </header>
    </>
  );
}
