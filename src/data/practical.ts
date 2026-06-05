/** Practical info teaser cards. `icon` resolves to an SVG in the view layer. */
import type { Localized } from "@/i18n/config";

export type PracticalIcon = "pin" | "bed" | "bus" | "cup" | "accessibility";

export type PracticalItem = {
  id: string;
  icon: PracticalIcon;
  title: Localized;
  description: Localized;
  href: string;
};

export const practicalItems: PracticalItem[] = [
  {
    id: "steder",
    icon: "pin",
    title: { da: "Steder & transport", en: "Venues & transport" },
    description: {
      da: "Find festivalens scener og kom nemt rundt i Aarhus.",
      en: "Find the festival stages and get around Aarhus with ease.",
    },
    href: "#praktisk",
  },
  {
    id: "overnatning",
    icon: "bed",
    title: { da: "Overnatning", en: "Accommodation" },
    description: {
      da: "Hoteller, vandrerhjem og overnatning tæt på det hele.",
      en: "Hotels, hostels and places to stay close to it all.",
    },
    href: "#praktisk",
  },
  {
    id: "mad",
    icon: "cup",
    title: { da: "Mad & drikke", en: "Food & drink" },
    description: {
      da: "Madboder, caféer og lokale spisesteder ved scenerne.",
      en: "Food stalls, cafés and local eateries by the stages.",
    },
    href: "#praktisk",
  },
  {
    id: "tilgaengelighed",
    icon: "accessibility",
    title: { da: "Tilgængelighed", en: "Accessibility" },
    description: {
      da: "Sådan oplever alle festivalen med os — uanset behov.",
      en: "How everyone can experience the festival with us — whatever your needs.",
    },
    href: "#praktisk",
  },
];
