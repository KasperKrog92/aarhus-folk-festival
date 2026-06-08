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
    cookies/              # cookies/privacy information page, no consent banner
    robots.ts             # /robots.txt (allow all + sitemap link)
    sitemap.ts            # /sitemap.xml (the public routes)
    manifest.ts           # /manifest.webmanifest (PWA install metadata, from site.ts)
    ~offline/             # offline fallback page the SW serves when a navigation fails
    globals.css           # design tokens (@theme) + base styles
  components/
    layout/               # Header (client, mobile menu + language toggle), Footer
    sections/             # one component per homepage section, plus ActListing
                          #   (shared artist/workshop listing-page body), ActDetail
                          #   (shared artist/workshop detail-page body) and
                          #   ProgramSchedule (the /program list + favourites filter)
    ui/                   # reusable primitives: Container, Button, SectionHeading, ActCard,
                          #   EventCard, CardShell/CardImage (shared card frame + 4:3 media),
                          #   ExperienceCard, PracticalCard, EmailLink, FavouriteButton
    decorative/           # folk visual elements: FolkBorder (bunting), ScallopEdge,
                          #   FolkStripe, JubilaeumBadge, HeartDivider, ImagePlaceholder
    icons.tsx             # all inline SVG icons (24×24, stroke=currentColor)
  data/                   # static content (site, navigation, artists, workshops, program,
                          #   experiences, practical, about, association, contact) - the "content source"
  i18n/                   # cookie-based DA/EN: config (Locale, Localized), dictionaries
                          #   (UI chrome), server.ts (getLocale), LocaleProvider (client)
  lib/cn.ts               # tiny className joiner (no clsx dependency)
  lib/calendar.ts         # static Google Calendar + .ics link generation for programme shows
  lib/metadata.ts         # generateMetadata helpers: pageMetadata (localized title/
                          #   description + canonical) and actMetadata (adds OpenGraph)
  lib/theme.ts            # framework-free theme config: Theme type, THEME_COOKIE, defaultTheme, isTheme()
  lib/theme-server.ts     # server-only getTheme(): reads aff_theme cookie, falls back to "light"
  lib/favourites.ts       # aff_favourites localStorage key: parse (SSR-safe) + client read/toggle
                          #   of favourited event ids (FavouriteButton writes it; the
                          #   programme's ProgramSchedule filter reads it)
  components/theme/       # ThemeProvider (client, holds theme state + setTheme)
                          #   ThemeToggle (sun/moon button, placed in Header)
  components/pwa/         # UpdatePrompt (client snackbar: offers to reload when a
                          #   new service worker is waiting); InstallPrompt
                          #   (mobile-only add-to-home-screen banner)
  sw.ts                   # Serwist service worker source (compiled to public/sw.js on prod build)
