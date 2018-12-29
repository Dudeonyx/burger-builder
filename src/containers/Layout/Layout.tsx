import React, { lazy, PureComponent, Suspense } from 'react';
import Toolbar from './Toolbar/Toolbar';
import styles from './Layout.module.css';
import {
  selectAuthIdToken,
  getAuthenticated,
} from '../../store/selectors/selectors';
import { connect } from 'react-redux';
import { GetConnectProps, StoreState } from '../../store/types';
import { withRouter, RouteComponentProps } from 'react-router';

const SideDrawer = lazy(() =>
  import(/* webpackChunkName: "SideDrawer" */ './SideDrawer/SideDrawer'),
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
class Layout extends PureComponent<LayoutProps, ILayoutState> {
  /**
   * @implements {ILayoutState}
   * @memberof Layout
   */
  public readonly state: ILayoutState = {
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
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));

  public render() {
    return (
      <>
        <Toolbar
          drawerToggler={this.toggleSideDrawerHandler}
          isAuth={this.props.isAuthenticated}
        />
        <Suspense fallback={null}>
          <SideDrawer
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer}
            hider={this.hideSideDrawerHandler}
          />
        </Suspense>
        <main className={styles.Main}>{this.props.children}</main>
      </>
    );
  }
}

const mapLayoutStateToProps = (state: StoreState) => {
  return {
    isAuthenticated: getAuthenticated(state),
  };
};

const connectLayout = connect(
  mapLayoutStateToProps,
  {},
);

type LayoutProps = GetConnectProps<typeof connectLayout> ;

export default connectLayout(Layout);
