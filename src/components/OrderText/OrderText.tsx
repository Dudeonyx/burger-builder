import React, { FunctionComponent } from 'react';
import { Iingredients } from '../../containers/BurgerBuilder/BurgerBuilder';
import styles from './OrderText.module.css';

export interface IOrderIngredientsPrice {
  /**
   * @type {Iingredients}
   * @memberof IOrderIngredientsPrice
   */
  ingredients: Iingredients;
  /**
   * @type {number}
   * @memberof IOrderIngredientsPrice
   */
  totalCost: number;
}
export interface IOrderTextProps extends IOrderIngredientsPrice {
  /** A heading to display
   * @type {string}
   * @memberof IOrderTextProps
   */
  title?: string;
  /** The text to display before the totalcost
   * @type {string}
   * @memberof IOrderTextProps
   */
  totalCostPrefix: string;
}

/**
 * Component that displays the individual ingredient costs
 * and total cost.
 * @implements IOrderTextProps
 */
const OrderText: FunctionComponent<IOrderTextProps> = ({
  ingredients,
  totalCost,
  totalCostPrefix,
  title
}) => {
  const summary = Object.entries(ingredients).map(([igKey, igVal]) => (
    <li style={{ textTransform: 'capitalize' }} key={igKey}>
      <span style={{ display: 'inline-block', minWidth: '3.7em' }}>
        {igKey}:
      </span>
      {` ${igVal}`}
    </li>
  ));
  return (
    <div className={styles.OrderText}>
      {title ? <h3 style={{ fontWeight: 'bold' }}>{title}</h3> : null}
      <div>
        <ul>{summary}</ul>
      </div>
      <p style={{ fontWeight: 'bold' }}>
        {totalCostPrefix} ${totalCost.toFixed(2)}
      </p>
    </div>
  );
};

export default OrderText;
