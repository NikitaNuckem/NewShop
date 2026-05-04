import axios from "axios";
import type { ProductsResponse, Product } from "../../types/Product";

const API = "https://dummyjson.com/products";

export const fetchAllProducts = async (): Promise<ProductsResponse> => {
  const res = await axios.get(`${API}?limit=100`);
  return res.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};