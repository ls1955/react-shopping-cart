import { useContext } from "react";

import NavigationBar from "../components/navigation-bar";
import ItemCard from "../components/item-card";
import { CartContext } from "../contexts/cart-context";

export default function ItemsPage() {
  const { cart } = useContext(CartContext);

  // TODO: Use UUID as key?
  const titles = Object.keys(cart);
  const itemCards = titles.map((title) => {
    return <ItemCard key={title} title={title} />;
  });

  return (
    <>
      <NavigationBar />
      {itemCards}
    </>
  );
}
