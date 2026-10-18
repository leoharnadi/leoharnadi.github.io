# Portfolio design brief

Direction: clean, sleek, professional, comfortable to read, and clear in its
information hierarchy. Leo requested a restrained presentation rather than
elaborate visual effects, with three placeholder projects to start.

## Confirmed scope

- Owner: Leo Harnadi Marlin.
- Address: https://leoharnadi.github.io/.
- Static site, TypeScript with React TSX components, CSS, and GitHub Pages.
- The site presents Leo's software background and teaching perspective to
  prospective collaborators and employers. Actual project case studies are
  still pending; placeholder entries are explicitly identified.

## Visual language

ENERGY 1 / RHYTHM 2 / MOTION 1.

Reading this as a professional personal portfolio in a quiet editorial
style. The introduction leads, the project index is easy to scan, and case
studies have a direct reading order.

- Leo requested dark blue/navy instead of green. Deep navy is the default
  canvas, with off-white text, slate-blue secondary text, and pale blue for
  actions. The optional light theme uses navy text on a cool white surface.
  Saved theme preferences take priority over the default.
- A system sans-serif keeps text familiar and loads without a font request.
  Large, tightly spaced headings establish hierarchy without display effects.
- Generous introductory spacing establishes identity; denser project cards
  support comparison; long-form pages use a narrower reading measure.
- Three equal project cards reflect the three equally provisional entries.
  They are comparable records, not a generic marketing feature section.
- The small-radius image frames group media. No card shadows, gradients,
  floating decoration, avatars, testimonials, or availability claims are used.
- Placeholder SVGs are locally authored, clearly identified preview images.
  Actual screenshots can replace them without altering the card or page.
- Navigation remains visible at narrow widths. No hamburger is needed for
  the short menu. Every control retains a visible focus indicator.
- Motion is limited to hover feedback and honors reduced-motion preferences.

## Content and architecture

Project records live in `src/content/projects.ts`; general page records live
in `src/content/pages.ts`. Typed TSX components compose the page layout,
headings, project grid, images with captions, and experience lists. React
renders them into `.generated/` at build time, then Vite builds `dist/`.
Pages work without JavaScript and direct URLs work on GitHub Pages.

Copy is direct and factual. Use “Software developer and tutor” rather than
an abstract identity statement, “View projects” for the project link, and
“Contact” for contact details. Do not add slogans or claims about a personal
philosophy that Leo has not supplied.

The home and About text use the verified CV background. Contact uses Leo's
professional email and public GitHub profile; personal phone numbers and CV
downloads are not added. Use real project examples when provided. Do not
display private LMS screenshots, credentials, or student data.
