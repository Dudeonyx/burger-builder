import React, { lazy, PureComponent, Suspense } from 'react';
import Toolbar from '../../components/UI/Toolbar/Toolbar';
import styles from './Layout.module.css';

const SideDrawer = lazy(() =>
  import(/* webpackChunkName: "SideDrawer" */ '../../components/UI/SideDrawer/SideDrawer'),
);

/** @interface ILayoutState */
interface ILayoutState {
  /**
   * Show side drawer?
   *
   * @type {boolean}
   * @memberof ILayoutState
   */
  showSideDrawer: boolean;
}
/**
 * A basic reuseable layout component
 * @class Layout
 * @extends {Component<{ children: JSX.Element }, ILayoutState>}
 */
class Layout extends PureComponent<{ children: JSX.Element }, ILayoutState> {
  /**
   * @implements {ILayoutState}
   * @memberof Layout
   */
  public readonly state = {
    showSideDrawer: false,
  };

  /**
   * Handler that hides the side drawer
   *
   * @memberof Layout
   */
  public hideSideDrawerHandler = () => this.setState({ showSideDrawer: false });
  /**
   * Handler that toggles the visibility
   * of the side drawer
   *
   * @memberof Layout
   */
  public toggleSideDrawerHandler = () =>
    this.setState((prevState) => ({ showSideDrawer: !prevState.showSideDrawer }))

  public render() {
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
