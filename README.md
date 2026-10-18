# Leo Harnadi Marlin portfolio

Static portfolio starter for https://leoharnadi.github.io/, using vanilla
TypeScript, HTML, CSS, and Vite. The current page is a temporary placeholder;
portfolio content and visual design are the next step.

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
| `npm run check` | Run lint, type checking, and the production build |

## Project structure

```text
.agents/skills/        Local copies of the antislop guidance
.github/workflows/    Pull request checks and Pages deployment
docs/                 Guidance provenance and verification notes
public/               Files copied into the build unchanged
src/main.ts           Browser behavior
src/styles.css        Base styles; visual direction is still pending
index.html            Semantic page content and metadata
AGENTS.md             Instructions for work in this project
DESIGN.md             Design brief status and future design decisions
```

## GitHub Pages setup

1. Use the GitHub repository `leoharnadi/leoharnadi.github.io`. These project
   files, including `.github/`, must be at that repository's root, not inside
   another `leoharnadi.github.io/` directory.
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
`package.json`, and the workflow.

This starter has been prepared locally. Repository creation, pushing, and
enabling Pages are separate steps; no live deployment is claimed here.

## Development guidance

Read `AGENTS.md` before changes and `DESIGN.md` before visual work. The
adaptation notes in `docs/project-guidance.md` explain which conventions from
the other projects apply to a static portfolio.

GitHub Pages serves static files. Use real HTML pages or in-page anchors for
navigation; history-based client routes need an explicit hosting strategy.
All browser code and `public/` files are public. Put no secrets in them.

Deployment references: [Vite GitHub Pages guide](https://vite.dev/guide/static-deploy#github-pages)
and [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
