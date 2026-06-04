/** Primary navigation. Anchors point at on-page sections for this concept. */
export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Program", href: "#program" },
  { label: "Kunstnere", href: "#kunstnere" },
  { label: "Workshops", href: "#oplev" },
  { label: "Praktisk info", href: "#praktisk" },
  { label: "Om festivalen", href: "#om" },
];

export const footerNav: NavItem[] = [
  { label: "Kontakt", href: "#kontakt" },
  { label: "Presse", href: "#presse" },
  { label: "Sponsorer", href: "#sponsorer" },
  { label: "Arkiv", href: "#arkiv" },
];
