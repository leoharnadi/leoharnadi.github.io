import PDFDocument from 'pdfkit';
import sharp from 'sharp';
import { resolve, sep } from 'node:path';
import { site } from '../../src/content/site.ts';
import type { ContentBlock, ImageContent, Project } from '../../src/types/content.ts';
import { projectPath, safeUrl } from '../../src/lib/urls.ts';

const colors = { navy: '#142641', text: '#28364a', muted: '#52627a', line: '#d1dae7' };
const margin = 52;

interface PortfolioPdfOptions {
  projects: readonly Project[];
  publicDir: string;
}

export interface PortfolioPdf {
  bytes: Buffer;
  pageCount: number;
  projectCount: number;
}

// Standard PDF fonts support Latin text; normalize punctuation for consistent extraction.
function text(value: string): string {
  return value.replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/[\u2010-\u2015]/g, '-').replace(/\u2026/g, '...');
}

export function localImagePath(src: string, publicDir: string): string {
  if (!src.startsWith('/') || src.startsWith('//') || /[\\?#]/.test(src)) throw new Error(`PDF images must use a local public path: ${src}`);
  const root = resolve(publicDir);
  const file = resolve(root, decodeURIComponent(src.slice(1)));
  if (!file.startsWith(root + sep)) throw new Error(`PDF image escapes public directory: ${src}`);
  return file;
}

export async function createPortfolioPdf({ projects, publicDir }: PortfolioPdfOptions): Promise<PortfolioPdf> {
  // Decode all images first: a missing asset must fail the build, not publish a partial PDF.
  const images = new Map<string, Buffer>();
  const allImages = projects.flatMap((project) => [project.cover, ...project.content.flatMap((block) => block.type === 'image' ? [block.image] : [])]);
  for (const image of allImages) {
    if (!images.has(image.src)) {
      images.set(image.src, await sharp(localImagePath(image.src, publicDir)).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).png().toBuffer());
    }
  }

  const doc = new PDFDocument({
    size: 'A4', margins: { top: 60, right: margin, bottom: 62, left: margin }, bufferPages: true,
    info: { Title: `${site.name} - Portfolio`, Author: site.name, Subject: 'Software development portfolio', Creator: 'Portfolio website build' },
  });
  const chunks: Buffer[] = [];
  const completed = new Promise<Buffer>((resolveBytes, reject) => {
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolveBytes(Buffer.concat(chunks)));
    doc.on('error', reject);
  });
  const width = doc.page.width - margin * 2;

  function room(height: number): void {
    if (doc.y + height > doc.page.height - doc.page.margins.bottom) doc.addPage();
  }

  function paragraph(value: string, options: PDFKit.Mixins.TextOptions = {}): void {
    doc.font('Helvetica').fontSize(10.5).fillColor(colors.text).text(text(value), margin, doc.y, { width, lineGap: 3, paragraphGap: 7, ...options });
    doc.y += 5;
  }

  function heading(value: string): void {
    room(72);
    doc.font('Helvetica-Bold').fontSize(14).fillColor(colors.navy).text(text(value), margin, doc.y, { width });
    doc.y += 10;
  }

  async function figure(image: ImageContent): Promise<void> {
    const bytes = images.get(image.src);
    if (!bytes) throw new Error(`PDF image was not prepared: ${image.src}`);
    const metadata = await sharp(bytes).metadata();
    if (!metadata.width || !metadata.height) throw new Error(`PDF image has no dimensions: ${image.src}`);
    const imageWidth = Math.min(width, 242 * metadata.width / metadata.height);
    const imageHeight = imageWidth * metadata.height / metadata.width;
    room(imageHeight + (image.caption ? 48 : 20));
    const top = doc.y;
    doc.image(bytes, margin + (width - imageWidth) / 2, top, { width: imageWidth, height: imageHeight });
    doc.y = top + imageHeight + 12;
    if (image.caption) {
      doc.font('Helvetica').fontSize(9).fillColor(colors.muted).text(text(image.caption), margin, doc.y, { width });
      doc.y += 12;
    }
  }

  async function contentBlock(block: ContentBlock): Promise<void> {
    switch (block.type) {
      case 'text':
        if (block.heading) heading(block.heading);
        for (const value of block.paragraphs) paragraph(value);
        doc.y += 12;
        break;
      case 'image':
        await figure(block.image);
        doc.y += 10;
        break;
      case 'list':
        heading(block.heading);
        for (const item of block.items) {
          room(65);
          doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.navy).text(text(item.title), margin, doc.y, { width });
          if (item.meta) paragraph(item.meta);
          paragraph(item.description);
        }
        doc.y += 12;
        break;
    }
  }

  doc.y = 108;
  doc.font('Helvetica').fontSize(12).fillColor(colors.muted).text('Portfolio', margin, doc.y);
  doc.y += 24;
  doc.font('Helvetica-Bold').fontSize(37).fillColor(colors.navy).text(site.name, margin, doc.y, { width, lineGap: 2 });
  doc.y += 18;
  doc.font('Helvetica').fontSize(18).fillColor(colors.navy).text('Software developer and tutor', margin, doc.y, { width });
  doc.y += 22;
  paragraph(site.introduction);
  doc.y += 22;
  paragraph(site.location);
  paragraph(site.email, { link: `mailto:${site.email}`, underline: true });
  paragraph(site.url.replace('https://', ''), { link: site.url, underline: true });
  paragraph('GitHub: leoharnadi', { link: site.github, underline: true });
  doc.y += 26;
  heading('Projects');
  if (!projects.length) paragraph('No projects added yet.');
  for (const [index, project] of projects.entries()) {
    paragraph(`${String(index + 1).padStart(2, '0')}  ${project.title}${project.placeholder ? ' (placeholder)' : ''}`, { goTo: project.slug });
  }
  if (projects.some((project) => project.placeholder)) {
    doc.y += 10;
    paragraph('This edition includes placeholder projects. Project details will be added to the website and this PDF together.');
  }

  for (const [index, project] of projects.entries()) {
    doc.addPage();
    doc.outline.addItem(text(project.title));
    doc.font('Helvetica').fontSize(10).fillColor(colors.muted).text(text(`${String(index + 1).padStart(2, '0')} / ${project.category}${project.placeholder ? ' / Placeholder' : ''}`), margin, doc.y, { width });
    doc.y += 18;
    doc.font('Helvetica-Bold').fontSize(29).fillColor(colors.navy).text(text(project.title), margin, doc.y, { width, destination: project.slug });
    doc.y += 14;
    paragraph(project.summary);
    doc.y += 10;
    await figure(project.cover);
    doc.y += 12;
    for (const block of project.content) await contentBlock(block);
    room(54);
    paragraph('Project page', { link: `${site.url}${projectPath(project)}`, underline: true });
    for (const link of project.links ?? []) paragraph(link.label, { link: safeUrl(link.href).startsWith('/') ? site.url + link.href : safeUrl(link.href), underline: true });
  }

  const pageCount = doc.bufferedPageRange().count;
  for (let index = 0; index < pageCount; index++) {
    doc.switchToPage(index);
    const bottomMargin = doc.page.margins.bottom;
    // Footer text sits outside the body margins and must not trigger another page.
    doc.page.margins.bottom = 0;
    doc.strokeColor(colors.line).lineWidth(0.6).moveTo(margin, doc.page.height - 46).lineTo(doc.page.width - margin, doc.page.height - 46).stroke();
    doc.font('Helvetica').fontSize(8).fillColor(colors.muted);
    doc.text(site.name, margin, doc.page.height - 33, { lineBreak: false });
    doc.text(`${index + 1} / ${pageCount}`, doc.page.width - margin - 45, doc.page.height - 33, { width: 45, lineBreak: false, align: 'right' });
    doc.page.margins.bottom = bottomMargin;
  }
  if (doc.bufferedPageRange().count !== pageCount) throw new Error('Portfolio footer unexpectedly added pages');
  doc.end();
  return { bytes: await completed, pageCount, projectCount: projects.length };
}