```

**Content lives in `src/data/`**, not hardcoded in components. Edit data there; sections map over it.

## Programme & acts (the schedule model)

"Acts" own their content **and** their showtimes; the programme is *derived* from
them, so an act that plays more than once is edited in one place.

- `data/artists.ts` and `data/workshops.ts` export the acts plus their listing-page
  copy. Every act has a `category`, an image/`tone`, and a `shows: Show[]` array,
  one entry per appearance (`dayId` + `time` + `venue`).
- `data/program.ts` is the schedule backbone: `festivalDays` (the day list, including
  local ISO dates for calendar links), the shared `Show` / `ActDetailShow` /
  `ProgramEvent` / `EventTone` types,
  `getProgramByDay()`, which flattens every act's `shows` into a time-sorted,
  day-grouped programme (empty days are dropped), and `actDetailShows()`, which
  resolves an act's showtimes for the shared detail-page panel. `formatDay(dayId,
  locale)` resolves a day label.
- `/program` and the homepage `ProgramPreview` both render `getProgramByDay()`;
  each act's detail page renders its own `shows` via `ActDetail`. `EventCard` takes
  a `ProgramEvent` and links to the act's page; `ActListing` is the shared listing
  page body for act collections, while `ActCard` is the shared listing card.
- `ActDetail` also renders a per-show "Føj til kalender" dropdown. Calendar entries are
  static links generated by `lib/calendar.ts` from the show's local date, time, venue,
  duration (default: 90 minutes), active-locale tagline/bio, and detail-page URL.
- `/program` passes the day groups to the client `ProgramSchedule`, which adds the
  "Vis hjerte-events" toggle: it reads the `aff_favourites` localStorage key (via
  `lib/favourites.ts`) as an external store and narrows the list to favourited
  events. `lib/favourites.ts` still migrates and expires the old cookie if a
  returning visitor has one. The page itself stays a server component; the filter
  is the only client part.
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
  Build that object with `lib/metadata.ts`'s `pageMetadata({ title, description, href }, locale)`
  (it takes the `Localized` fields and resolves them) rather than hand-rolling it; act detail pages
  use `actMetadata()` instead, which also emits OpenGraph.
- Adding a new public route? Give its `generateMetadata` a `canonical` via `pageMetadata` and add it to `sitemap.ts`.
- `/cookies` is an informational page for the current first-party storage setup.
  The site has no analytics, marketing pixels, third-party embeds or consent
  banner. If non-essential cookies or similar technologies are added, revisit the
  consent approach and update `src/data/cookies.ts`.

## PWA / service worker

The site is an installable PWA. See [plans/pwa.md](plans/pwa.md) for the full
rationale and the remaining roadmap (cache warming and web push are not built).

- `app/manifest.ts` emits `/manifest.webmanifest` from `site.ts` constants
  (`start_url: /program`, `short_name: AFF`, light brand `theme_color`). The root
  `layout.tsx` adds `applicationName`, `appleWebApp`, `formatDetection`, and the
  Apple touch icon (see [design-system.md](design-system.md) for the icon set).
- `src/sw.ts` is the Serwist service worker source. `next.config.ts` wraps the
  config with `withSerwistInit` and compiles it to `public/sw.js` **on production
  build only** (disabled in dev). The generated `public/sw*` / `public/swe-worker*`
  are gitignored — only `public/icons/*` are committed.
- It precaches the build output plus the `/~offline` fallback (re-versioned per
  deploy via `git rev-parse HEAD` in `next.config.ts`), runtime-caches `/logos`,
  `/images`, `/icons` CacheFirst (30-day expiry), otherwise spreads Serwist's
  `defaultCache` (NetworkFirst for document navigations, so cached HTML never
  serves a stale locale/theme), and falls back to `app/~offline/page.tsx` when an
  offline navigation fails.
- **Updates wait for consent.** The SW uses `skipWaiting: false` so a new build
  installs but does not take over the page until the visitor agrees. The client
  `components/pwa/UpdatePrompt.tsx` snackbar (rendered in `layout.tsx`) watches
  for the waiting worker, and on "reload" posts the `SKIP_WAITING` message
  Serwist handles, then reloads on `controllerchange`. `clientsClaim` still lets
  the worker control the page on first install (and fire that `controllerchange`).
- **Install prompt is mobile-only, with two modes.** `components/pwa/InstallPrompt.tsx`
  shows a warm add-to-home-screen card. On **Chromium** it stashes the
  `beforeinstallprompt` event and offers an install button that replays it; this
  card is `sm:hidden`, so desktop keeps the browser's address-bar install icon. On
  **iOS Safari** (no `beforeinstallprompt`) it instead shows a Share → "Add to Home
  Screen" hint (no button — iOS has no programmatic trigger; that card isn't
  viewport-gated since the detection already implies a touch device). A
  `localStorage` flag (`aff_install_dismissed`) stops either card nagging after
  dismiss/install. When Chromium reports `appinstalled`, the card becomes a short
  confirmation that tells the visitor to open the app from the home screen.
  Already-installed (standalone) visitors never see it. Copy: `install.*` keys;
  the Share glyph is `IconShare`.
- **Both build and dev pass an explicit bundler flag.** `pnpm build` →
  `next build --webpack` (Serwist's SW bundling needs Webpack); `pnpm dev` →
  `next dev --turbopack` (Turbopack, SW disabled). The flags are not optional:
  `@serwist/next` injects a `webpack` config into `next.config.ts`, and Next 16
  defaults to Turbopack, so an unflagged `next dev` aborts with a
  "Turbopack + webpack config" error. Keep both flags.
