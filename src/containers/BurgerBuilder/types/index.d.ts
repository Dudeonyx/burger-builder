import { RouteComponentProps } from 'react-router-dom';
import { IconnectIngredientsProps } from '../../../store/actions/types';
/**
 * @export
 * @interface Iingredients
 */
export interface Iingredients {
  /**
   * @type {number}
   * @memberof Iingredients
   */
  salad: number;
  /**
   * @type {number}
   * @memberof Iingredients
   */
  bacon: number;
  /**
   * @type {number}
   * @memberof Iingredients
   */
  cheese: number;
  /**
   * @type {number}
   * @memberof Iingredients
   */
  meat: number;
}
/**
 * @export
 * @interface IBurgerBuilderState
 */
export interface IBurgerBuilderState {
  /**
   * @type {boolean}
   * @memberof IBurgerBuilderState
   */
  purchasable: boolean;
  /**
   * @type {boolean}
   * @memberof IBurgerBuilderState
   */
  purchasing: boolean;
  /**
   * @type {boolean}
   * @memberof IBurgerBuilderState
   */
  loading: boolean;
  /**
   * @type {string[]}
   * @memberof IBurgerBuilderState
   */
  orders: string[];
  /**
   * @type {(Error | null | false)}
   * @memberof IBurgerBuilderState
   */
  error: Error | null | false;
}
export type IBurgerBuilderProps = IconnectIngredientsProps<RouteComponentProps>;
