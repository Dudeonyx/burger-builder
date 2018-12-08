import React, {
  FunctionComponent,
  lazy,
  MouseEventHandler,
  Suspense
} from 'react';
import NavigationItems from '../NavigationItems/';
import DrawerToggle from './DrawerToggle/';
import styles from './Toolbar.module.css';
// import Logo from '../Logo/Logo';

const Logo = lazy(() =>
  import(/* webpackChunkName: "Logo" */ '../../../components/UI/Logo')
);

export interface IToolbarProps {
  drawerToggler: MouseEventHandler;
}
const Toolbar: FunctionComponent<IToolbarProps> = ({ drawerToggler }) => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={drawerToggler} />
      <Suspense fallback={<p>Logo...</p>}>
        <Logo link="/" HQ={true} />
      </Suspense>
      <nav className={styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;