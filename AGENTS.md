# Portfolio working agreement

Read `docs/agents/development.md` for setup commands, project structure,
deployment configuration, and maintenance guidance. Keep operational details
there; the public README is a short introduction for repository visitors.

## Scope and architecture

This project is Leo Harnadi Marlin's static portfolio, intended for
`https://leoharnadi.github.io/`. Use TypeScript, React TSX components, and CSS.
Vite builds `dist/`; GitHub Actions deploys it to GitHub Pages. Use npm and
Node.js 24. React renders components at build time; the browser receives static
HTML and a small TypeScript enhancement script. Do not add client hydration or
a backend unless a requested feature needs it.

## Working loop

```sh
npm ci
npm run dev
npm run check
npm run preview
```

Run only one preview or development server per port. Check the actual served
page before calling browser behavior verified. `npm run check` must pass
before handoff. Add focused tests for meaningful logic; avoid tests that only
repeat static markup. Never claim a GitHub deployment ran from a local build.

Preserve unrelated edits. Keep work inside this project. Do not copy the
other projects' application code, secrets, production data, or framework rules.
Update `docs/agents/development.md` when the workflow changes. Commit the npm lockfile
when dependency inputs change; use `npm ci` for reproducible verification.

## Content and code

- Keep content readable in HTML without JavaScript; enhance it with TypeScript.
- Compose pages from typed TSX components, not HTML template strings. Content
  records belong in `src/content/`; generated HTML belongs only in `.generated/`
  and `dist/`. Never edit generated pages.
- Prefer native links and buttons over custom interaction machinery.
- Keep TypeScript strict. Avoid `any`, unchecked DOM casts, and unnecessary
  abstractions. Handle absent DOM elements deliberately.
- Group real repeated content when it exists, instead of inventing a generic
  component library in advance.
- Put shared visual tokens and reusable treatments in the stylesheet. Add
  classes that actually exist, and check their rendered result.
- Comments should explain constraints, intent, or a non-obvious decision;
  omit decorative banners and narration of obvious statements.
- Preserve the user's factual qualifications. Rails stays in project context
  unless Leo asks to add it to core skills. Do not reintroduce the unsupported
  microservices claim. Lighthouse scores are not percentages of page speed.

## Accessibility and responsive behavior

Use semantic landmarks and heading order, descriptive links, visible keyboard
focus, and meaningful image alternatives. Controls must work with keyboard
and touch. Aim for touch targets of at least 44 by 44 CSS pixels. Normal text
requires at least 4.5:1 contrast; large text and non-text UI require the
applicable WCAG AA ratios. Compute uncertain contrast pairings.

Build narrow layouts first and add breakpoints when the content needs them.
Verify no horizontal overflow or clipped text, including at 200% zoom. Honor
reduced-motion preferences when adding motion. Verify every theme provided.
For any future asynchronous data view, provide understandable loading,
empty, and error states. Do not add those states artificially to static copy.

## Design and antislop

Apply antislop during development and audit the result before handoff. This
mode follows Leo's request to adapt the guidance for the new project; do not
restart the installation wizard or repeatedly ask about the mode.

Read `DESIGN.md` before visual changes. Leo selected a clean, restrained,
professional design. Keep its rationale and three dials current when making
material design changes. Projects are currently explicit placeholders.
Use the user's explicit directions when they differ from skill defaults.

<!-- antislop:start -->
Read the core and the relevant local skill files:

- Core: `.agents/skills/antislop/SKILL.md`
- UI: `.agents/skills/antislop-ui/SKILL.md`
- Copy: `.agents/skills/antislop-copywriting/SKILL.md`
- Accessibility: `.agents/skills/antislop-human/SKILL.md`
- Responsive layout: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Comment review: `.agents/skills/antislop-code/SKILL.md`

Apply comment-only review constraints to that review, not to unrelated
implementation work. Scope any audits to the work requested by the user.
<!-- antislop:end -->

Do not fabricate project details, metrics, testimonials, logos, or availability.
Avoid decorative patterns chosen by habit. Every section and interaction
must serve the real portfolio content. Reuse verified assets when provided.

## Deployment

The source files belong at the root of `leoharnadi/leoharnadi.github.io`.
Keep Vite's base `/`. Pushes to `main` build and deploy after Pages is enabled;
pull requests build without deployment. Workflow permissions stay limited
to what each job needs, and third-party actions remain pinned to verified
commit SHAs. Update them deliberately using official action documentation.

GitHub Pages has no server runtime. Never place secrets in `VITE_*`
variables, frontend code, or public assets. Avoid history-based routes that
404 on direct navigation. Do not create a live repository, push, publish,
change domains, or enable external services unless requested.

## Handoff

Report what changed, the checks actually performed, and any verification
limit. For interface work, verify real destinations and behavior, keyboard
focus, narrow and wide layouts, and the console. Distinguish completed site
features from placeholder project content and unverified hosted deployment.
