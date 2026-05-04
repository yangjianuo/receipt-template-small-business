import type { Metadata } from "next";

const DEFAULT_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

export function getSiteBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
  };
}

export function getSiteMetadata({
  title,
  description,
  pathname = "/",
}: {
  title: string;
  description: string;
  pathname?: string;
}): Metadata {
  return {
    ...getSiteBaseMetadata(),
    title,
    description,
    alternates: {
      canonical: pathname,
    },
  };
}
