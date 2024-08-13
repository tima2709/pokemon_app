import React from 'react';
import styles from './loader.module.css';

export function Loader() {
  return (
    <div className={styles.loader_wrapper} data-testid="loader">
      <img className={styles.loader} src="/pokeball.svg" alt="loader"></img>
    </div>
  );
}
