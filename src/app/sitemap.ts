import type { MetadataRoute } from "next";
import { artists, artistsPage } from "@/data/artists";
import { workshops, workshopsPage } from "@/data/workshops";
import { programPage } from "@/data/program";
import { aboutPage } from "@/data/about";
import { associationPage } from "@/data/association";
import { contactPage } from "@/data/contact";
import { cookiesPage } from "@/data/cookies";
import { site } from "@/data/site";

/**
 * Generates /sitemap.xml for the public routes.
 *
 * `lastModified` is intentionally omitted: content has no edit timestamp, and
 * stamping every route with the build time (the old behaviour) made the field
 * meaningless — all equal, changing on every deploy — which is a worse signal
 * than none. `changeFrequency`/`priority` still convey intent. Add a real
 * per-route `lastModified` if/when content gains an edited-on date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}${programPage.href}`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}${artistsPage.href}`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...artists.map((artist) => ({
      url: `${site.url}${artistsPage.href}/${artist.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${site.url}${workshopsPage.href}`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...workshops.map((workshop) => ({
      url: `${site.url}${workshopsPage.href}/${workshop.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${site.url}${aboutPage.href}`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}${associationPage.href}`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}${contactPage.href}`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.url}${cookiesPage.href}`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
