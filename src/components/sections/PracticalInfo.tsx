import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PracticalCard } from "@/components/ui/PracticalCard";
import { practicalItems } from "@/data/practical";

export function PracticalInfo() {
  return (
    <section
      id="praktisk"
      aria-labelledby="praktisk-overskrift"
      className="scroll-mt-24 py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          as="h2"
          eyebrow="Praktisk info"
          title="Planlæg din festival"
          intro="Alt det praktiske, så du kan bruge kræfterne på musikken. Her er det vigtigste at have styr på, før du tager til Aarhus."
        />

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {practicalItems.map((item) => (
            <li key={item.id}>
              <PracticalCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
