import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/home";
import ItemsPage from "./routes/items-page";
import CartPage from "./routes/cart-page";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/items", element: <ItemsPage /> },
  { path: "/cart", element: <CartPage /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
