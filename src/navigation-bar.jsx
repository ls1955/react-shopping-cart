import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/items">Items</Link>
      <Link to="cart">Cart</Link>
    </nav>
  );
}
