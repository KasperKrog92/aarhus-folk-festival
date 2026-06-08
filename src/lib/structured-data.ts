/**
 * Schema.org JSON-LD builders. Each function returns a plain object derived from
 * the static content in `src/data/` — never duplicated data — that a server
 * component ({@link "@/components/seo/JsonLd"}) serialises into a
 * `<script type="application/ld+json">`. No client JS.
 *
 * Stable `@id`s (`{site.url}/#organization`, `/#website`, `/#festival`) let the
 * graphs reference each other so search engines treat them as one entity set.
 * Structural values (dates, URLs) stay plain; copy follows the served locale.
 */
import { site } from "@/data/site";
import { festivalDays } from "@/data/program";
import type { ActDetailShow } from "@/data/program";
import type { Locale } from "@/i18n/config";
import { showDateTimeIso } from "@/lib/calendar";

const ORGANIZATION_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;
const FESTIVAL_ID = `${site.url}/#festival`;

const EVENT_SCHEDULED = "https://schema.org/EventScheduled";
const OFFLINE_ATTENDANCE = "https://schema.org/OfflineEventAttendanceMode";
const IN_STOCK = "https://schema.org/InStock";

function langTag(locale: Locale) {
  return locale === "da" ? "da-DK" : "en-DK";
}

/** City-level place. Upgraded to a full address once venue data is confirmed. */
function cityPlace(name: string = site.city) {
  return {
    "@type": "Place",
    name,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "DK",
    },
  };
}

/** A ticket `Offer`. No `price` until pricing is confirmed (never fabricated). */
function ticketOffer(locale: Locale) {
  return {
    "@type": "Offer",
    url: site.ticketUrl[locale],
    availability: IN_STOCK,
    priceCurrency: "DKK",
  };
}

/**
 * The sitewide identity graph (`Organization` + `WebSite`), rendered once in the
 * root layout. `sameAs` points at the official social profiles in `site.ts`.
 */
export function siteIdentitySchema(locale: Locale) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: site.name,
      url: site.url,
      logo: `${site.url}/logos/logo.png`,
      sameAs: [site.social.facebook, site.social.instagram],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: site.name,
      url: site.url,
      inLanguage: langTag(locale),
      publisher: { "@id": ORGANIZATION_ID },
    },
  ];
}

/**
 * The festival itself as a single `Festival` event, rendered on the homepage.
 * Per-performance `MusicEvent`s live on the act detail pages and point back here
 * via `superEvent`, so the homepage stays the festival overview without
 * duplicating every show.
 */
export function festivalSchema(locale: Locale) {
  const start = festivalDays[0]?.dateIso;
  const end = festivalDays[festivalDays.length - 1]?.dateIso;

  return {
    "@context": "https://schema.org",
    "@type": "Festival",
    "@id": FESTIVAL_ID,
    name: `${site.name} ${site.year}`,
    startDate: start,
    endDate: end,
    eventStatus: EVENT_SCHEDULED,
    eventAttendanceMode: OFFLINE_ATTENDANCE,
    location: cityPlace(),
    image: `${site.url}/images/opengraph.png`,
    description: site.intro[locale],
    organizer: { "@id": ORGANIZATION_ID },
    offers: ticketOffer(locale),
  };
}

/**
 * One event per `show` for an act detail page (acts can play more than once).
 * Artists are `MusicEvent` with a `MusicGroup` performer; workshops are plain
 * `Event`. All point back to the festival via `superEvent`.
 */
export function actEventsSchema({
  type,
  performerType,
  name,
  description,
  image,
  href,
  shows,
  locale,
}: {
  type: "MusicEvent" | "Event";
  performerType?: "MusicGroup" | "Person";
  name: string;
  description: string;
  image?: string;
  /** The act's canonical detail path (e.g. "/kunstnere/tumult"). */
  href: string;
  shows: ActDetailShow[];
  locale: Locale;
}) {
  const url = `${site.url}${href}`;

  return shows.map((show) => {
    const { start, end } = showDateTimeIso(
      show.dateIso,
      show.time,
      show.durationMinutes,
    );

    return {
      "@context": "https://schema.org",
      "@type": type,
      name,
      description,
      url,
      startDate: start,
      endDate: end,
      eventStatus: EVENT_SCHEDULED,
      eventAttendanceMode: OFFLINE_ATTENDANCE,
      location: cityPlace(show.venue),
      ...(image ? { image: `${site.url}${image}` } : {}),
      ...(performerType
        ? { performer: { "@type": performerType, name } }
        : {}),
      organizer: { "@id": ORGANIZATION_ID },
      superEvent: { "@id": FESTIVAL_ID },
      offers: ticketOffer(locale),
    };
  });
}

/**
 * A `BreadcrumbList` mirroring a detail page's visual breadcrumb trail. The
 * final (current-page) item omits its URL, per Google's guidance.
 */
export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
