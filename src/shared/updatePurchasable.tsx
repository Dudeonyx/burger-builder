import { Iingredients } from '../types/ingredients';

export function updatePurchasable(ingredients: Iingredients | null): boolean {
  return ingredients
    ? Object.values(ingredients).some(igVal => igVal !== 0)
    : false;
}
