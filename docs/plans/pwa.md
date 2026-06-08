# Plan: Progressive Web App (PWA)

A plan for making Aarhus Folk Festival installable on phones and resilient when
venue Wi‑Fi is spotty. Written to fit the existing conventions: Next.js 16 App
Router, static content in `src/data/`, cookie-based locale/theme, localStorage
favourites, server components by default, bilingual UI copy in `dictionaries.ts`.

> **Status: Layers 1 & 2 shipped** in commit `571fe3a` — install metadata
> (manifest + icons), and a production-only Serwist service worker with an
> offline fallback route. Phase 4 docs (architecture, design-system, AGENTS) are
> now updated to match. **Layer 3's update snackbar and a mobile-only install
> prompt are now built** (see Progress); the rest of Layer 3 (cache warming) and
> Layer 4 (web push) remain unimplemented. See **Progress (as built)** for deltas
> from this plan, and **Open decisions** for how each was resolved.

## Progress (as built)

Layers 1 and 2 landed together in `571fe3a`. The implementation follows this plan
closely; the notable deltas:

- **Offline precache is deploy-versioned.** [next.config.ts](../../next.config.ts)
  computes `git rev-parse HEAD` (falling back to a random UUID) and passes
  `additionalPrecacheEntries: [{ url: "/~offline", revision }]`, so the offline
  fallback is re-precached on every deploy.
- **Service worker leans on Serwist’s `defaultCache`.** [src/sw.ts](../../src/sw.ts)
  registers one custom `CacheFirst` route for `/logos`, `/images`, `/icons`
  (30-day expiration, 64 entries) and otherwise spreads `...defaultCache`, which
  already does NetworkFirst for document navigations — satisfying the
  “no stale locale/theme” rule below without a hand-written nav strategy. Also
  enables `navigationPreload`, `skipWaiting`, `clientsClaim`, and
  `cleanupOutdatedCaches`.
- **Offline page reuses existing copy.** [src/app/~offline/page.tsx](../../src/app/~offline/page.tsx)
  adds `common.offlineTitle` / `common.offlineBody` to the dictionaries but reuses
  `hero.seeProgram` for the “go to programme” button rather than a new key.
- **`icons.apple` was included** in `generateMetadata` (the plan marked it
  optional) alongside `applicationName`, `appleWebApp`, and `formatDetection`.
- **Generated SW is gitignored.** `public/sw*` / `public/swe-worker*` are ignored;
  only the committed `public/icons/*` ship. `tsconfig.json` adds the `webworker`
  lib + `@serwist/next/typings` types and excludes `public/sw.js`. `build` is now
  `next build --webpack`.

### Layer 3 — update snackbar (built)

The update prompt landed after `571fe3a`:

- **The SW now waits for consent.** [src/sw.ts](../../src/sw.ts) switched
  `skipWaiting: true` → `false`. A new build installs but does not take over the
  open page, so visitors keep reading the version they loaded. Leaving
  `skipWaiting` off also registers Serwist's built-in `SKIP_WAITING` message
  handler (it only wires that listener when `skipWaiting` is falsy). `clientsClaim`
  stays on so the first install controls the page and the post-update activate
  fires `controllerchange`.
- **Client snackbar.** [src/components/pwa/UpdatePrompt.tsx](../../src/components/pwa/UpdatePrompt.tsx)
  (`"use client"`, rendered in `layout.tsx` inside the providers) watches
  `navigator.serviceWorker.ready` for a waiting worker — both one already present
  at load (guarded by `navigator.serviceWorker.controller` so first install isn't
  mistaken for an update) and one arriving via `updatefound` → `statechange`. On
  "reload" it posts `{ type: "SKIP_WAITING" }` to the waiting worker and reloads
  on the next `controllerchange`; it also has a dismiss (×) button. New
  dictionary keys `update.available` / `update.reload` / `update.dismiss`.
- **No dev impact.** The SW is disabled in dev, so `serviceWorker.ready` never
  resolves and the snackbar renders nothing.

- **Mobile-only install prompt (built), two modes.**
  [src/components/pwa/InstallPrompt.tsx](../../src/components/pwa/InstallPrompt.tsx)
  shows a warm add-to-home-screen card with the app icon. On **Chromium** it
  stashes `beforeinstallprompt` and offers an install button (reusing
  `buttonClasses`); that card is `sm:hidden` so desktop keeps the browser's
  address-bar install icon. On **iOS Safari** (which has no `beforeinstallprompt`)
  it shows a Share → "Add to Home Screen" hint instead, with the `IconShare` glyph
  and no button (iOS has no programmatic install trigger); that card is not
  viewport-gated because the iOS-Safari detection already implies a touch device.
  A `localStorage` flag `aff_install_dismissed` stops either card nagging after
  dismiss or install (it also listens for `appinstalled`), and already-installed
  (standalone) visitors never see it. New `install.*` dictionary keys (incl.
  `iosBody`).

