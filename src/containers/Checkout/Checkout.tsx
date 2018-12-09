import React, { Component } from 'react';
import { RouteComponentProps, Route } from 'react-router-dom';
import { IingredientsKeys } from '../../components/Burger/BuildControls/BuildControls';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { getTotalPrice } from '../../shared/getTotalPrice';
import { Iingredients } from '../BurgerBuilder/BurgerBuilder';
import styles from './Checkout.module.css';
import ContactData from './ContactData/ContactData';
import { updatePurchasable } from '../../shared/updatePurchasable';

/**
 * @export
 * @interface ICheckoutState
 */
export interface ICheckoutState {
  /**
   * @type {Iingredients}
   * @memberof ICheckoutState
   */
  ingredients: Iingredients | null;
  /**
   * @type {number}
   * @memberof ICheckoutState
   */
  totalPrice: string | null;
  purchasable: boolean;
}

class Checkout extends Component<RouteComponentProps, ICheckoutState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      ingredients: null,
      purchasable: false,
      totalPrice: null
    };
  }
  public componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    const newIngredients = {} as Iingredients;
    query.forEach(
      (igVal, igKey) => (newIngredients[igKey as IingredientsKeys] = +igVal)
    );
    const newTotalPrice = getTotalPrice(newIngredients);
    const purchasable = updatePurchasable(newIngredients);
    this.setState({
      ingredients: newIngredients,
      purchasable,
      totalPrice: newTotalPrice
    });
  };

  public render() {
    return (
      <div className={styles.Checkout}>
        <Route
          path={this.props.match.path + '/contact-data'}
          render={p =>
            this.state.ingredients && this.state.totalPrice ? (
              <ContactData
                {...p}
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
              />
            ) : null
          }
        />
        {this.state.ingredients && this.state.totalPrice ? (
          <>
            <CheckoutSummary
              ingredients={this.state.ingredients}
              totalCost={this.state.totalPrice}
              checkoutCancel={this.checkoutCancel}
              checkoutContinue={this.checkoutContinue}
              purchasable={this.state.purchasable}
            />
          </>
        ) : null}
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
export default Checkout;
