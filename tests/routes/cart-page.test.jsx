import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import CartPage from "../../src/routes/cart-page";
import renderWithCartProvider from "../helpers/render-with-cart-provider";

const defaultValue = {
  quantity: 1,
  image: null,
  price: 17.08,
  isInCart: true,
};

describe("cart page", () => {
  it("has navigation bar", () => {
    renderWithCartProvider(<CartPage />, {
      providerProps: { value: { cart: { tuna: defaultValue } } },
      wrapper: BrowserRouter,
    });

    expect(screen.queryByRole("navigation")).toBeInTheDocument();
  });

  it("shows cart items", () => {
    renderWithCartProvider(<CartPage />, {
      providerProps: { value: { cart: { tuna: defaultValue } } },
      wrapper: BrowserRouter,
    });

    expect(screen.queryByText("tuna")).toBeInTheDocument();
  });

  it("shows total price of all selected items", () => {
    const value = {
      cart: {
        tuna: defaultValue,
        ham: defaultValue,
        kuma: defaultValue,
      },
    };

    renderWithCartProvider(<CartPage />, {
      providerProps: { value },
      wrapper: BrowserRouter,
    });

    expect(screen.queryByText(/51\.24/)).toBeInTheDocument();
  });

  it("shows an empty cart message when cart is empty", () => {
    render(<CartPage />, { wrapper: BrowserRouter });

    expect(screen.queryByText(/empty/i)).toBeInTheDocument();
  });

  it("shows checkout button when cart is not empty", () => {
    renderWithCartProvider(<CartPage />, {
      providerProps: { value: { cart: { tuna: defaultValue } } },
      wrapper: BrowserRouter,
    });

    expect(screen.queryByText(/checkout/i)).toBeInTheDocument();
  });

  it("calls setCart function after clicked checkout button", async () => {
    const user = userEvent.setup();
    const setCart = vi.fn();

    renderWithCartProvider(<CartPage />, {
      providerProps: {
        value: { cart: { tuna: defaultValue }, setCart },
      },
      wrapper: BrowserRouter,
    });

    await user.click(screen.getByText(/checkout/i));

    expect(setCart).toBeCalled();
  });

  it("shows checkout message after clicked checkout button", async () => {
    const user = userEvent.setup();

    renderWithCartProvider(<CartPage />, {
      providerProps: {
        value: { cart: { tuna: defaultValue }, setCart: () => {} },
      },
      wrapper: BrowserRouter,
    });

    await user.click(screen.getByText(/checkout/i));

    expect(screen.queryByText(/thank/i)).toBeInTheDocument();
  });
});
