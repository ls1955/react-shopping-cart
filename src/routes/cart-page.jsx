import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart-context";

import NavigationBar from "../components/navigation-bar";
import CartItem from "../components/cart-item";
import MessageBox from "../components/message-box";

import styles from "../styles.module.css";

export default function CartPage() {
  const [message, setMessage] = useState(null);

  const { cart, setCart } = useContext(CartContext);
  const cartItems = Object.keys(cart)
    .filter((title) => cart[title].isInCart)
    .map((title) => <CartItem key={title} title={title} />);
  const handleCheckout = () => {
    if (hasInvalidQuantity()) {
      return setMessage("All quantity must be between 1 and 999.");
    }

    const newCart = {};
    Object.entries(cart).forEach(([title, { ...props }]) => {
      newCart[title] = { ...props, isInCart: false };
    });

    setCart(newCart);
    setMessage("Thank you for purchasing.");
  };

  const hasInvalidQuantity = () => {
    return Object.values(cart).some(({ quantity }) => +quantity <= 0 || +quantity > 999);
  }

  const totalPrice = Object.values(cart).reduce(
    (memo, { price, quantity }) => memo + price * quantity,
    0
  );

  return (
    <>
      <NavigationBar />
      <div className={styles.cartContainer}>
        {cartItems.length !== 0 ? cartItems : <p>Cart is empty.</p>}
        {cartItems.length !== 0 && <p>Total: ${totalPrice.toFixed(2)}</p>}
        {cartItems.length !== 0 && (
          <button onClick={handleCheckout} className={styles.checkoutButton}>
            Checkout
          </button>
        )}
        {message && <MessageBox>{message}</MessageBox>}
      </div>
    </>
  );
}
