import { RouteComponentProps } from 'react-router-dom';

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
