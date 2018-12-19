import { Iingredients } from '../../../../types/ingredients';
import { IingActionTypes } from '../actions/types';

export interface IingredientReducerState {
  ingredients: Iingredients | null;
  totalPrice: string;
}

export type IingredientReducerAction =
  | {
      type: IingActionTypes['STORE_INGREDIENTS'];
      payload: {
        ingredients: Iingredients | null;
      };
    }
  | {
      type:
        | IingActionTypes['INCREASE_INGREDIENTS']
        | IingActionTypes['DECREASE_INGREDIENTS'];
      payload: {
        igkey: keyof Iingredients;
      };
    };
