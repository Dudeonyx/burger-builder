import React, { Component, lazy } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import { ICheckoutState } from './types';
import { GetConnectProps } from '../../store/types';
import {
  selectIngredients,
  getTotalPriceFromStore,
  getPurchaseableFromStore,
  getAuthenticated,
} from '../../store/selectors/selectors';
import { suspenseNode2 } from '../../HOCs/suspensed';
import { setAuthRedirectUrl } from '../../store/reducers/actions/';
import { IStore } from '../../store/store';

const ContactData = lazy(() =>
  import(/* webpackChunkName: "ContactData", webpackPrefetch: true */ './ContactData/ContactData'),
);

const SContactData = suspenseNode2(ContactData);
class Checkout extends Component<ICheckoutProps, ICheckoutState> {
  public render() {
    return (
      <div>
        {this.props.ingredients && this.props.isAuth ? (
          <>
            <Route
              path={this.props.match.path + '/contact-data'}
              render={p => SContactData(p)}
            />
            <CheckoutSummary
              ingredients={this.props.ingredients}
              totalCost={this.props.totalPrice}
              checkoutCancel={this.checkoutCancel}
              checkoutContinue={this.checkoutContinue}
              purchasable={this.props.purchaseable}
            />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }

  private checkoutCancel = () => {
    this.props.history.goBack();
  };
  private checkoutContinue = () => {
    setTimeout(
      () => import(/* webpackChunkName: "Orders" */ '../Orders/Orders'),
      8000,
    );
    this.props.history.push(this.props.match.path + '/contact-data');
  };
}

const mapCheckoutStateToProps = (state: IStore) => ({
  ingredients: selectIngredients(state),
  totalPrice: getTotalPriceFromStore(state),
  purchaseable: getPurchaseableFromStore(state),
  isAuth: getAuthenticated(state),
});

const mapCheckoutDispatchToProps = { setAuthRedirectUrl };

const connectIngredientsState = connect(
  mapCheckoutStateToProps,
  mapCheckoutDispatchToProps,
);

export type ICheckoutProps = RouteComponentProps &
  GetConnectProps<typeof connectIngredientsState>;

export default connectIngredientsState(Checkout);
