import { Iingredients } from '../containers/BurgerBuilder/types';

export const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.6,
  bacon: 0.8,
  meat: 1.4,
  base: 4,
};
export function getTotalPrice(ingredients: Iingredients) {
  return (
    (Object.entries(ingredients) as Array<[keyof Iingredients, number]>)
      .map(([igKey, igVal,]) => {
        return INGREDIENT_PRICES[igKey] * igVal;
      })
      .reduce((acc, val) => acc + val, 0) + INGREDIENT_PRICES.base
  ).toFixed(2);
}
