/* eslint-disable no-unused-vars */
import { SortType, sortTypes } from 'constants/common';
import React, { useEffect, useRef, useState } from 'react';
import { selectSortType, setSortType } from 'store/filter';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const SortBy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(selectSortType);

  const sortRef = useRef<HTMLDivElement>(null);

  const onClickSortBy = (type: SortType) => {
    dispatch(setSortType(type));
    setIsOpen(false);
  };

  // listener for outside pop-up click
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      // check if sortRef in body
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    // listener for all body
    document.body.addEventListener('click', handleOutsideClick);

    // remove listener when unmounted
    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sorted by: </b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortType.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((type) => (
              <li
                key={type.id}
                className={type.id === sortType.id ? 'active' : ''}
                onClick={onClickSortBy.bind(null, type)}>
                {type.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortBy;
