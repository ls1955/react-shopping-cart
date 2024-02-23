import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ItemCard from "../../src/components/item-card";
import renderWithCartProvider from "../helpers/render-with-cart-provider";

const defaultValue = {
  quantity: 1,
  image: null,
  price: 17.08,
  isInCart: true,
};

describe("item card", () => {
  it("shows given title", () => {
    renderWithCartProvider(<ItemCard title="tuna" />, {
      providerProps: { value: { cart: { tuna: defaultValue } } },
    });

    expect(screen.queryByText("tuna")).toBeInTheDocument();
  });

  it("shows own price", () => {
    renderWithCartProvider(<ItemCard title="tuna" />, {
      providerProps: { value: { cart: { tuna: defaultValue, price: 17.08 } } },
    });

    expect(screen.queryByText(/17\.08/)).toBeInTheDocument();
  });

  it("displays add button when not in cart", () => {
    renderWithCartProvider(<ItemCard title="tuna" />, {
      providerProps: {
        value: { cart: { tuna: { ...defaultValue, isInCart: false } } },
      },
    });

    expect(screen.queryByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("calls setCart from CartProvider after click add button", async () => {
    const user = userEvent.setup();
    const value = {
      cart: { tuna: { ...defaultValue, isInCart: false } },
      setCart: vi.fn(),
    };

    renderWithCartProvider(<ItemCard title="tuna" />, {
      providerProps: { value },
    });
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(value.setCart).toBeCalled();
  });

  it("displays remove button when in cart", () => {
    renderWithCartProvider(<ItemCard title="tuna" />, {
      providerProps: {
        value: { cart: { tuna: { ...defaultValue, isInCart: true } } },
      },
    });

    expect(
      screen.queryByRole("button", { name: /remove/i })
    ).toBeInTheDocument();
  });

  it("calls setCart from CartProvider after click remove button", async () => {
    const user = userEvent.setup();
    const value = {
      cart: { tuna: { ...defaultValue, isInCart: true } },
      setCart: vi.fn(),
    };

    renderWithCartProvider(<ItemCard title="tuna" />, {
      providerProps: { value },
    });
    await user.click(screen.getByRole("button", { name: /remove/i }));

    expect(value.setCart).toBeCalled();
  });
});
