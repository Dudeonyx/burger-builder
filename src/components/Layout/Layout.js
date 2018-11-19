import React from 'react';
import Aux from '../../hocs/ax';
import styles from './Layout.module.css';

const Layout = props => (
  <Aux>
    <div>Toolbar, Side Drawer, Backdrop</div>
    <main className={styles.Main}>{props.children}</main>
  </Aux>
);

export default Layout;
