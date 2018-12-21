import React, { Component } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { updatePurchasable } from '../../shared/updatePurchasable';
import { connect } from 'react-redux';
import { ICheckoutState } from './types';
import { mapIngredientsStateToProps } from '../../store/reducers/actions/actionCreators';
import { GetConnectProps } from '../../store/types';

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
    import(/* webpackChunkName: "Orders" */ '../Orders/Orders');
    this.props.history.push(this.props.match.path + '/contact-data');
  };
}
const connectIngredientsState = connect(mapIngredientsStateToProps);

export type ICheckoutProps = RouteComponentProps & GetConnectProps<typeof connectIngredientsState>;

export default connectIngredientsState(Checkout);
