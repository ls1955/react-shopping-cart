import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ItemCard from "../src/item-card";

// setup props
const title = "tuna";
const onAdd = vi.fn();
const onRemove = vi.fn();
const defaultProps = { title, onAdd, onRemove, isInCart: false };

describe("item card", () => {
  it("displays the given title", () => {
    render(<ItemCard {...defaultProps} />);

    expect(screen.queryByText(title)).toBeInTheDocument();
  });

  it("has a quantity of 1 by default", () => {
    render(<ItemCard {...defaultProps} />);

    expect(screen.getByRole("spinbutton").value).toEqual("1");
  });

  it("quantity can be set via prop", () => {
    render(<ItemCard {...defaultProps} quantity={100}/>)

    expect(screen.getByRole("spinbutton").value).toEqual("100")
  })

  it("changes quantity via user input", async () => {
    const user = userEvent.setup();

    render(<ItemCard {...defaultProps} />);

    await user.clear(screen.getByRole("spinbutton"));
    await user.type(screen.getByRole("spinbutton"), "999");

    expect(screen.getByRole("spinbutton").value).toEqual("999");
  });

  it("displays an add button when not in cart", () => {
    render(<ItemCard {...defaultProps} />);

    expect(screen.queryByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("calls onAdd handler when user clicked add button", async () => {
    const user = userEvent.setup();

    render(<ItemCard {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(onAdd).toHaveBeenCalledOnce();
  });

  it("displays a remove button when in cart", () => {
    render(<ItemCard {...defaultProps} isInCart />);

    expect(
      screen.queryByRole("button", { name: /remove/i })
    ).toBeInTheDocument();
  });

  it("calls onRemove handler when user clicked remove button", async () => {
    const user = userEvent.setup();

    render(<ItemCard {...defaultProps} isInCart />);

    await user.click(screen.getByRole("button", { name: /remove/i }));

    expect(onRemove).to.toHaveBeenCalledOnce();
  });
});
