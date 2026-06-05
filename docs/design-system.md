# Design system

Read this when touching colours, fonts, decorative motifs, layout styling, logos,
or images.

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

- `public/logos/logo_text.png` - full wordmark, **transparent** bg, used in the header.
- `public/logos/logo.png` - accordion mark only, baked cream bg (avoid on non-cream surfaces).
- `public/images/mockup_*.png` - design reference mockups (not used in the build).
- Real photography is arriving incrementally. `EventCard` already renders a real photo via
  `next/image` when an event has an `image` (e.g. `public/events/detlysebal.jpg`), and falls
  back to `ImagePlaceholder` otherwise. Elsewhere, `ImagePlaceholder` still renders on-brand
  gradient stand-ins; swap it for `next/image` as photos arrive (keep the descriptive `alt`).
