import axios from "../../api/axiosConfig";
import { toast } from "react-toastify";
import {
  loadProduct,
  removeProduct,
  addProduct,
} from "../reducers/productSlice";

export const asyncLoadProducts = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/products");
    dispatch(loadProduct(data));
  } catch (error) {
    console.log(error);
  }
};

export const asyncUpdateProduct = (product) => async (dispatch, getState) => {
  try {
    await axios.patch("/products" + product.id, product);
    dispatch(asyncLoadProducts());
  } catch (error) {
    console.log(error);
  }
};

export const asyncCreateProduct = (product) => async (dispatch, getState) => {
  try {
    await axios.post("/products", product);
    dispatch(addProduct(product));
    toast.success("Product creation successful!");

    return true;
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Product creation failed. Please try again.",
    );

    throw error;
  }
};

export const asyncDeleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/products/${id}`);

    dispatch(removeProduct(id));

    toast.success("Product deleted successfully!");

    return true;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete product.");
    throw error;
  }
};
