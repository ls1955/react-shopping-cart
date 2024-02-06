import { useContext } from "react";
import PropTypes from "prop-types";

import { CartContext } from "../contexts/cart-context";

export default function CartItem({ title }) {
  const { cart, setCart } = useContext(CartContext);
  const { quantity = 1 } = cart?.[title] ?? {};

  const handleUpdate = ({ target: { value } }) => {
    // NOTE: What if user manually enter a value <= 0?
    setCart({ ...cart, [title]: { quantity: value, isInCart: true } });
  };
  const handleRemove = () => {
    setCart({ ...cart, [title]: { quantity, isInCart: false } });
  };

  return (
    <div>
      <p>{title}</p>
      <input type="number" value={quantity} min={1} onChange={handleUpdate} />
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}

CartItem.propTypes = {
  title: PropTypes.string.isRequired,
};
