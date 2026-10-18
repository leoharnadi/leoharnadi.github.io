import { portfolioDownload } from '../content/downloads.ts';

interface DownloadPortfolioProps {
  variant?: 'button' | 'link';
}

export function DownloadPortfolio({ variant = 'button' }: DownloadPortfolioProps) {
  return (
    <a
      className={variant === 'button' ? 'button button-secondary' : 'subtle-link'}
      href={portfolioDownload.path}
      download={portfolioDownload.filename}
      type="application/pdf"
    >
      {portfolioDownload.label}
    </a>
  );
}
