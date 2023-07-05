import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type PaginationSliceState = {
  currentPage: number;
};

const initialState: PaginationSliceState = {
  currentPage: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const selectPagination = (state: RootState) => state.pagination;

export const { setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
