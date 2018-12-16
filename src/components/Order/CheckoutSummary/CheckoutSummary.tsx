import React, {
  FunctionComponent,
  MouseEventHandler,
  lazy,
  Suspense,
} from 'react';
import Button from '../../Button/Button';
import OrderText, { IOrderIngredientsPrice } from '../../OrderText/OrderText';
import styles from './CheckoutSummary.module.css';
import Loader from '../../UI/Loader/Loader';

const BurgerDisplay = lazy(() =>
  import('../../Burger/BurgerDisplay/BurgerDisplay'),
);
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
  purchasable,
}) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h3>We Hope You'll Enjoy This</h3>
      <Suspense fallback={<Loader />}>
        <BurgerDisplay {...{ ingredients }} />
      </Suspense>
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
