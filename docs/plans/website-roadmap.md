# Website roadmap: optimisation and feature recommendations

An audit-based roadmap for the public Aarhus Folk Festival site as it stands on
2026-06-08. The site is already in a healthy shape: server-first App Router
pages, static content in `src/data/`, bilingual copy, real metadata, PWA install
and offline support, dark mode, favourites, and a derived programme model.

This roadmap is about the next useful layers, not a rewrite. It keeps the current
constraints: no CMS/backend, no auth/admin, no volunteer system, no analytics or
third-party tracking unless the cookies/consent approach is revisited first.

## Current strengths

- **Content model:** Artists and workshops own their showtimes, and the programme
  is derived from those `shows`. This makes programme features safer because new
  filters can read from existing event fields instead of duplicating schedules.
- **Bilingual architecture:** Locale handling is consistent, with UI chrome in
  `dictionaries.ts` and content fields as `Localized` data.
- **Public route coverage:** Homepage, programme, artists, workshops, detail
  pages, association, contact, cookies, sitemap and robots are all present.
- **Visitor utility:** Hearted programme items, calendar links, install prompt
  and offline fallback are already aligned with festival-goer needs.
- **Performance baseline:** Heavy animation and third-party scripts are absent,
  fonts are loaded through `next/font`, and photos use `next/image`.

## Constraints and assumptions

- The confirmed programme is still small. Do not design filters that require
  missing event fields such as ticket tier, age group, room, sold-out state or
  difficulty level.
- A programme filter is in scope now, but it should be derived from current data:
  day, category, venue, text search and favourites.
- A full practical-info page is in scope, but the content is not ready. Build it
  when the festival can supply venue, transport, food, accommodation,
  accessibility and ticket-practical details.
- Footer links for press, sponsors and archive currently point to homepage
  anchors that do not exist. Treat them as future content areas or remove/replace
  them when navigation is tightened.
- Page changes currently feel abrupt because the persistent header stays still
  while the main content swaps with no transition, loading treatment or shared
  top-of-page rhythm. Smooth this with restrained page choreography, not heavy
  animation.

---

## Phase 1: Programme filtering and navigation polish

**Goal:** Make `/program` useful once more events arrive, without needing more
event data than the site has today.

### Recommended programme filters

- **Day:** segmented chips for Thursday, Friday, Saturday and Sunday, derived
  from `festivalDays`.
- **Category:** concert, ball/dance, session, workshop, derived from
  `ProgramEvent.category`.
- **Venue:** derived from event venues. Hide the control or collapse it when
  there is only one venue in the visible data set.
- **Search:** client-side text search across title, category and venue. Keep it
  lightweight and forgiving.
- **Favourites:** keep the existing hearted-events filter, but make it one filter
  among the others.

### Implementation notes

- Keep the page as a server component and continue passing grouped programme data
  into `ProgramSchedule`.
- Extend the existing client `ProgramSchedule` rather than adding a separate
  filtering island.
- Store filter state in URL query params (`?day=fri&category=koncert`) so links
  are shareable and refresh-safe. Preserve the current locale cookie model.
- Add all filter labels, clear buttons, empty states and aria labels through the
  i18n system. Do not hardcode strings in the client component.
- Keep filter option labels locale-aware, but use stable structural values in the
  URL (`day=fri`, `category=concert` or a slug), not translated display strings.
- Add a result count and a clear-filters action. The empty state should tell the
  visitor whether the programme has no matches or whether no favourites are saved.

### Design guidance

- On mobile, prefer a compact toolbar with horizontal chips and a single search
  field. Avoid a large filter panel while the programme is still modest.
- On desktop, keep filters above the day groups, visually quieter than the event
  cards.
- Reuse existing button/chip styling, semantic colours and focus states. Do not
  introduce a new visual system.

### Verification

- `pnpm lint` is enough for a focused filter-only change; run `pnpm build` if URL
  query handling, metadata or route structure changes.
- Ask the owner for a browser pass if a dev server is already running.

---

## Phase 2: Navigation fluidity

