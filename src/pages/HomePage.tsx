/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import axios from 'axios';
import qs from 'qs';

import Categories from 'components/Categories';
import PizzaList from 'components/Pizza/PizzaList';
import SortBy from 'components/SortBy';
import Pagination from 'components/Pagination';

import { pizzasUrl } from 'constants/common';
import { selectFilter, Params, setFilters, setIsLoading } from 'store/filter';
import { setItems } from 'store/pizza';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, searchValue, sortType, currentPage } = useAppSelector(selectFilter);

  const fetchPizzas = () => {
    dispatch(setIsLoading(true));
    const filterByCategory = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `${pizzasUrl}?page=${currentPage}&limit=4&order=${sortType.order}&sortBy=${sortType.sort}${filterByCategory}${search}`
      )
      .then((res) => dispatch(setItems(res.data)))
      .finally(() => dispatch(setIsLoading(false)));
  };

  useEffect(() => {
    // for check if first render
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          currentPage,
          sort: sortType.sort,
          categoryId
        },
        { addQueryPrefix: true }
      );
      navigate(queryString);
    }

    isMounted.current = true;
  }, [categoryId, sortType.order, currentPage]);

  useEffect(() => {
    const windowLocation = window.location.search;

    if (windowLocation) {
      const params = qs.parse(windowLocation.substring(1)) as unknown as Params;
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType.order, searchValue, currentPage]);

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
