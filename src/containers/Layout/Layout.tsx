import React, {
  Component,
  lazy,
  Suspense,
  ComponentPropsWithoutRef,
  ReactElement,
} from 'react';
import styles from './Layout.module.css';
import Toolbar from '../../components/UI/Toolbar/Toolbar';

const SideDrawer = lazy( () =>
  import( /* webpackChunkName: "SideDrawer" */ '../../components/UI/SideDrawer/SideDrawer' ),
);

interface ILayoutState {
  showSideDrawer: boolean;
}
class Layout extends Component<{ children: JSX.Element }, ILayoutState> {
  state = {
    showSideDrawer: false,
  };

  hideSideDrawerHandler = () => this.setState( { showSideDrawer: false } );
  toggleSideDrawerHandler = () =>
    this.setState( prevState => ( { showSideDrawer: !prevState.showSideDrawer } ) )

  render() {
    return (
      <>
        <Toolbar drawerToggler={this.toggleSideDrawerHandler} />
        <Suspense fallback={null}>
          <SideDrawer
            open={this.state.showSideDrawer}
            hider={this.hideSideDrawerHandler}
          />
        </Suspense>
        <main className={styles.Main}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
