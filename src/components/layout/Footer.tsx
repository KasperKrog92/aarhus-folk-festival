import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FolkBorder } from "@/components/decorative/FolkBorder";
import { IconFacebook, IconInstagram } from "@/components/icons";
import { footerNav, mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/aarhusfolkfestival",
    Icon: IconFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/aarhusfolkfestival/",
    Icon: IconInstagram,
  },
];

export async function Footer() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <footer id="kontakt" className="bg-petroleum text-cream-100">
      <FolkBorder flip className="bg-cream text-petroleum" />

      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold text-cream-50">
              {site.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream-100/80">
              {site.dates[locale]}. {t.footer.blurb}
            </p>

            <div className="mt-6 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-cream-100/25 text-cream-100 transition-colors hover:border-pink-200 hover:bg-white/5 hover:text-pink-200"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link lists: side by side on mobile, individual columns from md up */}
          <div className="grid grid-cols-2 gap-8 md:contents">
          {/* Explore */}
          <nav aria-label={t.footer.exploreAria}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-200">
              {t.footer.exploreHeading}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-100/85 transition-colors hover:text-cream-50"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Festival info */}
          <nav aria-label={t.footer.festivalAria}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-200">
              {t.footer.festivalHeading}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-100/85 transition-colors hover:text-cream-50"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream-100/15 pt-6 text-xs text-cream-100/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.year} {site.name}. {t.footer.copyright}
          </p>
          <p>
            {site.edition[locale]} · {site.dates[locale]}
          </p>
        </div>
      </Container>
    </footer>
  );
}
