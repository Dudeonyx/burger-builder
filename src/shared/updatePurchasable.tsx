import { Iingredients } from '../types/ingredients';

export function updatePurchasable(ingredients: Iingredients): boolean {
  return Object.values(ingredients).some(igVal => igVal !== 0);
}
