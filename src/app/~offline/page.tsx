import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return {
    title: t.common.offlineTitle,
    robots: { index: false, follow: false },
  };
}

export default async function OfflinePage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-content sm:text-4xl">
            {t.common.offlineTitle}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-content-muted">
            {t.common.offlineBody}
          </p>
          <div className="mt-8">
            <Button href="/program" size="lg">
              {t.hero.seeProgram}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