**Goal:** Make movement between routes feel calmer and more intentional while
preserving accessibility and the current server-first architecture.

### What feels jarring today

- The header persists, but the page body changes instantly. Moving from the dark
  photographic homepage hero to a cream listing page is a strong visual cut.
- Listing pages share a similar page-intro layout, but route transitions do not
  acknowledge that shared structure.
- There is no route-level loading state. If a dynamic route waits on cookies,
  service-worker update checks or image work, the visitor gets a hard swap rather
  than a soft pending state.
- Back links on detail pages are useful, but there is no contextual "you are in
  artists/workshops/programme" trail to make nested navigation feel connected.

### Recommended improvements

- Add a small route-transition wrapper around the page content. Keep it to a
  short opacity + 4-8px vertical settle on route mount, and disable it under
  `prefers-reduced-motion`. Avoid long exit animations.
- Add `src/app/loading.tsx` with a lightweight skeleton that resembles the common
  page-intro shape. For programme and listing routes, the skeleton should reserve
  similar vertical space to reduce perceived layout jumps.
- Add contextual breadcrumbs on detail pages:
  `Forside / Kunstnere / Dreamers' Circus` and
  `Forside / Workshops / Åben folkesession`. Put labels in dictionaries and keep
  the visual treatment quiet.
- Normalize top spacing across standalone pages. Most pages use
  `py-16 sm:py-20`; detail pages use `py-12 sm:py-16`. This is fine, but detail
  routes should still feel intentionally connected to their listing pages through
  breadcrumbs and consistent intro/media rhythm.
- Make main-nav active states more forgiving for homepage anchors. If the visitor
  clicks "Praktisk info" from another route and lands on `/#praktisk`, the active
  state should not feel lost during the scroll/route change.
- Consider prefetching the most common routes explicitly only if measurements
  show delays. Next's normal `<Link>` prefetching is likely enough for the current
  small site, so start with visual continuity first.

### Motion rules

- Keep motion under roughly 200ms and use easing that feels like a gentle settle,
  not a slide show.
- Only animate opacity and transform. Do not animate height, top, layout, colour
  themes or large decorative elements during route changes.
- Respect `prefers-reduced-motion` globally. For reduced motion, skip movement
  and allow only an instant opacity change if needed.
- Do not animate the sticky header or footer on route changes. They are spatial
  anchors and should remain stable.

### Implementation notes

- A low-risk approach is `src/app/template.tsx` plus a small client component in
  `components/layout/RouteTransition.tsx` keyed by `usePathname()`. The server
  pages remain server components; only the transition shell is client-side.
- Keep transition copy out of the UI. The effect should be felt, not explained.
- Route-loading skeleton text should either be visually hidden or use dictionary
  strings if exposed to assistive technology.
- Validate on homepage to listing page, listing page to detail page, detail page
  back to listing page, and locale/theme toggles. Locale changes already call
  `router.refresh()`, so they should not accidentally trigger an over-dramatic
  page animation.

### Verification

- Run `pnpm lint` for the transition shell. Run `pnpm build` if adding
  `template.tsx`, `loading.tsx` or changing route structure.
- Ask the owner to check the feel in-browser, especially with reduced motion
  enabled and on mobile.

---

## Phase 3: Practical-info page, content-ready shell

**Goal:** Move "Praktisk info" from a homepage teaser into a useful public route
once the content is available.

### Recommended route and data model

- Add `/praktisk-info` as the canonical route.
- Expand `src/data/practical.ts` from teaser cards into page data:
  page metadata, intro copy, sections and linkable section ids.
- Keep the homepage `PracticalInfo` as a teaser that links to the full page.
- Add `/praktisk-info` to `mainNav`, `sitemap.ts` and page metadata.

### Recommended sections

- **Steder & transport:** venue addresses, maps link policy, bus/light rail,
  parking, cycling and how to move between venues.
- **Billetter:** Place2book link, wristbands, ticket exchange/refund wording if
  the organisers provide it.
- **Mad & drikke:** what is available at venues and nearby, without implying
  partnerships before they are confirmed.
