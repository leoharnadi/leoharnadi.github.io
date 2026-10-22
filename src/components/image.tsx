import type { ImageContent } from '../types/content.ts';
import { safeUrl } from '../lib/urls.ts';

interface ImageProps {
  image: ImageContent;
  eager?: boolean;
}

export function Image({ image, eager = false }: ImageProps) {
  return (
    <img
      src={safeUrl(image.src)}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

export function Figure({ image, eager = false }: ImageProps) {
  return (
    <figure className={image.height > image.width ? 'content-image is-portrait' : 'content-image'}>
      <Image image={image} eager={eager} />
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}
