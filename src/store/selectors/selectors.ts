import { IstoreState } from '../types';
import { createSelector } from 'reselect';
import { getTotalPrice } from '../../shared/getTotalPrice';

export const ingredientsSelector = (state: IstoreState) => {
  return state.ings.ingredients;
};
export const customerSelector = (state: IstoreState) => {
  return state.cData.customer;
};

export const getTotalPriceFromState = createSelector(
  ingredientsSelector,
  ingredients => {
    return getTotalPrice(ingredients);
  },
);
export const getContactDataPropsFromState = createSelector(
  [customerSelector, ingredientsSelector, getTotalPriceFromState,],
  (customer, ingredients, totalPrice) => {
    return {
      customer,
      ingredients,
      totalPrice,
    };
  },
);
export const getBurgerBuilderPropsFromState = createSelector(
  [ingredientsSelector, getTotalPriceFromState,],
  (ingredients, totalPrice) => {
    return {
      ingredients,
      totalPrice,
    };
  },
);
