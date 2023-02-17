import React from 'react';

import { Pizza } from 'constants/common';

import PizzaItem from '../PizzaItem';
import PizzaItemSkeleton from '../PizzaItem/PizzaItemSkeleton';

interface Props {
  isLoading: boolean;
  items: Pizza[];
}

const PizzaList = ({ isLoading, items }: Props) => {
  return (
    <div className="content__items">
      {!isLoading
        ? Array.from({ length: 6 }).map((_, index) => <PizzaItemSkeleton key={index} />)
        : items.map((pizza) => {
            return <PizzaItem key={pizza.id} {...pizza} />;
          })}
    </div>
  );
};

export default PizzaList;
