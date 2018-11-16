import React from 'react';
import Aux from '../../hocs/ax';
import styles from './Layout.module.css';
import classLister from 'css-module-class-lister';

const classes = classLister( styles );

const Layout = props => (
  <Aux>
    <div>Toolbar, Side Drawer, Backdrop</div>
    <main className={classes( 'main' )}>{props.children}</main>
  </Aux>
);

export default Layout;
