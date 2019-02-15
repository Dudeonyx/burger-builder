import React, { lazy, Suspense, useState, FC, useCallback, useRef } from 'react';
import Toolbar from './Toolbar/Toolbar';

const SideDrawer = lazy(() =>
  import(/* webpackChunkName: "SideDrawer" */ './SideDrawer/SideDrawer'),
);

/**
 * A basic reuseable layout component
 * @class Layout
 * @extends {Component<{ children: JSX.Element }, ILayoutState>}
 */
const Layout: FC = props => {
  const [showSideDrawer, setShowSideDrawer,] = useState(false);

  // const count = useRef(0);

  /**
   * Handler that hides the side drawer
   *
   * @memberof Layout
   */
  const hideSideDrawerHandler = useCallback(() => setShowSideDrawer(false), [setShowSideDrawer,]);
  /**
   * Handler that toggles the visibility
   * of the side drawer
   *
   * @memberof Layout
   */
  const toggleSideDrawerHandler = useCallback(() => setShowSideDrawer(prevState => !prevState), [
    setShowSideDrawer,
  ]);

  // const check = usePrevious(toggleSideDrawerHandler);

  // console.log('using Prev:', check === toggleSideDrawerHandler, '\ncount:', count.current);

  // useEffect(() => {
  //   count.current = count.current + 1;
  // });

  return (
    <>
      <Toolbar drawerToggler={toggleSideDrawerHandler} />
      <Suspense fallback={null}>
        <SideDrawer open={showSideDrawer} hider={hideSideDrawerHandler} />
      </Suspense>
      <main style={{ margin: '2px 10px 10px' }}>{props.children}</main>
    </>
  );
};

export default Layout;
