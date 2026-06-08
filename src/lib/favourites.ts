/**
 * Favourited events, stored in localStorage so they stay on the visitor's device
 * without being sent with every request. Framework-free and SSR-safe:
 * `parseFavourites` is pure, while the read/write helpers touch browser APIs and
 * no-op during server rendering.
 *
 * The stored value is a comma-separated list of event ids (see `src/data/events.ts`).
 * Those ids are kebab-case slugs, so they never contain a comma.
 */

/** localStorage key that stores the visitor's favourited event ids. */
export const FAVOURITES_STORAGE_KEY = "aff_favourites";

const LEGACY_FAVOURITES_COOKIE = "aff_favourites";
let memoryFavourites: string | null = null;

// Treat browser storage as a tiny external store so components can read it with
// `useSyncExternalStore` and stay in sync when any favourite changes.
const listeners = new Set<() => void>();

/** Subscribe to favourite changes; returns an unsubscribe fn. */
export function subscribeFavourites(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Parse a raw stored value into event ids. Pure; safe on server or client. */
export function parseFavourites(raw: string | undefined): string[] {
  if (!raw) return [];
  const decoded = safelyDecode(raw);
  return decoded
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

/** Read the favourited event ids from browser storage (client only). */
export function readFavourites(): string[] {
  if (typeof window === "undefined") return [];

  const stored = readStoredFavourites();
  if (stored !== null) {
    expireLegacyFavouritesCookie();
    return parseFavourites(stored);
  }

  const legacy = readLegacyFavouritesCookie();
  if (legacy.length > 0) {
    writeFavourites(legacy);
    expireLegacyFavouritesCookie();
  }
  return legacy;
}

/** Persist the favourited event ids to browser storage (client only). */
function writeFavourites(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    const value = ids.join(",");
    window.localStorage.setItem(FAVOURITES_STORAGE_KEY, value);
    memoryFavourites = value;
  } catch {
    // Browser storage can be disabled; keep the current tab working anyway.
    memoryFavourites = ids.join(",");
  }
  expireLegacyFavouritesCookie();
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

function readLegacyFavouritesCookie(): string[] {
  if (typeof document === "undefined") return [];
  const entry = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LEGACY_FAVOURITES_COOKIE}=`));
  return parseFavourites(entry?.slice(LEGACY_FAVOURITES_COOKIE.length + 1));
}

function expireLegacyFavouritesCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${LEGACY_FAVOURITES_COOKIE}=;path=/;max-age=0;samesite=lax`;
}

function readStoredFavourites(): string | null {
  try {
    return window.localStorage.getItem(FAVOURITES_STORAGE_KEY);
  } catch {
    return memoryFavourites;
  }
}

function safelyDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
