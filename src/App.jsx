import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/home";

const router = createBrowserRouter([{ path: "/", element: <Home /> }]);

export default function App() {
  return <RouterProvider router={router} />;

  return;
  // TODO:
  // * Load cart's data via useEffect
  // * Pass CartContext here
  // * Create Router
}
