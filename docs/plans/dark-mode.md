# Plan: Dark mode

A plan for adding a warm, on-brand dark theme to Aarhus Folk Festival, toggled by
the visitor and persisted across visits. Written to fit the existing conventions:
Tailwind v4 `@theme` tokens, the cookie→server→client locale pattern, server
components by default, bilingual UI copy.

> Status: proposal. The hex values below are starting points to tune in Phase 3,
> not final. Open decisions are collected at the end.

## The core decision: a semantic token layer (not a palette flip)

The instinct is to redefine the palette tokens under a `.dark` class — make
`--color-cream` dark and `--color-ink` light — so every existing `bg-cream` /
`text-ink` inverts for free. **This does not work here**, because the palette
tokens are overloaded across light and dark contexts:

- `cream*` is a **page/card surface** on light pages, but also **light text** on
  the petroleum Hero and Footer (`text-cream-50`, `text-cream-100/80`).
- `ink*` is **body text** on light surfaces, but also a **dark scrim overlay** in
  the Hero (`bg-gradient-to-r from-ink/85 …`).

Flipping those tokens globally would invert the footer's text and break the hero
scrims. So we keep the **brand/accent palette fixed** and introduce a small,
separate layer of **semantic role tokens** for the neutral "chrome" that should
respond to the theme. Only that chrome flips; the already-dark, intentionally
high-contrast sections stay as they are (lightly tuned at most).

Three surface categories, and how each behaves:

| Category | Examples | Dark-mode behaviour |
|----------|----------|---------------------|
| **Neutral chrome** (flips) | page background (`bg-cream`), cards (`bg-cream-50`), body text (`text-ink/soft/muted`), hairline borders (`border-ink/15`), subtle hover fills (`hover:bg-ink/[0.05]`) | Migrate to semantic tokens that remap under `.dark` |
| **Intentionally dark** (mostly stays) | Hero (`bg-petroleum-900` + ink scrims), Footer (`bg-petroleum`), petroleum/teal bands, `ImagePlaceholder` gradients | Keep fixed palette; optionally desaturate/soften a touch for dark |
| **Brand accents** (stays, contrast-checked) | `pink-600` CTAs, `rust` links/hover, badges, bunting | Keep identity; verify contrast on the new dark surfaces, nudge a shade only where AA fails |

This scopes the work: not all 131 occurrences change — only the neutral-chrome
ones. The `text-cream-*`-on-dark and `bg-petroleum*` usages are left alone.

## Mechanism: CSS-variable remap under `.dark`

Tailwind v4 `@theme` tokens compile to utilities backed by CSS custom properties
(`bg-surface` → `background: var(--color-surface)`). A plain CSS rule can override
those variables under a `.dark` ancestor, and every utility that reads them
recomputes automatically — **no `dark:` variant on individual elements**.

In [globals.css](../../src/app/globals.css):

```css
@theme {
  /* …existing palette stays… */

  /* Semantic neutral roles — light values (current look) */
  --color-surface:        #f4e8d8; /* page bg (was cream)        */
  --color-surface-raised: #fbf6ec; /* cards     (was cream-50)   */
  --color-surface-sunken: #ecdcc6; /* wells/fills (was cream-200)*/
  --color-content:        #2a221d; /* body text (was ink)        */
  --color-content-soft:   #6b5d50; /* (was ink-soft)             */
  --color-content-muted:  #9a8b7c; /* (was ink-muted)            */
  --color-line:           #2a221d; /* border base; use /10–/20   */
}

/* Dark overrides — starting point, tune in Phase 3.
   Warm espresso darks, not pure black, to keep the Nordic-folk warmth. */
.dark {
  color-scheme: dark;            /* native controls/scrollbars match */
  --color-surface:        #17120f;
  --color-surface-raised: #211a15;
  --color-surface-sunken: #100c0a;
  --color-content:        #f3e9da;
  --color-content-soft:   #c8b7a4;
  --color-content-muted:  #9c8d7d;
  --color-line:           #f3e9da; /* light hairline; still used at /10–/20 */
}

:root { color-scheme: light; }
```

Notes:

- `--color-line` is a solid base used with opacity modifiers (`border-line/15`,
  `hover:bg-content/[0.05]`) so the same alpha-driven hairlines/fills work in both
  modes — they just key off a light base in dark and a dark base in light.
- `color-scheme` makes form fields, the newsletter input, and scrollbars adopt
  native dark styling for free.
- Enabling the `dark:` variant for the few one-off tweaks we *do* want to write
  explicitly: add `@custom-variant dark (&:where(.dark, .dark *));` near the top of
  `globals.css`. Used sparingly (e.g. softening a gradient), not as the main path.

## Persistence + no-flash toggle (mirror the i18n pattern)

The locale system already proves the pattern: a cookie read on the server seeds a
client provider, so there's no hydration mismatch. Theme is simpler than locale —
it's pure CSS, so flipping it needs **no `router.refresh()`** (no server re-render
to swap copy); we just toggle the class on `<html>` and set the cookie. The server
read exists only to paint the correct theme on the **first** load (no FOUC).

