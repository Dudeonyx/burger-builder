import React from 'react';
import styles from './LoadingCircle.module.css';

/** A Loading Circle. */
export const LoadingCircle = props => (
  <div style={{ ...props.style }} className={styles.Wrap}>
    <div className={styles.Circle} />
  </div>
);

export default LoadingCircle;
