import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import CartPage from "../../src/routes/cart-page";
import renderWithCartProvider from "../helpers/render-with-cart-provider";

describe("cart page", () => {
  it("has navigation bar", () => {
    render(<CartPage />, { wrapper: BrowserRouter });

    expect(screen.queryByRole("navigation")).toBeInTheDocument();
  });

  it("shows cart items", () => {
    const value = { cart: { tuna: { isInCart: true } } };

    renderWithCartProvider(<CartPage />, {
      providerProps: { value },
      wrapper: BrowserRouter,
    });

    expect(screen.queryByText("tuna")).toBeInTheDocument();
  });

  it("shows a checkout button", () => {
    render(<CartPage />, { wrapper: BrowserRouter });

    expect(screen.queryByText(/checkout/i)).toBeInTheDocument();
  });

  it("shows checkout message after clicked checkout button", async () => {
    const user = userEvent.setup();

    render(<CartPage />, { wrapper: BrowserRouter });
    await user.click(screen.getByText(/checkout/i));

    expect(screen.queryByText(/thank/i)).toBeInTheDocument();
  });
});
