/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { SearchContext, SearchContextType } from 'store/SearchProvider';

import styles from './Search.module.scss';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext) as SearchContextType;

  const onHandleSearchValue = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      setSearchValue(e.target.value);
    } else {
      setSearchValue('');
    }
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
        value={searchValue}
        onChange={onHandleSearchValue}
        className={styles.input}
        placeholder="Search for pizza"
      />
      {searchValue && (
        <svg
          onClick={() => onHandleSearchValue()}
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
