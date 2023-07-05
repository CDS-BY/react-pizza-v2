import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SearchSliceState {
  searchValue: string;
}

const initialState: SearchSliceState = {
  searchValue: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    onChangeSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    onDeleteSearchValue: (state) => {
      state.searchValue = "";
    },
  },
});

export const selectSearch = (state: RootState) => state.search;

export const { onChangeSearchValue, onDeleteSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
