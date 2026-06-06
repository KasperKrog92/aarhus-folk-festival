import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActDetail } from "@/components/sections/ActDetail";
import { artists, artistsPage, getArtist } from "@/data/artists";
import { formatDay } from "@/data/program";
import { site } from "@/data/site";
import { getLocale } from "@/i18n/server";

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
  const description = `${artist.name} — ${artist.tagline[locale]}`;

  return {
    title: artist.name,
    description,
    alternates: { canonical: `${artistsPage.href}/${artist.slug}` },
    openGraph: {
      title: `${artist.name} | ${site.name}`,
      description,
      url: `${artistsPage.href}/${artist.slug}`,
      ...(artist.image ? { images: [{ url: artist.image }] } : {}),
    },
  };
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
      shows={artist.shows.map((show) => ({
        day: formatDay(show.dayId, locale),
        time: show.time,
        venue: show.venue[locale],
      }))}
      backHref={artistsPage.href}
      backLabel={artistsPage.allArtists[locale]}
    />
  );
}
