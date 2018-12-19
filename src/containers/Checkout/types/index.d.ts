import { RouteComponentProps } from 'react-router-dom';
import { IconnectIngredientsProps } from '../../../store/reducers/ingredientReducer/actions/types';
/**
 * @export
 * @interface ICheckoutState
 */
export interface ICheckoutState {
  purchasable: boolean;
}
export type ICheckoutProps = IconnectIngredientsProps<RouteComponentProps, {}>;
