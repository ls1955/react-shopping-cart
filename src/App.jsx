import { useEffect, useState } from "react";

import Router from "./router";
import { CartContext } from "./contexts/cart-context";
import data from "./data.json";

export default function App() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchData = async () => {
      const newCart = Object.fromEntries(
        data.map(({ title, price, image }) => [title, { price, image, quantity: 1 }])
      );
      setCart(newCart);
    };
    fetchData();
  }, []);

  return (
    <div>
      <CartContext.Provider value={{ cart, setCart }}>
        <Router />
      </CartContext.Provider>
    </div>
  );
}
