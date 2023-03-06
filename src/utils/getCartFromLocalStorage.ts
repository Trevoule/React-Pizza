import { calcTotalSum } from './calcTotalSum';

export const getCartFromLS = () => {
  const localStorageCart = localStorage.getItem('cart');
  const cartItems = localStorageCart ? JSON.parse(localStorageCart) : [];
  const totalSum = cartItems.length ? calcTotalSum(cartItems) : 0;

  return {
    cartItems,
    totalSum
  };
};
