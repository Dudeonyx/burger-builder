import React, { lazy, Component } from 'react';
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom';
import ErrorBoundary from '../../HOCs/ErrorBoundary';
import Layout from '../Layout/Layout';
import { suspenseNode2 } from '../../HOCs/suspensed';
const Orders = lazy(() =>
  import(/* webpackChunkName: "Orders" */ '../Orders/Orders'),
);
const Checkout = lazy(() =>
  import(/* webpackChunkName: "Checkout" */ '../Checkout/Checkout'),
);
const BurgerBuilder = lazy(() =>
  import(/* webpackChunkName: "BurgerBuilder" */ '../BurgerBuilder/BurgerBuilder'),
);
import '../../components/UI/Loader/Loader';
import '../../axios-orders';
import '../../HOCs/withErrorHandler';
import '../../components/UI/Button/Button';
import 'regenerator-runtime';
import '../../components/UI/Modal/Modal';
import Auth from '../Auth/Auth';
import Logout from '../Auth/Logout/Logout';
import $404 from '../404/404';
import { checkPriorAuth } from '../../store/actions';
import { connect } from 'react-redux';
import { GetConnectProps } from '../../store/types';
import { getAuthenticated } from '../../store/selectors/selectors';
import { store, IStore } from '../../store/store';

const SBurgerBuilder = suspenseNode2(BurgerBuilder);
const SOrders = suspenseNode2(Orders);
const SCheckout = suspenseNode2(Checkout);

// const Page = lazy(() => import(/* webpackChunkName: "Page" */ '../Page/Page'));

store.dispatch(checkPriorAuth() as any);
class App extends Component<AppProps> {
  // public componentDidMount = () => {
  //   this.props.checkPriorAuth();
  // };

  public render() {
    const protectedRoutes = this.props.isAuth ? (
      <Switch>
        <Route path="/" exact={true} render={p => SBurgerBuilder(p)} />
        <Route path="/logout" exact={false} component={Logout} />
        <Route path="/all-orders" exact={true} render={p => SOrders(p)} />
        <Route path="/checkout" exact={false} render={p => SCheckout(p)} />
        <Redirect from="/login" to="/" />
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
    return (
      <Layout>
        <ErrorBoundary>{protectedRoutes}</ErrorBoundary>
      </Layout>
    );
  }
}

const mapAppStateToProps = (state: IStore) => ({
  isAuth: getAuthenticated(state),
});

// const mapAppDispatchToProps = {
//   checkPriorAuth,
// };
const connectApp = connect(mapAppStateToProps);
type AppProps = GetConnectProps<typeof connectApp> & RouteComponentProps;

export default withRouter(connectApp(App));
