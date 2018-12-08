import { Iingredients } from '../containers/BurgerBuilder';

export function updatePurchasable(ingredients: Iingredients): boolean {
  return Object.values(ingredients).some(igVal => igVal !== 0);
}