import { Iingredients } from '../../../types/ingredients';

export interface IingredientReducerState {
  ingredients: Iingredients | null;
  totalPrice: string;
}
export type IingredientReducerAction =
  | {
      type: 'STORE';
      payload: {
        ingredients: Iingredients;
      };
    }
  | {
      type: 'INCREASE' | 'DECREASE';
      payload: {
        igkey: keyof Iingredients;
      };
    };
