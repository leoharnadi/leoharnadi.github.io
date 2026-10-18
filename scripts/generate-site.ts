import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { projects } from '../src/content/projects.ts';
import { pages } from '../src/content/pages.ts';
import { createRoutes } from '../src/pages/routes.ts';
import { renderRoute } from '../src/render/route.tsx';

export async function generateSite(root: string): Promise<string[]> {
  const inputs: string[] = [];
  for (const route of createRoutes(projects, pages)) {
    const html = renderRoute(route, { projects, pages });
    const file = resolve(root, route.file);
    await mkdir(dirname(file), { recursive: true });
    // Unchanged HTML must not trigger another dev-server reload.
    const existing = await readFile(file, 'utf8').catch(() => '');
    if (existing !== html) await writeFile(file, html);
    inputs.push(file);
  }
  return inputs;
}
