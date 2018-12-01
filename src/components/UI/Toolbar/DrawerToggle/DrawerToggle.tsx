import React, { MouseEventHandler, FunctionComponent } from 'react';
import styles from './DrawerToggle.module.css';

export interface IDrawerToggle {
  clicked: MouseEventHandler;
}

const DrawerToggle: FunctionComponent<IDrawerToggle> = ( { clicked } ) => {
  return (
    <div onClick={clicked} className={styles.DrawerToggle}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default DrawerToggle;
