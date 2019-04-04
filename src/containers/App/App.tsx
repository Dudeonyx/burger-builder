import React, { lazy, FC, createContext, useMemo } from 'react';
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import ErrorBoundary from '../../HOCs/ErrorBoundary';
import Layout from '../Layout/Layout';
import { suspenseNode2 } from '../../HOCs/suspensed';
import '../../components/UI/Loader/Loader';
import '../../axios-orders';
import '../../HOCs/withErrorHandler';
import '../../components/UI/Button/Button';
import '../../components/UI/Modal/Modal';
import 'regenerator-runtime';
import Auth from '../Auth/Auth';
import Logout from '../Auth/Logout/Logout';
import $404 from '../404/404';
import { connect } from 'react-redux';
import { GetConnectProps } from '../../store/types';
import {
  getAuthenticated,
  selectIngredients,
  getTotalPriceFromStore,
} from '../../store/selectors/selectors';
import { Store } from '../../store/store';
import { Iingredients } from '../../types/ingredients';
import Page from '../Page/Page';

export const AuthContext = createContext(false);

export const IngredientsContext = createContext<{
  ingredients: Iingredients | null;
  totalPrice: string;
} | null>(null);

const Orders = lazy(() => import(/* webpackChunkName: "Orders" */ '../Orders/Orders'));
const Checkout = lazy(() => import(/* webpackChunkName: "Checkout" */ '../Checkout/Checkout'));
const BurgerBuilder = lazy(() =>
  import(/* webpackChunkName: "BurgerBuilder" */ '../BurgerBuilder/BurgerBuilder'),
);

const SBurgerBuilder = suspenseNode2(BurgerBuilder);
const SOrders = suspenseNode2(Orders);
const SCheckout = suspenseNode2(Checkout);

const App: FC<AppProps> = props => {
  const ingsAndPrice = useMemo(
    () => ({ ingredients: props.ingredients, totalPrice: props.totalPrice }),
    [props.ingredients, props.totalPrice],
  );

  const protectedRoutes = props.isAuth ? (
    <Switch>
      <Route path="/" exact={true} render={p => SBurgerBuilder(p)} />
      <Route path="/logout" exact={false} component={Logout} />
      <Route path="/all-orders" exact={true} render={p => SOrders(p)} />
      <Route path="/checkout" exact={false} render={p => SCheckout(p)} />
      <Route path="/login" exact={true} component={Auth} />
      <Route path="/page" exact={true} component={Page} />
      <Route component={$404} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact={true} render={p => SBurgerBuilder(p)} />
      <Route path="/login" exact={true} component={Auth} />
      <Redirect from="/all-orders" to="/" />
      <Redirect from="/checkout" to="/" />
      <Redirect from="/logout" to="/" />
      <Route path="/page" exact={true} component={Page} />
      <Route component={$404} />
    </Switch>
  );
  return (
    <AuthContext.Provider value={props.isAuth}>
      <IngredientsContext.Provider value={ingsAndPrice}>
        <Layout>
          <ErrorBoundary>{protectedRoutes}</ErrorBoundary>
        </Layout>
      </IngredientsContext.Provider>
    </AuthContext.Provider>
  );
};

const mapAppStateToProps = (state: Store) => ({
  isAuth: getAuthenticated(state),
  ingredients: selectIngredients(state),
  totalPrice: getTotalPriceFromStore(state),
});

const connectApp = connect(mapAppStateToProps);
type AppProps = GetConnectProps<typeof connectApp> & RouteComponentProps;

export default connectApp(App);
