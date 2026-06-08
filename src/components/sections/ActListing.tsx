import { FolkStripe } from "@/components/decorative/FolkStripe";
import { Button } from "@/components/ui/Button";
import { ActCard, type ActCardProps } from "@/components/ui/ActCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ActListingProps = {
  eyebrow: string;
  title: string;
  intro: string;
  cards: ActCardProps[];
  backLabel: string;
};

/**
 * Shared listing page body for public act collections such as artists and workshops.
 * Pages resolve their own locale-specific data, then pass card-ready props here.
 */
export function ActListing({
  eyebrow,
  title,
  intro,
  cards,
  backLabel,
}: ActListingProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          size="page"
          as="h1"
          className="max-w-2xl"
          eyebrow={eyebrow}
          title={title}
          intro={intro}
        />

        <FolkStripe className="my-10" />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <li key={card.href}>
              <ActCard {...card} />
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="/" variant="outline">
            {backLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
