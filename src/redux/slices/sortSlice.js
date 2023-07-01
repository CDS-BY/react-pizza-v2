import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSort: {
    name: "популярности (DESC)",
    sortProperty: "-rating",
  },
  isOpenSortList: false,
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    onSetActiveSort: (state, action) => {
      state.activeSort = action.payload;
    },
    onToggleSortList: (state, action) => {
      state.isOpenSortList = action.payload;
    },
  },
});

export const selectSort = (state) => state.sort;

export const { onSetActiveSort, onToggleSortList } = sortSlice.actions;
export default sortSlice.reducer;