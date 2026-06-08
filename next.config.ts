import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const revision =
  spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout?.trim() ||
  randomUUID();

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  additionalPrecacheEntries: [{ url: "/~offline", revision }],
  disable: process.env.NODE_ENV === "development",
  register: true,
  reloadOnOnline: true,
});

/**
 * Hosts that should never be indexed. The site is currently served from the
 * temporary `folk.gamestormers.dk` origin and will later move to the real
 * domain; keeping the staging host out of the index avoids duplicate-content
 * and migration headaches. Crawling stays *allowed* in `robots.ts` on purpose —
 * a crawler must be able to fetch the page to see this `noindex` header (a
 * `Disallow` would hide the header and could still surface a URL-only result).
 * Remove a host here once it becomes the canonical, indexable origin.
 */
const noindexHosts = ["folk.gamestormers.dk"];

const nextConfig: NextConfig = {
  async headers() {
    return noindexHosts.map((host) => ({
      // Apply to every route on the staging host.
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }));
  },
};

export default withSerwist(nextConfig);
