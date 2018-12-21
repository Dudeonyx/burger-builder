import { IstoreState } from '../types';
import { createSelector } from 'reselect';
import { getTotalPrice } from '../../shared/getTotalPrice';

export const ingredientsSelector = (state: IstoreState) => {
  return state.ings.ingredients;
};
export const ingredientsErrorSelector = (state: IstoreState) => {
  return state.ings.error;
};
export const customerSelector = (state: IstoreState) => {
  return state.cData.customer;
};

export const getTotalPriceFromStore = createSelector(
  ingredientsSelector,
  ingredients => {
    return getTotalPrice(ingredients);
  },
);
export const getContactDataState = createSelector(
  customerSelector,
  ingredientsSelector,
  getTotalPriceFromStore,
  (customer, ingredients, totalPrice) => {
    return {
      customer,
      ingredients,
      totalPrice,
    };
  },
);
export const getIngredientState = createSelector(
  ingredientsSelector,
  getTotalPriceFromStore,
  ingredientsErrorSelector,
  (ingredients, totalPrice, error) => {
    return {
      ingredients,
      totalPrice,
      error,
    };
  },
);
