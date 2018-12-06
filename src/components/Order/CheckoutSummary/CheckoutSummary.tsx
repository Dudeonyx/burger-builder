import React, { FunctionComponent, MouseEventHandler } from 'react';
import BurgerDisplay from '../../Burger/BurgerDisplay/';
import Button from '../../Button/Button';
import OrderText, { IOrderIngredientsPrice } from '../../OrderText/';
import styles from './CheckoutSummary.module.css';

// tslint:disable-next-line:no-empty-interface
interface ICheckoutSummaryProps extends IOrderIngredientsPrice {
  checkoutCancel: MouseEventHandler;
  checkoutContinue: MouseEventHandler;
  purchasable: boolean;
}

const CheckoutSummary: FunctionComponent<ICheckoutSummaryProps> = ({
  ingredients,
  totalCost,
  checkoutCancel,
  checkoutContinue,
  purchasable
}) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h3>We Hope You'll Enjoy This</h3>
      <BurgerDisplay {...{ ingredients }} />
      <OrderText
        {...{ ingredients, totalCost }}
        totalCostPrefix="The total cost of your order is"
      />
      <div>
        <Button btnType="Danger" onClick={checkoutCancel}>
          CANCEL
        </Button>
        <Button
          disabled={!purchasable}
          btnType="Success"
          onClick={checkoutContinue}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
