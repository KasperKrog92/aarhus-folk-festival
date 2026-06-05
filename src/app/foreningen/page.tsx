import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { associationPage } from "@/data/association";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: associationPage.title[locale],
    description: associationPage.intro[locale],
    alternates: { canonical: associationPage.href },
  };
}

export default async function AssociationPage() {
  const locale = await getLocale();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">
            {associationPage.eyebrow[locale]}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {associationPage.title[locale]}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {associationPage.intro[locale]}
          </p>

          <FolkStripe className="my-10" />

          <div className="rounded-2xl border border-petroleum/15 bg-cream-50 p-6 shadow-sm sm:p-8">
            <p className="text-base leading-relaxed text-ink-soft">
              {associationPage.body[locale]}
            </p>

            <h2 className="mt-8 font-display text-2xl font-semibold text-ink">
              {associationPage.detailsHeading[locale]}
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {associationPage.details.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl border border-petroleum/10 bg-cream p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pink-600">
                    {item.label[locale]}
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold text-ink">
                    {typeof item.value === "string"
                      ? item.value
                      : item.value[locale]}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.description[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={associationPage.contactHref}>
              {associationPage.contactCta[locale]}
            </Button>
            <Button href="/" variant="outline">
              {associationPage.backLabel[locale]}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
