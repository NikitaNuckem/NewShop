import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./productsAPI";
import type { Product } from "../../types/Product";

interface State {
  items: Product[];
  status: "idle" | "loading" | "success" | "error";
}

const initialState: State = {
  items: [],
  status: "idle",
};

export const getProducts = createAsyncThunk("products/get", async () => {
  return await fetchAllProducts();
});

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getProducts.pending, (s) => {
      s.status = "loading";
    });
    b.addCase(getProducts.fulfilled, (s, a) => {
      s.status = "success";
      s.items = a.payload.products;
    });
    b.addCase(getProducts.rejected, (s) => {
      s.status = "error";
    });
  },
});

export default slice.reducer;