import { create } from "zustand";
import { api } from "@/lib/api";
import {Product} from '../Type/products'
interface ProductState {
  products: Product[];
  total: number;
  fetchProducts: (limit: number, skip: number) => Promise<void>;
  searchProducts: (q: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  total: 0,

  fetchProducts: async (limit, skip) => {
    const res = await api.get(`/products?limit=${limit}&skip=${skip}`);
    set({ products: res.data.products, total: res.data.total });
  },

  searchProducts: async (q) => {
    const res = await api.get(`/products/search?q=${q}`);
    set({ products: res.data.products, total: res.data.total });
  },


}));
