import type { Metadata } from "next";
import { ReceiptWorkflow } from "@/components/receipt-workflow";

export const metadata: Metadata = {
  title: "Free Receipt Template for Small Business | Printable & Editable",
  description:
    "Edit a free receipt template for small business use. Choose a printable layout for retail shops, freelancers, and service businesses, update totals live, and print in minutes.",
};

export default function Home() {
  return <ReceiptWorkflow />;
}
