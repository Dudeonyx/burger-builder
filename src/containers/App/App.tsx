import React, { Component, lazy } from 'react';
import Loader from '../../components/UI/Loader/Loader';
import ErrorBoundary from '../../HOCs/ErrorBoundary';

const Layout = lazy(() =>
  import(/* webpackChunkName: "Layout" */ '../Layout/Layout'),
);
const BurgerBuilder = lazy(() =>
  import(/* webpackChunkName: "BurgerBuilder" */ '../BurgerBuilder/BurgerBuilder'),
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
          </ErrorBoundary>
        </Layout>
      </React.Suspense>
    );
  }
}

export default App;
