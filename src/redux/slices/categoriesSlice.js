import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"],
  activeCategoryId: 0,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setActiveCategoryId: (state, action) => {
      state.activeCategoryId = action.payload;
    },
  },
});

export const selectCategories = (state) => state.categories

export const { setActiveCategoryId } = categoriesSlice.actions;
export default categoriesSlice.reducer;
