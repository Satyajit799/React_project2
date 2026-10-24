import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
};

const productSlice = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    loadProduct: (state, action) => {
      state.products = action.payload;
    },

    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => String(product.id) !== String(action.payload),
      );
    },
  },
});

export const { loadProduct, addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
