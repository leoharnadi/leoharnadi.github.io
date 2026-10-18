# Portfolio verification

Verified locally on 18 October 2026. Updated after the navy palette, copy,
and React TSX refactor. This supplements the earlier scaffold record in
`../verification.md`.

## Automated checks

- `npm run check` passed: ESLint, seven content/routing tests, strict TypeScript,
  and the Vite production build.
- Tests cover generated project URLs; new records appearing in navigation,
  cards, and detail pages without template changes; invalid and duplicate
  slugs; React text escaping and safe links; image metadata; an empty project
  grid; and shared document structure across routes.
- All six generated HTML pages have one primary heading. Local links, fragments,
  images, stylesheets, and scripts resolve in the production output.
- `git diff --check` passed.

## Browser checks

- Homepage, About, and all three project pages load from the production preview.
- All three project cards, the three cyclic next-project links, Projects
  navigation, the brand home link, About and About me, View projects, and
  All projects navigate correctly. Contact reaches the footer. A nested
  project survives reload.
- The 404 page's Home link returns to the homepage when activated with Enter.
- The skip link is the first keyboard stop, shows a focus ring, and moves focus
  to main content on Enter. The theme button also works with Enter.
- Light and dark themes display correctly; an explicit choice survives reload
  and navigation. No browser console warnings or errors were observed.
- After the refactor, 320-pixel mobile and 1440-pixel desktop layouts were
  inspected again. At 320 CSS pixels, document width matches viewport width.
  Earlier 375- and 768-pixel checks predate this refactor.
  Project cards reflow to one or two columns, with three columns on desktop.
  Mobile and desktop screenshots were inspected for clipping and spacing.
- Interactive controls measure at least 44 CSS pixels high. Main actions are
  48 CSS pixels high. Focus indicators remain visible.
- The new light and navy text pairings pass WCAG AA. Secondary text against
  the footer is 5.41:1 in light mode and 8.09:1 in navy. Primary button text
  is 8.65:1 in light mode and 10.72:1 in navy. Project numbering is at least
  9.16:1 against the illustrated covers. Other page surfaces provide greater
  contrast for the same text colors.
- A fresh development-server origin defaults to navy. Both the production
  preview and the development server load nested pages without console errors.

## Scoped antislop gate

- Hard Gate PASS: copy uses factual qualifications and labeled placeholders;
  no fabricated claims, dead navigation, or mobile overflow. Keyboard skip
  navigation and theme activation work. Static content has no fetch state;
  the project grid includes an empty state. Existing 200% zoom verification
  limits remain noted below rather than being represented as a pass.
- Purpose Gate PASS: the user selected navy; actions use blue accents;
  typography and spacing retain the documented reading hierarchy. No glow,
  gradients, icon library, or decorative animation was added.
- Liveliness PASS: ENERGY 1 / RHYTHM 2 / MOTION 1. A two-line role heading
  leads the introduction, project previews form the browsing section, and
  the contact strip remains compact. Rationale lives in `DESIGN.md`.
- Copy and quality PASS: abstract slogans were replaced with direct role
  descriptions and action labels. Reusable typed components replace HTML
  strings; generated HTML is isolated from editable source.

## Limits

- Browser zoom shortcuts did not change zoom in the available in-app browser;
  actual 200% browser zoom still needs a manual check. Narrow viewport reflow
  was verified separately.
- Reduced-motion styles are present; the operating-system preference was not
  changed during testing.
- Project content and illustrations are explicitly labeled placeholders.
- GitHub Actions and the published site were not exercised during this local
  implementation. No commit, push, or deployment was performed.
- The email link's `mailto:` destination was inspected without opening a mail
  client or sending a message. The unchanged GitHub destination was validated
  in the earlier scaffold check; it was not opened again during the refactor.
