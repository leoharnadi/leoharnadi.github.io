import { site } from '../content/site.ts';
import { safeUrl } from '../lib/urls.ts';
import { DownloadPortfolio } from './download-portfolio.tsx';

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container contact-content">
        <div>
          <h2>Contact</h2>
          <p>Email me about development work or tutoring.</p>
        </div>
        <div className="contact-links">
          <a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a>
          <a className="subtle-link" href={safeUrl(site.github)}>GitHub</a>
          <DownloadPortfolio variant="link" />
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© <span data-year>{new Date().getFullYear()}</span> {site.name}</p>
        <p>{site.location}</p>
      </div>
    </footer>
  );
}
