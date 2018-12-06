import * as React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Iingredients } from '../BurgerBuilder/BurgerBuilder';

// tslint:disable-next-line:no-empty-interface
export interface ICheckoutProps {}

// tslint:disable-next-line:no-empty-interface
export interface ICheckoutState {
  ingredients: Iingredients;
  totalPrice: number;
}

class Checkout extends React.Component<ICheckoutProps, ICheckoutState> {
  constructor(props: ICheckoutProps) {
    super(props);

    this.state = {
      ingredients: {
        bacon: 1,
        cheese: 2,
        meat: 1,
        salad: 1
      },
      totalPrice: 10
    };
  }

  public render() {
    return (
      // tslint:disable-next-line:jsx-self-close
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        />
      </div>
    );
  }
}
export default Checkout;
