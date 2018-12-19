import {
  IingredientsKeys,
  Iingredients,
} from '../../../../../types/ingredients';

import { IingredientReducerAction, IingredientReducerState } from '../../types';
import { mapIngredientsStateToProps, mapIngredientsDispatchToProps } from '..';

export interface IingActionTypes {
  readonly INCREASE_INGREDIENTS: 'INCREASE_INGREDIENTS';
  readonly DECREASE_INGREDIENTS: 'DECREASE_INGREDIENTS';
  readonly STORE_INGREDIENTS: 'STORE_INGREDIENTS';
}
export interface ImapDispatchIngredients {
  ingredientIncreaseHandler: (
    igkey: IingredientsKeys,
  ) => IingredientReducerAction;
  ingredientDecreaseHandler: (
    igkey: IingredientsKeys,
  ) => IingredientReducerAction;
  ingredientStoreHandler: (
    ingredients: Iingredients,
  ) => IingredientReducerAction;
}
export type IconnectIngredientsProps<
  T,
  D extends Partial<
    ReturnType<typeof mapIngredientsDispatchToProps>
  > | null = null
> = (D extends null ? ReturnType<typeof mapIngredientsDispatchToProps> : D) &
  ReturnType<typeof mapIngredientsStateToProps> &
  T;
