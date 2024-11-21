import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import booksApi from "./api/booksApi";
import ordersApi from "./api/ordersApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
});
