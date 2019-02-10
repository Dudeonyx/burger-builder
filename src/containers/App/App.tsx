import React, { lazy, Component, SFC } from 'react';
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import ErrorBoundary from '../../HOCs/ErrorBoundary';
import Layout from '../Layout/Layout';
import { suspenseNode2 } from '../../HOCs/suspensed';
import * as L from '../../components/UI/Loader/Loader';
import * as ax from '../../axios-orders';
import * as wE from '../../HOCs/withErrorHandler';
import * as Btn from '../../components/UI/Button/Button';
import * as M from '../../components/UI/Modal/Modal';
import 'regenerator-runtime';
import Auth from '../Auth/Auth';
import Logout from '../Auth/Logout/Logout';
import $404 from '../404/404';
import { connect } from 'react-redux';
import { GetConnectProps } from '../../store/types';
import { getAuthenticated } from '../../store/selectors/selectors';
import { IStore } from '../../store/store';
const Orders = lazy(() => import(/* webpackChunkName: "Orders" */ '../Orders/Orders'));
const Checkout = lazy(() => import(/* webpackChunkName: "Checkout" */ '../Checkout/Checkout'));
const BurgerBuilder = lazy(() =>
  import(/* webpackChunkName: "BurgerBuilder" */ '../BurgerBuilder/BurgerBuilder'),
);

const SBurgerBuilder = suspenseNode2(BurgerBuilder);
const SOrders = suspenseNode2(Orders);
const SCheckout = suspenseNode2(Checkout);

const App: SFC<AppProps> = props => {
  const protectedRoutes = props.isAuth ? (
    <Switch>
      <Route path="/" exact={true} render={p => SBurgerBuilder(p)} />
      <Route path="/logout" exact={false} component={Logout} />
      <Route path="/all-orders" exact={true} render={p => SOrders(p)} />
      <Route path="/checkout" exact={false} render={p => SCheckout(p)} />
      {/* <Redirect from="/login" to="/" /> */}
      <Route component={$404} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact={true} render={p => SBurgerBuilder(p)} />
      <Route path="/login" exact={true} component={Auth} />
      <Redirect from="/all-orders" to="/" />
      <Redirect from="/checkout" to="/" />
      <Redirect from="/logout" to="/" />
      <Route component={$404} />
    </Switch>
  );
  return <div>HHHHHHHHHH</div>;
  /* (;
    <Layout>
      <ErrorBoundary>{protectedRoutes}</ErrorBoundary>
    </Layout>
  ); */
};

const mapAppStateToProps = (state: IStore) => ({
  isAuth: getAuthenticated(state),
});

// const mapAppDispatchToProps = {
//   checkPriorAuth,
// };
const connectApp = connect(mapAppStateToProps);
interface AppProps { isAuth: boolean } /* GetConnectProps<typeof connectApp> & RouteComponentProps; */

export default App;
