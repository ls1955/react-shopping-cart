import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Home from "../src/routes/home.jsx";

describe("home", () => {
  it("has a heading", () => {
    render(<Home />, { wrapper: BrowserRouter });

    expect(screen.queryByText(/welcome to the store/i)).toBeInTheDocument();
  });
});
