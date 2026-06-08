import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** Generates /manifest.webmanifest — install metadata for Add to Home Screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} ${site.year}`,
    short_name: "AFF",
    description: site.tagline.da,
    start_url: "/program",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#f4e8d8",
    theme_color: "#134e57",
    lang: "da",
    dir: "ltr",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
