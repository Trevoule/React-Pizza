import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { categories } from 'constants/common';
import { selectCategoryId, setCategoryId, setCurrentPage } from 'store/filter';

const Categories = () => {
  const dispatch = useAppDispatch();

  const categoryId = useAppSelector(selectCategoryId);

  const onHandleCategory = (index: number) => {
    dispatch(setCategoryId(index));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <div key={index}>
              <li
                onClick={onHandleCategory.bind(null, index)}
                className={+categoryId === index ? 'active' : ''}>
                {category}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
