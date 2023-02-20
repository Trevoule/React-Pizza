import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectCart } from 'store/cart';

import Search from 'components/Search';
import IconSVG from 'components/ui/IconSVG';

const Header = () => {
  const { cartItems, totalSum } = useAppSelector(selectCart);

  const totalCartItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
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
