import { Iingredients } from '../../../types/ingredients';

export function reShapeIngredients(ingredients: Iingredients | null): Iingredients | null {
  return ingredients
    ? {
        salad: ingredients.salad,
        bacon: ingredients.bacon,
        cheese: ingredients.cheese,
        meat: ingredients.meat,
      }
    : null;
}

export function setIngredients<
  D extends {
    ingredients: Iingredients | null;
    error: boolean;
  }
>(state: D, ingredients: Iingredients | null) {
  return {
    ...state,
    ingredients: reShapeIngredients(ingredients),
    error: false,
  };
}
