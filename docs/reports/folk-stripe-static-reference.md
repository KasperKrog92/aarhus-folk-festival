# FolkStripe — static reference (pre-animation)

This is the original `src/components/decorative/FolkStripe.tsx` as it stood
before the decorative-motif-motion experiment (see
`docs/plans/decorative-motif-motion.md`). It rendered the woven folk stripe as a
single `div` with a repeated data-URI SVG background — efficient, but the
individual motif parts could not be animated independently.

Keep this so the well-liked static version can be restored verbatim if the
animated stripe ever feels too busy or fragile. To restore, paste this source
back over `FolkStripe.tsx` and remove the `.folk-*` rules / keyframes added to
`src/app/globals.css`.

## Geometry notes

The motif tile is an 80×16 unit, repeated horizontally and centred, sitting in a
24px-tall (`h-6`) `rounded-full` petroleum container:

- 8px cream blocks at each tile edge (`x=0` and `x=72`); abutting tiles pair them
  into a single 16px cream divider every 80px.
- A pink diamond (`#d76d8a`) centred at `x=20`, a pink-200 diamond (`#f0bccb`)
  centred at `x=60`, both spanning `y=2..14`.
- A cream-300 cross (`#e1cbac`) centred at `x=40`, spanning `y=5..11`.

The animated version keeps this repeat rhythm but splits each tile into a real
inline `<svg>`, using a single whole 16×16 cream square per tile (instead of the
two 8px edge halves) so the square can spin and morph as one element. The pattern
is identical aside from an invisible 8px phase shift.

## Original source

```tsx
import { cn } from "@/lib/cn";

type FolkStripeProps = {
  className?: string;
};

/**
 * Woven textile stripe, a repeating folk pattern of diamonds and crosses in
 * the festival palette, reminiscent of embroidered ribbon. Decorative divider
 * used between content blocks.
 */
export function FolkStripe({ className }: FolkStripeProps) {
  return (
    <div
      aria-hidden
      className={cn("h-6 w-full overflow-hidden rounded-full", className)}
      style={{
        backgroundColor: "#134e57",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='16' viewBox='0 0 80 16'%3E%3Crect width='80' height='16' fill='%23134e57'/%3E%3Crect width='8' height='16' fill='%23e1cbac'/%3E%3Crect x='72' width='8' height='16' fill='%23e1cbac'/%3E%3Cpath d='M20 2 L28 8 L20 14 L12 8 Z' fill='%23d76d8a'/%3E%3Cpath d='M60 2 L68 8 L60 14 L52 8 Z' fill='%23f0bccb'/%3E%3Cpath d='M38 5 h4 v2 h2 v2 h-2 v2 h-4 v-2 h-2 v-2 h2 z' fill='%23e1cbac'/%3E%3C/svg%3E\")",
        backgroundPosition: "center",
        backgroundRepeat: "repeat-x",
        backgroundSize: "80px 16px",
      }}
    />
  );
}
```
