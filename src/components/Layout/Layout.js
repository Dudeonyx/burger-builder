import React, { Component } from 'react';
import Aux from '../../hocs/ax';
import styles from './Layout.module.css';
import Toolbar from '../UI/Toolbar/Toolbar';
import SideDrawer from '../UI/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  hideSideDrawerHandler = () => this.setState( { showSideDrawer: false } );
  toggleSideDrawerHandler = () =>
    this.setState( prevState => ( { showSideDrawer: !prevState.showSideDrawer } ) );

  render() {
    return (
      <Aux>
        <Toolbar drawerToggler={this.toggleSideDrawerHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          hiden={this.hideSideDrawerHandler}
        />
        <main className={styles.Main}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
