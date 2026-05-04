import type { Metadata } from "next";

const templates = [
  {
    name: "Classic Receipt",
    scenario: "Retail shop",
    tag: "Best for printing",
    desc: "A familiar receipt layout for stores, pop-up shops, and everyday counter sales.",
  },
  {
    name: "Service Receipt",
    scenario: "Home or local service",
    tag: "Clear line items",
    desc: "Built for repair jobs, cleaning services, salons, and appointment-based businesses.",
  },
  {
    name: "Simple Invoice-Style",
    scenario: "Freelancer or studio",
    tag: "Polished and professional",
    desc: "A clean format for consultants, creatives, and small teams who want a more formal look.",
  },
];

const fields = [
  "Business name and contact details",
  "Receipt number and issue date",
  "Customer name or walk-in label",
  "Products or services provided",
  "Subtotal, taxes, and final total",
  "Payment method and notes",
];

const steps = [
  {
    title: "Choose a receipt style",
    desc: "Start with a layout that matches how your small business sells, serves, or invoices customers.",
  },
  {
    title: "Edit your receipt details",
    desc: "Fill in the business info, items, totals, and payment details you need on every receipt.",
  },
  {
    title: "Print or save in minutes",
    desc: "Use the finished receipt as a professional record you can print, share, or keep for bookkeeping.",
  },
];

const useCases = [
  "Retail stores issuing quick in-person purchase receipts",
  "Freelancers sending simple proof of payment after a job",
  "Home service businesses documenting cash or card payments",
  "Studios, salons, and local shops that need a clean printable receipt",
];

const faqs = [
  {
    question: "Is this receipt template really free?",
    answer:
      "Yes. This landing page focuses on free receipt template options for small businesses that want a fast, professional starting point.",
  },
  {
    question: "Can I edit the receipt fields?",
    answer:
      "Yes. The template direction is built around editable fields such as business details, customer information, items, totals, and payment method.",
  },
  {
    question: "Can I print the receipt after filling it out?",
    answer:
      "Yes. The layouts are designed to be printable and easy to use as a clean customer-facing receipt.",
  },
  {
    question: "Who is this receipt template for?",
    answer:
      "It is designed for small businesses, freelancers, local service providers, retail shops, and other owners who need a simple professional receipt.",
  },
];

export const metadata: Metadata = {
  title: "Free Receipt Template for Small Business | Editable & Printable",
  description:
    "Use a free receipt template for small business needs. Choose a professional layout, edit key fields, and print or export a polished receipt in minutes.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-900">
              Printable · Editable · Small business-ready
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Free Receipt Template for Small Business
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-600">
                Create a professional receipt in minutes with a free template built for small business
                owners, freelancers, and local service providers. Choose a layout, customize the
                details, and print with confidence.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#templates"
                className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                Start with a Template
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-900 transition hover:border-stone-400 hover:bg-stone-100"
              >
                See How It Works
              </a>
            </div>
            <ul className="grid gap-3 pt-2 text-sm text-stone-600 sm:grid-cols-3">
              <li className="rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
                Professional layout
              </li>
              <li className="rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
                Editable fields
              </li>
              <li className="rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
                Print-ready format
              </li>
            </ul>
          </div>

          <div
            id="preview"
            className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_-40px_rgba(28,25,23,0.45)]"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500">
                  Receipt preview
                </p>
                <p className="mt-2 text-2xl font-semibold">Classic Receipt</p>
              </div>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                Ready to print
              </span>
            </div>

            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-5">
              <div className="mb-5 flex items-start justify-between gap-4 border-b border-dashed border-stone-300 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Oak & Pine Market</p>
                  <p className="mt-2 text-2xl font-semibold">Small Business Receipt</p>
                  <p className="mt-1 text-sm text-stone-500">123 Market Street · (555) 014-2201</p>
                </div>
                <div className="text-right text-sm text-stone-500">
                  <p># 10021</p>
                  <p>2026-05-04</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-stone-700">
                <div className="flex justify-between gap-4">
                  <span>Customer</span>
                  <span className="font-medium text-stone-900">Walk-in client</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Item</span>
                  <span className="font-medium text-stone-900">2 × Packaging supplies</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Payment</span>
                  <span className="font-medium text-stone-900">Card</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Notes</span>
                  <span className="font-medium text-stone-900">Paid in full</span>
                </div>
                <div className="mt-5 space-y-2 border-t border-stone-200 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$54.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$6.00</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-stone-900">
                    <span>Total</span>
                    <span>$60.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="templates" className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold sm:text-3xl">Choose a receipt template</h2>
            <p className="max-w-3xl text-stone-600">
              Pick a template direction based on how your business works, then customize the key
              details you need on every receipt.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {templates.map((template, index) => (
              <article
                key={template.name}
                className={`rounded-3xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  index === 0
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-200 bg-white text-stone-900"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <p
                    className={`text-xs uppercase tracking-[0.22em] ${
                      index === 0 ? "text-stone-300" : "text-stone-500"
                    }`}
                  >
                    {template.scenario}
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      index === 0
                        ? "bg-white/10 text-white"
                        : "bg-stone-100 text-stone-700"
                    }`}
                  >
                    {template.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{template.name}</h3>
                <p
                  className={`mt-3 text-sm leading-7 ${
                    index === 0 ? "text-stone-300" : "text-stone-600"
                  }`}
                >
                  {template.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Edit the fields that matter</h2>
            <p className="mt-3 text-stone-600">
              This receipt template is designed to cover the information small businesses usually
              need for clean records, customer proof of payment, and simple bookkeeping.
            </p>
          </div>
          <div>
            <ul className="grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
              {fields.map((field) => (
                <li key={field} className="rounded-2xl bg-stone-50 px-4 py-3">
                  {field}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="how-it-works" className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold sm:text-3xl">How it works</h2>
            <p className="max-w-3xl text-stone-600">
              A simple path from blank template to a professional small business receipt.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{step.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold sm:text-3xl">Built for everyday small business use</h2>
            <p className="text-stone-600">
              Whether you run a local shop or a solo service business, a clear receipt helps you look
              professional and stay organized.
            </p>
          </div>
          <ul className="grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
            {useCases.map((item) => (
              <li key={item} className="rounded-2xl border border-stone-200 bg-white px-4 py-4 shadow-sm">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold sm:text-3xl">Frequently asked questions</h2>
            <p className="max-w-3xl text-stone-600">
              Common questions about using a free editable and printable receipt template.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] bg-stone-900 px-6 py-10 text-white shadow-[0_24px_80px_-40px_rgba(28,25,23,0.75)] sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-stone-300">
                Ready to create your receipt?
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Start with a free receipt template for your small business.
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-300 sm:text-base">
                Choose a professional layout, edit the important details, and prepare a printable
                receipt in just a few minutes.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#templates"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-900 transition hover:bg-stone-200"
              >
                Start with a Template
              </a>
              <a
                href="#preview"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Preview the Receipt
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
