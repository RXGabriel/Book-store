import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routers/router.jsx";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store.js";
import "sweetalert2/dist/sweetalert2.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
