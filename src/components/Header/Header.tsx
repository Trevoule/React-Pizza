import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

import Search from 'components/Search';
import IconSVG from 'components/ui/IconSVG';

import { selectCart, selectCartItems, selectTotalCartItems } from 'store/cart';

const Header = () => {
  const { totalSum } = useAppSelector(selectCart);
  const totalCartItems = useAppSelector(selectTotalCartItems);

  const cartItems = useAppSelector(selectCartItems);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cartItems);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [cartItems]);

  return (
    <div className="header">
      <div className="container">
        <Link to={'/'}>
          <div className="header__logo">
            <IconSVG width={38} height={38} icon={'pizza-logo'} />
            <div>
              <h1>React Pizza</h1>
              <p>Most delicious React pizza on the planet!</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalSum} PLN</span>
            <div className="button__delimiter"></div>
            <IconSVG icon={'cart'} width={18} height={18} color="white" />
            <span>{totalCartItems}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
