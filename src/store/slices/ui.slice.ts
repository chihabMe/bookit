import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
};

const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;
