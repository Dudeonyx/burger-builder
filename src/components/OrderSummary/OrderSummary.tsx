import { FunctionComponent, MouseEventHandler } from 'react';
import Button from '../UI/Button/Button';
import OrderText from '../OrderText/OrderText';
import { IOrderIngredientsPrice } from '../OrderText/types';

export interface OrderSummaryProps extends IOrderIngredientsPrice {
  purchaseCancel: MouseEventHandler;
  purchaseContinue: MouseEventHandler;
  isAuth: boolean;
}

const OrderSummary: FunctionComponent<OrderSummaryProps> = ({
  totalCost,
  ingredients,
  purchaseCancel,
  purchaseContinue,
  isAuth,
}) => {
  // const summary = Object.entries(ingredients).map(([igKey, igVal,]) => (
  //   <li style={{ textTransform: 'capitalize' }} key={igKey}>
  //     {`${igKey}: ${igVal}`}
  //   </li>
  // ));
  // console.log( '[OrderSummary]' );
  return (
    <>
      <OrderText
        {...{ ingredients, totalCost }}
        title="Order Summary"
        totalCostPrefix="Total Cost:"
      />
      <p>Proceed to Checkout?</p>
      <div>
        <Button onClick={purchaseCancel} btnType="Danger">
          CANCEL
        </Button>
        <Button onClick={purchaseContinue} btnType="Success">
          {isAuth ? 'ORDER' : 'SIGN UP/IN TO CONTINUE'}
        </Button>
      </div>
    </>
  );
};

export default OrderSummary;
