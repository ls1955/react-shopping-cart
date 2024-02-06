import { useContext } from "react";
import PropTypes from "prop-types";

import { CartContext } from "../contexts/cart-context";

export default function ItemCard({ title }) {
  const { cart, setCart } = useContext(CartContext);
  const { quantity = 1, isInCart = false } = cart?.[title] ?? {};

  const handleAdd = () => {
    setCart({ ...cart, [title]: { isInCart: true, quantity } });
  };
  const handleRemove = () => {
    setCart({ ...cart, [title]: { isInCart: false, quantity } });
  };

  return (
    <div>
      <p>{title}</p>
      {isInCart ? (
        <button onClick={handleRemove}>Remove from cart</button>
      ) : (
        <button onClick={handleAdd}>Add to cart</button>
      )}
    </div>
  );
}

ItemCard.propTypes = {
  title: PropTypes.string.isRequired,
};
