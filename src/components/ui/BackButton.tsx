"use client";

import { useRouter } from "next/navigation";

/**
 * A "go back" control. When the visitor reached the page from elsewhere in the
 * same tab, it steps back through the browser history (so they land exactly where
 * they came from); on a direct load or external link, where there's nothing to
 * go back to, it falls back to `fallbackHref`. Renders a plain `<button>`, so the
 * caller styles it via `className` (e.g. `buttonClasses("outline")`).
 */
export function BackButton({
  fallbackHref,
  className,
  children,
}: {
  fallbackHref: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  function handleClick() {
    // history.length > 1 means there is a previous entry in this tab to return to.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
