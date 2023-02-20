import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearCart, ICartItem, selectCart } from 'store/cart';

import IconSVG from 'components/ui/IconSVG';
import CartItem from '../CartItem';
import CartEmpty from '../CartEmpty';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cartItems, totalSum } = useAppSelector(selectCart);

  const onHandleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const isCartItems = useMemo(() => {
    return !!cartItems.length;
  }, [cartItems]);

  const totalCartItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
  }, [cartItems]);

  if (!isCartItems) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <IconSVG icon="cart" />
            Your Cart
          </h2>
          <div className="cart__clear" onClick={onHandleClearCart}>
            <IconSVG icon="trash" width={20} height={20} />
            <span>Clear cart</span>
          </div>
        </div>
        <div className="content__items">
          {cartItems.map((cartItem: ICartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                Total amount: <b>{totalCartItems} items</b>
              </span>
              <span>
                Order total: <b>{totalSum} PLN</b>
              </span>
            </div>
            <div className="cart__bottom-buttons">
              <Link to="/" className="button button--outline button--add go-back-btn">
                <IconSVG icon="grey-arrow-left" width={8} height={14} />
                Back to Menu
              </Link>
              <div className="button pay-btn">
                <span>Pay now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
