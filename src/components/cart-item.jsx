import { useContext } from "react";
import PropTypes from "prop-types";

import { CartContext } from "../contexts/cart-context";

import styles from "../styles.module.css";

export default function CartItem({ title }) {
  const { cart, setCart } = useContext(CartContext);
  const { quantity, image, price, ...rest } = cart[title];

  const handleUpdate = ({ target: { value } }) => {
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

  const totalPrice = price * quantity;

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
          max={999}
          onChange={handleUpdate}
          className={styles.quantityInput}
        />
        <button onClick={handleRemove}>X</button>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  title: PropTypes.string.isRequired,
};
