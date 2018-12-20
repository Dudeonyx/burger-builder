import React, { FunctionComponent, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Orders from '../Orders/Orders';
import Checkout from '../Checkout/Checkout';

const Page: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={BurgerBuilder} />
      <Route path="/all-orders" exact={true} component={Orders} />
      <Route path="/checkout" exact={false} component={Checkout} />
    </Switch>
  );
};

export default Page;
