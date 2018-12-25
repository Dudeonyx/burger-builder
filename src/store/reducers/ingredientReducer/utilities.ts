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
