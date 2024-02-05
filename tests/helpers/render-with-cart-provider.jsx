import { render } from "@testing-library/react";
import { CartContext } from "../../src/contexts/cart-context";

// Renders *ui* with CartContext.Provider as wrapper.
const renderWithCartProvider = (ui, { providerProps, ...options }) => {
  return render(
    <CartContext.Provider {...providerProps}>{ui}</CartContext.Provider>,
    options
  );
};

export default renderWithCartProvider;
