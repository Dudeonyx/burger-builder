import produce from 'immer';

import { IingredientReducerState, IingredientReducerAction } from './types';
import { ActionTypes } from '../actions';

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
      case ActionTypes.INCREASE_INGREDIENT:
        if (!draft.ingredients || !action.payload.igkey) {
          break;
        }
        draft.ingredients[action.payload.igkey] += 1;
        break;
      case ActionTypes.DECREASE_INGREDIENT:
        if (
          !draft.ingredients ||
          !action.payload.igkey ||
          draft.ingredients[action.payload.igkey] <= 0
        ) {
          break;
        }
        draft.ingredients[action.payload.igkey] -= 1;
        break;
      case ActionTypes.SET_INGREDIENTS:
        if (action.payload.ingredients === undefined) {
          break;
        }
        draft.ingredients = action.payload.ingredients;
        break;
      case ActionTypes.SET_ERROR:
        draft.error = action.payload.error;
        break;
      default:
        break;
    }
  });
};
