/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';

import Categories from 'components/Categories';
import PizzaList from 'components/Pizza/PizzaList';
import SortBy from 'components/SortBy';

import { pizzasUrl, SortType, sortTypes } from 'constants/common';
import { SearchContext } from 'store/SearchProvider';
import Pagination from 'components/Pagination';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SearchContext);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState<SortType>(sortTypes[0]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const filterByCategory = categoryId ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `${pizzasUrl}?page=${currentPage}&limit=4&order=${sortType.order}&sortBy=${sortType.sort}${filterByCategory}${search}`
    )
      .then((res) => res.json())
      .then((items) => setItems(items))
      .finally(() => setIsLoading(false));

    // scroll to top
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const onHandlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id: number) => setCategoryId(id)} />
        <SortBy sortType={sortType} onHandleSortBy={(type: SortType) => setSortType(type)} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <PizzaList isLoading={isLoading} items={items} />
      <Pagination onHandlePageChange={onHandlePageChange} />
    </div>
  );
};

export default HomePage;
