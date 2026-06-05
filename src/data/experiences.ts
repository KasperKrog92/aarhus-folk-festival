/**
 * "Oplev festivalen", the kinds of experiences on offer.
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
      da: "Nære kirkerum og fyldte sale med musikere fra Norden og videre ud.",
      en: "Close-up concerts in churches and halls with musicians from the Nordics and beyond.",
    },
    href: "#program",
    accent: "petroleum",
  },
  {
    id: "dans",
    icon: "dance",
    title: { da: "Dans", en: "Dance" },
    description: {
      da: "Lær trinene sammen med andre, eller find rytmen undervejs.",
      en: "Learn the steps with others, or find the rhythm as you go.",
    },
    href: "#program",
    accent: "pink",
  },
  {
    id: "jam",
    icon: "session",
    title: { da: "Jam & sessions", en: "Jam & sessions" },
    description: {
      da: "Tag instrumentet under armen og slå dig ned i en åben session.",
      en: "Bring your instrument and sit in on an open session.",
    },
    href: "#program",
    accent: "teal",
  },
  {
    id: "workshops",
    icon: "workshop",
    title: { da: "Workshops", en: "Workshops" },
    description: {
      da: "Kom tæt på sangene, dansene og håndværket bag musikken.",
      en: "Get closer to the songs, dances and craft behind the music.",
    },
    href: "#oplev",
    accent: "aubergine",
  },
  {
    id: "boern",
    icon: "family",
    title: { da: "Børn & familie", en: "Children & family" },
    description: {
      da: "Musik, dans og fortællinger i børnehøjde.",
      en: "Music, dance and stories made for children and families.",
    },
    href: "#program",
    accent: "rust",
  },
  {
    id: "praktisk",
    icon: "info",
    title: { da: "Praktisk info", en: "Practical info" },
    description: {
      da: "Billetter, steder og små ting, der er rare at vide på forhånd.",
      en: "Tickets, venues and the small things that are good to know before you arrive.",
    },
    href: "#praktisk",
    accent: "petroleum",
  },
];
