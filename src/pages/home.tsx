import { site } from '../content/site.ts';
import type { Project } from '../types/content.ts';
import { ProjectGrid } from '../components/project-grid.tsx';
import { DownloadPortfolio } from '../components/download-portfolio.tsx';

interface HomePageProps {
  projects: readonly Project[];
}

export function HomePage({ projects }: HomePageProps) {
  return (
    <>
      <section className="hero container" aria-labelledby="intro-heading">
        <div className="hero-copy">
          <p className="eyebrow">Leo Harnadi Marlin</p>
          <h1 id="intro-heading">Software developer<br /><span>and tutor.</span></h1>
          <p className="hero-introduction">{site.introduction}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">View projects</a>
            <DownloadPortfolio />
            <a className="text-link" href="/about/">About me</a>
          </div>
        </div>
        <aside className="hero-aside" aria-label="Background">
          <div><span className="detail-label">Based in</span><p>{site.location}</p></div>
          <div><span className="detail-label">Education</span><p>Computer Science<br />Gadjah Mada University</p></div>
        </aside>
      </section>
      <section className="work-section container" id="work" aria-labelledby="work-heading">
        <div className="section-heading">
          <h2 id="work-heading">Projects</h2>
          {projects.some((project) => project.placeholder) && <p>Placeholder projects for now. I’ll add my work here.</p>}
        </div>
        <ProjectGrid projects={projects} />
      </section>
    </>
  );
}
