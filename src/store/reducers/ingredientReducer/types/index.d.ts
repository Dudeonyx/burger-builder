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
interface IINCREASE_INGREDIENT {
  type: IActionTypes['INCREASE_INGREDIENT'];
  payload: {
    igkey: keyof Iingredients;
  };
}
interface IDECREASE_INGREDIENT {
  type: IActionTypes['DECREASE_INGREDIENT'];
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
  | IINCREASE_INGREDIENT
  | IDECREASE_INGREDIENT
  | ISET_INGREDIENT_ERROR;
