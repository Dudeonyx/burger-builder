import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import ErrorBoundary from '../../HOCs/ErrorBoundary';
import Layout from '../Layout/Layout';
// import Checkout from '../Checkout/Checkout';

const Checkout = lazy(() =>
  import(/* webpackChunkName: "Checkout", webpackPrefetch: true */ '../Checkout/Checkout')
);

// const SNCheckout = suspenseNode(Checkout, {});

const BurgerBuilder = lazy(() =>
  import(/* webpackChunkName: "BurgerBuilder", webpackPrefetch: true */ '../BurgerBuilder/BurgerBuilder')
);

const Orders = lazy(() =>
  import(/* webpackChunkName: "Orders" */ '../Orders/Orders')
);

class App extends Component {
  public render() {
    return (
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/" exact={true} component={BurgerBuilder} />
              <Route path="/all-orders" exact={true} component={Orders} />
              <Route path="/checkout" exact={false} component={Checkout} />
            </Switch>
          </Suspense>
          {/* {SNCheckout} */}
        </ErrorBoundary>
      </Layout>
    );
  }
}

export default App;
