# Architecture

Read this when working on file/module structure, where things live, or how
components compose.

```
src/
  app/
    layout.tsx            # fonts, locale-aware metadata (OG/Twitter/canonical/title template) + <html lang>, LocaleProvider, Header/Footer/skip link
    page.tsx              # homepage: composes the section components in order
    program/              # /program: full schedule, grouped by day (derived from acts)
    kunstnere/            # /kunstnere + /kunstnere/[slug]: artists listing + detail
    workshops/            # /workshops + /workshops/[slug]: workshops listing + detail
    om-festivalen/        # /om-festivalen: atmospheric, copy-led "Om festivalen" about page
    foreningen/, kontakt/ # association + contact pages
    robots.ts             # /robots.txt (allow all + sitemap link)
    sitemap.ts            # /sitemap.xml (the public routes)
    globals.css           # design tokens (@theme) + base styles
  components/
    layout/               # Header (client, mobile menu + language toggle), Footer
    sections/             # one component per homepage section, plus ActListing
                          #   (shared artist/workshop listing-page body), ActDetail
                          #   (shared artist/workshop detail-page body) and
                          #   ProgramSchedule (the /program list + favourites filter)
    ui/                   # reusable primitives: Container, Button, SectionHeading, ActCard,
                          #   EventCard, ExperienceCard, PracticalCard, FavouriteButton
    decorative/           # folk visual elements: FolkBorder (bunting), ScallopEdge,
                          #   FolkStripe, JubilaeumBadge, ImagePlaceholder
    icons.tsx             # all inline SVG icons (24×24, stroke=currentColor)
  data/                   # static content (site, navigation, artists, workshops, program,
                          #   experiences, practical, about, association, contact) - the "content source"
  i18n/                   # cookie-based DA/EN: config (Locale, Localized), dictionaries
                          #   (UI chrome), server.ts (getLocale), LocaleProvider (client)
  lib/cn.ts               # tiny className joiner (no clsx dependency)
  lib/theme.ts            # framework-free theme config: Theme type, THEME_COOKIE, defaultTheme, isTheme()
  lib/theme-server.ts     # server-only getTheme(): reads aff_theme cookie, falls back to "light"
  lib/favourites.ts       # aff_favourites cookie: parse (SSR-safe) + client read/toggle
                          #   of favourited event ids (FavouriteButton writes it; the
                          #   programme's ProgramSchedule filter reads it)
  components/theme/       # ThemeProvider (client, holds theme state + setTheme)
                          #   ThemeToggle (sun/moon button, placed in Header)
```

**Content lives in `src/data/`**, not hardcoded in components. Edit data there; sections map over it.

## Programme & acts (the schedule model)

"Acts" own their content **and** their showtimes; the programme is *derived* from
them, so an act that plays more than once is edited in one place.

- `data/artists.ts` and `data/workshops.ts` export the acts plus their listing-page
  copy. Every act has a `category`, an image/`tone`, and a `shows: Show[]` array,
  one entry per appearance (`dayId` + `time` + `venue`).
- `data/program.ts` is the schedule backbone: `festivalDays` (the day list), the
  shared `Show` / `ActDetailShow` / `ProgramEvent` / `EventTone` types,
  `getProgramByDay()`, which flattens every act's `shows` into a time-sorted,
  day-grouped programme (empty days are dropped), and `actDetailShows()`, which
  resolves an act's showtimes for the shared detail-page panel. `formatDay(dayId,
  locale)` resolves a day label.
- `/program` and the homepage `ProgramPreview` both render `getProgramByDay()`;
  each act's detail page renders its own `shows` via `ActDetail`. `EventCard` takes
  a `ProgramEvent` and links to the act's page; `ActListing` is the shared listing
  page body for act collections, while `ActCard` is the shared listing card.
- `/program` passes the day groups to the client `ProgramSchedule`, which adds the
  "Vis hjerte-events" toggle: it reads the `aff_favourites` cookie (via
  `lib/favourites.ts`) as an external store and narrows the list to favourited
  events. The page itself stays a server component; the filter is the only client part.
- **To add an act:** add it to `artists.ts` / `workshops.ts` with its `shows`. It
  then appears in the programme, the homepage preview and its own detail page
  automatically. Reuse `ActListing` / `ActCard` / `ActDetail`, `actDetailShows()`,
  and `lib/metadata.ts`'s `actMetadata()` for any new act listing/detail pages.

## Conventions

- Server components by default; add `"use client"` only when interactivity is needed
  (currently `Header`, `Newsletter`, `FavouriteButton`, the i18n `LocaleProvider`, and
  `ThemeProvider` / `ThemeToggle`). Section components are `async` server components that
  read the locale via `getLocale()`.
- Keep components small and composable; share spacing via `Container` and headings via
  `SectionHeading` — its default `size="section"` is for in-page `<h2>` sections, and
  `size="page"` (defaults `as="h1"`) is the larger eyebrow/title/intro block at the top of a
  standalone page. Use the `Button` component for all CTAs (it renders `<Link>` or `<button>`).
- Homepage section `id`s double as in-page nav anchors (`#oplev`, `#om`, `#praktisk`; the
  homepage keeps a `#program` preview section). Program, Kunstnere, Workshops and Om festivalen
  are dedicated routes (`/program`, `/kunstnere`, `/workshops`, `/om-festivalen`), not anchors.
  The homepage `AboutSection` (`#om`) is a teaser whose CTA links to `/om-festivalen`.

## SEO / metadata

- `site.url` (in `data/site.ts`) is the canonical origin and the single source of truth for
  `metadataBase`, `robots.ts`, and `sitemap.ts`. Update it there only.
- The root `layout.tsx` sets the shared OpenGraph/Twitter card (image: `public/images/opengraph.png`),
  a `%s | Aarhus Folk Festival` title template, and the home canonical. Subpages just set their
  page `title`, `description`, and own `alternates.canonical` — they inherit the OG/Twitter card.
- Adding a new public route? Give it a `canonical` in its `generateMetadata` and add it to `sitemap.ts`.
