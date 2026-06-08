"use client";

import {
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { IconHeart } from "@/components/icons";
import {
  isFavourited,
  subscribeFavourites,
  toggleFavourite,
} from "@/lib/favourites";
import { cn } from "@/lib/cn";

/**
 * A small "save / favourite" toggle. Clicking fills the heart (a dusty coral
 * pink) and sends a few little hearts floating up before they fade away. The
 * burst is rendered through a portal so a card's `overflow-hidden` never clips
 * the hearts, and the whole flourish is skipped when the visitor prefers
 * reduced motion. The toggle itself is a visual demo, like the rest of the
 * site (no network; event favourites persist locally in the browser).
 */

type FloatingHeart = {
  id: number;
  tx: number; // horizontal drift, px
  ty: number; // upward travel, px (negative = up)
  rotate: number; // final rotation, deg
  scale: number; // final scale
  delay: number; // ms
  duration: number; // ms
};

let heartSeq = 0;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function FavouriteButton({
  label,
  className,
  iconClassName = "size-5",
  eventId,
}: {
  label: string;
  className?: string;
  iconClassName?: string;
  /**
   * When set, the favourite is persisted locally under this event id. Without
   * it the toggle is ephemeral, e.g. the header's "save the date" heart.
   */
  eventId?: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [localLiked, setLocalLiked] = useState(false);
  const [popping, setPopping] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  // Persisted favourites live in browser storage, read here as an external store.
  // The server snapshot is always `false`, and the client reconciles to the
  // real stored value after hydration, so there's no hydration mismatch.
  // Buttons without an `eventId` (e.g. the header's "save the date") stay local.
  const persistedLiked = useSyncExternalStore(
    subscribeFavourites,
    () => (eventId ? isFavourited(eventId) : false),
    () => false,
  );
  const liked = eventId ? persistedLiked : localLiked;

  function burst() {
    const next: FloatingHeart[] = Array.from({ length: 6 }, () => ({
      id: heartSeq++,
      tx: Math.round((Math.random() - 0.5) * 52),
      ty: -56 - Math.round(Math.random() * 26),
      rotate: Math.round((Math.random() - 0.5) * 80),
      scale: 0.6 + Math.random() * 0.6,
      delay: Math.round(Math.random() * 140),
      duration: 820 + Math.round(Math.random() * 360),
    }));
    setHearts((prev) => [...prev, ...next]);
  }

  function handleClick() {
    // Persist locally when this button represents an event (the external
    // store then re-renders us); otherwise the toggle is purely local.
    const nextLiked = eventId ? toggleFavourite(eventId) : !localLiked;
    if (!eventId) setLocalLiked(nextLiked);

    if (nextLiked && !prefersReducedMotion()) {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }
      setPopping(true);
      burst();
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={label}
      aria-pressed={liked}
      className={className}
    >
      <IconHeart
        fill={liked ? "currentColor" : "none"}
        onAnimationEnd={() => setPopping(false)}
        className={cn(
          iconClassName,
          liked && "text-pink-600",
          popping && "animate-heart-pop",
        )}
      />

      {hearts.length > 0 && typeof document !== "undefined"
        ? createPortal(
            <div
              className="pointer-events-none fixed z-[60]"
              style={{ left: origin.x, top: origin.y }}
              aria-hidden
            >
              {hearts.map((h) => (
                <IconHeart
                  key={h.id}
                  fill="currentColor"
                  onAnimationEnd={() =>
                    setHearts((prev) => prev.filter((x) => x.id !== h.id))
                  }
                  className="absolute left-0 top-0 size-4 animate-heart-float text-pink-600"
                  style={
                    {
                      "--tx": `${h.tx}px`,
                      "--ty": `${h.ty}px`,
                      "--rot": `${h.rotate}deg`,
                      "--sc": h.scale,
                      animationDelay: `${h.delay}ms`,
                      animationDuration: `${h.duration}ms`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>,
            document.body,
          )
        : null}
    </button>
  );
}
