import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgramSchedule } from "@/components/sections/ProgramSchedule";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { getProgramByDay, programPage } from "@/data/program";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return pageMetadata(
    {
      title: programPage.title,
      description: programPage.intro,
      href: programPage.href,
    },
    locale,
  );
}

export default async function ProgramPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const days = getProgramByDay();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          size="page"
          as="h1"
          className="max-w-2xl"
          eyebrow={programPage.eyebrow[locale]}
          title={programPage.title[locale]}
          intro={programPage.intro[locale]}
        />

        <FolkStripe className="my-10" />

        <ProgramSchedule days={days} locale={locale} />

        <div className="mt-12">
          <Button href="/" variant="outline">
            {t.common.backToHome}
          </Button>
        </div>
      </Container>
    </section>
  );
}
