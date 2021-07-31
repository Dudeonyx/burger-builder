import { lazy, Suspense, useState, FC, useCallback } from "react";
import Toolbar from "./Toolbar/Toolbar";
import { Loader } from "../../components/UI";

const SideDrawer = lazy(
  () => import(/* webpackChunkName: "SideDrawer" */ "./SideDrawer/SideDrawer")
);

/**
 * A basic reuseable layout component
 * @class Layout
 * @extends {Component<{ children: JSX.Element }, ILayoutState>}
 */
const Layout: FC = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const hideSideDrawerHandler = useCallback(() => setShowSideDrawer(false), []);
  const toggleSideDrawerHandler = useCallback(
    () => setShowSideDrawer((prevState) => !prevState),
    []
  );

  return (
    <>
      <Toolbar drawerToggler={toggleSideDrawerHandler} />
      <Suspense fallback={<Loader />}>
        <SideDrawer open={showSideDrawer} hider={hideSideDrawerHandler} />
      </Suspense>
      <main style={{ margin: "2px 10px 10px" }}>{props.children}</main>
    </>
  );
};

export default Layout;
