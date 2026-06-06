import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ActCard } from "@/components/ui/ActCard";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { artists, artistsPage } from "@/data/artists";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: artistsPage.title[locale],
    description: artistsPage.intro[locale],
    alternates: { canonical: artistsPage.href },
  };
}

export default async function ArtistsPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">
            {artistsPage.eyebrow[locale]}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {artistsPage.title[locale]}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {artistsPage.intro[locale]}
          </p>
        </div>

        <FolkStripe className="my-10" />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <li key={artist.slug}>
              <ActCard
                href={`${artistsPage.href}/${artist.slug}`}
                eyebrow={artist.genre[locale]}
                name={artist.name}
                tagline={artist.tagline[locale]}
                image={artist.image}
                imageAlt={artist.imageAlt[locale]}
                tone={artist.tone}
                cta={t.common.readMore}
              />
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="/" variant="outline">
            {artistsPage.backLabel[locale]}
          </Button>
        </div>
      </Container>
    </section>
  );
}
