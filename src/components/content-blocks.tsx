import type { ContentBlock } from '../types/content.ts';
import { Figure } from './image.tsx';

interface ContentBlocksProps {
  blocks: readonly ContentBlock[];
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'text':
      return (
        <section className="prose-section">
          {block.heading && <h2>{block.heading}</h2>}
          {block.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </section>
      );
    case 'image':
      return <Figure image={block.image} />;
    case 'list':
      return (
        <section className="prose-section">
          <h2>{block.heading}</h2>
          <ul className="experience-list">
            {block.items.map((item, index) => (
              <li key={index}>
                <div className="experience-heading">
                  <h3>{item.title}</h3>
                  {item.meta && <span>{item.meta}</span>}
                </div>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      );
  }
}

export function ContentBlocks({ blocks }: ContentBlocksProps) {
  return blocks.map((block, index) => <Block key={index} block={block} />);
}
