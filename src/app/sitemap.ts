import type { MetadataRoute } from "next";
import { associationPage } from "@/data/association";
import { contactPage } from "@/data/contact";
import { site } from "@/data/site";

/** Generates /sitemap.xml for the three public routes. */
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
