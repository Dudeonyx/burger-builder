import produce from 'immer';

import { IingredientReducerState, IingredientReducerAction } from './types';
import { actionTypes } from '../actions';

const initialState: IingredientReducerState = {
  ingredients: null,
  error: false,
};
export const ingredientReducer = (
  state = initialState,
  action: IingredientReducerAction,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.INCREASE_INGREDIENT:
        if (!draft.ingredients || !action.payload.igkey) {
          break;
        }
        draft.ingredients[action.payload.igkey] += 1;
        break;
      case actionTypes.DECREASE_INGREDIENT:
        if (
          !draft.ingredients ||
          !action.payload.igkey ||
          draft.ingredients[action.payload.igkey] <= 0
        ) {
          break;
        }
        draft.ingredients[action.payload.igkey] -= 1;
        break;
      case actionTypes.SET_INGREDIENTS:
        if (action.payload.ingredients === undefined) {
          break;
        }
        draft.ingredients = action.payload.ingredients;
        break;
      case actionTypes.SET_ERROR:
        draft.error = action.payload.error;
        break;
      default:
        break;
    }
  });
};
