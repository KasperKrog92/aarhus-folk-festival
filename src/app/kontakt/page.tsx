import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { EmailLink } from "@/components/ui/EmailLink";
import { IconMail } from "@/components/icons";
import { contactPage } from "@/data/contact";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return pageMetadata(
    {
      title: contactPage.title,
      description: contactPage.intro,
      href: contactPage.href,
    },
    locale,
  );
}

export default async function ContactPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            size="page"
            as="h1"
            eyebrow={contactPage.eyebrow[locale]}
            title={contactPage.title[locale]}
            intro={contactPage.intro[locale]}
          />

          <FolkStripe className="my-10" />

          <ul className="grid gap-4 sm:grid-cols-2">
            {contactPage.channels.map((channel) => (
              <li
                key={channel.id}
                className="flex flex-col rounded-2xl border border-petroleum/15 bg-surface-raised p-6 shadow-sm"
              >
                <span className="grid size-11 place-items-center rounded-full bg-petroleum/10 text-petroleum">
                  <IconMail className="size-5" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-pink-600">
                  {channel.label[locale]}
                </p>
                <EmailLink
                  email={channel.email}
                  className="mt-2 font-display text-xl font-semibold text-content"
                />
                <p className="mt-2 text-sm leading-relaxed text-content-soft">
                  {channel.description[locale]}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-petroleum/10 bg-surface p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-content-muted">
              {contactPage.noteHeading[locale]}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-content-soft">
              {contactPage.note[locale]}
            </p>
          </div>

          <div className="mt-8">
            <Button href="/" variant="outline">
              {t.common.backToHome}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
