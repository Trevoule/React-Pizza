import React from 'react';
import { useAppSelector } from 'store/hooks';

import PizzaItem from '../PizzaItem';
import PizzaItemSkeleton from '../PizzaItem/PizzaItemSkeleton';

import { selectItems, selectPizza, Status } from 'store/pizza';

const PizzaList = () => {
  const items = useAppSelector(selectItems);
  const { status } = useAppSelector(selectPizza);

  return (
    <div className="content__items">
      {status === Status.loading
        ? Array.from({ length: 6 }).map((_, index) => <PizzaItemSkeleton key={index} />)
        : items.map((pizza) => {
            return <PizzaItem key={pizza.id} {...pizza} />;
          })}
    </div>
  );
};

export default PizzaList;
