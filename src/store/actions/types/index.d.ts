import {
  IingredientReducerAction,
  IingredientReducerState,
} from '../../reducers/types';
import { IingredientsKeys, Iingredients } from '../../../types/ingredients';
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
  D extends Partial<ImapDispatchIngredients> | null = null
> = (D extends null ? ImapDispatchIngredients : D) &
  IingredientReducerState &
  T;
