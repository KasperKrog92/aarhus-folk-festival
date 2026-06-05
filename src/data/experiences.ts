/**
 * "Oplev festivalen" — the kinds of experiences on offer.
 * `icon` is a key resolved to an SVG component in the rendering layer, so this
 * stays a plain data file.
 */
import type { Localized } from "@/i18n/config";

export type ExperienceIcon =
  | "concert"
  | "dance"
  | "session"
  | "workshop"
  | "family"
  | "info";

export type Experience = {
  id: string;
  icon: ExperienceIcon;
  title: Localized;
  description: Localized;
  href: string;
  /** Accent colour key for the icon badge. */
  accent: "petroleum" | "pink" | "teal" | "aubergine" | "rust";
};

export const experiences: Experience[] = [
  {
    id: "koncerter",
    icon: "concert",
    title: { da: "Koncerter", en: "Concerts" },
    description: {
      da: "Intime kirkerum og fyldte sale med folk fra hele Norden.",
      en: "Intimate church rooms and packed halls with artists from across the Nordics.",
    },
    href: "#program",
    accent: "petroleum",
  },
  {
    id: "dans",
    icon: "dance",
    title: { da: "Dans", en: "Dance" },
    description: {
      da: "Lær trinene til balfolk, eller kast dig bare ud i det.",
      en: "Learn the steps of bal folk, or simply throw yourself into it.",
    },
    href: "#program",
    accent: "pink",
  },
  {
    id: "jam",
    icon: "session",
    title: { da: "Jam & sessions", en: "Jam & sessions" },
    description: {
      da: "Tag instrumentet med til de åbne sessioner rundt i byen.",
      en: "Bring your instrument to the open sessions around the city.",
    },
    href: "#program",
    accent: "teal",
  },
  {
    id: "workshops",
    icon: "workshop",
    title: { da: "Workshops", en: "Workshops" },
    description: {
      da: "Syng, spil og byg sammen med kyndige spillemænd.",
      en: "Sing, play and build alongside skilled folk musicians.",
    },
    href: "#oplev",
    accent: "aubergine",
  },
  {
    id: "boern",
    icon: "family",
    title: { da: "Børn & familie", en: "Children & family" },
    description: {
      da: "Folkemusik i børnehøjde med dans, sang og fortælling.",
      en: "Folk music at kids' level with dance, song and storytelling.",
    },
    href: "#program",
    accent: "rust",
  },
  {
    id: "praktisk",
    icon: "info",
    title: { da: "Praktisk info", en: "Practical info" },
    description: {
      da: "Alt du skal vide, før du tager afsted til festivalen.",
      en: "Everything you need to know before you head to the festival.",
    },
    href: "#praktisk",
    accent: "petroleum",
  },
];
