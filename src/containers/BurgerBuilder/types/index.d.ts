import { RouteComponentProps } from 'react-router-dom';
import { IconnectIngredientsProps } from '../../../store/reducers/ingredientReducer/actions/types';

/**
 * @export
 * @interface IBurgerBuilderState
 */
export interface IBurgerBuilderState {
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
