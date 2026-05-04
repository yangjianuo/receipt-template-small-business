import { describe, expect, test } from "vitest";
import { calculateReceiptTotals, formatMoney } from "@/lib/receipt";

describe("receipt totals", () => {
  test("calculates subtotal, tax, and total from editable line items", () => {
    const totals = calculateReceiptTotals({
      items: [
        { description: "Design retainer", quantity: 2, unitPrice: 75 },
        { description: "Rush delivery", quantity: 1, unitPrice: 25 },
      ],
      taxRate: 8,
    });

    expect(totals.subtotal).toBe(175);
    expect(totals.tax).toBe(14);
    expect(totals.total).toBe(189);
  });

  test("formats money for receipt preview output", () => {
    expect(formatMoney(189)).toBe("$189.00");
  });
});
