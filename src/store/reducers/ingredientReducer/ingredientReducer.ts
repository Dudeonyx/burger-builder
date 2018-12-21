import produce from 'immer';
import { IingredientReducerState, IingredientReducerAction } from './types';
import { ingredientActionTypes } from '../actions/actionTypes';

const initialState: IingredientReducerState = {
  ingredients: null,
};
export const ingredientReducer = (
  state = initialState,
  action: IingredientReducerAction,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case ingredientActionTypes.INCREASE_INGREDIENT:
        if (!draft.ingredients || !action.payload.igkey) {
          break;
        }
        draft.ingredients[action.payload.igkey] += 1;
        break;
      case ingredientActionTypes.DECREASE_INGREDIENT:
        if (
          !draft.ingredients ||
          !action.payload.igkey ||
          draft.ingredients[action.payload.igkey] <= 0
        ) {
          break;
        }
        draft.ingredients[action.payload.igkey] -= 1;
        break;
      case ingredientActionTypes.SET_INGREDIENTS:
        if (action.payload.ingredients === undefined) {
          break;
        }
        draft.ingredients = action.payload.ingredients;
        break;
      default:
        break;
    }
  });
};
