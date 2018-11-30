import React, {
  lazy,
  Suspense,
  FunctionComponent,
  MouseEventHandler,
} from 'react';
import styles from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from './DrawerToggle/DrawerToggle';
// import Logo from '../Logo/Logo';

const Logo = lazy( () => import( /* webpackChunkName: "Logo" */ '../Logo/Logo' ) );

export interface IToolbar {
  drawerToggler: MouseEventHandler;
}
const Toolbar: FunctionComponent<IToolbar> = ( { drawerToggler } ) => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={drawerToggler} />
      <Suspense fallback={<p>Logo...</p>}>
        <Logo link="##" />
      </Suspense>
      <nav className={styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
