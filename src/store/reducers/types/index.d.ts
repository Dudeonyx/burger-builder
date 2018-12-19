import { Iingredients } from '../../../types/ingredients';
import { IingActions } from '../../actions';

export interface IingredientReducerState {
  ingredients: Iingredients | null;
  totalPrice: string;
}

export type IingredientReducerAction =
  | {
      type: IingActions['STORE_INGREDIENTS'];
      payload: {
        ingredients: Iingredients;
      };
    }
  | {
      type:
        | IingActions['INCREASE_INGREDIENTS']
        | IingActions['DECREASE_INGREDIENTS'];
      payload: {
        igkey: keyof Iingredients;
      };
    };
