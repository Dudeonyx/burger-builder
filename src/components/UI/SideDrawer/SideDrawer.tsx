import React, {
  FunctionComponent,
  MouseEventHandler,
  lazy,
  Suspense,
} from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Logo = lazy( () => import( '../Logo/Logo' ) );

export interface ISideDrawerProps {
  open: boolean;
  hider: MouseEventHandler;
}

const SideDrawer: FunctionComponent<ISideDrawerProps> = ( { open, hider } ) => {
  const allSideDrawerClasses = `${styles.SideDrawer} ${
    open ? styles.Open : styles.Close
  }`;
  return (
    <>
      <Backdrop show={open} hider={hider} />
      <div className={allSideDrawerClasses}>
        <Suspense fallback={<p>Logo...</p>}>
          <Logo height="11%" link="##" />
        </Suspense>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
