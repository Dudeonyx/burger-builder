import React from 'react';
import Aux from '../../hocs/ax';
import styles from './Layout.module.css';
import classer from 'react-classer';

const classes = classer( styles );

const Layout = props => (
  <Aux>
    <div>Toolbar, Side Drawer, Backdrop</div>
    <main {...classes( 'main' )}>{props.children}</main>
  </Aux>
);

export default Layout;
