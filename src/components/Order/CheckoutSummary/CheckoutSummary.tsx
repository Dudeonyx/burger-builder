import styles from '*.module.css';
import React, { FunctionComponent } from 'react';
import BurgerDisplay from '../../Burger/BurgerDisplay/BurgerDisplay';
import Button from '../../Button/Button';
import OrderText, { IOrderIngredientsPrice } from '../../OrderText/OrderText';

// tslint:disable-next-line:no-empty-interface
interface ICheckoutSummaryProps extends IOrderIngredientsPrice {}

const CheckoutSummary: FunctionComponent<ICheckoutSummaryProps> = ({
  ingredients,
  totalCost
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
        <Button type="Danger" onClick={() => ''}>
          CANCEL
        </Button>
        <Button type="Success" onClick={() => ''}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
