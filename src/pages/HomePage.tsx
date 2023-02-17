import React, { useEffect, useState } from 'react';

import Categories from 'components/Categories';
import PizzaList from 'components/Pizza/PizzaList';
import SortBy from 'components/SortBy';

import { pizzasUrl } from 'constants/common';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(pizzasUrl)
      .then((res) => res.json())
      .then((items) => setItems(items))
      .finally(() => setIsLoading(false));

    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <SortBy />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <PizzaList isLoading={isLoading} items={items} />
    </div>
  );
};

export default HomePage;
