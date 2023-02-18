import React from 'react';
import { categories } from 'constants/common';

interface Props {
  categoryId: number;
  // eslint-disable-next-line no-unused-vars
  onClickCategory: (id: number) => void;
}

const Categories = ({ categoryId, onClickCategory }: Props) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <div key={index}>
              <li
                onClick={onClickCategory.bind(null, index)}
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
