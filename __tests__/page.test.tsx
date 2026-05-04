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
