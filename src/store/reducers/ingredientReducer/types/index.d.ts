import { Iingredients } from '../../../../types/ingredients';
import { IActionTypes } from '../../actions/types';

export interface IingredientReducerState {
  ingredients: Iingredients | null;
  error: boolean;
}

export type IingredientReducerAction =
  | {
      type: IActionTypes['SET_INGREDIENTS'];
      payload: {
        ingredients: Iingredients | null;
      };
    }
  | {
      type:
        | IActionTypes['INCREASE_INGREDIENT']
        | IActionTypes['DECREASE_INGREDIENT'];
      payload: {
        igkey: keyof Iingredients;
      };
    }
  | {
      type: IActionTypes['SET_ERROR'];
      payload: {
        error: boolean;
      };
    };
