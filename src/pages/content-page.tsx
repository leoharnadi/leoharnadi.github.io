import type { ContentPage } from '../types/content.ts';
import { ContentBlocks } from '../components/content-blocks.tsx';
import { PageHeading } from '../components/page-heading.tsx';

export function ContentPageView({ page }: { page: ContentPage }) {
  return (
    <article className="page-content container">
      <PageHeading title={page.title} eyebrow={page.eyebrow} introduction={page.introduction} />
      <div className="prose"><ContentBlocks blocks={page.content} /></div>
    </article>
  );
}
