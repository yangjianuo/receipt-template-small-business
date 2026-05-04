import type { Metadata } from "next";
import { ReceiptWorkflow } from "@/components/receipt-workflow";
import { getSiteMetadata } from "@/lib/site";

export const metadata: Metadata = getSiteMetadata({
  title: "Free Receipt Template for Small Business | Printable & Editable",
  description:
    "Edit a free receipt template for small business use. Choose a printable layout for retail shops, freelancers, and service businesses, update totals live, and print in minutes.",
  pathname: "/",
});

export default function Home() {
  return <ReceiptWorkflow />;
}
