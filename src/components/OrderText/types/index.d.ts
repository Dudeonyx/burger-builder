import { Iingredients } from '../../../types/ingredients';
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
  totalCost: string;
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
  totalCostPrefix?: string;
}
