import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface SortSliceState {
  activeSort: Sort;
  isOpenSortList?: boolean;
}

const initialState: SortSliceState = {
  activeSort: {
    name: "популярности (DESC)",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  isOpenSortList: false,
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    onSetActiveSort: (state, action: PayloadAction<Sort>) => {
      state.activeSort = action.payload;
    },
    onToggleSortList: (state, action: PayloadAction<boolean>) => {
      state.isOpenSortList = action.payload;
    },
  },
});

export const selectSort = (state: RootState) => state.sort;

export const { onSetActiveSort, onToggleSortList } = sortSlice.actions;
export default sortSlice.reducer;
