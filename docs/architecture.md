# Architecture

Read this when working on file/module structure, where things live, or how
components compose.

```
src/
  app/
    layout.tsx            # fonts, locale-aware metadata (OG/Twitter/canonical/title template) + <html lang>, LocaleProvider, Header/Footer/skip link
    page.tsx              # homepage: composes the section components in order
    robots.ts             # /robots.txt (allow all + sitemap link)
    sitemap.ts            # /sitemap.xml (the public routes)
    globals.css           # design tokens (@theme) + base styles
  components/
    layout/               # Header (client, mobile menu + language toggle), Footer
    sections/             # one component per homepage section
    ui/                   # reusable primitives: Container, Button, SectionHeading,
                          #   EventCard, ExperienceCard, PracticalCard, FavouriteButton
    decorative/           # folk visual elements: FolkBorder (bunting), ScallopEdge,
                          #   FolkStripe, JubilaeumBadge, ImagePlaceholder
    icons.tsx             # all inline SVG icons (24×24, stroke=currentColor)
  data/                   # static content arrays (site, navigation, events,
                          #   experiences, practical) - the only "content source" for now
  i18n/                   # cookie-based DA/EN: config (Locale, Localized), dictionaries
                          #   (UI chrome), server.ts (getLocale), LocaleProvider (client)
  lib/cn.ts               # tiny className joiner (no clsx dependency)
  lib/favourites.ts       # aff_favourites cookie: parse (SSR-safe) + client read/toggle
                          #   of favourited event ids (FavouriteButton writes it; a future
                          #   programme "Show favourited" filter will read it)
```

**Content lives in `src/data/`**, not hardcoded in components. Edit data there; sections map over it.

## Conventions

- Server components by default; add `"use client"` only when interactivity is needed
  (currently `Header`, `Newsletter`, `FavouriteButton`, and the i18n `LocaleProvider`). Section
  components are `async` server components that read the locale via `getLocale()`.
- Keep components small and composable; share spacing via `Container` and headings via
  `SectionHeading`. Use the `Button` component for all CTAs (it renders `<Link>` or `<button>`).
- Section `id`s double as in-page nav anchors (`#program`, `#oplev`, `#om`, `#praktisk`).

## SEO / metadata

- `site.url` (in `data/site.ts`) is the canonical origin and the single source of truth for
  `metadataBase`, `robots.ts`, and `sitemap.ts`. Update it there only.
- The root `layout.tsx` sets the shared OpenGraph/Twitter card (image: `public/images/opengraph.png`),
  a `%s | Aarhus Folk Festival` title template, and the home canonical. Subpages just set their
  page `title`, `description`, and own `alternates.canonical` — they inherit the OG/Twitter card.
- Adding a new public route? Give it a `canonical` in its `generateMetadata` and add it to `sitemap.ts`.
