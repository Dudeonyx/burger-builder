import {
  reShapeIngredients,
  isValidDecreaseAction,
  isValidIncreaseAction,
} from './utilities';
import produce from 'immer';

import { IingredientReducerState, IingredientReducerAction } from './types';
import { actionTypes } from '../actions';
import { assertIsNever } from '../sharedUtilities';

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
        if (isValidIncreaseAction(draft.ingredients, action)) {
          draft.ingredients[action.payload.igkey] += 1;
        }
        break;
      case actionTypes.DECREASE_INGREDIENT:
        if (isValidDecreaseAction(draft.ingredients, action)) {
          draft.ingredients[action.payload.igkey] -= 1;
        }
        break;
      case actionTypes.SET_INGREDIENTS:
        draft.error = false;
        const { ingredients } = action.payload;
        const reShapedIngredients = reShapeIngredients(ingredients);
        draft.ingredients = reShapedIngredients;
        break;
      case actionTypes.SET_INGREDIENTS_ERROR:
        draft.error = action.payload.error;
        break;
      default:
        assertIsNever(action);
        break;
    }
  });
};
