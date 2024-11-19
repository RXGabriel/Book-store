import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import booksApi from "./api/booksApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});
