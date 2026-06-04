import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FolkBorder } from "@/components/decorative/FolkBorder";
import {
  IconFacebook,
  IconInstagram,
  IconYoutube,
} from "@/components/icons";
import { footerNav, mainNav } from "@/data/navigation";
import { site } from "@/data/site";

const socials = [
  { label: "Facebook", href: "#", Icon: IconFacebook },
  { label: "Instagram", href: "#", Icon: IconInstagram },
  { label: "YouTube", href: "#", Icon: IconYoutube },
];

export function Footer() {
  return (
    <footer id="kontakt" className="bg-petroleum text-cream-100">
      <FolkBorder flip className="bg-cream text-petroleum" />

      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold text-cream-50">
              Aarhus Folk Festival
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream-100/80">
              {site.dates}. Fire dage med folkemusik, dans og fællesskab
              midt i Aarhus — for nysgerrige sjæle i alle aldre.
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

          {/* Explore */}
          <nav aria-label="Sektioner">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-200">
              Udforsk
            </h2>
            <ul className="mt-4 space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-100/85 transition-colors hover:text-cream-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Festival info */}
          <nav aria-label="Festival">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-200">
              Festival
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-100/85 transition-colors hover:text-cream-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream-100/15 pt-6 text-xs text-cream-100/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.year} {site.name}. Et frivilligdrevet kulturmøde i Aarhus.
          </p>
          <p>{site.edition} · {site.dates}</p>
        </div>
      </Container>
    </footer>
  );
}
