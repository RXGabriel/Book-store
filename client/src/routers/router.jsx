import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import CartPage from "../pages/books/CartPage.jsx";
import CheckoutPage from "../pages/books/CheckoutPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import SingleBook from "../pages/books/SingleBook.jsx";
import OrderPage from "../pages/books/OrderPage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ManageBooks from "../pages/dashboard/ManageBooks.jsx";
import AddBook from "../pages/dashboard/AddBook.jsx";
import EditBook from "../pages/dashboard/EditBook.jsx";
import AllBooks from "../pages/books/AllBooks.jsx";
import About from "../pages/info/About.jsx";
import Contact from "../pages/info/Contact.jsx";
import NotFound from "../pages/info/NotFound.jsx";

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
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },

      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/books",
        element: <AllBooks />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/books/:id",
        element: <SingleBook />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },

      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        ),
      },
      {
        path: "add-new-book",
        element: (
          <AdminRoute>
            <AddBook />
          </AdminRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <AdminRoute>
            <EditBook />
          </AdminRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
