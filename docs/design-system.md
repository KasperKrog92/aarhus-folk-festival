# Design system

Read this when touching colours, fonts, decorative motifs, layout styling, logos,
or images.

Colours are defined as Tailwind theme tokens in `globals.css` (`@theme`), so they work as
utilities (`bg-petroleum`, `text-pink-600`, `border-line/15`, gradients, opacity modifiers).

## Two-layer colour system

### Brand/accent palette (fixed — never flips)

| Token | Use |
|-------|-----|
| `cream` / `cream-50/100/200/300` | fixed cream; use on dark sections where `text-cream-*` is needed, or where cream-on-petroleum is explicit |
| `petroleum` / `petroleum-700/900`, `teal` | deep teal sections, accents, header bunting |
| `pink` / `pink-600` / `pink-200/100` | dusty coral family: `pink` for decoration/soft fills, `pink-600` for accessible small accent text and primary CTA backgrounds |
| `aubergine` | deep accent (gradients, icon badges) |
| `rust` | brick red from the logo (hover/links) |
| `ink` / `ink-soft` / `ink-muted` | warm off-black; use only inside intentionally-dark sections (Hero scrims, petroleum gradients). **Don't use for neutral chrome.** |

### Semantic neutral roles (flip under `.dark`)

Use these tokens for all neutral "chrome" — page/card surfaces, body copy, borders, hover fills.
They are remapped under the `.dark` class so every utility that reads them inverts automatically;
no `dark:` variant on individual elements is needed.

| Token | Light value | Dark value | Use |
|-------|-------------|------------|-----|
| `surface` | `#f4e8d8` (cream) | `#17120f` (espresso) | page background |
| `surface-raised` | `#fbf6ec` (cream-50) | `#211a15` | cards, raised panels |
| `surface-sunken` | `#ecdcc6` (cream-200) | `#100c0a` | wells, tinted section bands |
| `content` | `#2a221d` (ink) | `#f3e9da` | body text |
| `content-soft` | `#6b5d50` (ink-soft) | `#c8b7a4` | secondary text |
| `content-muted` | `#9a8b7c` (ink-muted) | `#9c8d7d` | de-emphasised text |
| `line` | `#2a221d` | `#f3e9da` | border base (use at `/10`–`/20` opacity) |
| `focus` | `#134e57` (petroleum) | `#7bb4bb` (teal-300) | `:focus-visible` ring |

**Rule:** Neutral chrome → semantic tokens. Dark-section text (`text-cream-*` on petroleum) and
brand accents (`bg-pink-600`, `text-rust`) → fixed palette tokens; they don't flip.

Fonts: `font-display` (Fraunces) for headings, `font-sans` (Jakarta) for everything else.

Decorative folk motifs are **CSS/SVG only** (no image assets): triangle bunting bands,
scalloped edges, woven textile stripes, a circular anniversary stamp. Reuse the components
in `components/decorative/` rather than re-rolling patterns.

## Dark mode mechanism

Theme is toggled via the `.dark` class on `<html>`. The server reads the `aff_theme` cookie
(`src/lib/theme-server.ts → getTheme()`) and applies the class during SSR so the first paint
is already correct — no flash, no blocking inline script. The client `ThemeProvider`
(`src/components/theme/ThemeProvider.tsx`) holds `theme` state and `setTheme()`, which
updates the cookie and toggles `document.documentElement.classList` in-place with no
`router.refresh()`.

`@custom-variant dark (&:where(.dark, .dark *))` in `globals.css` enables `dark:` utilities
for the few one-off overrides; the primary path is the CSS-variable remap, not per-element
`dark:` classes.

Two gotchas the remap doesn't solve on its own:

- **Accent contrast.** `text-petroleum` (#134e57) and `text-pink-600` (#a63a5d) are tuned for
  the cream surface and fail WCAG AA on the dark surface. `globals.css` lightens them globally
  under `.dark` (`text-petroleum` → `teal-300`, `text-pink-600`/`hover:text-rust` → `pink`).
  When introducing a *new* accent-on-surface colour, contrast-check it in dark and add an
  override there if it fails — don't recolour per element.
- **Fixed-light cards.** A few panels keep a fixed light gradient in both themes (e.g. the
  `Newsletter` card: `from-pink-100 via-cream-50 to-cream-100`). Text/inputs **inside** them
  must use the fixed ink palette (`text-ink`, `text-ink-soft`, `bg-white`), not the semantic
  `content`/`surface` tokens — otherwise the text flips to cream and vanishes on the light card.

## Assets

- `public/logos/logo_text.png` - full source wordmark, **transparent** bg.
- `public/logos/logo_text_header.png` - optimized header wordmark; use this in the sticky header. Verify legibility on the dark header (the wordmark is coloured on transparent; if it reads poorly on dark, produce a light/cream variant and swap by theme).
- `public/logos/logo.png` - accordion mark only, baked cream bg (avoid on non-cream surfaces).
- `public/logos/logo_mark_black.png` - accordion mark in solid black on a **transparent** bg; would disappear on a dark header — do not use there.
- `public/images/mockup_*.png` - design reference mockups (not used in the build).
- Use JPEG/WebP/AVIF for photo-like assets. Keep PNG for transparency, logos, mockups, or graphic artwork.
- Real photography is arriving incrementally. `EventCard`, `ActCard` and `ActDetail` render a
  real photo via `next/image` when an act/event has an `image` (e.g. `public/events/detlysebal.jpg`),
  and fall back to `ImagePlaceholder` otherwise. Elsewhere, `ImagePlaceholder` still renders
  on-brand gradient stand-ins; swap it for `next/image` as photos arrive (keep the descriptive `alt`).
