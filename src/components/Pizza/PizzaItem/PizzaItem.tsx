import React, { useState } from 'react';

import { Pizza, pizzaTypes } from 'constants/common';
import { addToCart, CartItem, selectCart } from 'store/cart';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import IconSVG from 'components/ui/IconSVG';

const PizzaItem = ({ id, imageUrl, title, sizes, price, types }: Pizza) => {
  const dispatch = useAppDispatch();

  const [activeSize, setActiveSize] = useState(0);
  const [activePizzaType, setActivePizzaType] = useState(0);

  const { cartItems, totalQty, totalSum } = useAppSelector(selectCart);

  console.log(cartItems);
  console.log(totalQty);
  console.log(totalSum);

  const onClickPizzaType = (index: number) => {
    setActivePizzaType(index);
  };

  const onClickSize = (index: number) => {
    setActiveSize(index);
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt={title} />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => {
              return (
                <li
                  key={typeId}
                  onClick={onClickPizzaType.bind(null, typeId)}
                  className={activePizzaType === typeId ? 'active' : ''}>
                  {pizzaTypes[typeId]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((size, index) => {
              return (
                <li
                  key={size}
                  onClick={onClickSize.bind(null, index)}
                  className={activeSize === index ? 'active' : ''}>
                  {size} cm
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">from {price} PLN</div>
          <div
            className="button button--outline button--add"
            onClick={() => dispatch(addToCart({ id, title, size: sizes[0], price } as CartItem))}>
            <IconSVG icon="add" width={10} height={10} color="#fe5f1e" />
            <span>Add</span>
            <i>2</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
