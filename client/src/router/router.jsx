import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: <h1>Pedidos</h1>,
      },
      {
        path: "/about",
        element: <h1>Sobre</h1>,
      },
    ],
  },
]);

export default router;
