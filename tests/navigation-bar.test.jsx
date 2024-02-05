import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import NavigationBar from "../src/navigation-bar";
import renderWithCartProvider from "./helpers/render-with-cart-provider";

describe("navigation bar", () => {
  it("has a link for homepage", () => {
    render(<NavigationBar />, { wrapper: BrowserRouter });

    const homeLink = screen.queryByRole("link", { name: /home/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("has a link for items page", () => {
    render(<NavigationBar />, { wrapper: BrowserRouter });

    const itemsPageLink = screen.queryByRole("link", { name: /items/i });

    expect(itemsPageLink).toBeInTheDocument();
    expect(itemsPageLink).toHaveAttribute("href", "/items");
  });

  it("has a link for cart page", () => {
    render(<NavigationBar />, { wrapper: BrowserRouter });

    const cartPageLink = screen.queryByRole("link", { name: /cart/i });

    expect(cartPageLink).toBeInTheDocument();
    expect(cartPageLink).toHaveAttribute("href", "/cart");
  });

  it("has a cartPageLink that show 0 item if no item is in cart", () => {
    render(<NavigationBar />, { wrapper: BrowserRouter });

    expect(screen.queryByRole("link", { name: /0/ })).toBeInTheDocument();
  });

  it("has a cartPageLink that show added item amount in cart", () => {
    const value = {
      cart: {
        tuna: { isInCart: true },
        ham: { isInCart: true },
        pentarou: { isInCart: true },
        yam: { isInCart: false },
      },
    };

    renderWithCartProvider(<NavigationBar />, {
      providerProps: { value },
      wrapper: BrowserRouter,
    });

    expect(screen.queryByRole("link", { name: /3/ })).toBeInTheDocument();
  });
});
