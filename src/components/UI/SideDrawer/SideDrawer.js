import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Aux from '../../../hocs/ax';
import Backdrop from '../Backdrop/Backdrop';

const SideDrawer = props => {
  const allSideDrawerClasses = [styles.SideDrawer];
  props.open
    ? allSideDrawerClasses.push( styles.Open )
    : allSideDrawerClasses.push( styles.Close );
  return (
    <Aux>
      <Backdrop show={props.open} hider={props.hiden} />
      <div className={allSideDrawerClasses.join( ' ' )}>
        <Logo height="11%" link="##" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;