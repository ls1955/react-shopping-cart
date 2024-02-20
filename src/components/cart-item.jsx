import { useContext } from "react";
import PropTypes from "prop-types";

import { CartContext } from "../contexts/cart-context";

import styles from "../styles.module.css";

export default function CartItem({ title }) {
  const { cart, setCart } = useContext(CartContext);
  const { quantity = 1, image = null, price = 0, ...rest } = cart?.[title] ?? {};

  const handleUpdate = ({ target: { value } }) => {
    // NOTE: What if user manually enter a value <= 0?
    setCart({
      ...cart,
      [title]: { ...rest, quantity: value, image, price },
    });
  };
  const handleRemove = () => {
    setCart({
      ...cart,
      [title]: { ...rest, isInCart: false, image, quantity, price },
    });
  };

  return (
    <div className={styles.cardItemContainer}>
      <div className={styles.cardItemSection}>
        <img src={image} alt={title} className={styles.thumbnail} />
        <p>{title}</p>
      </div>
      <div className={styles.cardItemSection}>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={handleUpdate}
          className={styles.quantityInput}
        />
        <button onClick={handleRemove}>X</button>
        <p>${price.toFixed(2)}</p>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  title: PropTypes.string.isRequired,
};
