export type ReceiptTemplateId = "classic" | "service" | "invoice";

export type ReceiptItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type ReceiptFormData = {
  templateId: ReceiptTemplateId;
  businessName: string;
  businessContact: string;
  receiptNumber: string;
  issueDate: string;
  customerName: string;
  paymentMethod: string;
  notes: string;
  taxRate: number;
  items: ReceiptItem[];
};

export type ReceiptTotals = {
  subtotal: number;
  tax: number;
  total: number;
};

export const receiptTemplates: Array<{
  id: ReceiptTemplateId;
  name: string;
  scenario: string;
  tag: string;
  desc: string;
  accent: string;
  previewLabel: string;
}> = [
  {
    id: "classic",
    name: "Classic Receipt",
    scenario: "Retail shop",
    tag: "Best for printing",
    desc: "A familiar receipt layout for stores, pop-up shops, and everyday counter sales.",
    accent: "from-stone-900 via-stone-800 to-stone-700",
    previewLabel: "Small Business Receipt",
  },
  {
    id: "service",
    name: "Service Receipt",
    scenario: "Home or local service",
    tag: "Clear line items",
    desc: "Built for repair jobs, cleaning services, salons, and appointment-based businesses.",
    accent: "from-emerald-800 via-emerald-700 to-emerald-600",
    previewLabel: "Service Payment Receipt",
  },
  {
    id: "invoice",
    name: "Simple Invoice-Style",
    scenario: "Freelancer or studio",
    tag: "Polished and professional",
    desc: "A clean format for consultants, creatives, and small teams who want a more formal look.",
    accent: "from-sky-900 via-sky-800 to-indigo-700",
    previewLabel: "Invoice-Style Receipt",
  },
];

export const defaultReceiptData: ReceiptFormData = {
  templateId: "classic",
  businessName: "Oak & Pine Market",
  businessContact: "123 Market Street · (555) 014-2201",
  receiptNumber: "10021",
  issueDate: "2026-05-04",
  customerName: "Walk-in client",
  paymentMethod: "Card",
  notes: "Paid in full",
  taxRate: 8,
  items: [
    {
      id: "item-1",
      description: "Packaging supplies",
      quantity: 2,
      unitPrice: 27,
    },
    {
      id: "item-2",
      description: "Priority handling",
      quantity: 1,
      unitPrice: 6,
    },
  ],
};

export function calculateReceiptTotals(input: Pick<ReceiptFormData, "items" | "taxRate">): ReceiptTotals {
  const subtotal = Number(
    input.items
      .reduce((sum, item) => sum + normalizeMoney(item.quantity) * normalizeMoney(item.unitPrice), 0)
      .toFixed(2),
  );
  const tax = Number((subtotal * (normalizeMoney(input.taxRate) / 100)).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return { subtotal, tax, total };
}

export function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(normalizeMoney(value));
}

export function normalizeMoney(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Number(value);
}
