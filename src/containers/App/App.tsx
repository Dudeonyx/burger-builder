import React, { Component, lazy } from 'react';
import Loader from '../../components/UI/Loader/Loader';

const Layout = lazy( () =>
  import( /* webpackChunkName: "Layout" */ '../Layout/Layout' ),
);
const BurgerBuilder = lazy( () =>
  import( /* webpackChunkName: "BurgerBuilder" */ '../BurgerBuilder/BurgerBuilder' ),
);

class App extends Component {
  render() {
    return (
      <React.Suspense fallback={<Loader />}>
        <Layout>
          <React.Suspense fallback={<Loader />}>
            <BurgerBuilder />
          </React.Suspense>
        </Layout>
      </React.Suspense>
    );
  }
}

export default App;
