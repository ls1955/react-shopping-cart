import { useContext } from "react";
import PropTypes from "prop-types";

import { CartContext } from "../contexts/cart-context";

export default function ItemCard({ title }) {
  const { cart, setCart } = useContext(CartContext);
  const { quantity = 1, isInCart = false } = cart?.[title] ?? {};

  const handleQuantity = ({ target: { value } }) => {
    setCart({ ...cart, [title]: { quantity: value, isInCart } });
  };
  const handleAdd = () => {
    setCart({ ...cart, [title]: { isInCart: true, quantity } });
  };
  const handleRemove = () => {
    setCart({ ...cart, [title]: { isInCart: false, quantity } });
  };

  return (
    <div>
      <p>{title}</p>
      <input type="number" value={quantity} onChange={handleQuantity} />
      {isInCart ? (
        <button onClick={handleRemove}>Remove</button>
      ) : (
        <button onClick={handleAdd}>Add</button>
      )}
    </div>
  );
}

ItemCard.propTypes = {
  title: PropTypes.string.isRequired,
};
