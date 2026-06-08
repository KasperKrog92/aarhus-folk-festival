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
  imageAlt,
  href,
}: {
  name: string;
  tagline: string;
  image?: string;
  /** Describes {@link image} for the social-card preview. */
  imageAlt?: string;
  href: string;
}): Metadata {
  const description = `${name} — ${tagline}`;

  // The act photo is the per-page preview; `alt` is the one field crawlers can
  // always use. Dimensions vary per photo and aren't tracked in the data, so we
  // omit width/height rather than ship inaccurate values.
  const images = image ? [{ url: image, alt: imageAlt ?? name }] : undefined;

  return {
    title: name,
    description,
    alternates: { canonical: href },
    openGraph: {
      title: `${name} | ${site.name}`,
      description,
      url: href,
      ...(images ? { images } : {}),
    },
  };
}
