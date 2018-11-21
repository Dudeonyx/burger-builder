import React from 'react';
import Aux from '../../hocs/ax';
import styles from './Layout.module.css';
import Toolbar from '../UI/Toolbar/Toolbar';

const Layout = props => (
  <Aux>
    <Toolbar />
    <main className={styles.Main}>{props.children}</main>
  </Aux>
);

export default Layout;
