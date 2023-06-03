import { configureStore } from "@reduxjs/toolkit";
import categories from "../components/Categories/CategoriesSlice";
import search from "../components/Search/SearchSlice"
import sort from '../components/Sort/SortSlice'

export const store = configureStore({
  reducer: {
    categories, search, sort
  },
});
