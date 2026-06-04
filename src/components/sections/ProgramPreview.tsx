import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { EventCard } from "@/components/ui/EventCard";
import { IconArrowRight } from "@/components/icons";
import { programDay, todaysEvents } from "@/data/events";

export function ProgramPreview() {
  return (
    <section
      id="program"
      aria-labelledby="program-overskrift"
      className="scroll-mt-24 py-16 sm:py-20"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
              I dag på festivalen
            </span>
            <h2
              id="program-overskrift"
              className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            >
              {programDay.weekday}{" "}
              <span className="text-petroleum">{programDay.date}</span>
            </h2>
          </div>

          <Link
            href="#program"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-petroleum transition-colors hover:text-rust"
          >
            Se hele programmet
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {todaysEvents.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
