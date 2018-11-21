import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from './DrawerToggle/DrawerToggle';

const Toolbar = props => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={props.drawerToggler} />
      <Logo link="##" />
      <nav className={styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
