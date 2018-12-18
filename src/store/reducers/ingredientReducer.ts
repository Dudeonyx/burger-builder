import produce from 'immer';
import { getTotalPrice } from '../../shared/getTotalPrice';
import { ingredientActions } from '../actions';
import { IingredientReducerState, IingredientReducerAction } from './types';

const initialState: IingredientReducerState = {
  ingredients: null,
  totalPrice: '4.00',
};
export const ingredientReducer = (
  state = initialState,
  action: IingredientReducerAction,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case ingredientActions.INCREASE:
        if (!draft.ingredients || !action.payload.igkey) {
          break;
        }
        draft.ingredients[action.payload.igkey] += 1;
        draft.totalPrice = getTotalPrice(draft.ingredients!);
        break;
      case ingredientActions.DECREASE:
        if (
          !draft.ingredients ||
          !action.payload.igkey ||
          draft.ingredients[action.payload.igkey] <= 0
        ) {
          break;
        }
        draft.ingredients[action.payload.igkey] -= 1;
        draft.totalPrice = getTotalPrice(draft.ingredients!);
        break;
      case ingredientActions.STORE:
        if (!action.payload.ingredients) {
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
