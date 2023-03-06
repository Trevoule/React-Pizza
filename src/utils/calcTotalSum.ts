import { ICartItem } from 'store/cart';

export const calcTotalSum = (cartItems: ICartItem[]) => {
  return cartItems.reduce((sum, obj) => {
    return (sum += obj.price * obj.qty);
  }, 0);
};
