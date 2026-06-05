/**
 * Festival-wide constants. Centralised here so dates, names and the primary
 * ticket link are edited in one place once a CMS is introduced.
 * Translatable copy is `Localized` (see `src/i18n/config.ts`); structural
 * values (name, year, urls) stay plain.
 */
import type { Localized } from "@/i18n/config";

export const site = {
  name: "Aarhus Folk Festival",
  year: 2026,
  edition: { da: "10. udgave", en: "10th edition" } as Localized,
  dates: {
    da: "24.-27. september 2026",
    en: "24-27 September 2026",
  } as Localized,
  tagline: {
    da: "Folkemusik samler Aarhus",
    en: "Folk music brings Aarhus together",
  } as Localized,
  intro: {
    da: "Fire dage med koncerter, dans, workshops og levende møder i byen.",
    en: "Four days of concerts, dance, workshops and shared moments across the city.",
  } as Localized,
  city: "Aarhus",
  /**
   * Canonical production origin (no trailing slash). Used for SEO metadata.
   * Currently hosted at folk.gamestormers.dk; will move to
   * https://www.aarhusfolkfestival.dk in the future.
   */
  url: "https://folk.gamestormers.dk",
  /** Partout-ticket sales (external, per locale). */
  ticketUrl: {
    da: "https://place2book.com/da/sw2/sales/9j1ap558p1",
    en: "https://place2book.com/en/sw2/sales/9j1ap558p1",
  } as Localized,
  programUrl: "#program",
} as const;
