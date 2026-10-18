import type { Project } from '../types/content.ts';

export function projectPath(project: Pick<Project, 'slug'>): string {
  return `/projects/${project.slug}/`;
}

export function safeUrl(value: string): string {
  const hasUnsafeCharacters = [...value].some((character) => character === '\\' || character <= ' ' || character.charCodeAt(0) === 127);
  if (/^(?:\/(?!\/)|https:\/\/|mailto:)/.test(value) && !hasUnsafeCharacters) return value;
  throw new Error(`Unsupported URL: ${value}`);
}
