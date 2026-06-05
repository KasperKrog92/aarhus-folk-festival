import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PracticalCard } from "@/components/ui/PracticalCard";
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
      className="scroll-mt-24 py-16 sm:py-20"
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
      </Container>
    </section>
  );
}
