import {
  ISET_INGREDIENTS,
  IDECREASE_INGREDIENT,
  IINCREASE_INGREDIENT,
} from './types';
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

export function isValidDecreaseAction(
  ingredients: Iingredients | null,
  action: IDECREASE_INGREDIENT,
): ingredients is Iingredients {
  return ingredients &&
    action.payload.igkey in ingredients &&
    ingredients[action.payload.igkey] > 0
    ? true
    : false;
}
export function isValidIncreaseAction(
  ingredients: Iingredients | null,
  action: IINCREASE_INGREDIENT,
): ingredients is Iingredients {
  return ingredients && action.payload.igkey in ingredients ? true : false;
}
