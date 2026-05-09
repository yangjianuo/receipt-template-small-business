import type { Metadata } from "next";
import "./globals.css";
import { getSiteBaseMetadata } from "@/lib/site";

export const metadata: Metadata = getSiteBaseMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-stone-50 antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
