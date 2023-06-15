import { configureStore } from "@reduxjs/toolkit";
import categories from "./slices/categoriesSlice";
import search from "./slices/searchSlice";
import sort from "./slices/sortSlice";
import pagination from "./slices/pagintionSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    categories,
    search,
    sort,
    pagination,
    cart,
  },
});
