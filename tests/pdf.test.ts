import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { createPortfolioPdf, localImagePath } from '../scripts/pdf/portfolio.ts';
import { projects } from '../src/content/projects.ts';

const publicDir = resolve(import.meta.dirname, '../public');

test('PDF includes all project records, and a new record adds a project section', async () => {
  const source = projects[0];
  assert.ok(source);
  const project = { ...source, content: [] };
  const original = await createPortfolioPdf({ projects: [project], publicDir });
  const extended = await createPortfolioPdf({ projects: [project, { ...project, slug: 'extra-project', title: 'Extra project' }], publicDir });
  assert.ok(original.bytes.subarray(0, 8).toString().startsWith('%PDF-'));
  assert.equal(original.projectCount, 1);
  assert.equal(original.pageCount, 2);
  assert.equal((original.bytes.toString('latin1').match(/\/Type \/Page\b/g) ?? []).length, original.pageCount);
  assert.equal(extended.projectCount, 2);
  assert.equal(extended.pageCount, 3);
  assert.equal((extended.bytes.toString('latin1').match(/\/Type \/Page\b/g) ?? []).length, extended.pageCount);
});

test('long descriptions flow onto additional pages without a fixed page limit', async () => {
  const project = projects[0];
  assert.ok(project);
  const result = await createPortfolioPdf({ projects: [{ ...project, content: [{ type: 'text', heading: 'Details', paragraphs: Array.from({ length: 25 }, (_, index) => `Paragraph ${index + 1}: ` + 'A longer project description with implementation details. '.repeat(15)) }] }], publicDir });
  assert.ok(result.pageCount > 3);
});

test('PDF handles images, captions, list blocks, and an empty portfolio', async () => {
  const project = projects[0];
  assert.ok(project);
  const result = await createPortfolioPdf({ projects: [{ ...project, content: [
    { type: 'image', image: { ...project.cover, caption: 'Project image caption' } },
    { type: 'list', heading: 'Implementation notes', items: [{ title: 'Feature', meta: 'TypeScript', description: 'A description.' }] },
  ], links: [{ label: 'Source code', href: 'https://github.com/leoharnadi' }] }], publicDir });
  assert.ok(result.bytes.length > 1000);
  const empty = await createPortfolioPdf({ projects: [], publicDir });
  assert.equal(empty.pageCount, 1);
  assert.equal(empty.projectCount, 0);
});

test('missing assets fail PDF generation and paths cannot escape public', async () => {
  for (const path of ['https://example.com/image.png', '//example.com/image.png', '/../../secret.png', '/%2e%2e/secret.png', '/\\secret.png']) {
    assert.throws(() => localImagePath(path, publicDir));
  }
  const project = projects[0];
  assert.ok(project);
  await assert.rejects(() => createPortfolioPdf({ projects: [{ ...project, cover: { ...project.cover, src: '/missing-image.png' } }], publicDir }));
});
