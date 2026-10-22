import type { Project } from '../types/content.ts';

export const projects = [
  {
    slug: 'ultimate-education-lms', title: 'LMS at Ultimate Education', category: 'Work project',
    summary: 'My contributions to the learning platform at Ultimate Education, covering performance, accessibility, and exam grading.',
    role: 'Full-Stack Engineer (employee)',
    technologies: ['Next.js', 'Laravel', 'Go', 'Moodle'],
    thumbnail: { src: '/images/projects/covers/learning-management-system-v2.webp', alt: 'Learning Management System cover illustration with an assessment sheet and course folder.', width: 1280, height: 800 },
    placeholder: false,
    cover: { src: '/images/projects/covers/learning-management-system-v2.webp', alt: 'Learning Management System cover illustration with an assessment sheet and course folder.', width: 1280, height: 800, caption: 'Illustrative cover, not a screenshot of the company platform.' },
    content: [
      { type: 'text', heading: 'Work context', paragraphs: ['I contribute to Ultimate Education’s learning management system as an employee. The platform supports courses, exams, grading, and class scheduling. This page describes my contributions, not sole authorship of the platform.'] },
      { type: 'text', heading: 'My contribution', paragraphs: ['I worked on dashboard performance, Core Web Vitals, and accessibility. I also refactored grading into a shared registry that removed duplicated logic across 13 exam types.'] },
    ],
  },
  {
    slug: 'telegram-handler', title: 'Telegram Handler', category: 'Messaging and task management',
    summary: 'Multi-account Telegram management with message-linked tasks, a responsive inbox, and private AI discussions.',
    role: 'Full-Stack Developer',
    technologies: ['Rails', 'Python', 'Telethon'],
    thumbnail: { src: '/images/projects/covers/telegram-handler-v1.webp', alt: 'TEHA cover illustration connecting a message to a checked task.', width: 1280, height: 800 },
    placeholder: false,
    cover: { src: '/images/projects/telegram-handler-tasks.webp', alt: 'Telegram Handler task detail showing assignment, deadline, and status fields for a test task.', width: 594, height: 1019 },
    content: [
      { type: 'text', heading: 'Overview', paragraphs: ['I contributed to TEHA, a platform for managing Telegram conversations across multiple accounts. My work covered the Rails application and its Python/Telethon services.'] },
      { type: 'text', heading: 'Message-linked tasks', paragraphs: ['I implemented tasks created from selected Telegram messages, retaining the source messages as evidence. Tasks support assignments, deadlines, comments, and status updates, with navigation back to the original conversation.'] },
      { type: 'text', heading: 'Private AI discussions', paragraphs: ['I built private discussions using reusable chat context and personal profiles, with message and file attachments and evidence retrieval. I added context updates, cancellation, recovery, and copyable responses.'] },
      { type: 'text', heading: 'Inbox and reliability', paragraphs: ['I refined chat navigation, message selection, media interactions, and responsive layouts. Rich-text composing and rendering preserve Telegram formatting. I also improved background-job recovery and diagnostics.'] },
    ],
  },
  {
    slug: 'lexicon', title: 'Lexicon', category: 'Vocabulary study app',
    summary: 'A GRE flashcard app with bilingual definitions, editable AI-generated cards, and shareable cloud decks.',
    role: 'Solo developer',
    technologies: ['React', 'TypeScript', 'Supabase'],
    thumbnail: { src: '/images/projects/covers/lexicon-v1.webp', alt: 'Lexicon cover illustration with vocabulary flashcards.', width: 1280, height: 800 },
    placeholder: false,
    cover: { src: '/images/projects/lexicon-study.webp', alt: 'Lexicon study mode showing a vocabulary flashcard, progress, and bilingual study controls.', width: 856, height: 682 },
    content: [
      { type: 'text', heading: 'Overview', paragraphs: ['I built Lexicon for GRE vocabulary study, handling the frontend, backend and database design, and AI integration. Words can be added manually or in bulk, then studied with flip cards containing bilingual definitions and example sentences.'] },
      { type: 'text', heading: 'Card generation', paragraphs: ['The AI generator drafts definitions, translations, and example sentences. Users can edit and review the drafts before importing them into a deck.'] },
      { type: 'image', image: { src: '/images/projects/lexicon-generator.webp', alt: 'Lexicon word-entry form and AI flashcard generator with a draft review area.', width: 885, height: 1080, caption: 'Manual entry, bulk word entry, and editable AI-generated drafts.' } },
      { type: 'text', heading: 'Cloud decks', paragraphs: ['Optional cloud sync uses Supabase. Decks can be shared with a code and password, with Supabase RPCs handling access.'] },
      { type: 'image', image: { src: '/images/projects/lexicon-decks.webp', alt: 'Lexicon deck controls for loading, saving, and sharing a cloud deck.', width: 750, height: 900, caption: 'Password-protected cloud decks with load and save controls.' } },
    ],
  },
  {
    slug: 'multi-tenant-lms', title: 'Multi-Tenant LMS', category: 'Learning platform',
    thumbnail: { src: '/images/projects/covers/multi-tenant-v1.webp', alt: 'Multi-Tenant LMS cover illustration with separate learning folders.', width: 1280, height: 800 },
    summary: 'Separate learning workspaces for organizations, with courses, resumable assessments, and reviewed AI grading.',
    role: 'Full-Stack Developer',
    placeholder: false,
    cover: { src: '/images/projects/multi-tenant-course.webp', alt: 'Multi-Tenant LMS course material in a sample organization, with course navigation and editing controls.', width: 1728, height: 1080 },
    content: [
      { type: 'text', heading: 'Overview', paragraphs: ['This learning platform brings course delivery, class scheduling, assessments, and student progress into one application. Each organization manages its own workspace, users, and permissions. Platform administrators oversee organizations through a separate console.'] },
      { type: 'text', heading: 'Courses and student progress', paragraphs: ['Organizations can arrange materials, videos, and quizzes into ordered course sections. Teachers assign work and review submissions. Students can continue from saved progress, track completion, access published results, and download certificates.'] },
      { type: 'text', heading: 'Resumable assessments', paragraphs: ['Assessments support multiple-choice, multiple-selection, short-answer, cloze, essay, and audio questions. Attempts can save progress, with optional time limits and retake quotas.'] },
      { type: 'image', image: { src: '/images/projects/multi-tenant-quiz.webp', alt: 'Sample assessment with six question formats, numbered navigation, and saved progress.', width: 1757, height: 1113, caption: 'A demo assessment with saved responses and question navigation.' } },
      { type: 'text', heading: 'Grading and review', paragraphs: ['Reviewers see answer-key scores alongside AI analysis of essay and audio responses. They can adjust grades and feedback, and must confirm AI results before publishing them to students.'] },
      { type: 'image', image: { src: '/images/projects/multi-tenant-grading.webp', alt: 'QA sample grading view showing scores, draft analysis, and reviewer feedback fields.', width: 1518, height: 1074, caption: 'Grading review using sample data, with AI drafts kept separate from publication.' } },
    ],
  },
] satisfies readonly Project[];
