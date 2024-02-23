import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ItemsPage from "../../src/routes/items-page";
import renderWithCartProvider from "../helpers/render-with-cart-provider";

const defaultValue = {
  quantity: 1,
  image: null,
  price: 17.08,
  isInCart: true,
};

describe("items page", () => {
  it("renders items information from CartContext", () => {
    const value = {
      cart: { tuna: defaultValue, ham: defaultValue, yam: defaultValue },
    };

    renderWithCartProvider(<ItemsPage />, {
      providerProps: { value },
      wrapper: BrowserRouter,
    });

    expect(screen.queryByText("tuna")).toBeInTheDocument();
    expect(screen.queryByText("ham")).toBeInTheDocument();
    expect(screen.queryByText("yam")).toBeInTheDocument();
  });
});
