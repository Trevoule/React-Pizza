import { createSlice } from '@reduxjs/toolkit';
import { SortType, sortTypes } from 'constants/common';
import { RootState } from '../rootStore';

export interface FilterState {
  isLoading: boolean;
  currentPage: number;
  sortType: SortType;
  categoryId: number;
  searchValue: string;
}

const initialState: FilterState = {
  isLoading: true,
  currentPage: 1,
  sortType: sortTypes[0],
  categoryId: 0,
  searchValue: ''
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setIsLoading(state: FilterState, { payload }) {
      state.isLoading = payload;
    },

    setCurrentPage(state: FilterState, { payload }) {
      state.currentPage = payload;
    },

    setSortType(state: FilterState, { payload }) {
      state.sortType = payload;
    },

    setCategoryId(state: FilterState, { payload }) {
      state.categoryId = payload;
    },

    setSearchValue(state: FilterState, { payload }) {
      state.searchValue = payload;
    },

    resetSearchValue(state: FilterState) {
      state.searchValue = '';
    }
  }
});

export const {
  setIsLoading,
  setCategoryId,
  setCurrentPage,
  setSearchValue,
  setSortType,
  resetSearchValue
} = filterSlice.actions;

export const selectIsLoading = (state: RootState) => state.filter.isLoading;
export const selectCategoryId = (state: RootState) => state.filter.categoryId;
export const selectCurrentPage = (state: RootState) => state.filter.currentPage;
export const selectSearchValue = (state: RootState) => state.filter.searchValue;
export const selectSortType = (state: RootState) => state.filter.sortType;

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
