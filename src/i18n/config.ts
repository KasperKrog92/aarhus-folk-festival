/**
 * i18n configuration, framework-free, client- and server-safe.
 * The site is Danish by default; English is offered via the header toggle.
 * Locale is persisted in a cookie (no URL routing). See `server.ts` (read)
 * and `LocaleProvider.tsx` (write).
 */
export const locales = ["da", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "da";

/** Cookie that stores the visitor's chosen locale. */
export const LOCALE_COOKIE = "aff_locale";

/** A value translated into every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

/** Narrowing helper. True when `value` is a supported locale. */
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
