import { Iingredients } from '../../../containers/BurgerBuilder/types';
export interface IingredientReducerState {
  ingredients: Iingredients | null;
  totalPrice: string;
}
export type IingredientReducerAction = {
  type: 'STORE';
  payload: {
    ingredients: Iingredients;
  };
} | {
  type: 'INCREASE' | 'DECREASE';
  payload: {
    igkey: keyof Iingredients;
  };
};
