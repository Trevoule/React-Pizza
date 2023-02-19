import { createSlice } from '@reduxjs/toolkit';
import { Pizza } from 'constants/common';
import { RootState } from 'store/rootStore';

interface PizzaState {
  items: [] | Pizza[];
}

const initialState: PizzaState = {
  items: []
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state: PizzaState, { payload }) {
      state.items = payload as Pizza[];
    }
  }
});

export const { setItems } = pizzaSlice.actions;

export const selectItems = (state: RootState) => state.pizza.items;

export const pizzaActions = pizzaSlice.actions;

export default pizzaSlice.reducer;
