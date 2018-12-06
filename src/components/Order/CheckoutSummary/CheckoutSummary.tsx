import React, { FunctionComponent } from 'react';
import BurgerDisplay from '../../Burger/BurgerDisplay/BurgerDisplay';
import OrderText, { IOrderTextProps } from '../../OrderText/OrderText';

// tslint:disable-next-line:no-empty-interface
interface ICheckoutSummaryProps extends IOrderTextProps {}

const CheckoutSummary: FunctionComponent<ICheckoutSummaryProps> = ({
  ingredients,
  price
}) => {
  return (
    // tslint:disable-next-line:jsx-self-close
    <div>
      <OrderText {...{ ingredients, price }} />
      <BurgerDisplay {...{ ingredients }} />
    </div>
  );
};

export default CheckoutSummary;
