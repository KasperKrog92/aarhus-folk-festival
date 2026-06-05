/** Practical info teaser cards. `icon` resolves to an SVG in the view layer. */
import type { Localized } from "@/i18n/config";

export type PracticalIcon =
  | "pin"
  | "bed"
  | "bus"
  | "cup"
  | "accessibility";

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
      da: "Find spillestederne og de nemme veje mellem dem.",
      en: "Find the venues and the simple ways between them.",
    },
    href: "#praktisk",
  },
  {
    id: "overnatning",
    icon: "bed",
    title: { da: "Overnatning", en: "Accommodation" },
    description: {
      da: "Gode steder at sove tæt på festivalen og byen.",
      en: "Places to stay close to the festival and the city.",
    },
    href: "#praktisk",
  },
  {
    id: "mad",
    icon: "cup",
    title: { da: "Mad & drikke", en: "Food & drink" },
    description: {
      da: "Kaffe, mad og lokale steder nær scenerne.",
      en: "Coffee, food and local places near the stages.",
    },
    href: "#praktisk",
  },
  {
    id: "tilgaengelighed",
    icon: "accessibility",
    title: { da: "Tilgængelighed", en: "Accessibility" },
    description: {
      da: "Praktisk hjælp, adgangsforhold og ro til forskellige behov.",
      en: "Access details, practical help and quieter options for different needs.",
    },
    href: "#praktisk",
  },
];
