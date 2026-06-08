import type { Metadata } from "next";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";

export function actMetadata(
  {
    name,
    tagline,
    image,
    href,
  }: {
    name: string;
    tagline: string;
    image?: string;
    href: string;
  },
  _locale: Locale,
): Metadata {
  const description = `${name} — ${tagline}`;

  return {
    title: name,
    description,
    alternates: { canonical: href },
    openGraph: {
      title: `${name} | ${site.name}`,
      description,
      url: href,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}
