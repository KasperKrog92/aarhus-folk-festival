# Aarhus Folk Festival project guide

A public-facing website concept for **Aarhus Folk Festival** (24.-27. september 2026).
Replaces the outdated existing site (https://www.aarhusfolkfestival.dk/) with a warm,
modern Nordic folk aesthetic. A growing set of static pages: a polished homepage plus
programme, artists and workshops pages (with detail subpages), and association + contact.

This file holds what every agent should know on every task. Deeper detail lives in
`docs/` — read the relevant file when a task touches that area (see the map below).

## Documentation map

Read the file that matches the task; don't read all of them by default.

| When the task touches... | Read |
|--------------------------|------|
| file/module structure, where things live, how components compose, conventions | [docs/architecture.md](docs/architecture.md) |
| any user-facing copy, locale, dictionaries, `Localized` data | [docs/i18n.md](docs/i18n.md) |
| the voice/wording rules for the copy itself (DA + EN) | [docs/content-and-tone.md](docs/content-and-tone.md) |
| colours, fonts, decorative motifs, layout styling, logos, images | [docs/design-system.md](docs/design-system.md) |

If a change introduces a new area that none of these files cover well, and you
judge it worth documenting for future agents, create a new `docs/<topic>.md` and
add a row here pointing to it. Keep each doc focused on one topic; prefer adding
to an existing file when the topic already fits one.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript** (strict), path alias `@/* → src/*`
- **Tailwind CSS v4** (CSS-first config via `@theme` in `src/app/globals.css`; there is **no** `tailwind.config`)
- **pnpm** for package management
- Fonts via `next/font/google`: **Fraunces** (display) + **Plus Jakarta Sans** (body)

## Commands

```bash
pnpm dev      # dev server (localhost:3000)
pnpm build    # production build, also runs typecheck
pnpm lint     # eslint
```

Scale verification to the change: `pnpm lint` or a typecheck is often enough for
small code edits, while `pnpm build` is for substantive changes that need full
production confidence. For tiny visual copy/CSS/SVG adjustments, do not run a
build unless explicitly requested.

When the best implementation requires a specialized tool or package (for
example image optimizers, asset conversion CLIs, inspection utilities, or
framework helpers), install the appropriate tool and use it. Prefer project-local
dev dependencies or documented one-off commands over improvised workarounds, and
keep installs scoped to what the task genuinely needs.

If a dev server is already running, do **not** open the site or run browser
verification yourself. Assume the owner has it open and will check visual
changes manually; ask them to verify anything that needs browser judgment.

## Git workflow

**Commit and push directly to `main`.** The repo owner has opted out of the
feature-branch / PR flow for this project, so do not create branches or pull
requests for changes unless explicitly asked. (This overrides any default
"branch first" agent behaviour.) Still: only commit/push when asked, and run
`pnpm build` first. If the same change set already had a successful `pnpm build`
in the current session, it is acceptable to reuse that result instead of running
the build again.

**Before committing and pushing, check that the docs are up to date.** When the
owner asks you to commit and push, first review whether the changes introduced
anything that belongs in `AGENTS.md` or one of the `docs/` files: a new file or
module, a new convention or constraint, a new architectural decision, a design
token, or anything a future agent would need to know. Put durable guidance where
the documentation map points (architecture, i18n, tone, design system), or in a
new `docs/<topic>.md` if it fits none of them; keep `AGENTS.md` for what every
agent needs on every task. If the docs already cover it, proceed. Don't pad them with restatements of the diff: only durable,
agent-relevant guidance belongs in the docs.

## Important constraints (do not violate)

- **Public-facing only.** No login / auth / admin / accounts.
- **No volunteer system.** The reference mockup shows a "frivilligt arbejde" CTA. It was
  intentionally replaced with a warm "Om festivalen" / community section. Do not add volunteer
  signup or management.
- **No CMS / backend.** Content is static arrays in `src/data/`. The newsletter form is a
  visual demo only (`preventDefault`, no network). Two bits of client-only persistence:
  `FavouriteButton` remembers favourited events in the `aff_favourites` cookie (see
  `src/lib/favourites.ts`); `ThemeToggle` remembers the visitor's light/dark preference in
  the `aff_theme` cookie (see `src/lib/theme.ts` + `src/lib/theme-server.ts`). No
  server, no account, no network.
- **Mobile-first, accessible, semantic.** Keep landmark elements, real heading order, focus
  styles, and descriptive `alt`/`aria-label`. `<html lang>` follows the active locale.
- **Bilingual UI copy (DA default / EN).** Danish is the default and source of truth; every
  user-facing string is also authored in English via the i18n system (see
  [docs/i18n.md](docs/i18n.md)). Don't hardcode copy in components.
- **Content lives in `src/data/`**, not hardcoded in components. Edit data there; sections map over it.
