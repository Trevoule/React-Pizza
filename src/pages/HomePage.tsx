/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import Categories from 'components/Categories';
import PizzaList from 'components/Pizza/PizzaList';
import SortBy from 'components/SortBy';

import { pizzasUrl } from 'constants/common';
import Pagination from 'components/Pagination';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  selectCategoryId,
  selectCurrentPage,
  selectSearchValue,
  selectSortType,
  setIsLoading
} from 'store/filter';
import { setItems } from 'store/pizza';

const HomePage = () => {
  const dispatch = useAppDispatch();

  const categoryId = useAppSelector(selectCategoryId);
  const searchValue = useAppSelector(selectSearchValue);
  const sortType = useAppSelector(selectSortType);
  const currentPage = useAppSelector(selectCurrentPage);

  useEffect(() => {
    dispatch(setIsLoading(true));
    const filterByCategory = !!categoryId && `&category=${categoryId}`;
    const search = searchValue && `&search=${searchValue}`;
    fetch(
      `${pizzasUrl}?page=${currentPage}&limit=4&order=${sortType.order}&sortBy=${sortType.sort}${filterByCategory}${search}`
    )
      .then((res) => res.json())
      .then((items) => dispatch(setItems(items)))
      .finally(() => dispatch(setIsLoading(false)));
    // scroll to top
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <SortBy />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <PizzaList />
      <Pagination />
    </div>
  );
};

export default HomePage;
