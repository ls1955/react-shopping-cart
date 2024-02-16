import { useContext } from "react";
import PropTypes from "prop-types";

import { CartContext } from "../contexts/cart-context";

import styles from "../styles.module.css";

export default function ItemCard({ title }) {
  const { cart, setCart } = useContext(CartContext);
  const { image, quantity = 1, isInCart = false } = cart?.[title] ?? {};

  const handleAdd = () => {
    setCart({ ...cart, [title]: { isInCart: true, quantity } });
  };
  const handleRemove = () => {
    setCart({ ...cart, [title]: { isInCart: false, quantity } });
  };

  return (
    <div>
      <img src={image} alt={title} className={styles.itemCardImage} />
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
