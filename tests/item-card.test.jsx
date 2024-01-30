import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ItemCard from "../src/item-card";

describe("item card", () => {
  it("by default have a quantity of 1", () => {
    render(<ItemCard />);

    expect(screen.getByRole("spinbutton").value).toEqual("1");
  });
});
