import { useContext } from "react";
import PropTypes from "prop-types";

import { CartContext } from "./contexts/cart-context";

export default function ItemCard({ title }) {
  const { cart, setCart } = useContext(CartContext);
  const { quantity = 1 } = cart[title] ?? {};

  const handleChange = ({ target: { value } }) => {
    setCart({ ...cart, [title]: { quantity: value } });
  };

  return (
    <div>
      <p>{title}</p>
      <input type="number" value={quantity} onChange={handleChange} />
    </div>
  );
}

ItemCard.propTypes = {
  title: PropTypes.string.isRequired,
};
