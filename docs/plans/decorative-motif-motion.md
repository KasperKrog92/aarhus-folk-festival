# Decorative motif motion plan

Plan for adding playful hover/tap animation to the horizontal folk stripe
(`FolkStripe`). This is intentionally cosmetic: it should make the site feel
alive without changing layout, navigation, content, or accessibility semantics.

## Goal

Make the stripe's individual folk symbols respond when visitors interact with
them:

- On pointer hover/focus-capable devices, nearby diamonds, crosses and divider
  blocks flip, spin or bob briefly.
- On touch devices, tapping the stripe triggers the same kind of short burst at
  the tapped position.
- The effect should feel like embroidered pieces catching light: quick, cute,
  small, and clearly secondary to the page content.

## Current state

`src/components/decorative/FolkStripe.tsx` currently renders a single decorative
`div` with a repeated data-URI SVG background. That is efficient, but it means
the individual motif parts cannot be animated independently.

Before changing this component, preserve the current implementation as a backup
reference. The current stripe is already liked and should remain easy to restore
if the animated version feels too busy or fragile.

Recommended backup approach:

- Copy the current implementation into a small reference file such as
  `docs/reports/folk-stripe-static-reference.md`, with the full
  `FolkStripe.tsx` source and a note that it represents the pre-animation design.
- Alternatively, add a `FolkStripeStatic` variant beside the new component during
  the experiment, then remove it only after the owner approves the animated
  version.
- Keep screenshots or browser notes if the visual spacing changes during the
  experiment, so the original proportions can be recreated precisely.

The likely implementation is to keep the same visual design while replacing the
background image with actual repeated units:

- render a row of motif tiles inside the rounded petroleum container;
- each tile contains the existing cream side blocks, pink diamonds and cream
  cross as inline SVG or small HTML elements;
- keep `aria-hidden` on the whole stripe and do not add focusable controls,
  because the interaction has no functional outcome.

## Interaction design

- Hovering a symbol animates only that symbol, plus maybe one neighbouring symbol
  with a smaller delay.
- Diamonds can use a `rotateY(180deg)` flip or a small `rotate(180deg)` spin.
- Crosses can do a tiny quarter-turn and settle back.
- Cream divider blocks can do a subtle vertical bounce or shimmer, not a large
  movement.
- Tapping on mobile should trigger a local ripple of two to four symbols from
  the tapped tile, then clear the active state after the animation finishes.
- The animation should run once per hover/tap, not loop continuously.
- Use short durations, around 350-600ms, with a soft easing curve.

## Accessibility and motion rules

- Respect `prefers-reduced-motion: reduce`; in reduced motion, keep the stripe
  static or use a tiny colour/opacity change only.
- Keep the element decorative with `aria-hidden`, no tab stop, no visible
  instructions and no screen-reader announcement.
- Do not rely on this effect to convey state or information.
- Ensure the stripe height and width are stable before, during and after the
  animation. No layout shift.
- Keep colour contrast unchanged for the base motif in light and dark themes.

## Implementation steps

1. Save a backup/reference of the current static `FolkStripe` code before editing
   it, either in `docs/reports/` or as a temporary `FolkStripeStatic` component.
2. Convert `FolkStripe` from a background-image stripe to a rendered motif row.
   Preserve the current dimensions, rounded-full shape, colours and repeat
   rhythm.
3. Add CSS classes/keyframes in `globals.css` or colocated class names that fit
   the current Tailwind v4 setup. Prefer transform-only animation.
4. Add lightweight client interactivity only if needed for tap position:
   `FolkStripe` can become a small client component, or it can delegate the tap
   burst to a tiny child component. Keep the rest of the pages server-rendered.
5. For pointer devices, use CSS hover selectors where possible. For touch, use
   React state to mark the tapped tile and clear it with a timer or animation
   end handler.
6. Keep the public API unchanged: existing pages should still render
   `<FolkStripe className="..." />`.

## Verification

- Run `pnpm lint` for the focused component/CSS change.
- If the component becomes client-side or the rendering approach changes
  substantially, run `pnpm build`.
- If a dev server is already running, ask the owner to check the effect in their
  open browser instead of opening another browser session.
- Manually check desktop hover, mobile/touch tap, dark mode, and reduced-motion
  behaviour.

## Nice-to-have polish

- Add a small random-seed or alternating direction so adjacent symbols do not all
  spin the same way.
- Tune the animation per symbol type: diamonds flip, crosses twirl, divider
  blocks pulse.
- Consider reusing the rendered motif row for other narrow decorative stripes if
  the result is stable and still simple.
