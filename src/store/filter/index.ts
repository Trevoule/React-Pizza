import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export interface Params {
  sort: string;
  categoryId: number;
  currentPage: number;
}

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
    },

    setFilters(state: FilterState, { payload }: PayloadAction<Params>) {
      const { sort, categoryId, currentPage } = payload;

      state.categoryId = categoryId;
      state.currentPage = currentPage;

      const sortType = sortTypes.find((type) => type.sort === sort) as SortType;
      state.sortType = sortType;
    }
  }
});

export const {
  setIsLoading,
  setCategoryId,
  setCurrentPage,
  setSearchValue,
  setSortType,
  resetSearchValue,
  setFilters
} = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;
export const selectIsLoading = (state: RootState) => state.filter.isLoading;
export const selectCategoryId = (state: RootState) => state.filter.categoryId;
export const selectCurrentPage = (state: RootState) => state.filter.currentPage;
export const selectSearchValue = (state: RootState) => state.filter.searchValue;
export const selectSortType = (state: RootState) => state.filter.sortType;

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
