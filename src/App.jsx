import { useEffect, useState } from "react";

import Router from "./router";
import { CartContext } from "./contexts/cart-context";
import data from "./sample_data.json";

export default function App() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products?limit=20"
      );
      const json = await response.json();
      const newCart = Object.fromEntries(
        json.map(({ title, price, image }) => [
          title,
          { price, image, quantity: 1 },
        ])
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
