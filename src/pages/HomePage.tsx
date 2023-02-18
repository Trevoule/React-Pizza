import React, { useEffect, useState } from 'react';

import Categories from 'components/Categories';
import PizzaList from 'components/Pizza/PizzaList';
import SortBy from 'components/SortBy';

import { pizzasUrl, SortType, sortTypes } from 'constants/common';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState<SortType>(sortTypes[0]);

  useEffect(() => {
    setIsLoading(true);
    const filterByCategory = `category=${categoryId}`;

    fetch(
      `${pizzasUrl}?${categoryId && filterByCategory}&sortBy=${sortType.sort}&order=${
        sortType.order
      }`
    )
      .then((res) => res.json())
      .then((items) => setItems(items))
      .finally(() => setIsLoading(false));

    // scroll to top
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id: number) => setCategoryId(id)} />
        <SortBy sortType={sortType} onHandleSortBy={(type: SortType) => setSortType(type)} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <PizzaList isLoading={isLoading} items={items} />
    </div>
  );
};

export default HomePage;
