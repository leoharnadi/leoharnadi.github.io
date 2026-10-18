import type { Project } from '../types/content.ts';

export const projects = [
  {
    slug: 'web-application', title: 'Web application', category: 'Web development',
    summary: 'Placeholder for a web development project.',
    placeholder: true,
    cover: { src: '/images/projects/web-placeholder.svg', alt: 'An abstract browser window, used as a placeholder project image.', width: 960, height: 720 },
    content: [
      { type: 'text', heading: 'Project details', paragraphs: ['I haven’t added this project yet. This page is a placeholder.'] },
      { type: 'text', heading: 'Screenshots', paragraphs: ['I’ll add screenshots and notes about the implementation here.'] },
    ],
  },
  {
    slug: 'backend-service', title: 'Backend service', category: 'Backend development',
    summary: 'Placeholder for a backend development project.',
    placeholder: true,
    cover: { src: '/images/projects/backend-placeholder.svg', alt: 'Three connected blocks, used as a placeholder backend project image.', width: 960, height: 720 },
    content: [
      { type: 'text', heading: 'Project details', paragraphs: ['I haven’t added this project yet. This page is a placeholder.'] },
      { type: 'text', heading: 'Implementation', paragraphs: ['I’ll add notes about the API and database here.'] },
    ],
  },
  {
    slug: 'mobile-application', title: 'Mobile application', category: 'Mobile development',
    summary: 'Placeholder for a mobile development project.',
    placeholder: true,
    cover: { src: '/images/projects/mobile-placeholder.svg', alt: 'An abstract mobile screen, used as a placeholder project image.', width: 960, height: 720 },
    content: [
      { type: 'text', heading: 'Project details', paragraphs: ['I haven’t added this project yet. This page is a placeholder.'] },
      { type: 'text', heading: 'Screenshots', paragraphs: ['I’ll add app screenshots and development notes here.'] },
    ],
  },
] satisfies readonly Project[];
