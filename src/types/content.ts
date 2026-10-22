export interface ImageContent {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export type ContentBlock =
  | { type: 'text'; heading?: string; paragraphs: readonly string[] }
  | { type: 'image'; image: ImageContent }
  | { type: 'list'; heading: string; items: readonly { title: string; description: string; meta?: string }[] };

export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  role?: string;
  technologies?: readonly string[];
  placeholder: boolean;
  cover: ImageContent;
  thumbnail?: ImageContent;
  content: readonly ContentBlock[];
  links?: readonly { label: string; href: string }[];
}

export interface ContentPage {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  introduction: string;
  navigationLabel?: string;
  content: readonly ContentBlock[];
}
