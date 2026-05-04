import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";

interface CartItem extends Product {
  quantity: number;
}

interface State {
  items: CartItem[];
}

const initialState: State = {
  items: [],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(i => i.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    increaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeItem,
} = slice.actions;

export default slice.reducer;