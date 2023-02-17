import React from 'react';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br /> Nothing was found
      </h1>
      <p className={styles.description}>Unfortunately requested page does not exist in our store</p>
    </div>
  );
};

export default NotFound;
