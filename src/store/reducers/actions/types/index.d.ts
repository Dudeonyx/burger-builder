import {
  IContactDataReducerState,
  IContactDataReducerActions,
} from '../../contactDataReducer/types';
import { IingredientsKeys, Iingredients } from '../../../../types/ingredients';
import { IingredientReducerAction } from '../../ingredientReducer/types';
import { IordersReducerAction } from '../../ordersReducer/types';

// export type IconnectIngredientsProps<
//   T,
//   D extends Partial<
//     ReturnType<typeof mapIngredientsDispatchToProps>
//   > | null = null
// > = (D extends null ? ReturnType<typeof mapIngredientsDispatchToProps> : D) &
//   ReturnType<typeof mapIngredientsStateToProps> &
//   T;

export interface IActionTypes {
  INCREASE_INGREDIENT: 'INCREASE_INGREDIENT';
  DECREASE_INGREDIENT: 'DECREASE_INGREDIENT';
  SET_INGREDIENTS: 'SET_INGREDIENTS';
  SET_ERROR: 'SET_ERROR';
  UPDATE_CONTACT_FORM: 'UPDATE_CONTACT_FORM';
  RESET_CONTACT_FORM: 'RESET_CONTACT_FORM';
  ORDER_SUCCESSFUL: 'ORDER_SUCCESSFUL';
  ORDER_FAILED: 'ORDER_FAILED';
  SET_ORDER_SUBMITTING: 'SET_ORDER_SUBMITTING';
  SET_ORDERS: 'SET_ORDERS';
  SET_FORMATTEDORDERS: 'SET_FORMATTEDORDERS';
  SET_ORDERS_LOADING: 'SET_ORDERS_LOADING';
}

export type IActions =
  | IContactDataReducerActions
  | IingredientReducerAction
  | IordersReducerAction;
