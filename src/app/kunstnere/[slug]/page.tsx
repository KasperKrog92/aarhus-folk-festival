import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActDetail } from "@/components/sections/ActDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { artists, artistsPage, getArtist } from "@/data/artists";
import { actDetailShows } from "@/data/program";
import { site } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { actMetadata } from "@/lib/metadata";
import { actEventsSchema, breadcrumbSchema } from "@/lib/structured-data";

type ArtistPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({
  params,
}: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtist(slug);

  if (!artist) {
    return {};
  }

  const locale = await getLocale();

  return actMetadata({
    name: artist.name,
    tagline: artist.tagline[locale],
    image: artist.image,
    imageAlt: artist.imageAlt[locale],
    href: `${artistsPage.href}/${artist.slug}`,
  });
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getArtist(slug);

  if (!artist) {
    notFound();
  }

  const locale = await getLocale();
  const t = getDictionary(locale);
  const href = `${artistsPage.href}/${artist.slug}`;
  const shows = actDetailShows(artist.shows, locale);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: t.breadcrumb.home, url: site.url },
            { name: t.breadcrumb.artists, url: `${site.url}${artistsPage.href}` },
            { name: artist.name },
          ]),
          ...actEventsSchema({
            type: "MusicEvent",
            performerType: "MusicGroup",
            name: artist.name,
            description: artist.tagline[locale],
            image: artist.image,
            href,
            shows,
            locale,
          }),
        ]}
      />
      <ActDetail
        locale={locale}
        eyebrow={artist.genre[locale]}
        name={artist.name}
        tagline={artist.tagline[locale]}
        bio={artist.bio.map((paragraph) => paragraph[locale])}
        image={artist.image}
        imageAlt={artist.imageAlt[locale]}
        tone={artist.tone}
        category={artist.category[locale]}
        shows={shows}
        href={href}
        backHref={artistsPage.href}
        breadcrumbParentLabel={t.breadcrumb.artists}
      />
    </>
  );
}
