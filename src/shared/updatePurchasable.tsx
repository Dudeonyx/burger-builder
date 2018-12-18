import { Iingredients } from '../containers/BurgerBuilder/types';

export function updatePurchasable(ingredients: Iingredients): boolean {
  return Object.values(ingredients).some(igVal => igVal !== 0);
}
