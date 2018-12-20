import React, { FunctionComponent, lazy } from 'react';
import { suspenseNode2 } from '../../HOCs/suspensed';
import { Switch, Route } from 'react-router-dom';
const Orders = lazy(() =>
  import(/* webpackChunkName: "Orders" */ '../Orders/Orders'),
);
const Checkout = lazy(() =>
  import(/* webpackChunkName: "Checkout" */ '../Checkout/Checkout'),
);
const BurgerBuilder = lazy(() =>
  import(/* webpackChunkName: "BurgerBuilder" */ '../BurgerBuilder/BurgerBuilder'),
);
const SBurgerBuilder = suspenseNode2(BurgerBuilder);
const SOrders = suspenseNode2(Orders);
const SCheckout = suspenseNode2(Checkout);
const Page: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact={true} render={p => SBurgerBuilder(p)} />
      <Route path="/all-orders" exact={true} render={p => SOrders(p)} />
      <Route path="/checkout" exact={false} render={p => SCheckout(p)} />
    </Switch>
  );
};

export default Page;
