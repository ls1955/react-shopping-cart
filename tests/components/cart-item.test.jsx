import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartItem from "../../src/components/cart-item";
import renderWithCartProvider from "../helpers/render-with-cart-provider";

const defaultValue = {
  quantity: 1,
  image: null,
  price: 17.08,
  isInCart: true,
};

describe("cart item", () => {
  it("shows given title", () => {
    renderWithCartProvider(<CartItem title="tuna" />, {
      providerProps: { value: { cart: { tuna: defaultValue } } },
    });

    expect(screen.queryByText("tuna")).toBeInTheDocument();
  });

  it("shows quantity from CartProvider", () => {
    renderWithCartProvider(<CartItem title="tuna" />, {
      providerProps: {
        value: { cart: { tuna: { ...defaultValue, quantity: 999 } } },
      },
    });

    expect(
      screen.queryByRole("spinbutton", { value: 999 })
    ).toBeInTheDocument();
  });

  it("calls setCart from CartProvider after update quantity field", async () => {
    const user = userEvent.setup();
    const value = { cart: { tuna: defaultValue }, setCart: vi.fn() };

    renderWithCartProvider(<CartItem title="tuna" />, {
      providerProps: { value },
    });
    await user.type(screen.getByRole("spinbutton"), "1");

    expect(value.setCart).toBeCalled();
  });

  it("shows a remove button", () => {
    renderWithCartProvider(<CartItem title="tuna" />, {
      providerProps: { value: { cart: { tuna: defaultValue } } },
    });

    expect(screen.queryByRole("button", { name: /x/i })).toBeInTheDocument();
  });

  it("calls setCart from CartProvider after clicked remove button", async () => {
    const user = userEvent.setup();
    const value = { cart: { tuna: defaultValue }, setCart: vi.fn() };

    renderWithCartProvider(<CartItem title="tuna" />, {
      providerProps: { value },
    });
    await user.click(screen.getByRole("button", { name: /x/i }));

    expect(value.setCart).toBeCalled();
  });

  it("shows price", () => {
    renderWithCartProvider(<CartItem title="tuna" />, {
      providerProps: {
        value: { cart: { tuna: { ...defaultValue, price: 12.01 } } },
      },
    });

    expect(screen.queryByText(/12\.01/)).toBeInTheDocument();
  });
});
