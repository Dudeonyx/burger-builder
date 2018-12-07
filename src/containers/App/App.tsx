import React, { Component, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import Loader from '../../components/UI/Loader';
import ErrorBoundary from '../../HOCs/ErrorBoundary';
// import Checkout from '../Checkout/Checkout';

const Checkout = lazy(() =>
  import(/* webpackChunkName: "Checkout", webpackPrefetch: true */ '../Checkout')
);

// const SNCheckout = suspenseNode(Checkout, {});

const Layout = lazy(() =>
  import(/* webpackChunkName: "Layout", webpackPrefetch: true */ '../Layout')
);
const BurgerBuilder = lazy(() =>
  import(/* webpackChunkName: "BurgerBuilder", webpackPrefetch: true */ '../BurgerBuilder')
);

const Orders = lazy(() =>
  import(/* webpackChunkName: "Orders", webpackPrefetch: true */ '../Orders')
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
              <Route path="/all-orders" exact={true} component={Orders} />
            </React.Suspense>
            {/* {SNCheckout} */}
          </ErrorBoundary>
        </Layout>
      </React.Suspense>
    );
  }
}

export default App;
