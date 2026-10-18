# Guidance adapted for this portfolio

Reviewed all five AGENTS.md files found under the project directories returned
by Codex's project list on 18 October 2026. The two registered LMS/Telegram
projects share a parent directory; that directory was scanned once.

| Source | Rules retained or adapted |
| --- | --- |
| LMS, `lms/AGENTS.md` | Explicit setup/check commands, shared visual vocabulary, browser verification, dependency compatibility, documented release boundaries, antislop routing |
| HybridLMS, `hybridlms/AGENTS.md` | Clear architecture and commands, one dev server per port, configuration documentation, focused verification |
| Telegram handler, `telegram-handler/mobile/AGENTS.md` | Strict type checking, narrow-screen behavior, compatibility checks against current official docs |
| AI integration checkout, `telegram-handler-mobile-ai-integration/mobile/AGENTS.md` | Same mobile guidance; reviewed independently, no extra static-site requirements |
| Android plan checkout, `telegram-handler-mobile-android-plan/mobile/AGENTS.md` | Same mobile guidance; reviewed independently, no extra static-site requirements |

Rails, Devise, Pundit, databases, Go services, Supabase, Docker, Nginx, Expo,
native builds, and EAS deployment instructions belong to those applications.
They were not imported into the portfolio's architecture.

The six installed antislop skills were read and copied into `.agents/skills/`
with their original instructions. The accessibility skill's contrast checker
is included when available. The project-level AGENTS.md records how the
guidance applies to this TypeScript site, including the already selected
during-development mode and the current scaffolding-only scope.

No other project's AGENTS.md was changed. Private project implementation
details and environment values were not copied into this project.
