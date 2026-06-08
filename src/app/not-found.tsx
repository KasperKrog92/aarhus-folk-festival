import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

/**
 * Branded 404 for unmatched routes and `notFound()` calls. Next serves this
 * with a real HTTP 404 status (no soft-200); `noindex` is belt-and-braces so a
 * stray crawl never indexes it.
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return {
    title: t.common.notFoundTitle,
    robots: { index: false, follow: false },
  };
}

export default async function NotFound() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="font-display text-5xl font-semibold text-pink-600 sm:text-6xl">
            404
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-content sm:text-4xl">
            {t.common.notFoundTitle}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-content-muted">
            {t.common.notFoundBody}
          </p>
          <div className="mt-8">
            <Button href="/" size="lg">
              {t.common.backToHome}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
