import React, { Component, lazy } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import { ICheckoutState } from './types';
import { GetConnectProps, StoreState } from '../../store/types';
import {
  selectIngredients,
  getTotalPriceFromStore,
  getPurchaseableFromStore,
} from '../../store/selectors/selectors';
import { suspenseNode2 } from '../../HOCs/suspensed';

const ContactData = lazy(() =>
  import(/* webpackChunkName: "ContactData", webpackPrefetch: true */ './ContactData/ContactData'),
);

const SContactData = suspenseNode2(ContactData);
class Checkout extends Component<ICheckoutProps, ICheckoutState> {
  public render() {
    return (
      <div>
        {this.props.ingredients && this.props.totalPrice ? (
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

const mapCheckoutStateToProps = (state: StoreState) => ({
  ingredients: selectIngredients(state),
  totalPrice: getTotalPriceFromStore(state),
  purchaseable: getPurchaseableFromStore(state),
});

const connectIngredientsState = connect(
  mapCheckoutStateToProps,
  null,
);

export type ICheckoutProps = RouteComponentProps &
  GetConnectProps<typeof connectIngredientsState>;

export default connectIngredientsState(Checkout);
