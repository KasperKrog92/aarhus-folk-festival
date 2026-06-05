# Aarhus Folk Festival

A public-facing website concept for **Aarhus Folk Festival** (24.–27. september 2026) —
a warm, modern Nordic folk take on the festival's web presence. Currently a single
polished, bilingual (Danish / English) homepage with static content, plus
`/foreningen` and `/kontakt` pages.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19
- TypeScript (strict), path alias `@/* → src/*`
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`; no `tailwind.config`)
- Fonts via `next/font/google`: Fraunces (display) + Plus Jakarta Sans (body)
- pnpm for package management

## Getting started

```bash
pnpm install
pnpm dev      # dev server on http://localhost:3000
```

## Commands

```bash
pnpm dev      # dev server
pnpm build    # production build (also runs typecheck)
pnpm lint     # eslint
```

## Project guide

Working in the codebase? Start with **[AGENTS.md](AGENTS.md)** — the shared guide for
contributors and AI agents. Deeper topic docs live in [`docs/`](docs/)
(architecture, i18n, content & tone, design system).
