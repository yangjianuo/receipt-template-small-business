import { afterEach, describe, expect, test } from "vitest";

const ORIGINAL_ENV = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (ORIGINAL_ENV === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    return;
  }

  process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_ENV;
});

describe("site URL SEO helpers", () => {
  test("uses the configured site URL and removes a trailing slash", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://receipts.example.com/";

    const { getSiteUrl } = await import("@/lib/site");

    expect(getSiteUrl()).toBe("https://receipts.example.com");
  });

  test("falls back to localhost when no site URL is configured", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    const { getSiteUrl } = await import("@/lib/site");

    expect(getSiteUrl()).toBe("http://localhost:3000");
  });

  test("builds canonical metadata and sitemap links from the site URL", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://receipts.example.com";

    const [{ getSiteMetadata }, robotsModule, sitemapModule] = await Promise.all([
      import("@/lib/site"),
      import("@/app/robots"),
      import("@/app/sitemap"),
    ]);

    const metadata = getSiteMetadata({
      title: "Free Receipt Template for Small Business | Editable & Printable",
      description: "Create polished receipts.",
      pathname: "/",
    });

    expect(metadata.metadataBase?.toString()).toBe("https://receipts.example.com/");
    expect(metadata.alternates?.canonical).toBe("/");

    expect(robotsModule.default()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://receipts.example.com/sitemap.xml",
      host: "https://receipts.example.com",
    });

    expect(sitemapModule.default()).toEqual([
      {
        url: "https://receipts.example.com",
        lastModified: expect.any(Date),
        changeFrequency: "weekly",
        priority: 1,
      },
    ]);
  });
});
