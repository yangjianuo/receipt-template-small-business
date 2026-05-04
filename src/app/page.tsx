import type { Metadata } from "next";
import { ReceiptWorkflow } from "@/components/receipt-workflow";
import { landingPages } from "@/lib/landing-pages";
import { getSiteMetadata } from "@/lib/site";

const page = landingPages.home;

export const metadata: Metadata = getSiteMetadata({
  title: page.title,
  description: page.description,
  pathname: page.pathname,
});

export default function Home() {
  return <ReceiptWorkflow page={page} />;
}
