import React, { FunctionComponent } from 'react';
import { Iingredients } from '../../containers/BurgerBuilder';
import { IingredientsKeys } from '../Burger/BuildControls';
import { INGREDIENT_PRICES } from '../../shared';
import styles from './Order.module.css';

// tslint:disable-next-line:no-empty-interface
interface IOrdersProps {
  ingredients: Iingredients;
  name: string;
  totalPrice: string;
  id: string;
  className?: string;
}

const Order: FunctionComponent<IOrdersProps> = ({
  ingredients,
  totalPrice,
  name,
  id,
  className
}) => {
  const breakdown = (Object.entries(ingredients) as Array<
    [IingredientsKeys, number]
  >).map(([igKey, igVal]) => (
    <span style={{ textTransform: 'capitalize' }} key={id + igKey + igVal}>
      {igKey} - {igVal}
      <br />
      {igVal * INGREDIENT_PRICES[igKey] > 0 ? (
        <>${(igVal * INGREDIENT_PRICES[igKey]).toFixed(2)}</>
      ) : (
        <>N/A</>
      )}
    </span>
  ));
  return (
    <div className={styles.Order}>
      <h4>Name: {name}</h4>
      {breakdown}
      <p>Base Cost: ${INGREDIENT_PRICES.base.toFixed(2)}</p>
      <h5>Total Cost: ${totalPrice}</h5>
    </div>
  );
};

export default Order;
