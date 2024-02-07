import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart-context";

import NavigationBar from "../components/navigation-bar";
import CartItem from "../components/cart-item";

export default function CartPage() {
  const [isCheckout, setIsCheckout] = useState(false);

  const { cart, setCart } = useContext(CartContext);
  const cartItems = Object.keys(cart).map((title) => (
    <CartItem key={title} title={title} />
  ));

  const handleCheckout = () => {
    setIsCheckout(true);
    setCart({ cart: {}, setCart });
  };

  return (
    <>
      <NavigationBar />
      {cartItems}
      <button onClick={handleCheckout}>Checkout</button>
      {/* TODO: Extract out a MessageBox component? */}
      {isCheckout && <p>Thank you for purchasing.</p>}
    </>
  );
}
