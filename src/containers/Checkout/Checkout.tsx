import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { updatePurchasable } from '../../shared/updatePurchasable';
import { mapIngredientsStateToProps } from '../../store/reducers/ingredientReducer/actions';
import { connect } from 'react-redux';
import { ICheckoutProps, ICheckoutState } from './types';

class Checkout extends Component<ICheckoutProps, ICheckoutState> {
  public state: ICheckoutState = {
    purchasable: false,
  };
  public componentDidMount = () => {
    if (!this.props.ingredients) {
      return;
    }
    const purchasable = updatePurchasable(this.props.ingredients);
    this.setState({
      purchasable,
    });
  };

  public render() {
    return (
      <div>
        {this.props.ingredients && this.props.totalPrice ? (
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        ) : null}
        {this.props.ingredients && this.props.totalPrice ? (
          <>
            <CheckoutSummary
              ingredients={this.props.ingredients}
              totalCost={this.props.totalPrice}
              checkoutCancel={this.checkoutCancel}
              checkoutContinue={this.checkoutContinue}
              purchasable={this.state.purchasable}
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
    this.props.history.push(this.props.match.path + '/contact-data');
  };
}
export default connect(mapIngredientsStateToProps)(Checkout);
