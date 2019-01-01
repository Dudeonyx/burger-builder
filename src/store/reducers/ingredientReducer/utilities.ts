import { Iingredients } from '../../../types/ingredients';

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

export function setIngredientsDraft<
  D extends {
    ingredients: Iingredients | null;
    error: boolean;
  }
>(draft: D, ingredients: Iingredients | null) {
  draft.error = false;
  const reShapedIngredients = reShapeIngredients(ingredients);
  draft.ingredients = reShapedIngredients;
}
