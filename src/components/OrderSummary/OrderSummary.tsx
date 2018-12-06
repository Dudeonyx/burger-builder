import React, { FunctionComponent, MouseEventHandler } from 'react';
import { Iingredients } from '../../containers/BurgerBuilder/BurgerBuilder';
import Button from '../Button/Button';
import OrderText, { IOrderIngredientsPrice } from '../OrderText/OrderText';

export interface IOrderSummary extends IOrderIngredientsPrice {
  purchaseCancel: MouseEventHandler;
  purchaseContinue: MouseEventHandler;
}

const OrderSummary: FunctionComponent<IOrderSummary> = ({price, ingredients, purchaseCancel, purchaseContinue}) => {
  const summary = Object.entries(ingredients).map(([igKey, igVal]) => (
    <li style={{ textTransform: 'capitalize' }} key={igKey}>
      {`${igKey}: ${igVal}`}
    </li>
  ));
  // console.log( '[OrderSummary]' );
  return (
    <>
      <OrderText {...{ingredients, price}} title="Order Summary" totalCostPrefix="Total Cost:" />
      <p>Proceed to Checkout?</p>
      <div>
        <Button onClick={purchaseCancel} type="Danger">
          CANCEL
        </Button>
        <Button onClick={purchaseContinue} type="Success">
          ORDER
        </Button>
      </div>
    </>
  );
};

export default OrderSummary;
