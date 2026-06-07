/**
 * Theme configuration — framework-free, client- and server-safe.
 * Mirrors the i18n config pattern in `src/i18n/config.ts`.
 */

export const themes = ["light", "dark"] as const;

export type Theme = (typeof themes)[number];

export const defaultTheme: Theme = "light";

/** Cookie that stores the visitor's chosen theme. */
export const THEME_COOKIE = "aff_theme";

/** Narrowing helper. True when `value` is a supported theme. */
export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (themes as readonly string[]).includes(value);
}
