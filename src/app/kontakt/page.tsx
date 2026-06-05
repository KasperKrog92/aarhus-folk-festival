import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { IconMail } from "@/components/icons";
import { contactPage } from "@/data/contact";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: contactPage.title[locale],
    description: contactPage.intro[locale],
    alternates: { canonical: contactPage.href },
  };
}

export default async function ContactPage() {
  const locale = await getLocale();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">
            {contactPage.eyebrow[locale]}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {contactPage.title[locale]}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {contactPage.intro[locale]}
          </p>

          <FolkStripe className="my-10" />

          <ul className="grid gap-4 sm:grid-cols-2">
            {contactPage.channels.map((channel) => (
              <li
                key={channel.id}
                className="flex flex-col rounded-2xl border border-petroleum/15 bg-cream-50 p-6 shadow-sm"
              >
                <span className="grid size-11 place-items-center rounded-full bg-petroleum/10 text-petroleum">
                  <IconMail className="size-5" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-pink-600">
                  {channel.label[locale]}
                </p>
                <a
                  href={`mailto:${channel.email}`}
                  className="mt-2 font-display text-xl font-semibold text-ink underline decoration-petroleum/30 underline-offset-4 transition-colors hover:text-rust hover:decoration-rust"
                >
                  {channel.email}
                </a>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {channel.description[locale]}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-petroleum/10 bg-cream p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
              {contactPage.noteHeading[locale]}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {contactPage.note[locale]}
            </p>
          </div>

          <div className="mt-8">
            <Button href="/" variant="outline">
              {contactPage.backLabel[locale]}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
