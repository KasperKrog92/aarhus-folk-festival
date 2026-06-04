/**
 * "Oplev festivalen" — the kinds of experiences on offer.
 * `icon` is a key resolved to an SVG component in the rendering layer, so this
 * stays a plain data file.
 */
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
  title: string;
  description: string;
  href: string;
  /** Accent colour key for the icon badge. */
  accent: "petroleum" | "pink" | "teal" | "aubergine" | "rust";
};

export const experiences: Experience[] = [
  {
    id: "koncerter",
    icon: "concert",
    title: "Koncerter",
    description: "Intime kirkerum og fyldte sale med folk fra hele Norden.",
    href: "#program",
    accent: "petroleum",
  },
  {
    id: "dans",
    icon: "dance",
    title: "Dans",
    description: "Lær trinene til balfolk, eller kast dig bare ud i det.",
    href: "#program",
    accent: "pink",
  },
  {
    id: "jam",
    icon: "session",
    title: "Jam & sessions",
    description: "Tag instrumentet med til de åbne sessioner rundt i byen.",
    href: "#program",
    accent: "teal",
  },
  {
    id: "workshops",
    icon: "workshop",
    title: "Workshops",
    description: "Syng, spil og byg sammen med kyndige spillemænd.",
    href: "#oplev",
    accent: "aubergine",
  },
  {
    id: "boern",
    icon: "family",
    title: "Børn & familie",
    description: "Folkemusik i børnehøjde med dans, sang og fortælling.",
    href: "#program",
    accent: "rust",
  },
  {
    id: "praktisk",
    icon: "info",
    title: "Praktisk info",
    description: "Alt du skal vide, før du tager afsted til festivalen.",
    href: "#praktisk",
    accent: "petroleum",
  },
];
