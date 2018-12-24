import { IContactDataReducerActions } from '../../contactDataReducer/types';
import { IingredientReducerAction } from '../../ingredientReducer/types';
import { IordersReducerAction } from '../../ordersReducer/types';

export type IActions =
  | IContactDataReducerActions
  | IingredientReducerAction
  | IordersReducerAction;
