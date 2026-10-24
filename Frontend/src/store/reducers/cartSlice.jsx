import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state, action) => {//It always sync , here we can not call api
      state.carts = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { loadCart } = cartSlice.actions;
