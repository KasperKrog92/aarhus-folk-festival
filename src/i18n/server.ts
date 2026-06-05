import "server-only";

import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";
import { getDictionary } from "./dictionaries";

/**
 * Reads the visitor's locale from the cookie (server components only).
 * Falls back to the default locale. Reading the cookie makes consuming routes
 * dynamically rendered, which is fine for this concept site.
 */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

/** Convenience: the current locale's dictionary, server-side. */
export async function getServerDictionary() {
  return getDictionary(await getLocale());
}
