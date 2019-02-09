import { setIngredientsDraft } from './utilities';
import { IingredientReducerState } from './types';
import { incrementKeyInObj, decrementKeyInObj } from '../sharedUtilities';
import { createSlice } from '@redux-ts-starter-kit/core';
import { IingredientsKeys, Iingredients } from '../../../types/ingredients';
import { IStore } from '../../store';

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
    increaseIngredient: (state, igkey: IngredientActions['increaseIngredient']) => {
      incrementKeyInObj(state.ingredients, igkey);
    },
    decreaseIngredient: (state, igkey: IngredientActions['decreaseIngredient']) => {
      decrementKeyInObj(state.ingredients, igkey);
    },
    setIngredients: (state, ingredients: IngredientActions['setIngredients']) => {
      setIngredientsDraft(state, ingredients);
    },
    setIngredientsError: (state, error: IngredientActions['setIngredientsError']) => {
      state.error = error;
    },
  },
  initialState,
  slice: 'ings',
});
