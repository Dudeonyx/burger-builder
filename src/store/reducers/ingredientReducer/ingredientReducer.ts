import { IingredientReducerState } from "./types";
import { incrementKeyInObj, decrementKeyInObj } from "../sharedUtilities";
import { CasesBuilder, createSlice } from "@redux-ts-starter-kit/slice";
import { IingredientsKeys, Iingredients } from "../../../types/ingredients";

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
} = createSlice<
  "ings",
  CasesBuilder<IingredientReducerState, IngredientActions>,
  IingredientReducerState,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>({
  cases: {
    increaseIngredient: (state, igkey) =>
      void (state.ingredients = incrementKeyInObj(state.ingredients, igkey)),
    decreaseIngredient: (state, igkey) =>
      void (state.ingredients = decrementKeyInObj(state.ingredients, igkey)),
    setIngredients: (state, ingredients) =>
      void (state.ingredients = ingredients),
    setIngredientsError: (state, error) => void (state.error = error),
  },
  initialState,
  name: "ings",
});

ingredientActions.setIngredients(null);
