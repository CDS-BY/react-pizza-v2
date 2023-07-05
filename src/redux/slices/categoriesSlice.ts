import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CategoriesSliceState {
  items: string[];
  activeCategoryId: number;
}

const initialState: CategoriesSliceState = {
  items: ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"],
  activeCategoryId: 0,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setActiveCategoryId: (state, action: PayloadAction<number>) => {
      state.activeCategoryId = action.payload;
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;

export const { setActiveCategoryId } = categoriesSlice.actions;
export default categoriesSlice.reducer;
