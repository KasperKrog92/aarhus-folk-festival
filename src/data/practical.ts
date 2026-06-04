/** Practical info teaser cards. `icon` resolves to an SVG in the view layer. */
export type PracticalIcon = "pin" | "bed" | "bus" | "cup" | "accessibility";

export type PracticalItem = {
  id: string;
  icon: PracticalIcon;
  title: string;
  description: string;
  href: string;
};

export const practicalItems: PracticalItem[] = [
  {
    id: "steder",
    icon: "pin",
    title: "Steder & transport",
    description: "Find festivalens scener og kom nemt rundt i Aarhus.",
    href: "#praktisk",
  },
  {
    id: "overnatning",
    icon: "bed",
    title: "Overnatning",
    description: "Hoteller, vandrerhjem og overnatning tæt på det hele.",
    href: "#praktisk",
  },
  {
    id: "mad",
    icon: "cup",
    title: "Mad & drikke",
    description: "Madboder, caféer og lokale spisesteder ved scenerne.",
    href: "#praktisk",
  },
  {
    id: "tilgaengelighed",
    icon: "accessibility",
    title: "Tilgængelighed",
    description: "Sådan oplever alle festivalen med os — uanset behov.",
    href: "#praktisk",
  },
];
