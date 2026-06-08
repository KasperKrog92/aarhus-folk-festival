import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { cookiesPage } from "@/data/cookies";
import { getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return pageMetadata(
    {
      title: cookiesPage.eyebrow,
      description: cookiesPage.intro,
      href: cookiesPage.href,
    },
    locale,
  );
}

export default async function CookiesPage() {
  const locale = await getLocale();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            size="page"
            as="h1"
            eyebrow={cookiesPage.eyebrow[locale]}
            title={cookiesPage.title[locale]}
            intro={cookiesPage.intro[locale]}
          />

          <FolkStripe className="my-10" />

          <section
            aria-labelledby="why-no-cookie-banner"
            className="rounded-2xl border border-petroleum/10 bg-surface-raised p-6 shadow-sm sm:p-8"
          >
            <h2
              id="why-no-cookie-banner"
              className="font-display text-2xl font-semibold tracking-tight text-content"
            >
              {cookiesPage.whyNoBanner.heading[locale]}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-content-soft">
              {cookiesPage.whyNoBanner.body[locale]}
            </p>
          </section>

          <section aria-labelledby="browser-storage" className="mt-12">
            <div className="max-w-2xl">
              <h2
                id="browser-storage"
                className="font-display text-2xl font-semibold tracking-tight text-content"
              >
                {cookiesPage.storageHeading[locale]}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-content-soft">
                {cookiesPage.storageIntro[locale]}
              </p>
            </div>

            <ul className="mt-6 grid gap-4">
              {cookiesPage.storage.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-line/[0.08] bg-surface-raised p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-content">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-pink-600">
                        {item.type[locale]}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-content-soft sm:max-w-md sm:text-right">
                      {item.purpose[locale]}
                    </p>
                  </div>

                  <dl className="mt-5 grid gap-4 border-t border-line/[0.08] pt-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-content-muted">
                        {cookiesPage.labels.setWhen[locale]}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-content-soft">
                        {item.setWhen[locale]}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-content-muted">
                        {cookiesPage.labels.duration[locale]}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-content-soft">
                        {item.duration[locale]}
                      </dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="remove-browser-storage"
            className="mt-8 rounded-2xl border border-petroleum/10 bg-surface p-6"
          >
            <h2
              id="remove-browser-storage"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-content-muted"
            >
              {cookiesPage.control.heading[locale]}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-content-soft">
              {cookiesPage.control.body[locale]}
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
