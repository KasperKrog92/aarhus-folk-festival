import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PracticalCard } from "@/components/ui/PracticalCard";
import { Button } from "@/components/ui/Button";
import { IconHeart } from "@/components/icons";
import { associationPage } from "@/data/association";
import { practicalItems } from "@/data/practical";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export async function PracticalInfo() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section
      id="praktisk"
      aria-labelledby="praktisk-overskrift"
      className="py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          as="h2"
          eyebrow={t.practical.eyebrow}
          title={t.practical.title}
          intro={t.practical.intro}
        />

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {practicalItems.map((item) => (
            <li key={item.id}>
              <PracticalCard item={item} locale={locale} />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-5 rounded-2xl bg-petroleum p-6 text-cream-50 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-cream-50/10 text-pink-200">
              <IconHeart className="size-6" />
            </span>
            <div>
              <h3 className="font-display text-2xl font-semibold leading-tight">
                {associationPage.title[locale]}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cream-100/80">
                {associationPage.teaser[locale]}
              </p>
            </div>
          </div>
          <Button
            href={associationPage.href}
            variant="solidLight"
            className="shrink-0"
          >
            {associationPage.teaserCta[locale]}
          </Button>
        </div>
      </Container>
    </section>
  );
}
