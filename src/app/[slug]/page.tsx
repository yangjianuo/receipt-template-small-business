import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReceiptWorkflow } from "@/components/receipt-workflow";
import {
  landingPages,
  receiptLandingPageSlugs,
  type ReceiptLandingPageKey,
} from "@/lib/landing-pages";
import { getSiteMetadata } from "@/lib/site";

type ReceiptLandingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return receiptLandingPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ReceiptLandingPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!receiptLandingPageSlugs.includes(slug as ReceiptLandingPageKey)) {
    return {};
  }

  const page = landingPages[slug as ReceiptLandingPageKey];

  return getSiteMetadata({
    title: page.title,
    description: page.description,
    pathname: page.pathname,
  });
}

export default async function ReceiptLandingPage({ params }: ReceiptLandingPageProps) {
  const { slug } = await params;

  if (!receiptLandingPageSlugs.includes(slug as ReceiptLandingPageKey)) {
    notFound();
  }

  const page = landingPages[slug as ReceiptLandingPageKey];

  return <ReceiptWorkflow page={page} />;
}
