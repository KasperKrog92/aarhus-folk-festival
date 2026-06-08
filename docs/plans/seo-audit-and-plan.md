# SEO audit & implementation plan

A full SEO audit of the Aarhus Folk Festival site as it stands on **2026-06-08**,
plus a phased plan to close the gaps. This complements
[website-roadmap.md](website-roadmap.md) (whose Phase 4 sketched SEO at a high
level); this document is the detailed, implementation-ready version. It keeps the
project constraints: no CMS/backend, no analytics, content stays in `src/data/`,
DA-default bilingual copy, public-facing only.

## TL;DR

The metadata foundation is genuinely good — `metadataBase`, title template,
canonical URLs, OpenGraph/Twitter cards, `robots.ts`, a complete `sitemap.ts`,
PWA manifest, semantic HTML, `next/font`, and `next/image` are all in place, and
every route already sets per-page metadata via `lib/metadata.ts`. The work left
is **higher-order discoverability**, in priority order:

1. **Structured data (JSON-LD)** — none exists today. This is the single biggest
   win: `Event`/`Festival`, `MusicEvent` per performance, `Organization`,
   `WebSite`, and `BreadcrumbList`. The data model already has everything needed.
2. **Canonical domain** — the site runs on the **temporary** origin
   `folk.gamestormers.dk` and will later move to the real domain. *Decided + done:*
   the staging host is now `noindex`ed (see Phase 1) so it never accrues index
   signals; `site.url` stays the single source of truth and gets repointed at the
   real domain on launch.
3. **Crawl dead-ends** — footer links `/#presse`, `/#sponsorer`, `/#arkiv` and
   the nav's `/#praktisk` resolve to anchors that don't exist.
4. **Bilingual indexing** — cookie-based locale means one URL serves both
   languages, so the English copy is effectively invisible to search. A decision
   is needed (accept, or move to locale routes).
5. **Polish** — OG image dimensions/alt on act pages, social-card refinements,
   sitemap `lastModified` accuracy, OG image weight.

---

## Audit findings

Severity: **P1** = do first (real ranking/indexing impact), **P2** = worthwhile,
**P3** = polish.

| # | Severity | Area | Finding |
|---|----------|------|---------|
| 1 | **P1** | Structured data | No JSON-LD anywhere (`grep` for `application/ld+json` returns nothing). No `Event`, `MusicEvent`, `Organization`, `WebSite`, or `BreadcrumbList`. The richest opportunity for a festival site — event rich results, knowledge-panel eligibility, breadcrumb display in SERPs. |
| 2 | ~~**P1**~~ **Resolved** | Canonical host | `site.url = "https://folk.gamestormers.dk"` ([src/data/site.ts:31](../../src/data/site.ts)) is a temporary host that feeds `metadataBase`, every `canonical`, `robots.ts`, and `sitemap.ts`. **Resolved:** the host is `noindex`ed via `next.config.ts` `noindexHosts` (Phase 1), so it can't accrue index signals before the move; repoint `site.url` at the real domain on launch and drop it from `noindexHosts`. |
| 3 | **P1** | Crawlability | Footer `footerNav` has `/#presse`, `/#sponsorer`, `/#arkiv` ([src/data/navigation.ts:20-22](../../src/data/navigation.ts)); these sections don't exist. `mainNav` "Praktisk info" points at `/#praktisk` (a homepage anchor, not a route). Dead/ambiguous internal links waste crawl budget and hurt UX. |
| 4 | **P2** | i18n / hreflang | Locale is a cookie with **one URL per page** ([src/i18n/server.ts](../../src/i18n/server.ts)). A cookie-less crawler always gets Danish, so EN content is never indexed and `hreflang` is not applicable. Documented tradeoff — but worth an explicit decision now that SEO is in focus. |
| 5 | **P2** | Social cards | `actMetadata()` OG images ship a bare `url` with no `width`/`height`/`alt` ([src/lib/metadata.ts:50](../../src/lib/metadata.ts)). Twitter card has no `site`/`creator`. Root OG image is a single shared graphic (fine, but no per-act preview beyond the photo). |
| 6 | **P2** | Sitemap freshness | `sitemap.ts` stamps **every** route with `new Date()` at build time, so `lastModified` is meaningless (all equal, changes every build). Better to derive per-route dates or use a stable content date. |
| 7 | **P2** | Performance / CWV | `public/images/opengraph.png` is heavier than a social card needs (also flagged in roadmap Phase 5). LCP image (hero) is handled well already (`fetchPriority="high"`, `sizes`). Confirm no CLS from `next/image fill` usages. |
| 8 | **P3** | Title/description length | Homepage `title` = `name + " " + year + " — " + tagline` and `description` concatenates tagline + dates + intro ([src/app/layout.tsx:37-38](../../src/app/layout.tsx)). Verify rendered length stays within ~60 char (title) / ~155 char (description) before truncation in SERPs. |
| 9 | **P3** | 404 / offline | No custom `app/not-found.tsx` metadata audit; `~offline` sets metadata. Confirm 404s return proper status + `noindex` isn't needed (Next handles status; just verify nothing 200s a soft-404). |
| 10 | **P3** | Favicon set | `icons` only sets `apple`. No explicit `icon`/`shortcut` in metadata (Next auto-detects `app/icon`/`favicon`). Confirm a real favicon resolves; add explicit `icons.icon` if not. |