- **Overnatning:** neutral guidance and links if available.
- **Tilgængelighed:** entrances, seating, companions, quiet options, toilets,
  contact route for special needs.
- **Kontakt på dagen:** only when the organisers can provide a reliable channel.

### Content-risk note

Do not fabricate practical details. If the page is built before details are
confirmed, make it a clear "kommer senere" page with warm copy and links to
contact/programme. Avoid placeholder addresses, opening hours, accessibility
claims or transport advice.

---

## Phase 4: SEO, metadata and route quality

**Goal:** Improve discoverability and reduce dead-end navigation.

- Replace or implement the footer's current `/#presse`, `/#sponsorer` and
  `/#arkiv` links. They should point to real sections/routes or be removed until
  content exists.
- Add structured data when the programme has enough confidence:
  `Event` JSON-LD for the festival as a whole, and optionally for individual
  performances. Use stable dates, venues and canonical URLs from `src/data/`.
- Consider `hreflang` only if the locale architecture changes to locale routes.
  With cookie-based locale and one URL per page, avoid pretending there are
  separate DA/EN URLs.
- Revisit `site.url` when the project moves from `folk.gamestormers.dk` to
  `www.aarhusfolkfestival.dk`; this affects metadata, sitemap and robots.
- Add a small "last updated" convention for programme copy if the organisers want
  visitors to trust that the schedule is current.

---

## Phase 5: Performance and asset optimisation

**Goal:** Keep the site fast as content and photos grow.

### Recommended actions

- Optimise `public/images/opengraph.png`; it is larger than it needs to be for a
  social card. Aim for a visually identical but smaller PNG/JPEG/WebP as
  appropriate.
- Move unused design mockups out of `public/images` or document that they are
  intentionally public reference files. They are not requested by the app, but
  keeping multi-megabyte unused files in `public` makes accidental linking and
  deploy payload bloat more likely.
- As more artist photos arrive, set target dimensions and compression guidance in
  `docs/design-system.md`. Current event photos are reasonable, but this needs a
  rule before the media library grows.
- Keep using `next/image` for all real photos. Add `priority` only for true
  above-the-fold images, currently the hero.
- Run Lighthouse/Web Vitals checks after the practical-info page and richer
  programme filters ship, not after every tiny copy edit.

### Lower-priority optimisation

- The cookie-based locale/theme approach makes routes dynamic. That tradeoff is
  documented and acceptable today. Revisit only if static caching becomes a real
  hosting or performance concern.
- Bundle splitting is already helped by server components. Avoid adding broad
  client components for purely presentational sections.

---

## Phase 6: Visitor-experience polish

**Goal:** Add small features that help festival guests without changing the site
into an app with accounts or backend state.

- Add a "My programme" view or section on `/program` that is just the existing
  favourites filter presented more clearly.
- Add calendar export for a filtered/favourited programme only if it can be done
  client-side from current data. No server persistence.
- Add "copy link to filtered programme" once URL query filters exist.
- Improve empty states as the programme grows: no matches, no events on selected
  day, no favourites, and programme not yet fully announced.
- Add venue detail cards when reliable venue information arrives. Keep them in
  `src/data/`, not hardcoded in components.

---

## Deferred or out of scope

- **CMS/backend/admin:** still out of scope for this concept.
- **Volunteer signup or management:** explicitly out of scope.
- **Newsletter backend:** not recommended until the owner wants real email
  capture, consent text and privacy updates.
- **Analytics/marketing pixels:** do not add without updating `/cookies` and the
  consent approach.
- **Web push:** possible later, but it requires backend subscription storage and
  should remain a separate project.

## Suggested order

1. Programme filters on `/program`.
2. Navigation-fluidity pass: route transition, loading skeleton and breadcrumbs.
3. Navigation cleanup for footer dead anchors.
4. Practical-info page once real content is available.
5. Asset optimisation pass and media-size guidelines.
6. Structured data and richer event SEO after the programme/venues are more
   complete.

This sequence gives the owner visible utility quickly while keeping content risk
low and preserving the current static, public-facing architecture.
