import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ItemsPage from "../../src/routes/items-page";
import renderWithCartProvider from "../helpers/render-with-cart-provider";

describe("items page", () => {
  it("renders items information from CartContext", () => {
    const value = { cart: { tuna: {}, ham: {}, yam: {} } };

    renderWithCartProvider(<ItemsPage />, {
      providerProps: { value },
      wrapper: BrowserRouter,
    });

    expect(screen.queryByText("tuna")).toBeInTheDocument();
    expect(screen.queryByText("ham")).toBeInTheDocument();
    expect(screen.queryByText("yam")).toBeInTheDocument();
  });
});
