import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../contexts/cart-context";
import styles from "../styles.module.css"

export default function NavigationBar() {
  const { cart } = useContext(CartContext);
  const addedItemCount = Object.values(cart).filter(({ isInCart }) => isInCart).length

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLink}>Home</Link>
      <Link to="/items" className={styles.navLink}>Items</Link>
      <Link to="/cart" className={styles.navLink}>Cart ({addedItemCount})</Link>
    </nav>
  );
}
