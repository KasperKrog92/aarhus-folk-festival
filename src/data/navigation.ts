/** Primary navigation. Anchors point at on-page sections for this concept. */
import type { Localized } from "@/i18n/config";

export type NavItem = {
  label: Localized;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: { da: "Program", en: "Programme" }, href: "/program" },
  { label: { da: "Kunstnere", en: "Artists" }, href: "/kunstnere" },
  { label: { da: "Workshops", en: "Workshops" }, href: "/workshops" },
  { label: { da: "Praktisk info", en: "Practical info" }, href: "/#praktisk" },
  { label: { da: "Om festivalen", en: "About" }, href: "/om-festivalen" },
];

// "Presse" / "Sponsorer" / "Arkiv" were removed: they pointed at homepage
// anchors that don't exist, so they were dead links that wasted crawl budget.
// Re-add them here (as real routes) once those content areas are built.
export const footerNav: NavItem[] = [
  { label: { da: "Kontakt", en: "Contact" }, href: "/kontakt" },
  { label: { da: "Foreningen", en: "The association" }, href: "/foreningen" },
  { label: { da: "Cookies", en: "Cookies" }, href: "/cookies" },
];
