import { Product } from "@prisma/client";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = state.cartItems.find(
        (el) => el.product.id === action.payload.product.id
      );

      if (product) {
        if (
          product.quantity + action.payload.quantity >
          action.payload.product.quantity
        ) {
          product.quantity;
        } else {
          product.quantity += action.payload.quantity;
        }
      } else {
        state.cartItems.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const indexDelete = state.cartItems.findIndex(
        (el) => el.product.id === action.payload
      );

      state.cartItems.splice(indexDelete, 1);
    },

    increment: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find(
        (el) => el.product.id === action.payload.id
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decrement: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find(
        (el) => el.product.id === action.payload.id
      );

      if (item) {
        item.quantity -= 1;
      }
    },

    resetCart: (state) => {
      state.cartItems = [];
    },
  },
});

const cartItems = (state: RootState) => state.cart.cartItems;

export const totalPriceSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, curr: CartItem) =>
      (total += curr.product.price * curr.quantity),
    0
  )
);

export const { addToCart, removeFromCart, increment, decrement, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
