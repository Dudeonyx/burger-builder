import React, { FunctionComponent, MouseEventHandler } from 'react';
import styles from './Backdrop.module.css';

export interface IBackdropProps {
  show: boolean;
  hider: MouseEventHandler;
}

const Backdrop: FunctionComponent<IBackdropProps> = ( { show, hider } ) => {
  return show ? <div className={styles.Backdrop} onClick={hider} /> : null;
};

export default Backdrop;
