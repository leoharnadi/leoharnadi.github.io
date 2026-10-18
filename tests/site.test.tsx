import test from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/content/projects.ts';
import { pages } from '../src/content/pages.ts';
import { createRoutes } from '../src/pages/routes.ts';
import { renderToStaticMarkup } from 'react-dom/server';
import { safeUrl } from '../src/lib/urls.ts';
import { ContentBlocks } from '../src/components/content-blocks.tsx';
import { ProjectCard } from '../src/components/project-card.tsx';
import { ProjectGrid } from '../src/components/project-grid.tsx';
import { renderRoute } from '../src/render/route.tsx';
import { DownloadPortfolio } from '../src/components/download-portfolio.tsx';
import { portfolioDownload } from '../src/content/downloads.ts';

test('every project gets a direct static URL and matching card link', () => {
  const routes = createRoutes(projects, pages);
  assert.equal(routes.filter((route) => route.kind === 'project').length, projects.length);
  for (const [index, project] of projects.entries()) {
    const route = routes.find((route) => route.path === `/projects/${project.slug}/`);
    assert.equal(route?.file, `projects/${project.slug}/index.html`);
    assert.ok(renderToStaticMarkup(<ProjectCard project={project} index={index} />).includes(`href="${route?.path}"`));
  }
});
test('new content records produce routes without editing templates', () => {
  const project = projects[0];
  const page = pages[0];
  assert.ok(project && page);
  const content = {
    projects: [...projects, { ...project, slug: 'another-project', title: 'Another project' }],
    pages: [...pages, { ...page, slug: 'another-page', title: 'Another page', navigationLabel: 'Another page' }],
  };
  const routes = createRoutes(content.projects, content.pages);
  assert.ok(routes.some((route) => route.path === '/projects/another-project/'));
  assert.ok(routes.some((route) => route.path === '/another-page/'));
  const home = routes.find((route) => route.kind === 'home');
  const detail = routes.find((route) => route.path === '/projects/another-project/');
  const extraPage = routes.find((route) => route.path === '/another-page/');
  assert.ok(home && detail && extraPage);
  assert.ok(renderRoute(home, content).includes('href="/projects/another-project/"'));
  assert.ok(renderRoute(home, content).includes('href="/another-page/"'));
  assert.ok(renderRoute(detail, content).includes('<h1>Another project</h1>'));
  assert.ok(renderRoute(extraPage, content).includes('<h1>Another page</h1>'));
});
test('unsafe and duplicate slugs cannot create conflicting output paths', () => {
  const project = projects[0];
  const page = pages[0];
  assert.ok(project && page);
  assert.throws(() => createRoutes([project, project], pages), /Duplicate route/);
  assert.throws(() => createRoutes([{ ...project, slug: '../outside' }], pages), /Invalid project slug/);
  assert.throws(() => createRoutes(projects, [{ ...page, slug: 'projects' }]), /Invalid page slug/);
});
test('content remains text and unsafe link protocols are rejected', () => {
  assert.throws(() => safeUrl('javascript:alert(1)'), /Unsupported URL/);
  assert.throws(() => safeUrl('//example.com'), /Unsupported URL/);
  assert.throws(() => safeUrl('/\\example.com'), /Unsupported URL/);
  assert.throws(() => safeUrl('https://example.com\n'), /Unsupported URL/);
  const html = renderToStaticMarkup(<ContentBlocks blocks={[{ type: 'text', paragraphs: ['<script>alert(1)</script>'] }]} />);
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(!html.includes('<script>'));
});
test('image blocks include accessible media and optional captions', () => {
  const html = renderToStaticMarkup(<ContentBlocks blocks={[{ type: 'image', image: { src: '/images/example.webp', alt: 'Project screenshot', width: 1200, height: 800, caption: 'Project overview' } }]} />);
  assert.ok(html.includes('alt="Project screenshot"'));
  assert.ok(html.includes('width="1200" height="800"'));
  assert.ok(html.includes('<figcaption>Project overview</figcaption>'));
});

test('the project grid handles an empty collection', () => {
  assert.ok(renderToStaticMarkup(<ProjectGrid projects={[]} />).includes('No projects added yet.'));
});

test('download links use the shared generated PDF path and filename', () => {
  for (const variant of ['button', 'link'] as const) {
    const html = renderToStaticMarkup(<DownloadPortfolio variant={variant} />);
    assert.ok(html.includes(`href="${portfolioDownload.path}"`));
    assert.ok(html.includes(`download="${portfolioDownload.filename}"`));
    assert.ok(html.includes('type="application/pdf"'));
  }
});

test('each route has its own heading and the shared layout', () => {
  for (const route of createRoutes(projects, pages)) {
    const html = renderRoute(route, { projects, pages });
    assert.ok(html.startsWith('<!doctype html>'));
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
    assert.ok(html.includes('<nav class="site-nav"'));
    assert.ok(html.includes('id="contact"'));
    assert.equal(html.includes('name="robots" content="noindex"'), route.kind === 'not-found');
  }
});
