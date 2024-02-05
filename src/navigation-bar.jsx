import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "./contexts/cart-context";

export default function NavigationBar() {
  const { cart } = useContext(CartContext);
  const addedItemCount = Object.values(cart).filter(({ isInCart }) => isInCart).length

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/items">Items</Link>
      <Link to="cart">Cart ({addedItemCount})</Link>
    </nav>
  );
}
