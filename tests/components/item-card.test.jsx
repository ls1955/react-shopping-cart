import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ItemCard from "../../src/components/item-card";
import renderWithCartProvider from "../helpers/render-with-cart-provider";

describe("item card", () => {
  it("shows given title", () => {
    render(<ItemCard title="tuna" />);

    expect(screen.queryByText("tuna")).toBeInTheDocument();
  });

  it("shows quantity from CartContext", () => {
    const value = { cart: { tuna: { quantity: 999 } } };

    renderWithCartProvider(<ItemCard title="tuna" />, {
      providerProps: { value },
    });

    expect(screen.getByRole("spinbutton").value).toEqual("999");
  });

  it("calls setCart from CartContext after update quantity field", async () => {
    const user = userEvent.setup();
    const value = { cart: {}, setCart: vi.fn() };

    renderWithCartProvider(<ItemCard title="tuna" />, {
      providerProps: { value },
    });

    await user.type(screen.getByRole("spinbutton"), "999");

    expect(value.setCart).toBeCalled();
  });

  it("displays add button when not in cart", () => {
    const value = { cart: { tuna: { isInCart: false } } };

    renderWithCartProvider(<ItemCard title="tuna" />, {
      providerProps: { value },
    });

    expect(screen.queryByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("calls setCart from CartContext after click add button", async () => {
    const user = userEvent.setup();
    const value = { cart: {}, setCart: vi.fn() };

    renderWithCartProvider(<ItemCard title="tuna" />, {
      providerProps: { value },
    });

    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(value.setCart).toBeCalled();
  });

  it("displays remove button when in cart", () => {
    const value = { cart: { tuna: { isInCart: true } } };

    renderWithCartProvider(<ItemCard title="tuna" />, {
      providerProps: { value },
    });

    expect(
      screen.queryByRole("button", { name: /remove/i })
    ).toBeInTheDocument();
  });

  it("calls setCart from CartContext after click remove button", async () => {
    const user = userEvent.setup();
    const value = { cart: { tuna: { isInCart: true } }, setCart: vi.fn() };

    renderWithCartProvider(<ItemCard title="tuna" />, {
      providerProps: { value },
    });

    await user.click(screen.getByRole("button", { name: /remove/i }));

    expect(value.setCart).toBeCalled();
  });
});
