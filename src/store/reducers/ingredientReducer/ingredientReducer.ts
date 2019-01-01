import { setIngredientsDraft } from './utilities';
import { IingredientReducerState } from './types';
import { incrementKeyInObj, decrementKeyInObj } from '../sharedUtilities';
import robodux from 'robodux-alt';
import { IingredientsKeys, Iingredients } from '../../../types/ingredients';

const initialState: IingredientReducerState = {
  ingredients: null,
  error: false,
};

export const {
  reducer: ingredientReducer,
  actions: ingredientActions,
} = robodux({
  actions: {
    increaseIngredient: (state, igkey: IingredientsKeys) => {
      incrementKeyInObj(state.ingredients, igkey);
    },
    decreaseIngredient: (state, igkey: IingredientsKeys) => {
      decrementKeyInObj(state.ingredients, igkey);
    },
    setIngredients: (state, ingredients: Iingredients | null) => {
      setIngredientsDraft(state, ingredients);
    },
    setIngredientsError: (state, error: boolean) => {
      state.error = error;
    },
  },
  initialState,
  slice: 'ings',
});
