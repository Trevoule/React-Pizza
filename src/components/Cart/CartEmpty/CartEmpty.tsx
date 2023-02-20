/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import emptyCart from 'assets/images/empty-cart.png';

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Cart is empty <i>😕</i>
      </h2>
      <p>
        It looks like you haven't ordered any pizza yet...
        <br />
        For order please go to the main page
      </p>
      <img src={emptyCart} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>go to main</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
