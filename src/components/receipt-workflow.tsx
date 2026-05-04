"use client";

import { useMemo, useState } from "react";
import {
  calculateReceiptTotals,
  defaultReceiptData,
  formatMoney,
  receiptTemplates,
  type ReceiptFormData,
  type ReceiptItem,
  type ReceiptTemplateId,
} from "@/lib/receipt";

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
    desc: "Review the live preview, then print the finished receipt for your records or customer handoff.",
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
      "Yes. You can use the editor on this page to fill out a receipt, switch templates, and print a clean copy for free.",
  },
  {
    question: "Can I edit the receipt fields?",
    answer:
      "Yes. You can change business details, customer information, line items, payment method, notes, and tax rate in the form.",
  },
  {
    question: "Can I print the receipt after filling it out?",
    answer:
      "Yes. The receipt preview updates live and the print action opens your browser print dialog for a paper-ready layout.",
  },
  {
    question: "Who is this receipt template for?",
    answer:
      "It is designed for small businesses, freelancers, local service providers, retail shops, and other owners who need a simple professional receipt.",
  },
];

export function ReceiptWorkflow() {
  const [formData, setFormData] = useState<ReceiptFormData>(defaultReceiptData);

  const activeTemplate =
    receiptTemplates.find((template) => template.id === formData.templateId) ?? receiptTemplates[0];

  const totals = useMemo(
    () => calculateReceiptTotals({ items: formData.items, taxRate: formData.taxRate }),
    [formData.items, formData.taxRate],
  );

  function updateField<Key extends keyof ReceiptFormData>(key: Key, value: ReceiptFormData[Key]) {
    setFormData((current) => ({ ...current, [key]: value }));
  }

  function updateTemplate(templateId: ReceiptTemplateId) {
    updateField("templateId", templateId);
  }

  function updateItem(itemId: string, key: keyof ReceiptItem, value: string) {
    setFormData((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              [key]: key === "description" ? value : Number(value) || 0,
            }
          : item,
      ),
    }));
  }

  function addItem() {
    setFormData((current) => ({
      ...current,
      items: [
        ...current.items,
        {
          id: `item-${current.items.length + 1}`,
          description: "",
          quantity: 1,
          unitPrice: 0,
        },
      ],
    }));
  }

  function removeItem(itemId: string) {
    setFormData((current) => {
      if (current.items.length === 1) {
        return current;
      }

      return {
        ...current,
        items: current.items.filter((item) => item.id !== itemId),
      };
    });
  }

  function handlePrint() {
    window.print();
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_30%),linear-gradient(180deg,#f8f7f4_0%,#f1eee7_100%)] text-stone-900 print:bg-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-16 lg:px-10 lg:py-20 print:max-w-none print:px-0 print:py-0">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start print:block">
          <div className="space-y-6 print:hidden">
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-900">
              Editable receipt workflow · Live preview · Print-ready
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Free Receipt Template for Small Business
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-600">
                Build a polished receipt in minutes. Pick a template, edit the business and customer
                details, adjust line items, and print a professional record without leaving the page.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#editor"
                className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                Start Editing
              </a>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-900 transition hover:border-stone-400 hover:bg-stone-100"
              >
                Print Receipt
              </button>
            </div>
            <ul className="grid gap-3 pt-2 text-sm text-stone-600 sm:grid-cols-3">
              <li className="rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm">3 template styles</li>
              <li className="rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm">Editable totals</li>
              <li className="rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm">Clean print layout</li>
            </ul>
          </div>

          <div className="rounded-[32px] border border-stone-200 bg-white/90 p-5 shadow-[0_24px_80px_-40px_rgba(28,25,23,0.45)] backdrop-blur print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none">
            <div className="mb-5 flex items-center justify-between gap-4 print:hidden">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500">
                  Live receipt preview
                </p>
                <p className="mt-2 text-2xl font-semibold">{activeTemplate.name}</p>
              </div>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                Ready to print
              </span>
            </div>

            <div className="overflow-hidden rounded-[26px] border border-stone-200 bg-white print:rounded-none print:border-0">
              <div className={`bg-gradient-to-r ${activeTemplate.accent} px-6 py-5 text-white`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/70">{formData.businessName}</p>
                    <p className="mt-2 text-3xl font-semibold">{activeTemplate.previewLabel}</p>
                    <p className="mt-1 text-sm text-white/75">{formData.businessContact}</p>
                  </div>
                  <div className="text-right text-sm text-white/80">
                    <p>#{formData.receiptNumber || "—"}</p>
                    <p>{formData.issueDate || "—"}</p>
                  </div>
                </div>
              </div>

              <div id="preview" className="space-y-5 px-6 py-6 text-sm text-stone-700 print:px-8 print:py-8">
                <div className="grid gap-3 rounded-3xl bg-stone-50 p-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Customer</p>
                    <p className="mt-2 font-medium text-stone-900">{formData.customerName || "Walk-in client"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Payment</p>
                    <p className="mt-2 font-medium text-stone-900">{formData.paymentMethod || "Card"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Notes</p>
                    <p className="mt-2 font-medium text-stone-900">{formData.notes || "Paid in full"}</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-stone-200">
                  <div className="grid grid-cols-[1.5fr_0.5fr_0.7fr_0.8fr] gap-3 bg-stone-100 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                    <span>Item</span>
                    <span>Qty</span>
                    <span>Unit</span>
                    <span className="text-right">Amount</span>
                  </div>
                  <div className="divide-y divide-stone-200">
                    {formData.items.map((item) => {
                      const amount = item.quantity * item.unitPrice;
                      return (
                        <div key={item.id} className="grid grid-cols-[1.5fr_0.5fr_0.7fr_0.8fr] gap-3 px-4 py-3">
                          <span className="font-medium text-stone-900">{item.description || "Custom item"}</span>
                          <span>{item.quantity}</span>
                          <span>{formatMoney(item.unitPrice)}</span>
                          <span className="text-right font-medium text-stone-900">{formatMoney(amount)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="ml-auto max-w-sm space-y-2 rounded-3xl bg-stone-50 p-4">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>{formatMoney(totals.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax ({formData.taxRate}%)</span>
                    <span>{formatMoney(totals.tax)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-stone-200 pt-3 text-base font-semibold text-stone-900">
                    <span>Total</span>
                    <span>{formatMoney(totals.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="templates" className="space-y-5 print:hidden">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold sm:text-3xl">Choose a receipt template</h2>
            <p className="max-w-3xl text-stone-600">
              Start with the layout that best fits how your small business sells, serves, or invoices.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {receiptTemplates.map((template) => {
              const active = formData.templateId === template.id;
              return (
                <label
                  key={template.id}
                  className={`block cursor-pointer rounded-3xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                    active ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 bg-white text-stone-900"
                  }`}
                >
                  <input
                    type="radio"
                    name="template"
                    value={template.id}
                    checked={active}
                    onChange={() => updateTemplate(template.id)}
                    className="sr-only"
                    aria-label={template.name}
                  />
                  <div className="flex items-center justify-between gap-4">
                    <p className={`text-xs uppercase tracking-[0.22em] ${active ? "text-stone-300" : "text-stone-500"}`}>
                      {template.scenario}
                    </p>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${active ? "bg-white/10 text-white" : "bg-stone-100 text-stone-700"}`}>
                      {template.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{template.name}</h3>
                  <p className={`mt-3 text-sm leading-7 ${active ? "text-stone-300" : "text-stone-600"}`}>
                    {template.desc}
                  </p>
                </label>
              );
            })}
          </div>
        </section>

        <section id="editor" className="grid gap-6 rounded-[32px] border border-stone-200 bg-white/95 p-6 shadow-sm lg:grid-cols-[1.05fr_0.95fr] print:hidden">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Edit your receipt</h2>
              <p className="mt-3 max-w-2xl text-stone-600">
                Fill in the fields that matter, tweak your totals, and keep the preview in sync as you type.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business name">
                <input
                  value={formData.businessName}
                  onChange={(event) => updateField("businessName", event.target.value)}
                  className={inputClassName}
                  placeholder="Oak & Pine Market"
                />
              </Field>
              <Field label="Receipt number">
                <input
                  value={formData.receiptNumber}
                  onChange={(event) => updateField("receiptNumber", event.target.value)}
                  className={inputClassName}
                  placeholder="10021"
                />
              </Field>
              <Field label="Business contact" className="sm:col-span-2">
                <input
                  value={formData.businessContact}
                  onChange={(event) => updateField("businessContact", event.target.value)}
                  className={inputClassName}
                  placeholder="123 Market Street · (555) 014-2201"
                />
              </Field>
              <Field label="Customer name">
                <input
                  value={formData.customerName}
                  onChange={(event) => updateField("customerName", event.target.value)}
                  className={inputClassName}
                  placeholder="Walk-in client"
                />
              </Field>
              <Field label="Issue date">
                <input
                  type="date"
                  value={formData.issueDate}
                  onChange={(event) => updateField("issueDate", event.target.value)}
                  className={inputClassName}
                />
              </Field>
              <Field label="Payment method">
                <input
                  value={formData.paymentMethod}
                  onChange={(event) => updateField("paymentMethod", event.target.value)}
                  className={inputClassName}
                  placeholder="Card"
                />
              </Field>
              <Field label="Tax rate (%)">
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.taxRate}
                  onChange={(event) => updateField("taxRate", Number(event.target.value) || 0)}
                  className={inputClassName}
                />
              </Field>
              <Field label="Notes" className="sm:col-span-2">
                <textarea
                  value={formData.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  className={`${inputClassName} min-h-28 resize-y`}
                  placeholder="Paid in full"
                />
              </Field>
            </div>
          </div>

          <div className="rounded-[28px] bg-stone-50 p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Line items and totals</h2>
                <p className="mt-2 text-sm text-stone-600">Add up to a few items for a tight MVP flow.</p>
              </div>
              <button
                type="button"
                onClick={addItem}
                className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 transition hover:border-stone-400 hover:bg-stone-100"
              >
                Add item
              </button>
            </div>

            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={item.id} className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-stone-900">Item {index + 1}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={formData.items.length === 1}
                      className="text-sm text-stone-500 transition hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[1.3fr_0.55fr_0.75fr]">
                    <Field label="Description">
                      <input
                        value={item.description}
                        onChange={(event) => updateItem(item.id, "description", event.target.value)}
                        className={inputClassName}
                        placeholder="Packaging supplies"
                      />
                    </Field>
                    <Field label="Qty">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={item.quantity}
                        onChange={(event) => updateItem(item.id, "quantity", event.target.value)}
                        className={inputClassName}
                      />
                    </Field>
                    <Field label="Unit price">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(event) => updateItem(item.id, "unitPrice", event.target.value)}
                        className={inputClassName}
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-3xl border border-dashed border-stone-300 bg-white p-4">
              <dl className="space-y-3 text-sm text-stone-700">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-stone-900">{formatMoney(totals.subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Tax</dt>
                  <dd className="font-medium text-stone-900">{formatMoney(totals.tax)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-stone-200 pt-3 text-base font-semibold text-stone-900">
                  <dt>Total</dt>
                  <dd>{formatMoney(totals.total)}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={handlePrint}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm lg:grid-cols-[0.95fr_1.05fr] print:hidden">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Edit the fields that matter</h2>
            <p className="mt-3 text-stone-600">
              This receipt template is built around the information most small businesses need for clean records and customer proof of payment.
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

        <section id="how-it-works" className="space-y-5 print:hidden">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold sm:text-3xl">How it works</h2>
            <p className="max-w-3xl text-stone-600">A simple path from blank template to a professional small business receipt.</p>
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

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start print:hidden">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold sm:text-3xl">Built for everyday small business use</h2>
            <p className="text-stone-600">
              Whether you run a local shop or a solo service business, a clear receipt helps you look professional and stay organized.
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

        <section className="space-y-5 print:hidden">
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
      </section>
    </main>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block space-y-2 ${className ?? ""}`}>
      <span className="text-sm font-medium text-stone-700">{label}</span>
      {children}
    </label>
  );
}

const inputClassName =
  "w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-4 focus:ring-stone-200/60";
