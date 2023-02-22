import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PizzaBase } from 'constants/common';
import { RootState } from 'store/rootStore';

export interface ICartItem extends PizzaBase {
  pizzaType: string;
  size: number;
  qty: number;
}

interface CartState {
  cartItems: ICartItem[];
  totalSum: number;
}

const initialState: CartState = {
  cartItems: [],
  totalSum: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state: CartState, { payload }: PayloadAction<ICartItem>) {
      const existingCartItem = state.cartItems.findIndex((cartItem) => cartItem.id === payload.id);

      if (existingCartItem !== -1) {
        state.cartItems[existingCartItem].qty++;
      } else {
        const updatedCart = [...state.cartItems, { ...payload, qty: 1 }];
        state.cartItems = updatedCart;
      }

      state.totalSum = state.cartItems.reduce((sum, obj) => {
        return (sum += obj.price * obj.qty);
      }, 0);
    },

    plusQtyItem(state: CartState, { payload }: PayloadAction<{ id: string; price: number }>) {
      const updatedItems = state.cartItems.map((cartItem) => {
        if (cartItem.id === payload.id) {
          cartItem.qty++;
        }
        return cartItem;
      });

      state.cartItems = updatedItems;

      state.totalSum = state.cartItems.reduce((sum, obj) => {
        return (sum += obj.price * obj.qty);
      }, 0);
    },

    minusQtyItem(state: CartState, { payload }: PayloadAction<{ id: string; price: number }>) {
      const updatedItems = state.cartItems.reduce((acc, curCartItem) => {
        if (curCartItem.id === payload.id && curCartItem.qty > 1) {
          curCartItem.qty--;
          acc.push(curCartItem);
        }

        if (curCartItem.id !== payload.id) {
          acc.push(curCartItem);
        }

        return acc;
      }, [] as ICartItem[]);

      state.cartItems = updatedItems;
      state.totalSum = state.cartItems.reduce((sum, obj) => {
        return (sum += obj.price * obj.qty);
      }, 0);
    },

    removeFromCart(state: CartState, { payload }) {
      const updatedState = state.cartItems.filter((item) => item.id !== payload);
      state.cartItems = updatedState;
      state.totalSum = state.cartItems.reduce((sum, obj) => {
        return (sum += obj.price * obj.qty);
      }, 0);
    },

    clearCart(state: CartState) {
      state.cartItems = [];
      state.totalSum = 0;
    }
  }
});

export const { addToCart, plusQtyItem, minusQtyItem, clearCart, removeFromCart } =
  cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartTotalSum = (state: RootState) => state.cart.totalSum;
export const selectCountItems = (id: string) => (state: RootState) =>
  state.cart.cartItems.find((cartItem) => cartItem.id === id)?.qty;
export const selectTotalCartItems = (state: RootState) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.qty, 0);

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
