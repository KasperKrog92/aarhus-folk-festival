"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

type FolkStripeProps = {
  className?: string;
};

/** Fixed palette colours, kept inline so the motif contrast never flips. */
const BLOCK = "#e1cbac"; // cream-300 squares / cross
const DIAMOND_A = "#d76d8a"; // pink
const DIAMOND_B = "#f0bccb"; // pink-200

/** Festival palette for the celebration sparks (pink, pink-200, cream, teal). */
const SPARK_COLORS = [DIAMOND_A, DIAMOND_B, BLOCK, "#7bb4bb"];

/**
 * Enough 80px tiles to cover the widest stripe (inside `max-w-6xl` content),
 * centred and clipped by the rounded container. Extra tiles past the edges are
 * cheap and simply hidden by `overflow-hidden`.
 */
const TILE_COUNT = 16;

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

type Move = {
  keyframes: Keyframe[];
  duration: number;
  easing: string;
};

/**
 * Per-symbol motion, played via the Web Animations API so each runs once to
 * completion — independent of whether the pointer is still hovering. Every move
 * returns to its start transform, so there's no layout shift and no held state.
 */
const DIAMOND_SPIN: Move = {
  keyframes: [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
  duration: 520,
  easing: SPRING,
};
const CROSS_TWIRL: Move = {
  keyframes: [
    { transform: "rotate(0deg)", offset: 0 },
    { transform: "rotate(90deg)", offset: 0.45 },
    { transform: "rotate(0deg)", offset: 1 },
  ],
  duration: 460,
  easing: SPRING,
};
/**
 * The cream squares get the showiest move: a full turn while bulging into a
 * circle (animated `rx`/`ry`) and back to a square. `rx`/`ry` are progressively
 * enhanced — where they don't animate, the spin still reads.
 */
const BLOCK_MORPH: Move = {
  keyframes: [
    { transform: "rotate(0deg) scale(1)", rx: "0px", ry: "0px", offset: 0 },
    {
      transform: "rotate(180deg) scale(1.12)",
      rx: "8px",
      ry: "8px",
      offset: 0.5,
    },
    { transform: "rotate(360deg) scale(1)", rx: "0px", ry: "0px", offset: 1 },
  ],
  duration: 640,
  easing: "ease-in-out",
};
/** Gentle catch played on a hovered symbol's neighbour. */
const NEIGHBOUR_BOB: Move = {
  keyframes: [
    { transform: "translateY(0)", offset: 0 },
    { transform: "translateY(-1.5px)", offset: 0.5 },
    { transform: "translateY(0)", offset: 1 },
  ],
  duration: 420,
  easing: "ease-in-out",
};

function moveForSymbol(el: Element): Move | null {
  if (el.classList.contains("folk-diamond")) return DIAMOND_SPIN;
  if (el.classList.contains("folk-cross")) return CROSS_TWIRL;
  if (el.classList.contains("folk-block")) return BLOCK_MORPH;
  return null;
}

/**
 * Woven textile stripe: a repeating folk pattern of diamonds and crosses in the
 * festival palette, reminiscent of embroidered ribbon. Decorative divider used
 * between content blocks.
 *
 * Each 80×16 tile is a real inline SVG so the cream square, pink diamonds and
 * cream cross can react independently — diamonds spin, the cross twirls and the
 * square spins while morphing into a circle. On hover or press a little burst of
 * folk-coloured sparks also sprays out of the top and bottom at the pointer, for
 * a celebratory feel. All motion is driven through the Web Animations API (not
 * CSS `:hover`) so each animation always finishes even after the pointer leaves.
 * Touch has no hover, so a tap bursts the whole tapped tile left→right, while
 * sliding across the stripe triggers each newly crossed tile. Purely cosmetic:
 * the strip stays `aria-hidden` with no focusable controls, and everything is
 * skipped under `prefers-reduced-motion: reduce`. The static background-image
 * version is preserved in
 * `docs/reports/folk-stripe-static-reference.md`.
 */
export function FolkStripe({ className }: FolkStripeProps) {
  const stripeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);
  // Symbols currently mid-animation, so jitter or a held pointer can't restack.
  const animating = useRef(new WeakSet<Element>());
  const activeTouchPointer = useRef<number | null>(null);
  const lastTouchedTile = useRef<Element | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = query.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  /** Play a symbol move once; returns false if it was already animating. */
  function play(el: Element, move: Move, delay = 0): boolean {
    if (animating.current.has(el)) return false;
    animating.current.add(el);
    const animation = el.animate(move.keyframes, {
      duration: move.duration,
      easing: move.easing,
      delay,
    });
    const release = () => animating.current.delete(el);
    animation.addEventListener("finish", release);
    animation.addEventListener("cancel", release);
    return true;
  }

  /**
   * Spray `count` sparks from `x` (relative to the overlay) out of the stripe's
   * top and bottom edges, then remove each when its animation finishes.
   */
  function spray(x: number, count: number) {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const cy = overlay.clientHeight / 2;
    for (let i = 0; i < count; i++) {
      const up = i % 2 === 0; // alternate so sparks fan out top and bottom
      const dx = (Math.random() - 0.5) * 40;
      const dy = (up ? -1 : 1) * (22 + Math.random() * 30);
      const rot = (Math.random() - 0.5) * 540;
      const size = 4 + Math.random() * 5;

      const spark = document.createElement("span");
      spark.className = "folk-spark";
      spark.style.left = `${x}px`;
      spark.style.top = `${cy}px`;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.backgroundColor = SPARK_COLORS[i % SPARK_COLORS.length];
      // Half the sparks are dots, half stay square (and read as tumbling diamonds).
      if (Math.random() < 0.5) spark.style.borderRadius = "50%";
      overlay.appendChild(spark);

      const animation = spark.animate(
        [
          {
            transform: "translate(-50%, -50%) rotate(0deg) scale(0.6)",
            opacity: 1,
            offset: 0,
          },
          {
            transform: `translate(-50%, -50%) translate(${dx * 0.5}px, ${dy * 0.5}px) rotate(${rot * 0.5}deg) scale(1)`,
            opacity: 1,
            offset: 0.3,
          },
          {
            transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(0.2)`,
            opacity: 0,
            offset: 1,
          },
        ],
        {
          duration: 620 + Math.random() * 320,
          easing: "cubic-bezier(0.15, 0.7, 0.3, 1)",
        },
      );
      const remove = () => spark.remove();
      animation.addEventListener("finish", remove);
      animation.addEventListener("cancel", remove);
    }
  }

  /** x of a client coordinate relative to the spark overlay. */
  function overlayX(clientX: number): number {
    const overlay = overlayRef.current;
    return overlay ? clientX - overlay.getBoundingClientRect().left : 0;
  }

  function playTile(tile: Element) {
    Array.from(tile.children).forEach((symbol, i) => {
      const move = moveForSymbol(symbol);
      if (move) play(symbol, move, i * 80);
    });
  }

  /**
   * Touch pointers are implicitly captured by the element pressed first, so
   * `event.target` does not follow the finger. Resolve the current horizontal
   * coordinate instead, which also tolerates a little vertical finger drift.
   */
  function tileAtX(clientX: number): Element | null {
    const stripe = stripeRef.current;
    if (!stripe) return null;
    const stripeRect = stripe.getBoundingClientRect();
    if (clientX < stripeRect.left || clientX > stripeRect.right) return null;
    return (
      Array.from(stripe.querySelectorAll(".folk-tile")).find((tile) => {
        const tileRect = tile.getBoundingClientRect();
        return clientX >= tileRect.left && clientX <= tileRect.right;
      }) ?? null
    );
  }

  // Mouse/pen hover: animate the hovered symbol, let a neighbour catch it, and
  // spray a small celebratory burst — gated so each symbol only fires once per
  // animation cycle (a fast sweep won't flood).
  function handlePointerOver(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || reducedMotion.current) return;
    const symbol = (event.target as Element).closest(
      ".folk-diamond, .folk-cross, .folk-block",
    );
    if (!symbol) return;
    const move = moveForSymbol(symbol);
    if (!move || !play(symbol, move)) return;
    const neighbour = symbol.nextElementSibling ?? symbol.previousElementSibling;
    if (neighbour) play(neighbour, NEIGHBOUR_BOB, 70);
    const rect = symbol.getBoundingClientRect();
    spray(overlayX(rect.left + rect.width / 2), 4);
  }

  // Press (mouse, pen or touch): a fuller celebration burst at the pointer, plus
  // a pop of the pressed tile's symbols. Touch continues tracking after this so
  // sliding back and forth can animate each newly crossed tile.
  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion.current) return;
    spray(overlayX(event.clientX), 14);
    const tile =
      (event.target as Element).closest(".folk-tile") ?? tileAtX(event.clientX);
    if (!tile) return;
    playTile(tile);
    if (event.pointerType === "touch") {
      activeTouchPointer.current = event.pointerId;
      lastTouchedTile.current = tile;
    }
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "touch" ||
      event.pointerId !== activeTouchPointer.current ||
      reducedMotion.current
    ) {
      return;
    }

    const tile = tileAtX(event.clientX);
    if (tile === lastTouchedTile.current) return;
    lastTouchedTile.current = tile;
    if (!tile) return;

    playTile(tile);
    spray(overlayX(event.clientX), 5);
  }

  function stopTouchTracking(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerId !== activeTouchPointer.current) return;
    activeTouchPointer.current = null;
    lastTouchedTile.current = null;
  }

  return (
    <div aria-hidden className={cn("relative", className)}>
      <div
        ref={stripeRef}
        onPointerOver={handlePointerOver}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopTouchTracking}
        onPointerCancel={stopTouchTracking}
        className="flex h-6 w-full touch-pan-y select-none items-center justify-center overflow-hidden rounded-full bg-petroleum"
      >
        {Array.from({ length: TILE_COUNT }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 80 16"
            width={80}
            height={16}
            className="folk-tile"
            focusable="false"
          >
            {/* Children are in visual left→right order so the tap-burst stagger
                ripples across the tile. One 16×16 cream square per tile repeats
                as a divider every 80px, with diamond / cross / diamond between. */}
            <rect className="folk-block" width={16} height={16} fill={BLOCK} />
            <path
              className="folk-diamond"
              d="M28 2 L36 8 L28 14 L20 8 Z"
              fill={DIAMOND_A}
            />
            <path
              className="folk-cross"
              d="M46 5 h4 v2 h2 v2 h-2 v2 h-4 v-2 h-2 v-2 h2 z"
              fill={BLOCK}
            />
            <path
              className="folk-diamond"
              d="M68 2 L76 8 L68 14 L60 8 Z"
              fill={DIAMOND_B}
            />
          </svg>
        ))}
      </div>
      {/* Un-clipped layer above the stripe where sparks fly out top and bottom. */}
      <div ref={overlayRef} className="pointer-events-none absolute inset-0" />
    </div>
  );
}
