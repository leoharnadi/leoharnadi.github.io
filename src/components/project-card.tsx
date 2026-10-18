import type { Project } from '../types/content.ts';
import { projectPath } from '../lib/urls.ts';
import { Image } from './image.tsx';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const titleId = `project-title-${project.slug}`;
  const summaryId = `project-summary-${project.slug}`;
  return (
    <article className="project-card">
      <a className="project-card-link" href={projectPath(project)} aria-labelledby={titleId} aria-describedby={summaryId}>
        <div className="project-cover">
          <Image image={project.cover} />
          <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="project-card-copy">
          <div className="project-category">
            <span>{project.category}</span>
            {project.placeholder && <span className="placeholder-label">Placeholder</span>}
          </div>
          <h3 id={titleId}>{project.title}</h3>
          <p id={summaryId}>{project.summary}</p>
          <span className="project-open">View project</span>
        </div>
      </a>
    </article>
  );
}
