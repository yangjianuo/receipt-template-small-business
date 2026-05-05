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
      title: "Receipt Template Generator for Small Business | Free Printable Receipt",
      description: "Create polished receipts.",
      pathname: "/",
    });

    expect(metadata.metadataBase?.toString()).toBe("https://receipts.example.com/");
    expect(metadata.alternates?.canonical).toBe("/");

    const sitemap = sitemapModule.default();

    expect(robotsModule.default()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://receipts.example.com/sitemap.xml",
      host: "https://receipts.example.com",
    });

    expect(sitemap).toEqual(
      expect.arrayContaining([
        {
          url: "https://receipts.example.com",
          lastModified: expect.any(Date),
          changeFrequency: "weekly",
          priority: 1,
        },
        {
          url: "https://receipts.example.com/rent-receipt-template",
          lastModified: expect.any(Date),
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: "https://receipts.example.com/cash-payment-receipt-template",
          lastModified: expect.any(Date),
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: "https://receipts.example.com/donation-receipt-template",
          lastModified: expect.any(Date),
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: "https://receipts.example.com/service-receipt-template",
          lastModified: expect.any(Date),
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: "https://receipts.example.com/payment-receipt-template",
          lastModified: expect.any(Date),
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: "https://receipts.example.com/editable-receipt-template",
          lastModified: expect.any(Date),
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: "https://receipts.example.com/printable-receipt-template",
          lastModified: expect.any(Date),
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: "https://receipts.example.com/sales-receipt-template",
          lastModified: expect.any(Date),
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: "https://receipts.example.com/blank-receipt-template",
          lastModified: expect.any(Date),
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: "https://receipts.example.com/itemized-receipt-template",
          lastModified: expect.any(Date),
          changeFrequency: "weekly",
          priority: 0.9,
        },
      ]),
    );
  });

  test("exposes homepage and long-tail landing page SEO configs", async () => {
    const { landingPages, receiptLandingPageSlugs } = await import("@/lib/landing-pages");

    expect(receiptLandingPageSlugs).toEqual([
      "rent-receipt-template",
      "cash-payment-receipt-template",
      "donation-receipt-template",
      "service-receipt-template",
      "payment-receipt-template",
      "editable-receipt-template",
      "printable-receipt-template",
      "sales-receipt-template",
      "blank-receipt-template",
      "itemized-receipt-template",
    ]);

    expect(landingPages.home.jumpLinks.map((item) => item.href)).toEqual([
      "#featured-template-links",
      "#editor",
      "#templates",
      "#receipt-fields",
      "#use-cases",
      "#faq",
    ]);
    expect(landingPages.home.structuredData.breadcrumb.itemListElement).toHaveLength(1);
    expect(landingPages.home.structuredData.faq.mainEntity).toHaveLength(5);

    expect(landingPages["rent-receipt-template"].metadata.pathname).toBe("/rent-receipt-template");
    expect(landingPages["cash-payment-receipt-template"].h1).toMatch(/cash payment receipt template/i);
    expect(landingPages["service-receipt-template"].faqHeading).toMatch(/service receipt/i);
    expect(landingPages["payment-receipt-template"].h1).toMatch(/payment receipt template/i);
    expect(landingPages["editable-receipt-template"].title).toMatch(/editable receipt template/i);
    expect(landingPages["printable-receipt-template"].ctaHeading).toMatch(/print/i);
    expect(landingPages["sales-receipt-template"].fieldsHeading).toMatch(/sales receipt/i);
    expect(landingPages["blank-receipt-template"].useCasesHeading).toMatch(/blank receipt/i);
    expect(landingPages["itemized-receipt-template"].faqHeading).toMatch(/itemized receipt/i);
    expect(landingPages.home.relatedPages).toHaveLength(10);
    expect(landingPages.home.relatedPages.map((item) => item.href)).toEqual(
      expect.arrayContaining([
        "/payment-receipt-template",
        "/editable-receipt-template",
        "/printable-receipt-template",
        "/rent-receipt-template",
        "/cash-payment-receipt-template",
        "/service-receipt-template",
        "/donation-receipt-template",
      ]),
    );
  });
});
