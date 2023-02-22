import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { Pizza, pizzaTypes } from 'constants/common';
import { fetchPizzaById, selectPizzaItemById } from 'store/pizza';
import styles from './PizzaInfo.module.scss';
import IconSVG from 'components/ui/IconSVG';
import { addToCart, ICartItem, selectCountItems } from 'store/cart';

const PizzaInfo = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const pizzaItem = useAppSelector(selectPizzaItemById);
  const countItems = useAppSelector(selectCountItems(id as string));

  const [activeSize, setActiveSize] = useState(0);
  const [activePizzaType, setActivePizzaType] = useState(0);

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);

    id && dispatch(fetchPizzaById(id));
  }, [id]);

  if (!pizzaItem) {
    return (
      <div className={`container ${styles.loading}`}>
        <h2>Loading...</h2>
      </div>
    );
  }

  const { imageUrl, title, price, types, sizes } = pizzaItem as Pizza;

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
    <div className={`container ${styles.root}`}>
      <h2>{title} pizza</h2>
      {<img src={imageUrl} />}
      <div className="pizza-block__selector">
        <ul>
          {types &&
            types.map((typeId) => {
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
          {sizes &&
            sizes.map((size, index) => {
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
        <div className="pizza-block__price">{price} PLN</div>
        <div className="button button--outline button--add" onClick={onHandleAddToCart}>
          <IconSVG icon="add" width={10} height={10} color="#fe5f1e" />
          <span>Add</span>
          <i>{countItems || 0}</i>
        </div>
      </div>
    </div>
  );
};

export default PizzaInfo;
