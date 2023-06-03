import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    onChangeSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    onDeleteSearchValue: (state) => {
      state.searchValue = "";
    },
  },
});

export const { onChangeSearchValue, onDeleteSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
