import type { MetadataRoute } from "next";
import { receiptLandingPageSlugs, landingPages } from "@/lib/landing-pages";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...receiptLandingPageSlugs.map((slug) => ({
      url: `${siteUrl}${landingPages[slug].pathname}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
