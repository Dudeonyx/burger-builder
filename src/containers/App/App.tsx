import React, { Component, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorBoundary from '../../HOCs/ErrorBoundary';
import Layout from '../Layout/Layout';
import { suspenseNode2 } from '../../HOCs/suspensed';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Checkout from '../Checkout/Checkout';
// import 'immer';
import '@emotion/core';
import '@emotion/css/macro';
import '../../components/UI/Loader/Loader';
import '../../shared/getTotalPrice';
import '../../shared/updatePurchasable';
import '../../axios-orders';
import '../../HOCs/withErrorHandler';
import '../../components/Button/Button';
import 'regenerator-runtime/';
import '../../components/UI/Modal/Modal';

const BurgerBuilder = lazy(() =>
  import(/* webpackChunkName: "BurgerBuilder" */ '../BurgerBuilder/BurgerBuilder'),
);

const Checkout = lazy(() =>
  import(/* webpackChunkName: "Checkout", webpackPrefetch: true */ '../Checkout/Checkout'),
);

const Orders = lazy(() =>
  import(/* webpackChunkName: "Orders", webpackPrefetch: true */ '../Orders/Orders'),
);

const SBurgerBuilder = suspenseNode2(BurgerBuilder);
const SOrders = suspenseNode2(Orders);
const SCheckout = suspenseNode2(Checkout);

class App extends Component {
  public render() {
    return (
      <Layout>
        <ErrorBoundary>
          <Switch>
            <Route path="/" exact={true} render={p => SBurgerBuilder(p)} />
            <Route path="/all-orders" exact={true} render={p => SOrders(p)} />
            <Route path="/checkout" exact={false} render={p => SCheckout(p)} />
          </Switch>
        </ErrorBoundary>
      </Layout>
    );
  }
}

export default App;
