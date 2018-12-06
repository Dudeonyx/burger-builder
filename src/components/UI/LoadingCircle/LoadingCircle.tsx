import React, { CSSProperties, FunctionComponent } from 'react';
import styles from './LoadingCircle.module.css';

interface ILoadingCircleProps {
  /** Used to set the size of the  Loading circle using a css variable called --size.
   * @default "80px"
   */
  style?: { '--size': string };
}
/** A Loading Circle. */
export const LoadingCircle: FunctionComponent<ILoadingCircleProps> = props => (
  <div style={{ ...(props.style as any) }} className={styles.Wrap}>
    <div className={styles.Circle} />
  </div>
);

export default LoadingCircle;
