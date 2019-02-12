import { Iingredients } from '../../../../types/ingredients';

export interface IingredientReducerState {
  readonly ingredients: Iingredients | null;
  readonly error: boolean;
}
