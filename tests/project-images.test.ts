import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { projects } from '../src/content/projects.ts';
import { localImagePath } from '../scripts/pdf/portfolio.ts';

test('project images exist and declared dimensions match their files', async () => {
  const publicDir = resolve(import.meta.dirname, '../public');
  const images = projects.flatMap((project) => [project.cover, project.thumbnail, ...project.content.flatMap((block) => block.type === 'image' ? [block.image] : [])]);
  for (const image of images) {
    const metadata = await sharp(localImagePath(image.src, publicDir)).metadata();
    assert.equal(metadata.width, image.width, image.src);
    assert.equal(metadata.height, image.height, image.src);
    assert.ok(image.alt.trim(), image.src);
  }
});