---

## Plan

### Phase 0 — Decisions

- **Canonical domain (finding 2) — decided.** `folk.gamestormers.dk` is a
  temporary host; it is `noindex`ed now (Phase 1) and `site.url` gets repointed at
  the real domain on launch. No further decision needed.
- **Bilingual indexing (finding 4) — open.** Accept DA-only indexing (simplest,
  matches the cookie model), or commit to locale-prefixed routes (`/en/...`) to
  make EN indexable with proper `hreflang`. The latter is a larger architectural
  change and is **out of scope for this plan unless explicitly chosen** — captured
  in "Deferred" below. This is surfaced to the owner rather than decided
  unilaterally.

### Phase 1 — Canonical host & crawl hygiene (P1, small)

Highest impact-to-effort. No new architecture.

1. **Keep `site.url` truthful.** Leave the single source of truth in
   [src/data/site.ts](../../src/data/site.ts). When the real domain goes live,
   change it there only (already documented in `docs/architecture.md` SEO section).
2. **Guard staging from indexing — done.** `folk.gamestormers.dk` is a temporary
   host (not the final domain), so `next.config.ts` now returns `X-Robots-Tag:
   noindex, nofollow` for any request whose host is in `noindexHosts`. Crawling
   stays *allowed* in `robots.ts` on purpose: a crawler must be able to fetch the
   page to see the `noindex` header — a `Disallow` would hide it and could still
   surface a URL-only result. When the site moves to the real domain, remove the
   host from `noindexHosts` and point `site.url` at the new origin.
3. **Fix dead nav/footer links (finding 3).** In
   [src/data/navigation.ts](../../src/data/navigation.ts):
   - Remove `/#presse`, `/#sponsorer`, `/#arkiv` from `footerNav` until those
     content areas exist (or repoint to real pages). Roadmap Phase 4 already
     calls for this.
   - Resolve "Praktisk info" `/#praktisk`: either keep it as a homepage anchor
     that genuinely exists, or (preferred, aligns with roadmap Phase 3) make
     `/praktisk-info` a real route when content is ready. Until then, ensure the
     anchor target id actually renders on the homepage.

Verification: `pnpm lint`, plus a crawl check that no internal link 404s/soft-404s.

### Phase 2 — Structured data / JSON-LD (P1, the main feature)

The biggest discoverability gain. All data already exists in `src/data/`
(`festivalDays[].dateIso`, each `Show` has `time` + `venue` + `durationMinutes`,
`site.ts` has name/dates/url). Build server-rendered JSON-LD — no client JS.

**Approach:** add a tiny `lib/structured-data.ts` with typed builders that return
plain objects, and a small server component
`components/seo/JsonLd.tsx` that renders
`<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />`.
Render the right graph per route. Reuse the existing local-datetime parsing shape
from [src/lib/calendar.ts](../../src/lib/calendar.ts) (build an ISO-8601
`startDate` like `2026-09-24T17:00:00+02:00` from `dateIso` + `time` +
`Europe/Copenhagen`) rather than duplicating date math — factor a shared helper if
needed.

Graphs to emit:

