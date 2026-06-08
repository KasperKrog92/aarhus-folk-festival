import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { EmailLink } from "@/components/ui/EmailLink";
import { associationPage } from "@/data/association";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return pageMetadata(
    {
      title: associationPage.title,
      description: associationPage.intro,
      href: associationPage.href,
    },
    locale,
  );
}

export default async function AssociationPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            size="page"
            as="h1"
            eyebrow={associationPage.eyebrow[locale]}
            title={associationPage.title[locale]}
            intro={associationPage.intro[locale]}
          />

          <FolkStripe className="my-10" />

          <div className="rounded-2xl border border-petroleum/15 bg-surface-raised p-6 shadow-sm sm:p-8">
            <p className="text-base leading-relaxed text-content-soft">
              {associationPage.body[locale]}
            </p>

            <h2 className="mt-8 font-display text-2xl font-semibold text-content">
              {associationPage.detailsHeading[locale]}
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {associationPage.details.map((item) => {
                const value =
                  typeof item.value === "string" ? item.value : item.value[locale];
                const isEmail = item.id === "email" && value.includes("@");

                return (
                  <li
                    key={item.id}
                    className="rounded-xl border border-petroleum/10 bg-surface p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pink-600">
                      {item.label[locale]}
                    </p>
                    {isEmail ? (
                      <EmailLink
                        email={value}
                        href={associationPage.contactHref}
                        className="mt-2 block font-sans text-base font-semibold leading-snug text-content sm:text-sm md:text-base"
                      />
                    ) : (
                      <p className="mt-2 font-display text-xl font-semibold text-content">
                        {value}
                      </p>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-content-soft">
                      {item.description[locale]}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={associationPage.contactHref}>
              {associationPage.contactCta[locale]}
            </Button>
            <Button href="/" variant="outline">
              {t.common.backToHome}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
