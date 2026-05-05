import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Home from "@/app/page";

describe("Home page receipt workflow", () => {
  test("renders an editable receipt form with template selection and print action", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /edit your receipt/i,
      }),
    ).toBeDefined();

    expect(screen.getByLabelText(/business name/i)).toBeDefined();
    expect(screen.getByLabelText(/customer name/i)).toBeDefined();
    expect(screen.getAllByRole("button", { name: /print receipt/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("radio", { name: /classic receipt/i })).toBeDefined();
  });

  test("renders homepage jump links, indexing-focused template clusters, faq section, related templates, and a single how-it-works section", () => {
    const { container } = render(<Home />);

    expect(screen.getByRole("link", { name: /jump to editor/i }).getAttribute("href")).toBe("#editor");
    expect(screen.getByRole("link", { name: /required receipt fields/i }).getAttribute("href")).toBe(
      "#receipt-fields",
    );
    expect(
      screen.getByRole("heading", { level: 2, name: /start with the strongest receipt template intents/i }),
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { level: 2, name: /browse receipt templates by business scenario/i }),
    ).toBeDefined();
    expect(screen.getByRole("heading", { level: 2, name: /frequently asked questions/i })).toBeDefined();
    expect(screen.getByRole("heading", { level: 2, name: /related receipt templates/i })).toBeDefined();
    expect(screen.getAllByRole("link", { name: /payment receipt template/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /editable receipt template/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /printable receipt template/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /rent receipt template/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /cash payment receipt template/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /service receipt template/i }).length).toBeGreaterThan(0);
    expect(container.querySelectorAll("#how-it-works")).toHaveLength(1);
    expect(container.querySelectorAll("#faq")).toHaveLength(1);
  });

  test("updates the live preview when the business name changes", async () => {
    const { userEvent } = await import("@testing-library/user-event");
    render(<Home />);

    const businessName = screen.getByLabelText(/business name/i);
    await userEvent.clear(businessName);
    await userEvent.type(businessName, "Northwind Studio");

    expect(screen.getByText("Northwind Studio")).toBeDefined();
  });

  test("invokes window.print from the print action", async () => {
    const { userEvent } = await import("@testing-library/user-event");
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});

    render(<Home />);
    await userEvent.click(screen.getAllByRole("button", { name: /print receipt/i })[0]);

    expect(printSpy).toHaveBeenCalledTimes(1);
    printSpy.mockRestore();
  });
});
