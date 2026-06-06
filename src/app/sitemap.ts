import type { MetadataRoute } from "next";
import { artists, artistsPage } from "@/data/artists";
import { workshops, workshopsPage } from "@/data/workshops";
import { programPage } from "@/data/program";
import { associationPage } from "@/data/association";
import { contactPage } from "@/data/contact";
import { site } from "@/data/site";

/** Generates /sitemap.xml for the public routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}${programPage.href}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}${artistsPage.href}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...artists.map((artist) => ({
      url: `${site.url}${artistsPage.href}/${artist.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${site.url}${workshopsPage.href}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...workshops.map((workshop) => ({
      url: `${site.url}${workshopsPage.href}/${workshop.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${site.url}${associationPage.href}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}${contactPage.href}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
