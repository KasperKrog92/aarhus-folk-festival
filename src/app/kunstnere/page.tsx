import type { Metadata } from "next";
import { ActListing } from "@/components/sections/ActListing";
import { artists, artistsPage } from "@/data/artists";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return pageMetadata(
    {
      title: artistsPage.title,
      description: artistsPage.intro,
      href: artistsPage.href,
    },
    locale,
  );
}

export default async function ArtistsPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <ActListing
      eyebrow={artistsPage.eyebrow[locale]}
      title={artistsPage.title[locale]}
      intro={artistsPage.intro[locale]}
      cards={artists.map((artist) => ({
        href: `${artistsPage.href}/${artist.slug}`,
        eyebrow: artist.genre[locale],
        name: artist.name,
        tagline: artist.tagline[locale],
        image: artist.image,
        imageAlt: artist.imageAlt[locale],
        tone: artist.tone,
        cta: t.common.readMore,
      }))}
      backLabel={t.common.backToHome}
    />
  );
}
