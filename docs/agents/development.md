# Development and deployment guide

This static portfolio uses TypeScript, React TSX components, CSS, and Vite. Its
deployment target is https://leoharnadi.github.io/.

Read the root `AGENTS.md` before changes and `DESIGN.md` before visual work.
Paths and commands in this guide are relative to the project root.

## Local development

Use Node.js 24 and npm. With nvm installed:

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open http://127.0.0.1:5173/. The dev server uses a strict port to avoid silently
opening another server on a different address.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite with live reload |
| `npm run lint` | Check TypeScript code with ESLint |
| `npm run typecheck` | Run strict TypeScript checks |
| `npm run build` | Type check and build static files into `dist/` |
| `npm run preview` | Serve the built site at http://127.0.0.1:4173/ |
| `npm test` | Check routes, safe rendering, and media blocks |
| `npm run check` | Run lint, tests, type checking, and the production build |

## Project structure

```text
.agents/skills/        Local copies of the antislop guidance
.github/workflows/    Pull request checks and Pages deployment
docs/agents/          Agent-facing development and deployment guidance
docs/                 Guidance provenance and verification notes
public/               Files copied into the build unchanged
src/main.ts           Browser behavior
src/styles.css        Base styles
src/content/          Site details, projects, and general page records
src/components/       Typed layout, headings, cards, grid, and content blocks
src/pages/            TSX page compositions and route registry
src/render/           Build-time React rendering
src/lib/              URL helpers
src/types/            Typed content schema
scripts/              Static HTML generation
tests/                Route and content rendering tests
.generated/           Ignored HTML inputs for Vite; never edit these
dist/                 Ignored production output for GitHub Pages
AGENTS.md             Instructions for work in this project
DESIGN.md             Design brief and design decisions
README.md             Short introduction for repository visitors
```

## GitHub Pages setup

1. Use the GitHub repository `leoharnadi/leoharnadi.github.io`. The contents of
   the local `portfolio` folder, including `.github/`, must be at that
   repository's root.
2. Use `main` as the publishing branch.
3. In the repository, open **Settings > Pages > Build and deployment** and set
   **Source** to **GitHub Actions**.
4. Push the project to `main`. `.github/workflows/pages.yml` installs the locked
   dependencies, runs `npm run check`, uploads `dist/`, and deploys it to Pages.

Pull requests targeting `main` run the same checks without deploying. The
workflow can also be triggered manually from Actions on `main`. Deployment
uses GitHub's built-in token and OIDC; no personal access token is needed.
If the `github-pages` environment requires approval, its reviewer must approve
the deployment in GitHub.

Vite's `base` is `/` because this is a user site at the domain root. Do not
change it to `/leoharnadi.github.io/`. No custom-domain `CNAME` is needed.
Keep `node_modules/` and `dist/` out of source control and commit
`package-lock.json`. Keep Node's major version aligned across `.nvmrc`,
`package.json`, and the workflow. Verify actual workflow results before
reporting a successful hosted deployment.

## Maintenance

### Add or edit a project

Edit `src/content/projects.ts`. Add another record with a unique lowercase
hyphenated `slug`, title, category, summary, `cover`, and `content` blocks.
The project card, detail page at `/projects/<slug>/`, and next-project link
are generated from that record. Array order controls the project index.

Put images in `public/images/projects/` and reference them as
`/images/projects/filename.webp`. Supply meaningful `alt` text and the actual
width and height. A cover image appears in the card and detail page.
Use content blocks to interleave paragraphs and images:

```ts
content: [
  { type: 'text', heading: 'Overview', paragraphs: ['The real project story.'] },
  {
    type: 'image',
    image: {
      src: '/images/projects/screenshot.webp',
      alt: 'Describe what the screenshot shows',
      width: 1200,
      height: 800,
      caption: 'Optional caption',
    },
  },
]
```

Set `placeholder: false` only when the entry describes real work. Optional
`links` contain `{ label, href }` records for a real source repository or demo.
No link controls render when links are absent.

### Add a page

Add a `ContentPage` record in `src/content/pages.ts`. Its `slug` becomes
`/<slug>/`. `navigationLabel` is optional; supplying it adds the page to the
shared navigation. Pages support the same text, image, and list blocks as
projects. Keep navigation short enough to remain usable on small screens.

### Components and generation

Pages return React elements, not strings. `HomePage` composes `ProjectGrid`;
`ProjectPage` and `ContentPageView` share `PageHeading` and `ContentBlocks`.
`Layout` supplies document metadata, `SiteHeader`, and `SiteFooter`. Props
are typed, content stays separate, and React escapes text when rendering.
`safeUrl` validates image and link URLs; it does not HTML-escape them because
React handles attribute escaping.

To add a content block kind, extend `ContentBlock` in `src/types/content.ts`
and its component branch in `src/components/content-blocks.tsx`. Existing
projects and general pages can then use it. For a bespoke page layout, add a
TSX component in `src/pages/`, a route kind in `src/pages/routes.ts`, and its
composition in `src/render/route.tsx`. Ordinary content pages need only a new
record, as described above.

Vite's config runs `scripts/generate-site.ts` before serving or building.
Generated HTML includes the actual content, not a JavaScript-only shell.
Vite watches its configuration dependencies, so changing imported content or
components restarts generation during development. HTML is rewritten only
when its contents change to avoid reload loops.

All intermediate HTML lives in `.generated/`, Vite's configured root. There
are no hand-maintained project HTML pages. Vite's `/src` alias resolves the
browser entry to the real source folder; `public/` still supplies image assets.
Only current routes are build inputs. `dist/` is cleaned before each build,
so removed routes are not redeployed. CI regenerates pages from TSX.

React and React DOM are build dependencies, not browser bundles. The build
uses `renderToStaticMarkup`, without hydration, a client router, or a React
root in the browser. Tests use `tsx` because Node's native TypeScript stripping
does not compile JSX. If adding interactive React components later, add an
explicit browser mounting strategy; build-time `onClick` props do not create
working client behavior by themselves.

`src/main.ts` progressively enhances the theme button and copyright year.
Content and navigation work without JavaScript. The theme defaults to navy,
can be switched to light, and persists when storage is available. A small
trusted inline script restores a saved preference before paint. No React
runtime or form backend is required in the browser.

Keep this guide aligned with scripts and deployment configuration. Keep the
public README focused on the portfolio; put operational instructions here.
The adaptation notes in `docs/project-guidance.md` explain which conventions
from the other projects apply. `docs/verification.md` records starter checks;
do not treat an old local verification report as evidence of current hosting.

GitHub Pages serves static files. Use real HTML pages or in-page anchors for
navigation; history-based client routes need an explicit hosting strategy.
All browser code and `public/` files are public. Put no secrets in them.
These documentation files also remain readable in a public repository;
placing them under `docs/agents/` changes their organization, not access.

Deployment references: [Vite GitHub Pages guide](https://vite.dev/guide/static-deploy#github-pages)
and [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
