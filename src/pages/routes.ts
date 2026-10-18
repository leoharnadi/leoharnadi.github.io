import type { ContentPage, Project } from '../types/content.ts';

export type Route =
  | { kind: 'home'; path: '/'; file: 'index.html' }
  | { kind: 'page'; path: string; file: string; page: ContentPage }
  | { kind: 'project'; path: string; file: string; project: Project; nextProject?: Project }
  | { kind: 'not-found'; path: '/404.html'; file: '404.html' };

export function createRoutes(projects: readonly Project[], pages: readonly ContentPage[]): Route[] {
  const routes: Route[] = [{ kind: 'home', path: '/', file: 'index.html' }];
  const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  for (const page of pages) {
    if (!validSlug.test(page.slug) || page.slug === 'projects') throw new Error(`Invalid page slug: ${page.slug}`);
    routes.push({ kind: 'page', path: `/${page.slug}/`, file: `${page.slug}/index.html`, page });
  }
  for (const [index, project] of projects.entries()) {
    if (!validSlug.test(project.slug)) throw new Error(`Invalid project slug: ${project.slug}`);
    const nextProject = projects[(index + 1) % projects.length];
    routes.push({ kind: 'project', path: `/projects/${project.slug}/`, file: `projects/${project.slug}/index.html`, project, ...(nextProject ? { nextProject } : {}) });
  }
  routes.push({ kind: 'not-found', path: '/404.html', file: '404.html' });
  const seen = new Set<string>();
  for (const route of routes) {
    if (seen.has(route.path)) throw new Error(`Duplicate route: ${route.path}`);
    seen.add(route.path);
  }
  return routes;
}
