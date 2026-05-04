import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Receipt Template for Small Business | Editable & Printable",
  description:
    "Create a free receipt template for small business use. Choose a layout, edit business and customer details, update totals live, and print a polished receipt in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-stone-50 antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
