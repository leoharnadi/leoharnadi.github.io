import { renderToStaticMarkup } from 'react-dom/server';
import type { ContentPage, Project } from '../types/content.ts';
import type { Route } from '../pages/routes.ts';
import { site } from '../content/site.ts';
import { Layout } from '../components/layout.tsx';
import { HomePage } from '../pages/home.tsx';
import { ContentPageView } from '../pages/content-page.tsx';
import { ProjectPage } from '../pages/project.tsx';
import { NotFoundPage } from '../pages/not-found.tsx';

interface RouteContent {
  projects: readonly Project[];
  pages: readonly ContentPage[];
}

export function renderRoute(route: Route, content: RouteContent): string {
  const page = route.kind === 'page' ? route.page : route.kind === 'project' ? route.project : undefined;
  const title = page?.title ?? (route.kind === 'not-found' ? 'Page not found' : site.name);
  const description = page ? ('description' in page ? page.description : page.summary) : site.description;
  return '<!doctype html>\n' + renderToStaticMarkup(
    <Layout path={route.path} title={title} description={description} pages={content.pages} notFound={route.kind === 'not-found'}>
      {route.kind === 'home' && <HomePage projects={content.projects} />}
      {route.kind === 'page' && <ContentPageView page={route.page} />}
      {route.kind === 'project' && <ProjectPage project={route.project} {...(route.nextProject ? { nextProject: route.nextProject } : {})} />}
      {route.kind === 'not-found' && <NotFoundPage />}
    </Layout>,
  );
}
