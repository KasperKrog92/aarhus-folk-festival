/** Primary navigation. Anchors point at on-page sections for this concept. */
import type { Localized } from "@/i18n/config";

export type NavItem = {
  label: Localized;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: { da: "Program", en: "Programme" }, href: "/#program" },
  { label: { da: "Kunstnere", en: "Artists" }, href: "/#kunstnere" },
  { label: { da: "Workshops", en: "Workshops" }, href: "/#oplev" },
  { label: { da: "Praktisk info", en: "Practical info" }, href: "/#praktisk" },
  { label: { da: "Om festivalen", en: "About" }, href: "/#om" },
];

export const footerNav: NavItem[] = [
  { label: { da: "Kontakt", en: "Contact" }, href: "/#kontakt" },
  { label: { da: "Presse", en: "Press" }, href: "/#presse" },
  { label: { da: "Sponsorer", en: "Sponsors" }, href: "/#sponsorer" },
  { label: { da: "Arkiv", en: "Archive" }, href: "/#arkiv" },
];