The rest of Layer 3 was intentionally **not** built:

- **Cache warming was skipped.** Pages read the locale/theme cookies on the
  server, so they are dynamic, not static — precaching or warming a snapshot
  would freeze locale/theme (the very thing the NetworkFirst nav strategy avoids),
  and a programmatic `fetch` is not navigation-mode so it would not populate that
  nav cache anyway. Next's `<Link prefetch>` plus NetworkFirst caching on first
  navigation already cover repeat/offline reads.
- **Favourites & theme offline need no code** — favourites use the client
  `aff_favourites` localStorage key and theme uses the `aff_theme` cookie. Both keep
  working once the programme HTML/JS is cached. Verify in airplane mode rather than
  by code change.

Still open: Layer 3 cache warming (deliberately skipped above) and Layer 4 (web
push). Phase 4 documentation is done — `architecture.md` now has a PWA /
service-worker section (incl. the update flow), `design-system.md` lists the icon
set, and `AGENTS.md` carries the `--webpack` build note + docs-map row.

## What “PWA” means for this site

This is a **mostly static festival brochure** with a few client bits (language
toggle, dark mode, programme favourites filter). Visitors care about:

1. **Add to home screen** — quick access to the programme during the festival.
2. **Offline / flaky-network read access** — programme, artist/workshop detail
   pages, and favourites still usable in a tent or basement venue.
3. **Fast repeat visits** — cached fonts, logos, hero images.

Lower priority (defer unless explicitly requested):

- **Web push** for schedule changes or reminders (needs VAPID keys, subscription
  storage, and a sending pipeline — none exist today).
- **Background sync** for newsletter signup or ticket purchases (external flows).

The official Next.js PWA guide notes that **install prompts work without offline
support**; a manifest alone unlocks “Add to home screen” on many platforms.
Offline is a separate, worthwhile layer for this use case.

## The core decision: two layers, shipped in order

| Layer | Delivers | Depends on |
|-------|----------|------------|
| **1. Web app manifest + icons** | Installability, standalone chrome, splash colours | Next.js built-in `app/manifest.ts`; static PNGs in `public/` |
| **2. Service worker + caching** | Offline / fast repeat loads | Serwist (`@serwist/next`) or a small hand-written SW |

**Recommend shipping Layer 1 first.** It is small, has no bundler impact, and
matches how the dark-mode plan staged plumbing before polish. Layer 2 adds real
value for festival-goers but introduces build-script and cache-invalidation
complexity.

### Tooling: Serwist vs manual service worker

