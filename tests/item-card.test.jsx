import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ItemCard from "../src/item-card";
import { CartContext } from "../src/contexts/cart-context";

// Renders *ui* with CartContext.Provider as a wrapper.
const customRender = (ui, props = {}, { ...renderOptions } = {}) => {
  return render(
    <CartContext.Provider {...props}>{ui}</CartContext.Provider>,
    renderOptions
  );
};

describe("item card", () => {
  it("displays the given title", () => {
    render(<ItemCard title="tuna" />);

    expect(screen.queryByText("tuna")).toBeInTheDocument();
  });

  it("has a quantity of 1 by default", () => {
    render(<ItemCard title="tuna" />);

    expect(screen.getByRole("spinbutton").value).toEqual("1");
  });

  it("shows quantity from CartContext", () => {
    const value = { cart: { tuna: { quantity: 999 } } };

    customRender(<ItemCard title="tuna" />, {value});

    expect(screen.getByRole("spinbutton").value).toEqual("999");
  });

  it("calls setCart when user update quantity field", async () => {
    const user = userEvent.setup();
    const value = {cart: {}, setCart: vi.fn()}

    customRender(<ItemCard title="tuna" />, {value});

    await user.type(screen.getByRole("spinbutton"), "999");

    expect(value.setCart).toBeCalled()
  });

  // it.skip("displays an add button when not in cart", () => {
  //   render(<ItemCard title={"tuna"} />);

  //   expect(screen.queryByRole("button", { name: /add/i })).toBeInTheDocument();
  // });

  // it.skip("calls onAdd handler when user clicked add button", async () => {
  //   const user = userEvent.setup();

  //   render(<ItemCard title={"tuna"} />);

  //   await user.click(screen.getByRole("button", { name: /add/i }));

  //   expect(onAdd).toHaveBeenCalledOnce();
  // });

  // it.skip("displays a remove button when in cart", () => {
  //   render(<ItemCard title={"tuna"} isInCart />);

  //   expect(
  //     screen.queryByRole("button", { name: /remove/i })
  //   ).toBeInTheDocument();
  // });

  // it.skip("calls onRemove handler when user clicked remove button", async () => {
  //   const user = userEvent.setup();

  //   render(<ItemCard title={"tuna"} isInCart />);

  //   await user.click(screen.getByRole("button", { name: /remove/i }));

  //   expect(onRemove).to.toHaveBeenCalledOnce();
  // });
});
