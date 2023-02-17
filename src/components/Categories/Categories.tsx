import { categories } from 'constants/common';
import React, { useState } from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onClickCategory = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <div key={index}>
              <li
                onClick={onClickCategory.bind(null, index)}
                className={activeIndex === index ? 'active' : ''}>
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
