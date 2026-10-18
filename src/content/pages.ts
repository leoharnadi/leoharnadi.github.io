import type { ContentPage } from '../types/content.ts';

export const pages = [
  {
    slug: 'about', title: 'About me', eyebrow: 'Background', navigationLabel: 'About',
    description: 'Leo Harnadi Marlin’s development experience, tutoring, and education.',
    introduction: 'I’m Leo, a software developer and tutor based in Tangerang, Indonesia.',
    content: [
      { type: 'text', heading: 'Development and teaching', paragraphs: [
        'I studied Computer Science at Gadjah Mada University. I’ve worked on web applications, backend services, and apps for Apple platforms.',
        'At Ultimate Education, I work on the learning management system and tutor students. I’ve taught over 100 students there, covering English and maths for IELTS, GMAT, GRE, and SAT preparation.',
      ] },
      { type: 'list', heading: 'Experience', items: [
        { title: 'Ultimate Education', meta: 'May 2026 to present', description: 'LMS development, manual testing, project coordination, and tutoring.' },
        { title: 'CIMB Niaga', meta: 'February to July 2025', description: 'Frontend development with React and TypeScript as an IT Developer.' },
        { title: 'FXMedia', meta: 'March to August 2024', description: 'Augmented and mixed reality development with Unity, Swift, and Apple Vision Pro.' },
      ] },
      { type: 'text', heading: 'Tools', paragraphs: ['Go, TypeScript, Python, Swift, React, Node.js, PostgreSQL, Docker, and GitHub Actions.'] },
      { type: 'text', heading: 'Education', paragraphs: ['Bachelor of Computer Science, Gadjah Mada University, 2019 to 2024.'] },
      { type: 'text', heading: 'Training', paragraphs: ['Apple Developer Academy and the Shopee / Sealabs Bootcamp Program.'] },
    ],
  },
] satisfies readonly ContentPage[];
