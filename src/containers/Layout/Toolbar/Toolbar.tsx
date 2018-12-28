import React, {
  FunctionComponent,
  lazy,
  MouseEventHandler,
  Suspense,
} from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from './DrawerToggle/DrawerToggle';
import styles from './Toolbar.module.css';
import Logo from '../../../components/UI/Logo/Logo';

// const Logo = lazy(() =>
//   import(/* webpackChunkName: "Logo" */ '../../../components/UI/Logo/Logo')
// );

export interface IToolbarProps {
  drawerToggler: MouseEventHandler;
  isAuth: boolean;
}
const Toolbar: FunctionComponent<IToolbarProps> = ({ drawerToggler,isAuth },) => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={drawerToggler} />
      <Logo link="/" HQ={true} />
      <nav className={styles.DesktopOnly}>
        <NavigationItems isAuth={isAuth}/>
      </nav>
    </header>
  );
};

export default Toolbar;