| Approach | Pros | Cons |
|----------|------|------|
| **Serwist** (`@serwist/next`) | Precaching, runtime routes, offline fallback page, maintained; [Next.js docs](https://nextjs.org/docs/app/guides/progressive-web-apps) point here for offline | Wraps `next.config.ts`; **production SW build uses Webpack**, not Turbopack — add `--webpack` to `pnpm build` (and any prod SW test) |
| **Manual SW** (`public/sw.js`) | Full transparency, no extra dependency, Turbopack-friendly for dev | More boilerplate; easy to get caching wrong; you maintain strategies yourself |

**Recommend Serwist for Layer 2** unless the team strongly prefers zero
dependencies. The festival site has ~15+ HTML routes (see `sitemap.ts`); Serwist’s
precache manifest generation saves manual URL lists. A manual SW is reasonable if
the goal is only “cache `/program` + static assets” with no plugin.

**Do not use `next-pwa`.** It is unmaintained relative to Serwist and has the
same Webpack requirement in Next.js 16.

## Site-specific constraints

### Cookie-driven SSR (locale, theme)

Every page reads the locale/theme cookies (`aff_locale`, `aff_theme`) on the
server. Cached HTML is **per-user-state**, not a single canonical document.

Implications for the service worker:

- **Do not cache-first HTML navigations globally** — a Danish light-mode page
  served from cache after the visitor switches to English or dark mode is a bug.
- **Prefer network-first (or stale-while-revalidate with short TTL) for
  document requests**, with offline fallback to the last successfully fetched
  version of *that* URL (accepting that locale/theme may match the last online
  visit).
- **Cache-first is fine for hashed build assets** (`/_next/static/…`), fonts,
  logos, and programme images under `/images/`.

This matches real festival usage: visitors set language once, then re-open
`/program` offline.

### Static content model (good news)

Acts, workshops, and the derived programme live in `src/data/` and ship with the
build. There is no CMS or live API. Once HTML for a route is generated at build
time, content is stable until the next deploy. Runtime caching mainly helps
**connectivity**, not freshness — deploy a new build to update the schedule.

### External / network-only surfaces

Leave these **uncached** (network-only or navigate to browser):

- Ticket links (`site.ticketUrl` → Place2book)
- Contact email (`mailto:`)
- Any future newsletter backend

### Canonical origin

`site.url` in [site.ts](../../src/data/site.ts) is the production origin
(currently `https://folk.gamestormers.dk`, moving to `aarhusfolkfestival.dk`).
The manifest `start_url` / `scope` must use **path-only** values (`/`, `/program`)
so a domain migration does not require manifest changes. Update `site.url` only
in `site.ts` (existing SEO rule).

### Existing metadata to extend, not replace

[layout.tsx](../../src/app/layout.tsx) already sets `metadataBase`, OpenGraph,
Twitter, and `viewport.themeColor` (petroleum light / espresso dark). PWA work
**adds** `applicationName`, `appleWebApp`, and manifest icons — it should not
duplicate or fight the OG card (`/images/opengraph.png` is for link previews,
not the home-screen icon).

---

## Layer 1 — Manifest, icons, install metadata

### 1a. `src/app/manifest.ts`

Next.js App Router serves this at `/manifest.webmanifest` automatically.
Use `MetadataRoute.Manifest` and pull constants from `site`:

```ts
import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} ${site.year}`,
    short_name: "AFF", // or "AFF 2026" — see open decisions
    description: site.tagline.da, // manifest has no per-locale file; pick DA default or shortest EN
    start_url: "/program", // festival-first; see open decisions
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#f4e8d8", // surface light (splash while loading)
    theme_color: "#134e57",      // petroleum (matches light themeColor)
    lang: "da",
    dir: "ltr",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
```

Tune `description` / default `lang` in open decisions. No `router.refresh()`
or client code required.

### 1b. App icons (`public/icons/`)

**Source asset:** [public/logos/logo.png](../../public/logos/logo.png) — the
accordion mark on a baked cream background (750×750). It already matches the
festival identity; no separate mark-on-transparent composite is needed.

Generated outputs (committed under `public/icons/`):

| File | Size | Purpose |
|------|------|---------|
| `icon-192.png` | 192×192 | Manifest `any` |
| `icon-512.png` | 512×512 | Manifest `any` |
| `icon-maskable-512.png` | 512×512 | Manifest `maskable` — accordion scaled to 80% on `#f4e8d8` so Android adaptive icons do not clip the bellows |
| `apple-touch-icon.png` | 180×180 | iOS home screen |

Regenerate after editing the source logo:

```bash
node scripts/generate-pwa-icons.mjs
```

The script uses `sharp` (devDependency). Do not generate icons at request time
in production — commit the PNG outputs.

### 1c. Extend root metadata in `layout.tsx`

Add to `generateMetadata()` (alongside existing OG/Twitter):

```ts
applicationName: site.name,
appleWebApp: {
  capable: true,
  title: site.name,
  statusBarStyle: "default", // "black-translucent" if splash should feel immersive
},
formatDetection: { telephone: false },
```

Optional explicit link (usually redundant if `manifest.ts` exists):

```tsx
// in <head> via metadata.icons or manual — only if audit tools complain
icons: { apple: "/icons/apple-touch-icon.png" },
```

`theme_color` in the manifest is static; the layout already uses media-query
`themeColor` for browser chrome. That split is acceptable (manifest = light
brand default).

### 1d. Verify installability (Layer 1 done)

- `pnpm build && pnpm start` (no Webpack flag needed for manifest-only).
- Chrome DevTools → Application → Manifest: no errors; icons resolve.
- Lighthouse PWA audit: installable (may still warn “no service worker” until
  Layer 2).
- Owner sanity-check on a real phone: Add to Home Screen, icon, splash, opens
  to `start_url`.

**No new dependencies for Layer 1.**

---

## Layer 2 — Service worker with Serwist

### 2a. Dependencies

```bash
pnpm add @serwist/next serwist
```

### 2b. `next.config.ts`

Wrap the existing config:

```ts
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  register: true,
  reloadOnOnline: true,
});

const nextConfig = { /* existing options */ };

export default withSerwist(nextConfig);
```

Keep `disable: true` in development so Turbopack dev is unaffected. SW is
generated only on production build.

### 2c. `src/sw.ts` (service worker source)

Follow Serwist’s App Router template. Recommended strategies for this site:

| Request | Strategy | Rationale |
|---------|----------|-----------|
| `/_next/static/*` | Precache (build revision) | Hashed filenames; safe cache-first |
| `/logos/*`, `/images/*`, `/icons/*` | Cache-first + expiration (e.g. 30 days) | Static festival assets |
| `/_next/image*` | Stale-while-revalidate | Optimised images |
| Document navigations (`accept: text/html`) | **Network-first**, fallback to cache | Avoid stale locale/theme; offline still shows last visit |
| Cross-origin (Place2book, fonts.googleapis.com if any) | Network only | External |

Add an offline fallback route:

- `src/app/~offline/page.tsx` — minimal server page using `getLocale()` +
  dictionary keys (`common.offlineTitle`, `common.offlineBody`, link to `/program`).
- Register in Serwist `additionalPrecacheEntries` or `navigateFallback` per
  Serwist docs.

Bilingual copy for the offline page belongs in [dictionaries.ts](../../src/i18n/dictionaries.ts), not hardcoded.

### 2d. Build scripts

Serwist’s SW compilation requires Webpack:

```json
"build": "next build --webpack",
"start": "next start"
```

Document in AGENTS.md that production builds use `--webpack` for PWA. Dev stays
`next dev` (Turbopack, no SW).

### 2e. Service worker HTTP headers

Ensure `public/sw.js` is served with:

- `Cache-Control: no-cache` (or short max-age) so updates propagate
- `Service-Worker-Allowed: /` if scope needs widening

Next.js / Serwist usually handle this; verify in production `pnpm start`.

### 2f. Optional install UX (client)

Browsers increasingly suppress custom install banners. If a gentle prompt is
desired:

- `src/components/pwa/InstallPrompt.tsx` (`"use client"`) — listen for
  `beforeinstallprompt`, show a small dismissible banner (Header area or
  programme page only).
- Dictionary keys: `installApp`, `installAppDismiss`.
- Respect `localStorage` dismiss flag; never block content.

Skip in v1 if keeping scope minimal.

---

## Layer 3 — Programme-first offline polish

After Layer 2 works:

1. **Warm cache on first online visit** — after SW install, prefetch `/program`,
   `/kunstnere`, `/workshops` via `workbox` / Serwist `addRoute` or a client
   `useEffect` that `fetch`es key routes once (optional; precache list may be
   enough).
2. **Favourites offline** — `aff_favourites` is a client localStorage key;
   `ProgramSchedule` + `lib/favourites.ts` keep working offline if programme
   HTML/JS is cached. Manually test “Vis hjerte-events” in airplane mode.
3. **Theme offline** — `aff_theme` + `ThemeProvider` are client-side; no SW
   change needed.
4. **Update prompt** — when a new SW is waiting, show a one-line “Ny version
   tilgængelig — genindlæs” snackbar (`controllerchange` / Serwist lifecycle).
   Dictionary keys + dismiss.

---

## Layer 4 — Web push (optional, separate project)

Only if the festival team wants schedule-change notifications:

- VAPID key pair (env vars, never committed)
- Server Actions or Route Handlers for subscribe / unsubscribe
- Database or KV for push subscriptions (cookies are wrong for this)
- Client permission UI (Header or programme page)
- iOS requires installed PWA + iOS 16.4+

Next.js documents this flow in the [PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps).
**Do not bundle into Layers 1–3** — it is a backend feature, not a manifest tweak.

---

## Rollout phases

1. ✅ **Installable (manifest + icons + metadata).** — shipped in `571fe3a`.
   `manifest.ts`, `public/icons/*`, `scripts/generate-pwa-icons.mjs`, extended
   `generateMetadata`. Owner sanity-check of Add to Home Screen on a phone still
   outstanding.
2. ✅ **Serwist plumbing.** — shipped in `571fe3a`. Packages, `src/sw.ts`,
   `~offline` page, dictionary strings, `next.config.ts` wrap, `build` →
   `--webpack`. Owner offline test on `/program` + a detail page still
   outstanding.
3. 🟡 **Cache tuning.** Update snackbar shipped (`UpdatePrompt` + `skipWaiting:
   false`) and a mobile-only `InstallPrompt`; cache warming intentionally skipped
   (cookie-dynamic pages). Owner: re-run Lighthouse PWA + an offline manual pass,
   confirm a fresh deploy surfaces the "new version" snackbar, and check the
   install banner appears on an Android phone (not desktop).
4. ✅ **Docs + AGENTS map.** — architecture (PWA / service-worker section),
   design-system (icon set), AGENTS.md (`--webpack` build note, persistence note,
   docs-map row) all updated.

Verify with `pnpm build` after phases 2–3. Do not self-launch the browser for
visual QA — ask the owner to test install + offline on a phone after each phase.

---

## File touch list (expected)

| File | Phase |
|------|-------|
| `src/app/manifest.ts` | 1 (new) |
| `public/logos/logo.png` | 1 (source — accordion on cream) |
| `public/icons/*` | 1 (new, generated) |
| `scripts/generate-pwa-icons.mjs` | 1 (new) |
| `src/app/layout.tsx` | 1 (`applicationName`, `appleWebApp`, …) |
| `package.json` | 2 (`@serwist/next`, `serwist`; `build --webpack`) |
| `next.config.ts` | 2 |
| `src/sw.ts` | 2 (new) |
| `src/app/~offline/page.tsx` | 2 (new) |
| `src/i18n/dictionaries.ts` | 2–3 (offline + update + optional install copy) |
| `src/sw.ts` | 3 (`skipWaiting: false` for the update prompt) |
| `src/components/pwa/UpdatePrompt.tsx` | 3 (update snackbar — built) |
| `src/app/layout.tsx` | 3 (render `<UpdatePrompt />`) |
| `src/components/pwa/InstallPrompt.tsx` | 3 (mobile-only install banner — built) |
| `docs/architecture.md` | 4 |
| `docs/design-system.md` | 4 (icon assets) |
| `AGENTS.md` | 4 |

No changes to `src/data/` content files unless adding PWA-specific copy there
(which would be wrong — UI chrome stays in dictionaries).

---

## Testing checklist

- [ ] Manifest validates in Chrome Application panel
- [ ] Icons sharp on Android home screen and iOS (installed)
- [ ] `start_url` opens correct page standalone (no browser URL bar)
- [ ] Programme readable offline after one online visit
- [ ] Favourites filter works offline
- [ ] Locale/theme toggle works offline (client cookies)
- [ ] Ticket external link still opens browser / fails gracefully offline
- [ ] New deploy: returning visitors get updated SW within reasonable time
- [ ] New deploy: the "new version available" snackbar appears and "reload" loads it
- [ ] Install banner shows on an Android phone (installable), hidden on desktop view
- [ ] iOS Safari shows the Share → "Add to Home Screen" hint (and not in standalone)
- [ ] Lighthouse: PWA category passes install + offline (post Layer 2)

Local SW testing needs HTTPS or `localhost`. Use `pnpm build --webpack && pnpm start`, not `pnpm dev`.

---

## Docs to update when implementing

- [architecture.md](../architecture.md): `manifest.ts`, `src/sw.ts`, `~offline`,
  optional `components/pwa/`, build `--webpack` note.
- [design-system.md](../design-system.md): PWA icon set under Assets (source:
  `public/logos/logo.png`; outputs in `public/icons/`).
- [AGENTS.md](../../AGENTS.md): documentation map row for PWA if the section
  grows; build command note; persistence list unchanged (favourites/theme still
  cookies — SW does not replace them).

---

## Open decisions (resolved)

All Layer 1–2 decisions were settled when `571fe3a` shipped:

1. **`start_url`:** ✅ **`/program`** — festival utility-first, as recommended.
2. **`short_name`:** ✅ **`AFF`**, with full `${site.name} ${site.year}` in `name`.
3. **Manifest `description` / `lang`:** ✅ `description: site.tagline.da`,
   `lang: "da"` — single DA default, not localized per cookie.
4. **Serwist vs manual SW:** ✅ **Serwist** (`@serwist/next` + `serwist`).
5. **Custom install prompt:** ✅ Now **built** as a **mobile-only** banner
   (`InstallPrompt`, `sm:hidden`). Layers 1–2 shipped without it (browser default);
   it was added in Layer 3. Desktop view still relies on the browser's address-bar
   install icon.
6. **Web push:** ⬜ Deferred (Layer 4) — no product request for schedule alerts.
7. **Precache scope:** ✅ Relies on Serwist’s `__SW_MANIFEST` (build output) plus
   `additionalPrecacheEntries` for `/~offline`; runtime `CacheFirst` covers
   `/logos`, `/images`, `/icons`. No hand-maintained sitemap URL list.
