import React, { Component, lazy, Suspense } from 'react';
import Loader from '../../components/UI/Loader/Loader';
import ErrorBoundary from '../../HOCs/ErrorBoundary';
import { suspenseNode } from '../../HOCs/suspensed';
// import Checkout from '../Checkout/Checkout';

const Checkout = lazy(() =>
  import(/* webpackChunkName: "Checkout" */ '../Checkout/Checkout')
);

const SNCheckout = suspenseNode(Checkout, {});

const Layout = lazy(() =>
  import(/* webpackChunkName: "Layout" */ '../Layout/Layout')
);
const BurgerBuilder = lazy(() =>
  import(/* webpackChunkName: "BurgerBuilder", webpackPreload: true */ '../BurgerBuilder/BurgerBuilder')
);

class App extends Component {
  public render() {
    return (
      <React.Suspense fallback={<Loader />}>
        <Layout>
          <ErrorBoundary>
            <React.Suspense fallback={<Loader />}>
              <BurgerBuilder />
            </React.Suspense>
            {SNCheckout}
          </ErrorBoundary>
        </Layout>
      </React.Suspense>
    );
  }
}

export default App;
