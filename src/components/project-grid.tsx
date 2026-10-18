import type { Project } from '../types/content.ts';
import { ProjectCard } from './project-card.tsx';

interface ProjectGridProps {
  projects: readonly Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (!projects.length) return <p className="project-empty">No projects added yet.</p>;
  return (
    <div className="project-grid">
      {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
    </div>
  );
}
