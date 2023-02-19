/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react';

interface SearchContextProps {
  children: React.ReactNode;
}

export interface SearchContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const SearchContext = React.createContext<Partial<SearchContextType>>({});

const SearchProvider = ({ children }: SearchContextProps) => {
  const [searchValue, setSearchValue] = useState('');

  const inputChange = useCallback(
    (value: string) => {
      setSearchValue(value);
    },
    [searchValue]
  );

  const providerData = useMemo(
    () => ({
      searchValue,
      setSearchValue: inputChange
    }),
    [searchValue, inputChange]
  );

  return <SearchContext.Provider value={providerData}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
