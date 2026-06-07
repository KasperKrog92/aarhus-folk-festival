import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ActCard } from "@/components/ui/ActCard";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { workshops, workshopsPage } from "@/data/workshops";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: workshopsPage.title[locale],
    description: workshopsPage.intro[locale],
    alternates: { canonical: workshopsPage.href },
  };
}

export default async function WorkshopsPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">
            {workshopsPage.eyebrow[locale]}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-content sm:text-5xl">
            {workshopsPage.title[locale]}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-content-soft">
            {workshopsPage.intro[locale]}
          </p>
        </div>

        <FolkStripe className="my-10" />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workshops.map((workshop) => (
            <li key={workshop.slug}>
              <ActCard
                href={`${workshopsPage.href}/${workshop.slug}`}
                eyebrow={workshop.category[locale]}
                name={workshop.name[locale]}
                tagline={workshop.tagline[locale]}
                image={workshop.image}
                imageAlt={workshop.imageAlt[locale]}
                tone={workshop.tone}
                cta={t.common.readMore}
              />
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="/" variant="outline">
            {workshopsPage.backLabel[locale]}
          </Button>
        </div>
      </Container>
    </section>
  );
}
