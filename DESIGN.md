# Portfolio design brief

Direction: clean, sleek, professional, comfortable to read, and clear in its
information hierarchy. Leo requested a restrained presentation rather than
elaborate visual effects. The initial three placeholders have been replaced
with four projects from Leo's supplied portfolio PDF.

## Confirmed scope

- Owner: Leo Harnadi Marlin.
- Address: https://leoharnadi.github.io/.
- Static site, TypeScript with React TSX components, CSS, and GitHub Pages.
- The site presents Leo's software engineering work to prospective collaborators
  and employers. The About page retains his verified tutoring background.

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
- Four project records use a two-column desktop grid so screenshots have enough
  room to read; mobile stacks them into one column. They are project records,
  not a marketing feature section.
- The small-radius image frames group media. No card shadows, gradients,
  floating decoration, avatars, testimonials, or availability claims are used.
- Screenshots come from the supplied portfolio PDF, converted losslessly to
  WebP. Contained previews preserve the whole screen rather than cropping it.
  Cards use navy editorial thumbnail artwork for recognition at small sizes;
  detail pages and the PDF retain real screenshots except the employer LMS,
  whose internal screenshots are withheld pending publication approval. Its
  neutral cover reads 'Learning Management System'. These illustrations are
  not official logos or invented interfaces.
  Portrait figures have a narrower reading width. Images with student names
  or a private Telegram contact list are omitted.
- Navigation remains visible at narrow widths. No hamburger is needed for
  the short menu. Every control retains a visible focus indicator.
- Motion is limited to hover feedback and honors reduced-motion preferences.

## Content and architecture

Project records live in `src/content/projects.ts`; general page records live
in `src/content/pages.ts`. Typed TSX components compose the page layout,
headings, project grid, images with captions, and experience lists. React
renders them into `.generated/` at build time, then Vite builds `dist/`.
Pages work without JavaScript and direct URLs work on GitHub Pages.

Copy is direct and factual. Use Leo's supplied title “Software Engineer” rather than
an abstract identity statement, “View projects” for the project link, and
“Contact” for contact details. Do not add slogans or claims about a personal
philosophy that Leo has not supplied.

The PDF download uses a secondary outlined button so browsing projects remains
the main action; the shared footer keeps the file reachable on every page.
The PDF itself uses white A4 pages with navy headings for print readability,
a cover and linked contents, then a new section for each project. Text flows
across pages rather than being cut to a fixed slide size. Images retain their
aspect ratio, and the document draws on the same four project records.

The home and About text use the verified CV background. Contact uses Leo's
professional email and public GitHub profile; personal phone numbers and CV
downloads are not added. Use real project examples when provided. Do not
display private LMS screenshots, credentials, or student data.
