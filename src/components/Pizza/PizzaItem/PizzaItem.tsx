import React, { useState } from 'react';

import { Pizza, pizzaTypes } from 'constants/common';
import IconSVG from 'components/ui/IconSVG';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { addToCart, ICartItem, selectCountItems } from 'store/cart';
import { Link } from 'react-router-dom';

const PizzaItem = ({ id, imageUrl, title, sizes, price, types }: Pizza) => {
  const dispatch = useAppDispatch();
  const countItems = useAppSelector(selectCountItems(id));

  const [activeSize, setActiveSize] = useState(0);
  const [activePizzaType, setActivePizzaType] = useState(0);

  const onClickPizzaType = (index: number) => {
    setActivePizzaType(index);
  };

  const onClickSize = (index: number) => {
    setActiveSize(index);
  };

  const onHandleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        imageUrl,
        title,
        price,
        size: activeSize,
        pizzaType: pizzaTypes[activePizzaType]
      } as ICartItem)
    );
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt={title} />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
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
          <div className="button button--outline button--add" onClick={onHandleAddToCart}>
            <IconSVG icon="add" width={10} height={10} color="#fe5f1e" />
            <span>Add</span>
            <i>{countItems || 0}</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
