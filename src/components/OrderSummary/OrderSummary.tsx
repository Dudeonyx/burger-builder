import React, { FunctionComponent, MouseEventHandler } from 'react';
import { Iingredients } from '../../containers/BurgerBuilder/BurgerBuilder';
import Button from '../Button/Button';
import OrderText, { IOrderTextProps } from '../OrderText/OrderText';

export interface IOrderSummary extends IOrderTextProps {
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
      <OrderText {...{ingredients, price}}/>
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
