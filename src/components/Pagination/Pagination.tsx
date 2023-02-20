/* eslint-disable no-unused-vars */
import React from 'react';

import ReactPaginate from 'react-paginate';
import { selectCurrentPage, setCurrentPage } from 'store/filter';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import styles from './Pagination.module.scss';

const Pagination = () => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(selectCurrentPage);
  const onPageChange = (e: { selected: number }) => {
    const page = e.selected + 1;

    dispatch(setCurrentPage(page));
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
        forcePage={currentPage - 1}
      />
    </>
  );
};

export default Pagination;