New files, parallel to the i18n ones:

- `src/lib/theme.ts` — framework-free config: `THEME_COOKIE = "aff_theme"`,
  `type Theme = "light" | "dark"`, `defaultTheme`, `isTheme()`. Mirrors
  [config.ts](../../src/i18n/config.ts).
- `getTheme()` server read — either add to `theme.ts` (guarded `server-only`) or
  alongside [server.ts](../../src/i18n/server.ts). Reads the cookie, falls back to
  `defaultTheme`. Routes are already dynamically rendered (they read the locale
  cookie), so this adds no new cost.
- `src/components/theme/ThemeProvider.tsx` (`"use client"`) — mirrors
  [LocaleProvider.tsx](../../src/i18n/LocaleProvider.tsx). Holds `theme`, exposes
  `setTheme(next)` which writes the cookie (`max-age` 1yr, `samesite=lax`) and
  toggles `document.documentElement.classList`. No `router.refresh()`.
- `src/components/theme/ThemeToggle.tsx` (`"use client"`) — mirrors the
  `LanguageToggle` in [Header.tsx](../../src/components/layout/Header.tsx); a
  sun/moon switch.

Wire-up in [layout.tsx](../../src/app/layout.tsx):

```tsx
const theme = await getTheme();
…
<html lang={locale} className={cn(jakarta.variable, fraunces.variable,
        "h-full antialiased", theme === "dark" && "dark")}>
  <body className="… bg-surface text-content">     {/* was bg-cream text-ink */}
    <LocaleProvider initialLocale={locale}>
      <ThemeProvider initialTheme={theme}>
        …
```

Because `<html class="dark">` is set during SSR from the cookie, the first paint
is already correct — no flash, no blocking inline script needed for the
two-state design.

## Toggle UI

- Add `IconSun` / `IconMoon` to [icons.tsx](../../src/components/icons.tsx)
  (24×24, `stroke="currentColor"`, matching the existing set).
- Place `ThemeToggle` in the Header next to `LanguageToggle`, in both the desktop
  actions cluster and the mobile menu row (same two spots `LanguageToggle`
  appears). Reuse the pill styling.
- Bilingual copy in [dictionaries.ts](../../src/i18n/dictionaries.ts) `header`
  block, e.g. `chooseTheme` / `lightMode` / `darkMode` (DA: "Lyst tema" /
  "Mørkt tema", and an aria-label "Vælg tema"; EN equivalents). Never hardcode.
- `aria-pressed` / `aria-label` like the language buttons; keyboard-operable; the
  icon alone is not the only signal (accessible name required).

## File-by-file touch list (Phase 2 migration)

Migrate **neutral-chrome** utilities to semantic ones. Mapping:

| From | To |
|------|----|
| `bg-cream` (page bg) | `bg-surface` |
| `bg-cream-50` (cards) | `bg-surface-raised` |
| `bg-cream-100/200` (fills/wells) | `bg-surface-sunken` (or `-raised`, per use) |
| `text-ink` | `text-content` |
| `text-ink/80`, `text-ink-soft` | `text-content-soft` (or `text-content/80`) |
| `text-ink-muted` | `text-content-muted` |
| `border-ink/15`, `border-ink/10` | `border-line/15`, `border-line/10` |
| `hover:bg-ink/[0.05]` | `hover:bg-content/[0.05]` |

Leave unchanged: `text-cream-*` on dark sections, `bg-petroleum*`, `from-ink/85`
scrims, `bg-pink-600`, `text-rust`, decorative gradients.

Likely files (from a grep of the neutral tokens — confirm each during the pass):

- Chrome: [layout.tsx](../../src/app/layout.tsx),
  [Header.tsx](../../src/components/layout/Header.tsx) (the `bg-cream/90`
  backdrop, mobile menu `bg-cream`, hairline borders, hover fills).
  Footer stays petroleum.
- UI primitives: [Button.tsx](../../src/components/ui/Button.tsx) (`outline`
  variant `text-ink`/`border-ink/20`; `solidLight` is for dark sections — leave),
  [SectionHeading.tsx](../../src/components/ui/SectionHeading.tsx),
  [ActCard.tsx](../../src/components/ui/ActCard.tsx),
  [EventCard.tsx](../../src/components/ui/EventCard.tsx),
  [ExperienceCard.tsx](../../src/components/ui/ExperienceCard.tsx),
  [PracticalCard.tsx](../../src/components/ui/PracticalCard.tsx).
- Sections: [AboutSection](../../src/components/sections/AboutSection.tsx),
  [ProgramPreview](../../src/components/sections/ProgramPreview.tsx),
  [ProgramSchedule](../../src/components/sections/ProgramSchedule.tsx),
  [PracticalInfo](../../src/components/sections/PracticalInfo.tsx),
  [Newsletter](../../src/components/sections/Newsletter.tsx),
  [ExperienceSection](../../src/components/sections/ExperienceSection.tsx),
  [ActDetail](../../src/components/sections/ActDetail.tsx).
