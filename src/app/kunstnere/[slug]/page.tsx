import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActDetail } from "@/components/sections/ActDetail";
import { artists, artistsPage, getArtist } from "@/data/artists";
import { actDetailShows } from "@/data/program";
import { getLocale } from "@/i18n/server";
import { actMetadata } from "@/lib/metadata";

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

  return actMetadata(
    {
      name: artist.name,
      tagline: artist.tagline[locale],
      image: artist.image,
      href: `${artistsPage.href}/${artist.slug}`,
    },
    locale,
  );
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getArtist(slug);

  if (!artist) {
    notFound();
  }

  const locale = await getLocale();

  return (
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
      shows={actDetailShows(artist.shows, locale)}
      backHref={artistsPage.href}
    />
  );
}
