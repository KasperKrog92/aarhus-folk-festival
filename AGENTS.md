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

Scale verification to the change: `pnpm lint` or a typecheck is often enough for
small code edits, while `pnpm build` is for substantive changes that need full
production confidence. For tiny visual copy/CSS/SVG adjustments, do not run a
build unless explicitly requested.

If a dev server is already running, do **not** open the site or run browser
verification yourself. Assume the owner has it open and will check visual
changes manually; ask them to verify anything that needs browser judgment.

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
    layout.tsx            # fonts, locale-aware metadata + <html lang>, LocaleProvider, Header/Footer/skip link
    page.tsx              # homepage: composes the section components in order
    globals.css           # design tokens (@theme) + base styles
  components/
    layout/               # Header (client, mobile menu + language toggle), Footer
    sections/             # one component per homepage section
    ui/                   # reusable primitives: Container, Button, SectionHeading,
                          #   EventCard, ExperienceCard, PracticalCard
    decorative/           # folk visual elements: FolkBorder (bunting), ScallopEdge,
                          #   FolkStripe, JubilaeumBadge, ImagePlaceholder
    icons.tsx             # all inline SVG icons (24×24, stroke=currentColor)
  data/                   # static content arrays (site, navigation, events,
                          #   experiences, practical) — the only "content source" for now
  i18n/                   # cookie-based DA/EN: config (Locale, Localized), dictionaries
                          #   (UI chrome), server.ts (getLocale), LocaleProvider (client)
  lib/cn.ts               # tiny className joiner (no clsx dependency)
```

**Content lives in `src/data/`**, not hardcoded in components. Edit data there; sections map over it.

## Internationalisation (i18n)

The site is bilingual **Danish (default) / English**, switched by the header
toggle. There is **no locale routing** — the choice is stored in a cookie
(`aff_locale`) and read server-side, so the URL never changes.

- **UI-chrome strings** (buttons, headings, aria-labels, alt text) live in
  `src/i18n/dictionaries.ts` as `{ da, en }`. The Danish object defines the
  `Dictionary` shape; English must match it (missing keys = type error).
  Interpolated values (titles, dates) are composed at the call site.
- **Content data** in `src/data/` stores each translatable field as
  `Localized<string>` (`= { da, en }`); structural fields (`id`, `href`, `time`,
  `tone`, `icon`) stay plain.
- **Server components** read the locale with `await getLocale()` from
  `@/i18n/server` and `getDictionary(locale)`, then index `field[locale]`. Cards
  receive `locale` as a prop.
- **Client components** use `useLocale()` / `useTranslations()` from
  `@/i18n/LocaleProvider`. Setting a locale writes the cookie and calls
  `router.refresh()` so the server tree re-renders.

When adding copy: add the key to **both** `da` and `en` (or a `Localized` field
to the data), never hardcode a user-facing string in a component.

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
- Real photography is arriving incrementally. `EventCard` already renders a real photo via
  `next/image` when an event has an `image` (e.g. `public/events/detlysebal.jpg`), and falls
  back to `ImagePlaceholder` otherwise. Elsewhere, `ImagePlaceholder` still renders on-brand
  gradient stand-ins; swap it for `next/image` as photos arrive (keep the descriptive `alt`).

## Important constraints (do not violate)

- **Public-facing only.** No login / auth / admin / accounts.
- **No volunteer system.** The reference mockup shows a "frivilligt arbejde" CTA — it was
  intentionally replaced with a warm "Om festivalen" / community section. Do not add volunteer
  signup or management.
- **No CMS / backend.** Content is static arrays in `src/data/`. The newsletter form is a
  visual demo only (`preventDefault`, no network).
- **Mobile-first, accessible, semantic.** Keep landmark elements, real heading order, focus
  styles, and descriptive `alt`/`aria-label`. `<html lang>` follows the active locale.
- **Bilingual UI copy (DA default / EN).** Danish is the default and source of truth; every
  user-facing string is also authored in English via the i18n system above — don't hardcode
  copy in components. (This supersedes the earlier "UI copy is Danish only" rule.)

## Conventions

- Server components by default; add `"use client"` only when interactivity is needed
  (currently `Header`, `Newsletter`, and the i18n `LocaleProvider`). Section components are
  `async` server components that read the locale via `getLocale()`.
- Keep components small and composable; share spacing via `Container` and headings via
  `SectionHeading`. Use the `Button` component for all CTAs (it renders `<Link>` or `<button>`).
- Section `id`s double as in-page nav anchors (`#program`, `#oplev`, `#om`, `#praktisk`).
