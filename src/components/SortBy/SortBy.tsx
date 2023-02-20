/* eslint-disable no-unused-vars */
import IconSVG from 'components/ui/IconSVG';
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
        <IconSVG icon="chevron-top" width={10} height={6} />
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
