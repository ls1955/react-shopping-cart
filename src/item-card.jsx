import PropTypes from "prop-types";

export default function ItemCard({
  title,
  quantity,
  isInCart = false,
  onAdd,
  onRemove,
}) {
  return (
    <div>
      <p>{title}</p>
      <input
        type="number"
        name="quantity"
        id="quantity"
        defaultValue="1"
        value={quantity}
      />
      {isInCart ? (
        <button onClick={onRemove}>Remove</button>
      ) : (
        <button onClick={onAdd}>Add</button>
      )}
    </div>
  );
}

ItemCard.propTypes = {
  title: PropTypes.string,
  quantity: PropTypes.number,
  isInCart: PropTypes.bool,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};
