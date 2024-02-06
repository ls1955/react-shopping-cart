import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartItem from "../../src/components/cart-item";
import renderWithCartProvider from "../helpers/render-with-cart-provider";

describe("cart item", () => {
  it("shows given title", () => {
    render(<CartItem title="tuna" />);

    expect(screen.queryByText("tuna")).toBeInTheDocument();
  });

  it("shows quantity from CartProvider", () => {
    const value = { cart: { tuna: { quantity: 999 } } };

    renderWithCartProvider(<CartItem title="tuna" />, {
      providerProps: { value },
    });

    expect(
      screen.queryByRole("spinbutton", { value: 999 })
    ).toBeInTheDocument();
  });

  it("calls setCart from CartProvider after update quantity field", async () => {
    const user = userEvent.setup();
    const value = { cart: {}, setCart: vi.fn() };

    renderWithCartProvider(<CartItem title="tuna" />, {
      providerProps: { value },
    });
    await user.type(screen.getByRole("spinbutton"), "999");

    expect(value.setCart).toBeCalled();
  });

  it("shows a remove button", () => {
    render(<CartItem title="tuna" />);

    expect(
      screen.queryByRole("button", { name: /remove/i })
    ).toBeInTheDocument();
  });

  it("calls setCart from CartProvider after clicked remove button", async () => {
    const user = userEvent.setup();
    const value = { cart: {}, setCart: vi.fn() };

    renderWithCartProvider(<CartItem title="tuna" />, {
      providerProps: { value },
    });
    await user.click(screen.getByRole("button", { name: /remove/i }));

    expect(value.setCart).toBeCalled();
  });
});
