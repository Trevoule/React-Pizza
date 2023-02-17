import React from 'react';

import Categories from './components/Categories';
import Header from './components/Header';
import PizzaItem from './components/Pizza/PizzaItem';
import SortBy from './components/SortBy';

import './scss/app.scss';

function App() {
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
          <div className="content__items">
            <PizzaItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
