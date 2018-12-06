import React, { Component, lazy, Suspense } from 'react';
import { Route } from 'react-router';
import Loader from '../../components/UI/Loader/Loader';
import ErrorBoundary from '../../HOCs/ErrorBoundary';
import { suspenseNode } from '../../HOCs/suspensed';
// import Checkout from '../Checkout/Checkout';

const Checkout = lazy(() =>
  import(/* webpackChunkName: "Checkout", webpackPrefetch: true */ '../Checkout/Checkout')
);

// const SNCheckout = suspenseNode(Checkout, {});

const Layout = lazy(() =>
  import(/* webpackChunkName: "Layout", webpackPrefetch: true */ '../Layout/Layout')
);
const BurgerBuilder = lazy(() =>
  import(/* webpackChunkName: "BurgerBuilder", webpackPrefetch: true */ '../BurgerBuilder/BurgerBuilder')
);

class App extends Component {
  public render() {
    return (
      <React.Suspense fallback={<Loader />}>
        <Layout>
          <ErrorBoundary>
            <React.Suspense fallback={<Loader />}>
              <Route path="/" exact={true} component={BurgerBuilder} />
              <Route path="/checkout" exact={false} component={Checkout} />
            </React.Suspense>
            {/* {SNCheckout} */}
          </ErrorBoundary>
        </Layout>
      </React.Suspense>
    );
  }
}

export default App;
