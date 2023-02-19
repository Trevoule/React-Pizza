/* eslint-disable no-unused-vars */
import React from 'react';

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

interface Props {
  onHandlePageChange: (page: number) => void;
}

const Pagination = ({ onHandlePageChange }: Props) => {
  const onPageChange = (e: { selected: number }) => {
    const page = e.selected + 1;

    onHandlePageChange(page);
  };

  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={onPageChange}
        pageRangeDisplayed={8}
        pageCount={3}
      />
    </>
  );
};

export default Pagination;
