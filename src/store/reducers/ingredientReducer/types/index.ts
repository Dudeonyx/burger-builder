import { Iingredients } from '../../../../types/ingredients';

export interface IingredientReducerState {
  ingredients: Iingredients | null;
  error: boolean;
}