- Pages (cream backgrounds / ink copy):
  [program](../../src/app/program/page.tsx),
  [kunstnere](../../src/app/kunstnere/page.tsx),
  [workshops](../../src/app/workshops/page.tsx),
  [om-festivalen](../../src/app/om-festivalen/page.tsx),
  [foreningen](../../src/app/foreningen/page.tsx),
  [kontakt](../../src/app/kontakt/page.tsx), plus the `[slug]` detail pages.
- Decorative seams that must track the page surface:
  [ScallopEdge](../../src/components/decorative/ScallopEdge.tsx) (Hero uses
  `colorClassName="text-cream"` to match the cream below — becomes
  `text-surface`), [FolkBorder](../../src/components/decorative/FolkBorder.tsx)
  (the `flip` instance in the Footer uses `bg-cream text-petroleum` to match the
  page — becomes `bg-surface`).

`ImagePlaceholder` gradients are dark-on-both and need no change.

## Polish + edge cases (Phase 4)

- **Focus ring.** `:focus-visible { outline: 2px solid var(--color-petroleum) }`
  in `globals.css` is near-invisible on dark petroleum surfaces. Introduce
  `--color-focus` (petroleum in light, a brighter teal/cream in dark) and use it
  there. Keep 2px + offset.
- **`::selection`.** Currently `pink-200` bg / `ink` text — re-check legibility on
  dark; may swap the text colour to `content` via the token.
- **`themeColor` / browser chrome.** [layout.tsx](../../src/app/layout.tsx)
  hardcodes `viewport.themeColor: "#134e57"`. Provide light/dark values via the
  `media` form (`prefers-color-scheme`). This follows the OS, which can disagree
  with an explicit in-app override — acceptable, or revisit if we add a "system"
  mode. Minor.
- **Logo.** `logo_text_header.png` is a coloured wordmark on transparent bg;
  verify it reads on the dark header. `logo_mark_black.png` (black on transparent)
  would disappear on dark. If the wordmark is too dark, produce a light/cream
  variant and swap by theme (or a subtle CSS treatment). Decide during Phase 3 —
  this is the most likely asset task. See
  [design-system.md](../design-system.md) Assets.
- **Decorative motifs / `JubilaeumBadge`, `FolkStripe`, bunting.** Mostly fixed
  brand colour on a surface; confirm each still has contrast on dark and isn't
  relying on the cream page showing through.
- **Real photos** (Hero, cards) are unaffected; their ink scrims read on both.

## Accessibility

- WCAG **AA** contrast pass on the dark palette: body text, soft/muted text,
  links (`rust`), CTAs (`pink-600` on `surface-raised`), borders. Nudge accent
  shades only where AA fails; prefer fixing the surface value first.
- Toggle is keyboard-operable with an accessible name and `aria-pressed`; icon is
  not the sole signal.
- Respect `prefers-reduced-motion` (already honoured) — no theme-transition
  animation for those users; for everyone else an optional, very short
  `background-color`/`color` transition on `body` is a nice touch but keep it
  subtle and avoid transitioning huge trees.
- `<html lang>` already tracks locale; theme adds `class="dark"` + `color-scheme`.

## Rollout phases

1. **Plumbing, invisible in light.** Add semantic tokens (light values only),
   `@custom-variant dark`, `.dark` overrides, `color-scheme`; add `theme.ts`,
   `getTheme()`, `ThemeProvider`, `ThemeToggle`, icons, dictionary keys; wire
   `layout.tsx`. Light mode looks identical; dark is rough. `pnpm build`.
2. **Migrate neutral chrome** to semantic tokens (file list above). Light mode
   must stay pixel-identical — this is a rename, not a redesign. `pnpm build`.
3. **Author the dark palette.** Tune the `.dark` hex values across every surface;
   resolve the logo and any decorative-contrast issues.
4. **Polish + a11y:** focus ring, selection, `themeColor`, contrast pass,
   optional transition.

Verify with `pnpm build` (typecheck) after each phase. **Do not** self-launch the
browser — per AGENTS.md the owner has the dev server open and verifies visuals;
ask them to sanity-check dark mode on the homepage, a listing page, a detail page,
and the contact form after Phases 3–4.

## Docs to update when implementing

- [design-system.md](../design-system.md): add the semantic token table (light +
  dark values) and the "palette stays fixed, neutral chrome flips" rule; note any
  new logo asset.
- [architecture.md](../architecture.md): the `theme/` components,
  `lib/theme.ts` / `getTheme()`, and the `aff_theme` cookie.
- [AGENTS.md](../../AGENTS.md): the persistence note currently says favourites are
  "the one bit of persistence" — update to include the client-only `aff_theme`
  theme cookie (still no server/account).

## Open decisions

1. **Default theme** for first-time visitors — recommend **light** (current look,
   simplest no-FOUC path). Alternative: follow OS via a "system" mode (needs a
   tiny inline `<head>` script or accept a one-frame flash) — defer to a follow-up.
2. **Two-state vs. three-state** (light / dark / system). Recommend shipping
   light/dark first; add "system" later if wanted.
3. **Toggle affordance** — two-state sun/moon switch (recommended) vs. a
   three-segment control matching the DA/EN pill.
