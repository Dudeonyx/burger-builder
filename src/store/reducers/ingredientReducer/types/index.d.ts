import { Iingredients } from '../../../../types/ingredients';
import { IingActionTypes } from '../../actions/types';

export interface IingredientReducerState {
  ingredients: Iingredients | null;
}

export type IingredientReducerAction =
  | {
      type: IingActionTypes['SET_INGREDIENTS'];
      payload: {
        ingredients: Iingredients | null;
      };
    }
  | {
      type:
        | IingActionTypes['INCREASE_INGREDIENT']
        | IingActionTypes['DECREASE_INGREDIENT'];
      payload: {
        igkey: keyof Iingredients;
      };
    };
