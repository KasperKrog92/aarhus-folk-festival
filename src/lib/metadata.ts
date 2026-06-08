import type { Metadata } from "next";
import { site } from "@/data/site";
import type { Locale, Localized } from "@/i18n/config";

/**
 * Standard page metadata: a localized title + description and a canonical URL.
 * Subpages inherit the shared OpenGraph/Twitter card from the root layout, so
 * they only need these three fields. Act detail pages use {@link actMetadata}.
 */
export function pageMetadata(
  {
    title,
    description,
    href,
  }: {
    title: Localized;
    description: Localized;
    href: string;
  },
  locale: Locale,
): Metadata {
  return {
    title: title[locale],
    description: description[locale],
    alternates: { canonical: href },
  };
}

export function actMetadata({
  name,
  tagline,
  image,
  href,
}: {
  name: string;
  tagline: string;
  image?: string;
  href: string;
}): Metadata {
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
