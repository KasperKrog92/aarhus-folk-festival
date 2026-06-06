import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActDetail } from "@/components/sections/ActDetail";
import { formatDay } from "@/data/program";
import { getWorkshop, workshops, workshopsPage } from "@/data/workshops";
import { site } from "@/data/site";
import { getLocale } from "@/i18n/server";

type WorkshopPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workshops.map((workshop) => ({ slug: workshop.slug }));
}

export async function generateMetadata({
  params,
}: WorkshopPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workshop = getWorkshop(slug);

  if (!workshop) {
    return {};
  }

  const locale = await getLocale();
  const name = workshop.name[locale];
  const description = `${name} — ${workshop.tagline[locale]}`;

  return {
    title: name,
    description,
    alternates: { canonical: `${workshopsPage.href}/${workshop.slug}` },
    openGraph: {
      title: `${name} | ${site.name}`,
      description,
      url: `${workshopsPage.href}/${workshop.slug}`,
      ...(workshop.image ? { images: [{ url: workshop.image }] } : {}),
    },
  };
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const { slug } = await params;
  const workshop = getWorkshop(slug);

  if (!workshop) {
    notFound();
  }

  const locale = await getLocale();

  return (
    <ActDetail
      locale={locale}
      eyebrow={workshop.category[locale]}
      name={workshop.name[locale]}
      tagline={workshop.tagline[locale]}
      bio={workshop.bio.map((paragraph) => paragraph[locale])}
      image={workshop.image}
      imageAlt={workshop.imageAlt[locale]}
      tone={workshop.tone}
      category={workshop.category[locale]}
      shows={workshop.shows.map((show) => ({
        day: formatDay(show.dayId, locale),
        time: show.time,
        venue: show.venue[locale],
      }))}
      backHref={workshopsPage.href}
    />
  );
}
