# Starter verification

Verified locally on 18 October 2026 with Node.js 24.19.0.

- `npm ci --offline` succeeded from the downloaded package cache using the
  project lockfile.
- `npm run check` passed: ESLint, strict TypeScript checks, and the Vite build.
- The production build contains `index.html`, compiled CSS/JavaScript,
  `.nojekyll`, and `404.html`.
- The workflow YAML parses. Push and pull-request triggers target `main`;
  deployment depends on a successful build and excludes pull requests.
  Action revisions are pinned, with write permissions limited to deployment.
- All six local antislop skill files match the installed copies. The contrast
  checker is included.
- The built homepage loaded in the browser; its TypeScript updated the year
  and produced no console warnings or errors.
- The GitHub profile link navigated to `https://github.com/leoharnadi`.
- Tab reached the GitHub link and displayed the focus ring. Its height was
  44 CSS pixels.
- The 404 page's return link opened the homepage using Enter.
- At viewport widths of 319 and 1280 CSS pixels, document width matched
  viewport width, with no horizontal overflow. The mobile screenshot showed
  all placeholder content and its focus indicator without clipping.
- Text/background contrast measured 17.40:1; link/background contrast was
  7.85:1, also supporting the link-colored focus indicator.

This verifies the current placeholder and local build. GitHub repository
setup and a hosted Actions deployment have not been performed. Final design,
200% browser zoom, portfolio content, and any future interaction or theme
need verification when those parts are implemented.
