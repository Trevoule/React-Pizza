/* eslint-disable no-unused-vars */
import React, { useCallback, useRef, useState } from 'react';
import { resetSearchValue, setSearchValue } from 'store/filter';
import { useAppDispatch } from 'store/hooks';

import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import IconSVG from 'components/ui/IconSVG';

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
      <IconSVG icon="search" width={24} height={24} className={styles.icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onHandleSearchValue}
        className={styles.input}
        placeholder="Search for pizza"
      />
      {value && <IconSVG icon="clear" width={48} height={48} className={styles.clearIcon} />}
    </div>
  );
};

export default Search;
