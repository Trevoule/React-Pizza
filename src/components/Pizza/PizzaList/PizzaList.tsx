import React from 'react';

import PizzaItem from '../PizzaItem';
import PizzaItemSkeleton from '../PizzaItem/PizzaItemSkeleton';
import { useAppSelector } from 'store/hooks';
import { selectItems } from 'store/pizza';
import { selectIsLoading } from 'store/filter';

const PizzaList = () => {
  const items = useAppSelector(selectItems);
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <div className="content__items">
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => <PizzaItemSkeleton key={index} />)
        : items.map((pizza) => {
            return <PizzaItem key={pizza.id} {...pizza} />;
          })}
    </div>
  );
};

export default PizzaList;
