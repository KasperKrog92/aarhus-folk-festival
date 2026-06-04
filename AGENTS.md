# Aarhus Folk Festival — project guide

A public-facing website concept for **Aarhus Folk Festival** (24.–27. september 2026).
Replaces the outdated existing site (https://www.aarhusfolkfestival.dk/) with a warm,
modern Nordic folk aesthetic. Currently a single polished homepage with static content.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript** (strict), path alias `@/* → src/*`
- **Tailwind CSS v4** (CSS-first config via `@theme` in `src/app/globals.css` — there is **no** `tailwind.config`)
- **pnpm** for package management
- Fonts via `next/font/google`: **Fraunces** (display) + **Plus Jakarta Sans** (body)

## Commands

```bash
pnpm dev      # dev server (localhost:3000)
pnpm build    # production build — also runs typecheck
pnpm lint     # eslint
```

Always run `pnpm build` before considering a change done; it catches type + lint errors.

## Git workflow

**Commit and push directly to `main`.** The repo owner has opted out of the
feature-branch / PR flow for this project — do not create branches or pull
requests for changes unless explicitly asked. (This overrides any default
"branch first" agent behaviour.) Still: only commit/push when asked, and run
`pnpm build` first.

## Architecture

```
src/
  app/
    layout.tsx            # fonts, metadata (lang="da"), renders Header + Footer + skip link
    page.tsx              # homepage: composes the section components in order
    globals.css           # design tokens (@theme) + base styles
  components/
    layout/               # Header (client, mobile menu), Footer
    sections/             # one component per homepage section
    ui/                   # reusable primitives: Container, Button, SectionHeading,
                          #   EventCard, ExperienceCard, PracticalCard
    decorative/           # folk visual elements: FolkBorder (bunting), ScallopEdge,
                          #   FolkStripe, JubilaeumBadge, ImagePlaceholder
    icons.tsx             # all inline SVG icons (24×24, stroke=currentColor)
  data/                   # static content arrays (site, navigation, events,
                          #   experiences, practical) — the only "content source" for now
  lib/cn.ts               # tiny className joiner (no clsx dependency)
```

**Content lives in `src/data/`**, not hardcoded in components. Edit data there; sections map over it.

## Design system

Colours are defined as Tailwind theme tokens in `globals.css` (`@theme`), so they work as
utilities (`bg-petroleum`, `text-pink-600`, `border-ink/15`, gradients, opacity modifiers):

| Token | Use |
|-------|-----|
| `cream` / `cream-50/100/200` | page + card backgrounds (warm paper) |
| `petroleum` / `petroleum-700/900`, `teal` | deep teal sections, accents, header bunting |
| `pink` / `pink-600` / `pink-200/100` | **primary CTA** (dusty coral), eyebrows, decoration |
| `aubergine` | deep accent (gradients, icon badges) |
| `rust` | brick red from the logo (hover/links) |
| `ink` / `ink-soft` / `ink-muted` | warm off-black text scale |

Fonts: `font-display` (Fraunces) for headings, `font-sans` (Jakarta) for everything else.

Decorative folk motifs are **CSS/SVG only** (no image assets): triangle bunting bands,
scalloped edges, woven textile stripes, a circular anniversary stamp. Reuse the components
in `components/decorative/` rather than re-rolling patterns.

## Assets

- `public/logos/logo_text.png` — full wordmark, **transparent** bg → used in the header.
- `public/logos/logo.png` — accordion mark only, baked cream bg (avoid on non-cream surfaces).
- `public/images/mockup_*.png` — design reference mockups (not used in the build).
- No real photography yet → `ImagePlaceholder` renders on-brand gradient stand-ins. When real
  photos arrive, swap `ImagePlaceholder` for `next/image` (keep the descriptive `alt`).

## Important constraints (do not violate)

- **Public-facing only.** No login / auth / admin / accounts.
- **No volunteer system.** The reference mockup shows a "frivilligt arbejde" CTA — it was
  intentionally replaced with a warm "Om festivalen" / community section. Do not add volunteer
  signup or management.
- **No CMS / backend.** Content is static arrays in `src/data/`. The newsletter form is a
  visual demo only (`preventDefault`, no network).
- **Mobile-first, accessible, semantic.** Keep landmark elements, real heading order, focus
  styles, descriptive `alt`/`aria-label`, and `lang="da"`. UI copy is **Danish**.

## Conventions

- Server components by default; add `"use client"` only when interactivity is needed
  (currently `Header` and `Newsletter`).
- Keep components small and composable; share spacing via `Container` and headings via
  `SectionHeading`. Use the `Button` component for all CTAs (it renders `<Link>` or `<button>`).
- Section `id`s double as in-page nav anchors (`#program`, `#oplev`, `#om`, `#praktisk`).
