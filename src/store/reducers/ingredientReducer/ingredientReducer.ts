import { setIngredients } from './utilities';
import { IingredientReducerState } from './types';
import { incrementKeyInObj, decrementKeyInObj } from '../sharedUtilities';
import { createSlice } from '@redux-ts-starter-kit/core';
import { IingredientsKeys, Iingredients } from '../../../types/ingredients';

const initialState: IingredientReducerState = {
  ingredients: null,
  error: false,
};

interface IngredientActions {
  increaseIngredient: IingredientsKeys;
  decreaseIngredient: IingredientsKeys;
  setIngredients: Iingredients | null;
  setIngredientsError: boolean;
}

export const {
  reducer: ingredientReducer,
  actions: ingredientActions,
  selectors: ingredientSelectors,
} = createSlice({
  cases: {
    increaseIngredient: (state, igkey: IingredientsKeys) => {
      state.ingredients = incrementKeyInObj(state.ingredients, igkey);
    },
    decreaseIngredient: (state, igkey: IingredientsKeys) => {
      state.ingredients = decrementKeyInObj(state.ingredients, igkey);
    },
    setIngredients: (state, ingredients: Iingredients | null) => {
      state = setIngredients(state, ingredients);
    },
    setIngredientsError: (state, error: IngredientActions['setIngredientsError']) => {
      state.error = error;
    },
  },
  initialState,
  slice: 'ings',
});
