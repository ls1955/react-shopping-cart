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
    if (cartItems.length === 0) return setMessage("Cart is empty.");

    const newCart = {};
    Object.entries(cart).forEach(([title, { ...props }]) => {
      newCart[title] = { ...props, isInCart: false };
    });
    setCart(newCart);
    setMessage("Thank you for purchasing.");
  };

  return (
    <>
      <NavigationBar />
      <div className={styles.cartContainer}>
        {cartItems}
        <button onClick={handleCheckout} className={styles.checkoutButton}>
          Checkout
        </button>
        {message && <MessageBox>{message}</MessageBox>}
      </div>
    </>
  );
}
