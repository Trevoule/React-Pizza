/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, pizzasUrl, SortType } from 'constants/common';
import { RootState } from 'store/rootStore';

export enum Status {
  loading = 'Loading',
  success = 'Successful',
  failed = 'Failed'
}

interface PizzaState {
  items: [] | Pizza[];
  item: null | Pizza;
  status: Status;
}

const initialState: PizzaState = {
  items: [],
  item: null,
  status: Status.loading
};

export interface IFetchPizza {
  sortType: SortType;
  currentPage: number;
  searchValue: string;
  categoryId: number;
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({ currentPage, sortType, categoryId, searchValue }: IFetchPizza) => {
    const filterByCategory = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      const res = await axios.get(
        `${pizzasUrl}?page=${currentPage}&limit=4&order=${sortType.order}&f&sortBy=${sortType.sort}${filterByCategory}${search}`
      );

      if (res.data.length > 0) {
        return res.data;
      }

      throw new Error();
    } catch (error) {
      throw new Error('Fetch failed!');
    }
  }
);

export const fetchPizzaById = createAsyncThunk('pizza/fetchPizzaById', async (id: string) => {
  try {
    const res = await axios.get(`${pizzasUrl}/${id}`);

    return res.data;
  } catch (error) {
    throw new Error('Fetch failed!');
  }
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state: PizzaState, { payload }: PayloadAction<Pizza[]>) {
      state.items = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state: PizzaState) => {
      state.status = Status.loading;
      state.items = [];
    }),
      builder.addCase(
        fetchPizzas.fulfilled,
        (state: PizzaState, action: PayloadAction<Pizza[]>) => {
          state.items = action.payload;
          state.status = Status.success;
        }
      ),
      builder.addCase(fetchPizzas.rejected, (state: PizzaState) => {
        state.status = Status.failed;
        state.items = [];
      }),
      builder.addCase(fetchPizzaById.pending, (state: PizzaState) => {
        state.status = Status.loading;
        state.item = null;
      }),
      builder.addCase(
        fetchPizzaById.fulfilled,
        (state: PizzaState, action: PayloadAction<Pizza>) => {
          state.item = action.payload;
          state.status = Status.success;
        }
      ),
      builder.addCase(fetchPizzaById.rejected, (state: PizzaState) => {
        state.status = Status.failed;
        state.item = null;
      });
  }
});

export const { setItems } = pizzaSlice.actions;

export const selectPizza = (state: RootState) => state.pizza;
export const selectItems = (state: RootState) => state.pizza.items;
export const selectPizzaItemById = (state: RootState) => state.pizza.item;

export const pizzaActions = pizzaSlice.actions;

export default pizzaSlice.reducer;