- **Root layout (sitewide):** `Organization` (name, `url`, `logo`
  `/logos/logo.png`, `sameAs` → the Facebook + Instagram URLs already in
  `Footer.tsx`) and `WebSite` (name, url; `potentialAction`/SearchAction only if a
  real on-site search exists — it doesn't yet, so omit). Render once in
  `app/layout.tsx`.
- **Homepage:** the festival as a single `Festival` / `Event` (subtype
  `MusicFestival` via `@type: ["Event","MusicEvent"]` or `Festival`), with
  `name`, `startDate` (2026-09-24), `endDate` (2026-09-27), `location`
  (`Place` → Aarhus; use a generic city `Place` until venue addresses exist),
  `image` (`/images/opengraph.png`), `description`, `organizer` (the
  Organization), `offers` (`Offer` → `url: site.ticketUrl`, `availability`,
  `priceCurrency: "DKK"` — omit `price` if unknown, or use `offers.url` only),
  and `eventAttendanceMode`/`eventStatus`.
- **Artist & workshop detail pages:** one `MusicEvent` (artists) / `Event`
  (workshops) **per `show`** — a `performer`/`MusicGroup` of the act, `startDate`
  from the show, `location` from `show.venue`, `superEvent` pointing back to the
  festival, `image` from the act photo, `url` = canonical detail URL, `offers` =
  ticket URL. Emit an array (one object per show) since acts can play more than
  once. Drive it off `actDetailShows()` which already resolves day/time/venue.
- **Detail pages — `BreadcrumbList`:** mirror the existing visual `Breadcrumbs`
  (`Forside / Kunstnere / <act>`) as JSON-LD so SERPs show the trail. Build from
  the same labels the `ActDetail` breadcrumb uses.
- **(Optional) `/program`:** could emit the festival `Event` with `subEvents`,
  but that risks duplicating the per-act `MusicEvent`s. Prefer per-act events on
  detail pages + the festival event on home; keep `/program` to the festival
  reference only, or skip to avoid duplicate-event noise.

**Constraints to respect:**
- Keep all values locale-aware via `getLocale()` (the JSON-LD `name`/`description`
  should match the served page language) but `startDate`/`url`/dates stay
  structural.
- Don't fabricate data Google penalizes for mismatching: no `price` if unknown,
  no fake venue addresses (roadmap's content-risk rule). `location` can stay
  city-level until real venue addresses land.
- All server-rendered; no `"use client"`.

Verification: `pnpm build`, then validate output against the
[Rich Results Test](https://search.google.com/test/rich-results) / schema.org
validator for at least the homepage, one artist detail, one workshop detail.

### Phase 3 — Social-card & metadata polish (P2)

1. **`actMetadata()` OG images (finding 5):** add `width`/`height`/`alt` to the
   image object so crawlers get a proper preview. Pass the act's `imageAlt` for
   `alt`. In [src/lib/metadata.ts](../../src/lib/metadata.ts).
2. **Twitter handles:** add `twitter.site` (and `creator` if the festival has an
   X/Twitter handle) in `app/layout.tsx` — only if a real handle exists; don't
   invent one.
3. **OG locale alternates:** optionally add `openGraph.localeAlternate` listing
   the other locale, even though both share a URL — low value while indexing is
   DA-only; defer unless Phase 0 chooses locale routes.

Verification: `pnpm lint`; optional manual check with a card validator.

### Phase 4 — Sitemap & technical hygiene (P2)

1. **Meaningful `lastModified` (finding 6):** derive per-route dates instead of
   `new Date()` everywhere. Options: a stable content-edited date constant per
   data file, or drop `lastModified` rather than ship a misleading value. At
   minimum, stop stamping all routes with build time.
2. **Confirm `changeFrequency`/`priority`** still reflect intent once the
   programme grows (current values are reasonable).
3. **404 (finding 9):** add/verify `app/not-found.tsx` returns a real 404 and
   isn't a soft-200. Confirm `~offline` and 404 are excluded from indexing
   intent (they're not in the sitemap — good).

### Phase 5 — Performance / Core Web Vitals (P2/P3)

Overlaps roadmap Phase 5; SEO-relevant slice only:

1. **Shrink `public/images/opengraph.png`** (finding 7) — visually identical,
   smaller. Helps share previews and payload.
2. **Verify no CLS** from `next/image fill` cards (they use fixed
   `aspect-[4/3]` wrappers — should be stable; confirm in a Lighthouse pass).
3. **Lighthouse/PSI pass** once Phases 1-3 land; record a baseline in this doc.

### Phase 6 — Verify & document

- Update `docs/architecture.md` SEO section to describe the new JSON-LD module
  (`lib/structured-data.ts`, `components/seo/JsonLd.tsx`) and where each graph is
  rendered, so future agents extend it instead of re-rolling.
- Add a row to the `AGENTS.md` documentation map only if a new dedicated doc is
  created (likely not — architecture.md's SEO section is the right home).
- Run `pnpm build` and validate rich results before committing.

---

## Suggested order

1. **Phase 1** — staging `noindex` guard (done) + dead-link cleanup (fast, P1).
2. **Phase 2** — JSON-LD structured data (the headline feature, P1).
3. **Phase 3** — social-card polish (P2).
4. **Phase 4** — sitemap freshness + 404 (P2).
5. **Phase 5** — OG image + CWV pass (P2/P3).
6. **Phase 0** — the remaining open decision is bilingual indexing (DA-only vs
   locale routes); the canonical-domain question is already decided.

## Deferred / out of scope

- **Locale-prefixed routes + `hreflang`.** Making EN indexable means `/en/...`
  routing, per-locale canonicals, and `hreflang` tags — a real architecture
  change to the cookie-based i18n model. Only pursue if the owner chooses it in
  Phase 0; otherwise DA-only indexing stands (matches the current model).
- **Analytics / Search Console verification tag.** Adding a verification
  `<meta>` or analytics requires revisiting `/cookies` and the consent approach
  per project constraints. Search Console can also be verified via DNS/sitemap
  without a tracking script — prefer that if the owner wants it.
- **Real venue addresses in structured data.** Wait for confirmed venue data
  (roadmap Phase 3) before upgrading `location` from city-level to full `Place`
  with `PostalAddress`.
- **`price` in `Offer`.** Omit until ticket pricing is confirmed; never fabricate.

## Constraints honoured

- No CMS/backend, no analytics/pixels, no consent-triggering cookies.
- Content stays in `src/data/`; JSON-LD is derived from it, not duplicated.
- DA default, locale-aware copy; structural values (dates, URLs) stay plain.
- All structured data is server-rendered — no new client components.
- `site.url` remains the single source of truth for the canonical origin.
