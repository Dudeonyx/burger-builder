import React, {
  FunctionComponent,
  lazy,
  MouseEventHandler,
  Suspense,
} from 'react';
import Backdrop from '../Backdrop/';
import NavigationItems from '../NavigationItems/';
import styles from './SideDrawer.module.css';

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
          <Logo height="11%" link="##" HQ={true} />
        </Suspense>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
