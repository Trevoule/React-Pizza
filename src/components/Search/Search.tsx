/* eslint-disable no-unused-vars */
import React, { useCallback, useRef, useState } from 'react';
import { resetSearchValue, setSearchValue } from 'store/filter';
import { useAppDispatch } from 'store/hooks';

import styles from './Search.module.scss';
import debounce from 'lodash.debounce';

const Search = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeInput = useCallback(
    debounce((str) => dispatch(setSearchValue(str)), 250),
    []
  );

  const onHandleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChangeInput(e.target.value);
  };

  const onClickReset = () => {
    dispatch(resetSearchValue());
    setValue('');
    inputRef.current && inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onHandleSearchValue}
        className={styles.input}
        placeholder="Search for pizza"
      />
      {value && (
        <svg
          onClick={onClickReset}
          className={styles.clearIcon}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
