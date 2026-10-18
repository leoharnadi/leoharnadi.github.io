import type { Project } from '../types/content.ts';
import { projectPath, safeUrl } from '../lib/urls.ts';
import { ContentBlocks } from '../components/content-blocks.tsx';
import { Figure } from '../components/image.tsx';
import { PageHeading } from '../components/page-heading.tsx';

interface ProjectPageProps {
  project: Project;
  nextProject?: Project;
}

export function ProjectPage({ project, nextProject }: ProjectPageProps) {
  const eyebrow = project.placeholder ? `${project.category} / Placeholder` : project.category;
  return (
    <article className="project-detail container">
      <a className="back-link" href="/#work">All projects</a>
      <PageHeading title={project.title} eyebrow={eyebrow} introduction={project.summary} />
      {!!project.links?.length && (
        <div className="project-links">
          {project.links.map((link) => <a className="text-link" key={link.href} href={safeUrl(link.href)}>{link.label}</a>)}
        </div>
      )}
      <div className="project-detail-cover"><Figure image={project.cover} eager /></div>
      <div className="prose project-prose"><ContentBlocks blocks={project.content} /></div>
      {nextProject && (
        <a className="next-project" href={projectPath(nextProject)}>
          <span className="detail-label">Next project</span><span>{nextProject.title}</span>
        </a>
      )}
    </article>
  );
}
