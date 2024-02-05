import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ItemCard from "../src/item-card";
import { CartContext } from "../src/contexts/cart-context";

// Renders *ui* with CartContext.Provider as wrapper.
const renderWithProvider = (ui, { providerProps = {}, ...options }) => {
  return render(
    <CartContext.Provider {...providerProps}>{ui}</CartContext.Provider>,
    options
  );
};

describe("item card", () => {
  it("shows given title", () => {
    render(<ItemCard title="tuna" />);

    expect(screen.queryByText("tuna")).toBeInTheDocument();
  });

  it("shows quantity from CartContext", () => {
    const value = { cart: { tuna: { quantity: 999 } } };

    renderWithProvider(<ItemCard title="tuna" />, { providerProps: { value } });

    expect(screen.getByRole("spinbutton").value).toEqual("999");
  });

  it("calls setCart from CartContext after update quantity field", async () => {
    const user = userEvent.setup();
    const value = { cart: {}, setCart: vi.fn() };

    renderWithProvider(<ItemCard title="tuna" />, { providerProps: { value } });

    await user.type(screen.getByRole("spinbutton"), "999");

    expect(value.setCart).toBeCalled();
  });

  it("displays add button when not in cart", () => {
    const value = { cart: { tuna: { isInCart: false } } };

    renderWithProvider(<ItemCard title="tuna" />, { providerProps: { value } });

    expect(screen.queryByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("calls setCart from CartContext after click add button", async () => {
    const user = userEvent.setup();
    const value = { cart: {}, setCart: vi.fn() };

    renderWithProvider(<ItemCard title="tuna" />, { providerProps: { value } });

    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(value.setCart).toBeCalled();
  });

  it("displays remove button when in cart", () => {
    const value = { cart: { tuna: { isInCart: true } } };

    renderWithProvider(<ItemCard title="tuna" />, { providerProps: { value } });

    expect(
      screen.queryByRole("button", { name: /remove/i })
    ).toBeInTheDocument();
  });

  it("calls setCart from CartContext after click remove button", async () => {
    const user = userEvent.setup();
    const value = { cart: { tuna: { isInCart: true } }, setCart: vi.fn() };

    renderWithProvider(<ItemCard title="tuna" />, { providerProps: { value } });

    await user.click(screen.getByRole("button", { name: /remove/i }));

    expect(value.setCart).toBeCalled();
  });
});
