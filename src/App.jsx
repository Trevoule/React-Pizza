import React, { useEffect, useState } from 'react';

import Categories from 'components/Categories';
import Header from 'components/Header';
import SortBy from 'components/SortBy';
import { pizzasUrl } from 'constants/common';

import 'scss/app.scss';
import PizzaList from 'components/Pizza/PizzaList';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(pizzasUrl)
      .then((res) => res.json())
      .then((items) => setItems(items))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <SortBy />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <PizzaList isLoading={isLoading} items={items} />
        </div>
      </div>
    </div>
  );
}

export default App;
