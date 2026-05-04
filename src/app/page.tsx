import type { Metadata } from "next";
import { ReceiptWorkflow } from "@/components/receipt-workflow";

export const metadata: Metadata = {
  title: "Free Receipt Template for Small Business | Editable & Printable",
  description:
    "Create a free receipt template for small business use. Choose a layout, edit business and customer details, update totals live, and print a polished receipt in minutes.",
};

export default function Home() {
  return <ReceiptWorkflow />;
}
