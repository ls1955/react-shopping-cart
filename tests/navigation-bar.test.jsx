import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import NavigationBar from "../src/navigation-bar";

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
});
