# Employer project publication update

2026-10-22: Leo approved explicit employer attribution, a neutral cover, and
withholding internal screenshots until publication permission is confirmed.

The title is now 'LMS at Ultimate Education', category 'Work project', with an
employee role and contribution-focused description. The route stays unchanged.
The cover is an illustration labelled as such, not an official company logo.

Both employer screenshots and the superseded branded cover were moved from
`public/` to ignored `tmp/withheld-employer-assets/`. These remain recoverable
locally. They are absent from the rebuilt `dist/` and current PDF. This updates
the earlier media inclusion decisions in `content-source.md`.

Verification for the changed scope:

- Hard Gate PASS: 17 tests, lint, TypeScript, and production build passed;
  a regression test checks attribution and excluded employer screenshot paths.
- Purpose Gate PASS: neutral navy cover matches the palette without implying
  new company branding; prompt and asset path are in `cover-assets.md`.
- Liveliness PASS: existing ENERGY 1 / RHYTHM 2 / MOTION 1 preserved.
- Craftsmanship PASS: home project link opens the revised page; navy/light
  toggle works; 390px layout has no horizontal overflow and cover loads.
  Browser console has no errors. Changed PDF section and contents visually
  reviewed; internal screenshots no longer appear. No deployment performed.
