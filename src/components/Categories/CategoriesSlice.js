import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"],
  activeCategory: 0,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    onToggleActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { onToggleActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
