import qs from 'qs';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import Categories from 'components/Categories';
import PizzaList from 'components/Pizza/PizzaList';
import SortBy from 'components/SortBy';
import Pagination from 'components/Pagination';
import Error from 'components/ui/Error';

import { selectFilter, Params, setFilters } from 'store/filter';
import { fetchPizzas, selectPizza, Status } from 'store/pizza';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, searchValue, sortType, currentPage } = useAppSelector(selectFilter);
  const { status } = useAppSelector(selectPizza);

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
      dispatch(fetchPizzas({ categoryId, searchValue, sortType, currentPage }));
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
      {status === Status.failed ? (
        <Error />
      ) : (
        <>
          <PizzaList />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default HomePage;
