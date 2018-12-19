import React, { FunctionComponent, MouseEventHandler } from 'react';
import Button from '../Button/Button';
import OrderText from '../OrderText/OrderText';
import { IOrderIngredientsPrice } from '../OrderText/types';

export interface IOrderSummary extends IOrderIngredientsPrice {
  purchaseCancel: MouseEventHandler;
  purchaseContinue: MouseEventHandler;
}

const OrderSummary: FunctionComponent<IOrderSummary> = ({
  totalCost,
  ingredients,
  purchaseCancel,
  purchaseContinue,
}) => {
  const summary = Object.entries(ingredients).map(([igKey, igVal,]) => (
    <li style={{ textTransform: 'capitalize' }} key={igKey}>
      {`${igKey}: ${igVal}`}
    </li>
  ));
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
          ORDER
        </Button>
      </div>
    </>
  );
};

export default OrderSummary;
