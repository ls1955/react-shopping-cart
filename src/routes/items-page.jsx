import { useContext } from "react";

import NavigationBar from "../components/navigation-bar";
import ItemCard from "../components/item-card";
import { CartContext } from "../contexts/cart-context";

import styles from "../styles.module.css";

export default function ItemsPage() {
  const { cart } = useContext(CartContext);

  const titles = Object.keys(cart);
  const itemCards = titles.map((title) => {
    return <ItemCard key={title} title={title} />;
  });

  return (
    <>
      <NavigationBar />
      <div className={styles.itemCardsContainer}>{itemCards}</div>
    </>
  );
}
