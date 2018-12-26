import { Iingredients } from '../../../types/ingredients';
import { ISET_INGREDIENTS } from './types';

export function reShapeIngredients(
  ingredients: Iingredients | null,
): Iingredients | null {
  return ingredients
    ? {
        salad: ingredients.salad,
        bacon: ingredients.bacon,
        cheese: ingredients.cheese,
        meat: ingredients.meat,
      }
    : null;
}

export function setIngredientsDraft(
  draft: {
    ingredients: Iingredients | null;
    error: boolean;
  },
  action: ISET_INGREDIENTS,
) {
  draft.error = false;
  const { ingredients } = action.payload;
  const reShapedIngredients = reShapeIngredients(ingredients);
  draft.ingredients = reShapedIngredients;
}
