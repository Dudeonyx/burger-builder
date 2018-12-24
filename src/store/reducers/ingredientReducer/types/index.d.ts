import { Iingredients } from '../../../../types/ingredients';
import { actionTypes } from '../../actions';

export interface IingredientReducerState {
  ingredients: Iingredients | null;
  error: boolean;
}

interface ISET_INGREDIENTS {
  type: typeof actionTypes.SET_INGREDIENTS;
  payload: {
    ingredients: Iingredients | null;
  };
}
interface IINCREASE_INGREDIENT {
  type: typeof actionTypes.INCREASE_INGREDIENT;
  payload: {
    igkey: keyof Iingredients;
  };
}
interface IDECREASE_INGREDIENT {
  type: typeof actionTypes.DECREASE_INGREDIENT;
  payload: {
    igkey: keyof Iingredients;
  };
}
interface ISET_INGREDIENT_ERROR {
  type: typeof actionTypes.SET_INGREDIENTS_ERROR;
  payload: {
    error: boolean;
  };
}

export type IingredientReducerAction =
  | ISET_INGREDIENTS
  | IINCREASE_INGREDIENT
  | IDECREASE_INGREDIENT
  | ISET_INGREDIENT_ERROR;
