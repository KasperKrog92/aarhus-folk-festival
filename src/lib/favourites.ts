/**
 * Favourited events, stored in a cookie that the programme's "Vis hjerte-events"
 * filter reads (see `components/sections/ProgramSchedule.tsx`). Framework-free and
 * SSR-safe: `parseFavourites` is pure (use it server-side with `cookies()` from
 * `next/headers`), while the read/write helpers touch `document` and no-op during
 * server rendering.
 *
 * The cookie holds a comma-separated list of event ids (see `src/data/events.ts`).
 * Those ids are kebab-case slugs, so they never contain a comma.
 */

/** Cookie that stores the visitor's favourited event ids. */
export const FAVOURITES_COOKIE = "aff_favourites";

const ONE_YEAR = 31536000;

// Treat the cookie as a tiny external store so components can read it with
// `useSyncExternalStore` and stay in sync when any favourite changes.
const listeners = new Set<() => void>();

/** Subscribe to favourite changes; returns an unsubscribe fn. */
export function subscribeFavourites(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Parse a raw cookie value into event ids. Pure; safe on server or client. */
export function parseFavourites(raw: string | undefined): string[] {
  if (!raw) return [];
  return decodeURIComponent(raw)
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

/** Read the favourited event ids from the browser cookie (client only). */
export function readFavourites(): string[] {
  if (typeof document === "undefined") return [];
  const entry = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${FAVOURITES_COOKIE}=`));
  return parseFavourites(entry?.slice(FAVOURITES_COOKIE.length + 1));
}

/** Persist the favourited event ids to the browser cookie (client only). */
function writeFavourites(ids: string[]): void {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(ids.join(","));
  document.cookie = `${FAVOURITES_COOKIE}=${value};path=/;max-age=${ONE_YEAR};samesite=lax`;
}

/** True when the given event is currently favourited (client only). */
export function isFavourited(id: string): boolean {
  return readFavourites().includes(id);
}

/**
 * Toggle an event's favourite state in the cookie. Returns the new state
 * (`true` = now favourited). Client only.
 */
export function toggleFavourite(id: string): boolean {
  const ids = readFavourites();
  const has = ids.includes(id);
  writeFavourites(has ? ids.filter((existing) => existing !== id) : [...ids, id]);
  for (const listener of listeners) listener();
  return !has;
}
