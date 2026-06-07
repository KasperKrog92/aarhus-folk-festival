import "server-only";

import { cookies } from "next/headers";
import { defaultTheme, isTheme, THEME_COOKIE, type Theme } from "./theme";

/**
 * Reads the visitor's theme from the cookie (server components only).
 * Falls back to the default theme. Reading the cookie keeps this route
 * dynamically rendered — acceptable since it already reads the locale cookie.
 */
export async function getTheme(): Promise<Theme> {
  const store = await cookies();
  const value = store.get(THEME_COOKIE)?.value;
  return isTheme(value) ? value : defaultTheme;
}
