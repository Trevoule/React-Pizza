import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import filterSliceReducer from './filter';
import pizzaSliceReducer from './pizza';
import cartSliceReducer from './cart';

export const store = configureStore({
  reducer: {
    filter: filterSliceReducer,
    pizza: pizzaSliceReducer,
    cart: cartSliceReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
