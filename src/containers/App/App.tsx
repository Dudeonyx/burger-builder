import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import ErrorBoundary from '../../HOCs/ErrorBoundary';
import Layout from '../Layout/Layout';
import { suspenseNode, suspenseNode2 } from '../../HOCs/suspensed';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Checkout from '../Checkout/Checkout';

const Checkout = lazy(() =>
  import(/* webpackChunkName: "Checkout", webpackPrefetch: true */ '../Checkout/Checkout'),
);

const BurgerBuilder = lazy(() =>
  import(/* webpackChunkName: "BurgerBuilder", webpackPrefetch: true */ '../BurgerBuilder/BurgerBuilder'),
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
      <>
        {/* <CssBaseline /> */}
        <Layout>
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route path="/" exact={true} render={p => SBurgerBuilder(p)} />
                <Route
                  path="/all-orders"
                  exact={true}
                  render={p => SOrders(p)}
                />
                <Route
                  path="/checkout"
                  exact={false}
                  render={p => SCheckout(p)}
                />
              </Switch>
            </Suspense>
            {/* {SNCheckout} */}
          </ErrorBoundary>
        </Layout>
      </>
    );
  }
}

export default App;
