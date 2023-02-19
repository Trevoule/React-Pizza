import React from 'react';
import { categories } from 'constants/common';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCategoryId, setCategoryId } from 'store/filter';

const Categories = () => {
  const dispatch = useAppDispatch();

  const categoryId = useAppSelector(selectCategoryId);

  const onHandleCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <div key={index}>
              <li
                onClick={onHandleCategory.bind(null, index)}
                className={categoryId === index ? 'active' : ''}>
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
