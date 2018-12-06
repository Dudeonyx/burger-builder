import React, { FunctionComponent } from 'react';
import { Iingredients } from '../../containers/BurgerBuilder/BurgerBuilder';

export interface IOrderTextProps {
  ingredients: Iingredients;
  price: number;
}

const OrderText: FunctionComponent<IOrderTextProps> = ({
  ingredients,
  price
}) => {
  const summary = Object.entries(ingredients).map(([igKey, igVal]) => (
    <li style={{ textTransform: 'capitalize' }} key={igKey}>
      {`${igKey}: ${igVal}`}
    </li>
  ));
  return (
    <>
      <h3 style={{ fontWeight: 'bold' }}>Order Summary</h3>
      <ul style={{}}>{summary}</ul>
      <p style={{ fontWeight: 'bold' }}>Total Cost: ${price.toFixed(2)}</p>
    </>
  );
};

export default OrderText;
