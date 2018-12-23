import { Iingredients } from '../../../../types/ingredients';
import { IActionTypes } from '../../actions/types';

export interface IingredientReducerState {
  ingredients: Iingredients | null;
  error: boolean;
}

interface ISET_INGREDIENTS {
  type: IActionTypes['SET_INGREDIENTS'];
  payload: {
    ingredients: Iingredients | null;
  };
}
interface IIN_DE_CREASE__INGREDIENT {
  type:
    | IActionTypes['INCREASE_INGREDIENT']
    | IActionTypes['DECREASE_INGREDIENT'];
  payload: {
    igkey: keyof Iingredients;
  };
}
interface ISET_INGREDIENT_ERROR {
  type: IActionTypes['SET_INGREDIENTS_ERROR'];
  payload: {
    error: boolean;
  };
}

export type IingredientReducerAction =
  | ISET_INGREDIENTS
  | IIN_DE_CREASE__INGREDIENT
  | ISET_INGREDIENT_ERROR;
