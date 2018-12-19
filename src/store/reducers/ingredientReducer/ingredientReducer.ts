import produce from 'immer';
import {
  getTotalPrice,
  INGREDIENT_PRICES,
} from '../../../shared/getTotalPrice';
import { ingredientActionTypes } from './actions';
import { IingredientReducerState, IingredientReducerAction } from './types';

const initialState: IingredientReducerState = {
  ingredients: null,
  totalPrice: INGREDIENT_PRICES.base.toFixed(2),
};
export const ingredientReducer = (
  state = initialState,
  action: IingredientReducerAction,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case ingredientActionTypes.INCREASE_INGREDIENTS:
        if (!draft.ingredients || !action.payload.igkey) {
          break;
        }
        draft.ingredients[action.payload.igkey] += 1;
        draft.totalPrice = getTotalPrice(draft.ingredients);
        break;
      case ingredientActionTypes.DECREASE_INGREDIENTS:
        if (
          !draft.ingredients ||
          !action.payload.igkey ||
          draft.ingredients[action.payload.igkey] <= 0
        ) {
          break;
        }
        draft.ingredients[action.payload.igkey] -= 1;
        draft.totalPrice = getTotalPrice(draft.ingredients);
        break;
      case ingredientActionTypes.STORE_INGREDIENTS:
        if (action.payload.ingredients === undefined) {
          break;
        }
        draft.ingredients = action.payload.ingredients;
        draft.totalPrice = getTotalPrice(draft.ingredients);
        break;
      default:
        break;
    }
  });
};
