import React, { Component } from 'react';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { IingredientsKeys } from '../../components/Burger/BuildControls/BuildControls';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { getTotalPrice } from '../../shared/getTotalPrice';
import { Iingredients } from '../BurgerBuilder/BurgerBuilder';
import styles from './Checkout.module.css';
import ContactData from './ContactData/ContactData';
import { updatePurchasable } from '../../shared/updatePurchasable';
import {
  connectIngredients,
  IconnectIngredientsProps,
} from '../../store/actions';

/**
 * @export
 * @interface ICheckoutState
 */
export interface ICheckoutState {
  purchasable: boolean;
}

class Checkout extends Component<
  IconnectIngredientsProps<RouteComponentProps>,
  ICheckoutState
> {
  constructor(props: IconnectIngredientsProps<RouteComponentProps>) {
    super(props);

    this.state = {
      purchasable: false,
    };
  }
  public componentDidMount = () => {
    // const query = new URLSearchParams(this.props.location.search);
    // const newIngredients = {} as Iingredients;
    // query.forEach(
    //   (igVal, igKey) => (newIngredients[igKey as IingredientsKeys] = +igVal),
    // );
    // const newTotalPrice = getTotalPrice(newIngredients);
    if (!this.props.ingredients) {
      return;
    }
    const purchasable = updatePurchasable(this.props.ingredients);
    this.setState({
      // ingredients: newIngredients,
      purchasable,
      // totalPrice: newTotalPrice,
    });
  };

  public render() {
    return (
      <div className={styles.Checkout}>
        <Route
          path={this.props.match.path + '/contact-data'}
          render={p =>
            this.props.ingredients && this.props.totalPrice ? (
              <ContactData
                {...p}
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}
              />
            ) : null
          }
        />
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
export default connectIngredients(Checkout);
