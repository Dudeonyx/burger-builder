import { reShapeIngredients } from './utilities';
import produce from 'immer';

import { IingredientReducerState, IingredientReducerAction } from './types';
import { actionTypes } from '../actions';
import { incrementKeyInObj, decrementKeyInObj } from '../sharedUtilities';

const initialState: IingredientReducerState = {
  ingredients: null,
  error: false,
};
export const ingredientReducer = produce(
  (draft, action: IingredientReducerAction) => {
    switch (action.type) {
      case actionTypes.INCREASE_INGREDIENT:
        incrementKeyInObj(draft.ingredients, action.payload.igkey);
        break;
      case actionTypes.DECREASE_INGREDIENT:
        decrementKeyInObj(draft.ingredients, action.payload.igkey);
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
        const _: never = action;
        break;
    }
  },
  initialState,
);
