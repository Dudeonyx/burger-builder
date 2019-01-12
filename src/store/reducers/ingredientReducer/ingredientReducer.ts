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
} = createSlice<IngredientActions, IingredientReducerState, IStore>({
  cases: {
    increaseIngredient: (state, igkey) => {
      incrementKeyInObj(state.ingredients, igkey);
    },
    decreaseIngredient: (state, igkey) => {
      decrementKeyInObj(state.ingredients, igkey);
    },
    setIngredients: (state, ingredients) => {
      setIngredientsDraft(state, ingredients);
    },
    setIngredientsError: (state, error) => {
      state.error = error;
    },
  },
  initialState,
  slice: 'ings',
});
